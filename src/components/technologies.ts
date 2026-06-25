// ─── Technology Data ──────────────────────────────────────────────────────────
// Single source of truth for all tech entries shown on the home page.
// To add a new technology: append an object to the array below.
// `colorClass` is optional — omit it to fall back to DEFAULT_GRADIENT.

export interface Technology {
  id: string;
  name: string;
  icon: string;
  desc: string;
  link: string;        // external URL (e.g. official docs)
  projectsLink: string; // internal path to your projects page (e.g. "/projects")
  colorClass?: string; // optional Tailwind gradient override, e.g. "from-blue-500 to-cyan-400"
}

const DEFAULT_GRADIENT = "from-primary to-accent";

export const technologies: Technology[] = [
  {
    id: "react",
    name: "React",
    icon: "/react.png",
    desc: "Create responsive, interactive user interfaces using React ecosystem libraries.",
    link: "https://react.dev/",
    projectsLink: "/projects",
  },
  {
    id: "nextjs",
    name: "Next.js",
    icon: "/nextjs.png",
    desc: "Server-side rendering framework with optimized build performance and routing.",
    link: "https://nextjs.org/",
    projectsLink: "/projects",
  },
];

/** Returns the Tailwind gradient string for a given tech id. */
export function getTechGradient(id: string): string {
  return technologies.find((t) => t.id === id)?.colorClass ?? DEFAULT_GRADIENT;
}
