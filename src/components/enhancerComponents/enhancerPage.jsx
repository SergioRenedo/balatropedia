
"use client";
import React, { useState } from "react";
import Enhancer from "./enhancer";
import dynamic from "next/dynamic";
const EnhancerWide = dynamic(() => import("./enhancerWide"));
const EnhancerModal = dynamic(() => import("./enhancerModal"));
import modifiers from "../../app/jsondata/modifiers.json";

export default function EnhancerPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEnhancer, setSelectedEnhancer] = useState(null);
  const [wideMode, setWideMode] = useState(false);

  React.useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  const handleEnhancerClick = (enhancer) => {
    setSelectedEnhancer(enhancer);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEnhancer(null);
  };

  // Split modifiers into enhancers and seals
  const enhancers = modifiers.filter(m => m.type === "enhancement");
  const seals = modifiers.filter(m => m.type === "seal");


  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950 px-4 py-8 relative overflow-x-clip">
      {/* Subtle animated background */}
      <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none bg-gradient-to-br from-zinc-900/80 via-zinc-800/60 to-zinc-950/90 animate-gradient-x">
        <div className="absolute left-1/4 top-0 w-1/3 h-1/2 bg-gradient-to-b from-yellow-200/20 via-transparent to-transparent blur-2xl opacity-30 animate-spotlight1" />
        <div className="absolute right-1/4 top-0 w-1/3 h-1/2 bg-gradient-to-b from-yellow-400/20 via-transparent to-transparent blur-2xl opacity-20 animate-spotlight2" />
        <div className="absolute left-1/2 top-0 w-1/2 h-1/3 bg-gradient-to-b from-yellow-300/20 via-transparent to-transparent blur-2xl opacity-10 animate-spotlight3" />
      </div>
      {/* Go Back to Main Page Button */}
      <div className="flex justify-center w-full mb-4 z-10">
        <a
          href="/"
          className="font-m6x11plus bg-yellow-500/70 text-white px-5 py-2 rounded-xl shadow-lg text-base sm:text-lg transition hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full sm:w-auto text-center"
          style={{ maxWidth: '20rem' }}
        >
          Back to Main Page
        </a>
      </div>
      <div className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-screen-2xl flex flex-col items-center gap-12 z-10">
        <h1 className="font-m6x11plus text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white text-center mb-2 tracking-tight drop-shadow-xl" style={{textShadow:'0 2px 16px #fff,0 0 0 #fff'}}>
          Card Modifiers
        </h1>
        <p className="text-base text-white/90 font-m6x11plus md:text-lg mb-6 text-center max-w-2xl drop-shadow">
          <span className="text-lg sm:text-xl md:text-2xl">Browse all card modifiers from <span className="text-yellow-300 font-bold">Balatro</span>! Discover every enhancer and seal effect. Click a card for more info.</span>
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-6 w-full items-center">
          <button
            type="button"
            className="font-m6x11plus bg-yellow-700/80 text-white px-4 py-2 rounded-xl shadow-md text-lg sm:text-xl md:text-2xl transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onClick={() => document.getElementById('enhancers-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Enhancers
          </button>
          <button
            type="button"
            className="font-m6x11plus bg-yellow-400/80 text-white px-4 py-2 rounded-xl shadow-md text-lg sm:text-xl md:text-2xl transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onClick={() => document.getElementById('seals-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Seals
          </button>
          <button
            type="button"
            className={`font-m6x11plus px-4 py-2 rounded-xl shadow-md text-lg sm:text-xl md:text-2xl transition bg-yellow-500/80 text-white hover:bg-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${wideMode ? 'ring-2 ring-yellow-400' : ''}`}
            onClick={() => setWideMode(w => !w)}
            aria-pressed={wideMode}
            style={{ minWidth: '10rem' }}
          >
            {wideMode ? 'Switch to Grid View' : 'Switch to Wide View'}
          </button>
        </div>
        {/* Enhancers Section */}
        <section id="enhancers-section" className="w-full rounded-2xl p-6 mb-8 bg-gradient-to-br from-yellow-200/30 via-yellow-400/20 to-yellow-700/30 shadow-xl relative overflow-hidden border border-yellow-300/30">
          <div className="relative z-10">
            <h2 className="font-m6x11plus text-3xl sm:text-4xl md:text-5xl text-yellow-200 mb-4 text-center drop-shadow-xl">Enhancers</h2>
            {wideMode ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {enhancers.map(enhancer => (
                  <EnhancerWide key={enhancer.id} id={enhancer.id} name={enhancer.name} type={enhancer.type} effect={enhancer.effect} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-6 justify-center">
                {enhancers.map(enhancer => (
                  <div key={enhancer.id} onClick={() => handleEnhancerClick(enhancer)} className="cursor-pointer">
                    <Enhancer id={enhancer.id} name={enhancer.name} type={enhancer.type} effect={enhancer.effect} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        {/* Seals Section */}
        <section id="seals-section" className="w-full rounded-2xl p-6 mb-8 bg-gradient-to-br from-yellow-200/30 via-yellow-400/20 to-yellow-700/30 shadow-xl relative overflow-hidden border border-yellow-300/30">
          <div className="relative z-10">
            <h2 className="font-m6x11plus text-3xl sm:text-4xl md:text-5xl text-yellow-200 mb-4 text-center drop-shadow-xl">Seals</h2>
            {wideMode ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {seals.map(seal => (
                  <EnhancerWide key={seal.id} id={seal.id} name={seal.name} type={seal.type} effect={seal.effect} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-6 justify-center">
                {seals.map(seal => (
                  <div key={seal.id} onClick={() => handleEnhancerClick(seal)} className="cursor-pointer">
                    <Enhancer id={seal.id} name={seal.name} type={seal.type} effect={seal.effect} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      {/* Go to Top Button (hidden when modal is open) */}
      {!modalOpen && (
        <button
          type="button"
          aria-label="Go to top"
          className="fixed bottom-6 right-6 z-50 bg-yellow-500 text-white font-m6x11plus px-4 py-3 rounded-full shadow-lg text-2xl sm:text-3xl transition hover:scale-110 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑ Top
        </button>
      )}
      <EnhancerModal open={modalOpen} enhancer={selectedEnhancer} onClose={handleCloseModal} />
    </main>
  );
}
