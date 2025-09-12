"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  // ===== Capacités =====
  const TOTAL = 100;

  // ===== Compteur dynamique (Airtable) =====
  const [used, setUsed] = useState(0);

  useEffect(() => {
    async function fetchCount() {
      try {
        // 👉 Nouvelle route dédiée au comptage
        const res = await fetch("/api/airtable/count", { cache: "no-store" });
        const data = await res.json();

        // Réponse attendue: { ok: true, count: number }
        if (typeof data?.count === "number") {
          setUsed(data.count);
          return;
        }

        // (fallback) si un jour la route renvoyait records
        if (Array.isArray(data?.airtable?.records)) {
          setUsed(data.airtable.records.length);
        }
      } catch (e) {
        console.error("Fetch count error:", e);
      }
    }

    // Premier chargement
    fetchCount();
    // Rafraîchit toutes les 5 secondes
    const id = setInterval(fetchCount, 5000);
    return () => clearInterval(id);
  }, []);

  const remaining = Math.max(0, TOTAL - used);
  const percent = Math.min(100, Math.round((used / TOTAL) * 100));

  return (
    <main className="flex flex-col items-center justify-start text-center">
      {/* HERO */}
      <section className="section pt-10 pb-6">
        {/* Logo + halo */}
        <div className="flex justify-center items-center mb-6">
          <div className="logo-badge">
            <img
              src="/logo2.png"
              alt="Kick’n Win Logo"
              className="h-[200px] md:h-[260px] w-auto select-none mx-auto"
              loading="eager"
            />
          </div>
        </div>

        {/* Titre principal */}
        <h1 className="mt-2 text-4xl md:text-6xl font-extrabold leading-tight">
          Oublie <span className="text-primary">les bookmakers</span> :{" "}
          <span className="text-secondary">ici tu mises 0€</span>, mais tu gagnes vraiment
        </h1>

        {/* Accroche */}
        <p className="mt-6 mx-auto max-w-2xl text-gray-300 text-lg">
          L’app de pronostics foot <span className="text-primary font-bold">100% gratuite</span> :
          chaque bon choix te fait grimper au classement et t’offre des récompenses réelles.
          Pas d’argent réel, juste des Kicks et des lots.
        </p>

        {/* CTA */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/inscription">
            <button className="btn-primary">🚀 Je réserve ma place</button>
          </Link>
          <button className="btn-secondary">Voir les lots</button>
        </div>

        <p className="mt-3 text-xs text-white/70">
          Ton email sera utilisé uniquement pour la bêta fermée.
        </p>

        {/* ===== Barre de progression ===== */}
        <div className="mt-8 max-w-md mx-auto w-full text-left">
          <div className="flex items-baseline justify-between mb-2">
            <p className="text-sm text-white/85">Places restantes</p>
            <p className="text-sm text-white/70">
              {used} / {TOTAL} ({percent}%)
            </p>
          </div>
          <div
            className="progress"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progression des places"
          >
            <div className="progress-bar" style={{ width: `${percent}%` }} />
          </div>
          <p className="mt-2 text-xs text-white/70">
            {remaining} place{remaining > 1 ? "s" : ""} disponible{remaining > 1 ? "s" : ""} — ça part vite !
          </p>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="section mt-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">⚽ Comment ça marche ?</h2>
        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div className="card p-6">
            <h3 className="text-xl font-bold text-secondary mb-2">1) Pronostique les matchs</h3>
            <p className="text-gray-300">Choisis tes résultats (victoire, nul, défaite) pour chaque rencontre.</p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-bold text-secondary mb-2">2) Gagne des points (Kicks)</h3>
            <p className="text-gray-300">Chaque bon prono augmente ton score et t’approche du sommet.</p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-bold text-secondary mb-2">3) Monte au classement</h3>
            <p className="text-gray-300">Dépasse les autres joueurs semaine après semaine.</p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-bold text-secondary mb-2">4) Remporte des lots réels</h3>
            <p className="text-gray-300">Bons d’achat, maillots, casques… Tes pronos paient enfin.</p>
          </div>
        </div>
      </section>

      {/* LOTS */}
      <section className="section mt-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">🎁 Ce que tu peux gagner</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
          {[
            "Bons d’achat Amazon",
            "Maillots de foot officiels",
            "Casques/écouteurs",
            "Cartes cadeaux (PSN/Xbox/Steam)",
            "Places de match",
            "Maillots dédicacés (opérations spéciales)",
            "Coffrets cadeaux sports",
            "Goodies Kick’n Win",
            "Ballons & équipements",
          ].map((label) => (
            <div key={label} className="card p-5">
              <p className="font-semibold">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* POURQUOI MIEUX */}
      <section className="section mt-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">💡 Pourquoi c’est mieux que parier</h2>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="card p-6"><h3 className="text-xl font-bold mb-2">0 risque, 100% fun</h3><p className="text-gray-300">Tu ne mets jamais d’argent réel. Tu joues pour tes Kicks et des lots.</p></div>
          <div className="card p-6"><h3 className="text-xl font-bold mb-2">Compétitif & fair-play</h3><p className="text-gray-300">Un classement clair, des règles simples, et des récompenses méritées.</p></div>
          <div className="card p-6"><h3 className="text-xl font-bold mb-2">Simple à prendre en main</h3><p className="text-gray-300">Pronostique en 30 secondes. Suis ta progression en temps réel.</p></div>
        </div>
      </section>

      {/* CTA final */}
      <section className="section mt-16 mb-16">
        <div className="card p-8 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-3">Prêt à grimper au classement ?</h3>
          <p className="text-gray-300 mb-6">Réserve ta place maintenant : c’est gratuit.</p>
          <Link href="/inscription">
            <button className="btn-primary">🎯 Je m’inscris</button>
          </Link>
        </div>
      </section>
    </main>
  );
}
