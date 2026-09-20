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
    slides: { title: string; subtitle: string }[];
    cta: string;
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
  forWho: {
    eyebrow: string;
    title: string;
    cta: string;
    categories: { name: string; description: string }[];
  };
  portfolio: {
    eyebrow: string;
    title: string;
    subtitle: string;
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
  pricing: {
    eyebrow: string;
    title: string;
    note: string;
    cta: string;
    plans: { name: string; price: string; features: string[]; footnote?: string }[];
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
      slides: [
        {
          title: "SEJA BEM-VINDO À EA DEV.",
          subtitle: "Transformamos ideias em experiências digitais.",
        },
        {
          title: "CRIAMOS SITES, SISTEMAS WEB, E-COMMERCE E SOLUÇÕES SOB MEDIDA.",
          subtitle:
            "Tudo em um só lugar, desenvolvido de acordo com as necessidades do seu negócio.",
        },
        {
          title:
            "CRIAMOS FERRAMENTAS PARA APRESENTAR SUA EMPRESA, CONQUISTAR CLIENTES E LEVAR SEU NEGÓCIO A UM NOVO NÍVEL.",
          subtitle:
            "Design, tecnologia e estratégia unidos para criar uma presença digital profissional.",
        },
        {
          title: "UMA PRESENÇA DIGITAL PROFISSIONAL PARA O SEU NEGÓCIO.",
          subtitle: "Mais do que estar online, queremos ajudar sua empresa a crescer.",
        },
        {
          title: "PRONTO PARA TRANSFORMAR SUA IDEIA EM REALIDADE?",
          subtitle: "Vamos construir algo que faça sentido para o seu negócio.",
        },
      ],
      cta: "Começar um projeto →",
    },
    services: {
      eyebrow: "O que construímos",
      title: "Quatro formas de transformar ideias em produtos.",
      subtitle: "Soluções digitais modernas, feitas para o seu negócio crescer.",
      items: [
        {
          title: "Sites",
          description:
            "Sites profissionais para representar seu negócio e gerar novos clientes.",
        },
        {
          title: "Sistemas Web",
          description:
            "Sistemas personalizados para operações, automações e processos internos.",
        },
        {
          title: "E-commerce & Catálogos",
          description: "Experiências digitais para vender produtos e apresentar seu catálogo.",
        },
        {
          title: "Soluções Sob Medida",
          description:
            "Software desenvolvido especificamente para as necessidades do seu negócio.",
        },
      ],
    },
    forWho: {
      eyebrow: "Para quem construímos",
      title: "Feito para o seu negócio.",
      cta: "Ver exemplo →",
      categories: [
        {
          name: "Construction",
          description: "Mostre seus projetos, conquiste confiança e receba mais orçamentos.",
        },
        {
          name: "Remodeling",
          description: "Exiba antes e depois, atraia clientes e destaque sua qualidade.",
        },
        {
          name: "Landscaping",
          description: "Apresente seus serviços e conquiste novos clientes na sua região.",
        },
        {
          name: "Restaurants",
          description: "Cardápio, pedidos e reservas em uma experiência que representa você.",
        },
        {
          name: "Retail",
          description: "Catálogo digital e vendas online para o seu negócio crescer.",
        },
        {
          name: "Small Businesses",
          description: "Presença profissional online, feita sob medida para o seu negócio.",
        },
      ],
    },
    portfolio: {
      eyebrow: "Portfólio",
      title: "Projetos que transformam ideias em experiências digitais.",
      subtitle: "Cada projeto é construído sob medida — não usamos templates genéricos.",
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
      body: "Somos dois desenvolvedores e trabalhamos diretamente com cada cliente para entender o negócio antes de escrever uma linha de código. Seja um site simples ou um sistema completo, cada projeto é pensado especificamente para aquele negócio. Sem templates genéricos, sem atalhos.",
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
    pricing: {
      eyebrow: "Preços",
      title: "Soluções para o seu negócio",
      note: "Cada sistema é desenvolvido de acordo com as necessidades da sua empresa.",
      cta: "Solicitar orçamento",
      plans: [
        {
          name: "Landing Page",
          price: "A partir de $300",
          features: [
            "1 página profissional",
            "Design personalizado",
            "Responsivo",
            "Integração com WhatsApp",
            "Formulário de contato",
            "SEO básico",
          ],
          footnote: "+$50 por página adicional",
        },
        {
          name: "Site para Restaurante",
          price: "A partir de $350",
          features: [
            "Cardápio digital",
            "Categorias e produtos",
            "Carrinho de compras",
            "Sistema de pedidos",
            "Checkout pelo WhatsApp",
            "Responsivo",
            "Fácil atualização",
          ],
        },
        {
          name: "Loja Virtual",
          price: "$500 – $700",
          features: [
            "Catálogo de produtos",
            "Carrinho",
            "Checkout",
            "Login de clientes",
            "Painel administrativo",
            "Gerenciamento de pedidos",
            "Cadastro/edição de produtos",
            "Responsivo",
          ],
        },
        {
          name: "Sistema para sua Empresa",
          price: "Valor personalizado",
          features: [
            "Painel administrativo",
            "Cadastro de usuários",
            "Banco de dados",
            "Controle de pedidos e informações",
            "Automação de processos",
            "Funcionalidades personalizadas",
            "Integrações",
          ],
        },
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
      slides: [
        {
          title: "WELCOME TO EA DEV.",
          subtitle: "We turn ideas into digital experiences.",
        },
        {
          title: "WE BUILD WEBSITES, WEB SYSTEMS, E-COMMERCE AND CUSTOM SOLUTIONS.",
          subtitle: "All in one place, built around your business's needs.",
        },
        {
          title:
            "WE BUILD TOOLS TO SHOWCASE YOUR BUSINESS, WIN CUSTOMERS AND TAKE YOUR COMPANY TO THE NEXT LEVEL.",
          subtitle:
            "Design, technology and strategy combined to build a professional digital presence.",
        },
        {
          title: "A PROFESSIONAL DIGITAL PRESENCE FOR YOUR BUSINESS.",
          subtitle: "More than just being online — we want to help your business grow.",
        },
        {
          title: "READY TO TURN YOUR IDEA INTO REALITY?",
          subtitle: "Let's build something that makes sense for your business.",
        },
      ],
      cta: "Start a project →",
    },
    services: {
      eyebrow: "What we build",
      title: "Four ways we turn ideas into products.",
      subtitle: "Modern digital solutions, built to help your business grow.",
      items: [
        {
          title: "Websites",
          description: "Professional websites that represent your business and win new customers.",
        },
        {
          title: "Web Systems",
          description: "Custom systems for operations, automation and internal processes.",
        },
        {
          title: "E-commerce & Catalogs",
          description: "Digital experiences to sell products and showcase your catalog.",
        },
        {
          title: "Custom Solutions",
          description: "Software built specifically for the needs of your business.",
        },
      ],
    },
    forWho: {
      eyebrow: "Who we build for",
      title: "Built for your business.",
      cta: "See example →",
      categories: [
        {
          name: "Construction",
          description: "Showcase your projects, build trust and get more quote requests.",
        },
        {
          name: "Remodeling",
          description: "Show before-and-afters, attract clients and highlight your quality.",
        },
        {
          name: "Landscaping",
          description: "Present your services and win new customers in your area.",
        },
        {
          name: "Restaurants",
          description: "Menu, orders and reservations in an experience that represents you.",
        },
        {
          name: "Retail",
          description: "A digital catalog and online sales to help your business grow.",
        },
        {
          name: "Small Businesses",
          description: "A professional online presence, built specifically for your business.",
        },
      ],
    },
    portfolio: {
      eyebrow: "Portfolio",
      title: "Projects that turn ideas into digital experiences.",
      subtitle: "Every project is built from scratch — no generic templates.",
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
      body: "We're two developers who work directly with each client to understand the business before writing a single line of code. Whether it's a simple website or a full system, every project is built specifically for that business. No generic templates, no shortcuts.",
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
    pricing: {
      eyebrow: "Pricing",
      title: "Solutions for your business",
      note: "Every system is built according to your company's needs.",
      cta: "Request a quote",
      plans: [
        {
          name: "Landing Page",
          price: "Starting at $300",
          features: [
            "1 professional page",
            "Custom design",
            "Responsive",
            "WhatsApp integration",
            "Contact form",
            "Basic SEO",
          ],
          footnote: "+$50 per additional page",
        },
        {
          name: "Restaurant Website",
          price: "Starting at $350",
          features: [
            "Digital menu",
            "Categories and items",
            "Shopping cart",
            "Ordering system",
            "WhatsApp checkout",
            "Responsive",
            "Easy to update",
          ],
        },
        {
          name: "Online Store",
          price: "$500 – $700",
          features: [
            "Product catalog",
            "Shopping cart",
            "Checkout",
            "Customer login",
            "Admin dashboard",
            "Order management",
            "Add/edit products",
            "Responsive",
          ],
        },
        {
          name: "Custom Business System",
          price: "Custom pricing",
          features: [
            "Admin dashboard",
            "User accounts",
            "Database",
            "Order and data management",
            "Process automation",
            "Custom features",
            "Integrations",
          ],
        },
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
