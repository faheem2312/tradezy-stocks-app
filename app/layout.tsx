import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";

const geist = localFont({
  src: "./../public/fonts/Geist-Regular.woff2",
  variable: "--font-geist",
});

const geistMono = localFont({
  src: "./../public/fonts/GeistMono-Regular.woff2",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Signalist",
  description: "Track real-time stock prices, get personalized alerts and explore detailed company insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}