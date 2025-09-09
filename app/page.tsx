'use client';

import { useEffect, useState } from "react";

export default function Home() {
  // Données de la barre
  const quota = 68;
  const max = 100;
  const percent = Math.min(100, (quota / max) * 100);

  // Animation du remplissage
  const [fill, setFill] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setFill(percent), 300); 
    return () => clearTimeout(t);
  }, [percent]);

  return (
    <main className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <header className="mb-6">
        <img
          src="/logo.png"
          alt="Kick’n Win Logo"
          className="h-[180px] mx-auto"
        />
      </header>

      {/* Titre principal */}
      <h1 className="mt-2 text-5xl md:text-6xl font-extrabold leading-tight">
        Oublie <span className="text-yellow-400">les bookmakers </span> :{" "}
        <span className="text-white">ici tu mises 0€</span>, mais tu gagnes
        vraiment{" "}
      </h1>

      {/* Sous-titre */}
      <p className="mt-4 max-w-2xl text-white/90">
        <br />
        L’app de pronostics foot{" "}
        <span className="text-yellow-400 font-bold">sans mises réelles </span>
        mais avec <span className="text-yellow-400 font-bold">de vrais gains</span>{" "}
        : Prouve que tu es le meilleur pronostiqueur, grimpes au classement et
        gagnes des vraies récompenses.
        <br />
        <br />
        <em>
          Des bons d'achats • Des coffrets cadeaux • Des maillots de foot • Et
          bien d'autres surprises...
        </em>
      </p>

      {/* Collecte email */}
    <br /> Réserve ta place parmi nos 100 bêtatesteurs immédiatement
      <div className="mt-10 w-full max-w-md">
        <form className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Ton email"
            className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
          <button
            type="submit"
            className="bg-cyan-400 hover:bg-cyan-500 text-white font-semibold px-6 py-3 rounded-lg shadow"
          >
            Je réserve ma place
          </button>
        </form>
        <p className="text-xs text-white/70 mt-2">
          Ton email sera utilisé uniquement pour la bêta fermée.
        </p>

        {/* Barre de progression animée */}
        <div className="w-full max-w-md mt-6">
          <p className="text-left text-sm text-white/80">Places restantes</p>
          <div className="w-full bg-white/30 rounded-full h-3 mt-1 overflow-hidden">
            <div
              className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 h-3 rounded-full transition-all duration-1000 ease-out shadow-lg"
              style={{ width: `${fill}%` }}
            ></div>
          </div>
          <p className="text-right text-sm text-white/80 mt-1">
            {quota} / {max} ({Math.round(percent)}%)
          </p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-3 justify-center mt-6">
          <span className="px-4 py-2 rounded-full bg-white text-blue-700 font-semibold">
            Pariez sur des vrais résultats foot
          </span>
          <span className="px-4 py-2 rounded-full bg-white text-blue-700 font-semibold">
            Gagner des places au classement en faisant les bons choix
          </span>
          <span className="px-4 py-2 rounded-full bg-white text-blue-700 font-semibold">
            Jeu 100% gratuit
          </span>
          <span className="px-4 py-2 rounded-full bg-white text-blue-700 font-semibold">
            18+ obligatoire
          </span>
        </div>
      </div>
    </main>
  );
}