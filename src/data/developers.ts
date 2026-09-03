export interface Developer {
  name: string;
  initial: string;
  role: string;
  bio: string;
  github: string;
  linkedin: string;
}

export const developers: Developer[] = [
  {
    name: "Eduardo",
    initial: "E",
    role: "Developer / Co-Founder",
    bio: "Focused on solid, scalable systems — from the database up to the interface.",
    // TODO: replace with Eduardo's real GitHub URL
    github: "https://github.com/",
    // TODO: replace with Eduardo's real LinkedIn URL
    linkedin: "https://linkedin.com/",
  },
  {
    name: "Auler",
    initial: "A",
    role: "Developer / Co-Founder",
    bio: "Focused on turning ideas into clean, functional products people actually enjoy using.",
    // TODO: replace with Auler's real GitHub URL
    github: "https://github.com/",
    // TODO: replace with Auler's real LinkedIn URL
    linkedin: "https://linkedin.com/",
  },
];
