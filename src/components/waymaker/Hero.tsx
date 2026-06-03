import { ChevronDown } from "lucide-react";

interface Props { fade: number }

export function Hero({ fade }: Props) {
  return (
    <section
      className="fixed inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
      style={{ opacity: 1 - fade, transform: `translateY(${fade * -40}px)` }}
    >
      <p className="text-[10px] sm:text-xs uppercase tracking-display text-white/60 mb-6">
        Édition · 2026
      </p>
      <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-display uppercase leading-[0.95] text-glow">
        Waymaker<br />Conference
      </h1>
      <p className="mt-6 text-white/70 text-sm sm:text-base max-w-xl">
        Quatre soirées à ciel ouvert · 6 – 9 Aout · Lubumbashi
      </p>
      <div className="mt-10 pointer-events-auto">
        <button className="glass rounded-full px-7 py-3 text-[11px] uppercase tracking-display text-white hover:bg-white/10 transition">
          Découvrir l'expérience
        </button>
      </div>
      <ChevronDown className="absolute bottom-12 h-5 w-5 text-white/50 animate-bounce" />
    </section>
  );
}
