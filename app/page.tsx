"use client";

import { useMemo, useState } from "react";

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

export default function Page() {
  // Simule le compteur de places restantes
  const TOTAL_PLACES = 100;
  const [taken] = useState(32); // ex. 32 places déjà prises
  const remaining = useMemo(() => TOTAL_PLACES - taken, [taken]);
  const percent = useMemo(() => Math.round((taken / TOTAL_PLACES) * 100), [taken]);

  // Formulaire
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [birth, setBirth] = useState("");
  const [agree, setAgree] = useState(false);
  const [form, setForm] = useState<FormState>({ status: "idle" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // validations simples côté client
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setForm({ status: "error", message: "Email invalide." });
      return;
    }
    if (!pseudo.trim()) {
      setForm({ status: "error", message: "Entre un pseudo." });
      return;
    }
    if (!birth) {
      setForm({ status: "error", message: "Renseigne ta date de naissance." });
      return;
    }
    if (!agree) {
      setForm({
        status: "error",
        message: "Tu dois confirmer qu’il n’y a aucun pari en argent réel.",
      });
      return;
    }

    try {
      setForm({ status: "submitting" });

      // 👉 Ici tu feras l’appel API / sauvegarde (Google Sheet, DB, etc.)
      // Pour l’instant on simule une réussite :
      await new Promise((r) => setTimeout(r, 900));

      setForm({ status: "success" });
      setEmail("");
      setPseudo("");
      setBirth("");
      setAgree(false);
    } catch (err) {
      setForm({
        status: "error",
        message: "Oups. Réessaie dans un instant.",
      });
    }
  };

  return (
    <main>
      {/* Barre de nav */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚽</span>
            <span className="font-bold tracking-tight">Kick’n Win</span>
            <span className="ml-2 inline-flex items-center rounded-full bg-slate-900 text-white text-xs px-2 py-0.5">
              Bêta fermée
            </span>
          </div>
          <a href="#beta" className="text-sm font-medium text-slate-700 hover:text-slate-900">
            Rejoindre la bêta
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-8">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <p className="text-sm text-slate-500">Kick’n Win • Réunion</p>
            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight">
              Pronostique <span className="text-sky-600">sans argent</span>,{" "}
              gagne en <span className="text-sky-600">Kicks</span> ⚡
            </h1>
            <p className="mt-4 text-slate-600 max-w-prose">
              L’app de pronostics foot <strong>sans mises réelles</strong> :
              tu joues pour le fun, tu grimpes au classement et tu gagnes des Kicks.
              <br />100% gratuit • +18 ans • Anti-bookmakers
            </p>

            {/* compteur */}
            <div className="mt-6 max-w-md">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">
                  Places restantes
                </span>
                <span className="tabular-nums text-slate-700">
                  {remaining} / {TOTAL_PLACES} ({percent}%)
                </span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-sky-500 transition-[width] duration-700"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>

            {/* badges */}
            <ul className="mt-6 flex flex-wrap gap-2 text-xs">
              {["100% gratuit", "18+ obligatoire", "Sans argent réel", "Classements", "Défis entre amis"].map(
                (t) => (
                  <li key={t} className="rounded-full bg-sky-50 text-sky-700 border border-sky-100 px-3 py-1">
                    {t}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Formulaire */}
          <div id="beta" className="md:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
              <h2 className="text-xl font-semibold">
                Rejoins la bêta fermée <span className="text-slate-400">(100 places)</span>
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Inscris-toi pour être parmi les premiers testeurs de Kick’n Win.
              </p>

              <form onSubmit={onSubmit} className="mt-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-lg border-slate-300 focus:border-sky-500 focus:ring-sky-500"
                    placeholder="ton@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Pseudo
                  </label>
                  <input
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                    className="mt-1 w-full rounded-lg border-slate-300 focus:border-sky-500 focus:ring-sky-500"
                    placeholder="Ex: Nono974"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Date de naissance
                  </label>
                  <input
                    type="date"
                    value={birth}
                    onChange={(e) => setBirth(e.target.value)}
                    className="mt-1 w-full rounded-lg border-slate-300 focus:border-sky-500 focus:ring-sky-500"
                    required
                  />
                </div>

                <label className="flex items-start gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                  />
                  <span>
                    Aucun pari en argent réel. Les Kicks n’ont aucune valeur monétaire.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={form.status === "submitting"}
                  className="w-full rounded-xl bg-sky-600 text-white font-semibold py-3 hover:bg-sky-700 disabled:opacity-60"
                >
                  {form.status === "submitting" ? "Je réserve..." : "Je réserve ma place"}
                </button>

                {form.status === "error" && (
                  <p className="text-sm text-red-600">{form.message}</p>
                )}
                {form.status === "success" && (
                  <p className="text-sm text-emerald-600">
                    Merci ! Tu es bien sur liste d’attente ✨
                  </p>
                )}

                <p className="text-[12px] text-slate-500">
                  Kick’n Win est un jeu de pronostics sans argent réel. © {new Date().getFullYear()} Kick’n Win.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Bénéfices simples */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Fun & Compète",
              desc: "Des défis hebdos, un classement entre amis et des Kicks à collectionner.",
            },
            {
              title: "Sans argent réel",
              desc: "Zéro mise. Zéro dépôt. Zéro cash. Jouer doit rester un plaisir.",
            },
            {
              title: "Pensé anti-bookmakers",
              desc: "Un format qui valorise la régularité, pas la prise de risque.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-500">
          © {new Date().getFullYear()} Kick’n Win — Bêta fermée. Tous droits réservés.
        </div>
      </footer>
    </main>
  );
}