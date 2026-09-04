export type Language = "pt" | "en";

export interface Dictionary {
  nav: {
    work: string;
    services: string;
    about: string;
    developers: string;
    contact: string;
    cta: string;
  };
  hero: {
    headline: string;
    subtitle: string;
    ctaWork: string;
    ctaContact: string;
    scroll: string;
  };
  services: {
    eyebrow: string;
    title: string;
    items: { title: string; description: string }[];
  };
  portfolio: {
    eyebrow: string;
    title: string;
    visit: string;
    featured: string;
  };
  developers: {
    eyebrow: string;
    title: string;
  };
  about: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  process: {
    eyebrow: string;
    title: string;
    steps: { number: string; title: string; description: string }[];
  };
  contact: {
    title: string;
    subtitle: string;
    cta: string;
  };
  footer: {
    builtBy: string;
    links: { work: string; about: string; developers: string; contact: string };
  };
  cursor: { view: string };
  langToggle: { label: string };
}

export const dictionary: Record<Language, Dictionary> = {
  pt: {
    nav: {
      work: "Trabalho",
      services: "Serviços",
      about: "Sobre",
      developers: "Devs",
      contact: "Contato",
      cta: "Vamos conversar →",
    },
    hero: {
      headline: "Desenvolvemos de acordo com a sua necessidade.",
      subtitle: "Sites, sistemas e experiências digitais construídos por Eduardo & Auler.",
      ctaWork: "Ver nosso trabalho",
      ctaContact: "Vamos trabalhar juntos",
      scroll: "Rolar",
    },
    services: {
      eyebrow: "O que construímos",
      title: "Quatro formas de transformar ideias em produtos.",
      items: [
        {
          title: "Sites",
          description: "Sites profissionais feitos para representar o seu negócio.",
        },
        {
          title: "Sistemas Web",
          description:
            "Sistemas sob medida com banco de dados, autenticação e regras de negócio.",
        },
        {
          title: "E-commerce & Catálogos",
          description: "Catálogos digitais e experiências de venda online.",
        },
        {
          title: "Soluções Sob Medida",
          description:
            "Software desenhado para as necessidades específicas do seu negócio.",
        },
      ],
    },
    portfolio: {
      eyebrow: "Portfólio",
      title: "Confira alguns de nossos trabalhos",
      visit: "Visitar projeto →",
      featured: "Projeto em destaque",
    },
    developers: {
      eyebrow: "Conheça os desenvolvedores",
      title: "Construído por dois desenvolvedores.",
    },
    about: {
      eyebrow: "Sobre a EA Dev",
      heading:
        "Não construímos só sites. Construímos ferramentas digitais que ajudam negócios a crescer.",
      body: "Trabalhamos diretamente com empresas para entender o que elas realmente precisam — e então desenhamos e construímos. Seja um site simples ou um sistema completo, com banco de dados, painel administrativo e regras de negócio. Sem templates, sem atalhos.",
    },
    process: {
      eyebrow: "Processo",
      title: "Como trabalhamos.",
      steps: [
        { number: "01", title: "Descoberta", description: "Entender o negócio e seus objetivos." },
        { number: "02", title: "Design", description: "Criar a direção visual e a experiência do usuário." },
        { number: "03", title: "Construção", description: "Desenvolver o site ou sistema." },
        { number: "04", title: "Lançamento", description: "Implantar, testar e entregar." },
        { number: "05", title: "Crescimento", description: "Melhorar e manter o produto." },
      ],
    },
    contact: {
      title: "Tem um projeto em mente?",
      subtitle: "Vamos construir algo incrível.",
      cta: "Iniciar um projeto →",
    },
    footer: {
      builtBy: "Feito por Eduardo & Auler.",
      links: { work: "Trabalho", about: "Sobre", developers: "Devs", contact: "Contato" },
    },
    cursor: { view: "VER" },
    langToggle: { label: "Idioma" },
  },
  en: {
    nav: {
      work: "Work",
      services: "Services",
      about: "About",
      developers: "Developers",
      contact: "Contact",
      cta: "Let's talk →",
    },
    hero: {
      headline: "We craft digital products.",
      subtitle: "Websites, systems & digital experiences built by Eduardo & Auler.",
      ctaWork: "View our work",
      ctaContact: "Let's work together",
      scroll: "Scroll",
    },
    services: {
      eyebrow: "What we build",
      title: "Four ways we turn ideas into products.",
      items: [
        { title: "Websites", description: "Professional websites designed to represent your business." },
        {
          title: "Web Systems",
          description: "Custom systems with databases, authentication and business logic.",
        },
        {
          title: "E-commerce & Catalogs",
          description: "Digital catalogs and online sales experiences.",
        },
        {
          title: "Custom Solutions",
          description: "Software designed around the specific needs of your business.",
        },
      ],
    },
    portfolio: {
      eyebrow: "Portfolio",
      title: "Selected Work",
      visit: "Visit Project →",
      featured: "Featured project",
    },
    developers: {
      eyebrow: "Meet the developers",
      title: "Built by two developers.",
    },
    about: {
      eyebrow: "About EA Dev",
      heading:
        "We don't just build websites. We build digital tools that help businesses grow.",
      body: "We work directly with businesses to understand what they actually need, then design and build it — whether that's a simple website or a full system with a database, an admin panel and business logic behind it. No templates, no shortcuts.",
    },
    process: {
      eyebrow: "Process",
      title: "How we work.",
      steps: [
        { number: "01", title: "Discover", description: "Understand the business and its goals." },
        { number: "02", title: "Design", description: "Create the visual direction and user experience." },
        { number: "03", title: "Build", description: "Develop the website or system." },
        { number: "04", title: "Launch", description: "Deploy, test and deliver." },
        { number: "05", title: "Grow", description: "Improve and maintain the product." },
      ],
    },
    contact: {
      title: "Have a project in mind?",
      subtitle: "Let's build something great.",
      cta: "Start a project →",
    },
    footer: {
      builtBy: "Built by Eduardo & Auler.",
      links: { work: "Work", about: "About", developers: "Developers", contact: "Contact" },
    },
    cursor: { view: "VIEW" },
    langToggle: { label: "Language" },
  },
};
