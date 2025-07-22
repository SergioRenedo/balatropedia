'use client';
import React, { useMemo } from "react";

type SectionFluidBackgroundProps = {
  section: "Tarot" | "Planet" | "Spectral";
};

function getSectionStops(section: string) {
  switch (section) {
    case "Tarot":
      return [
        <stop key="0" offset="0%" stopColor="purple" />, // purple
        <stop key="1" offset="60%" stopColor="#4F6367" />, // blue-gray
        <stop key="2" offset="100%" stopColor="#FFE5B4" /> // peach (light yellow)
      ];
    case "Planet":
      return [
        <stop key="0" offset="0%" stopColor="#5B9BAA" />, // blue-gray
        <stop key="1" offset="60%" stopColor="#84C5D2" />, // light blue
        <stop key="2" offset="100%" stopColor="#4F6367" /> // dark teal
      ];
    case "Spectral":
      return [
        <stop key="0" offset="0%" stopColor="#C7B24A" />, // gold
        <stop key="1" offset="50%" stopColor="#638FE1" />, // blue
        <stop key="2" offset="100%" stopColor="#E2EBF9" /> // very light blue
      ];
    default:
      return [
        <stop key="0" offset="0%" stopColor="#a855f7" />, // fallback purple
        <stop key="1" offset="100%" stopColor="#f472b6" /> // fallback pink
      ];
  }
}

export default function SectionFluidBackground({ section }: SectionFluidBackgroundProps) {
  const swirlStops = useMemo(() => getSectionStops(section), [section]);
  const rx = 700;
  const ry = 400;
  const cx = 400;
  const cy = 220;
  return (
    <svg
      className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none"
      style={{ minWidth: "100%", minHeight: "100%" }}
      viewBox="0 0 800 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={`swirl-${section}`} cx="50%" cy="50%" r="80%" fx="45%" fy="48%">
          {swirlStops}
        </radialGradient>
      </defs>
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill={`url(#swirl-${section})`}
        opacity="0.85"
      />
      {/* No animation, static gradient only */}
    </svg>
  );
}
