"use client";

import React from "react";
import DeckCard from "./deckCard";

// DeckWide: Wide card for decks, inspired by jokersWide
export default function DeckWide({ id, name, order, description, unlock_condition, priority = false }) {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 w-full rounded-2xl p-4 shadow-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-800/60 backdrop-blur-md backdrop-saturate-150" style={{boxShadow:'0 8px 32px 0 rgba(31,38,135,0.18)', border:'1.5px solid rgba(255,255,255,0.18)'}}>
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
          <div className="font-m6x11plus text-zinc-100 text-lg md:text-xl text-center sm:text-left break-words">{name}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-2 sm:p-3 shadow-inner">
            <span className="bg-black/30 text-white font-m6x11plus rounded-xl px-2 py-1 text-xs sm:text-sm ">Description:</span>
            <div className="bg-transparent rounded-md px-2 py-2 sm:p-3 text-white font-m6x11plus text-center sm:text-left text-xs sm:text-sm md:text-base w-full mb-1 sm:mb-2 break-words max-h-32 sm:max-h-40 md:max-h-48 overflow-auto">
              {description ? description : "No description available."}
            </div>
          </div>
          {unlock_condition && (
            <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-2 sm:p-3 shadow-inner">
              <span className="bg-black/30 text-white font-m6x11plus rounded-xl px-2 py-1 text-xs sm:text-sm mt-2">Unlock Condition:</span>
              <div className="bg-transparent rounded-md px-2 py-2 sm:p-3 text-white font-m6x11plus text-center sm:text-left text-xs sm:text-sm md:text-base w-full mb-1 sm:mb-2 break-words max-h-24 sm:max-h-32 md:max-h-40 overflow-auto">
                {unlock_condition}
              </div>
            </div>
          )}
          {typeof order !== 'undefined' && order !== null && (
            <div className="flex flex-row gap-2 mt-2 self-center sm:self-end">
              <div className="font-m6x11plus text-xs md:text-sm text-zinc-300 bg-white/20 backdrop-blur-sm border border-white/30 px-2 py-1 rounded-xl text-center whitespace-nowrap shadow">
                ID: <span className="text-sky-300">{order}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
