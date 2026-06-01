import poems from "@/data/poems.json";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PoemPage({ params }: PageProps) {
  const { id } = await params;
  const poem = poems.find((p) => p.id === id);

  if (!poem) {
    notFound();
  }

  return (
    <article className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <Link href="/" className="text-sm text-indigo-400 hover:text-indigo-300 transition inline-flex items-center gap-2">
        ← Retour au recueil
      </Link>
      
      <div className="space-y-2 border-b border-indigo-950/40 pb-6">
        <h1 className="font-serif text-3xl md:text-4xl text-indigo-100 tracking-wide">
          {poem.title}
        </h1>
        <p className="text-xs text-slate-400 font-mono">Publié le {poem.date}</p>
      </div>

      {/* Rendu du poème en préservant les sauts de ligne (\n) */}
      <div className="font-serif text-lg md:text-xl text-slate-300 leading-loose tracking-wide whitespace-pre-line italic md:pl-8 border-l border-indigo-500/20 py-2">
        {poem.content}
      </div>
    </article>
  );
}