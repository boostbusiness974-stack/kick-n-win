// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kick’n Win ⚡ Pronostics sans mises, vrais gains",
  description:
    "Pronostique les matchs sans dépenser 1€ : grimpe au classement, gagne des Kicks et repars avec des récompenses réelles.",
  metadataBase: new URL("https://kick-n-winvercel.app"),
  openGraph: {
    title: "Kick’n Win ⚡ Pronostics sans mises, vrais gains",
    description:
      "L’app de pronostics foot 100% gratuite : tu mises 0€, tu gagnes vraiment.",
    url: "https://kick-n-winvercel.app",
    siteName: "Kick’n Win",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Kick’n Win" }],
    type: "website",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gradient-to-b from-blue-600 via-sky-600 to-cyan-600 text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}