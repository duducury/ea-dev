import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
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
  title: "EA Dev — Websites & Digital Systems",
  description:
    "EA Dev is a developer studio built by Eduardo and Auler. We create websites, web systems and custom digital solutions for businesses.",
  openGraph: {
    title: "EA Dev — Websites & Digital Systems",
    description:
      "Websites, systems & digital experiences built by Eduardo & Auler.",
    images: ["/og-image.png"], // TODO: create a real og-image.png in /public
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
