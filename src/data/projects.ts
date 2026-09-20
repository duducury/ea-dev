export interface Project {
  slug: string;
  name: string;
  url: string;
  screenshot: string;
  technologies: string[];
  tags: string[];
  featured?: boolean;
  category: { pt: string; en: string };
  description: { pt: string; en: string };
  badges?: { pt: string[]; en: string[] };
}

export const projects: Project[] = [
  {
    slug: "favela-store",
    name: "Favela Store",
    screenshot: "/favelastore.png",
    category: { pt: "E-commerce", en: "E-commerce" },
    description: {
      pt: "Uma experiência digital criada para apresentar produtos, facilitar a navegação e transformar visitantes em compradores.",
      en: "A digital experience built to showcase products, simplify navigation and turn visitors into buyers.",
    },
    url: "https://catalogo.favelastore.com/",
    tags: ["E-COMMERCE", "DESIGN", "WEB DEVELOPMENT"],
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
      pt: "Um site institucional pensado para transmitir confiança e gerar mais pedidos de orçamento.",
      en: "A business website designed to build trust and generate more quote requests.",
    },
    url: "http://unitedflooringamerica.com/",
    tags: ["WEBSITE", "DESIGN", "WEB DEVELOPMENT"],
    // TODO: confirm the exact production stack for this project
    technologies: ["JavaScript", "Tailwind CSS"],
  },
  {
    slug: "dois-amores",
    name: "Dois Amores",
    screenshot: "/picole.png",
    category: { pt: "Cardápio Digital", en: "Restaurant Menu" },
    description: {
      pt: "Um site vitrine feito para apresentar o catálogo e a identidade de um pequeno negócio de picolés gourmet.",
      en: "A showcase website built to present the catalog and identity of a small gourmet popsicle business.",
    },
    url: "https://duducury.github.io/doisamores/",
    tags: ["WEBSITE", "DESIGN", "BRANDING"],
    // TODO: confirm the exact production stack for this project
    technologies: ["JavaScript", "Git"],
  },
];
