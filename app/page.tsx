// app/page.tsx
export default function Home() {
  return (
    <main className="flex flex-col items-center px-6 py-10 md:py-14">
      {/* Header / Logo */}
      <header className="w-full max-w-5xl flex items-center justify-between gap-4">
        <img
          src="/logo2.png"
          alt="Kick’n Win Logo"
          className="h-[56px] md:h-[68px] select-none"
        />
        <span className="hidden sm:inline-block text-sm text-white/80">
          Bêta fermée — 68/100 places
        </span>
      </header>

      {/* Hero */}
      <section className="w-full max-w-5xl mt-10 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Oublie <span className="text-yellow-400">les bookmakers</span> : ici tu
          mises <span className="whitespace-nowrap">0€</span>,{" "}
          <span className="text-yellow-300">mais tu gagnes vraiment</span> !
        </h1>

        <p className="mt-5 mx-auto max-w-2xl text-white/90 text-lg">
          L’app de pronostics foot <strong>100% gratuite</strong> où chaque bon
          choix te rapproche du sommet. Tu grimpes au classement, tu gagnes des{" "}
          <strong>Kicks</strong>… et tu repars avec de <em>vraies</em>{" "}
          récompenses.
        </p>

        {/* Barre de progression (animée) */}
        <div className="mx-auto mt-6 max-w-xl">
          <div className="flex items-center justify-between text-sm text-white/80">
            <span>Places restantes</span>
            <span>68 / 100 (32%)</span>
          </div>
          <div className="mt-2 h-3 rounded-full bg-white/25 overflow-hidden shimmer">
            <div
              className="h-full bg-cyan-400 rounded-full progress-fill"
              style={{ width: "32%" }}
              aria-hidden
            />
          </div>
        </div>

        {/* Email CTA */}
        <div className="mt-8 w-full max-w-xl mx-auto">
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Ton email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-cyan-400 hover:bg-cyan-500 text-white font-semibold shadow-lg shadow-cyan-900/20 transition"
            >
              Je réserve ma place
            </button>
          </form>
          <p className="text-xs text-white/70 mt-2">
            Ton email sera utilisé uniquement pour la bêta fermée.
          </p>
        </div>

        {/* Badges rapides */}
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <span className="badge">Sans argent réel</span>
          <span className="badge">Classements</span>
          <span className="badge">Défis entre amis</span>
          <span className="badge">100% gratuit</span>
          <span className="badge">18+ obligatoire</span>
        </div>
      </section>

      {/* Comment ça marche */}
      <section id="comment-ca-marche" className="w-full max-w-5xl mt-16">
        <h2 className="section-title">Comment ça marche ?</h2>
        <ol className="grid md:grid-cols-2 gap-6 mt-6">
          <li className="card">
            <h3 className="card-title">1) Pronostique les matchs</h3>
            <p>Sélectionne victoire, nul ou défaite pour chaque rencontre.</p>
          </li>
          <li className="card">
            <h3 className="card-title">2) Gagne des points (Kicks)</h3>
            <p>Chaque bon prono augmente ton score selon notre barème équitable.</p>
          </li>
          <li className="card">
            <h3 className="card-title">3) Monte au classement</h3>
            <p>Affronte les autres joueurs, grimpe semaine après semaine.</p>
          </li>
          <li className="card">
            <h3 className="card-title">4) Remporte des lots réels</h3>
            <p>Des bons d’achat, maillots, casques… tes pronos paient enfin !</p>
          </li>
        </ol>
      </section>

      {/* Lots à gagner */}
      <section id="lots" className="w-full max-w-5xl mt-16">
        <h2 className="section-title">Les lots à gagner</h2>
        <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Bons d’achat Amazon",
            "Maillots officiels de clubs",
            "Casque audio Bluetooth",
            "Cartes cadeaux Decathlon",
            "Ballons pro & équipements",
            "Places de match (selon dispo)",
            "Abonnements streaming sport",
            "Goodies Kick’n Win exclusifs",
            "Coffrets cadeaux & réductions",
          ].map((label) => (
            <li key={label} className="prize-item">{label}</li>
          ))}
        </ul>
      </section>

      {/* Pourquoi nous ? */}
      <section id="pourquoi-nous" className="w-full max-w-5xl mt-16">
        <h2 className="section-title">Pourquoi choisir Kick’n Win ?</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="card-title">0€ de mises • 0 risque</h3>
            <p>Tu joues gratuitement, tu gagnes des récompenses réelles.</p>
          </div>
          <div className="card">
            <h3 className="card-title">Barème équitable</h3>
            <p>Un système de points pensé pour valoriser le vrai flair.</p>
          </div>
          <div className="card">
            <h3 className="card-title">Défis & social</h3>
            <p>Crée des ligues privées, défie tes amis, partage tes perfs.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="w-full max-w-5xl mt-16">
        <h2 className="section-title">FAQ</h2>
        <div className="mt-6 space-y-4">
          <details className="faq">
            <summary>Est-ce vraiment gratuit ?</summary>
            <p>Oui. Aucune mise réelle. Les lots sont financés par la plateforme/partenaires.</p>
          </details>
          <details className="faq">
            <summary>Comment sont calculés les Kicks ?</summary>
            <p>Selon la justesse de tes pronos et la difficulté des matchs (barème validé).</p>
          </details>
          <details className="faq">
            <summary>Quand sont distribués les lots ?</summary>
            <p>À la fin de chaque période/événement, selon le classement.</p>
          </details>
        </div>
      </section>

      {/* CTA final */}
      <section id="cta" className="w-full max-w-5xl mt-16 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Prêt à prouver que tu es le meilleur pronostiqueur ?
        </h2>
        <p className="mt-3 text-white/90">
          Réserve ta place dans la bêta fermée. C’est maintenant.
        </p>
        <button className="mt-5 px-8 py-4 rounded-lg bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition shadow-lg">
          Je m’inscris
        </button>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-5xl mt-16 py-8 text-center text-white/70 text-sm">
        © {new Date().getFullYear()} Kick’n Win — Tous droits réservés.
      </footer>
    </main>
  );
}