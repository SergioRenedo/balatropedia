"use client";
import React from "react";
import Voucher from "./voucher";

export default function VoucherWide({ id, name, effect, unlock, note }) {
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
          <div className="bg-transparent rounded-md px-2 py-2 sm:p-3 text-zinc-900 dark:text-white font-m6x11plus text-center sm:text-left text-xs sm:text-sm md:text-base w-full break-words min-h-[3rem]">
            {effect ? effect : "No effect."}
            {unlock && <><br /><span className="text-sky-300 text-xl">Unlock: {unlock}</span></>}
            {note && <><br /><span className="text-amber-200 text-xl mt-1">{note}</span></>}
          </div>
        </div>
      </div>
    </div>
  );
}
