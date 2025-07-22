"use client";

import React, { useState, useEffect } from "react";
import { motion, useSpring, useAnimationControls } from "framer-motion";
import Image from "next/image";

// DeckWide: Wide card for decks, inspired by jokersWide
export default function DeckWide({ id, name, order, description, unlock_condition, priority = false }) {
  // Tilt & shadow springs
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });
  const shadowX = useSpring(0, { stiffness: 200, damping: 20 });
  const shadowY = useSpring(0, { stiffness: 200, damping: 20 });
  const controls = useAnimationControls();

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
  const handleMouseMove = (e) => {
    stopFloating();
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const px = (x / rect.width) * 2 - 1;
    const py = (y / rect.height) * 2 - 1;
    const maxRotateX = 5;
    const maxRotateY = 5;
    rotateX.set(-py * maxRotateX);
    rotateY.set(px * maxRotateY);
    const maxShadow = 5;
    shadowX.set(-px * maxShadow);
    shadowY.set(-py * maxShadow);
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
    return () => {
      controls.stop();
    };
    // eslint-disable-next-line
  }, []);

  // Deck depth effect (simulate thickness)
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 w-full rounded-2xl p-4 shadow-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-800/60 backdrop-blur-md backdrop-saturate-150" style={{boxShadow:'0 8px 32px 0 rgba(31,38,135,0.18)', border:'1.5px solid rgba(255,255,255,0.18)'}}>
      <motion.div
        animate={controls}
        style={{ perspective: 1200, rotateX, rotateY }}
        className="relative w-28 h-44 sm:w-32 sm:h-52 md:w-36 md:h-60 flex-shrink-0 flex items-center justify-center select-none card-img rounded-xl"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Shadow under card */}
        <motion.div
          style={{
            x: shadowX,
            y: shadowY,
            opacity: 0.20,
            height: "90%",
            width: "110%",
          }}
          className="absolute top-0 left-1/2 translate-x-[-55%] translate-y-[5%] bg-black rounded-xl z-0 scale-90 pointer-events-none w-[120%]"
          aria-hidden="true"
        />
        {/* Card image */}
        <div className="absolute inset-0 z-10 rounded-xl overflow-hidden flex items-center justify-center min-h-0">
          <Image
            src={`/sprites/decks/${id}.webp`}
            alt={name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 7rem, (max-width: 768px) 8rem, (max-width: 1024px) 9rem, (max-width: 1280px) 10rem, 11rem"
            className="object-contain pointer-events-none select-none transition-all rounded-xl"
            draggable={false}
          />
        </div>
      </motion.div>
      <div className="flex-1 flex flex-col justify-center min-w-0 gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
          <div className="font-m6x11plus text-zinc-100 text-lg md:text-xl text-center sm:text-left break-words">{name}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-2 sm:p-3 shadow-inner">
            <span className="bg-black/30 text-white font-m6x11plus rounded-xl px-2 py-1 text-xs sm:text-sm ">Description:</span>
            <div className="bg-transparent rounded-md px-2 py-2 sm:p-3 text-white font-m6x11plus text-center sm:text-left text-xs sm:text-sm md:text-base w-full mb-1 sm:mb-2 break-words max-h-32 sm:max-h-40 md:max-h-48 overflow-auto">
              {description ? description : "No description available."}
            </div>
          </div>
          <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-2 sm:p-3 shadow-inner">
            <span className="bg-black/30 text-white font-m6x11plus rounded-xl px-2 py-1 text-xs sm:text-sm mt-2">Unlock Condition:</span>
            <div className="bg-transparent rounded-md px-2 py-2 sm:p-3 text-white font-m6x11plus text-center sm:text-left text-xs sm:text-sm md:text-base w-full mb-1 sm:mb-2 break-words max-h-24 sm:max-h-32 md:max-h-40 overflow-auto">
              {unlock_condition ? unlock_condition : "Available from the start."}
            </div>
          </div>
          {typeof order !== 'undefined' && order !== null && (
            <div className="flex flex-row gap-2 mt-2 self-center sm:self-end">
              <div className="font-m6x11plus text-xs md:text-sm text-zinc-300 bg-white/20 backdrop-blur-sm border border-white/30 px-2 py-1 rounded-xl text-center whitespace-nowrap shadow">
                ID: <span className="text-sky-300">{order}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
