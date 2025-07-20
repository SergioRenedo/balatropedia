"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React from "react";

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
  // Floating animation (no tilt, no shadow)
  const { useAnimationControls, motion: motionLib } = require("framer-motion");
  const controls = useAnimationControls();
  React.useEffect(() => {
    if (!open) {
      controls.stop();
      controls.set({ y: 0, rotateZ: 0 });
    }
    // Don't start floating here; will start on animation complete
    // eslint-disable-next-line
  }, [open, tag]);

  // Start floating after modal opening animation completes
  const startFloating = () => {
    controls.start({
      y: [0, -6, 4, -3, 7, -5, 2, 0],
      rotateZ: [0, 1.5, -1, 2, -2, 1, -1.5, 0],
      transition: {
        repeat: Infinity,
        duration: 17,
        ease: "easeInOut",
        repeatType: "loop"
      }
    });
  };

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
            onAnimationComplete={() => { if (open && tag) startFloating(); }}
          >
            {/* Tag Info Header */}
            <div className="w-full flex flex-col items-center mb-2">
              <h2 className="font-m6x11plus text-xl md:text-2xl text-white tracking-tight w-full break-words px-1 text-center mb-1">
                {tag.name}
              </h2>
            </div>
            {/* Tag image and description */}
            <div className="flex flex-col sm:flex-row w-full items-center gap-3 mb-2">
              <motion.div
                animate={controls}
                className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex-shrink-0 flex items-center justify-center select-none card-img"
                tabIndex={0}
                role="img"
                aria-label={tag.name}
              >
                <div className="absolute inset-0 z-10 overflow-hidden flex items-center justify-center">
                  <Image
                    src={`/sprites/tags/${tag.id}.webp`}
                    alt={tag.name}
                    fill
                    sizes="(max-width: 640px) 5rem, (max-width: 768px) 6rem, (max-width: 1024px) 7rem, 7rem"
                    className="object-contain pointer-events-none select-none transition-all"
                    draggable={false}
                  />
                </div>
              </motion.div>
              <div className="flex-1 flex flex-col justify-center min-w-0 gap-2">
                <div className="bg-transparent rounded-md px-2 py-2 sm:p-3 text-white font-m6x11plus text-center sm:text-left text-xs sm:text-sm md:text-base w-full mb-1 break-words max-h-32 sm:max-h-40 md:max-h-48 overflow-auto">
                  {tag.description || "No description available."}
                </div>
                {(typeof tag.order !== 'undefined' || typeof tag.ante !== 'undefined') && (
                  <div className="flex flex-row gap-2 justify-center sm:justify-start w-full mt-1">
                    {typeof tag.order !== 'undefined' && (
                      <span className="bg-black/40 font-m6x11plus rounded-xl px-2 py-1 text-xs sm:text-sm text-white">
                        ID: <span className="text-sky-400">{tag.order}</span>
                      </span>
                    )}
                    {typeof tag.ante !== 'undefined' && (
                      <span className="bg-black/40 font-m6x11plus rounded-xl px-2 py-1 text-xs sm:text-sm text-white">
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
