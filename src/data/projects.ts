export interface Project {
  slug: string;
  name: string;
  url: string;
  screenshot: string;
  technologies: string[];
  featured?: boolean;
  category: { pt: string; en: string };
  description: { pt: string; en: string };
  badges?: { pt: string[]; en: string[] };
}

export const projects: Project[] = [
  {
    slug: "favela-store",
    name: "Favela Store Catalog",
    screenshot: "/favelastore.png",
    category: { pt: "Sistema Web", en: "Web System" },
    description: {
      pt: "Um sistema completo de catálogo digital e gestão de vendas construído para um negócio de varejo em crescimento. Não é só um site — é uma ferramenta de negócio real.",
      en: "A complete digital catalog and sales management system built for a growing retail business. Not just a website — a real business tool.",
    },
    url: "https://catalogo.favelastore.com/",
    // TODO: confirm the exact production stack for this project
    technologies: ["React", "Node.js", "MySQL", "Tailwind CSS"],
    featured: true,
    badges: {
      pt: ["BANCO DE DADOS", "PAINEL ADMIN", "GESTÃO DE PRODUTOS", "VENDAS", "WHATSAPP", "RESPONSIVO"],
      en: ["DATABASE", "ADMIN PANEL", "PRODUCT MANAGEMENT", "SALES", "WHATSAPP", "RESPONSIVE"],
    },
  },
  {
    slug: "united-flooring-america",
    name: "United Flooring America",
    screenshot: "/flooring.png",
    category: { pt: "Site Institucional", en: "Business Website" },
    description: {
      pt: "Um site institucional profissional para uma empresa de pisos nos Estados Unidos.",
      en: "A professional institutional website for a flooring company based in the United States.",
    },
    url: "http://unitedflooringamerica.com/",
    // TODO: confirm the exact production stack for this project
    technologies: ["JavaScript", "Tailwind CSS"],
  },
  {
    slug: "dois-amores",
    name: "Dois Amores",
    screenshot: "/picole.png",
    category: { pt: "Site para Pequeno Negócio", en: "Small Business Website" },
    description: {
      pt: "Um site vitrine de produtos para um pequeno negócio de picolés gourmet.",
      en: "A product showcase website for a small gourmet popsicle business.",
    },
    url: "https://duducury.github.io/doisamores/",
    // TODO: confirm the exact production stack for this project
    technologies: ["JavaScript", "Git"],
  },
];
