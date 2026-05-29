import { Instagram, Youtube, Twitter, Facebook } from "lucide-react";

interface Props { visible: boolean }

export function Footer({ visible }: Props) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none transition-opacity duration-500" style={{ opacity: visible ? 1 : 0 }}>
      <div className="glass border-x-0 border-b-0 px-6 py-5 pointer-events-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[10px] uppercase tracking-display text-white/50">© 2025 Waymaker Conference</p>
          <p className="text-sm md:text-base font-semibold tracking-display text-white text-center">Rendez-vous à la Waymaker Conference.</p>
          <div className="flex gap-3 text-white/60">
            <a href="https://instagram.com/waymaker.experience" target="_blank" rel="noreferrer" className="hover:text-primary"><Instagram className="h-4 w-4" /></a>
            <a href="#" className="hover:text-primary"><Youtube className="h-4 w-4" /></a>
            <a href="#" className="hover:text-primary"><Twitter className="h-4 w-4" /></a>
            <a href="#" className="hover:text-primary"><Facebook className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}