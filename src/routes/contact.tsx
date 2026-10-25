import { createFileRoute } from "@tanstack/react-router";
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
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = `${d.get("message")}\n\n— ${d.get("name")} (${d.get("email")})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Portfolio enquiry")}&body=${encodeURIComponent(body)}`;
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
          <button className="rounded-md bg-primary px-5 py-3 font-mono text-sm text-primary-foreground hover:opacity-90">Send message →</button>
        </form>
      </main>
    </>
  );
}
