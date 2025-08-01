"use client";
import { useState, useEffect, useMemo } from "react";
import stakes from "../../app/jsondata/stakes.json";
import Stake from "./stake";
import StakeModal from "./stakeModal";
import StakeWide from "./stakeWide";
import Link from "next/link";

export default function StakesPage() {
  const [wide, setWide] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStake, setSelectedStake] = useState(null);

  const sortedStakes = [...stakes].sort((a, b) => a.order - b.order);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  // Hydration-safe: use default radius for SSR, update after mount
  const [chipRadius, setChipRadius] = useState(null);
  useEffect(() => {
    function updateRadius() {
      if (window.innerWidth < 640) {
        setChipRadius("calc(50% - 40px)"); // larger radius for mobile
      } else {
        setChipRadius("calc(50% - 60px)");
      }
    }
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  return (
    <main className="flex flex-col min-h-screen items-center pb-24 relative overflow-x-clip">
      {/* Poker Room Background with spotlights and wood border */}
      <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none bg-gradient-to-br from-green-900 via-zinc-900 to-yellow-900/30 backdrop-blur-2xl">
        {/* Spotlights */}
        <div className="absolute left-1/4 top-0 w-1/3 h-1/2 bg-gradient-to-b from-yellow-200/30 via-transparent to-transparent blur-2xl opacity-40 rotate-[-8deg]" />
        <div className="absolute right-1/4 top-0 w-1/3 h-1/2 bg-gradient-to-b from-yellow-400/20 via-transparent to-transparent blur-2xl opacity-30 rotate-[8deg]" />
      </div>

      {/* Header Section */}
      <section className="w-full max-w-6xl mx-auto px-3 sm:px-8 pt-10 pb-4 flex flex-col items-center relative z-10">
        <div className="flex w-full justify-center mb-4 gap-2 flex-wrap">
          <Link
            href="/"
            className="font-m6x11plus bg-red-500/50 text-white px-5 py-2 rounded-xl text-base sm:text-lg transition hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-xs text-center"
          >
            Back to Main Page
          </Link>
          <button
            className={`font-m6x11plus px-4 py-2 rounded-xl text-base transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              wide
                ? "bg-blue-500/80 text-white"
                : "bg-zinc-700/60 text-zinc-200 hover:bg-blue-400/40"
            }`}
            onClick={() => setWide((w) => !w)}
            aria-pressed={wide}
          >
            {wide ? "Grid View" : "Wide View"}
          </button>
        </div>
        <div className="flex flex-col items-center mb-2">
          <h1 className="font-m6x11plus text-4xl md:text-5xl text-yellow-200 mb-1 text-center tracking-tight drop-shadow-lg" style={{textShadow:'0 2px 8px #0008,0 0 0 #fff'}}>
            Balatro Stakes!
          </h1>
          <p className="text-base text-yellow-100 font-m6x11plus md:text-lg mb-2 text-center max-w-2xl drop-shadow">
            Browse all <span className="text-yellow-300 font-bold">Balatro</span> stakes in this casino lounge! Switch between grid and table view.
          </p>
        </div>
      </section>

      {/* Stakes Section */}
      <section className="w-full max-w-7xl mx-auto px-2 sm:px-6 py-6 flex flex-col items-center">
        {wide ? (
          <div className="w-full rounded-3xl p-3 sm:p-6 border-4 border-yellow-800/70 shadow-[0_8px_32px_0_rgba(191,161,74,0.18)] bg-gradient-to-br from-green-900/60 via-zinc-900/80 to-yellow-900/20" style={{boxShadow:'0 8px 32px 0 #000a, 0 0 0 8px #bfa14a33 inset'}}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {sortedStakes.map((stake) => (
                <div
                  key={stake.id}
                  className="bg-white/5 border border-yellow-900/30 rounded-xl flex flex-col items-center justify-center p-3 shadow-lg transition min-h-[7.5rem] min-w-0"
                  aria-label={`View details for ${stake.name}`}
                >
                  <StakeWide {...stake} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="relative flex items-center justify-center mx-auto casino-felt border-8 border-yellow-800/70 rounded-full shadow-[0_8px_32px_0_rgba(191,161,74,0.18)]"
            style={{
              width: "min(98vw, 480px)",
              height: "min(98vw, 480px)",
              background: "radial-gradient(ellipse at 60% 40%, #267a3e 70%, #154c26 100%)",
              position: "relative",
              padding: 0,
              minWidth: 220,
              minHeight: 220,
              overflow: "hidden",
              maxWidth: "100vw",
              maxHeight: "100vw",
              boxShadow: '0 8px 32px 0 #000a, 0 0 0 8px #bfa14a33 inset',
            }}
          >
            {/* Poker Table Center Logo */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1,
                pointerEvents: "none",
                opacity: 0.18,
                fontFamily: 'm6x11plus, monospace',
                fontSize: "2.5rem",
                color: "#fffbe6",
                letterSpacing: 2,
                textShadow: "0 2px 12px #000, 0 0 8px #e2c16b",
                userSelect: "none",
              }}
            >
              BALATRO
            </div>
            {/* Stakes in a circle (hydration-safe: only render after mount) */}
            {chipRadius && sortedStakes.map((stake, i) => {
              const total = sortedStakes.length;
              const angle = (2 * Math.PI * i) / total - Math.PI / 2;
              const radius = chipRadius;
              const left = `calc(50% + (${Math.cos(angle)} * (${radius}))`;
              const top = `calc(50% + (${Math.sin(angle)} * (${radius}))`;
              return (
                <div
                  key={stake.id}
                  style={{
                    position: "absolute",
                    left,
                    top,
                    transform: "translate(-50%, -50%)",
                    zIndex: 2,
                  }}
                  className="transition-transform duration-200 hover:z-10 cursor-pointer hover:scale-115 hover:-translate-y-1"
                  onClick={() => {
                    setSelectedStake(stake);
                    setModalOpen(true);
                  }}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedStake(stake);
                      setModalOpen(true);
                    }
                  }}
                  aria-label={`View details for ${stake.name}`}
                >
                  <Stake {...stake} />
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Scroll to Top Button (hide in grid mode) */}
      {!modalOpen && wide && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 px-4 py-2 rounded-full bg-black/70 text-white font-m6x11plus shadow-lg hover:bg-black/90 transition"
          aria-label="Go back to top"
        >
          ↑ Top
        </button>
      )}

      {/* Modal */}
      <StakeModal open={modalOpen} stake={selectedStake} onClose={() => setModalOpen(false)} />
    </main>
  );
}
