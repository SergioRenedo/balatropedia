"use client";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Tag from "./tag";

export type TagModalProps = {
  open: boolean;
  tag: {
    id: string | number;
    name: string;
    description?: string;
    ante?: string | number;
    order?: number;
  } | null;
  onClose: () => void;
};

export default function TagModal({ open, tag, onClose }: TagModalProps) {
  return (
    <AnimatePresence>
      {open && tag && (
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
            {/* Tag Info Header */}
            <div className="w-full flex flex-col items-center mb-2">
              <h2 className="font-m6x11plus text-2xl md:text-3xl lg:text-4xl text-white tracking-tight w-full break-words px-1 text-center mb-2">
                {tag.name}
              </h2>
            </div>
            {/* Tag image and description */}
            <div className="flex flex-col sm:flex-row w-full items-center gap-3 mb-2">
              <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex-shrink-0 select-none card-img" style={{transform: 'scale(1)'}}>
                <Tag id={tag.id} name={tag.name} order={tag.order} />
              </div>
              <div className="flex-1 flex flex-col justify-center min-w-0 gap-2">
                <div className="bg-transparent rounded-md px-2 py-2 sm:p-3 text-white font-m6x11plus text-center sm:text-left text-lg sm:text-xl md:text-2xl w-full mb-1 sm:mb-2 break-words max-h-32 sm:max-h-40 md:max-h-48 overflow-auto">
                  {tag.description || "No description available."}
                </div>
                {(typeof tag.order !== 'undefined' || typeof tag.ante !== 'undefined') && (
                  <div className="flex flex-row gap-2 justify-center sm:justify-start w-full mt-1">
                    {typeof tag.order !== 'undefined' && (
                      <span className="bg-black/40 font-m6x11plus rounded-xl px-2 py-1 text-lg sm:text-xl md:text-2xl text-white">
                        ID: <span className="text-sky-400">{tag.order}</span>
                      </span>
                    )}
                    {typeof tag.ante !== 'undefined' && (
                      <span className="bg-black/40 font-m6x11plus rounded-xl px-2 py-1 text-lg sm:text-xl md:text-2xl text-white">
                        Ante: <span className="text-amber-300">{tag.ante}</span>
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* Close button */}
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
