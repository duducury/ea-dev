export interface Project {
  slug: string;
  name: string;
  category: string;
  description: string;
  url: string;
  technologies: string[];
  featured?: boolean;
  badges?: string[];
}

export const projects: Project[] = [
  {
    slug: "favela-store",
    name: "Favela Store Catalog",
    category: "Web System",
    description:
      "A complete digital catalog and sales management system built for a growing retail business. Not just a website — a real business tool.",
    url: "https://catalogo.favelastore.com/",
    // TODO: confirm the exact production stack for this project
    technologies: ["React", "Node.js", "MySQL", "Tailwind CSS"],
    featured: true,
    badges: [
      "DATABASE",
      "ADMIN PANEL",
      "PRODUCT MANAGEMENT",
      "SALES",
      "WHATSAPP",
      "RESPONSIVE",
    ],
  },
  {
    slug: "united-flooring-america",
    name: "United Flooring America",
    category: "Business Website",
    description:
      "A professional institutional website for a flooring company based in the United States.",
    url: "http://unitedflooringamerica.com/",
    // TODO: confirm the exact production stack for this project
    technologies: ["JavaScript", "Tailwind CSS"],
  },
  {
    slug: "dois-amores",
    name: "Dois Amores",
    category: "Small Business Website",
    description:
      "A product showcase website for a small gourmet popsicle business.",
    url: "https://duducury.github.io/doisamores/",
    // TODO: confirm the exact production stack for this project
    technologies: ["JavaScript", "Git"],
  },
];
