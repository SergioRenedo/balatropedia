"use client";
import Image from "next/image";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

export default function Achievement({ id, name }) {
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

  return (
    <div className="relative flex flex-col items-center select-none">
      <motion.div
        animate={controls}
        style={{ width: 64, height: 64 }}
        className="relative flex items-center justify-center group-hover:scale-105 transition-transform"
      >
        <Image
          src={`/sprites/achievements/${id}.webp`}
          alt={name}
          fill
          sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 120px, 120px"
          className="object-contain pointer-events-none select-none"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}
