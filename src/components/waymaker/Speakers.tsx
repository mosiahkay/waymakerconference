import { Music, Mic, BookOpen, Instagram } from "lucide-react";

const SPEAKERS = [
  { name: "Pst. Daniel Mbala", role: "Pasteur Principal", color: "text-orange-300", bio: "Voix prophétique de la nouvelle génération, il porte un message de réveil pour les nations." },
  { name: "Sarah Lukombo", role: "Leader de Louange", color: "text-amber-300", bio: "Architecte sonore d'une louange spontanée qui transforme l'atmosphère." },
  { name: "Pst. Joël Kazadi", role: "Orateur", color: "text-rose-300", bio: "Théologien et auteur, il décrypte les mystères des temps modernes." },
  { name: "Esther Mwamba", role: "Apôtre", color: "text-pink-300", bio: "Mère spirituelle d'un mouvement de réveil panafricain." },
  { name: "Jeremy Tshibuyi", role: "Artiste / MC", color: "text-violet-300", bio: "Pont entre culture urbaine et message d'espérance." },
  { name: "Pst. Aimée Bisimwa", role: "Enseignante", color: "text-fuchsia-300", bio: "Spécialiste de la formation des leaders émergents." },
  { name: "Israël Kabongo", role: "Leader de Louange", color: "text-indigo-300", bio: "Compositeur worship dont les chants traversent les continents." },
  { name: "Pst. Gloire Ntumba", role: "Orateur Invité", color: "text-sky-300", bio: "Mentor de planteurs d'églises, voix de la réforme." },
  { name: "Naomi Tshibola", role: "Psalmiste", color: "text-cyan-300", bio: "Sa voix porte une onction de guérison et de délivrance." },
  { name: "Pst. Benjamin Mukendi", role: "Apôtre", color: "text-teal-300", bio: "Bâtisseur d'une génération sans compromis, pleine de feu." },
];

interface Props { progress: number }

export function Speakers({ progress }: Props) {
  const total = SPEAKERS.length;
  const translateX = Math.max(0, Math.min(1, progress)) * (total - 1) * 22;

  return (
    <section className="fixed inset-0 flex flex-col justify-center overflow-hidden pointer-events-none">
      <div className="px-8 mb-8">
        <p className="text-[10px] uppercase tracking-display text-primary/90">02 — La Scène</p>
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-display text-white">Dix voix. Une vision.</h2>
      </div>
      <div className="flex gap-6 will-change-transform" style={{ transform: `translateX(calc(20vw - ${translateX}vw))`, transition: "transform 0.15s linear" }}>
        {SPEAKERS.map((s, i) => (
          <article key={i} className="glass-strong rounded-3xl shrink-0 w-[22vw] min-w-[280px] aspect-[3/4] p-5 flex flex-col justify-end pointer-events-auto relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/5 via-transparent to-primary/20" />
            <div className="absolute top-5 right-5 h-20 w-20 rounded-full bg-gradient-to-br from-primary/40 to-rose-500/30 blur-2xl" />
            <div className="flex items-center justify-center flex-1">
              <div className="h-32 w-32 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/20 flex items-center justify-center text-3xl font-bold text-white/90">
                {s.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
              </div>
            </div>
            <p className={`text-[10px] uppercase tracking-display ${s.color} flex items-center gap-1`}>
              {s.role.includes("Louange") || s.role.includes("Psalmiste") || s.role.includes("Artiste") ? <Music className="h-3 w-3" /> : s.role.includes("Enseignante") ? <BookOpen className="h-3 w-3" /> : <Mic className="h-3 w-3" />}
              {s.role}
            </p>
            <h3 className="text-xl font-bold text-white mt-1 leading-tight">{s.name}</h3>
            <p className="text-xs text-white/60 mt-2 line-clamp-3">{s.bio}</p>
            <button className="mt-3 self-start text-white/60 hover:text-white">
              <Instagram className="h-4 w-4" />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}