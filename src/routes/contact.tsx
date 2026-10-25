import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { profile } from "@/data/projects";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${profile.fullname}` },
      { name: "description", content: `Get in touch with ${profile.fullname}.` },
      { property: "og:title", content: `Contact ${profile.fullname}` },
      { property: "og:description", content: `Send a message about projects or work.` },
    ],
  }),
  component: Contact,
});

const field =
  "w-full rounded-md border border-input bg-card px-4 py-3 outline-none focus:border-primary";
const formEndpoint = "https://formspree.io/f/myeeegqd";

function Contact() {
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const message = String(formData.get("message") ?? "");

    setIsSending(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      formData.set("_replyto", email);
      formData.set("_subject", `Portfolio enquiry from ${name}`);
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (!response.ok) {
        const responseBody = await response.text();
        let detail = "";
        try {
          const result: unknown = JSON.parse(responseBody);
          if (
            typeof result === "object" &&
            result !== null &&
            "errors" in result &&
            Array.isArray(result.errors)
          ) {
            detail = result.errors
              .map((item: { message?: unknown }) =>
                typeof item.message === "string" ? item.message : "",
              )
              .filter(Boolean)
              .join(" ");
          }
        } catch {
          detail = "";
        }
        throw new Error(detail || `Form service returned HTTP ${response.status}.`);
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Could not connect to the form service. Please try again.",
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-6 py-24">
        <p className="font-mono text-sm text-primary">// contact</p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight">Let's work together.</h1>
        <form onSubmit={onSubmit} className="mt-10 space-y-4">
          <input name="name" required placeholder="Your name" className={field} />
          <input name="email" type="email" required placeholder="Your email" className={field} />
          <textarea
            name="message"
            required
            rows={6}
            placeholder="Tell me about your project"
            className={field}
          />
          <button
            type="submit"
            disabled={isSending}
            className="rounded-md bg-primary px-5 py-3 font-mono text-sm text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSending ? "Sending..." : "Send message →"}
          </button>
          {status === "success" && (
            <p className="text-sm text-emerald-600">Your message has been sent successfully.</p>
          )}
          {errorMessage && (
            <p role="alert" className="text-sm text-red-600">
              {errorMessage} Please try again or email me directly.
            </p>
          )}
        </form>
      </main>
    </>
  );
}
