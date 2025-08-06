"use client";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { useSpring, useAnimationControls } from "framer-motion";
import Voucher from "./voucher";

export default function VoucherModal({ open, voucher, onClose }) {
  const controls = useAnimationControls();

  if (!open || !voucher) return null;

  return (
    <AnimatePresence>
      {open && voucher && (
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
            className="relative flex flex-col items-center bg-gradient-to-br from-[#232a3a]/80 via-[#2e3140]/80 to-[#3a2a4a]/80 backdrop-blur-xl border border-white/40 rounded-2xl w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl min-h-[320px] md:min-h-[400px] max-h-[98svh] xl:max-h-[90vh] p-3 sm:p-6 md:p-8 overflow-y-auto shadow-2xl"
            style={{ minHeight: 0, minWidth: 0, boxShadow: '0 12px 40px 0 rgba(60, 40, 120, 0.35)', border: "2px solid rgba(255,255,255,0.22)" }}
            onClick={e => e.stopPropagation()}
          >
            <h2 className="font-m6x11plus text-xl md:text-2xl text-white tracking-tight w-full break-words px-1 text-center mb-2">
              {voucher.name}
            </h2>
            <div className="flex flex-col sm:flex-row w-full items-center gap-4 mb-2">
              <div className="relative w-28 h-44 sm:w-32 sm:h-52 md:w-36 md:h-60 lg:w-40 lg:h-64 flex-shrink-0 flex items-center justify-center select-none cursor-pointer">
                <Voucher
                  id={voucher.id}
                  name={voucher.name}
                  priority={true}
                />
              </div>
              <div className="flex flex-col flex-1 items-center sm:items-start w-full">
                <div className="bg-transparent rounded-md px-2 py-2 sm:p-3 text-white font-m6x11plus text-center sm:text-left text-lg sm:text-xl md:text-2xl w-full mb-1 sm:mb-2 break-words max-h-32 sm:max-h-40 md:max-h-48 overflow-auto">
                  {voucher.effect ? voucher.effect : "No effect."}
                  {voucher.unlock && <><br /><span className=" text-lg sm:text-xl md:text-2xl">Unlock: {voucher.unlock}</span></>}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="mt-2 font-m6x11plus bg-red-500/80 text-white w-full transition hover:bg-red-700 px-4 py-2 rounded-lg text-base shadow-sm border border-white/20"
              tabIndex={0}
              style={{ position: 'sticky', bottom: 0, zIndex: 10, fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', borderRadius: 'clamp(0.5rem, 1vw, 0.8rem)' }}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
