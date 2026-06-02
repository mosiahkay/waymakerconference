import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Clock, MapPin, Search, Sparkles, Music, Mic2, HandHeart, Sun, Moon, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/programme")({
  head: () => ({
    meta: [
      { title: "Programme · Waymaker Conference EDEN 2025" },
      { name: "description", content: "Trois jours, trois soirées à ciel ouvert. Découvrez le programme complet de la Waymaker Conference EDEN 2025." },
    ],
  }),
  component: ProgrammePage,
});

type Kind = "worship" | "talk" | "prayer" | "experience";

interface Session {
  time: string;
  title: string;
  speaker?: string;
  location: string;
  kind: Kind;
  description: string;
}

interface Day {
  id: string;
  label: string;
  date: string;
  theme: string;
  icon: typeof Sun;
  sessions: Session[];
}

const DAYS: Day[] = [
  {
    id: "j1",
    label: "Vendredi",
    date: "12 décembre 2025",
    theme: "Ouverture — L'appel d'EDEN",
    icon: Sun,
    sessions: [
      { time: "16:00", title: "Accueil & Village des stands", location: "Esplanade", kind: "experience", description: "Ouverture des portes, accueil café, découverte du village partenaires et des espaces d'art." },
      { time: "18:00", title: "Pré-louange acoustique", speaker: "Collectif Waymaker", location: "Scène Jardin", kind: "worship", description: "Set acoustique au coucher du soleil pour entrer dans l'atmosphère." },
      { time: "19:30", title: "Cérémonie d'ouverture", speaker: "Pasteur Yvan Castanou", location: "Scène Principale", kind: "talk", description: "Déclaration prophétique d'ouverture, vision EDEN et accueil officiel." },
      { time: "21:00", title: "Nuit de louange — EDEN", speaker: "Hillsong United · Dena Mwana", location: "Scène Principale", kind: "worship", description: "Première nuit immersive. Visuels cinématiques, chœur de 200 voix." },
      { time: "23:30", title: "Prière de minuit", location: "Tente Sanctuaire", kind: "prayer", description: "Veillée intercession ouverte jusqu'à 2h du matin." },
    ],
  },
  {
    id: "j2",
    label: "Samedi",
    date: "13 décembre 2025",
    theme: "Vision — Bâtir le chemin",
    icon: Flame,
    sessions: [
      { time: "09:00", title: "Petit-déjeuner leaders", location: "Salon Olivier", kind: "experience", description: "Rencontre réservée aux pasteurs et responsables ministères inscrits." },
      { time: "10:30", title: "Masterclass — Leadership prophétique", speaker: "Dr. Mensa Otabil", location: "Salle Cèdre", kind: "talk", description: "Atelier 90 min. Inscription sur place, places limitées." },
      { time: "14:00", title: "Panel — Culture & Foi en Afrique", speaker: "5 voix panafricaines", location: "Scène Forum", kind: "talk", description: "Conversation modérée sur l'impact culturel du Réveil." },
      { time: "16:30", title: "Atelier artistes & créatifs", speaker: "Collectif Maison", location: "Studio Art", kind: "experience", description: "Création collaborative — peinture live, design, mode." },
      { time: "19:00", title: "Session principale — Soir 2", speaker: "Bishop T.D. Jakes", location: "Scène Principale", kind: "talk", description: "Message phare de la conférence." },
      { time: "21:00", title: "Nuit de gloire", speaker: "Maverick City · Athoms Mbuma", location: "Scène Principale", kind: "worship", description: "Louange continue, déclarations prophétiques, baptêmes du Saint-Esprit." },
    ],
  },
  {
    id: "j3",
    label: "Dimanche",
    date: "14 décembre 2025",
    theme: "Envoi — Rendez-vous prophétique",
    icon: Moon,
    sessions: [
      { time: "10:00", title: "Culte d'envoi", speaker: "Pasteur Mohammed Sanogo", location: "Scène Principale", kind: "worship", description: "Adoration et message d'envoi pour les 15 000 participants." },
      { time: "12:30", title: "Agape & rencontres", location: "Village EDEN", kind: "experience", description: "Repas partagé, food trucks, rencontres entre ministères." },
      { time: "15:00", title: "Conférence — Bâtisseurs de demain", speaker: "Pasteur Marcello Tunasi", location: "Scène Principale", kind: "talk", description: "Session dédiée à la nouvelle génération de leaders." },
      { time: "17:30", title: "Prière prophétique d'envoi", location: "Tente Sanctuaire", kind: "prayer", description: "Imposition des mains, prophéties personnelles, envoi missionnaire." },
      { time: "19:00", title: "Finale — Rendez-vous", speaker: "Tous les artistes", location: "Scène Principale", kind: "worship", description: "Clôture officielle. Hymne d'EDEN. Feux d'artifice." },
    ],
  },
];

const KIND_META: Record<Kind, { label: string; icon: typeof Music; color: string }> = {
  worship: { label: "Louange", icon: Music, color: "from-amber-400 to-orange-500" },
  talk: { label: "Message", icon: Mic2, color: "from-orange-400 to-rose-500" },
  prayer: { label: "Prière", icon: HandHeart, color: "from-yellow-300 to-amber-500" },
  experience: { label: "Expérience", icon: Sparkles, color: "from-amber-300 to-yellow-500" },
};

