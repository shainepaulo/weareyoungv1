import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const gtAmerica = localFont({
  src: "./fonts/GTAmerica-ExtendedBold.woff2",
  variable: "--font-gt-america",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WAY.TV",
  description: "WAY.TV is a creative studio for ambitious visual projects.",
  keywords: ["studio", "production", "cinema", "music video", "paris", "creative", "film", "video"],
};

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={gtAmerica.variable}>
      <body>{children}</body>
    </html>
  );
}
