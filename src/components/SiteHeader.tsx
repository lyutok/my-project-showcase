import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { profile } from "@/data/projects";

function setFavicon(isLime: boolean) {
  const href = isLime ? "/favicon-lime.svg" : "/favicon-cobalt.svg";
  let link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
  if (link) {
    link.href = href;
    link.type = "image/svg+xml";
  } else {
    link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/svg+xml";
    link.href = href;
    document.head.appendChild(link);
  }
}

function ThemeToggle() {
  const [lime, setLime] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("theme") === "lime";
    setLime(saved);
    document.documentElement.classList.toggle("theme-lime", saved);
    setFavicon(saved);
  }, []);
  const toggle = () => {
    const next = !lime;
    setLime(next);
    localStorage.setItem("theme", next ? "lime" : "cobalt");
    document.documentElement.classList.toggle("theme-lime", next);
    setFavicon(next);
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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-mono text-sm">
          <span className="text-primary">●</span> mila.dev
        </Link>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-6 font-mono text-sm md:flex">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-primary" }} activeOptions={{ exact: true }}>
                {l.label}
              </Link>
            ))}
            <ThemeToggle />
            <a href={profile.cvUrl} download="Liudmyla (Mila) Tokar — CV.pdf" className="rounded-md bg-primary px-3 py-1.5 text-primary-foreground transition-opacity hover:opacity-90">CV ↓</a>
          </nav>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card md:hidden"
          >
            <span className="relative flex h-4 w-5 flex-col justify-between">
              <span className={`block h-0.5 w-full rounded bg-foreground transition-transform ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`block h-0.5 w-full rounded bg-foreground transition-opacity ${menuOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`block h-0.5 w-full rounded bg-foreground transition-transform ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-border bg-background/95 px-6 py-4 font-mono text-sm md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className="text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: true }}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center justify-between gap-3 pt-2">
              <ThemeToggle />
              <a href={profile.cvUrl} download="Liudmyla (Mila) Tokar — CV.pdf" className="rounded-md bg-primary px-3 py-1.5 text-primary-foreground transition-opacity hover:opacity-90">CV ↓</a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
