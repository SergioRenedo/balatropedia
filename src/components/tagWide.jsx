"use client";
import Image from "next/image";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

export default function TagWide({ id, name, description, ante }) {
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
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-2 w-full rounded-lg p-2 shadow-xl bg-zinc-800/60 backdrop-blur-md backdrop-saturate-150 border border-zinc-300 dark:border-zinc-700" style={{boxShadow:'0 4px 16px 0 rgba(31,38,135,0.12)', border:'1px solid rgba(255,255,255,0.13)'}}>
      <motion.div
        animate={controls}
        className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0 flex items-center justify-center select-none card-img rounded-lg"
        tabIndex={0}
        role="button"
        aria-label={name}
      >
        <div className="absolute inset-0 z-10 rounded-lg overflow-hidden flex items-center justify-center">
          <Image
            src={`/sprites/tags/${id}.webp`}
            alt={name}
            fill
            className="object-contain pointer-events-none select-none transition-all"
            draggable={false}
          />
        </div>
      </motion.div>
      <div className="flex-1 flex flex-col justify-center min-w-0 gap-1">
        <div className="font-m6x11plus text-zinc-100 text-lg md:text-xl text-center sm:text-left break-words">{name}</div>
        <div className="rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 p-1 sm:p-2 shadow-inner">
          <div className="bg-transparent rounded px-1 py-1 sm:p-2 text-zinc-900 dark:text-white font-m6x11plus text-center sm:text-left text-xs sm:text-sm md:text-base w-full break-words min-h-[2.2rem]">
            {description}
          </div>
        </div>
        <div className="font-m6x11plus text-xs md:text-sm text-blue-200 bg-white/20 backdrop-blur-sm border border-white/30 px-2 py-1 rounded-lg text-center sm:text-right whitespace-nowrap mt-1 self-center sm:self-end shadow">
          Ante: <span className="text-amber-300 font-bold">{ante}</span>
        </div>
      </div>
    </div>
  );
}
