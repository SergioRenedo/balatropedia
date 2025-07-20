import React, { useState } from "react";
import Card from "./card";
import CardWide from "./cardWide";
import CardModal from "./cardModal";
import cardsData from "../app/cards.json";
import SectionFluidBackground from "./sectionFluidBackground";

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
  // Layout toggle state
  const [wideMode, setWideMode] = useState(false);

  // Block background scroll when modal is open (like jokersPage)
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
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-blue-900 to-purple-900 px-4 py-8 relative">
      {/* Go Back to Main Page Button */}
      <div className="flex justify-center w-full mb-4">
        <a
          href="/"
          className="font-m6x11plus bg-red-500/50 text-white px-5 py-2 rounded-xl shadow-lg text-base sm:text-lg transition hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-auto text-center"
          style={{ maxWidth: '20rem' }}
        >
          Back to Main Page
        </a>
      </div>
      <div className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-screen-2xl flex flex-col items-center gap-12">
        <h1 className="font-m6x11plus text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white text-center mb-2 tracking-tight">
          Cards
        </h1>
        <p className="text-base text-white/90  font-m6x11plus md:text-lg mb-6 text-center max-w-2xl">
          Browse all cards from <span className="text-red-500">Balatro</span>! Search, filter by type, and discover every effect and secret interaction. Click a card for more info.
        </p>
        {/* Section Navigation Buttons + Layout Toggle */}
        <div className="flex flex-wrap justify-center gap-4 mb-6 w-full items-center">
          <button
            type="button"
            className="font-m6x11plus bg-purple-700/70 text-white px-4 py-2 rounded-xl shadow-md text-base transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-purple-400"
            onClick={() => document.getElementById('tarot-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Tarot Cards
          </button>
          <button
            type="button"
            className="font-m6x11plus bg-blue-700/70 text-white px-4 py-2 rounded-xl shadow-md text-base transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => document.getElementById('planet-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Planet Cards
          </button>
          <button
            type="button"
            className="font-m6x11plus bg-indigo-700/70 text-white px-4 py-2 rounded-xl shadow-md text-base transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onClick={() => document.getElementById('spectral-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Spectral Cards
          </button>
          {/* Layout Toggle Button */}
          <button
            type="button"
            className={`font-m6x11plus px-4 py-2 rounded-xl shadow-md text-base transition bg-red-500/50 text-white hover:bg-red-950 focus:outline-none focus:ring-2 focus:ring-blue-400 ${wideMode ? 'ring-2 ring-blue-400' : ''}`}
            onClick={() => setWideMode(w => !w)}
            aria-pressed={wideMode}
            style={{ minWidth: '10rem' }}
          >
            {wideMode ? 'Switch to Grid View' : 'Switch to Wide View'}
          </button>
        </div>
        {/* Tarot Cards Section with fluid SVG background */}
        <section id="tarot-section" className={`w-full rounded-2xl p-6 mb-8 ${typeStyles.Tarot} shadow-xl relative overflow-hidden`}>
          <SectionFluidBackground section="Tarot" />
          <div className="relative z-10">
            <h2 className="font-m6x11plus text-2xl sm:text-3xl text-white mb-4 text-center">Tarot Cards</h2>
            {wideMode ? (
              <div className="flex flex-col gap-6">
                {tarotCards.map(card => (
                  <CardWide key={card.name} id={card.id} name={card.name} description={card.description} onClick={() => handleCardClick(card)} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-6 justify-center">
                {tarotCards.map(card => (
                  <div key={card.name} onClick={() => handleCardClick(card)} className="cursor-pointer">
                    <Card id={card.id} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        {/* Planet Cards Section with fluid SVG background */}
        <section id="planet-section" className={`w-full rounded-2xl p-6 mb-8 ${typeStyles.Planet} shadow-xl relative overflow-hidden`}>
          <SectionFluidBackground section="Planet" />
          <div className="relative z-10">
            <h2 className="font-m6x11plus text-2xl sm:text-3xl text-white mb-4 text-center">Planet Cards</h2>
            {wideMode ? (
              <div className="flex flex-col gap-6">
                {planetCards.map(card => (
                  <CardWide key={card.name} id={card.id} name={card.name} description={card.description} onClick={() => handleCardClick(card)} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-6 justify-center">
                {planetCards.map(card => (
                  <div key={card.name} onClick={() => handleCardClick(card)} className="cursor-pointer">
                    <Card id={card.id} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        {/* Spectral Cards Section with fluid SVG background */}
        <section id="spectral-section" className={`w-full rounded-2xl p-6 mb-8 ${typeStyles.Spectral} shadow-xl relative overflow-hidden`}>
          <SectionFluidBackground section="Spectral" />
          <div className="relative z-10">
            <h2 className="font-m6x11plus text-2xl sm:text-3xl text-white mb-4 text-center">Spectral Cards</h2>
            {wideMode ? (
              <div className="flex flex-col gap-6">
                {spectralCards.map(card => (
                  <CardWide key={card.name} id={card.id} name={card.name} description={card.description} onClick={() => handleCardClick(card)} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-6 justify-center">
                {spectralCards.map(card => (
                  <div key={card.name} onClick={() => handleCardClick(card)} className="cursor-pointer">
                    <Card id={card.id} />
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
          className="fixed bottom-6 right-6 z-50 bg-blue-700 text-white font-m6x11plus px-4 py-3 rounded-full shadow-lg text-lg transition hover:scale-110 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑ Top
        </button>
      )}

      {/* Card Modal */}
      <CardModal open={modalOpen} card={selectedCard} onClose={handleCloseModal} />
    </main>
  );
}
