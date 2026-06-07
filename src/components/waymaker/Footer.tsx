import { Facebook, Instagram, Phone, Twitter, Youtube } from "lucide-react";

interface Props {
  visible: boolean;
}

export function Footer({ visible }: Props) {
  return (
    <footer
      className="relative z-40 transition-opacity duration-500 md:fixed md:bottom-0 md:left-0 md:right-0 md:pointer-events-none"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="glass border-x-0 border-b-0 px-6 py-5 md:pointer-events-auto">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center md:flex-row">
          <p className="text-[10px] uppercase tracking-display text-white/50">
            © 2026 Waymaker Conference
          </p>
          <a
            href="tel:+243857135972"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-display text-white hover:text-primary"
          >
            <Phone className="h-4 w-4" />
            +243 857135972
          </a>
          <div className="flex gap-3 text-white/60">
            <a href="https://instagram.com/waymaker.experience" target="_blank" rel="noreferrer" className="hover:text-primary">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="hover:text-primary">
              <Youtube className="h-4 w-4" />
            </a>
            <a href="#" className="hover:text-primary">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" className="hover:text-primary">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
