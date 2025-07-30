"use client";
import React, { useState, useEffect } from "react";
import vouchers from "../../app/vouchers.json";
import Voucher from "./voucher";
import VoucherWide from "./voucherWide";
import VoucherModal from "./voucherModal";
import Link from "next/link";

export default function VoucherPage() {
  const [wide, setWide] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const sortedVouchers = [...vouchers];

  // Group vouchers in pairs
  const voucherPairs = [];
  for (let i = 0; i < sortedVouchers.length; i += 2) {
    voucherPairs.push(sortedVouchers.slice(i, i + 2));
  }

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
      <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none bg-gradient-to-br from-yellow-400/60 via-orange-500/40 to-amber-400/60 animate-gradient-x backdrop-blur-2xl" style={{backgroundSize:'200% 200%'}} />
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
            className="font-m6x11plus bg-red-500/50 text-white px-5 py-2 rounded-xl shadow-lg text-base sm:text-lg transition hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-xs text-center"
          >
            Back to Main Page
          </Link>
          <button
            className={`font-m6x11plus px-4 py-2 rounded-xl shadow text-base transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${wide ? "bg-blue-500/80 text-white" : "bg-zinc-700/60 text-zinc-200 hover:bg-blue-400/40"}`}
            onClick={() => setWide(w => !w)}
            aria-pressed={wide}
          >
            {wide ? "Grid View" : "Wide View"}
          </button>
        </div>
        <h1 className="font-m6x11plus text-4xl md:text-5xl text-white drop-shadow-lg mb-2 text-center tracking-tight">
          Vouchers
        </h1>
        <p className="text-base text-white/90 drop-shadow font-m6x11plus md:text-lg mb-6 text-center max-w-2xl">
          Browse all Vouchers! Switch between grid and wide view.
        </p>
      </section>
      <section className="w-full max-w-7xl mx-auto px-2 sm:px-6 py-6 flex flex-col items-center">
        {wide ? (
          <div className="flex flex-col gap-6 w-full">
            {voucherPairs.map((pair, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-6 w-full">
                {pair.map(voucher => (
                  <div key={voucher.id} className="flex-1 min-w-0">
                    <VoucherWide {...voucher} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid w-full justify-center gap-x-3 gap-y-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
            {voucherPairs.map((pair, idx) => (
              <React.Fragment key={idx}>
                {pair.map(voucher => (
                  <div
                    key={voucher.id}
                    className="transition-transform duration-200 cursor-pointer"
                    onClick={() => { setSelectedVoucher(voucher); setModalOpen(true); }}
                    tabIndex={0}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { setSelectedVoucher(voucher); setModalOpen(true); } }}
                    aria-label={`View details for ${voucher.name}`}
                  >
                    <Voucher {...voucher} />
                  </div>
                ))}
              </React.Fragment>
            ))}
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
      {!wide && <VoucherModal open={modalOpen} voucher={selectedVoucher} onClose={() => setModalOpen(false)} />}
    </main>
  );
}
