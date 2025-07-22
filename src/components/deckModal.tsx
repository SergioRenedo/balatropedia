"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React from "react";

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
          className="relative bg-zinc-900/90 rounded-2xl shadow-2xl border border-white/20 p-6 w-full max-w-md mx-4 flex flex-col items-center"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
            <div className="w-32 h-48 mb-4 relative">
            <Image
              src={`/sprites/decks/${deck.id}.webp`}
              alt={deck.name}
              fill
              sizes="(max-width: 768px) 128px, 128px"
              className="object-contain rounded-xl"
              draggable={false}
            />
            </div>
          <h2 className="font-m6x11plus text-2xl text-white mb-2 text-center tracking-tight">{deck.name}</h2>
          <div className="bg-white/10 rounded-lg p-2 mb-2 w-full text-white font-m6x11plus text-center text-base">
            {deck.description}
          </div>
          <div className="text-xs text-white/70 font-m6x11plus mb-4 text-center">
            <span className="font-bold text-yellow-300">Unlock:</span> {deck.unlock_condition}
          </div>
          <button
            className="mt-2 font-m6x11plus bg-blue-500/80 text-white w-full rounded-xl py-2 transition hover:bg-blue-400/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={onClose}
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
