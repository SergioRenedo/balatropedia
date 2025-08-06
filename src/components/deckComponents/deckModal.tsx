"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import DeckCard from "./deckCard";
// Syntax highlighting for deck description and unlock_condition (copied from deckWide)
function highlightDescription(text: string) {
  if (!text) return text;
  const patterns = [
    { color: 'text-green-500', regex: /(\d+\s*in\s*\d+|Club[s]?|Reroll)/gi },
    { color: 'text-red-500', regex: /(\+?-?\d+(\.\d+)?-\d+(\.\d+)?\s*Mult|\+?-?\d+(\.\d+)?\s*Mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?\s*Mult|X\+?-?\d+(\.\d+)?\s*Mult|\+?-?\d+(\.\d+)?-\d+(\.\d+)?Mult|\+?-?\d+(\.\d+)?Mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?Mult|X\+?-?\d+(\.\d+)?Mult|\+?-?\d+(\.\d+)?-\d+(\.\d+)?\s*mult|\+?-?\d+(\.\d+)?\s*mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?\s*mult|X\+?-?\d+(\.\d+)?\s*mult|\+?-?\d+(\.\d+)?-\d+(\.\d+)?mult|\+?-?\d+(\.\d+)?mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?mult|X\+?-?\d+(\.\d+)?mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?|X\+?-?\d+(\.\d+)?|Mult|Heart[s]?|self destructs|self destruct|Self Destruct|Red Seal)/gi },
    { color: 'text-blue-400', regex: /(\+\d+\s*Chips|-\d+\s*Chips|\+\d+Chips|-\d+Chips|chips\s*\d+|Chips|Spectral|Planet Merchant|Planet|Spade[s]?|Celestial Packs|Blue Seal|Hex)/gi },
    { color: 'text-orange-400', regex: /(poker hand|hand size|first hand|hands|Flush House|Five of a Kind|Full House|Four of a Kind|Flush Five|Flushes|Flush|Straights|Straight|discards|discarded|discard|High Card|Cards|cards|card|Pair|Three Of A Kind|Two Pair|Joker|Blind|double|Small Blind|Big Blind|Common|Boss Blind|Diamonds|Diamond|Faces|Face|\$ Card|\$)/gi },
    { color: 'text-orange-400', regex: /(?<!Chips\s|Mult\s|X\d+(\.\d+)?\s|\d+ in )\b\d+(\.\d+)?\b/gi },
    { color: 'text-purple-400', regex: /(Tarot Merchant|Tarot|Legendary|Purple Seal|Crystal Ball|The Fool)/gi },
  ];
  let result: React.ReactNode[] = [];
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

export type DeckModalProps = {
  open: boolean;
  deck: {
    id: string;
    name: string;
    order: number;
    description: string;
    unlock_condition: string;
  } | null;
  onClose: () => void;
};

export default function DeckModal({ open, deck, onClose }: DeckModalProps) {
  if (!open || !deck) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative bg-zinc-900/90 rounded-2xl shadow-2xl border border-white/20 p-3 sm:p-6 w-full max-w-xs sm:max-w-md mx-2 sm:mx-4 flex flex-col items-center max-h-[95vh] overflow-y-auto"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          <div className="w-24 h-36 sm:w-32 sm:h-48 mb-3 sm:mb-4 relative flex items-center justify-center">
            <DeckCard
              id={deck.id}
              name=""
              order={deck.order}
              priority={true}
            />
          </div>
          <h2 className="font-m6x11plus text-3xl sm:text-4xl md:text-4xl text-white mb-2 text-center tracking-tight">{deck.name}</h2>
          <div className="bg-white/10 rounded-lg p-2 mb-2 w-full text-white font-m6x11plus text-center text-xl sm:text-2xl md:text-2xl">
            {deck.description ? highlightDescription(deck.description) : "No description available."}
          </div>
          <div className="text-lg sm:text-xl md:text-xl text-white/70 font-m6x11plus mb-4 text-center">
            <span className="text-yellow-300">Unlock:</span> {deck.unlock_condition ? highlightDescription(deck.unlock_condition) : null}
          </div>
          <button
            className="mt-2 font-m6x11plus bg-blue-500/80 text-white w-full rounded-xl py-2 transition hover:bg-blue-400/80 focus:outline-none focus:ring-2 focus:ring-blue-400 text-xl sm:text-2xl md:text-2xl"
            onClick={onClose}
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
