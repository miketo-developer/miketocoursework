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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Este script previene el parpadeo blanco al cargar la página en modo oscuro
  const themeScript = `
    let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || (!storedTheme && isDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  `;

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased`}>
        {children}
      </body>
    </html>
  );
}
