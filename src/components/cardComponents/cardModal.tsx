'use client';

import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import Card from "./card";

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
  // Highlighting logic (copied from jokerModal)
  function highlightDescription(text: string) {
    if (!text) return text;
    // Priority: green > red > blue > orange > purple
    const patterns = [
      { color: 'text-green-500', regex: /(\d+\s*in\s*\d+|Club[s]?|Reroll)/gi },
      // Red: +N Mult, XN Mult, XN.N Mult, X0.2 Mult, Heart, Hearts
      { color: 'text-red-500', regex: /(\+?-?\d+(\.\d+)?-\d+(\.\d+)?\s*Mult|\+?-?\d+(\.\d+)?\s*Mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?\s*Mult|X\+?-?\d+(\.\d+)?\s*Mult|\+?-?\d+(\.\d+)?-\d+(\.\d+)?Mult|\+?-?\d+(\.\d+)?Mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?Mult|X\+?-?\d+(\.\d+)?Mult|\+?-?\d+(\.\d+)?-\d+(\.\d+)?\s*mult|\+?-?\d+(\.\d+)?\s*mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?\s*mult|X\+?-?\d+(\.\d+)?\s*mult|\+?-?\d+(\.\d+)?-\d+(\.\d+)?mult|\+?-?\d+(\.\d+)?mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?mult|X\+?-?\d+(\.\d+)?mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?|X\+?-?\d+(\.\d+)?|Mult|Heart[s]?|self destructs|self destruct|Self Destruct|Red Seal)/gi },
      // Blue: Chips, Spade, Spades
      { color: 'text-blue-400', regex: /(\+\d+\s*Chips|-\d+\s*Chips|\+\d+Chips|-\d+Chips|chips\s*\d+|Chips|Spectral|Planet|Spade[s]?|Celestial Packs|Blue Seal)/gi },
      { color: 'text-orange-400', regex: /(poker hand|hand size|first hand|hands|Flush House|Five of a Kind|Full House|Four of a Kind|Flush Five|Flushes|Flush|Straights|Straight|discards|discarded|discard|High Card|Cards|cards|card|Pair|Three Of A Kind|Two Pair|Joker|Blind|Doubles|double|Small Blind|Big Blind|Common|Boss Blind|Diamonds|Diamond|Faces|Face|\$ Card|\$)/gi },
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
            className="relative flex flex-col items-center bg-gradient-to-br from-[#232a3a]/80 via-[#2e3140]/80 to-[#3a2a4a]/80 backdrop-blur-xl border border-white/40 rounded-2xl w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl min-h-[320px] md:min-h-[400px] max-h-[98svh] xl:max-h-[90vh] p-3 sm:p-6 md:p-8 overflow-y-auto shadow-2xl"
            style={{ minHeight: 0, minWidth: 0, boxShadow: '0 12px 40px 0 rgba(60, 40, 120, 0.35)', border: "2px solid rgba(255,255,255,0.22)" }}
            onClick={e => e.stopPropagation()}
          >
            <h2 className="font-m6x11plus text-2xl md:text-3xl lg:text-4xl text-white tracking-tight w-full break-words px-1 text-center mb-2">
              {card.name}
            </h2>
            <div className="flex flex-col sm:flex-row w-full items-center gap-4 mb-2">
              <div className="relative w-28 h-44 sm:w-32 sm:h-52 md:w-36 md:h-60 lg:w-40 lg:h-64 flex-shrink-0 flex items-center justify-center select-none card-img rounded-xl">
                <Card
                  id={card.id}
                  name=""
                  priority={true}
                  onClick={() => {}}
                />
              </div>
              <div className="flex flex-col flex-1 items-center sm:items-start w-full">
                <span className="bg-black/40 text-white font-m6x11plus rounded-xl px-2 py-1 text-lg sm:text-xl md:text-2xl mb-2">Description:</span>
                <div className="bg-transparent rounded-md px-2 py-2 sm:p-3 text-white font-m6x11plus text-center sm:text-left text-lg sm:text-xl md:text-2xl w-full mb-1 sm:mb-2 break-words max-h-32 sm:max-h-40 md:max-h-48 overflow-auto">
                  {card.description ? highlightDescription(card.description) : "No description available."}
                </div>
                {card.type && (
                  <span className="bg-black/40 text-white font-m6x11plus rounded-xl px-2 py-1 text-lg sm:text-xl md:text-2xl mt-2">Type: {card.type}</span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="mt-2 font-m6x11plus bg-red-500/80 text-white w-full transition hover:bg-red-700 px-4 py-2 rounded-lg text-base shadow-sm border border-white/20"
              tabIndex={0}
              style={{ position: 'sticky', bottom: 0, zIndex: 10, fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', borderRadius: 'clamp(0.5rem, 1vw, 0.8rem)' }}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
