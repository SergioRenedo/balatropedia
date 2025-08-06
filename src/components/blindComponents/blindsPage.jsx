"use client";
import { useState, useEffect } from "react";
import blinds from "../../app//jsondata/blinds.json";
import Blind from "./blind";
import dynamic from "next/dynamic";
const BlindModal = dynamic(() => import("./blindModal"));
const BlindWide = dynamic(() => import("./blindWide"));
import Link from "next/link";

export default function BlindsPage() {
    const [wide, setWide] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBlind, setSelectedBlind] = useState(null);
    const sortedBlinds = [...blinds].sort((a, b) => a.order - b.order);

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

    return (
        <main className="flex flex-col min-h-screen items-center pb-24 relative overflow-x-clip">
            <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 backdrop-blur-2xl" />
            <section className="w-full max-w-6xl mx-auto px-3 sm:px-8 pt-10 pb-4 flex flex-col items-center relative z-10">
                <div className="flex w-full justify-center mb-4 gap-2 flex-wrap">
                    <Link
                        href="/"
                        className="font-m6x11plus bg-red-500/50 text-white px-5 py-2 rounded-xl text-2xl sm:text-2xl md:text-3xl transition hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-xs text-center"
                    >
                        Back to Main Page
                    </Link>
                    <button
                        className={`font-m6x11plus px-4 py-2 rounded-xl text-2xl sm:text-2xl md:text-3xl transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${wide ? "bg-blue-500/80 text-white" : "bg-zinc-700/60 text-zinc-200 hover:bg-blue-400/40"}`}
                        onClick={() => setWide(w => !w)}
                        aria-pressed={wide}
                    >
                        {wide ? "Grid View" : "Wide View"}
                    </button>
                </div>
                <h1 className="font-m6x11plus text-6xl md:text-7xl text-white mb-2 text-center tracking-tight">
                    Blinds
                </h1>
                <p className="text-2xl text-white/90 font-m6x11plus md:text-2xl mb-2 text-center max-w-2xl">
                    Browse all blinds from <span className="text-red-500">Balatro</span>! Switch between grid and wide view.
                </p>
                {!wide && (
                  <button
                    onClick={() => {
                      const table = document.getElementById('ante-table-section');
                      if (table) table.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="mb-4 self-center px-5 py-2 rounded-xl font-m6x11plus bg-zinc-900/80 text-white text-2xl shadow hover:bg-zinc-800/90 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Jump to Ante Table
                  </button>
                )}
            </section>
            <section className="w-full max-w-7xl mx-auto px-2 sm:px-6 py-6 flex flex-col items-center">
                {wide ? (
                    <>
                      <div className="w-full rounded-2xl p-3 sm:p-6 mb-8" style={{background: 'linear-gradient(135deg, #f7b733 0%, #fc4a1a 100%)'}}>
                        <div className="flex flex-col gap-6 w-full md:hidden">
                            {sortedBlinds.map(blind => (
                                <BlindWide key={blind.id} {...blind}/>
                            ))}
                        </div>
                        <div className="hidden md:grid w-full gap-6 grid-cols-2">
                            {sortedBlinds.map(blind => (
                                <BlindWide key={blind.id} {...blind}/>
                            ))}
                        </div>
                      </div>
                    </>
                ) : (
                    <div className="w-full flex flex-col gap-8">
                      <div className="w-full rounded-2xl p-3 sm:p-6" style={{background: 'linear-gradient(135deg, #f7b733 0%, #fc4a1a 100%)'}}>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                          {sortedBlinds.map((blind) => (
                            <div
                              key={blind.id}
                              className="bg-white/10 border border-white/20 rounded-xl flex flex-col items-center justify-center p-3 shadow-lg cursor-pointer hover:bg-white/20 transition min-h-[7.5rem] min-w-0"
                              onClick={() => { setSelectedBlind(blind); setModalOpen(true); }}
                              tabIndex={0}
                              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { setSelectedBlind(blind); setModalOpen(true); } }}
                              aria-label={`View details for ${blind.name}`}
                            >
                              <Blind {...blind}/>
                              <div className="mt-2 font-m6x11plus text-2xl text-white text-center w-full break-words">
                                {blind.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Ante Level Table */}
                      <div id="ante-table-section" className="w-full rounded-2xl p-3 sm:p-6 bg-zinc-900/90">
                        <div className="w-full rounded-2xl p-3 sm:p-6 bg-zinc-900/90 border border-zinc-700 shadow-xl overflow-x-auto">
                        <div className="relative">
                          <h2
                            className="font-m6x11plus text-3xl md:text-4xl text-white mb-4 text-center tracking-tight sticky left-0 right-0 top-0 z-20 bg-transparent pointer-events-none"
                            style={{ minWidth: '20rem' }}
                          >
                            Ante Level Base Chip Requirements
                          </h2>
                        </div>
                        <table className="min-w-full text-2xl sm:text-2xl md:text-3xl text-white font-m6x11plus border-separate border-spacing-y-1">
                          <thead>
                            <tr className="bg-zinc-800/80">
                              <th className="px-2 py-2 rounded-l-xl text-red-400 font-normal">Ante Level</th>
                              <th className="px-2 py-2 text-blue-400  font-normal">Base Chip Requirement</th>
                              <th className="px-2 py-2 text-green-400  font-normal">Base Chips at Green Stake+</th>
                              <th className="px-2 py-2 rounded-r-xl text-purple-400  font-normal">Base Chips at Purple Stake+</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ["0 or -1", "100", "100", "100"],
                              ["1", "300", "300", "300"],
                              ["2", "800", "900", "1,000"],
                              ["3", "2,000", "2,600", "3,200"],
                              ["4", "5,000", "8,000", "9,000"],
                              ["5", "11,000", "20,000", "25,000"],
                              ["6", "20,000", "36,000", "60,000"],
                              ["7", "35,000", "60,000", "110,000"],
                              ["8", "50,000", "100,000", "200,000"],
                              ["9", "110,000", "230,000", "460,000"],
                              ["10", "560,000", "1,100,000", "2,200,000"],
                              ["11", "7,200,000", "14,000,000", "29,000,000"],
                              ["12", "300,000,000", "600,000,000", "1,200,000,000"],
                              ["13", "47,000,000,000", "94,000,000,000", "1.8e11"],
                              ["14", "2.9e13", "5.8e13", "1.1e14"],
                              ["15", "7.7e16", "1.5e17", "3.0e17"],
                              ["16", "8.6e20", "1.7e21", "3.4e21"],
                              ["17", "4.2e25", "8.4e25", "1.6e26"],
                              ["18", "9.2e30", "1.8e31", "3.7e31"],
                              ["19", "9.2e36", "1.8e37", "3.7e37"],
                              ["20", "4.3e43", "8.6e43", "1.7e44"],
                              ["21", "9.7e50", "1.9e51", "3.8e51"],
                              ["22", "1.0e59", "2.1e59", "4.2e59"],
                              ["23", "5.8e67", "1.1e68", "2.3e68"],
                              ["24", "1.6e77", "3.3e77", "6.6e77"],
                              ["25", "2.4e87", "4.9e87", "9.8e87"],
                              ["26", "1.9e98", "3.9e98", "7.8e98"],
                              ["27", "8.4e109", "1.6e110", "3.3e110"],
                              ["28", "2.0e122", "4.0e122", "8.1e122"],
                              ["29", "2.7e135", "5.5e135", "1.1e136"],
                              ["30", "2.1e149", "4.3e149", "8.6e149"],
                              ["31", "9.9e163", "1.9e164", "3.9e164"],
                              ["32", "2.7e179", "5.4e179", "1.0e180"],
                              ["33", "4.4e195", "8.9e195", "1.7e196"],
                              ["34", "4.4e212", "8.9e212", "1.7e213"],
                              ["35", "2.8e230", "5.6e230", "1.1e231"],
                              ["36", "1.1e249", "2.2e249", "4.4e249"],
                              ["37", "2.7e268", "5.5e268", "1.1e269"],
                              ["38", "4.5e288", "9.0e288", "1.8e289"],
                              ["39", "4.8e309", "9.6e309", "1.9e310"],
                            ].map(([level, base, green, purple], i) => (
                              <tr key={i} className={i % 2 === 0 ? "bg-zinc-800/60" : "bg-zinc-700/60"}>
                                <td className="px-2 py-1 text-center whitespace-nowrap">{level}</td>
                                <td className="px-2 py-1 text-center whitespace-nowrap">{base}</td>
                                <td className="px-2 py-1 text-center whitespace-nowrap">{green}</td>
                                <td className="px-2 py-1 text-center whitespace-nowrap">{purple}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        </div>
                      </div>
                    </div>
                )}

                {/* Go Back to Top Button (floating, only if modal not open) */}
                {!modalOpen && (
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="fixed bottom-8 right-8 z-50 px-4 py-2 rounded-full bg-black/70 text-white font-m6x11plus shadow-lg hover:bg-black/90 transition text-3xl sm:text-4xl"
                    aria-label="Go back to top"
                  >
                    ↑ Top
                  </button>
                )}
            </section>
            <BlindModal open={modalOpen} blind={selectedBlind} onClose={() => setModalOpen(false)} />
        </main>
    );
}
