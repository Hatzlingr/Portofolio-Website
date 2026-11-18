import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

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

export const metadata: Metadata = {
  title: "Amirul Nur Cahyo (MirrDev) — Software Engineer & Informatics Student",
  description:
    "Personal portfolio of Amirul Nur Cahyo (MirrDev). Minimalist futuristic interface featuring high-performance web systems, full-stack projects, and interactive energy reactor theme switching.",
  keywords: [
    "Amirul Nur Cahyo",
    "MirrDev",
    "Software Engineer",
    "Full-Stack Developer",
    "Informatics Engineering",
    "Universitas Sriwijaya",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
  ],
  authors: [{ name: "Amirul Nur Cahyo", url: "https://github.com/MirrDev" }],
  creator: "MirrDev",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mirrdev.vercel.app",
    title: "Amirul Nur Cahyo (MirrDev) — Software Engineer & Informatics Student",
    description:
      "Minimalist futuristic personal portfolio inspired by Green Lantern aesthetics, showcasing software projects and technical proficiencies.",
    siteName: "Emerald Portfolio",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

// Reads the persisted theme before first paint. Without this, a returning
// yellow-theme visitor sees an emerald flash until React hydrates.
// See: node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md
const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("emerald_portfolio_theme");if(t==="yellow"){document.documentElement.setAttribute("data-theme","yellow")}}catch(e){}})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--text-primary)]">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
