import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { projects, profile } from "@/data/projects";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${profile.name} — ${profile.role}` },
      { name: "description", content: `Live projects and earlier work by ${profile.name}.` },
      { property: "og:title", content: `${profile.name} — Portfolio` },
      { property: "og:description", content: `Live projects and earlier work by ${profile.name}.` },
    ],
  }),
  component: Index,
});

const filters = ["All", "Live", "Earlier"] as const;

function Index() {
  const [f, setF] = useState<(typeof filters)[number]>("All");
  const list = projects.filter((p) => (f === "All" ? true : f === "Live" ? !p.archived : p.archived));
  return (
    <>
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-6xl px-6 pb-24 pt-32">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{profile.role}</p>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            I build things that <span className="text-primary">live on the web.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            A collection of shipped projects — plus the earlier portfolios that got me here.
          </p>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="mb-8 flex items-center justify-between border-b border-border pb-4">
            <h2 className="font-mono text-sm text-muted-foreground">projects ({list.length})</h2>
            <div className="flex gap-2 font-mono text-xs">
              {filters.map((x) => (
                <button key={x} onClick={() => setF(x)} className={`rounded-full border px-3 py-1 transition-colors ${f === x ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>
                  {x}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {list.map((p) => (
              <a key={p.title} href={p.url} target="_blank" rel="noreferrer" className="group flex flex-col justify-between rounded-lg border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary">
                <div>
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className={p.archived ? "text-muted-foreground" : "text-primary"}>{p.archived ? "◦ earlier work" : "● live"}</span>
                    <span className="text-muted-foreground">{p.year}</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-muted-foreground">{p.description}</p>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => <span key={t} className="rounded bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">{t}</span>)}
                  </div>
                  <span className="text-xl transition-transform group-hover:translate-x-1 group-hover:text-primary">↗</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
