"use client";
import { useState, useEffect } from "react";
import tags from "../../app/jsondata/tags.json";
import Tag from "./tag";
import TagModal from "./tagModal";
import TagWide from "./tagWide";
import Link from "next/link";

export default function TagsPage() {
    const [wide, setWide] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);
    const sortedTags = [...tags].sort((a, b) => a.order - b.order);

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
            <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none bg-gradient-to-br from-pink-400/60 via-blue-500/40 to-emerald-400/60 animate-gradient-x backdrop-blur-2xl" style={{backgroundSize:'200% 200%'}} />
            <style jsx global>{`
              @keyframes gradient-x {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
              }
              .animate-gradient-x {
                animation: gradient-x 18s ease-in-out infinite;
              }
            `}</style>
            <section className="w-full max-w-6xl mx-auto px-3 sm:px-8 pt-10 pb-4 flex flex-col items-center relative z-10">
                <div className="flex w-full justify-center mb-4 gap-2 flex-wrap">
                    <Link
                        href="/"
                        className="font-m6x11plus bg-red-500/50 text-white px-5 py-2 rounded-xl text-base sm:text-lg transition hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-xs text-center"
                    >
                        Back to Main Page
                    </Link>
                    <button
                        className={`font-m6x11plus px-4 py-2 rounded-xl text-base transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${wide ? "bg-blue-500/80 text-white" : "bg-zinc-700/60 text-zinc-200 hover:bg-blue-400/40"}`}
                        onClick={() => setWide(w => !w)}
                        aria-pressed={wide}
                    >
                        {wide ? "Grid View" : "Wide View"}
                    </button>
                </div>
                <h1 className="font-m6x11plus text-4xl md:text-5xl text-white mb-2 text-center tracking-tight">
                    Tags
                </h1>
                <p className="text-base text-white/90 font-m6x11plus md:text-lg mb-6 text-center max-w-2xl">
                    Browse all tags from <span className="text-red-500">Balatro</span>! Switch between grid and wide view.
                </p>
            </section>
            <section className="w-full max-w-7xl mx-auto px-2 sm:px-6 py-6 flex flex-col items-center">
                {wide ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        {sortedTags.map(tag => (
                            <TagWide key={tag.id} {...tag}/>
                        ))}
                    </div>
                ) : (
                    <div className="flex w-full min-h-[55vh] items-start justify-center pt-22">
                      <div className="grid w-full justify-center gap-x-3 gap-y-6 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12">
                        {sortedTags.map((tag, i) => {
                            // Wavy pattern: alternate vertical offset by column and row
                            let base = "transition-transform duration-200 hover:z-10 cursor-pointer hover:transform hover:scale-115 hover:-translate-y-1";
                            let col = i % 3;
                            let smCol = i % 4;
                            let mdCol = i % 6;
                            let lgCol = i % 8;
                            let xlCol = i % 10;
                            let xxlCol = i % 12;
                            let wave =
                                (col === 1 ? "-translate-y-2 " : col === 2 ? "translate-y-2 " : "") +
                                (smCol === 1 ? "sm:-translate-y-3 " : smCol === 2 ? "sm:translate-y-3 " : "") +
                                (mdCol === 1 ? "md:-translate-y-4 " : mdCol === 2 ? "md:translate-y-4 " : "") +
                                (lgCol === 1 ? "lg:-translate-y-5 " : lgCol === 2 ? "lg:translate-y-5 " : "") +
                                (xlCol === 1 ? "xl:-translate-y-6 " : xlCol === 2 ? "xl:translate-y-6 " : "") +
                                (xxlCol === 1 ? "2xl:-translate-y-7 " : xxlCol === 2 ? "2xl:translate-y-7 " : "");
                            return (
                                <div
                                    key={tag.id}
                                    className={base + wave}
                                    onClick={() => { setSelectedTag(tag); setModalOpen(true); }}
                                    tabIndex={0}
                                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { setSelectedTag(tag); setModalOpen(true); } }}
                                    aria-label={`View details for ${tag.name}`}
                                >
                                    <Tag {...tag}/>
                                </div>
                            );
                        })}
                      </div>
                    </div>
                )}
            </section>
            {!modalOpen && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="fixed bottom-8 right-8 z-50 px-4 py-2 rounded-full bg-black/70 text-white font-m6x11plus shadow-lg hover:bg-black/90 transition"
                    aria-label="Go back to top"
                >
                    ↑ Top
                </button>
            )}
            <TagModal open={modalOpen} tag={selectedTag} onClose={() => setModalOpen(false)} />
        </main>
    );
}
