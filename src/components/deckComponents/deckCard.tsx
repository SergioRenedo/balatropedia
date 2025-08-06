"use client";
import React, { useRef, useEffect } from "react";
import { motion, useSpring, useAnimationControls } from "framer-motion";
import Image from "next/image";

export type DeckCardProps = {
  id: string;
  name: string;
  order: number;
  onClick?: () => void;
  priority?: boolean;
};

export default function DeckCard({ id, name, order, onClick, priority = false }: DeckCardProps) {
  // Tilt & shadow springs
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });
  const shadowX = useSpring(0, { stiffness: 200, damping: 20 });
  const shadowY = useSpring(0, { stiffness: 200, damping: 20 });
  const controls = useAnimationControls();

  // Tilt logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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

  useEffect(() => {
    startFloating();
    return () => {
      controls.stop();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col items-center">
      <motion.div
        animate={controls}
        style={{
          perspective: 1200,
          rotateX,
          rotateY,
        }}
        className="
          relative w-28 h-44 sm:w-32 sm:h-52 md:w-36 md:h-60 lg:w-40 lg:h-64 
          cursor-pointer flex items-center justify-center select-none
        "
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        tabIndex={0}
        role="button"
        aria-label={`View info for ${name}`}
        onKeyDown={e => { if (e.key === "Enter" || e.key === " ") onClick?.(); }}
      >
        {/* Shadow under card, like JokerCard */}
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
        <div className="absolute inset-0 z-10 rounded-xl overflow-hidden flex items-center justify-center">
          <Image
            src={`/sprites/decks/${id}.webp`}
            alt={name}
            fill
            className="object-contain pointer-events-none select-none transition-all"
            draggable={false}
            sizes="(max-width: 640px) 7rem, (max-width: 768px) 8rem, (max-width: 1024px) 9rem, 10rem"
          />
        </div>
      </motion.div>
      {/* Name */}
      <div className="mt-4 text-center w-full">
        <span className="font-m6x11plus text-white text-lg sm:text-xl md:text-2xl lg:text-3xl">{name}</span>
      </div>
    </div>
  );
}
