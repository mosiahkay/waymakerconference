import { BookOpen, Mic, Music } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const SPEAKERS = [
  {
    name: "Pst. Jonathan Matunga",
    role: "Pasteur Principal",
    image: "/jona.jpeg",
    bio: "Voix de reveil pour une generation qui veut marcher avec conviction.",
  },
  {
    name: "Pst. Elior Tay",
    role: "Pasteur",
    image: "/Elior tay.jpeg",
    bio: "Un message clair, pastoral et centre sur la transformation des vies.",
  },
  {
    name: "Apotre Narcisse Majila",
    role: "Apotre",
    image: "/narcisse majila.jpeg",
    bio: "Une parole profonde pour batir, orienter et equiper l'Eglise.",
  },
  {
    name: "Prophete Serge Habakuk",
    role: "Prophete",
    image: "/serge habakuk.jpeg",
    bio: "Une voix prophetique portee vers la restauration et l'impact.",
  },
  {
    name: "Adorateur Dany Kasongo",
    role: "Adorateur",
    image: "/danny kasongo.jpeg",
    bio: "Une atmosphere de louange sensible, intense et rassembleuse.",
  },
  {
    name: "Docteur Archippe Fataki",
    role: "Docteur",
    image: "/archippe fataki.jpeg",
    bio: "Un enseignement solide pour nourrir la foi et l'intelligence spirituelle.",
  },
  {
    name: "Minister Abbey Ojomu",
    role: "Adoratrice",
    image: "/Abbey ojomu.jpeg",
    bio: "Une conduite de louange tournee vers la presence et la consecration.",
  },
];

interface Props {
  progress: number;
}

function SpeakerIcon({ role }: { role: string }) {
  if (role.includes("Ador")) return <Music className="h-3 w-3" />;
  if (role.includes("Docteur")) return <BookOpen className="h-3 w-3" />;
  return <Mic className="h-3 w-3" />;
}

export function Speakers({ progress }: Props) {
  const isMobile = useIsMobile();
  const total = SPEAKERS.length;
  const translateX = Math.max(0, Math.min(1, progress)) * (total - 1) * 22;

  return (
    <section
      id="speakers"
      className="relative z-10 overflow-hidden px-5 py-20 md:fixed md:inset-0 md:flex md:flex-col md:justify-center md:px-0 md:py-0 md:pointer-events-none"
    >
      <div className="mb-7 md:px-8">
        <p className="text-[10px] uppercase tracking-display text-primary/90">02 - La Scene</p>
        <h2 className="mt-2 text-3xl font-bold uppercase tracking-display text-white md:text-5xl">
          Les intervenants
        </h2>
      </div>
      <div
        className="grid gap-4 sm:grid-cols-2 md:flex md:gap-6 md:will-change-transform"
        style={
          isMobile
            ? undefined
            : {
                transform: `translateX(calc(20vw - ${translateX}vw))`,
                transition: "transform 0.12s linear",
              }
        }
      >
        {SPEAKERS.map((speaker, index) => (
          <article
            key={speaker.name}
            className="glass-strong relative flex min-h-[340px] overflow-hidden rounded-2xl p-5 md:aspect-[3/4] md:w-[22vw] md:min-w-[280px] md:shrink-0 md:pointer-events-auto"
          >
            <img
              src={speaker.image}
              alt={speaker.name}
              loading={index < 2 ? "eager" : "lazy"}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.35)_45%,rgba(0,0,0,0.92)_100%)]" />
            <div className="relative mt-auto">
              <p className="flex items-center gap-1 text-[10px] uppercase tracking-display text-amber-300">
                <SpeakerIcon role={speaker.role} />
                {speaker.role}
              </p>
              <h3 className="mt-1 text-xl font-bold leading-tight text-white">{speaker.name}</h3>
              <p className="mt-2 text-xs leading-relaxed text-white/70">{speaker.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
