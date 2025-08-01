"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import BoosterPack from "./boosterPack";

export type BoosterPackModalProps = {
  open: boolean;
  boosterPack: {
    id: string;
    name: string;
    image: string;
    effect?: string;
    cost?: number;
    size?: string;
    category?: string;
  } | null;
  onClose: () => void;
};

function highlightDescription(text: string) {
  if (!text) return text;
  const patterns = [
    { color: 'text-orange-400', regex: /(\d+ of \d+|Joker|Playing|immediately|Deck|Jumbo|Mega|Normal|Buffoon)/gi },
    { color: 'text-amber-400', regex: /(cost|add|used|effect|pack|packs|size)/gi },
    { color: 'text-purple-400', regex: /(Tarot Cards|Tarot|Arcana)/gi },
    { color: 'text-blue-400', regex: /(Planet Cards|Celestial Cards|Spectral Cards)/gi },
    { color: 'text-red-400', regex: /(Joker|Buffoon)/gi },
    { color: 'text-green-500', regex: /(immediately)/gi },
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
      result.push(<span key={i + found[0]} className={foundColor}>{found[0]}</span>);
      i = foundEnd;
    } else {
      result.push(text[i]);
      i++;
    }
  }
  return result;
}

export default function BoosterPackModal({ open, boosterPack, onClose }: BoosterPackModalProps) {
  return (
    <AnimatePresence>
      {open && boosterPack && (
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
            className="relative flex flex-col items-center bg-gradient-to-br from-[#232a3a]/80 via-[#2e3140]/80 to-[#3a2a4a]/80 border border-white/40 rounded-2xl w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl min-h-[320px] md:min-h-[400px] max-h-[98svh] xl:max-h-[90vh] p-3 sm:p-6 md:p-8 overflow-y-auto shadow-2xl"
            style={{ minHeight: 0, minWidth: 0, boxShadow: '0 12px 40px 0 rgba(60, 40, 120, 0.35)', border: "2px solid rgba(255,255,255,0.22)" }}
            onClick={e => e.stopPropagation()}
          >
            <h2 className="font-m6x11plus text-xl md:text-2xl text-white tracking-tight w-full break-words px-1 text-center mb-2">
              {boosterPack.name}
            </h2>
            <div className="flex flex-col sm:flex-row w-full items-center gap-4 mb-2">
              <div className="relative w-28 h-36 sm:w-32 sm:h-40 md:w-36 md:h-48 flex-shrink-0 flex items-center justify-center select-none rounded-xl">
                <BoosterPack
                  id={boosterPack.id}
                  name={""}
                  image={boosterPack.image}
                  priority={true}
                  onClick={() => {}}
                />
              </div>
              <div className="flex flex-col flex-1 items-center sm:items-start w-full">
                <span className="bg-black/40 text-white font-m6x11plus rounded-xl px-2 py-1 text-xs sm:text-sm mb-2">Effect:</span>
                <div className="bg-transparent rounded-md px-2 py-2 sm:p-3 text-white font-m6x11plus text-center sm:text-left text-xs sm:text-sm md:text-base w-full mb-1 sm:mb-2 break-words max-h-32 sm:max-h-40 md:max-h-48 overflow-auto">
                  {boosterPack.effect ? highlightDescription(boosterPack.effect) : "No effect available."}
                </div>
                <div className="flex flex-col sm:flex-row gap-2 mt-2 self-center sm:self-start w-full">
                  <span className="font-m6x11plus text-xs md:text-sm text-zinc-300 bg-black/40 px-2 py-1 rounded-xl text-center whitespace-nowrap shadow w-full sm:w-auto">
                    Cost: <span className="text-amber-500 dark:text-amber-300">{boosterPack.cost}</span>
                  </span>
                  <span className="font-m6x11plus text-xs md:text-sm text-zinc-300 bg-black/40 px-2 py-1 rounded-xl text-center whitespace-nowrap shadow w-full sm:w-auto">
                    Size: <span className="text-sky-500 dark:text-sky-300">{boosterPack.size}</span>
                  </span>
                  {boosterPack.category && (
                    <span className="font-m6x11plus text-xs md:text-sm text-zinc-300 bg-black/40 px-2 py-1 rounded-xl text-center whitespace-nowrap shadow w-full sm:w-auto">
                      Category: <span className="text-purple-400">{boosterPack.category}</span>
                    </span>
                  )}
                </div>
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
