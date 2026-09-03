"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import { dictionary, type Dictionary, type Language } from "./dictionary";

const STORAGE_KEY = "ea-dev-lang";
const listeners = new Set<() => void>();

function getSnapshot(): Language {
  return window.localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "pt";
}

function getServerSnapshot(): Language {
  return "pt";
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function persistLanguage(lang: Language) {
  window.localStorage.setItem(STORAGE_KEY, lang);
  listeners.forEach((callback) => callback());
}

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextValue = {
    language,
    setLanguage: persistLanguage,
    toggleLanguage: () => persistLanguage(language === "pt" ? "en" : "pt"),
    t: dictionary[language],
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
