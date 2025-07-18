"use client";

import Link from "next/link";
import React from "react";

export default function MainPage() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#232a3a]/80 via-[#2e3140]/80 to-[#3a2a4a]/80 backdrop-blur-xl px-4 py-8">
      <div className="max-w-2xl w-full flex flex-col items-center gap-8">
        <h1 className="font-m6x11plus text-5xl sm:text-6xl md:text-7xl text-white text-center mb-2 tracking-tight">
          Balatropedia
        </h1>
        <p className="text-white/80 font-m6x11plus text-base sm:text-lg md:text-xl text-center mb-4">
          Welcome to the Balatro Jokers Wiki! Choose a section to explore:
        </p>
        <nav className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center">
          <Link href="/jokers" className="font-m6x11plus bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-yellow-400">
            Jokers
          </Link>
          <Link href="/cardPage" className="font-m6x11plus bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-green-400">
            Cards
          </Link>
          <Link href="/decks" className="font-m6x11plus bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-green-400">
            Decks
          </Link>
          <Link href="/vouchers" className="font-m6x11plus bg-yellow-500 text-white px-6 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-yellow-400">
            Vouchers
          </Link>
          <Link href="/seals" className="font-m6x11plus bg-pink-500 text-white px-6 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-pink-400">
            Seals
          </Link>
          <Link href="/boosters" className="font-m6x11plus bg-orange-500 text-white px-6 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-orange-400">
            Booster Packs
          </Link>
          <Link href="/tags" className="font-m6x11plus bg-teal-500 text-white px-6 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-teal-400">
            Tags
          </Link>
          <Link href="/blinds" className="font-m6x11plus bg-gray-700 text-white px-6 py-3 rounded-xl shadow-lg text-lg sm:text-xl transition hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-gray-400">
            Blinds
          </Link>
        </nav>
        <footer className="mt-12 text-xs text-white/40 font-m6x11plus text-center">
          &copy; 2025 Balatropedia. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
