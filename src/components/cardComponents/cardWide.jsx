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
    { color: 'text-orange-400', regex: /(poker hand|hand size|first hand|hands|Flush House|Five of a Kind|Full House|Four of a Kind|Flush Five|Flushes|Flush|Straights|Straight|discards|discarded|discard|High Card|Cards|cards|card|Pair|Three Of A Kind|Two Pair|Jokers|Joker|Blind|doubles|double|Small Blind|Big Blind|Common|Boss Blind|Diamonds|Diamond|Faces|Face|\$ Card|\$)/gi },
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
    <div
      className="flex flex-col sm:flex-row items-center sm:items-stretch gap-6 sm:gap-8 w-full max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto rounded-2xl px-3 sm:px-6 md:px-8 py-4 sm:py-6 shadow-xl bg-neutral-900/90 backdrop-blur-md border border-neutral-800"
      style={{ boxShadow: '0 8px 32px 0 rgba(20,20,30,0.45)', border: '2px solid #222' }}
    >
      <div className="relative w-28 h-44 sm:w-36 sm:h-60 md:w-40 md:h-64 lg:w-48 lg:h-80 flex-shrink-0 flex items-center justify-center select-none card-img rounded-xl">
        <Card
          id={id}
          name={""}
          priority={priority}
        />
      </div>
      <div className="flex-1 flex flex-col justify-center min-w-0 gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
          <div className="font-m6x11plus text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center sm:text-left break-words">{name}</div>
        </div>
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="rounded-xl bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 p-3 sm:p-4 md:p-6 shadow-inner">
            <div className="bg-transparent rounded-md px-2 py-2 sm:p-3 md:p-4 text-white font-m6x11plus text-center sm:text-left text-lg sm:text-xl md:text-2xl lg:text-3xl w-full mb-2 break-words max-h-32 sm:max-h-40 md:max-h-56 lg:max-h-64 overflow-auto">
              {description ? highlightDescription(description) : "No description available."}
            </div>
          </div>
          {(typeof cost !== 'undefined' && cost !== null) || (typeof order !== 'undefined' && order !== null) ? (
            <div className="flex flex-row gap-2 mt-2 self-center sm:self-end">
              {typeof cost !== 'undefined' && cost !== null && (
                <div className="font-m6x11plus text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white bg-neutral-800/60 backdrop-blur-sm border border-neutral-700 px-2 py-1 sm:px-3 sm:py-2 rounded-xl text-center whitespace-nowrap shadow">
                  Cost: <span className="text-amber-400">{cost}</span>
                </div>
              )}
              {typeof order !== 'undefined' && order !== null && (
                <div className="font-m6x11plus text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white bg-neutral-800/60 backdrop-blur-sm border border-neutral-700 px-2 py-1 sm:px-3 sm:py-2 rounded-xl text-center whitespace-nowrap shadow">
                  ID: <span className="text-sky-400">{order}</span>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
