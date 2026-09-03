"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          {t.about.eyebrow}
        </p>
        <h2 className="text-[clamp(28px,4vw,48px)] font-semibold leading-snug tracking-tight text-text">
          {t.about.heading}
        </h2>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-text-secondary">
          {t.about.body}
        </p>
      </div>
    </section>
  );
}
