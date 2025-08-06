"use client"

import React from "react";
import Card from "./card";

// highlightDescription logic copied from cardModal for syntax highlighting
function highlightDescription(text) {
  if (!text) return text;
  const patterns = [
    { color: 'text-green-500', regex: /(\d+\s*in\s*\d+|Club[s]?|Reroll)/gi },
    { color: 'text-red-500', regex: /(\+?-?\d+(\.\d+)?-\d+(\.\d+)?\s*Mult|\+?-?\d+(\.\d+)?\s*Mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?\s*Mult|X\+?-?\d+(\.\d+)?\s*Mult|\+?-?\d+(\.\d+)?-\d+(\.\d+)?Mult|\+?-?\d+(\.\d+)?Mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?Mult|X\+?-?\d+(\.\d+)?Mult|\+?-?\d+(\.\d+)?-\d+(\.\d+)?\s*mult|\+?-?\d+(\.\d+)?\s*mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?\s*mult|X\+?-?\d+(\.\d+)?\s*mult|\+?-?\d+(\.\d+)?-\d+(\.\d+)?mult|\+?-?\d+(\.\d+)?mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?mult|X\+?-?\d+(\.\d+)?mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?|X\+?-?\d+(\.\d+)?|Mult|Heart[s]?|self destructs|self destruct|Self Destruct|Red Seal)/gi },
    { color: 'text-blue-400', regex: /(\+\d+\s*Chips|-\d+\s*Chips|\+\d+Chips|-\d+Chips|chips\s*\d+|Chips|Spectral|Planet|Spade[s]?|Celestial Packs|Blue Seal)/gi },
    { color: 'text-orange-400', regex: /(poker hand|hand size|first hand|hands|Flush House|Five of a Kind|Full House|Four of a Kind|Flush Five|Flushes|Flush|Straights|Straight|discards|discarded|discard|High Card|Cards|cards|card|Pair|Three Of A Kind|Two Pair|Joker|Blind|doubles|double|Small Blind|Big Blind|Common|Boss Blind|Diamonds|Diamond|Faces|Face|\$ Card|\$)/gi },
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

export default function CardWide({ id, name, description, cost, order, priority = false }) {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 w-full rounded-2xl p-4 shadow-xl bg-zinc-800/60 backdrop-blur-md backdrop-saturate-150 border border-zinc-300 dark:border-zinc-700" style={{boxShadow:'0 8px 32px 0 rgba(31,38,135,0.18)', border:'1.5px solid rgba(255,255,255,0.18)'}}>
      <div className="relative w-28 h-44 sm:w-32 sm:h-52 md:w-36 md:h-60 flex-shrink-0 flex items-center justify-center select-none card-img rounded-xl">
        <Card
          id={id}
          name={""}
          priority={priority}
        />
      </div>
      <div className="flex-1 flex flex-col justify-center min-w-0 gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
          <div className="font-m6x11plus text-zinc-900 dark:text-white text-xl sm:text-2xl md:text-3xl text-center sm:text-left break-words">{name}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-3 sm:p-4 shadow-inner">
            <span className="bg-black/30 text-zinc-900 dark:text-white font-m6x11plus rounded-xl px-2 py-1 text-lg sm:text-xl md:text-2xl ">Description:</span>
            <div className="bg-transparent rounded-md px-2 py-2 sm:p-3 text-zinc-900 dark:text-white font-m6x11plus text-center sm:text-left text-xl sm:text-2xl md:text-3xl w-full mb-1 sm:mb-2 break-words max-h-32 sm:max-h-40 md:max-h-48 overflow-auto">
              {description ? highlightDescription(description) : "No description available."}
            </div>
          </div>
          {(typeof cost !== 'undefined' && cost !== null) || (typeof order !== 'undefined' && order !== null) ? (
            <div className="flex flex-row gap-2 mt-2 self-center sm:self-end">
              {typeof cost !== 'undefined' && cost !== null && (
                <div className="font-m6x11plus text-xl sm:text-2xl md:text-3xl text-zinc-700 dark:text-zinc-300 bg-white/20 backdrop-blur-sm border border-white/30 px-2 py-1 rounded-xl text-center whitespace-nowrap shadow">
                  Cost: <span className="text-amber-500 dark:text-amber-300">{cost}</span>
                </div>
              )}
              {typeof order !== 'undefined' && order !== null && (
                <div className="font-m6x11plus text-xl sm:text-2xl md:text-3xl text-zinc-700 dark:text-zinc-300 bg-white/20 backdrop-blur-sm border border-white/30 px-2 py-1 rounded-xl text-center whitespace-nowrap shadow">
                  ID: <span className="text-sky-500 dark:text-sky-300">{order}</span>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
