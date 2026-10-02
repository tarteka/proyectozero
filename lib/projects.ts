// Proyectos del portafolio. Los textos (tagline y descripción) están en
// messages/*.json bajo portfolio.items.<id>.
//
// status:
//   "live"        → en producción, se muestra el enlace a la web
//   "maintenance" → la web existe pero no funciona; se oculta el enlace
//   "soon"        → aún no desplegado

export type ProjectStatus = "live" | "maintenance" | "soon";

export interface Project {
  id: "misguardias" | "recetas" | "divisas" | "vettrack";
  name: string;
  type: string;
  status: ProjectStatus;
  url?: string;
  repo?: string;
  image?: string;
  stack: string[];
}

export const projects: Project[] = [
  {
    id: "misguardias",
    name: "Mis Guardias",
    type: "Android",
    status: "live",
    url: "https://misguardias.proyectozero.org",
    image: "/images/projects/misguardias.png",
    stack: ["Kotlin", "Jetpack Compose", "Room", "WorkManager", "OkHttp", "Jsoup"],
  },
  {
    id: "recetas",
    name: "Mi Recetario",
    type: "Web · API · Bot",
    status: "live",
    url: "https://recetas.proyectozero.org",
    repo: "https://github.com/tarteka/recetas",
    image: "/images/projects/recetas.png",
    stack: ["PHP 8.4", "Slim", "React", "TypeScript", "SQLite", "Docker", "GitHub Actions"],
  },
  {
    id: "divisas",
    name: "Mercado de Divisas",
    type: "Web SPA",
    status: "maintenance",
    url: "https://divisas.proyectozero.org",
    repo: "https://github.com/tarteka/divisas",
    stack: ["Angular", "TypeScript", "Bootstrap", "REST API"],
  },
  {
    id: "vettrack",
    name: "VetTrack",
    type: "Web · TFC DAW",
    status: "soon",
    repo: "https://github.com/tarteka/vettrack",
    stack: ["Symfony", "Angular", "TypeScript", "MariaDB", "Docker"],
  },
];
