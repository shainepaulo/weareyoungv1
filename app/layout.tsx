import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@/components/chrome/chrome.css";
import { Nav } from "@/components/chrome/Nav";
import { Footer } from "@/components/chrome/Footer";
import { Cursor } from "@/components/chrome/Cursor";
import { Intro } from "@/components/chrome/Intro";

/** The studio's voice. Kept from the current site — it is the identity. */
const druk = localFont({
  src: "./fonts/DrukWide-Medium.woff2",
  weight: "500",
  variable: "--font-druk",
  display: "swap",
});

/** For everything small. A typewriter, so the big type has something to argue with. */
const typewriter = localFont({
  src: "./fonts/MonospaceTypewriter.ttf",
  weight: "400",
  variable: "--font-mono-tw",
  display: "swap",
});

const SITE = "https://www.weareyoung-agency.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "WAY — We Are Young",
    template: "%s — WAY",
  },
  description: "A creative agency for brands who dare to go their own WAY. Paris, 15+ years.",
  openGraph: {
    siteName: "We Are Young",
    type: "website",
    locale: "fr_FR",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${druk.variable} ${typewriter.variable}`}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Nav />
        {children}
        <Footer />
        <Cursor />
        <Intro />
      </body>
    </html>
  );
}
