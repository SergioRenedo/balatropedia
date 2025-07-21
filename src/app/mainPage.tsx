"use client";



import Link from "next/link";
import React, { useState, useEffect } from "react";
import FluidBackground from "../components/fluidBackground";
import JokerCard from "../components/jokerCard";
import Card from "../components/card";
import Tag from "../components/tag";

import jokers from "./jokers_final.json";
import cardsData from "./cards.json";
import tags from "./tags.json";

export default function MainPage() {
  // Types
  type Joker = typeof jokers[number];
  type Card = typeof cardsData.Tarot[number] | typeof cardsData.Planet[number] | typeof cardsData.Spectral[number];
  type TagType = typeof tags[number];

  // Random Joker, Card, Tag (client-only)
  const [randomJoker, setRandomJoker] = useState<Joker | null>(null);
  const [randomCard, setRandomCard] = useState<Card | null>(null);
  const [randomTag, setRandomTag] = useState<TagType | null>(null);

  useEffect(() => {
    setRandomJoker(jokers[Math.floor(Math.random() * jokers.length)]);
    const allCards = [
      ...(cardsData.Tarot || []),
      ...(cardsData.Planet || []),
      ...(cardsData.Spectral || [])
    ];
    setRandomCard(allCards[Math.floor(Math.random() * allCards.length)]);
    setRandomTag(tags[Math.floor(Math.random() * tags.length)]);
  }, []);

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-x-clip">
      <FluidBackground effect="Polychrome" />
      <div className="relative z-10 w-full flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-8 rounded-3xl bg-white/10 backdrop-blur-2xl shadow-2xl border border-white/20 p-6 sm:p-10" style={{boxShadow:'0 8px 32px 0 rgba(31,38,135,0.18)', border:'1px solid rgba(255,255,255,0.13)'}}>
          <h1 className="font-m6x11plus text-5xl sm:text-6xl md:text-7xl text-white text-center mb-2 tracking-tight drop-shadow-lg">
            Balatropedia
          </h1>
          <p className="text-white/90 font-m6x11plus text-base sm:text-lg md:text-xl text-center mb-4 max-w-2xl">
            Welcome to the <span className="text-red-400">Balatro</span> Wiki! Choose a section to explore:
          </p>
          <nav className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center">
            {/* Jokers link + card */}
            <div className="flex flex-col items-center gap-2">
              <Link href="/jokersPage" className="font-m6x11plus bg-red-500/80 text-white px-6 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:bg-red-400/80 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full text-center">
                Jokers
              </Link>
              {randomJoker && (
                <JokerCard
                  name={randomJoker.name}
                  order={randomJoker.order}
                  rarity={randomJoker.rarity}
                  image={`/sprites/jokers/${randomJoker.id}.webp`}
                  effect="None"
                  priority={true}
                />
              )}
            </div>
            {/* Consumables link + card */}
            <div className="flex flex-col items-center gap-2">
              <Link href="/cardPage" className="font-m6x11plus bg-green-500/80 text-white px-6 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:bg-green-400/80 focus:outline-none focus:ring-2 focus:ring-green-400 w-full text-center">
                Consumables
              </Link>
              {randomCard && (
                <Card
                  id={randomCard.id}
                  name={randomCard.name}
                  priority={true}
                  onClick={() => {}}
                />
              )}
            </div>
            {/* Decks link */}
            <Link href="/decksPage" className="font-m6x11plus bg-blue-500/80 text-white px-6 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:bg-blue-400/80 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full text-center">
              Decks
            </Link>
            {/* Vouchers link */}
            <Link href="/vouchers" className="font-m6x11plus bg-yellow-500/80 text-white px-6 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:bg-yellow-400/80 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full text-center">
              Vouchers
            </Link>
            {/* Modifiers link */}
            <Link href="/seals" className="font-m6x11plus bg-pink-500/80 text-white px-6 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:bg-pink-400/80 focus:outline-none focus:ring-2 focus:ring-pink-400 w-full text-center">
              Modifiers
            </Link>
            {/* Booster Packs link */}
            <Link href="/boosters" className="font-m6x11plus bg-orange-500/80 text-white px-6 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:bg-orange-400/80 focus:outline-none focus:ring-2 focus:ring-orange-400 w-full text-center">
              Booster Packs
            </Link>
            {/* Tags link + card */}
            <div className="flex flex-col items-center gap-2">
              <Link href="/tagsPage" className="font-m6x11plus bg-teal-500/80 text-white px-6 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:bg-teal-400/80 focus:outline-none focus:ring-2 focus:ring-teal-400 w-full text-center">
                Tags
              </Link>
              {randomTag && (
                <Tag
                  id={randomTag.id}
                  name={randomTag.name}
                  order={randomTag.order}
                />
              )}
            </div>
            {/* Blinds link */}
            <Link href="/blinds" className="font-m6x11plus bg-gray-700/80 text-white px-6 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:bg-gray-600/80 focus:outline-none focus:ring-2 focus:ring-gray-400 w-full text-center">
              Blinds
            </Link>
          </nav>
          <footer className="mt-12 text-xs text-white/40 font-m6x11plus text-center">
            &copy; 2025 Balatropedia. All rights reserved.
          </footer>
        </div>
      </div>
    </main>
  );
}
