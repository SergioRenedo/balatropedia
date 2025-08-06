"use client";

import Link from "next/link";
import React, { useMemo } from "react";
import JokerCard from "../components/jokerComponents/jokerCard";
import Card from "../components/cardComponents/card";
import Tag from "../components/tagComponents/tag";
import jokers from "./jsondata/jokers_final.json";
import cardsData from "./jsondata//cards.json";
import tags from "./jsondata//tags.json";
import decks from "./jsondata//decks.json";
import vouchers from "./jsondata//vouchers.json";
import Voucher from "../components/voucherComponents/voucher";
import DeckCard from "../components/deckComponents/deckCard";
import blinds from "./jsondata//blinds.json";
import Blind from "../components/blindComponents/blind";
import stakes from "./jsondata/stakes.json";
import Stake from "../components/stakesComponents/stake";
import boosterPacks from "./jsondata/booster_packs.json";
import BoosterPack from "../components/boosterPackComponents/boosterPack";
import achievements from "./jsondata/achievements.json";
import Achievement from "../components/achievementComponents/achievement";

export default function MainPage() {
  // Types
  type Joker = typeof jokers[number];
  type Card = typeof cardsData.Tarot[number] | typeof cardsData.Planet[number] | typeof cardsData.Spectral[number];
  type TagType = typeof tags[number];

  // Random Joker, Card, Tag, Deck, Voucher, Blind, Stake (client-only)
  const [randomJoker, setRandomJoker] = React.useState<Joker | null>(null);
  const [randomCard, setRandomCard] = React.useState<Card | null>(null);
  const [randomTag, setRandomTag] = React.useState<TagType | null>(null);
  const [randomDeck, setRandomDeck] = React.useState<any | null>(null);
  const [randomVoucher, setRandomVoucher] = React.useState<any | null>(null);
  const [randomBlind, setRandomBlind] = React.useState<any | null>(null);
  const [randomStake, setRandomStake] = React.useState<any | null>(null);
  const [randomBooster, setRandomBooster] = React.useState<any | null>(null);
  const [randomAchievement, setRandomAchievement] = React.useState<any | null>(null);

  React.useEffect(() => {
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
    setRandomStake(stakes[Math.floor(Math.random() * stakes.length)]);
    setRandomBooster(boosterPacks[Math.floor(Math.random() * boosterPacks.length)]);
    setRandomAchievement(achievements[Math.floor(Math.random() * achievements.length)]);
  }, []);

  // Prevent hydration mismatch: render nothing until all randoms are set
  if (!randomJoker || !randomCard || !randomTag || !randomDeck || !randomVoucher || !randomBlind || !randomStake || !randomBooster || !randomAchievement) {
    return null;
  }
  
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-x-clip">
      {/* Animated casino entrance background with moving spotlights and neon lights */}
      <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none bg-gradient-to-br from-yellow-200/10 via-fuchsia-900/60 to-blue-900/80 animate-gradient-x">
        {/* Moving spotlights */}
        <div className="absolute left-1/4 top-0 w-1/3 h-1/2 bg-gradient-to-b from-yellow-200/40 via-transparent to-transparent blur-2xl opacity-60 animate-spotlight1" />
        <div className="absolute right-1/4 top-0 w-1/3 h-1/2 bg-gradient-to-b from-pink-400/30 via-transparent to-transparent blur-2xl opacity-40 animate-spotlight2" />
        <div className="absolute left-1/2 top-0 w-1/2 h-1/3 bg-gradient-to-b from-blue-300/30 via-transparent to-transparent blur-2xl opacity-30 animate-spotlight3" />
      </div>
      <div className="relative z-10 w-full flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-8 rounded-3xl bg-black/80 backdrop-blur-md shadow-lg border-4 border-yellow-300/60 p-6 sm:p-10" style={{boxShadow:'0 4px 16px 0 #000a, 0 0 0 4px #f7b73333 inset'}}>
          {/* Neon marquee header */}
          <div className="flex flex-col items-center mb-2">
            <span className="text-6xl md:text-7xl mb-2 drop-shadow-lg">🎰</span>
            <h1 className="font-m6x11plus text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[8rem] 2xl:text-[10rem] text-yellow-200 text-center mb-2 tracking-tight drop-shadow-lg min-h-[8rem]" style={{textShadow:'0 2px 16px #f7b733,0 0 0 #fff'}}>
              Balatropedia
            </h1>
            <p className="text-yellow-100 font-m6x11plus text-base sm:text-lg md:text-xl text-center mb-4 max-w-2xl drop-shadow">
              Welcome to the <span className="text-pink-400 font-bold">Balatro</span> Visual Encyclopedia! Dive into a fully interactive, visually engaging compendium covering almost every aspect of the game. Explore cards, jokers, tags, decks, achievements, and more—all presented with rich visuals and intuitive navigation."
            </p>
          </div>
          <nav className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center items-stretch">
            {/* Each nav item uses the same structure for even sizing and spacing */}
            {/* Jokers */}
            <div className="flex flex-col items-center w-full h-full">
              <Link href="/jokersPage" className="flex flex-col items-center w-full h-full bg-red-500/80 text-white font-m6x11plus px-4 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:bg-red-400/80 focus:outline-none focus:ring-2 focus:ring-yellow-400 min-h-[12rem] min-w-[8rem] border-4 border-yellow-200/60">
                <div className="flex-1 flex items-center justify-center w-full" style={{ imageRendering: 'auto', minHeight: '6rem', minWidth: '6rem' }}>
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
              <Link href="/cardPage" className="flex flex-col items-center w-full h-full bg-green-500/80 text-white font-m6x11plus px-4 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:bg-green-400/80 focus:outline-none focus:ring-2 focus:ring-green-400 min-h-[12rem] min-w-[8rem] border-4 border-yellow-200/60">
                <div className="flex-1 flex items-center justify-center w-full" style={{ imageRendering: 'auto', minHeight: '6rem', minWidth: '6rem' }}>
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
              <Link href="/decksPage" className="flex flex-col items-center w-full h-full bg-blue-500/80 text-white font-m6x11plus px-4 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:bg-blue-400/80 focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[12rem] min-w-[8rem] border-4 border-yellow-200/60">
                <div className="flex-1 flex items-center justify-center w-full" style={{ imageRendering: 'auto', minHeight: '6rem', minWidth: '6rem' }}>
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
              <Link href="/voucherPage" className="flex flex-col items-center w-full h-full bg-yellow-500/80 text-white font-m6x11plus px-4 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:bg-yellow-400/80 focus:outline-none focus:ring-2 focus:ring-yellow-400 min-h-[12rem] min-w-[8rem] border-4 border-yellow-200/60">
                <div className="flex-1 flex items-center justify-center w-full" style={{ imageRendering: 'auto', minHeight: '6rem', minWidth: '6rem' }}>
                  {randomVoucher && (
                    <Voucher id={randomVoucher.id} name={randomVoucher.name} onClick={() => {}} priority={true} />
                  )}
                </div>
                <span className="mt-2">Vouchers</span>
              </Link>
            </div>
            {/* Booster Packs */}
            <div className="flex flex-col items-center w-full h-full">
              <Link href="/BoosterPacks" className="flex flex-col items-center w-full h-full bg-pink-500/80 text-white font-m6x11plus px-4 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:bg-pink-400/80 focus:outline-none focus:ring-2 focus:ring-pink-400 min-h-[12rem] min-w-[8rem] border-4 border-yellow-200/60">
                <div className="flex-1 flex items-center justify-center w-full" style={{ imageRendering: 'auto', minHeight: '6rem', minWidth: '6rem' }}>
                  {randomBooster && (
                    <BoosterPack
                      id={randomBooster.id}
                      name={""}
                      image={randomBooster.image}
                      onClick={() => {}}
                      priority={true}
                    />
                  )}
                </div>
                <span className="mt-2">Booster Packs</span>
              </Link>
            </div>
            {/* Stakes */}
            <div className="flex flex-col items-center w-full h-full">
              <Link href="/stakesPage" className="flex flex-col items-center w-full h-full bg-orange-500/80 text-white font-m6x11plus px-4 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:bg-orange-400/80 focus:outline-none focus:ring-2 focus:ring-orange-400 min-h-[12rem] min-w-[8rem] border-4 border-yellow-200/60">
                <div className="flex-1 flex items-center justify-center w-full" style={{ imageRendering: 'auto', minHeight: '6rem', minWidth: '6rem' }}>
                  {randomStake && (
                    <Stake id={randomStake.id} name={randomStake.name} order={randomStake.order} />
                  )}
                </div>
                <span className="mt-2">Stakes</span>
              </Link>
            </div>
            {/* Tags */}
            <div className="flex flex-col items-center w-full h-full">
              <Link href="/tagsPage" className="flex flex-col items-center w-full h-full bg-teal-500/80 text-white font-m6x11plus px-4 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:bg-teal-400/80 focus:outline-none focus:ring-2 focus:ring-teal-400 min-h-[12rem] min-w-[8rem] border-4 border-yellow-200/60">
                <div className="flex-1 flex items-center justify-center w-full" style={{ imageRendering: 'auto', minHeight: '6rem', minWidth: '6rem' }}>
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
              <Link href="/blindsPage" className="flex flex-col items-center w-full h-full bg-gray-700/80 text-white font-m6x11plus px-4 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:bg-gray-600/80 focus:outline-none focus:ring-2 focus:ring-gray-400 min-h-[12rem] min-w-[8rem] border-4 border-yellow-200/60">
                <div className="flex-1 flex items-center justify-center w-full" style={{ imageRendering: 'auto', minHeight: '6rem', minWidth: '6rem' }}>
                  {randomBlind && (
                    <Blind id={randomBlind.id} name={randomBlind.name} order={0} />
                  )}
                </div>
                <span className="mt-2">Blinds</span>
              </Link>
            </div>
            {/* Achievements */}
            <div className="flex flex-col items-center w-full h-full">
              <Link href="/achievementsPage" className="flex flex-col items-center w-full h-full bg-lime-600/80 text-white font-m6x11plus px-4 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:bg-lime-500/80 focus:outline-none focus:ring-2 focus:ring-lime-400 min-h-[12rem] min-w-[8rem] border-4 border-yellow-200/60">
              <div className="flex-1 flex items-center justify-center w-full" style={{ imageRendering: 'auto', minHeight: '6rem', minWidth: '6rem' }}>
                {randomAchievement && (
                <Achievement id={randomAchievement.id} name={randomAchievement.name} />
                )}
              </div>
              <span className="mt-2">Achievements</span>
              </Link>
            </div>
            {/* Hands */}
            <div className="flex flex-col items-center w-full h-full">
              <Link href="/handsPage" className="flex flex-col items-center w-full h-full bg-fuchsia-700/80 text-white font-m6x11plus px-4 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:bg-fuchsia-500/80 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 min-h-[12rem] min-w-[8rem]">
                <div className="flex-1 flex items-center justify-center w-full" style={{ minHeight: '6rem', minWidth: '6rem' }}>
                  <span className="text-4xl">🃏</span>
                </div>
                <span className="mt-2">Hands</span>
              </Link>
            </div>
            {/* Shop */}
            <div className="flex flex-col items-center w-full h-full">
              <Link href="/shopPage" className="flex flex-col items-center w-full h-full bg-amber-700/80 text-white font-m6x11plus px-4 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:bg-amber-500/80 focus:outline-none focus:ring-2 focus:ring-amber-400 min-h-[12rem] min-w-[8rem]">
                <div className="flex-1 flex items-center justify-center w-full" style={{ minHeight: '6rem', minWidth: '6rem' }}>
                  <span className="text-4xl">🛒</span>
                </div>
                <span className="mt-2">Shop</span>
              </Link>
            </div>
            {/* Modifiers */}
            <div className="flex flex-col items-center w-full h-full">
              <Link href="/modifiersPage" className="flex flex-col items-center w-full h-full bg-cyan-700/80 text-white font-m6x11plus px-4 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:bg-cyan-500/80 focus:outline-none focus:ring-2 focus:ring-cyan-400 min-h-[12rem] min-w-[8rem]">
                <div className="flex-1 flex items-center justify-center w-full" style={{ minHeight: '6rem', minWidth: '6rem' }}>
                  <span className="text-4xl">✨</span>
                </div>
                <span className="mt-2">Modifiers</span>
              </Link>
            </div>
            {/* Card Playground */}
            <div className="flex flex-col items-center w-full h-full">
              <Link href="/cardPlayground" className="flex flex-col items-center w-full h-full bg-violet-800/80 text-white font-m6x11plus px-4 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:bg-violet-600/80 focus:outline-none focus:ring-2 focus:ring-violet-400 min-h-[12rem] min-w-[8rem]">
                <div className="flex-1 flex items-center justify-center w-full" style={{ minHeight: '6rem', minWidth: '6rem' }}>
                  <span className="text-4xl">🧪</span>
                </div>
                <span className="mt-2">Card Playground</span>
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
