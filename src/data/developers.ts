export interface Developer {
  name: string;
  initial: string;
  photo: string;
  role: { pt: string; en: string };
  bio: { pt: string; en: string };
  github: string;
  linkedin: string;
}

export const developers: Developer[] = [
  {
    name: "Eduardo",
    initial: "E",
    photo: "/eduardo.png",
    role: { pt: "Desenvolvedor / Cofundador", en: "Developer / Co-Founder" },
    bio: {
      pt: "Focado em sistemas sólidos e escaláveis — do banco de dados até a interface.",
      en: "Focused on solid, scalable systems — from the database up to the interface.",
    },
    // TODO: replace with Eduardo's real GitHub URL
    github: "https://github.com/",
    // TODO: replace with Eduardo's real LinkedIn URL
    linkedin: "https://linkedin.com/",
  },
  {
    name: "Auler",
    initial: "A",
    photo: "/auler.png",
    role: { pt: "Desenvolvedor / Cofundador", en: "Developer / Co-Founder" },
    bio: {
      pt: "Focado em transformar ideias em produtos limpos e funcionais que as pessoas realmente gostam de usar.",
      en: "Focused on turning ideas into clean, functional products people actually enjoy using.",
    },
    // TODO: replace with Auler's real GitHub URL
    github: "https://github.com/",
    // TODO: replace with Auler's real LinkedIn URL
    linkedin: "https://linkedin.com/",
  },
];
