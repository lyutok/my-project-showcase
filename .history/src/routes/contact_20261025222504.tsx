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

const field = "w-full rounded-md border border-input bg-card px-4 py-3 outline-none focus:border-primary";

function Contact() {
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const formspreeId = import.meta.env.VITE_FORMSPREE_ID as string | undefined;
  const formEndpoint = formspreeId ? `https://formspree.io/f/${formspreeId}` : null;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const message = String(formData.get("message") ?? "");

    if (!formEndpoint) {
      const body = `${message}\n\n— ${name} (${email})`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Portfolio enquiry")}&body=${encodeURIComponent(body)}`;
      return;
    }

    setIsSending(true);
    setStatus("idle");

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new URLSearchParams({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      form.reset();
      setStatus("success");
    } catch (_error) {
      setStatus("error");
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
          <textarea name="message" required rows={6} placeholder="Tell me about your project" className={field} />
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
          {status === "error" && (
            <p className="text-sm text-red-600">Something went wrong. Please try again or email me directly.</p>
          )}
        </form>
      </main>
    </>
  );
}
