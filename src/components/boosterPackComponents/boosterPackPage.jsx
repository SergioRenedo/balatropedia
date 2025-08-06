import React, { useState } from "react";
import dynamic from "next/dynamic";
import boosterPacksData from "../../app/jsondata/booster_packs.json";
const BoosterPack = dynamic(() => import("./boosterPack"), { ssr: false });
const BoosterPackWide = React.lazy(() => import("./boosterPackWide"));
const BoosterPackModal = React.lazy(() => import("./boosterPackModal"));

const categoryStyles = {
  Arcana: "bg-gradient-to-br from-purple-700 to-purple-900",
  Celestial: "bg-gradient-to-br from-blue-700 to-blue-900",
  Standard: "bg-gradient-to-br from-amber-600 to-yellow-900",
  Buffoon: "bg-gradient-to-br from-rose-700 to-red-900",
  Spectral: "bg-gradient-to-br from-indigo-700 to-indigo-900"
};

const sectionOrder = ["Arcana", "Celestial", "Standard", "Buffoon", "Spectral"];

export default function BoosterPackPage() {
  // Group packs by category
  const packsByCategory = sectionOrder.reduce((acc, cat) => {
    acc[cat] = boosterPacksData.filter(p => p.category === cat);
    return acc;
  }, {});

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPack, setSelectedPack] = useState(null);
  // Layout toggle state
  const [wideMode, setWideMode] = useState(false);

  // Block background scroll when modal is open
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

  // Open modal with pack data
  const handlePackClick = (pack) => {
    setSelectedPack(pack);
    setModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPack(null);
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950 px-4 py-8 relative">
      {/* Go Back to Main Page Button */}
      <div className="flex justify-center w-full mb-4">
        <a
          href="/"
          className="font-m6x11plus bg-red-500/50 text-white px-5 py-2 rounded-xl shadow-lg text-xl sm:text-2xl transition hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-auto text-center"
          style={{ maxWidth: '20rem' }}
        >
          Back to Main Page
        </a>
      </div>
      <div className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-screen-2xl flex flex-col items-center gap-12">
        <h1 className="font-m6x11plus text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white text-center mb-2 tracking-tight">
          Booster Packs
        </h1>
        <p className="text-xl text-white/90 font-m6x11plus md:text-2xl mb-6 text-center max-w-2xl">
          Browse all <span className="text-amber-400">Booster Packs</span> from <span className="text-red-500">Balatro</span>! Click a pack for more info. Toggle wide/grid view for shop shelf or sale display.
        </p>
        {/* Section Navigation Buttons + Layout Toggle */}
        <div className="flex flex-wrap justify-center gap-4 mb-6 w-full items-center">
          {sectionOrder.map(cat => (
            <button
              key={cat}
              type="button"
              className={`font-m6x11plus px-4 py-2 rounded-xl shadow-md text-xl sm:text-2xl transition-transform duration-300 ease-in-out text-white focus:outline-none focus:ring-2 focus:ring-white hover:brightness-125 ${categoryStyles[cat]}`}
              onClick={() => document.getElementById(`${cat.toLowerCase()}-section`)?.scrollIntoView({ behavior: 'smooth' })}
            >
              {cat} Packs
            </button>
          ))}
          {/* Layout Toggle Button */}
          <button
            type="button"
            className={`font-m6x11plus px-4 py-2 rounded-xl shadow-md text-xl sm:text-2xl transition bg-amber-500/60 text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-400 ${wideMode ? 'ring-2 ring-amber-400' : ''}`}
            onClick={() => setWideMode(w => !w)}
            aria-pressed={wideMode}
            style={{ minWidth: '10rem' }}
          >
            {wideMode ? 'Switch to Grid View' : 'Switch to Wide View'}
          </button>
        </div>
        {/* Booster Pack Sections */}
        <React.Suspense fallback={<div className="text-white text-center w-full py-8">Loading packs...</div>}>
          {sectionOrder.map(cat => (
            <section
              key={cat}
              id={`${cat.toLowerCase()}-section`}
              className={`w-full rounded-2xl p-6 mb-8 ${categoryStyles[cat]} shadow-xl relative overflow-hidden`}
            >
              <div className="relative z-10">
                <h2 className="font-m6x11plus text-3xl sm:text-4xl text-white mb-4 text-center">{cat} Packs</h2>
                {wideMode ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Array.from(new Map(packsByCategory[cat].map(pack => [pack.name, pack])).values()).map((pack, idx) => (
                      <div key={pack.id} className="w-full flex justify-center">
                        <BoosterPackWide
                          id={pack.id}
                          name={pack.name}
                          image={pack.image}
                          cost={pack.cost}
                          size={pack.size}
                          effect={pack.effect}
                          priority={idx < 2}
                          onClick={() => handlePackClick(pack)}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  packsByCategory[cat].length <= 4 ? (
                    <div className="w-full flex justify-center">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6" style={{ minHeight: '10rem' }}>
                        {packsByCategory[cat].map((pack, idx) => (
                          <div key={pack.id} onClick={() => handlePackClick(pack)} className="cursor-pointer flex justify-center">
                            <BoosterPack
                              id={pack.id}
                              name=""
                              image={pack.image}
                              priority={idx < 2}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6" style={{ minHeight: '10rem' }}>
                      {packsByCategory[cat].map((pack, idx) => (
                        <div key={pack.id} onClick={() => handlePackClick(pack)} className="cursor-pointer flex justify-center">
                          <BoosterPack
                            id={pack.id}
                            name=""
                            image={pack.image}
                            priority={idx < 2}
                          />
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>
            </section>
          ))}
        </React.Suspense>
      </div>
      {/* Go to Top Button (hidden when modal is open) */}
      {!modalOpen && (
        <button
          type="button"
          aria-label="Go to top"
          className="fixed bottom-6 right-6 z-50 bg-black text-white font-m6x11plus px-4 py-3 rounded-full shadow-lg text-2xl sm:text-3xl transition hover:scale-110 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑ Top
        </button>
      )}

      {/* Booster Pack Modal */}
      <React.Suspense fallback={null}>
        <BoosterPackModal open={modalOpen} boosterPack={selectedPack} onClose={handleCloseModal} />
      </React.Suspense>
    </main>
  );
}
