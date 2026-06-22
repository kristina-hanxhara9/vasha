import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const display = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VASHA — Mëso AI në shqip",
    template: "%s · VASHA",
  },
  description:
    "VASHA — hapësira ku gratë shqiptare mësojnë dhe përdorin inteligjencën artificiale për jetën e vërtetë. Në shqip, me ngrohtësi.",
  applicationName: "VASHA",
  authors: [{ name: "VASHA" }],
  keywords: ["AI", "shqip", "gra", "CV", "intervistë", "biznes", "mësim"],
};

export const viewport: Viewport = {
  themeColor: "#6B3A5B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sq" className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-dvh bg-ivory font-sans text-charcoal antialiased">
        <Providers>
          <div className="flex min-h-dvh flex-col">
            <Header />
            <main className="flex-1 pb-24 md:pb-0">{children}</main>
            <Footer />
          </div>
          <MobileNav />
        </Providers>
      </body>
    </html>
  );
}
