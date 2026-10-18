import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { Announcement } from "@/components/announcement";
import { SiteFooter } from "@/components/site-footer";

const sans = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-manrope", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin", "cyrillic"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: "Cortex — ядро для ИИ-агентов в промышленности и финансах",
  description:
    "Cortex даёт ИИ-агентам память, картину мира и отчётность: онтология, граф знаний, журнал решений. Для среднего и крупного бизнеса.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${sans.variable} ${mono.variable}`}>
      <body className="antialiased">
        <Announcement />
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
