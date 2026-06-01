"use client";

import { publierPoeme } from "./actions";
import { useState } from "react";

export default function EcrirePage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    try {
      await publierPoeme(formData);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="font-serif text-3xl text-indigo-200">Laisser courir la plume...</h1>

      {status === "success" ? (
        <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 space-y-3">
          <p className="font-medium">✨ Votre poème a été envoyé aux étoiles avec succès !</p>
          <p className="text-sm text-emerald-400/80">Vercel est en train de reconstruire le site. Il sera visible en ligne d'ici une minute.</p>
          <a href="/" className="inline-block text-sm underline hover:text-white mt-2">Retour à l'accueil</a>
        </div>
      ) : (
        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Titre du poème</label>
            <input 
              name="title" 
              type="text" 
              required 
              className="w-full bg-slate-900/60 border border-indigo-950/60 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-indigo-500 transition"
              placeholder="Écrivez le titre..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Le Poème</label>
            <textarea 
              name="content" 
              rows={12} 
              required 
              className="w-full bg-slate-900/60 border border-indigo-950/60 rounded-xl px-4 py-3 text-slate-100 font-serif text-lg leading-relaxed focus:outline-none focus:border-indigo-500 transition whitespace-pre-wrap"
              placeholder="Vos vers ici..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Clé d'écriture (Mot de passe)</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="w-full bg-slate-900/60 border border-indigo-950/60 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-indigo-500 transition"
              placeholder="••••••••"
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-rose-400">Une erreur est survenue (vérifiez le mot de passe ou la configuration).</p>
          )}

          <button 
            type="submit" 
            disabled={status === "loading"}
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-medium py-3 px-6 rounded-xl transition shadow-lg shadow-indigo-950/50 disabled:opacity-50"
          >
            {status === "loading" ? "Publication en cours..." : "Publier le poème"}
          </button>
        </form>
      )}
    </div>
  );
}