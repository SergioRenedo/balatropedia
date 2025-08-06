"use client";
import { useState, useEffect } from "react";
import achievements from "../../app/jsondata/achievements.json";
import Achievement from "./achievement";
import dynamic from "next/dynamic";
const AchievementModal = dynamic(() => import("./achievementModal"));
const AchievementWide = dynamic(() => import("./achievementWide"));
import Link from "next/link";

export default function AchievementPage() {
  const [wide, setWide] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  return (
    <main className="flex flex-col min-h-screen items-center pb-24 relative overflow-x-clip">
      {/* Trophy Room/Hall of Fame background with spotlights */}
      <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none bg-gradient-to-br from-yellow-100/10 via-zinc-900 to-yellow-900/30 backdrop-blur-2xl">
        {/* Spotlights */}
        <div className="absolute left-1/4 top-0 w-1/3 h-1/2 bg-gradient-to-b from-yellow-200/40 via-transparent to-transparent blur-2xl opacity-60 rotate-[-8deg]" />
        <div className="absolute right-1/4 top-0 w-1/3 h-1/2 bg-gradient-to-b from-yellow-400/30 via-transparent to-transparent blur-2xl opacity-40 rotate-[8deg]" />
      </div>
      <section className="w-full max-w-6xl mx-auto px-3 sm:px-8 pt-10 pb-4 flex flex-col items-center relative z-10">
        <div className="flex w-full justify-center mb-4 gap-2 flex-wrap">
          <Link
            href="/"
            className="font-m6x11plus bg-red-500/50 text-white px-5 py-2 rounded-xl text-base sm:text-lg transition hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-xs text-center"
          >
            Back to Main Page
          </Link>
          <button
            className={`font-m6x11plus px-4 py-2 rounded-xl text-base transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${wide ? "bg-blue-500/80 text-white" : "bg-zinc-700/60 text-zinc-200 hover:bg-blue-400/40"}`}
            onClick={() => setWide(w => !w)}
            aria-pressed={wide}
          >
            {wide ? "Grid View" : "Wide View"}
          </button>
        </div>
        <div className="flex flex-col items-center mb-2">
          <span className="text-6xl md:text-7xl mb-2 drop-shadow-lg">🏆</span>
          <h1 className="font-m6x11plus text-4xl md:text-5xl text-yellow-300 mb-1 text-center tracking-tight drop-shadow-lg" style={{textShadow:'0 2px 8px #0008,0 0 0 #fff'}}>
            Balatro Achievements
          </h1>
          <p className="text-base text-yellow-100 font-m6x11plus md:text-lg mb-2 text-center max-w-2xl drop-shadow">
            Browse all <span className="text-yellow-300 font-bold">Balatro</span> achievements in this trophy room! Switch between grid and wide view.
          </p>
        </div>
      </section>
      <section className="w-full max-w-7xl mx-auto px-2 sm:px-6 py-6 flex flex-col items-center">
        {wide ? (
          <div className="w-full rounded-3xl p-3 sm:p-6 mb-8 border-4 border-yellow-400/80 shadow-[0_8px_32px_0_rgba(255,215,0,0.18)] bg-gradient-to-br from-yellow-100/30 via-green-100/10 to-yellow-300/10">
            <div className="flex flex-col gap-6 w-full md:hidden">
              {achievements.map(achievement => (
                <AchievementWide key={achievement.id} {...achievement} />
              ))}
            </div>
            <div className="hidden md:grid w-full gap-6 grid-cols-2">
              {achievements.map(achievement => (
                <AchievementWide key={achievement.id} {...achievement} />
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full rounded-3xl p-3 sm:p-6 border-4 border-yellow-400/80 shadow-[0_8px_32px_0_rgba(255,215,0,0.18)] bg-gradient-to-br from-yellow-100/30 via-green-100/10 to-yellow-300/10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="bg-white/10 border border-yellow-200/40 rounded-xl flex flex-col items-center justify-center p-3 shadow-lg cursor-pointer hover:bg-yellow-100/20 transition min-h-[7.5rem] min-w-0"
                  onClick={() => { setSelectedAchievement(achievement); setModalOpen(true); }}
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { setSelectedAchievement(achievement); setModalOpen(true); } }}
                  aria-label={`View details for ${achievement.name}`}
                >
                  <Achievement {...achievement}/>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Go Back to Top Button (floating, only if modal not open) */}
        {!modalOpen && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-50 px-4 py-2 rounded-full bg-black/70 text-white font-m6x11plus shadow-lg hover:bg-black/90 transition"
            aria-label="Go back to top"
          >
            ↑ Top
          </button>
        )}
      </section>
      <AchievementModal open={modalOpen} achievement={selectedAchievement} onClose={() => setModalOpen(false)} />
    </main>
  );
}
