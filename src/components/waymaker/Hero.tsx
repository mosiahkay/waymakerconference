import { ChevronDown } from "lucide-react";

interface Props {
  fade: number;
}

export function Hero({ fade }: Props) {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center md:fixed md:inset-0 md:min-h-0 md:pointer-events-none"
      style={{ opacity: 1 - fade, transform: `translateY(${fade * -28}px)` }}
    >
      <p className="mb-5 text-[10px] uppercase tracking-display text-white/60 sm:text-xs">
        Edition 2026
      </p>
      <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-display text-glow sm:text-7xl md:text-8xl">
        Waymaker
        <br />
        Conference
      </h1>
      <p className="mt-6 max-w-xl text-sm text-white/75 sm:text-base">
        Quatre jours a ciel ouvert - 6 au 9 Aout - Lubumbashi
      </p>
      <div className="mt-10 md:pointer-events-auto">
        <a
          href="#speakers"
          className="glass inline-flex rounded-full px-7 py-3 text-[11px] uppercase tracking-display text-white transition hover:bg-white/10"
        >
          Decouvrir l'experience
        </a>
      </div>
      <ChevronDown className="absolute bottom-12 h-5 w-5 animate-bounce text-white/50" />
    </section>
  );
}
