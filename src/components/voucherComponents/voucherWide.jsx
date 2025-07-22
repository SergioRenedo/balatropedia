"use client";
import React from "react";
import { motion, useSpring, useAnimationControls } from "framer-motion";
import Image from "next/image";


export default function VoucherWide({ id, name, effect, unlock, note }) {
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
  React.useEffect(() => {
    startFloating();
    return () => {
      controls.stop();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 w-full rounded-2xl p-4 shadow-xl bg-zinc-800/60 backdrop-blur-md backdrop-saturate-150 border border-zinc-300 dark:border-zinc-700" style={{boxShadow:'0 8px 32px 0 rgba(31,38,135,0.18)', border:'1.5px solid rgba(255,255,255,0.18)'}}>
      <motion.div
        animate={controls}
        style={{ perspective: 1200, rotateX, rotateY }}
        className="relative w-28 h-44 sm:w-32 sm:h-52 md:w-36 md:h-60 flex-shrink-0 flex items-center justify-center select-none card-img rounded-xl"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Sombra */}
        <motion.div
          style={{ x: shadowX, y: shadowY, opacity: 0.20, height: "95%", width: "105%" }}
          className="absolute bg-black rounded-xl z-0 scale-90 pointer-events-none w-[115%] h-[140%]"
        />
        {/* Voucher image */}
        <div className="absolute inset-0 z-10 rounded-xl overflow-hidden">
          <Image
            src={`/sprites/vouchers/${id}.webp`}
            alt={name}
            fill
            sizes="(max-width: 640px) 7rem, (max-width: 768px) 8rem, (max-width: 1024px) 9rem, (max-width: 1280px) 10rem, 11rem"
            className="object-contain pointer-events-none select-none transition-all"
            draggable={false}
          />
        </div>
      </motion.div>
      <div className="flex-1 flex flex-col justify-center min-w-0 gap-2">
        <div className="font-m6x11plus text-zinc-900 dark:text-white text-lg md:text-xl mb-2 text-center sm:text-left break-words">{name}</div>
        <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-2 sm:p-3 shadow-inner">
          <div className="bg-transparent rounded-md px-2 py-2 sm:p-3 text-zinc-900 dark:text-white font-m6x11plus text-center sm:text-left text-xs sm:text-sm md:text-base w-full break-words min-h-[3rem]">
            {effect ? effect : "No effect."}
            {unlock && <><br /><span className="text-sky-300 text-xl">Unlock: {unlock}</span></>}
            {note && <><br /><span className="text-amber-200 text-xl mt-1">{note}</span></>}
          </div>
        </div>
      </div>
    </div>
  );
}
