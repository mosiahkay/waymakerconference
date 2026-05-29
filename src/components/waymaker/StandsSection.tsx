import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface Props { progress: number; onReserve: () => void; }

export function StandsSection({ progress, onReserve }: Props) {
  const opacity = Math.max(0, Math.min(1, progress < 0.5 ? progress * 2 : (1 - progress) * 2 + 0.4));
  return (
    <section className="fixed inset-0 flex items-center justify-center px-6 pointer-events-none" style={{ opacity }}>
      <div className="glass-strong rounded-3xl max-w-3xl w-full p-10 md:p-14 pointer-events-auto text-center">
        <p className="text-[10px] uppercase tracking-display text-primary mb-3 inline-flex items-center gap-2">
          <Sparkles className="h-3 w-3" /> 03 — Stands & Expositions
        </p>
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-display text-white leading-tight">
          L'allée des créateurs
        </h2>
        <p className="mt-5 text-white/70 max-w-xl mx-auto">
          Quatre univers se rencontrent à ciel ouvert — <span className="text-white">Tech, Littérature, Art, Espace Échanges</span>.
          Réserve ton espace, partage ta vision avec des milliers de visiteurs.
        </p>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 text-[10px] uppercase tracking-display">
          {["Art", "Food", "Tech", "Books"].map(t => (
            <div key={t} className="glass rounded-xl py-3 text-white/80">{t}</div>
          ))}
        </div>
        <Button onClick={onReserve} size="lg" className="mt-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--glow-orange)] uppercase tracking-display text-[11px] font-semibold px-8">
          Réserver un stand
        </Button>
      </div>
    </section>
  );
}