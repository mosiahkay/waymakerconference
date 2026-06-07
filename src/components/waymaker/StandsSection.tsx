import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface Props {
  progress: number;
  onReserve: () => void;
}

export function StandsSection({ progress, onReserve }: Props) {
  const opacity = Math.max(0, Math.min(1, progress < 0.5 ? progress * 2 : (1 - progress) * 2 + 0.4));

  return (
    <section
      id="stands"
      className="relative z-10 flex items-center justify-center px-5 py-16 md:fixed md:inset-0 md:px-6 md:py-0 md:pointer-events-none"
      style={{ opacity }}
    >
      <div className="glass-strong w-full max-w-3xl rounded-2xl p-7 text-center md:p-12 md:pointer-events-auto">
        <p className="mb-3 inline-flex items-center gap-2 text-[10px] uppercase tracking-display text-primary">
          <Sparkles className="h-3 w-3" /> 03 - Stands & Expositions
        </p>
        <h2 className="text-3xl font-bold uppercase leading-tight tracking-display text-white md:text-5xl">
          L'allee des createurs
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
          Quatre univers se rencontrent a ciel ouvert: <span className="text-white">Tech, litterature, art et espace echanges</span>.
          Reserve ton espace et partage ta vision avec les visiteurs.
        </p>
        <div className="mt-7 grid grid-cols-2 gap-3 text-[10px] uppercase tracking-display md:grid-cols-4">
          {["Art", "Food", "Tech", "Books"].map((item) => (
            <div key={item} className="glass rounded-xl py-3 text-white/80">
              {item}
            </div>
          ))}
        </div>
        <Button
          onClick={onReserve}
          size="lg"
          className="mt-8 rounded-full bg-primary px-8 text-[11px] font-semibold uppercase tracking-display text-primary-foreground shadow-[var(--glow-orange)] hover:bg-primary/90"
        >
          Reserver un stand
        </Button>
      </div>
    </section>
  );
}
