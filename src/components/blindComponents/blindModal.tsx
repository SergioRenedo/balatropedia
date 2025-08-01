"use client";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Blind from "./blind";

export type BlindModalProps = {
  open: boolean;
  blind: {
    id: string | number;
    name: string;
    description?: string;
    effect?: string;
    order?: number;
    minimum_ante?: string | number;
    score_requirement?: string | number;
    reward?: string;
  } | null;
  onClose: () => void;
};

export default function BlindModal({ open, blind, onClose }: BlindModalProps) {
  return (
    <AnimatePresence>
      {open && blind && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 28, duration: 0.25 }}
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm px-1 py-2"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 70, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 70, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 200, damping: 26, duration: 0.32 }}
            className="relative flex flex-col items-center bg-gradient-to-br from-[#232a3a]/80 via-[#2e3140]/80 to-[#3a2a4a]/80 backdrop-blur-xl border border-white/40 rounded-2xl w-full max-w-md sm:max-w-lg md:max-w-xl min-h-[220px] max-h-[90vh] p-4 overflow-y-auto"
            style={{ minHeight: 0, minWidth: 0, border: "2px solid rgba(255,255,255,0.22)" }}
            onClick={e => e.stopPropagation()}
          >
            {/* Blind Info Header */}
            <div className="w-full flex flex-col items-center mb-2">
              <h2 className="font-m6x11plus text-xl md:text-2xl text-white tracking-tight w-full break-words px-1 text-center mb-1">
                {blind.name}
              </h2>
            </div>
            {/* Blind image and description + info */}
            <div className="flex flex-col sm:flex-row w-full items-center gap-3 mb-2">
              <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex-shrink-0 select-none card-img" style={{transform: 'scale(1)'}}>
                <Blind id={blind.id} name={blind.name} order={blind.order} />
              </div>
              <div className="flex-1 flex flex-col justify-center min-w-0 gap-2">
                <div className="bg-transparent rounded-md px-2 py-2 sm:p-3 text-white font-m6x11plus text-center sm:text-left text-xs sm:text-sm md:text-base w-full mb-1 break-words max-h-32 sm:max-h-40 md:max-h-48 overflow-auto">
                  {blind.description || "No description available."}
                </div>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start w-full mt-1">
                  {typeof blind.order !== 'undefined' && (
                    <span className="bg-black/40 font-m6x11plus rounded-xl px-2 py-1 text-xs sm:text-sm text-white">
                      ID: <span className="text-sky-400">{blind.order}</span>
                    </span>
                  )}
                  {typeof blind.effect !== 'undefined' && (
                    <span className="bg-black/40 font-m6x11plus rounded-xl px-2 py-1 text-xs sm:text-sm text-white">
                      Effect: <span className="text-amber-300">{blind.effect}</span>
                    </span>
                  )}
                  {typeof (blind.minimum_ante) !== 'undefined' && (
                    <span className="bg-black/40 font-m6x11plus rounded-xl px-2 py-1 text-xs sm:text-sm text-white">
                      Min Ante: <span className="text-emerald-300">{blind.minimum_ante}</span>
                    </span>
                  )}
                  {typeof blind.score_requirement !== 'undefined' && (
                    <span className="bg-black/40 font-m6x11plus rounded-xl px-2 py-1 text-xs sm:text-sm text-white">
                      Score Req: <span className="text-orange-300">{blind.score_requirement}</span>
                    </span>
                  )}
                  {typeof blind.reward !== 'undefined' && (
                    <span className="bg-black/40 font-m6x11plus rounded-xl px-2 py-1 text-xs sm:text-sm text-white">
                      Reward: <span className="text-yellow-300">{blind.reward}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
            {/* Close button */}
            <button
              onClick={onClose}
              className="mt-2 font-m6x11plus bg-red-500/80 text-white w-full transition hover:bg-red-400/80 px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-2 rounded-lg sm:rounded-xl text-xs xs:text-sm sm:text-base md:text-lg"
              tabIndex={0}
              style={{ position: 'sticky', bottom: 0, zIndex: 10, fontSize: 'clamp(0.8rem, 2vw, 1.15rem)', padding: 'clamp(0.4rem, 1vw, 0.7rem) clamp(1rem, 3vw, 1.5rem)', borderRadius: 'clamp(0.6rem, 2vw, 1.1rem)' }}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
