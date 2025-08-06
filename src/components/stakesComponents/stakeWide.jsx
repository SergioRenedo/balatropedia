"use client";
import Stake from "./stake";

const stakeColors = {
  "Red Stake": "text-red-400",
  "Black Stake": "text-zinc-400",
  "Gold Stake": "text-yellow-300",
  "Platinum Stake": "text-blue-300",
  "Antimatter Stake": "text-fuchsia-400",
  "Glass Stake": "text-cyan-300",
  "White Stake": "text-white",
  "Blue Stake": "text-sky-400",
  "Purple Stake": "text-purple-400",
  "Orange Stake": "text-orange-400",
  "Green Stake": "text-green-400",
  "Bronze Stake": "text-amber-700",
  "Silver Stake": "text-gray-300",
};

export default function StakeWide({ id, name, effect, unlocks, order }) {
  const colorClass = stakeColors[name] || "text-zinc-100";
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-2 w-full rounded-2xl p-3 shadow-2xl bg-black/95 backdrop-blur-md border border-zinc-900">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0 flex items-center justify-center select-none card-img rounded-xl bg-zinc-900/90">
        <Stake id={id} name={name} order={order} />
      </div>
      <div className="flex-1 flex flex-col justify-center min-w-0 gap-1">
        <div className={`font-m6x11plus ${colorClass} text-2xl md:text-3xl text-center sm:text-left break-words`}>{name}</div>
        <div className="rounded-xl bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 p-1 sm:p-2 shadow-inner">
          <div className="bg-transparent rounded px-1 py-1 sm:p-2 text-zinc-200 font-m6x11plus text-center sm:text-left text-lg sm:text-xl md:text-2xl w-full break-words min-h-[2.2rem]">
            {effect}
          </div>
        </div>
        {unlocks && (
          <div className="font-m6x11plus text-base md:text-lg text-amber-200 bg-black/80 backdrop-blur-sm border border-zinc-800 px-2 py-1 rounded-xl text-center sm:text-right whitespace-nowrap mt-1 self-center sm:self-end shadow">
            Unlocks: <span className="text-amber-300">{unlocks}</span>
          </div>
        )}
      </div>
    </div>
  );
}
