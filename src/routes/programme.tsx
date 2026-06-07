import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, MapPin, Moon, Phone, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/programme")({
  head: () => ({
    meta: [
      { title: "Programme - Waymaker Conference Edition 2026" },
      {
        name: "description",
        content:
          "Programme de la Waymaker Conference: deux sessions par jour pendant quatre jours, a 9h et a 15h30.",
      },
    ],
  }),
  component: ProgrammePage,
});

const CONTACT_PHONE = "+243 857135972";

const DAYS = [
  { label: "Jeudi", date: "6 Aout 2026", theme: "Ouverture" },
  { label: "Vendredi", date: "7 Aout 2026", theme: "Enseignement" },
  { label: "Samedi", date: "8 Aout 2026", theme: "Impact" },
  { label: "Dimanche", date: "9 Aout 2026", theme: "Cloture" },
];

const SESSIONS = [
  {
    time: "09:00",
    title: "Session du matin",
    icon: Sun,
    description: "Temps de louange, enseignement et activation pour commencer la journee.",
  },
  {
    time: "15:30",
    title: "Session du soir",
    icon: Moon,
    description: "Session principale avec message, atmosphere de louange et ministere.",
  },
];

function ProgrammePage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[radial-gradient(ellipse_at_top,#321807_0%,#0a0604_58%,#000_100%)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(245,158,11,0.12),transparent_40%,rgba(0,0,0,0.4))]" />

      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-20 pt-28 md:px-6">
        <Link to="/" className="mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-display text-white/60 transition hover:text-white">
          <ArrowLeft className="h-3.5 w-3.5" />
          Retour a l'experience
        </Link>

        <section className="max-w-3xl">
          <p className="mb-3 text-[10px] uppercase tracking-display text-amber-300/80">
            Waymaker Conference - Edition 2026
          </p>
          <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-display text-glow md:text-7xl">
            Programme
          </h1>
          <p className="mt-5 text-base leading-relaxed text-white/72 md:text-lg">
            Pendant les quatre jours, la conference aura deux rendez-vous quotidiens:
            une session du matin a 9h et une session du soir a 15h30.
          </p>
        </section>

        <section className="mt-12 grid gap-4 md:grid-cols-2">
          {DAYS.map((day) => (
            <article key={day.date} className="glass-strong rounded-2xl p-5 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-display text-primary">{day.date}</p>
                  <h2 className="mt-1 text-2xl font-bold text-white">{day.label}</h2>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-display text-white/60">
                  {day.theme}
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {SESSIONS.map((session) => {
                  const Icon = session.icon;
                  return (
                    <div key={session.time} className="rounded-xl border border-white/10 bg-black/35 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="flex items-center gap-1.5 font-mono text-sm font-semibold text-amber-300">
                            <Clock className="h-3.5 w-3.5" />
                            {session.time}
                          </p>
                          <h3 className="text-lg font-semibold text-white">{session.title}</h3>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-white/65">{session.description}</p>
                      <p className="mt-3 inline-flex items-center gap-1 text-[10px] uppercase tracking-display text-white/45">
                        <MapPin className="h-3 w-3" />
                        Scene principale
                      </p>
                    </div>
                  );
                })}
              </div>
            </article>
          ))}
        </section>

        <section className="mt-12 rounded-2xl border border-amber-300/20 bg-amber-400/10 p-6 text-center md:p-10">
          <h3 className="text-2xl font-bold uppercase tracking-display text-white md:text-3xl">
            Besoin d'informations ?
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            Contactez l'equipe Waymaker pour les inscriptions, stands, benevoles et partenariats.
          </p>
          <Button asChild className="mt-6 rounded-full bg-amber-400 font-semibold text-black hover:bg-amber-300">
            <a href="tel:+243857135972">
              <Phone className="h-4 w-4" />
              {CONTACT_PHONE}
            </a>
          </Button>
        </section>
      </main>
    </div>
  );
}
