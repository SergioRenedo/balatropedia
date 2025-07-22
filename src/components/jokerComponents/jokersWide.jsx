"use client"

import React, { useState, useEffect } from "react";
import { motion, useSpring, useAnimationControls } from "framer-motion";
import Image from "next/image";

const rarityImages = {
  Common: "/sprites/buttons/common.webp",
  Uncommon: "/sprites/buttons/uncommon.webp",
  Rare: "/sprites/buttons/rare.webp",
  Legendary: "/sprites/buttons/legendary.webp",
};


const negativeFilter = "invert(0.8) hue-rotate(250deg) saturate(1.3) brightness(1)";

// Syntax highlighting for joker description (copied from CardWide)
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

export default function JokersWide({ name, order, rarity, image, effect = "None", priority = false, description, unlock_condition, cost }) {
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

  // Polychrome effect
  const [tiltHue, setTiltHue] = useState(70);
  useEffect(() => {
    const unsubX = rotateX.on("change", val => {
      setTiltHue(val * 10);
    });
    return () => { unsubX(); };
  }, [rotateX]);
  const polyFilter = `hue-rotate(${tiltHue}deg)`;

  let filter = undefined;
  if (effect === "Negative") filter = negativeFilter;
  else if (effect === "Polychrome") filter = polyFilter;

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 w-full rounded-2xl p-4 shadow-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-800/60 backdrop-blur-md backdrop-saturate-150" style={{boxShadow:'0 8px 32px 0 rgba(31,38,135,0.18)', border:'1.5px solid rgba(255,255,255,0.18)'}}>
      <motion.div
        animate={controls}
        style={{ perspective: 1200, rotateX, rotateY }}
        className="relative w-28 h-44 sm:w-32 sm:h-52 md:w-36 md:h-60 flex-shrink-0 flex items-center justify-center select-none card-img rounded-xl"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Rareza pill, responsive */}
        <Image
          src={rarityImages[rarity] || rarityImages["Common"]}
          alt={rarity}
          width={128}
          height={38}
          priority={priority}
          draggable={false}
          className="absolute left-1/2 -translate-x-1/2 top-1 z-20 object-contain pointer-events-none select-none h-7 xs:h-8 sm:h-10 md:h-11 lg:h-12 w-auto"
          style={{ height: "clamp(1.4rem, 4vw, 2.3rem)", width: "auto" }}
        />
        {/* Sombra with special sizing for certain jokers */}
        <motion.div
          style={{
            x: shadowX,
            y: shadowY,
            opacity: 0.20,
            height:
              order === 16 ? "62%" :
              order === 78 ? "87%" :
              order === 65 ? "78%" :
              order === 124 ? "70%" :
              "100%",
            width:
              order === 124 ? "85%" :
              order === 106 ? "107%" :
              "120%"
          }}
          className={`absolute top-0 left-1/2 translate-x-[-50%]${order === 124 ? ' translate-y-[22%]' : ''} bg-black rounded-xl z-0 scale-90 pointer-events-none${order === 124 ? '' : ''}`}
        />
        {/* Card image with overlays for special jokers */}
        <div className="absolute inset-0 z-10 rounded-xl overflow-hidden flex items-center justify-center min-h-0">
          {/* Animated overlays for special jokers (hologram & legendaries) */}
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
              style={{ width: '110%', height: '110%' }}
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
          <div className="flex items-center justify-center w-full h-full min-h-0 relative">
            <Image
              src={image}
              alt={name}
              fill
              priority={priority}
              sizes="(max-width: 640px) 7rem, (max-width: 768px) 8rem, (max-width: 1024px) 9rem, (max-width: 1280px) 10rem, 11rem"
              className="object-contain pointer-events-none select-none transition-all rounded-xl"
              draggable={false}
              style={filter ? { filter } : undefined}
            />
          </div>
        </div>
        {/* Joker number badge removed, now shown next to cost below */}
      </motion.div>
      <div className="flex-1 flex flex-col justify-center min-w-0 gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
          <div className="font-m6x11plus text-zinc-100 text-lg md:text-xl text-center sm:text-left break-words">{name}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-2 sm:p-3 shadow-inner">
            <span className="bg-black/30 text-white font-m6x11plus rounded-xl px-2 py-1 text-xs sm:text-sm ">Description:</span>
            <div className="bg-transparent rounded-md px-2 py-2 sm:p-3 text-white font-m6x11plus text-center sm:text-left text-xs sm:text-sm md:text-base w-full mb-1 sm:mb-2 break-words max-h-32 sm:max-h-40 md:max-h-48 overflow-auto">
              {description ? highlightDescription(description) : "No description available."}
            </div>
          </div>
          <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-2 sm:p-3 shadow-inner">
            <span className="bg-black/30 text-white font-m6x11plus rounded-xl px-2 py-1 text-xs sm:text-sm mt-2">Unlock Condition:</span>
            <div className="bg-transparent rounded-md px-2 py-2 sm:p-3 text-white font-m6x11plus text-center sm:text-left text-xs sm:text-sm md:text-base w-full mb-1 sm:mb-2 break-words max-h-24 sm:max-h-32 md:max-h-40 overflow-auto">
              {unlock_condition ? unlock_condition : "Available from the start."}
            </div>
          </div>
          {(typeof cost !== 'undefined' && cost !== null) || (typeof order !== 'undefined' && order !== null) ? (
            <div className="flex flex-row gap-2 mt-2 self-center sm:self-end">
              {typeof cost !== 'undefined' && cost !== null && (
                <div className="font-m6x11plus text-xs md:text-sm text-zinc-300 bg-white/20 backdrop-blur-sm border border-white/30 px-2 py-1 rounded-xl text-center whitespace-nowrap shadow">
                  Cost: <span className="text-amber-300">{cost}</span>
                </div>
              )}
              {typeof order !== 'undefined' && order !== null && (
                <div className="font-m6x11plus text-xs md:text-sm text-zinc-300 bg-white/20 backdrop-blur-sm border border-white/30 px-2 py-1 rounded-xl text-center whitespace-nowrap shadow">
                  ID: <span className="text-sky-300">{order}</span>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
