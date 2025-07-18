import React, { useState } from "react";
import Card from "./card";
import CardModal from "./cardModal";
import cardsData from "../app/cards.json";

const typeStyles = {
  Tarot: "bg-gradient-to-br from-purple-700/60 via-purple-500/40 to-purple-900/60",
  Planet: "bg-gradient-to-br from-blue-700/60 via-blue-500/40 to-blue-900/60",
  Spectral: "bg-gradient-to-br from-indigo-700/60 via-indigo-500/40 to-indigo-900/60"
};

export default function CardPage() {
  // Read and flatten cards.json
  const tarotCards = Array.isArray(cardsData.Tarot) ? cardsData.Tarot : [];
  const planetCards = Array.isArray(cardsData.Planet) ? cardsData.Planet : [];
  const spectralCards = Array.isArray(cardsData.Spectral) ? cardsData.Spectral : [];

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // Open modal with card data
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#232a3a]/80 via-[#2e3140]/80 to-[#3a2a4a]/80 px-4 py-8 relative">
      <div className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-screen-2xl flex flex-col items-center gap-12">
        <h1 className="font-m6x11plus text-4xl sm:text-5xl md:text-6xl text-white text-center mb-2 tracking-tight drop-shadow-lg">
          Cards
        </h1>
        {/* Tarot Cards Section */}
        <section className={`w-full rounded-2xl p-6 mb-8 ${typeStyles.Tarot} shadow-xl`}>
          <h2 className="font-m6x11plus text-2xl sm:text-3xl text-white mb-4 text-center">Tarot Cards</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center">
            {tarotCards.map(card => (
              <div key={card.name} onClick={() => handleCardClick(card)} className="cursor-pointer">
                <Card id={card.id} name={card.name} />
              </div>
            ))}
          </div>
        </section>
        {/* Planet Cards Section */}
        <section className={`w-full rounded-2xl p-6 mb-8 ${typeStyles.Planet} shadow-xl`}>
          <h2 className="font-m6x11plus text-2xl sm:text-3xl text-white mb-4 text-center">Planet Cards</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center">
            {planetCards.map(card => (
              <div key={card.name} onClick={() => handleCardClick(card)} className="cursor-pointer">
                <Card id={card.id} name={card.name} />
              </div>
            ))}
          </div>
        </section>
        {/* Spectral Cards Section */}
        <section className={`w-full rounded-2xl p-6 mb-8 ${typeStyles.Spectral} shadow-xl`}>
          <h2 className="font-m6x11plus text-2xl sm:text-3xl text-white mb-4 text-center">Spectral Cards</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center">
            {spectralCards.map(card => (
              <div key={card.name} onClick={() => handleCardClick(card)} className="cursor-pointer">
                <Card id={card.id} name={card.name} />
              </div>
            ))}
          </div>
        </section>
      </div>
      {/* Go to Top Button */}
      <button
        type="button"
        aria-label="Go to top"
        className="fixed bottom-6 right-6 z-50 bg-blue-700 text-white font-m6x11plus px-4 py-3 rounded-full shadow-lg text-lg transition hover:scale-110 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑ Top
      </button>

      {/* Card Modal */}
      <CardModal open={modalOpen} card={selectedCard} onClose={handleCloseModal} />
    </main>
  );
}
