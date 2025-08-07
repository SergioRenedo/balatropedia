"use client"

import React, { useState, useEffect } from "react";
import { motion, useSpring, useAnimationControls } from "framer-motion";
import Image from "next/image";
import JokerCard from "./jokerCard";

const rarityImages = {
  Common: "/sprites/buttons/common.webp",
  Uncommon: "/sprites/buttons/uncommon.webp",
  Rare: "/sprites/buttons/rare.webp",
  Legendary: "/sprites/buttons/legendary.webp",
};


const negativeFilter = "invert(0.8) hue-rotate(250deg) saturate(1.3) brightness(1)";

// Syntax highlighting for joker description (copied from CardWide)
function highlightDescription(text) {
  if (!text) return text;
  const patterns = [
    { color: 'text-green-500', regex: /(\d+\s*in\s*\d+|Club[s]?|Reroll)/gi },
    { color: 'text-red-500', regex: /(\+?-?\d+(\.\d+)?-\d+(\.\d+)?\s*Mult|\+?-?\d+(\.\d+)?\s*Mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?\s*Mult|X\+?-?\d+(\.\d+)?\s*Mult|\+?-?\d+(\.\d+)?-\d+(\.\d+)?Mult|\+?-?\d+(\.\d+)?Mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?Mult|X\+?-?\d+(\.\d+)?Mult|\+?-?\d+(\.\d+)?-\d+(\.\d+)?\s*mult|\+?-?\d+(\.\d+)?\s*mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?\s*mult|X\+?-?\d+(\.\d+)?\s*mult|\+?-?\d+(\.\d+)?-\d+(\.\d+)?mult|\+?-?\d+(\.\d+)?mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?mult|X\+?-?\d+(\.\d+)?mult|X\+?-?\d+(\.\d+)?-\d+(\.\d+)?|X\+?-?\d+(\.\d+)?|Mult|Heart[s]?|self destructs|self destruct|Self Destruct|Red Seal)/gi },
    { color: 'text-blue-400', regex: /(\+\d+\s*Chips|-\d+\s*Chips|\+\d+Chips|-\d+Chips|chips\s*\d+|Chips|Spectral|Planet|Spade[s]?|Celestial Packs|Blue Seal)/gi },
    { color: 'text-orange-400', regex: /(poker hand|hand size|first hand|hands|Flush House|Five of a Kind|Full House|Four of a Kind|Flush Five|Flushes|Flush|Straights|Straight|discards|discarded|discard|High Card|Cards|cards|card|Pair|Three Of A Kind|Two Pair|Joker|Blind|double|Small Blind|Big Blind|Common|Boss Blind|Diamonds|Diamond|Faces|Face|\$ Card|\$)/gi },
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

export default function JokersWide({ name, order, rarity, image, effect = "None", priority = false, description, unlock_condition, cost }) {
  return (
    <div
      className="flex flex-col md:flex-row items-center md:items-stretch gap-4 md:gap-8 w-full max-w-full md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto rounded-2xl px-2 md:px-6 lg:px-10 py-3 md:py-6 shadow-xl bg-neutral-900/95 backdrop-blur-md border border-neutral-800"
      style={{ boxShadow: '0 8px 32px 0 rgba(20,20,30,0.45)', border: '2px solid #222' }}
    >
      <div className="relative w-28 h-44 md:w-40 md:h-64 lg:w-52 lg:h-80 xl:w-60 xl:h-96 flex-shrink-0 flex items-center justify-center select-none card-img rounded-xl mx-auto md:mx-0">
        <JokerCard
          name={""}
          order={order}
          rarity={rarity}
          image={image}
          priority={priority}
          effect={effect}
        />
      </div>
      <div className="flex-1 flex flex-col justify-center min-w-0 gap-2 md:gap-4 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-2 mb-1 w-full">
          <div className="font-m6x11plus text-white text-lg md:text-2xl lg:text-3xl xl:text-4xl text-center md:text-left break-words md:pl-4 w-full">{name}</div>
        </div>
        <div className="flex flex-col gap-2 md:gap-4 w-full">
          <div className="rounded-xl bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 p-2 md:p-4 lg:p-6 shadow-inner w-full">
            <span className="bg-black/40 text-white font-m6x11plus rounded-xl px-2 py-1 md:px-3 md:py-2 text-base md:text-lg lg:text-xl xl:text-2xl w-full">Description:</span>
            <div className="bg-transparent rounded-md px-2 py-2 md:p-3 lg:p-4 text-white font-m6x11plus text-center md:text-left text-base md:text-lg lg:text-xl xl:text-2xl w-full mb-2 break-words max-h-28 md:max-h-40 lg:max-h-56 xl:max-h-64 overflow-auto">
              {description ? highlightDescription(description) : "No description available."}
            </div>
          </div>
          <div className="rounded-xl bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 p-2 md:p-4 lg:p-6 shadow-inner w-full">
            <span className="bg-black/40 text-white font-m6x11plus rounded-xl px-2 py-1 md:px-3 md:py-2 text-base md:text-lg lg:text-xl xl:text-2xl mt-2 w-full">Unlock Condition:</span>
            <div className="bg-transparent rounded-md px-2 py-2 md:p-3 lg:p-4 text-white font-m6x11plus text-center md:text-left text-base md:text-lg lg:text-xl xl:text-2xl w-full mb-2 break-words max-h-16 md:max-h-32 lg:max-h-40 overflow-auto">
              {unlock_condition ? unlock_condition : "Available from the start."}
            </div>
          </div>
          {(typeof cost !== 'undefined' && cost !== null) || (typeof order !== 'undefined' && order !== null) ? (
            <div className="flex flex-col md:flex-row gap-2 md:gap-3 mt-2 w-full">
              {typeof cost !== 'undefined' && cost !== null && (
                <div className="font-m6x11plus text-base md:text-xl lg:text-2xl xl:text-3xl text-white bg-neutral-800/60 backdrop-blur-sm border border-neutral-700 px-2 py-1 md:px-3 md:py-2 rounded-xl text-center whitespace-nowrap shadow w-full">
                  Cost: <span className="text-amber-400">{cost}</span>
                </div>
              )}
              {typeof order !== 'undefined' && order !== null && (
                <div className="font-m6x11plus text-base md:text-xl lg:text-2xl xl:text-3xl text-white bg-neutral-800/60 backdrop-blur-sm border border-neutral-700 px-2 py-1 md:px-3 md:py-2 rounded-xl text-center whitespace-nowrap shadow w-full">
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
