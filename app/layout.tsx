import type { Metadata, Viewport } from "next";

// Vendored from the production theme, in the order the original page loads them.
import "./vendor/bootstrap.css";
import "./vendor/way-theme.css";
import "./vendor/slick.css";
import "./vendor/animate-subset.css";
// Local additions (inlined-SVG rules + the preloader).
import "./globals.css";

export const metadata: Metadata = {
  title: "Projects - WAY",
  description: "A creative agency for brands who dare to go their own WAY",
  icons: { icon: "/way/img/logo-59.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
