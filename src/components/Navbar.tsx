"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Navbar() {
  const { t, language, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: t.nav.work, href: "#work" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.developers, href: "#developers" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <a
          href="#top"
          data-cursor="link"
          className="flex items-center gap-2.5"
        >
          <Image src="/logo-icon.png" alt="EA Dev" width={1904} height={826} className="h-11 w-auto" priority />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-cursor="link"
                className="text-xs font-medium uppercase tracking-widest text-text-secondary transition-colors hover:text-text"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 lg:flex">
          <button
            type="button"
            onClick={toggleLanguage}
            data-cursor="link"
            aria-label={t.langToggle.label}
            className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-text-secondary transition-colors hover:text-text"
          >
            <span className={language === "pt" ? "text-accent" : ""}>PT</span>
            <span aria-hidden="true">/</span>
            <span className={language === "en" ? "text-accent" : ""}>EN</span>
          </button>

          <a
            href="#contact"
            data-cursor="link"
            className="rounded-full border border-accent px-5 py-2 text-xs font-semibold uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-black"
          >
            {t.nav.cta}
          </a>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-text transition-transform duration-300 ${
              menuOpen ? "translate-y-[4px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-text transition-transform duration-300 ${
              menuOpen ? "-translate-y-[4px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-black transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {links.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{
              transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
            }}
            className={`text-3xl font-semibold uppercase tracking-wide text-text transition-all duration-300 ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {link.label}
          </a>
        ))}
        <button
          type="button"
          onClick={toggleLanguage}
          className="mt-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-text-secondary"
        >
          <span className={language === "pt" ? "text-accent" : ""}>PT</span>
          <span aria-hidden="true">/</span>
          <span className={language === "en" ? "text-accent" : ""}>EN</span>
        </button>
        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          className="mt-2 rounded-full border border-accent px-6 py-3 text-sm font-semibold uppercase tracking-widest text-accent"
        >
          {t.nav.cta}
        </a>
      </div>
    </header>
  );
}
