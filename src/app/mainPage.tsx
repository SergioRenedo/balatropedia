"use client";



import Link from "next/link";
import React, { useState, useEffect } from "react";
import FluidBackground from "../components/backgroundComponents/fluidBackground";
import JokerCard from "../components/jokerComponents/jokerCard";
import Card from "../components/cardComponents/card";
import Tag from "../components/tagComponents/tag";

import jokers from "./jokers_final.json";
import cardsData from "./cards.json";
import tags from "./tags.json";
import decks from "./decks.json";
import vouchers from "./vouchers.json";
import Voucher from "../components/voucherComponents/voucher";
import DeckCard from "../components/deckComponents/deckCard";
import blinds from "./blinds.json";
import Blind from "../components/blindComponents/blind";

export default function MainPage() {
  // Types
  type Joker = typeof jokers[number];
  type Card = typeof cardsData.Tarot[number] | typeof cardsData.Planet[number] | typeof cardsData.Spectral[number];
  type TagType = typeof tags[number];

  // Random Joker, Card, Tag, Deck, Voucher, Blind (client-only)
  const [randomJoker, setRandomJoker] = useState<Joker | null>(null);
  const [randomCard, setRandomCard] = useState<Card | null>(null);
  const [randomTag, setRandomTag] = useState<TagType | null>(null);
  const [randomDeck, setRandomDeck] = useState<any | null>(null);
  const [randomVoucher, setRandomVoucher] = useState<any | null>(null);
  const [randomBlind, setRandomBlind] = useState<any | null>(null);

  useEffect(() => {
    setRandomJoker(jokers[Math.floor(Math.random() * jokers.length)]);
    const allCards = [
      ...(cardsData.Tarot || []),
      ...(cardsData.Planet || []),
      ...(cardsData.Spectral || [])
    ];
    setRandomCard(allCards[Math.floor(Math.random() * allCards.length)]);
    setRandomTag(tags[Math.floor(Math.random() * tags.length)]);
    setRandomDeck(decks[Math.floor(Math.random() * decks.length)]);
    setRandomVoucher(vouchers[Math.floor(Math.random() * vouchers.length)]);
    setRandomBlind(blinds[Math.floor(Math.random() * blinds.length)]);
  }, []);
  
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-x-clip">
      <FluidBackground effect="Polychrome" />
      <div className="relative z-10 w-full flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-8 rounded-3xl bg-white/10 backdrop-blur-2xl shadow-2xl border border-white/20 p-6 sm:p-10" style={{boxShadow:'0 8px 32px 0 rgba(31,38,135,0.18)', border:'1px solid rgba(255,255,255,0.13)'}}>
          <h1 className="font-m6x11plus text-5xl sm:text-6xl md:text-7xl text-white text-center mb-2 tracking-tight drop-shadow-lg">
            Balatropedia
          </h1>
          <p className="text-white/90 font-m6x11plus text-base sm:text-lg md:text-xl text-center mb-4 max-w-2xl">
            Welcome to the <span className="text-red-400">Balatro</span> Wiki! Choose a section to explore:
          </p>
          <nav className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center items-stretch">
            {/* Each nav item uses the same structure for even sizing and spacing */}
            {/* Jokers */}
            <div className="flex flex-col items-center w-full h-full">
              <Link href="/jokersPage" className="flex flex-col items-center w-full h-full bg-red-500/80 text-white font-m6x11plus px-4 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:bg-red-400/80 focus:outline-none focus:ring-2 focus:ring-yellow-400 min-h-[12rem]">
                <div className="flex-1 flex items-center justify-center w-full" style={{ imageRendering: 'auto' }}>
                  {randomJoker && (
                    <JokerCard
                      name={""}
                      order={randomJoker.order}
                      rarity={randomJoker.rarity}
                      image={`/sprites/jokers/${randomJoker.id}.webp`}
                      effect="None"
                      priority={true}
                    />
                  )}
                </div>
                <span className="mt-2">Jokers</span>
              </Link>
            </div>
            {/* Consumables */}
            <div className="flex flex-col items-center w-full h-full">
              <Link href="/cardPage" className="flex flex-col items-center w-full h-full bg-green-500/80 text-white font-m6x11plus px-4 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:bg-green-400/80 focus:outline-none focus:ring-2 focus:ring-green-400 min-h-[12rem]">
                <div className="flex-1 flex items-center justify-center w-full" style={{ imageRendering: 'auto' }}>
                  {randomCard && (
                    <Card
                      id={randomCard.id}
                      name={""}
                      priority={true}
                      onClick={() => {}}
                    />
                  )}
                </div>
                <span className="mt-2">Consumables</span>
              </Link>
            </div>
            {/* Decks */}
            <div className="flex flex-col items-center w-full h-full">
              <Link href="/decksPage" className="flex flex-col items-center w-full h-full bg-blue-500/80 text-white font-m6x11plus px-4 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:bg-blue-400/80 focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[12rem]">
                <div className="flex-1 flex items-center justify-center w-full" style={{ imageRendering: 'auto' }}>
                  {randomDeck && (
                    <DeckCard
                      id={randomDeck.id}
                      name={""}
                      order={randomDeck.order}
                      priority={true}
                    />
                  )}
                </div>
                <span className="mt-2">Decks</span>
              </Link>
            </div>
            {/* Vouchers */}
            <div className="flex flex-col items-center w-full h-full">
              <Link href="/voucherPage" className="flex flex-col items-center w-full h-full bg-yellow-500/80 text-white font-m6x11plus px-4 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:bg-yellow-400/80 focus:outline-none focus:ring-2 focus:ring-yellow-400 min-h-[12rem]">
                <div className="flex-1 flex items-center justify-center w-full" style={{ imageRendering: 'auto' }}>
                  {randomVoucher && (
                    <Voucher id={randomVoucher.id} name={randomVoucher.name} onClick={() => {}} priority={true} />
                  )}
                </div>
                <span className="mt-2">Vouchers</span>
              </Link>
            </div>
            {/* Modifiers */}
            <div className="flex flex-col items-center w-full h-full">
              <Link href="/seals" className="flex flex-col items-center w-full h-full bg-pink-500/80 text-white font-m6x11plus px-4 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:bg-pink-400/80 focus:outline-none focus:ring-2 focus:ring-pink-400 min-h-[12rem]">
                <div className="flex-1 flex items-center justify-center w-full" style={{ imageRendering: 'auto' }}>
                  {/* Placeholder for future component */}
                </div>
                <span className="mt-2">Modifiers</span>
              </Link>
            </div>
            {/* Booster Packs */}
            <div className="flex flex-col items-center w-full h-full">
              <Link href="/boosters" className="flex flex-col items-center w-full h-full bg-orange-500/80 text-white font-m6x11plus px-4 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:bg-orange-400/80 focus:outline-none focus:ring-2 focus:ring-orange-400 min-h-[12rem]">
                <div className="flex-1 flex items-center justify-center w-full" style={{ imageRendering: 'auto' }}>
                  {/* Placeholder for future component */}
                </div>
                <span className="mt-2">Stakes</span>
              </Link>
            </div>
            {/* Tags */}
            <div className="flex flex-col items-center w-full h-full">
              <Link href="/tagsPage" className="flex flex-col items-center w-full h-full bg-teal-500/80 text-white font-m6x11plus px-4 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:bg-teal-400/80 focus:outline-none focus:ring-2 focus:ring-teal-400 min-h-[12rem]">
                <div className="flex-1 flex items-center justify-center w-full" style={{ imageRendering: 'auto' }}>
                  {randomTag && (
                    <Tag
                      id={randomTag.id}
                      name={randomTag.name}
                      order={randomTag.order}
                    />
                  )}
                </div>
                <span className="mt-2">Tags</span>
              </Link>
            </div>
            {/* Blinds */}
            <div className="flex flex-col items-center w-full h-full">
              <Link href="/blindsPage" className="flex flex-col items-center w-full h-full bg-gray-700/80 text-white font-m6x11plus px-4 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:bg-gray-600/80 focus:outline-none focus:ring-2 focus:ring-gray-400 min-h-[12rem]">
                <div className="flex-1 flex items-center justify-center w-full" style={{ imageRendering: 'auto' }}>
                  {randomBlind && (
                    <Blind id={randomBlind.id} name={randomBlind.name} order={randomBlind.order} />
                  )}
                </div>
                <span className="mt-2">Blinds</span>
              </Link>
            </div>
          </nav>
          <footer className="mt-12 text-xs text-white/40 font-m6x11plus text-center">
            &copy; 2025 Balatropedia. All rights reserved.
          </footer>
        </div>
      </div>
    </main>
  );
}
