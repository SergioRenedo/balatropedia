"use client";
import Achievement from "./achievement";

export default function AchievementWide({ id, name, description }) {
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
        <Achievement id={id} name={name} />
      </div>
      <div className="flex-1 flex flex-col justify-center min-w-0 gap-1">
        <div className="font-m6x11plus text-zinc-100 text-lg md:text-xl text-center sm:text-left break-words">{name}</div>
        <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-1 sm:p-2 shadow-inner">
          <div className="bg-transparent rounded px-1 py-1 sm:p-2 text-zinc-900 dark:text-white font-m6x11plus text-center sm:text-left text-xs sm:text-sm md:text-base w-full break-words min-h-[2.2rem]">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}
