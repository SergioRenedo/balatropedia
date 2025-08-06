"use client";

import { useState, useEffect } from "react";
import DeckCard from "./deckCard";
import DeckWide from "./deckWide";
import DeckModal from "./deckModal";
import decks from "../../app/jsondata/decks.json";
import FluidBackground from "../backgroundComponents/fluidBackground";

type Deck = typeof decks[number];

export default function DecksPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const [wide, setWide] = useState(false);
  // Block background scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [modalOpen]);
  // Sort decks by order
  const sortedDecks = [...decks].sort((a, b) => a.order - b.order);

  // --- RENDER ---
  return (
    <main className="flex flex-col min-h-screen items-center pb-24 relative overflow-x-clip">
      {/* BACKGROUND */}
      <FluidBackground effect="Polychrome" />
      {/* HEADER */}
      <section className="w-full max-w-5xl mx-auto px-3 sm:px-8 pt-10 pb-4 flex flex-col items-center relative z-10">
        <div className="flex w-full justify-center mb-4">
          <a
            href="/"
            className="font-m6x11plus bg-red-500/50 text-white px-5 py-2 rounded-xl shadow-lg text-base sm:text-lg transition hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-xs text-center"
          >
            Back to Main Page
          </a>
        </div>
        <h1 className="font-m6x11plus text-4xl md:text-5xl text-white mb-2 text-center tracking-tight">
          Decks
        </h1>
        <p className="text-base text-white/90 font-m6x11plus md:text-lg mb-6 text-center max-w-2xl">
          <span className="text-2xl sm:text-xl md:text-2xl">Browse all playable decks in <span className="text-red-400">Balatro</span>! Click a deck for details and unlock requirements.</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center items-center mb-4">
          <button
            className={`ml-0 sm:ml-4 px-4 py-2 rounded-xl font-m6x11plus shadow-md bg-red-500/50 hover:bg-red-900 transition text-lg sm:text-xl md:text-2xl`}
            onClick={() => setWide((w) => !w)}
            aria-pressed={wide}
            style={{ minWidth: "8.5rem", marginTop: "0.1rem" }}
          >
            {wide ? "Grid View" : "Wide View"}
          </button>
        </div>
        {wide ? (
          <div className="flex flex-col gap-6 w-full mt-4">
            {sortedDecks.map((deck) => (
              <DeckWide
                key={deck.id}
                id={deck.id}
                name={deck.name}
                order={deck.order}
                description={deck.description}
                unlock_condition={deck.unlock_condition}
                priority={false}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full mt-4">
            {sortedDecks.map((deck) => (
              <DeckCard
                key={deck.id}
                id={deck.id}
                name={deck.name}
                order={deck.order}
                onClick={() => {
                  setSelectedDeck(deck);
                  setModalOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </section>
      {/* Go Back to Top Button */}
      {!modalOpen && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 px-4 py-2 rounded-full bg-black/70 text-white font-m6x11plus shadow-lg hover:bg-black/90 transition text-2xl sm:text-3xl"
          aria-label="Go back to top"
        >
          ↑ Top
        </button>
      )}
      <DeckModal
        open={modalOpen}
        deck={selectedDeck}
        onClose={() => setModalOpen(false)}
      />
    </main>
  );
}

