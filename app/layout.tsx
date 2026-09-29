import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

// Using Plus Jakarta Sans as a high-quality alternative to Google Sans
const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-google-sans-flex", // Keep this variable name so globals.css works
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "GenXCode | Digital Engineering",
  description: "We craft high-performance digital experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      </body>
    </html>
  );
}