"use client";
import Image from "next/image";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

export default function Stake({ id, name, order }) {
  const controls = useAnimationControls();
  useEffect(() => {
    controls.start({
      y: [0, -5, 3, -2, 6, -4, 1, 0],
      rotateZ: [0, 1, -1, 1.5, -1.5, 1, -1, 0],
      transition: {
        repeat: Infinity,
        duration: 15,
        ease: "easeInOut",
        repeatType: "loop"
      }
    });
    return () => controls.stop();
  }, []);

  const base = 64;
  const sm = 80;
  const md = 120;

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Poker chip shadow below */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: -10,
          width: base * 0.85,
          height: base * 0.22,
          background: "rgba(0,0,0,0.22)",
          borderRadius: "50%",
          filter: "blur(2.5px)",
          transform: "translateX(-50%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <motion.div
        animate={controls}
        style={{ width: base, height: base }}
        className="relative flex items-center justify-center group-hover:scale-105 transition-transform"
      >
        <Image
          src={`/sprites/stakes/s_${id}_stake.webp`}
          alt={name}
          fill
          sizes={`(max-width: 640px) ${base}px, (max-width: 768px) ${sm}px, (max-width: 1024px) ${md}px, ${md}px`}
          className="object-contain"
          priority={order === 1}
        />
      </motion.div>
    </div>
  );
}
