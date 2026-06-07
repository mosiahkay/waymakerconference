import { useEffect, useRef } from "react";
import poster from "@/assets/eden-stage.png";
import { useIsMobile } from "@/hooks/use-mobile";

const VIDEO_URL = "/eden-bg.mp4";

interface Props {
  scrollProgress: number;
  ambianceOn: boolean;
}

export function BackgroundVideo({ scrollProgress, ambianceOn }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useIsMobile();
  const p = scrollProgress;

  const scale =
    p < 0.2
      ? 1 + p * 0.8
      : p < 0.65
        ? 1.16 + (p - 0.2) * 0.14
        : p < 0.85
          ? 1.24 - (p - 0.65) * 0.25
          : 1.19 - (p - 0.85) * 0.45;

  const translateY =
    p < 0.2
      ? -p * 16
      : p < 0.65
        ? -3 - (p - 0.2) * 7
        : p < 0.85
          ? -6 + (p - 0.65) * 28
          : 0.5 - (p - 0.85) * 42;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isMobile) {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }
  }, [isMobile]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      {isMobile ? (
        <img
          src={poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-80"
          decoding="async"
        />
      ) : (
        <video
          ref={videoRef}
          src={VIDEO_URL}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          style={{
            transform: `scale(${scale}) translateY(${translateY}%)`,
            filter: `brightness(${0.86 - Math.max(0, p - 0.85) * 0.8}) saturate(1.05)`,
          }}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.72)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.28)_0%,transparent_34%,rgba(0,0,0,0.9)_100%)]" />
      {ambianceOn && (
        <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_30%,oklch(0.72_0.19_45)_0%,transparent_46%)]" />
      )}
    </div>
  );
}
