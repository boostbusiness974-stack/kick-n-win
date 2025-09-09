// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kick’n Win ⚡ Pronostics sans argent",
  description:
    "Pronostique sans argent, grimpe au classement et gagne des Kicks.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      {/* Fond bleu + texte blanc partout */}
      <body className="min-h-screen bg-blue-500 text-white font-sans antialiased">
        {/* Conteneur central pour la lisibilité */}
        <main className="mx-auto w-full max-w-6xl px-4 py-8 md:py-12">
          {children}
        </main>
      </body>
    </html>
  );
}