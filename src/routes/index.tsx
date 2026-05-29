import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { BackgroundVideo } from "@/components/waymaker/BackgroundVideo";
import { Nav } from "@/components/waymaker/Nav";
import { Hero } from "@/components/waymaker/Hero";
import { Speakers } from "@/components/waymaker/Speakers";
import { StandsSection } from "@/components/waymaker/StandsSection";
import { StandModal } from "@/components/waymaker/StandModal";
import { Finale } from "@/components/waymaker/Finale";
import { Footer } from "@/components/waymaker/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Waymaker Conference · EDEN 2025" },
      { name: "description", content: "Trois soirées à ciel ouvert. Dix voix. Une vision. Rejoins l'expérience Waymaker — EDEN 2025." },
      { property: "og:title", content: "Waymaker Conference · EDEN 2025" },
      { property: "og:description", content: "Trois soirées à ciel ouvert. Dix voix. Une vision." },
    ],
  }),
  component: Index,
});

function Index() {
  const [progress, setProgress] = useState(0);
  const [ambianceOn, setAmbianceOn] = useState(false);
  const [standOpen, setStandOpen] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ambient pad: simple worship-style drone using WebAudio
  useEffect(() => {
    if (!ambianceOn) {
      gainRef.current?.gain.setTargetAtTime(0, audioCtxRef.current?.currentTime ?? 0, 0.6);
      return;
    }
    if (!audioCtxRef.current) {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AC();
      audioCtxRef.current = ctx;
      const gain = ctx.createGain();
      gain.gain.value = 0;
      gain.connect(ctx.destination);
      gainRef.current = gain;
      // Layered sine drones — C minor pad
      [130.81, 196.0, 233.08, 311.13].forEach((f, i) => {
        const o = ctx.createOscillator();
        o.type = i % 2 === 0 ? "sine" : "triangle";
        o.frequency.value = f;
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.1 + i * 0.05;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 2;
        lfo.connect(lfoGain);
        lfoGain.connect(o.frequency);
        const og = ctx.createGain();
        og.gain.value = 0.18;
        o.connect(og).connect(gain);
        o.start();
        lfo.start();
      });
    }
    audioCtxRef.current.resume();
    gainRef.current!.gain.setTargetAtTime(0.25, audioCtxRef.current.currentTime, 1.2);
  }, [ambianceOn]);

  function jumpTo(target: "speakers" | "stands" | "volunteers") {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const map = { speakers: 0.35, stands: 0.72, volunteers: 0.92 } as const;
    window.scrollTo({ top: max * map[target], behavior: "smooth" });
  }

  // Section progresses
  const heroFade = Math.min(1, progress / 0.2);
  const speakersP = (progress - 0.2) / (0.65 - 0.2);
  const standsP = (progress - 0.65) / (0.85 - 0.65);
  const finaleP = (progress - 0.85) / (1 - 0.85);

  return (
    <>
      <BackgroundVideo scrollProgress={progress} ambianceOn={ambianceOn} />
      <Nav ambianceOn={ambianceOn} setAmbianceOn={setAmbianceOn} onJump={jumpTo} />

      {progress < 0.22 && <Hero fade={heroFade} />}
      {progress >= 0.18 && progress < 0.68 && <Speakers progress={Math.max(0, Math.min(1, speakersP))} />}
      {progress >= 0.62 && progress < 0.88 && <StandsSection progress={Math.max(0, Math.min(1, standsP))} onReserve={() => setStandOpen(true)} />}
      {progress >= 0.82 && <Finale progress={Math.max(0, Math.min(1, finaleP))} />}

      <Footer visible={progress > 0.96} />

      <StandModal open={standOpen} onOpenChange={setStandOpen} />
      <Toaster theme="dark" position="top-center" />

      {/* Scroll spacer — drives the full experience */}
      <div className="h-[600vh] w-full" aria-hidden />
    </>
  );
}
