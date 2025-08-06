"use client";

import React from "react";
import BoosterPack from "./boosterPack";

function highlightDescription(text) {
  if (!text) return text;
  const patterns = [
    { color: 'text-orange-400', regex: /(\d+ of \d+|Joker|Playing|immediately|Deck|Jumbo|Mega|Normal|Buffoon)/gi },
    { color: 'text-amber-400', regex: /(cost|add|used|effect|pack|packs|size)/gi },
    { color: 'text-purple-400', regex: /(Tarot Cards|Tarot|Arcana)/gi },
    { color: 'text-blue-400', regex: /(Planet Cards|Celestial Cards|Spectral Cards)/gi },
    { color: 'text-red-400', regex: /(Joker Cards|Buffoon)/gi },
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
      result.push(React.createElement('span', { key: i + found[0], className: foundColor }, found[0]));
      i = foundEnd;
    } else {
      result.push(text[i]);
      i++;
    }
  }
  return result;
}

export default function BoosterPackWide({ id, name, image, cost, size, effect, priority = false }) {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 w-full rounded-2xl p-4 shadow-2xl bg-zinc-900/95 backdrop-blur-lg border border-zinc-800" style={{boxShadow:'0 8px 32px 0 rgba(10,10,20,0.45)', border:'2px solid #18181b'}}>
      <div className="relative w-28 h-36 sm:w-32 sm:h-40 md:w-36 md:h-48 flex-shrink-0 flex items-center justify-center select-none rounded-xl">
        <BoosterPack
          id={id}
          name={""}
          image={image}
          priority={priority}
        />
      </div>
      <div className="flex-1 flex flex-col justify-center min-w-0 gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
          <div className="font-m6x11plus text-white text-2xl sm:text-3xl md:text-4xl text-center sm:text-left break-words">{name}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="rounded-xl bg-zinc-800/80 border border-zinc-700 p-3 sm:p-4 shadow-inner">
            <span className="bg-black/60 text-white font-m6x11plus rounded-xl px-3 py-2 text-lg sm:text-xl">Effect:</span>
            <div className="bg-transparent rounded-md px-3 py-3 sm:p-4 text-white font-m6x11plus text-center sm:text-left text-lg sm:text-xl md:text-2xl w-full mb-2 sm:mb-3 break-words max-h-32 sm:max-h-40 md:max-h-48 overflow-auto">
              {effect ? highlightDescription(effect) : "No effect available."}
            </div>
          </div>
          <div className="flex flex-row gap-3 mt-3 self-center sm:self-end">
            <div className="font-m6x11plus text-lg sm:text-xl md:text-2xl text-zinc-300 bg-zinc-900/60 border border-zinc-700 px-3 py-2 rounded-xl text-center whitespace-nowrap shadow">
              Cost: <span className="text-amber-400">{cost}</span>
            </div>
            <div className="font-m6x11plus text-lg sm:text-xl md:text-2xl text-zinc-300 bg-zinc-900/60 border border-zinc-700 px-3 py-2 rounded-xl text-center whitespace-nowrap shadow">
              Size: <span className="text-sky-400">{size}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
