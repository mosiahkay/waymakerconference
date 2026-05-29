import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function StandModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ organization_name: "", stand_type: "art", description: "", contact_name: "", email: "", phone: "" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("stand_reservations").insert(form);
    setLoading(false);
    if (error) { toast.error("Une erreur est survenue."); return; }
    toast.success("Demande envoyée. Nous te recontactons sous 72h.");
    onOpenChange(false);
    setForm({ organization_name: "", stand_type: "art", description: "", contact_name: "", email: "", phone: "" });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong border-white/20 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="uppercase tracking-display text-lg">Réserver un stand</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <Label className="text-[10px] uppercase tracking-display text-white/70">Organisation</Label>
            <Input required value={form.organization_name} onChange={e => setForm({ ...form, organization_name: e.target.value })} className="bg-white/5 border-white/15" />
          </div>
          <div>
            <Label className="text-[10px] uppercase tracking-display text-white/70">Type de stand</Label>
            <Select value={form.stand_type} onValueChange={v => setForm({ ...form, stand_type: v })}>
              <SelectTrigger className="bg-white/5 border-white/15"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="art">Art</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="books">Books</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-[10px] uppercase tracking-display text-white/70">Description du projet</Label>
            <Textarea required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="bg-white/5 border-white/15 min-h-24" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-[10px] uppercase tracking-display text-white/70">Contact</Label>
              <Input required value={form.contact_name} onChange={e => setForm({ ...form, contact_name: e.target.value })} className="bg-white/5 border-white/15" />
            </div>
            <div>
              <Label className="text-[10px] uppercase tracking-display text-white/70">Téléphone</Label>
              <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="bg-white/5 border-white/15" />
            </div>
          </div>
          <div>
            <Label className="text-[10px] uppercase tracking-display text-white/70">Email</Label>
            <Input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="bg-white/5 border-white/15" />
          </div>
          <Button type="submit" disabled={loading} className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 uppercase tracking-display text-[11px] font-semibold">
            {loading ? "Envoi…" : "Envoyer la demande"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}