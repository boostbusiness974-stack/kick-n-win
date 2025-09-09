import "./globals.css";

export const metadata = {
  title: "Kick’n Win — Pronostics sans argent, vrais gains",
  description: "App de pronostics foot 100% gratuite : grimpe au classement, gagne des Kicks et des récompenses réelles.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}