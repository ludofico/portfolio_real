import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import LenisProvider from "@/components/LenisProvider";
import ParticlesWrapper from "@/components/ParticlesWrapper";
import ScrollProgress from "@/components/ScrollProgress";
import { LanguageProvider } from "@/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ludovico Valenzano | Full-Stack AI Engineer",
  description:
    "Sviluppatore Full Stack e Architetto Software con focus su scalabilità aziendale e integrazione AI. Specializzato in architetture RAG, automazione e SEO tecnico.",
  keywords: [
    "Full-Stack Developer",
    "AI Engineer",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "Machine Learning",
    "RAG",
    "Turin",
    "Italy",
  ],
  authors: [{ name: "Ludovico Valenzano" }],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://ludovicovalenzano.dev",
    title: "Ludovico Valenzano | Full-Stack AI Engineer",
    description:
      "Sviluppatore Full Stack e Architetto Software specializzato in AI e automazione.",
    siteName: "Ludovico Valenzano Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ludovico Valenzano | Full-Stack AI Engineer",
    description:
      "Sviluppatore Full Stack e Architetto Software specializzato in AI e automazione.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-white`}
      >
        <LanguageProvider>
          <LenisProvider>
            {/* Particles Background */}
            <ParticlesWrapper
              particleCount={300}
              particleSpread={12}
              speed={0.08}
              particleColors={['#c6f135', '#00f5ff', '#ff00ff', '#ff6b35'].map(c => c + '')} // Adding transparency 
              moveParticlesOnHover={true}
              particleHoverFactor={1}

              alphaParticles={true}
              particleBaseSize={160}
              sizeRandomness={6}
              cameraDistance={16}
              disableRotation={false}
            />
            {/* Scroll progress indicator */}
            <ScrollProgress />
            {/* Custom cursor */}
            <CustomCursor />
            {/* Navigation */}
            <Navigation />
            {/* Main content */}
            {children}
            {/* Noise Overlay */}
            <div className="noise" />
          </LenisProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
