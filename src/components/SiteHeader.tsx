import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { profile } from "@/data/projects";

function ThemeToggle() {
  const [lime, setLime] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("theme") === "lime";
    setLime(saved);
    document.documentElement.classList.toggle("theme-lime", saved);
  }, []);
  const toggle = () => {
    const next = !lime;
    setLime(next);
    localStorage.setItem("theme", next ? "lime" : "cobalt");
    document.documentElement.classList.toggle("theme-lime", next);
  };
  return (
    <button onClick={toggle} aria-label="Switch color theme" title="Switch color theme" className="h-6 w-6 rounded-full border border-border bg-primary transition-transform hover:scale-110" />
  );
}

const links = [
  { to: "/", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-mono text-sm">
          <span className="text-primary">●</span> mila.dev
        </Link>
        <nav className="flex items-center gap-6 font-mono text-sm">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-primary" }} activeOptions={{ exact: true }}>
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
          <a href={profile.cvUrl} download className="rounded-md bg-primary px-3 py-1.5 text-primary-foreground transition-opacity hover:opacity-90">CV ↓</a>
        </nav>
      </div>
    </header>
  );
}
