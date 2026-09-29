import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { WelcomePopup } from "@/components/ui/WelcomePopup";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-google-sans-flex",
  display: "swap",
  preload: true,
});

const siteUrl = "https://gxcrecruitents.cosmolix.co.in";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "GenXCode — Build With Us",
    template: "%s | GenXCode",
  },

  description:
    "Join GenXCode — a technology community where developers, designers and builders collaborate, learn and create meaningful digital products.",

  applicationName: "GenXCode",

  authors: [
    {
      name: "GenXCode",
      url: siteUrl,
    },
  ],

  creator: "GenXCode",

  publisher: "GenXCode",

  keywords: [
    "GenXCode",
    "GenXCode recruitment",
    "GenXCode developers",
    "developer community",
    "technology community",
    "developer club",
    "student developers",
    "software engineering",
    "frontend engineering",
    "backend engineering",
    "full stack development",
    "product design",
    "technology projects",
    "open source",
    "developers India",
  ],

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: ["/icon.svg"],
    apple: ["/icon.svg"],
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "GenXCode",
    title: "GenXCode - Build With Us",
    description:
      "Join GenXCode and build alongside developers, designers and technology enthusiasts working on meaningful products and real-world problems.",
  },

  twitter: {
    card: "summary",
    title: "GenXCode - Build With Us",
    description:
      "Join GenXCode and build alongside developers, designers and technology enthusiasts working on meaningful products and real-world problems.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sansFont.variable}>
      <body>
        <SmoothScroll>
          <div className="flex min-h-[100dvh] flex-col">
            <Header />

            <main className="flex-1">{children}</main>

            <Footer />
          </div>
        </SmoothScroll>

        <WelcomePopup />
      </body>
    </html>
  );
}