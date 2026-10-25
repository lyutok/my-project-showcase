// Edit this list to add your work. `archived: true` marks older portfolio pages.
export type Project = {
  title: string;
  description: string;
  url: string;
  tags: string[];
  year: string;
  archived?: boolean;
};

export const projects: Project[] = [
  { title: "Seed Planet", description: "A gamified 3D habit tracker that transforms daily personal growth into a living, low-poly ecosystem.", url: "https://seed-planet.pages.dev/", tags: ["React", "Three.js", "TypeScript", "MCP", "Supabase"], year: "2026" },
  { title: "CarouselSplit", description: "A browser-based tool that turns photos into seamless Instagram carousel slides with custom borders.", url: "https://carouselsplit.pages.dev/", tags: ["JavaScript", "Canvas API", "CSS"], year: "2026" },
  { title: "Billequal", description: "A free iOS app for splitting bills and tips in seconds, equally or by custom amounts, with a built-in calculator and one-tap sharing. No signup required.", url: "https://lyutok.github.io/billequal/", tags: ["Swift", "UIKit"], year: "2026" },
  { title: "WhenItsTime", description: "An iOS app that shows local time, working-hours overlap, and the best moment to connect across time zones, with reminders so you skip the time-zone math. Free, with an optional Pro tier.", url: "https://whenitstime.pages.dev/", tags: ["Swift", "UIKit"], year: "2026" },
  { title: "Old Portfolio v2", description: "My Python and full-stack portfolio: CLI programs, a Flask app, and Django/JavaScript projects (auction site, email client, social network, recipe book), plus my CS50 certificates.", url: "https://lyutok.github.io/python/", tags: ["Python", "Flask", "Django", "JavaScript"], year: "2024", archived: true },
  { title: "Old Portfolio v1", description: "My first portfolio: 14 Swift/UIKit practice apps, from a simple timer to Firebase chat and in-app purchases.", url: "https://lyutok.github.io/", tags: ["Swift", "UIKit", "Firebase", "Core Data", "SwiftUI"], year: "2022", archived: true },
];

export const profile = {
  fullname: "Liudmyla Tokar",
  name: "Mila",
  role: "Web & App Developer",
  email: "mila.tokar.cv@gmail.com",
  cvUrl: "https://lyutok.github.io/python/cv/cv.html",
};
