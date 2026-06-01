import poems from "@/data/poems.json";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4 my-8">
        <h1 className="font-serif text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-slate-100 to-indigo-300 py-2">
          Mes poèmes
        </h1>
        <p className="text-slate-400 max-w-md mx-auto italic font-serif">
          « Aucun poème ne sera si grand, si noble, si véritablement digne du nom de poème, que celui qui aura été écrit uniquement pour le plaisir d'écrire un poème. »
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {poems.map((poem) => (
          <Link 
            key={poem.id} 
            href={`/poemes/${poem.id}`}
            className="group block p-6 rounded-2xl bg-slate-900/40 border border-indigo-950/50 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1 shadow-xl backdrop-blur-sm"
          >
            <span className="text-xs text-indigo-400 font-mono">{poem.date}</span>
            <h2 className="font-serif text-xl text-indigo-100 group-hover:text-indigo-300 transition mt-2 mb-3">
              {poem.title}
            </h2>
            <p className="text-sm text-slate-400 line-clamp-3 font-sans leading-relaxed">
              {poem.summary}
            </p>
            <div className="mt-4 text-xs font-medium text-indigo-300 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Lire le poème <span>→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}