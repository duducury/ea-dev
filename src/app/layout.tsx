import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://eadev.com"; // TODO: replace with the real production domain

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "EA Dev — Sites & Sistemas Digitais",
  description:
    "EA Dev é um estúdio de desenvolvimento criado por Eduardo e Auler. Criamos sites, sistemas web e soluções digitais sob medida para empresas.",
  openGraph: {
    title: "EA Dev — Sites & Sistemas Digitais",
    description: "Sites, sistemas e experiências digitais construídos por Eduardo & Auler.",
    images: ["/og-image.png"], // TODO: create a real og-image.png in /public
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        <LanguageProvider>
          <CustomCursor />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
