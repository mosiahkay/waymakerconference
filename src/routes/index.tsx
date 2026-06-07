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
import { useIsMobile } from "@/hooks/use-mobile";

const AMBIANCE_URL = "/YTDown_Shorts_Danny-kasongo-soupir_Media_C0Y_Ei8gnKc_008_128k.mp3";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Waymaker Conference - Edition 2026" },
      {
        name: "description",
        content:
          "Quatre jours a ciel ouvert. Des intervenants, deux sessions par jour et une experience Waymaker a Lubumbashi.",
      },
      { property: "og:title", content: "Waymaker Conference - Edition 2026" },
      {
        property: "og:description",
        content: "Quatre jours. Deux sessions par jour. Une vision.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [progress, setProgress] = useState(0);
  const [ambianceOn, setAmbianceOn] = useState(false);
  const [standOpen, setStandOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!ambianceOn) {
      audio.pause();
      return;
    }

    audio.volume = 0.25;
    audio.play().catch(() => setAmbianceOn(false));
  }, [ambianceOn]);

  function jumpTo(target: "speakers" | "stands" | "volunteers") {
    if (isMobile) {
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const max = document.documentElement.scrollHeight - window.innerHeight;
    const map = { speakers: 0.35, stands: 0.72, volunteers: 0.92 } as const;
    window.scrollTo({ top: max * map[target], behavior: "smooth" });
  }

  const heroFade = Math.min(1, progress / 0.2);
  const speakersP = (progress - 0.2) / (0.65 - 0.2);
  const standsP = (progress - 0.65) / (0.85 - 0.65);
  const finaleP = (progress - 0.85) / (1 - 0.85);

  return (
    <>
      <BackgroundVideo scrollProgress={progress} ambianceOn={ambianceOn} />
      <Nav ambianceOn={ambianceOn} setAmbianceOn={setAmbianceOn} onJump={jumpTo} />
      <audio ref={audioRef} src={AMBIANCE_URL} loop preload="none" />

      {(isMobile || progress < 0.22) && <Hero fade={isMobile ? 0 : heroFade} />}
      {(isMobile || (progress >= 0.18 && progress < 0.68)) && (
        <Speakers progress={isMobile ? 0 : Math.max(0, Math.min(1, speakersP))} />
      )}
      {(isMobile || (progress >= 0.62 && progress < 0.88)) && (
        <StandsSection
          progress={isMobile ? 1 : Math.max(0, Math.min(1, standsP))}
          onReserve={() => setStandOpen(true)}
        />
      )}
      {(isMobile || progress >= 0.82) && (
        <Finale progress={isMobile ? 1 : Math.max(0, Math.min(1, finaleP))} />
      )}

      <Footer visible={isMobile || progress > 0.96} />

      <StandModal open={standOpen} onOpenChange={setStandOpen} />
      <Toaster theme="dark" position="top-center" />

      <div className="hidden h-[420vh] w-full md:block" aria-hidden />
    </>
  );
}
