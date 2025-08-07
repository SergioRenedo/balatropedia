"use client";

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

export default function EnhancerWide({ id, name, type, effect, priority = false }) {
  return (
    <div
      className="flex flex-col sm:flex-row items-center sm:items-stretch gap-6 sm:gap-8 w-full max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto rounded-2xl px-3 sm:px-6 md:px-8 py-4 sm:py-6 shadow-xl bg-neutral-900/90 backdrop-blur-md border border-neutral-800"
      style={{ boxShadow: '0 8px 32px 0 rgba(20,20,30,0.45)', border: '2px solid #222' }}
    >
      <div className="relative w-28 h-44 sm:w-36 sm:h-60 md:w-40 md:h-64 lg:w-48 lg:h-80 flex-shrink-0 flex items-center justify-center select-none rounded-xl">
        <Enhancer id={id} name={""} type={type} effect={effect} priority={priority} />
      </div>
      <div className="flex-1 flex flex-col justify-center min-w-0 gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
          <div className="font-m6x11plus text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center sm:text-left break-words">{name}</div>
        </div>
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="rounded-xl bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 p-3 sm:p-4 md:p-6 shadow-inner">
            <span className="bg-black/40 text-white font-m6x11plus rounded-xl px-2 py-1 sm:px-3 sm:py-2 text-lg sm:text-xl md:text-2xl lg:text-3xl ">Effect:</span>
            <div className="bg-transparent rounded-md px-2 py-2 sm:p-3 md:p-4 text-white font-m6x11plus text-center sm:text-left text-lg sm:text-xl md:text-2xl lg:text-3xl w-full mb-2 break-words max-h-32 sm:max-h-40 md:max-h-56 lg:max-h-64 overflow-auto">
              {effect ? highlightEffect(effect) : "No effect available."}
            </div>
          </div>
          {/* No badge for seals */}
        </div>
      </div>
    </div>
  );
}
