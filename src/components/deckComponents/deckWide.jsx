"use client";

import React from "react";
// Syntax highlighting for deck description and unlock_condition (copied from jokersWide)
function highlightDescription(text) {
  if (!text) return text;
  const patterns = [
    { color: 'text-green-500', regex: /(\d+\s*in\s*\d+|Club[s]?|Reroll)/gi },
    { color: 'text-red-500', regex: /(\+?-?\d+(\.\d+)?-\d+(\.\d+)?\s*Mult|\+?-?\d+(\.\d+)?\s*Mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?\s*Mult|X\+?-?\d+(\.\d+)?\s*Mult|\+?-?\d+(\.\d+)?-\d+(\.\d+)?Mult|\+?-?\d+(\.\d+)?Mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?Mult|X\+?-?\d+(\.\d+)?Mult|\+?-?\d+(\.\d+)?-\d+(\.\d+)?\s*mult|\+?-?\d+(\.\d+)?\s*mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?\s*mult|X\+?-?\d+(\.\d+)?\s*mult|\+?-?\d+(\.\d+)?-\d+(\.\d+)?mult|\+?-?\d+(\.\d+)?mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?mult|X\+?-?\d+(\.\d+)?mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?|X\+?-?\d+(\.\d+)?|Mult|Heart[s]?|self destructs|self destruct|Self Destruct|Red Seal)/gi },
    { color: 'text-blue-400', regex: /(\+\d+\s*Chips|-\d+\s*Chips|\+\d+Chips|-\d+Chips|chips\s*\d+|Chips|Spectral|Planet Merchant|Planet|Spade[s]?|Celestial Packs|Blue Seal|Hex)/gi },
    { color: 'text-orange-400', regex: /(poker hand|hand size|first hand|hands|Flush House|Five of a Kind|Full House|Four of a Kind|Flush Five|Flushes|Flush|Straights|Straight|discards|discarded|discard|High Card|Cards|cards|card|Pair|Three Of A Kind|Two Pair|Joker|Blind|double|Small Blind|Big Blind|Common|Boss Blind|Diamonds|Diamond|Faces|Face|\$ Card|Ranks|Suits|Deck|\$)/gi },
    { color: 'text-orange-400', regex: /(?<!Chips\s|Mult\s|X\d+(\.\d+)?\s|\d+ in )\b\d+(\.\d+)?\b/gi },
    { color: 'text-purple-400', regex: /(Tarot Merchant|Tarot|Legendary|Purple Seal|Crystal Ball|The Fool)/gi },
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
import DeckCard from "./deckCard";

// DeckWide: Wide card for decks, inspired by jokersWide
export default function DeckWide({ id, name, order, description, unlock_condition, priority = false }) {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 w-full rounded-2xl p-4 shadow-xl border border-zinc-900 dark:border-zinc-900 bg-zinc-900/90 backdrop-blur-md backdrop-saturate-150" style={{boxShadow:'0 8px 32px 0 rgba(15,18,35,0.38)', border:'2px solid rgba(0,0,0,0.38)'}}>
      <div className="relative w-28 h-44 sm:w-32 sm:h-52 md:w-36 md:h-60 flex-shrink-0 flex items-center justify-center select-none card-img rounded-xl">
        <DeckCard
          id={id}
          name=""
          order={order}
          priority={priority}
        />
      </div>
      <div className="flex-1 flex flex-col justify-center min-w-0 gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
          <div className="font-m6x11plus text-zinc-100 text-2xl sm:text-3xl md:text-4xl text-center sm:text-left break-words sm:pl-4">{name}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-2 sm:p-3 shadow-inner">
            <span className="bg-black/30 text-white font-m6x11plus rounded-xl px-2 py-1 text-xl sm:text-2xl md:text-3xl ">Description:</span>
            <div className="bg-transparent rounded-md px-2 py-2 sm:p-3 text-white font-m6x11plus text-center sm:text-left text-2xl sm:text-3xl md:text-4xl w-full mb-1 sm:mb-2 break-words max-h-32 sm:max-h-40 md:max-h-48 overflow-auto">
              {description ? highlightDescription(description) : "No description available."}
            </div>
          </div>
          {unlock_condition && (
            <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-2 sm:p-3 shadow-inner">
              <span className="bg-black/30 text-white font-m6x11plus rounded-xl px-2 py-1 text-xl sm:text-2xl md:text-3xl mt-2">Unlock Condition:</span>
              <div className="bg-transparent rounded-md px-2 py-2 sm:p-3 text-white font-m6x11plus text-center sm:text-left text-2xl sm:text-3xl md:text-4xl w-full mb-1 sm:mb-2 break-words max-h-24 sm:max-h-32 md:max-h-40 overflow-auto">
                {unlock_condition ? highlightDescription(unlock_condition) : null}
              </div>
            </div>
          )}
          {typeof order !== 'undefined' && order !== null && (
            <div className="flex flex-row gap-2 mt-2 self-center sm:self-end">
              <div className="font-m6x11plus text-2xl sm:text-3xl md:text-4xl text-zinc-300 bg-white/20 backdrop-blur-sm border border-white/30 px-2 py-1 rounded-xl text-center whitespace-nowrap shadow">
                ID: <span className="text-sky-300">{order}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
