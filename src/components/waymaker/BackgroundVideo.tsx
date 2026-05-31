import poster from "@/assets/eden-stage.png";
const VIDEO_URL = "/eden-bg.mp4";
import { useEffect, useRef } from "react";

interface Props {
  scrollProgress: number;
  ambianceOn: boolean;
}

export function BackgroundVideo({ scrollProgress, ambianceOn }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Cinematic scroll-driven scale/position: zoom in over hero, settle on stage, drift down for stands, tilt up at end.
  const p = scrollProgress; // 0..1
  // scale: starts 1 (aerial), grows to 1.4 during stage focus, drifts back to 1.15 at end
  const scale =
    p < 0.2 ? 1 + p * 1.5 // 1 -> 1.3
      : p < 0.65 ? 1.3 + (p - 0.2) * 0.22 // 1.3 -> ~1.4
      : p < 0.85 ? 1.4 - (p - 0.65) * 0.5 // 1.4 -> 1.3 (descend into stands)
      : 1.3 - (p - 0.85) * 1.0; // 1.3 -> 1.15 (tilt up)

  const translateY =
    p < 0.2 ? -p * 30
      : p < 0.65 ? -6 - (p - 0.2) * 10
      : p < 0.85 ? -10.5 + (p - 0.65) * 60 // descend (positive moves view down -> image shifts up)
      : 1.5 - (p - 0.85) * 100; // tilt back up

  const hueShift =
    p < 0.35 ? 0
      : p < 0.5 ? (p - 0.35) * 200 // toward violet
      : p < 0.65 ? 30 - (p - 0.5) * 200 // toward cyan-ish
      : 0;

  const darken = p > 0.85 ? (p - 0.85) * 3 : 0; // 0 -> ~0.45

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={VIDEO_URL}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{
          transform: `scale(${scale}) translateY(${translateY}%)`,
          filter: `hue-rotate(${hueShift}deg) saturate(${1 + Math.abs(hueShift) / 200}) brightness(${0.85 - darken * 0.4})`,
          transition: "filter 0.4s linear",
        }}
      />
      {/* Vignette + bottom fade */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 transition-opacity"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.85) 100%)" }}
      />
      {ambianceOn && (
        <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30 bg-[radial-gradient(circle_at_50%_30%,oklch(0.72_0.19_45)_0%,transparent_50%)] animate-pulse" />
      )}
    </div>
  );
}
