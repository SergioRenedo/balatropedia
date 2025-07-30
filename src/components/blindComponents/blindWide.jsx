"use client";
import Blind from "./blind";

export default function BlindWide({ id, name, description, effect, order, minimum_ante, score_requirement, reward }) {
  return (
    <div
      className="flex flex-col sm:flex-row items-center sm:items-stretch gap-2 w-full rounded-3xl p-3 shadow-2xl border border-zinc-800 dark:border-zinc-900"
      style={{
        background: 'linear-gradient(135deg, #232526 0%, #1a1a1a 100%)',
        boxShadow: '0 6px 24px 0 rgba(31,38,135,0.18)',
        border: '1.5px solid rgba(30,30,30,0.5)'
      }}
    >
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0 flex items-center justify-center select-none card-img rounded-2xl">
        <Blind id={id} name={name} />
      </div>
      <div className="flex-1 flex flex-col justify-center min-w-0 gap-1">
        <div className="font-m6x11plus text-zinc-100 text-lg md:text-xl text-center sm:text-left break-words">{name}</div>
        <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-1 sm:p-2 shadow-inner">
          <div className="bg-transparent rounded px-1 py-1 sm:p-2 text-zinc-900 dark:text-white font-m6x11plus text-center sm:text-left text-xs sm:text-sm md:text-base w-full break-words min-h-[2.2rem]">
            {description}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-1 justify-center sm:justify-start">
          {typeof minimum_ante !== 'undefined' && (
            <span className="bg-black/40 font-m6x11plus rounded-xl px-2 py-1 text-xs sm:text-sm text-white">
              Min Ante: <span className="text-emerald-300">{minimum_ante}</span>
            </span>
          )}
          {typeof score_requirement !== 'undefined' && (
            <span className="bg-black/40 font-m6x11plus rounded-xl px-2 py-1 text-xs sm:text-sm text-white">
              Score Req: <span className="text-orange-300">{score_requirement}</span>
            </span>
          )}
          {typeof reward !== 'undefined' && (
            <span className="bg-black/40 font-m6x11plus rounded-xl px-2 py-1 text-xs sm:text-sm text-white">
              Reward: <span className="text-yellow-300">{reward}</span>
            </span>
          )}
          {effect && (
            <span className="font-m6x11plus text-xs md:text-sm text-blue-200 bg-white/20 backdrop-blur-sm border border-white/30 px-2 py-1 rounded-lg text-center sm:text-right whitespace-nowrap shadow">
              Effect: <span className="text-amber-300">{effect}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
