import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Mes Poèmes",
  description: "Recueil de poésies personnelles",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-gradient-to-b from-[#090d16] via-[#0b132b] to-[#1c2541] text-slate-200 min-h-screen font-sans selection:bg-indigo-500 selection:text-white">
        <header className="border-b border-indigo-950/40 backdrop-blur-md sticky top-0 z-50 py-6">
          <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
            <a href="/" className="font-serif text-2xl tracking-wide text-indigo-200 hover:text-indigo-100 transition">
              bad poetry
            </a>
            <nav className="text-sm text-slate-400 space-x-6">
              <a href="/" className="hover:text-indigo-300 transition">Recueil</a>
              <a href="#" className="hover:text-indigo-300 transition">À propos</a>
            </nav>
          </div>
        </header>
        
        <main className="max-w-4xl mx-auto px-6 py-12">{children}</main>
        
        <footer className="text-center py-12 text-xs text-slate-500 border-t border-indigo-950/20">
          © {new Date().getFullYear()} lio inc
        </footer>
      </body>
    </html>
  );
}