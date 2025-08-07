"use client";

import React, { useState } from "react";
import PlayingCard from "./playingCard";

const enhancerFilenames = [
  "enhancer_1.webp","enhancer_2.webp","enhancer_3.webp","enhancer_4.webp","enhancer_5.webp","enhancer_6.webp","enhancer_7.webp","enhancer_8.webp","enhancer_9.webp"
];
const enhancerList = enhancerFilenames.map(name => `/sprites/enhancers/${name}`);
const cardFilenames = [
  "card_r0_c0.webp","card_r0_c1.webp","card_r0_c2.webp","card_r0_c3.webp","card_r0_c4.webp","card_r0_c5.webp","card_r0_c6.webp","card_r0_c7.webp","card_r0_c8.webp","card_r0_c9.webp","card_r0_c10.webp","card_r0_c11.webp","card_r0_c12.webp",
  "card_r1_c0.webp","card_r1_c1.webp","card_r1_c2.webp","card_r1_c3.webp","card_r1_c4.webp","card_r1_c5.webp","card_r1_c6.webp","card_r1_c7.webp","card_r1_c8.webp","card_r1_c9.webp","card_r1_c10.webp","card_r1_c11.webp","card_r1_c12.webp",
  "card_r2_c0.webp","card_r2_c1.webp","card_r2_c2.webp","card_r2_c3.webp","card_r2_c4.webp","card_r2_c5.webp","card_r2_c6.webp","card_r2_c7.webp","card_r2_c8.webp","card_r2_c9.webp","card_r2_c10.webp","card_r2_c11.webp","card_r2_c12.webp",
  "card_r3_c0.webp","card_r3_c1.webp","card_r3_c2.webp","card_r3_c3.webp","card_r3_c4.webp","card_r3_c5.webp","card_r3_c6.webp","card_r3_c7.webp","card_r3_c8.webp","card_r3_c9.webp","card_r3_c10.webp","card_r3_c11.webp","card_r3_c12.webp"
];
const cardList = cardFilenames.map(name => `/sprites/playing_cards/${name}`);
const sealList = [
  "/sprites/enhancers/seal_0.webp",
  "/sprites/enhancers/seal_1.webp",
  "/sprites/enhancers/seal_2.webp",
  "/sprites/enhancers/seal_3.webp",
  "/sprites/enhancers/seal_4.webp"
];

