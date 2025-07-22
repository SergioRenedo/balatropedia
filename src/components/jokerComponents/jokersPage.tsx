"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import JokerCard from "./jokerCard";
import JokerModal from "./jokerModal";
import JokersWide from "./jokersWide";
import jokers from "../../app/jokers_final.json";
import FluidBackground from "../backgroundComponents/fluidBackground";


type Rarity = "All" | "Common" | "Uncommon" | "Rare" | "Legendary";
type Effect = "None" | "Negative" | "Polychrome";

type Joker = {
  id: string;
  name: string;
  cost: string | number;
  order: number;
  rarity: Exclude<Rarity, "All">; // Solo los valores de rareza, sin "All"
  description: string;
  unlock_condition: string; // Condición de desbloqueo opcional
};

const rarityOptions: { label: string; value: Rarity }[] = [
  { label: "All", value: "All" },
  { label: "Common", value: "Common" },
  { label: "Uncommon", value: "Uncommon" },
  { label: "Rare", value: "Rare" },
  { label: "Legendary", value: "Legendary" },
];

const effectOptions: { label: string; value: Effect }[] = [
  { label: "Normal", value: "None" },
  { label: "Negative", value: "Negative" },
  { label: "Polychrome", value: "Polychrome" },
];

export default function JokersPage() {
  const [search, setSearch] = useState("");
  const [rarity, setRarity] = useState<Rarity>("All");
  const [effect, setEffect] = useState<Effect>("None");
  const [sort, setSort] = useState<string>("order-asc");
  const [wide, setWide] = useState(false);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJoker, setSelectedJoker] = useState<(Joker & { image: string }) | null>(null);

  // --- FILTERING ---
  let filteredJokers = jokers
    .map(j => ({
      id: j.id,
      name: j.name,
      cost: j.cost,
      order: j.order,
      rarity: j.rarity as Joker["rarity"],
      description: j.description,
      unlock_condition: j.unlock_condition
    }))
    .filter(j =>
      (rarity === "All" || j.rarity === rarity) &&
      j.name.toLowerCase().includes(search.toLowerCase())
    );

  // Sorting
  if (sort === "order-asc") {
    filteredJokers = filteredJokers.sort((a, b) => a.order - b.order);
  } else if (sort === "order-desc") {
    filteredJokers = filteredJokers.sort((a, b) => b.order - a.order);
  } else if (sort === "alpha-asc") {
    filteredJokers = filteredJokers.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "alpha-desc") {
    filteredJokers = filteredJokers.sort((a, b) => b.name.localeCompare(a.name));
  }


  // Modal click handler (memoized)
  const handleJokerClick = useCallback((joker: Joker) => {
    setSelectedJoker({
      ...joker,
      image: `/sprites/jokers/${joker.id}.webp`
    });
    setModalOpen(true);
  }, []);

  // Disable background scroll when modal is open
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

  // --- RENDER ---
  return (
    
    <main className="flex flex-col min-h-screen items-center pb-24 relative overflow-x-clip">
      {/* BACKGROUND */}
      <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none">
        <FluidBackground effect={effect} />
      </div>
      {/* HEADER */}
      <section className="w-full max-w-4xl mx-auto px-3 sm:px-8 pt-10 pb-4 flex flex-col items-center relative z-10">
        <div className="flex w-full justify-center mb-4">
          <a
            href="/"
            className="font-m6x11plus bg-red-500/50 text-white px-5 py-2 rounded-xl shadow-lg text-base sm:text-lg transition hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-xs text-center"
          >
            Back to Main Page
          </a>
        </div>
        <h1 className="font-m6x11plus text-4xl md:text-5xl text-white drop-shadow-lg mb-2 text-center tracking-tight">
          Balatro Jokers Database
        </h1>
        <p className="text-base text-white/90 drop-shadow font-m6x11plus md:text-lg mb-6 text-center max-w-2xl">
          Browse all Jokers from <span className="text-red-500">Balatro</span>!
          Search, filter by rarity, and discover every effect and secret interaction. Click a Joker for more info.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center items-center mb-4">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search jokers..."
              className="px-4 py-2 font-m6x11plus rounded-xl bg-white/10 text-white placeholder-white/70 border border-white/30 hover:bg-white/20 transition outline-none shadow-md w-full"
            />
            <select
              value={rarity}
              onChange={e => setRarity(e.target.value as Rarity)}
              className="px-4 py-2 font-m6x11plus rounded-xl border bg-black/30 text-white border-white/30 transition outline-none shadow-md w-full"
            >
              {rarityOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="px-4 py-2 font-m6x11plus rounded-xl border bg-black/30 text-white border-white/30 transition outline-none shadow-md w-full"
            >
              <option value="order-asc">Order (Lowest First)</option>
              <option value="order-desc">Order (Highest First)</option>
              <option value="alpha-asc">Alphabetical (A-Z)</option>
              <option value="alpha-desc">Alphabetical (Z-A)</option>
            </select>
            <select
              value={effect}
              onChange={e => setEffect(e.target.value as Effect)}
              className="px-4 py-2 font-m6x11plus rounded-xl border bg-black/30 text-white border-white/30 transition outline-none shadow-md w-full"
            >
              {effectOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <button
              className={`ml-0 sm:ml-4 px-4 py-2 rounded-xl font-m6x11plus shadow-md bg-red-500/50  hover:bg-red-900 transition`}
              onClick={() => setWide(w => !w)}
              aria-pressed={wide}
              style={{ minWidth: '8.5rem', marginTop: '0.1rem' }}
            >
              {wide ? "Grid View" : "Wide View"}
            </button>
          </div>
        </div>
      </section>

      {/* GRID / WIDE */}
      <section className="w-full max-w-screen-2xl mx-auto px-2 sm:px-6 py-6 flex flex-col items-center">
        {wide ? (
          <div className="grid gap-6 w-full grid-cols-1 xl:grid-cols-2">
            {filteredJokers.map((joker, idx) => (
              <JokersWide
                key={joker.id}
                name={joker.name}
                order={joker.order}
                rarity={joker.rarity}
                image={`/sprites/jokers/${joker.id}.webp`}
                priority={idx < 30}
                effect={effect}
                description={joker.description}
                unlock_condition={joker.unlock_condition}
                cost={joker.cost}
              />
            ))}
          </div>
        ) : (
          <div className="
            grid
            w-full
            justify-center
            gap-x-2 gap-y-4
            [grid-template-columns:repeat(auto-fit,minmax(10rem,1fr))]
          ">
            {filteredJokers.map((joker, idx) => (
              <JokerCard
                key={joker.id}
                name={joker.name}
                order={joker.order}
                rarity={joker.rarity}
                image={`/sprites/jokers/${joker.id}.webp`}
                onClick={() => handleJokerClick(joker)}
                priority={idx < 30}
                effect={effect}
              />
            ))}
          </div>
        )}
        {/* Sin resultados */}
        {filteredJokers.length === 0 && (
          <div className="my-12 text-zinc-300 font-m6x11plus text-xl">No jokers found :(</div>
        )}

        {/* Go Back to Top Button */}
        {!modalOpen && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-50 px-4 py-2 rounded-full bg-black/70 text-white font-m6x11plus shadow-lg hover:bg-black/90 transition"
            aria-label="Go back to top"
          >
            ↑ Top
          </button>
        )}

        {/* Modal */}
        {!wide && (
          <JokerModal
            open={modalOpen}
            joker={selectedJoker}
            onClose={() => setModalOpen(false)}
          />
        )}
      </section>
    </main>
  );
}
