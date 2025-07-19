'use client';

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React from "react";

export type CardModalProps = {
  open: boolean;
  card: {
    id: string | number;
    name: string;
    image: string;
    description?: string;
    type?: string;
  } | null;
  onClose: () => void;
};

export default function CardModal({ open, card, onClose }: CardModalProps) {
  // Card movement and shadow logic
  const { useEffect } = React;
  const { useSpring, useAnimationControls } = require("framer-motion");
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });
  const shadowX = useSpring(0, { stiffness: 200, damping: 20 });
  const shadowY = useSpring(0, { stiffness: 200, damping: 20 });
  const controls = useAnimationControls();

  // Highlighting logic from jokerModal
  function highlightDescription(text: string) {
    if (!text) return text;
    // Priority: green > red > blue > orange > purple
    const patterns = [
      { color: 'text-green-500', regex: /(\d+\s*in\s*\d+|Club[s]?|Reroll)/gi },
      // Red: +N Mult, XN Mult, XN.N Mult, X0.2 Mult, Heart, Hearts
      { color: 'text-red-500', regex: /(\+?-?\d+(\.\d+)?-\d+(\.\d+)?\s*Mult|\+?-?\d+(\.\d+)?\s*Mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?\s*Mult|X\+?-?\d+(\.\d+)?\s*Mult|\+?-?\d+(\.\d+)?-\d+(\.\d+)?Mult|\+?-?\d+(\.\d+)?Mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?Mult|X\+?-?\d+(\.\d+)?Mult|\+?-?\d+(\.\d+)?-\d+(\.\d+)?\s*mult|\+?-?\d+(\.\d+)?\s*mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?\s*mult|X\+?-?\d+(\.\d+)?\s*mult|\+?-?\d+(\.\d+)?-\d+(\.\d+)?mult|\+?-?\d+(\.\d+)?mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?mult|X\+?-?\d+(\.\d+)?mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?|X\+?-?\d+(\.\d+)?|Mult|Heart[s]?|self destructs|self destruct|Self Destruct|Red Seal)/gi },
      // Blue: Chips, Spade, Spades
      { color: 'text-blue-400', regex: /(\+\d+\s*Chips|-\d+\s*Chips|\+\d+Chips|-\d+Chips|chips\s*\d+|Chips|Spectral|Planet|Spade[s]?|Celestial Packs|Blue Seal)/gi },
      { color: 'text-orange-400', regex: /(poker hand|hand size|first hand|hands|Five of a Kind|Full House|Four of a Kind|Flush Five|Flushes|Flush|Straights|Straight|discards|discarded|discard|High Card|Cards|cards|card|Pair|Three Of A Kind|Two Pair|Joker|Blind|double|Small Blind|Big Blind|Common|Boss Blind|Diamonds|Diamond|Faces|Face|\$ Card|\$)/gi },
      // Standalone numbers (orange) not part of above
      { color: 'text-orange-400', regex: /(?<!Chips\s|Mult\s|X\d+(\.\d+)?\s|\d+ in )\b\d+(\.\d+)?\b/gi },
      { color: 'text-purple-400', regex: /(Tarot|Legendary|Purple Seal)/gi },
    ];

    // Find all matches with priority, non-overlapping
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
        result.push(<span key={i + found[0]} className={foundColor}>{found[0]}</span>);
        i = foundEnd;
      } else {
        result.push(text[i]);
        i++;
      }
    }
    return result;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
  // Only start floating after modal opening animation completes
  useEffect(() => {
    if (!open) {
      controls.stop();
    }
  }, [open, card]);

  return (
    <AnimatePresence>
      {open && card && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 28, duration: 0.25 }}
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm px-1 py-2"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 70, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 70, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 200, damping: 26, duration: 0.32 }}
            className="relative flex flex-col items-center bg-gradient-to-br from-[#232a3a]/80 via-[#2e3140]/80 to-[#3a2a4a]/80 backdrop-blur-xl border border-white/40 rounded-2xl w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl min-h-[320px] md:min-h-[400px] max-h-[98svh] xl:max-h-[90vh] p-3 sm:p-6 md:p-8 overflow-y-auto shadow-2xl"
            style={{ minHeight: 0, minWidth: 0, boxShadow: '0 12px 40px 0 rgba(60, 40, 120, 0.35)', border: "2px solid rgba(255,255,255,0.22)" }}
            onClick={e => e.stopPropagation()}
            onAnimationComplete={() => { if (open && card) startFloating(); }}
          >
            <h2 className="font-m6x11plus text-xl md:text-2xl text-white tracking-tight w-full break-words px-1 text-center mb-2">
              {card.name}
            </h2>
            <div className="flex flex-col sm:flex-row w-full items-center gap-4 mb-2">
              <motion.div
                animate={controls}
                style={{
                  perspective: 1200,
                  rotateX,
                  rotateY,
                }}
                className="relative w-28 h-44 sm:w-32 sm:h-52 md:w-36 md:h-60 lg:w-40 lg:h-64 flex-shrink-0 flex items-center justify-center select-none cursor-pointer"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                tabIndex={0}
                role="button"
                aria-label={`View info for ${card.name}`}
              >
                {/* Sombra */}
                <motion.div
                  style={{
                    x: shadowX,
                    y: shadowY,
                    opacity: 0.20,
                    height: "110%",
                    width: "120%",
                  }}
                  className="absolute bg-black rounded-xl z-0 scale-90 pointer-events-none w-[160%] h-[140%]"
                />
                {/* Card image with special overlay for c_soul */}
                <div className="absolute inset-0 z-10 rounded-xl overflow-hidden">
                  {/* Animated overlay for c_soul */}
                  {card.id === "c_soul" && (
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
                        priority
                        className="object-contain pointer-events-none select-none"
                        draggable={false}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </motion.div>
                  )}
                  {/* Main card image */}
                  <Image
                    src={card.id ? `/sprites/cards/${card.id}.webp` : card.image}
                    alt={card.name}
                    fill
                    sizes="(max-width: 640px) 7rem, (max-width: 768px) 8rem, (max-width: 1024px) 9rem, (max-width: 1280px) 10rem, 11rem"
                    className="object-contain pointer-events-none select-none transition-all rounded-xl"
                    draggable={false}
                    priority
                  />
                </div>
              </motion.div>
              <div className="flex flex-col flex-1 items-center sm:items-start w-full">
                <span className="bg-black/40 text-white font-m6x11plus rounded-xl px-2 py-1 text-xs sm:text-sm mb-2">Description:</span>
                <div className="bg-transparent rounded-md px-2 py-2 sm:p-3 text-white font-m6x11plus text-center sm:text-left text-xs sm:text-sm md:text-base w-full mb-1 sm:mb-2 break-words max-h-32 sm:max-h-40 md:max-h-48 overflow-auto">
                  {card.description ? highlightDescription(card.description) : "No description available."}
                </div>
                {card.type && (
                  <span className="bg-black/40 text-white font-m6x11plus rounded-xl px-2 py-1 text-xs sm:text-sm mt-2">Type: {card.type}</span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="mt-2 font-m6x11plus bg-red-500/80 text-white w-full transition hover:bg-red-400/80 px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-2 rounded-lg sm:rounded-xl text-xs xs:text-sm sm:text-base md:text-lg"
              tabIndex={0}
              style={{ position: 'sticky', bottom: 0, zIndex: 10, fontSize: 'clamp(0.8rem, 2vw, 1.15rem)', padding: 'clamp(0.4rem, 1vw, 0.7rem) clamp(1rem, 3vw, 1.5rem)', borderRadius: 'clamp(0.6rem, 2vw, 1.1rem)' }}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
