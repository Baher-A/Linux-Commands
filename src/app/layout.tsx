import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Particles from "@/components/Particles";

import { JetBrains_Mono } from "next/font/google";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Command Test",
  description: "Test your Linux command speed",
  icons: {
    icon: "/favicon.png",
  },
};
const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jbmono.variable} antialiased overflow-x-hidden`}
      >
        <Particles
          particleColors={["#c5c5c5", "#c5c5c5", "#c5c5c5"]}
          particleCount={150}
          particleSpread={10}
          speed={0.07}
          particleBaseSize={100}
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />

        {children}
      </body>
    </html>
  );
}
