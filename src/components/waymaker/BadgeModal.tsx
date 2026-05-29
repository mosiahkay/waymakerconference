import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";

export function BadgeModal({ data, onClose }: { data: { name: string; pole: string } | null; onClose: () => void }) {
  function download() {
    const initials = (data?.name || "").split(" ").map(n => n[0]).slice(0, 2).join("");
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1a0a05"/><stop offset="1" stop-color="#3a1a0a"/></linearGradient><radialGradient id="glow" cx="50%" cy="30%"><stop offset="0" stop-color="rgba(255,122,58,0.35)"/><stop offset="1" stop-color="transparent"/></radialGradient></defs><rect width="600" height="900" fill="url(#g)" rx="32"/><rect width="600" height="900" fill="url(#glow)" rx="32"/><text x="300" y="120" text-anchor="middle" fill="#ff7a3a" font-family="sans-serif" font-size="18" letter-spacing="6">WAYMAKER · DREAM TEAM</text><circle cx="300" cy="380" r="120" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)"/><text x="300" y="410" text-anchor="middle" fill="white" font-family="sans-serif" font-size="80" font-weight="900">${initials}</text><text x="300" y="600" text-anchor="middle" fill="white" font-family="sans-serif" font-size="38" font-weight="800">${data?.name || ""}</text><text x="300" y="650" text-anchor="middle" fill="#ff7a3a" font-family="sans-serif" font-size="16" letter-spacing="4">${(data?.pole || "").toUpperCase()}</text><text x="300" y="830" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-family="sans-serif" font-size="12" letter-spacing="3">EDEN · 2025</text></svg>`;
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `waymaker-badge-${(data?.name || "badge").replace(/\s+/g, "-")}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Dialog open={!!data} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="glass-strong border-white/20 text-white max-w-sm p-0 overflow-hidden">
        <div className="relative aspect-[2/3] bg-gradient-to-br from-[#1a0a05] to-[#3a1a0a] p-8 flex flex-col items-center justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,122,58,0.3),transparent_60%)]" />
          <p className="relative text-[10px] uppercase tracking-display text-primary">Waymaker · Dream Team</p>
          <div className="relative flex flex-col items-center">
            <div className="h-32 w-32 rounded-full glass border-white/30 flex items-center justify-center text-4xl font-black">
              {(data?.name || "").split(" ").map(n => n[0]).slice(0, 2).join("")}
            </div>
            <h4 className="mt-4 text-2xl font-bold text-white text-center">{data?.name}</h4>
            <p className="text-[10px] uppercase tracking-display text-primary mt-1">{data?.pole}</p>
          </div>
          <p className="relative text-[10px] uppercase tracking-display text-white/50">EDEN · 2025</p>
        </div>
        <div className="p-4 flex gap-2">
          <Button onClick={download} className="flex-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 uppercase tracking-display text-[11px]">
            <Download className="h-3.5 w-3.5" /> Télécharger
          </Button>
          <Button variant="outline" className="rounded-full glass border-white/20 text-white hover:bg-white/10">
            <Share2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}