function ProgrammePage() {
  const [activeDay, setActiveDay] = useState(DAYS[0].id);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Kind | "all">("all");
  const [openSession, setOpenSession] = useState<string | null>(null);

  const day = DAYS.find((d) => d.id === activeDay)!;

  const filtered = useMemo(() => {
    return day.sessions.filter((s) => {
      const matchKind = filter === "all" || s.kind === filter;
      const q = query.trim().toLowerCase();
      const matchQuery = !q || s.title.toLowerCase().includes(q) || (s.speaker ?? "").toLowerCase().includes(q) || s.location.toLowerCase().includes(q);
      return matchKind && matchQuery;
    });
  }, [day, filter, query]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[radial-gradient(ellipse_at_top,#3a1a05_0%,#0a0604_55%,#000_100%)] text-white">
      {/* Ambient gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-[40rem] w-[40rem] rounded-full bg-orange-500/20 blur-[120px]" />
        <div className="absolute top-1/2 -right-40 h-[35rem] w-[35rem] rounded-full bg-amber-400/15 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full bg-rose-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-28 pb-24">
        {/* Back link */}
        <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition mb-10">
          <ArrowLeft className="h-3.5 w-3.5" /> Retour à l'expérience
        </Link>

        {/* Header */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-[10px] uppercase tracking-[0.35em] text-amber-300/80 mb-3">Waymaker Conference · EDEN 2025</div>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] text-glow mb-4">Le Programme</h1>
          <p className="text-white/70 max-w-2xl text-base md:text-lg">
            Trois jours pour bâtir, recevoir et renvoyer. Une chorégraphie de louange, de parole et de rencontres — pensée comme un seul mouvement prophétique.
          </p>
        </div>

        {/* Day tabs */}
        <div className="mt-12 flex flex-wrap gap-3">
          {DAYS.map((d) => {
            const Icon = d.icon;
            const active = d.id === activeDay;
            return (
              <button
                key={d.id}
                onClick={() => { setActiveDay(d.id); setOpenSession(null); }}
                className={`group relative rounded-2xl px-5 py-4 text-left transition-all ${active ? "bg-gradient-to-br from-amber-500/30 to-orange-600/20 border border-amber-300/40 shadow-[0_0_40px_-10px_rgba(245,158,11,0.6)]" : "glass-strong border border-white/5 hover:border-white/20"}`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${active ? "text-amber-300" : "text-white/60"}`} />
                  <span className="text-[10px] uppercase tracking-[0.25em] text-white/60">{d.date}</span>
                </div>
                <div className={`mt-1 text-lg font-semibold ${active ? "text-white" : "text-white/80"}`}>{d.label}</div>
                <div className="text-xs text-white/50 max-w-[180px] mt-0.5">{d.theme}</div>
              </button>
            );
          })}
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un orateur, un atelier, un lieu…"
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-amber-400/40"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {(["all", ...Object.keys(KIND_META)] as const).map((k) => (
              <button
                key={k}
                onClick={() => setFilter(k as Kind | "all")}
                className={`rounded-full px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em] transition ${filter === k ? "bg-amber-400 text-black font-semibold" : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"}`}
              >
                {k === "all" ? "Tout" : KIND_META[k as Kind].label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-12 relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-amber-400/60 via-orange-400/20 to-transparent" />

          <>
            {filtered.length === 0 ? (
              <div className="py-16 text-center text-white/50">
                Aucune session ne correspond à ta recherche.
              </div>
            ) : (
              <ul className="space-y-4">
                {filtered.map((s, i) => {
                  const id = `${day.id}-${i}`;
                  const meta = KIND_META[s.kind];
                  const Icon = meta.icon;
                  const open = openSession === id;
                  return (
                    <li
                      key={id}
                      className="relative pl-10 animate-in fade-in slide-in-from-left-4 duration-500"
                    >
                      <div className={`absolute left-0 top-5 h-4 w-4 rounded-full bg-gradient-to-br ${meta.color} shadow-[0_0_20px_rgba(245,158,11,0.6)] ring-4 ring-black/60`} />
                      <button
                        onClick={() => setOpenSession(open ? null : id)}
                        className={`w-full text-left rounded-2xl border transition-all ${open ? "border-amber-300/40 bg-black/60 shadow-[0_0_50px_-15px_rgba(245,158,11,0.5)]" : "border-white/5 bg-black/40 hover:border-white/15 hover:bg-black/50"} backdrop-blur-xl p-5`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="shrink-0">
                            <div className="flex items-center gap-1.5 text-amber-300 font-mono text-sm font-semibold">
                              <Clock className="h-3.5 w-3.5" /> {s.time}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] bg-gradient-to-r ${meta.color} text-black font-semibold`}>
                                <Icon className="h-3 w-3" /> {meta.label}
                              </span>
                              <span className="text-[10px] uppercase tracking-[0.18em] text-white/40 inline-flex items-center gap-1">
                                <MapPin className="h-3 w-3" /> {s.location}
                              </span>
                            </div>
                            <div className="text-lg font-semibold text-white leading-tight">{s.title}</div>
                            {s.speaker && <div className="text-sm text-white/60 mt-0.5">avec {s.speaker}</div>}
                            <>
                              {open && (
                                <div className="overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                                  <p className="text-sm text-white/70 mt-3 pt-3 border-t border-white/10">{s.description}</p>
                                </div>
                              )}
                            </>
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-3xl border border-amber-300/20 bg-gradient-to-br from-amber-500/10 via-orange-600/5 to-transparent p-8 md:p-12 text-center backdrop-blur-xl">
          <h3 className="font-display text-3xl md:text-4xl text-glow mb-3">Rendez-vous à EDEN.</h3>
          <p className="text-white/70 max-w-xl mx-auto mb-6">Le programme évolue. Reviens régulièrement — ou écris-nous pour recevoir la version finale.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="rounded-full bg-amber-400 text-black hover:bg-amber-300 font-semibold">
              <a href="mailto:contact@waymaker.experience?subject=Programme%20EDEN%202025">Recevoir le programme</a>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10">
              <Link to="/">Retour à l'expérience</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
