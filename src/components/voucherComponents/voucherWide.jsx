"use client";
import React from "react";
import Voucher from "./voucher";

export default function VoucherWide({ id, name, effect, unlock, note }) {
  // Syntax highlight function (same as jokersModal)
  function highlightDescription(text) {
    if (!text) return text;
    const patterns = [
      { color: 'text-orange-400', regex: /(slots|card slot|shop|cards|packs|off|restock|foil|holographic|polychrome|joker slot|consumable slot|interest|discard|hand|ante|planet|tarot|celestial|spectral|boss blind|reroll|sell value|price|chip|multiplier|requirement|reward|minimum|unlock|start|round|each|every|total|appear|available|purchased|redeem|use|buy|max|cap|blank|negative|enhancement|edition|seal|green deck|effect|bonus|extra|random|all|any|activate|trigger|score|level|size|value|money|tree|merchant|tycoon|globe|telescope|observatory|grabber|nacho tong|wasteful|recyclomancy|directors cut|retcon|paint brush|palette|hieroglyph|petroglyph|liquidation|clearance sale|overstock|overstock plus|hone|glow up|crystal ball|omen globe|seed money|magic trick|illusion)/gi },
      { color: 'text-amber-400', regex: /(cost|add|used|effect|pack|packs|bonus|extra|random|all|any|each|every|discount|off|restock|slot|cap|max|min|increase|reduce|appear|available|purchased|redeem|use|buy|interest|sell|price|value|chip|multiplier|requirement|reward|minimum|unlock|start|round|planet|tarot|celestial|spectral|boss blind|reroll|hand|discard|ante|joker|consumable|blank|negative|enhancement|edition|seal|green deck|tree|merchant|tycoon|globe|telescope|observatory|grabber|nacho tong|wasteful|recyclomancy|directors cut|retcon|paint brush|palette|hieroglyph|petroglyph|liquidation|clearance sale|overstock|overstock plus|hone|glow up|crystal ball|omen globe|seed money|magic trick|illusion)/gi },
      { color: 'text-purple-400', regex: /(Tarot|Arcana)/gi },
      { color: 'text-blue-400', regex: /(Planet|Celestial|Spectral)/gi },
      { color: 'text-red-400', regex: /(Joker|Buffoon)/gi },
      { color: 'text-green-500', regex: /(immediately|activate|trigger|available|start|bonus|extra|random|all|any|each|every)/gi },
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
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 w-full rounded-2xl p-4 shadow-xl bg-zinc-800/60 backdrop-blur-md backdrop-saturate-150 border border-zinc-300 dark:border-zinc-700" style={{boxShadow:'0 8px 32px 0 rgba(31,38,135,0.18)', border:'1.5px solid rgba(255,255,255,0.18)'}}>
      <div className="relative w-28 h-44 sm:w-32 sm:h-52 md:w-36 md:h-60 flex-shrink-0 flex items-center justify-center select-none card-img rounded-xl">
        <Voucher
          id={id}
          name={name}
        />
      </div>
      <div className="flex-1 flex flex-col justify-center min-w-0 gap-2">
        <div className="font-m6x11plus text-zinc-900 dark:text-white text-lg md:text-xl mb-2 text-center sm:text-left break-words">{name}</div>
        <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-2 sm:p-3 shadow-inner">
          <div className="bg-transparent rounded-md px-2 py-2 sm:p-3 text-zinc-900 dark:text-white font-m6x11plus text-center sm:text-left text-xl w-full break-words min-h-[3rem]">
            {effect ? highlightDescription(effect) : "No effect."}
            {unlock && <><br /><span className="text-sky-300 text-xl">Unlock: {highlightDescription(unlock)}</span></>}
          </div>
        </div>
      </div>
    </div>
  );
}
