// components/BetaSignupForm.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

export default function BetaSignupForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOk(false);

    const form = e.currentTarget;
    const pseudo = (form.elements.namedItem("pseudo") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    try {
      const res = await fetch("/api/airtable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo, email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erreur API");

      setOk(true);
      form.reset();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-gray-900/80 p-6 shadow-xl">
      {/* Logo centré */}
      <div className="mb-6 flex justify-center">
        <Image
          src="/logo2.png"
          alt="KicknWin logo"
          width={180}
          height={180}
          className="rounded-lg"
        />
      </div>

      <h1 className="mb-2 text-center text-2xl font-bold text-white">
        Inscription bêta
      </h1>
      <p className="mb-6 text-center text-gray-400">
        Laisse ton pseudo et ton email, on te tient au courant 👇
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="pseudo" className="mb-1 block text-sm font-medium text-gray-300">
            Pseudo
          </label>
          <input
            id="pseudo"
            name="pseudo"
            type="text"
            placeholder="Ex Zizou"
            required
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="ton@email.com"
            required
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500 disabled:opacity-50"
        >
          {loading ? "Envoi en cours..." : "S’inscrire"}
        </button>
      </form>

      {ok && (
        <p className="mt-4 text-center text-green-400">
          🎉 Merci ! Ton inscription est enregistrée.
        </p>
      )}
      {error && (
        <p className="mt-4 text-center text-red-400">⚠️ {error}</p>
      )}

      <p className="mt-6 text-center text-xs text-gray-500">
        En soumettant, tu acceptes que ton pseudo et ton email soient
        enregistrés dans Airtable.
      </p>
    </div>
  );
}


