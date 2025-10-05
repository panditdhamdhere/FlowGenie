import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlowGenie - AI Agent Marketplace",
  description: "Create and deploy AI agents that autonomously trade NFTs, manage portfolios, and execute DeFi strategies on Flow blockchain",
  keywords: ["Flow", "Blockchain", "AI", "NFT", "Trading", "DeFi", "NBA Top Shot", "NFL All Day"],
  authors: [{ name: "FlowGenie Team" }],
  openGraph: {
    title: "FlowGenie - AI Agent Marketplace",
    description: "Create and deploy AI agents that autonomously trade NFTs on Flow blockchain",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowGenie - AI Agent Marketplace",
    description: "Create and deploy AI agents that autonomously trade NFTs on Flow blockchain",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
