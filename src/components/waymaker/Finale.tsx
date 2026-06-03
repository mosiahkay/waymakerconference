import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { BadgeModal } from "./BadgeModal";

const CONTACT_EMAIL = "jonathanmatngoy@gmail.com";

const TIERS = [
  { name: "Bronze", price: "500 $", perks: ["Logo sur écran", "Mention scène"] },
  { name: "Silver", price: "1 500 $", perks: ["Stand standard", "5 pass VIP", "Mentions réseaux"] },
  { name: "Gold", price: "5 000 $", perks: ["Stand premium", "20 pass VIP", "Insert programme"] },
  { name: "Diamond", price: "15 000 $", perks: ["Naming scène", "Loge privée", "Activation sur-mesure"] },
];

interface Props { progress: number }

export function Finale({ progress }: Props) {
  const opacity = Math.max(0, Math.min(1, progress * 1.4));
  const [badge, setBadge] = useState<{ name: string; pole: string } | null>(null);
  const [vol, setVol] = useState({ full_name: "", email: "", phone: "", pole: "Accueil", availability: "", motivation: "" });
  const [loading, setLoading] = useState(false);
  const [sponsor, setSponsor] = useState({ organization: "", contact_name: "", email: "", tier: "Gold", amount: "", message: "" });
  const [sponsorLoading, setSponsorLoading] = useState(false);

  async function submitVolunteer(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const subject = `Bénévolat — ${vol.full_name} (${vol.pole})`;
    const body = [
      `Nom : ${vol.full_name}`,
      `Email : ${vol.email}`,
      `Téléphone : ${vol.phone}`,
      `Pôle : ${vol.pole}`,
      `Disponibilités : ${vol.availability}`,
      `Motivations : ${vol.motivation}`,
    ].join("\n");
    window.open(
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      "_blank",
    );
    setLoading(false);
    toast.success("Ton client mail s'ouvre. Voici ton badge.");
    setBadge({ name: vol.full_name, pole: vol.pole });
    setVol({ full_name: "", email: "", phone: "", pole: "Accueil", availability: "", motivation: "" });
  }

  async function submitSponsor(e: React.FormEvent) {
    e.preventDefault();
    setSponsorLoading(true);
    const subject = `Soutenir la vision — ${sponsor.organization || sponsor.contact_name} (${sponsor.tier})`;
    const body = [
      `Organisation / Ministère : ${sponsor.organization}`,
      `Contact : ${sponsor.contact_name}`,
      `Email : ${sponsor.email}`,
      `Palier souhaité : ${sponsor.tier}`,
      `Montant envisagé : ${sponsor.amount}`,
      ``,
      `Message :`,
      sponsor.message,
    ].join("\n");
    window.open(
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      "_blank",
    );
    setSponsorLoading(false);
    toast.success("Merci ! Ton client mail s'ouvre pour finaliser ta promesse de don.");
    setSponsor({ organization: "", contact_name: "", email: "", tier: "Gold", amount: "", message: "" });
  }

  return (
    <section className="fixed inset-0 overflow-y-auto pointer-events-none flex items-center justify-center px-6 py-24" style={{ opacity }}>
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl w-full pointer-events-auto">
        <div className="glass-strong rounded-3xl p-8">
          <p className="text-[10px] uppercase tracking-display text-primary">04 — Dream Team</p>
          <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-display text-white mt-1">Devenir bénévole</h3>
          <p className="text-white/70 text-sm mt-2">Mets tes talents au service de la vision.</p>
          <form onSubmit={submitVolunteer} className="space-y-3 mt-5">
            <Input required placeholder="Nom complet" value={vol.full_name} onChange={e => setVol({ ...vol, full_name: e.target.value })} className="bg-white/5 border-white/15" />
            <div className="grid grid-cols-2 gap-3">
              <Input required type="email" placeholder="Email" value={vol.email} onChange={e => setVol({ ...vol, email: e.target.value })} className="bg-white/5 border-white/15" />
              <Input placeholder="Téléphone" value={vol.phone} onChange={e => setVol({ ...vol, phone: e.target.value })} className="bg-white/5 border-white/15" />
            </div>
            <div>
              <Label className="text-[10px] uppercase tracking-display text-white/70">Pôle</Label>
              <Select value={vol.pole} onValueChange={v => setVol({ ...vol, pole: v })}>
                <SelectTrigger className="bg-white/5 border-white/15"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Accueil">Accueil</SelectItem>
                  <SelectItem value="Technique / Régie">Technique / Régie</SelectItem>
                  <SelectItem value="Logistique">Logistique</SelectItem>
                  <SelectItem value="Modération">Modération</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input placeholder="Disponibilités" value={vol.availability} onChange={e => setVol({ ...vol, availability: e.target.value })} className="bg-white/5 border-white/15" />
            <Textarea placeholder="Motivations" value={vol.motivation} onChange={e => setVol({ ...vol, motivation: e.target.value })} className="bg-white/5 border-white/15 min-h-20" />
            <Button type="submit" disabled={loading} className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 uppercase tracking-display text-[11px] font-semibold">
              {loading ? "Envoi…" : "Générer mon badge"}
            </Button>
          </form>
        </div>
        <div className="glass-strong rounded-3xl p-8">
          <p className="text-[10px] uppercase tracking-display text-primary">05 — Partenaires</p>
          <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-display text-white mt-1">Soutenir la vision</h3>
          <p className="text-white/70 text-sm mt-2">
            Entreprises, ministères et donateurs particuliers : votre engagement façonne l'empreinte culturelle
            et spirituelle de toute une génération. Chaque don finance la scène, l'accueil de
            <span className="text-white"> 15 000 participants</span>, la captation diffusée à travers l'Afrique
            francophone, et la gratuité des soirées pour la jeunesse.
          </p>
          <ul className="mt-4 space-y-1.5 text-[12px] text-white/70">
            <li>— <span className="text-white">Impact culturel :</span> une scène panafricaine, 10 voix, 3 nuits.</li>
            <li>— <span className="text-white">Impact spirituel :</span> un appel prophétique vers une génération entière.</li>
            <li>— <span className="text-white">Empreinte durable :</span> contenus, formations et envois post-conférence.</li>
          </ul>
          <div className="grid grid-cols-2 gap-3 mt-5">
            {TIERS.map(t => (
              <div key={t.name} className="glass rounded-2xl p-4">
                <div className="flex items-baseline justify-between">
                  <h4 className="font-bold uppercase tracking-display text-sm text-white">{t.name}</h4>
                  <span className="text-primary text-xs font-semibold">{t.price}</span>
                </div>
                <ul className="mt-2 space-y-1">
                  {t.perks.map(p => <li key={p} className="text-[11px] text-white/60">— {p}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <form onSubmit={submitSponsor} className="space-y-3 mt-5">
            <div className="grid grid-cols-2 gap-3">
              <Input required placeholder="Organisation / Ministère" value={sponsor.organization} onChange={e => setSponsor({ ...sponsor, organization: e.target.value })} className="bg-white/5 border-white/15" />
              <Input required placeholder="Nom du contact" value={sponsor.contact_name} onChange={e => setSponsor({ ...sponsor, contact_name: e.target.value })} className="bg-white/5 border-white/15" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input required type="email" placeholder="Email" value={sponsor.email} onChange={e => setSponsor({ ...sponsor, email: e.target.value })} className="bg-white/5 border-white/15" />
              <Input placeholder="Montant envisagé ($)" value={sponsor.amount} onChange={e => setSponsor({ ...sponsor, amount: e.target.value })} className="bg-white/5 border-white/15" />
            </div>
            <div>
              <Label className="text-[10px] uppercase tracking-display text-white/70">Palier</Label>
              <Select value={sponsor.tier} onValueChange={v => setSponsor({ ...sponsor, tier: v })}>
                <SelectTrigger className="bg-white/5 border-white/15"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TIERS.map(t => (
                    <SelectItem key={t.name} value={t.name}>{t.name} — {t.price}</SelectItem>
                  ))}
                  <SelectItem value="Don libre">Don libre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Textarea placeholder="Votre message ou intention" value={sponsor.message} onChange={e => setSponsor({ ...sponsor, message: e.target.value })} className="bg-white/5 border-white/15 min-h-20" />
            <Button type="submit" disabled={sponsorLoading} className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 uppercase tracking-display text-[11px] font-semibold">
              {sponsorLoading ? "Envoi…" : "Soutenir la vision"}
            </Button>
          </form>
        </div>
      </div>
      <BadgeModal data={badge} onClose={() => setBadge(null)} />
    </section>
  );
}