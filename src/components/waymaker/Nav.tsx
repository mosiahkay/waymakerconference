import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Ticket, AudioLines } from "lucide-react";

interface Props {
  ambianceOn: boolean;
  setAmbianceOn: (v: boolean) => void;
  onJump: (target: "speakers" | "stands" | "volunteers") => void;
}

export function Nav({ ambianceOn, setAmbianceOn, onJump }: Props) {
  return (
    <header className="fixed top-3 left-1/2 z-50 w-[min(1200px,94vw)] -translate-x-1/2 rounded-2xl glass px-5 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-md bg-gradient-to-br from-primary to-orange-300 shadow-[var(--glow-orange)]" />
        <span className="font-semibold tracking-display text-sm uppercase">Waymaker</span>
      </div>
      <nav className="hidden md:flex gap-7 text-xs uppercase tracking-display text-white/70">
        <button onClick={() => onJump("speakers")} className="hover:text-white transition">Intervenants</button>
        <button onClick={() => onJump("stands")} className="hover:text-white transition">Stands</button>
        <button onClick={() => onJump("volunteers")} className="hover:text-white transition">Bénévoles</button>
      </nav>
      <div className="flex items-center gap-3">
        <label className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-display text-white/70 cursor-pointer">
          <AudioLines className={`h-3.5 w-3.5 ${ambianceOn ? "text-primary animate-pulse" : ""}`} />
          <span>Ambiance</span>
          <Switch checked={ambianceOn} onCheckedChange={setAmbianceOn} />
        </label>
        <Button size="sm" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--glow-orange)] uppercase tracking-display text-[10px] font-semibold">
          <Ticket className="h-3.5 w-3.5" /> Tickets
        </Button>
      </div>
    </header>
  );
}