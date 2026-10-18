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
  { title: "Project One", description: "A live web app — replace with your real project.", url: "https://example.com", tags: ["React", "TypeScript"], year: "2026" },
  { title: "Project Two", description: "Another live project — short one-line summary.", url: "https://example.com", tags: ["Next.js", "API"], year: "2025" },
  { title: "Project Three", description: "Dashboard or tool you shipped.", url: "https://example.com", tags: ["Vue", "Charts"], year: "2025" },
  { title: "Project Four", description: "Newest live build — short one-line summary.", url: "https://example.com", tags: ["React", "TypeScript"], year: "2026" },
  { title: "Old Portfolio v2", description: "My previous portfolio site.", url: "https://example.com", tags: ["HTML", "CSS"], year: "2023", archived: true },
  { title: "Old Portfolio v1", description: "Where it all started.", url: "https://example.com", tags: ["jQuery"], year: "2021", archived: true },
];

export const profile = {
  name: "Liudmyla Tokar",
  role: "Web & App Developer",
  email: "hello@example.com",
  cvUrl: "/downloads/cv.pdf",
};
