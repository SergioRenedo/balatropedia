"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useAnimationControls } from "framer-motion";
import Image from "next/image";

// Props: enhancer, card, seal are image paths
export default function PlayingCard({ enhancer, card, seal, priority = false }) {
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

  // Floating animation
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
  useEffect(() => {
    startFloating();
    return () => { controls.stop(); };
  }, []);

  return (
    <motion.div
      animate={controls}
      style={{
        perspective: 1200,
        rotateX,
        rotateY,
      }}
      className="relative w-28 h-44 sm:w-32 sm:h-52 md:w-36 md:h-60 lg:w-40 lg:h-64 flex items-center justify-center select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
    >
      {/* Sombra */}
      <motion.div
        style={{
          x: shadowX,
          y: shadowY,
          opacity: 0.20,
          height: "100%",
          width: "120%"
        }}
        className="absolute top-0 left-1/2 translate-x-[-50%] bg-black rounded-xl z-0 scale-90 pointer-events-none w-[120%]"
      />
      {/* Enhancer layer (bottom) */}
      {enhancer && (
        <Image
          src={enhancer}
          alt="Enhancer"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 320px"
          className="absolute inset-0 object-contain z-10 pointer-events-none"
          priority={priority}
        />
      )}
      {/* Card layer (middle) */}
      {card && (
        <Image
          src={card}
          alt="Card"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 320px"
          className="absolute inset-0 object-contain z-20 pointer-events-none"
          priority={priority}
        />
      )}
      {/* Seal layer (top) */}
      {seal && (
        <Image
          src={seal}
          alt="Seal"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 320px"
          className="absolute inset-0 object-contain z-30 pointer-events-none"
          priority={priority}
        />
      )}
    </motion.div>
  );
}
