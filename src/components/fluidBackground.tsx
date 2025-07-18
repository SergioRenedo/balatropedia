'use client';
import React, { useMemo } from "react";

type FluidBackgroundProps = {
  effect?: "None" | "Negative" | "Polychrome";
};

// Fixed poly stops
function getPolyStops(angle: number = 0) {
  // Flatter, more elegant gradient: blue to purple to pink
  return [
    <stop key="0" offset="0%" stopColor="#4f5bd5" />,   // blue
    <stop key="1" offset="50%" stopColor="#a855f7" />, // purple
    <stop key="2" offset="100%" stopColor="#ec4899" /> // pink
  ];
}

export default function FluidBackground({ effect = "None" }: FluidBackgroundProps) {
  // Flags
  const isNegative = effect === "Negative";
  const isPoly = effect === "Polychrome";

  // Fixed ellipse params
  const rx = 1260;
  const ry = 1000;
  const cx = 720;
  const cy = 512;

  // Fixed gradients and patterns
  const swirlStops = useMemo(() => {
    if (isPoly) return getPolyStops(); // Flatter gradient
    if (isNegative) {
      return [
        <stop key="0" offset="0%" stopColor="#292941" />,
        <stop key="1" offset="30%" stopColor="#181824" />,
        <stop key="2" offset="90%" stopColor="#00060b" />,
        <stop key="3" offset="100%" stopColor="#101115" />,
      ];
    }
    // Liquid background: mix red and blue
    return [
      <stop key="0" offset="0%" stopColor="#4898ec" />, // blue
      <stop key="1" offset="50%" stopColor="#9d2539" />, // red
      <stop key="2" offset="100%" stopColor="#8b121f" />, // dark red
    ];
  }, [isPoly, isNegative]);

  const zebraPattern = useMemo(() => (
    <pattern
      id="zebra"
      patternUnits="userSpaceOnUse"
      width="120"
      height="120"
      patternTransform="rotate(-14)"
    >
      <rect width="120" height="120" fill="none" />
      <rect x="0" y="0" width="40" height="120" fill="#2f3037" opacity="0.43" />
      <rect x="60" y="0" width="40" height="120" fill="#292941" opacity="0.33" />
    </pattern>
  ), []);

  return (
    <svg
      className="fixed inset-0 w-screen h-screen z-0 pointer-events-none select-none"
      style={{
        objectFit: "cover",
        minWidth: "100vw",
        minHeight: "100vh",
        left: 0,
        top: 0
      }}
      viewBox="0 0 1440 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="edgeMask" cx="50%" cy="50%" r="80%">
          <stop offset="90%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <radialGradient id="swirl" cx="50%" cy="50%" r="80%" fx="45%" fy="48%">
          {swirlStops}
        </radialGradient>
        {isNegative && zebraPattern}
      </defs>
      <g mask="url(#mask1)">
        <ellipse
          cx={cx}
          cy={cy}
          rx={rx}
          ry={ry}
          fill="url(#swirl)"
          opacity="0.87"
        />
        {isNegative && (
          <ellipse
            cx={cx}
            cy={cy}
            rx={rx * 0.98}
            ry={ry * 0.98}
            fill="url(#zebra)"
            opacity="0.77"
            style={{ mixBlendMode: "color-dodge" }}
          />
        )}
      </g>
      <mask id="mask1">
        <rect width="1440" height="1024" fill="url(#edgeMask)" />
      </mask>
    </svg>
  );
}
