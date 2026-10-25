# mila.dev — Portfolio

Personal portfolio site for **Liudmyla Tokar**, a web & app developer. Showcases live projects, archived portfolios, and contact info — all wrapped in a dual-theme UI (Midnight Cobalt / Cyber Lime).

## Tech Stack

| Layer       | Tools                                                    |
| ----------- | -------------------------------------------------------- |
| Framework   | React 19, TanStack Router & Start, Vite                  |
| Styling     | Tailwind CSS 4, Radix UI primitives                      |
| Language    | TypeScript                                               |
| Testing     | Vitest, Testing Library                                  |

## Pages

- **/** — Project grid with live links and tag chips
- **/about** — Bio & background
- **/contact** — Email & social links

## Getting Started

```sh
git clone https://github.com/lyutok/my-project-showcase.git
cd my-project-showcase
npm i
npm run dev          # → http://localhost:5173
```

## Available Scripts

| Command            | Description                         |
| ------------------ | ----------------------------------- |
| `npm run dev`      | Start local dev server              |
| `npm run build`    | Production build                    |
| `npm run preview`  | Preview production build            |
| `npm run deploy`   | Build and deploy to Cloudflare Pages |
| `npm run lint`     | Run ESLint                          |
| `npm run format`   | Format with Prettier                |
| `npm test`         | Run tests once                      |
| `npm run test:watch` | Run tests in watch mode           |

## Project Data

All projects are defined in [`src/data/projects.ts`](src/data/projects.ts). Add a new entry to the `projects` array to have it appear on the home page automatically.

## Theming

Two color themes are available and toggled via the header button:

- **Midnight Cobalt** (default) — deep blue palette
- **Cyber Lime** — vibrant green palette

Theme preference is persisted in `localStorage` and the favicon updates to match.

## License

Private.
