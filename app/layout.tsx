import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MiketoCourseWork | Catálogo MVP",
  description: "Guías paso a paso y código fuente limpio.",
};

// Script anti-parpadeo blanco - se inyecta sin tag <head> para evitar error de Next 16
const themeScript = `(function(){try{let isDark=window.matchMedia('(prefers-color-scheme: dark)').matches;let stored=localStorage.getItem('theme');if(stored==='dark'||(!stored&&isDark)){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased`}>
        {/* FIX Next 16: script directo en body, no dentro de <head> como React component */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}


