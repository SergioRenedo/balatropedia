"use client";

import React from "react";
import { motion, useSpring, useAnimationControls } from "framer-motion";
import Image from "next/image";

export default function BoosterPack({ id, name, image, onClick, priority = false }) {
  // Tilt & shadow springs
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });
  const shadowX = useSpring(0, { stiffness: 200, damping: 20 });
  const shadowY = useSpring(0, { stiffness: 200, damping: 20 });
  const controls = useAnimationControls();

  // Tilt logic
  const handleMouseMove = (e) => {
    stopFloating();
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const px = (x / rect.width) * 2 - 1;
    const py = (y / rect.height) * 2 - 1;
    const maxRotateX = 16;
    const maxRotateY = 16;
    rotateX.set(-py * maxRotateX);
    rotateY.set(px * maxRotateY);
    const maxShadow = 16;
    shadowX.set(-px * maxShadow);
    shadowY.set(-py * maxShadow);
  };

  // Floating animation (idle)
  const startFloating = () => {
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
  };
  const stopFloating = () => {
    controls.stop();
    controls.set({ y: 0, rotateZ: 0 });
  };
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    shadowX.set(0);
    shadowY.set(0);
    startFloating();
  };
  React.useEffect(() => {
    startFloating();
    return () => {
      controls.stop();
    };
    // eslint-disable-next-line
  }, []);

  // Show the main pack image
  return (
    <div className="flex flex-col items-center">
      <motion.div
        animate={controls}
        style={{
          perspective: 1200,
          rotateX,
          rotateY,
        }}
        className="relative w-28 h-36 sm:w-32 sm:h-40 md:w-36 md:h-48 lg:w-40 lg:h-52 cursor-pointer flex items-center justify-center select-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        tabIndex={0}
        role="button"
        aria-label={`View info for ${name}`}
        onKeyDown={e => { if (e.key === "Enter" || e.key === " ") onClick?.(); }}
      >
        {/* Shadow */}
        <motion.div
          style={{
            x: shadowX,
            y: shadowY,
            opacity: 0.20,
            height: "117%",
            width: "90%",
          }}
          className="absolute bg-black rounded-xl z-0 scale-90 pointer-events-none w-[160%] h-[140%]"
        />
        {/* Main booster pack image */}
        <div className="absolute inset-0 z-10 rounded-xl overflow-hidden flex items-center justify-center">
          <Image
            src={`/sprites/booster_packs/${image}`}
            alt={name ? name : `Booster Pack ${id}`}
            fill
            priority={priority}
            sizes="(max-width: 640px) 7rem, (max-width: 768px) 8rem, (max-width: 1024px) 9rem, (max-width: 1280px) 10rem, 11rem"
            className="object-contain pointer-events-none select-none transition-all"
            draggable={false}
          />
        </div>
      </motion.div>
      {/* Name (show only if present) */}
      {name && (
        <div className="mt-4 text-center w-full">
          <span className="font-m6x11plus text-white">{name}</span>
        </div>
      )}
    </div>
  );
}
