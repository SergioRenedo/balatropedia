'use client';

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useAnimationControls } from "framer-motion";
import Image from "next/image";

type JokerCardProps = {
  name: string;
  order: number;
  rarity: string;
  image: string;
  onClick?: () => void;
  priority?: boolean;
  effect?: "None" | "Negative" | "Polychrome";
};

const rarityImages: Record<string, string> = {
  Common: "/sprites/buttons/common.webp",
  Uncommon: "/sprites/buttons/uncommon.webp",
  Rare: "/sprites/buttons/rare.webp",
  Legendary: "/sprites/buttons/legendary.webp",
};

const negativeFilter = "invert(0.8) hue-rotate(250deg) saturate(1.3) brightness(1)";

// --- COMPONENT ---
export default function JokerCard({
  name,
  order,
  rarity,
  image,
  onClick,
  priority = false,
  effect = "None",
}: JokerCardProps) {
  // Tilt & shadow springs
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });
  const shadowX = useSpring(0, { stiffness: 200, damping: 20 });
  const shadowY = useSpring(0, { stiffness: 200, damping: 20 });

  // Floating animación (idle)
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
    const maxRotateX = 16; // was 5
    const maxRotateY = 16; // was 5
    rotateX.set(-py * maxRotateX);
    rotateY.set(px * maxRotateY);
    const maxShadow = 16; // was 5
    shadowX.set(-px * maxShadow);
    shadowY.set(-py * maxShadow);
  };

  // Erratic infinite floating animation
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

  // POLYCHROME: Filtro fijo con tilt-react
  const [tiltHue, setTiltHue] = useState(70);
  useEffect(() => {
    const unsubX = rotateX.on("change", val => {
      setTiltHue(val * 16); // was 10, increase for more rainbow effect
    });
    return () => { unsubX(); };
  }, [rotateX]);
  const polyFilter = `hue-rotate(${tiltHue}deg)`;

  // Determina el filtro final
  let filter: string | undefined = undefined;
  if (effect === "Negative") filter = negativeFilter;
  else if (effect === "Polychrome") filter = polyFilter;

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
        {/* Rareza */}
        <Image
          src={rarityImages[rarity] || rarityImages["Common"]}
          alt={rarity}
          width={128}
          height={38}
          priority={priority}
          draggable={false}
          className="absolute left-1/2 -translate-x-1/2 top-1 z-20 scale-110 object-contain h-10 w-auto pointer-events-none select-none"
          style={{ height: "2.3rem", width: "auto" }}
        />

        {/* Sombra */}
        <motion.div
          style={{
            x: shadowX,
            y: shadowY,
            opacity: 0.20,
            height: (order === 16) ? "62%" : (order === 78) ? "87%" : (order === 65) ? "78%" : (order === 124) ? "70%" : "100%",
            width: (order === 124) ? "85%" : (order === 106) ? "107%" : "120%"
          }}
          className={`absolute top-0 left-1/2 translate-x-[-50%]${order === 124 ? ' translate-y-[22%]' : ''} bg-black rounded-xl z-0 scale-90 pointer-events-none${order === 124 ? '' : ' w-[120%]'}`}
        />

        {/* Card image con filtro */}
        <div className="absolute inset-0 z-10 rounded-xl overflow-hidden">
          {/* Animated overlays for special jokers (hologram & legendaries) - NO filter applied */}
          {[
            {id: 70, img: "j_hologram_2.webp"},
            {id: 146, img: "j_caino_2.webp"},
            {id: 147, img: "j_triboulet_2.webp"},
            {id: 148, img: "j_yorick_2.webp"},
            {id: 149, img: "j_chicot_2.webp"},
            {id: 150, img: "j_perkeo_2.webp"}
          ].map(special => order === special.id && (
            <motion.div
              key={special.id}
              initial={{ rotate: -10, scale: 1 }}
              animate={{ rotate: [ -10, 10, -10 ], scale: [1, 1.12, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] z-20 pointer-events-none select-none"
              style={{ width: '90%', height: '90%' }}
            >
              <Image
                src={`/sprites/jokers/${special.img}`}
                alt={special.img.replace('.webp', '')}
                width={128 * 0.9}
                height={176 * 0.9}
                priority={priority}
                className="object-contain pointer-events-none select-none"
                draggable={false}
                style={{ width: '100%', height: '100%' }}
              />
            </motion.div>
          ))}
          {/* Main card image WITH filter applied if needed */}
          {order === 124 ? (
            <Image
              src={image}
              alt={name}
              width={128 * 0.7}
              height={176 * 0.7}
              priority={priority}
              className="object-contain pointer-events-none select-none transition-all"
              draggable={false}
              style={{ width: '70%', height: '70%', position: 'absolute', left: '15%', top: '15%', ...(filter ? { filter } : {}) }}
            />
          ) : (
            <Image
              src={image}
              alt={name}
              fill
              priority={priority}
              sizes="
                (max-width: 640px) 7rem,
                (max-width: 768px) 8rem,
                (max-width: 1024px) 9rem,
                (max-width: 1280px) 10rem,
                11rem
              "
              className="object-contain pointer-events-none select-none transition-all"
              draggable={false}
              style={filter ? { filter } : undefined}
            />
          )}
        </div>
      </motion.div>
      {/* Name */}
      <div className="mt-4 text-center w-full">
        <span className="font-m6x11plus text-white">{name}</span>
      </div>
    </div>
  );
}
