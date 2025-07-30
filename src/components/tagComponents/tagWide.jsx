"use client";
import Tag from "./tag";

export default function TagWide({ id, name, description, ante }) {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-2 w-full rounded-2xl p-3 shadow-2xl bg-zinc-900/90 backdrop-blur-md backdrop-saturate-150 border border-zinc-800" style={{boxShadow:'0 6px 24px 0 rgba(31,38,135,0.18)', border:'1.5px solid rgba(255,255,255,0.10)'}}>
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0 flex items-center justify-center select-none card-img rounded-xl bg-zinc-800/80">
        <Tag id={id} name={name} />
      </div>
      <div className="flex-1 flex flex-col justify-center min-w-0 gap-1">
        <div className="font-m6x11plus text-zinc-100 text-lg md:text-xl text-center sm:text-left break-words">{name}</div>
        <div className="rounded-xl bg-zinc-800/70 backdrop-blur-sm border border-zinc-700 p-1 sm:p-2 shadow-inner">
          <div className="bg-transparent rounded px-1 py-1 sm:p-2 text-zinc-200 font-m6x11plus text-center sm:text-left text-xs sm:text-sm md:text-base w-full break-words min-h-[2.2rem]">
            {description}
          </div>
        </div>
        <div className="font-m6x11plus text-xs md:text-sm text-blue-200 bg-zinc-900/70 backdrop-blur-sm border border-zinc-700 px-2 py-1 rounded-xl text-center sm:text-right whitespace-nowrap mt-1 self-center sm:self-end shadow">
          Ante: <span className="text-amber-300">{ante}</span>
        </div>
      </div>
    </div>
  );
}
