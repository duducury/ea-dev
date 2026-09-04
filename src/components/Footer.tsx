"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const links = [
    { label: t.footer.links.work, href: "#work" },
    { label: t.footer.links.about, href: "#about" },
    { label: t.footer.links.developers, href: "#developers" },
    { label: t.footer.links.contact, href: "#contact" },
  ];

  return (
    <footer className="border-t border-border px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-2.5">
          <Image src="/logo-icon.png" alt="" width={1536} height={1024} className="h-9 w-auto" />
          <div>
            <p className="text-sm font-bold tracking-[0.2em] text-text">EA DEV</p>
            <p className="mt-1 text-xs text-text-secondary">
              {t.footer.builtBy} © {new Date().getFullYear()}
            </p>
          </div>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-widest text-text-secondary">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-cursor="link"
                className="transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
