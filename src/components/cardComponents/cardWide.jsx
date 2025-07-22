"use client"

import React from "react";
import { motion, useSpring, useAnimationControls } from "framer-motion";
import Image from "next/image";

// highlightDescription logic copied from cardModal for syntax highlighting
function highlightDescription(text) {
  if (!text) return text;
  const patterns = [
    { color: 'text-green-500', regex: /(\d+\s*in\s*\d+|Club[s]?|Reroll)/gi },
    { color: 'text-red-500', regex: /(\+?-?\d+(\.\d+)?-\d+(\.\d+)?\s*Mult|\+?-?\d+(\.\d+)?\s*Mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?\s*Mult|X\+?-?\d+(\.\d+)?\s*Mult|\+?-?\d+(\.\d+)?-\d+(\.\d+)?Mult|\+?-?\d+(\.\d+)?Mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?Mult|X\+?-?\d+(\.\d+)?Mult|\+?-?\d+(\.\d+)?-\d+(\.\d+)?\s*mult|\+?-?\d+(\.\d+)?\s*mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?\s*mult|X\+?-?\d+(\.\d+)?\s*mult|\+?-?\d+(\.\d+)?-\d+(\.\d+)?mult|\+?-?\d+(\.\d+)?mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?mult|X\+?-?\d+(\.\d+)?mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?|X\+?-?\d+(\.\d+)?|Mult|Heart[s]?|self destructs|self destruct|Self Destruct|Red Seal)/gi },
    { color: 'text-blue-400', regex: /(\+\d+\s*Chips|-\d+\s*Chips|\+\d+Chips|-\d+Chips|chips\s*\d+|Chips|Spectral|Planet|Spade[s]?|Celestial Packs|Blue Seal)/gi },
    { color: 'text-orange-400', regex: /(poker hand|hand size|first hand|hands|Flush House|Five of a Kind|Full House|Four of a Kind|Flush Five|Flushes|Flush|Straights|Straight|discards|discarded|discard|High Card|Cards|cards|card|Pair|Three Of A Kind|Two Pair|Joker|Blind|double|Small Blind|Big Blind|Common|Boss Blind|Diamonds|Diamond|Faces|Face|\$ Card|\$)/gi },
    { color: 'text-orange-400', regex: /(?<!Chips\s|Mult\s|X\d+(\.\d+)?\s|\d+ in )\b\d+(\.\d+)?\b/gi },
    { color: 'text-purple-400', regex: /(Tarot|Legendary|Purple Seal)/gi },
  ];
  let result = [];
  let i = 0;
  while (i < text.length) {
    let found = null;
    let foundColor = '';
    let foundEnd = i;
    for (const { color, regex } of patterns) {
      regex.lastIndex = i;
      const match = regex.exec(text);
      if (match && match.index === i) {
        if (!found || match[0].length > found[0].length) {
          found = match;
          foundColor = color;
          foundEnd = i + match[0].length;
        }
      }
    }
    if (found) {
      result.push(React.createElement('span', { key: i + found[0], className: foundColor }, found[0]));
      i = foundEnd;
    } else {
      result.push(text[i]);
      i++;
    }
  }
  return result;
}

export default function CardWide({ id, name, description, onClick, priority = false }) {
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
          style={{ x: shadowX, y: shadowY, opacity: 0.20, height: "105%", width: "125%" }}
          className="absolute bg-black rounded-xl z-0 scale-90 pointer-events-none w-[115%] h-[140%]"
        />
        {/* Card image with special overlay for c_soul */}
        <div className="absolute inset-0 z-10 rounded-xl overflow-hidden">
          {/* Animated overlay for c_soul */}
          {id === "c_soul" && (
            <motion.div
              initial={{ rotate: -10, scale: 1 }}
              animate={{ rotate: [ -10, 10, -10 ], scale: [1, 1.12, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] z-20 pointer-events-none select-none"
              style={{ width: '55%', height: '55%' }}
            >
              <Image
                src="/sprites/cards/c_soul_2.webp"
                alt="c_soul_2"
                width={128 * 0.9}
                height={176 * 0.9}
                priority={priority}
                className="object-contain pointer-events-none select-none"
                draggable={false}
                style={{ width: '100%', height: '100%' }}
              />
            </motion.div>
          )}
          <Image
            src={`/sprites/cards/${id}.webp`}
            alt={name ? name : `Card ${id}`}
            fill
            priority={priority}
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
            {description ? highlightDescription(description) : "No description available."}
          </div>
        </div>
      </div>
    </div>
  );
}
