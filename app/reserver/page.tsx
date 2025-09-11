// app/reserver/page.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ReservePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [favoriteTeam, setFavoriteTeam] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch('/api/collect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, favoriteTeam }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Erreur inconnue');
      setMsg({ type: 'ok', text: "Top ! Ta place est réservée 🎉" });
      setName('');
      setEmail('');
      setFavoriteTeam('');
    } catch (err: any) {
      setMsg({ type: 'err', text: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(1200px_600px_at_50%_-100px,#18263a_0%,#0B1220_50%,#0B1220_100%)] text-white">
      <section className="max-w-2xl mx-auto px-6 py-16">
        <Link href="/" className="text-white/70 hover:text-white">&larr; Retour</Link>
        <h1 className="mt-6 text-4xl md:text-5xl font-extrabold">Je réserve ma place</h1>
        <p className="mt-3 text-white/80">
          Laisse ton email pour la bêta fermée de Kick’n Win. C’est gratuit et sans engagement.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm mb-1">Nom complet</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Ex: Alex Dupont"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Adresse email *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="ton@email.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Équipe préférée (optionnel)</label>
            <input
              value={favoriteTeam}
              onChange={(e) => setFavoriteTeam(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Ex: OM, PSG, OL…"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary bg-[#FF3B3B] hover:opacity-90 font-semibold px-6 py-3 rounded-lg shadow disabled:opacity-50"
          >
            {loading ? 'Envoi...' : 'Je confirme ma réservation'}
          </button>
        </form>

        {msg && (
          <p
            className={`mt-4 text-sm ${
              msg.type === 'ok' ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {msg.text}
          </p>
        )}

        <p className="mt-8 text-xs text-white/60">
          Ton email sera utilisé uniquement pour la bêta. Tu pourras te désinscrire à tout moment.
        </p>
      </section>
    </main>
  );
}