import { createFileRoute } from "@tanstack/react-router";
import { profile } from "@/data/projects";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About — ${profile.name}` },
      { name: "description", content: `About ${profile.name}, ${profile.role}.` },
      { property: "og:title", content: `About ${profile.name}` },
      { property: "og:description", content: `Background, skills and CV of ${profile.name}.` },
    ],
  }),
  component: About,
});

const skills = ["React", "TypeScript", "Node.js", "CSS / Tailwind", "REST & GraphQL", "Git"];

function About() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-24">
        <p className="font-mono text-sm text-primary">// about</p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight">Hi, I'm {profile.name.split(" ")[0]}.</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          I'm a {profile.role.toLowerCase()} who loves turning ideas into fast, usable products. This is a placeholder bio — tell me a bit about yourself and I'll write it here.
        </p>
        <h2 className="mt-16 font-mono text-sm text-muted-foreground">skills</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((s) => <span key={s} className="rounded-md border border-border px-3 py-1.5 font-mono text-sm">{s}</span>)}
        </div>
        <a href={profile.cvUrl} download className="mt-12 inline-block rounded-md bg-primary px-5 py-3 font-mono text-sm text-primary-foreground hover:opacity-90">Download CV ↓</a>
      </main>
    </>
  );
}
