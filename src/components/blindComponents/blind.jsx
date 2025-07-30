"use client";
import Image from "next/image";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

export default function Blind({ id, name, order }) {
  const controls = useAnimationControls();
  useEffect(() => {
    controls.start({
      y: [0, -6, 4, -3, 7, -5, 2, 0],
      rotateZ: [0, 1.5, -1, 2, -2, 1, -1.5, 0],
      transition: {
        repeat: Infinity,
        duration: 17,
        ease: "easeInOut",
        repeatType: "loop"
      }
    });
    return () => controls.stop();
  }, []);

  // Fixed sizes in px
  const base = 64;
  const sm = 80;
  const md = 120;

  return (
    <div className="relative flex flex-col items-center select-none">
      <motion.div
        animate={controls}
        style={{ width: base, height: base }}
        className="relative flex items-center justify-center group-hover:scale-105 transition-transform"
      >
        <Image
          src={`/sprites/blinds/${id}.webp`}
          alt={name}
          fill
          sizes={`(max-width: 640px) ${base}px, (max-width: 768px) ${sm}px, (max-width: 1024px) ${md}px, ${md}px`}
          className="object-contain pointer-events-none select-none"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}
