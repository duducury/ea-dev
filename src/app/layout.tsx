import type { Metadata, Viewport } from "next";
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

const siteUrl = "https://ea-dev-ten.vercel.app";

const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "EA Dev",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "EA Dev — Sites e Soluções Digitais",
  description:
    "Criamos sites, sistemas web, e-commerce e soluções digitais sob medida para empresas. Sites que transformam visitantes em clientes.",
  applicationName: "EA Dev",
  appleWebApp: {
    title: "EA Dev",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "EA Dev — Sites e Soluções Digitais",
    description:
      "Sites, sistemas web, e-commerce e soluções digitais construídos para ajudar o seu negócio a crescer.",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "EA Dev — Sites e Soluções Digitais",
    description:
      "Sites, sistemas web, e-commerce e soluções digitais construídos para ajudar o seu negócio a crescer.",
    images: [ogImage.url],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
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
