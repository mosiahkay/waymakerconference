import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { AudioLines, CalendarDays } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface Props {
  ambianceOn: boolean;
  setAmbianceOn: (v: boolean) => void;
  onJump: (target: "speakers" | "stands" | "volunteers") => void;
}

export function Nav({ ambianceOn, setAmbianceOn, onJump }: Props) {
  return (
    <header className="fixed left-1/2 top-3 z-50 flex w-[min(1200px,94vw)] -translate-x-1/2 items-center justify-between gap-3 rounded-2xl px-3 py-3 glass sm:px-5">
      <Link to="/" className="flex shrink-0 items-center gap-2">
        <div className="h-7 w-7 rounded-md bg-gradient-to-br from-primary to-orange-300 shadow-[var(--glow-orange)]" />
        <span className="hidden text-sm font-semibold uppercase tracking-display sm:inline">Waymaker</span>
      </Link>

      <nav className="hidden gap-7 text-xs uppercase tracking-display text-white/70 md:flex">
        <button onClick={() => onJump("speakers")} className="transition hover:text-white">Intervenants</button>
        <button onClick={() => onJump("stands")} className="transition hover:text-white">Stands</button>
        <button onClick={() => onJump("volunteers")} className="transition hover:text-white">Benevoles</button>
        <Link to="/programme" className="transition hover:text-white">Programme</Link>
      </nav>

      <div className="flex items-center gap-2 sm:gap-3">
        <label className="flex cursor-pointer items-center gap-2 text-[10px] uppercase tracking-display text-white/70">
          <AudioLines className={`h-4 w-4 ${ambianceOn ? "text-primary" : ""}`} />
          <span className="hidden sm:inline">Ambiance</span>
          <Switch checked={ambianceOn} onCheckedChange={setAmbianceOn} />
        </label>
        <Button
          asChild
          size="sm"
          className="rounded-full bg-primary text-[10px] font-semibold uppercase tracking-display text-primary-foreground shadow-[var(--glow-orange)] hover:bg-primary/90"
        >
          <Link to="/programme">
            <CalendarDays className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Voir le programme</span>
            <span className="sm:hidden">Prog.</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
