"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import Enhancer from "./enhancer";



function highlightEffect(text) {
  if (!text) return text;
  const patterns = [
    { color: 'text-green-500', regex: /(\d+\s*in\s*\d+)/gi },
    // Red: Mult, destroy, Retrigger, and 'simultaneously' before Mult
    { color: 'text-red-500', regex: /(\+?-?\d+(\.\d+)? Mult|x\d+(\.\d+)? Mult|Mult|destroy|Retrigger)/gi },
    // Blue: Chips, Planet, Blue Seal, and '+number chips' (e.g. '+30 chips')
    { color: 'text-blue-400', regex: /(Chips|Planet Card|Blue Seal|\+\d+\s*chips)/gi },
    // Orange: $number (e.g. $20, $5.50) first for priority, then other phrases
    { color: 'text-orange-400', regex: /(\$\d+(\.\d+)?|poker hand|hand|round|money|\$|Gold Seal|Red Seal|\$\{\d+\})/gi },
    { color: 'text-purple-400', regex: /(Tarot Card|Purple Seal)/gi },
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

export default function EnhancerModal({ open, enhancer, onClose }) {
  if (!enhancer) return null;
  return (
    <AnimatePresence>
      {open && enhancer && (
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
              {enhancer.name}
            </h2>
            <div className="flex flex-col sm:flex-row w-full items-center gap-4 mb-2">
              <div className="relative w-28 h-44 sm:w-32 sm:h-52 md:w-36 md:h-60 lg:w-40 lg:h-64 flex-shrink-0 flex items-center justify-center select-none cursor-pointer">
                <Enhancer
                  id={enhancer.id}
                  name={""}
                  type={enhancer.type}
                  effect={enhancer.effect}
                  priority={true}
                />
              </div>
              <div className="flex flex-col flex-1 items-center sm:items-start w-full">
                <div className="bg-transparent rounded-md px-2 py-2 sm:p-3 text-white font-m6x11plus text-center sm:text-left text-lg sm:text-xl md:text-2xl w-full mb-1 sm:mb-2 break-words max-h-32 sm:max-h-40 md:max-h-48 overflow-auto">
                  {enhancer.effect ? highlightEffect(enhancer.effect) : "No effect available."}
                </div>
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