export default function PlayingCardPage() {
  const [cardIdx, setCardIdx] = useState(0);
  const [enhancerIdx, setEnhancerIdx] = useState(0);
  const [sealIdx, setSealIdx] = useState(0);

  const handlePrevCard = () => setCardIdx((i) => (i - 1 + cardList.length) % cardList.length);
  const handleNextCard = () => setCardIdx((i) => (i + 1) % cardList.length);
  const handleEnhancement = () => setEnhancerIdx((i) => (i + 1) % enhancerList.length);
  const handleSeal = () => setSealIdx((i) => (i + 1) % sealList.length);

  return (
    <main className="flex flex-col min-h-screen items-center pb-24 relative overflow-x-clip">
      {/* LABORATORY FLUID BACKGROUND + subtle grid overlay */}
      <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none bg-gradient-to-br from-blue-900/80 via-fuchsia-900/60 to-yellow-200/10 animate-gradient-x">
        <div className="absolute left-1/4 top-0 w-1/3 h-1/2 bg-gradient-to-b from-cyan-300/40 via-transparent to-transparent blur-2xl opacity-60 animate-spotlight1"></div>
        <div className="absolute right-1/4 top-0 w-1/3 h-1/2 bg-gradient-to-b from-fuchsia-400/30 via-transparent to-transparent blur-2xl opacity-40 animate-spotlight2"></div>
        <div className="absolute left-1/2 top-0 w-1/2 h-1/3 bg-gradient-to-b from-yellow-300/30 via-transparent to-transparent blur-2xl opacity-30 animate-spotlight3"></div>
        <div className="absolute inset-0 pointer-events-none z-0" style={{backgroundImage:'repeating-linear-gradient(0deg,rgba(255,255,255,0.03) 0 1px,transparent 1px 100%),repeating-linear-gradient(90deg,rgba(255,255,255,0.03) 0 1px,transparent 1px 100%)'}}></div>
      </div>
      {/* HEADER */}
      <section className="w-full max-w-4xl mx-auto px-3 sm:px-8 pt-10 pb-4 flex flex-col items-center relative z-10">
        <div className="flex w-full justify-center mb-4">
          <a
            href="/"
            className="font-m6x11plus bg-blue-500/50 text-white px-5 py-2 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full max-w-xs text-center"
          >
            Back to Main Page
          </a>
        </div>
        <h1 className="font-m6x11plus text-5xl md:text-6xl text-white drop-shadow-lg mb-2 text-center tracking-tight">
          Card Playground
        </h1>
        <p className="text-2xl text-white/90 drop-shadow font-m6x11plus md:text-xl mb-6 text-center max-w-2xl">
          Experiment with every possible card, enhancement, and seal combination! Use the controls to cycle through layers and visualize the result. <span className="text-cyan-400 font-bold">Laboratory Mode</span> lets you test and preview all effects.
        </p>
      </section>
      {/* MAIN CONTENT */}
      <section className="w-full max-w-screen-lg mx-auto px-2 sm:px-6 py-6 flex flex-col items-center">
        <div className="w-full flex flex-col lg:flex-row gap-8 items-stretch justify-center">
          {/* Card display, always centered */}
          <div className="flex flex-col items-center justify-center w-full lg:w-1/2 xl:w-2/5">
            <div className="w-full flex justify-center items-center py-2">
              <PlayingCard
                enhancer={enhancerList[enhancerIdx]}
                card={cardList[cardIdx]}
                seal={sealList[sealIdx]}
                priority={true}
              />
            </div>
          </div>
          {/* Controls, always visible, styled as a lab console */}
          <div className="flex flex-col items-center justify-center w-full lg:w-1/2 xl:w-3/5">
            <div className="w-full max-w-2xl rounded-2xl bg-gradient-to-br from-neutral-900/95 via-blue-950/90 to-fuchsia-900/80 backdrop-blur-md border-2 border-blue-900 shadow-2xl p-3 sm:p-6 flex flex-col gap-3 sm:gap-4 items-center relative" style={{ boxShadow: '0 8px 32px 0 rgba(20,20,30,0.45)', border: '2px solid #222' }}>
              <div className="absolute top-2 right-4 text-xs text-cyan-300 font-m6x11plus opacity-70 pointer-events-none select-none">Lab Console</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full">
                <button className="bg-blue-900/80 hover:bg-blue-700 text-white font-m6x11plus px-3 py-2 sm:px-4 sm:py-3 rounded-xl shadow transition w-full border border-blue-800 backdrop-blur-sm text-base sm:text-lg" onClick={handlePrevCard}>Previous Card</button>
                <button className="bg-blue-900/80 hover:bg-blue-700 text-white font-m6x11plus px-3 py-2 sm:px-4 sm:py-3 rounded-xl shadow transition w-full border border-blue-800 backdrop-blur-sm text-base sm:text-lg" onClick={handleNextCard}>Next Card</button>
                <button className="bg-green-900/80 hover:bg-green-700 text-green-300 font-m6x11plus px-3 py-2 sm:px-4 sm:py-3 rounded-xl shadow transition w-full border border-green-800 backdrop-blur-sm text-base sm:text-lg" onClick={handleEnhancement}>Change Enhancement</button>
                <button className="bg-yellow-900/80 hover:bg-yellow-700 text-yellow-300 font-m6x11plus px-3 py-2 sm:px-4 sm:py-3 rounded-xl shadow transition w-full border border-yellow-800 backdrop-blur-sm text-base sm:text-lg" onClick={handleSeal}>Change Seal</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Go Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 z-50 px-4 py-2 rounded-full bg-blue-900/70 text-white font-m6x11plus shadow-lg hover:bg-blue-900/90 transition"
        aria-label="Go back to top"
      >
        ↑ Top
      </button>
      <footer className="mt-12 text-xs text-white/40 font-m6x11plus text-center">
        2025 Balatropedia. Fan made project.
      </footer>
    </main>
  );
}
