/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Droplet, 
  Compass, 
  Mail, 
  Check, 
  Award,
  BookmarkCheck,
  Heart,
  Undo
} from 'lucide-react';
import { Product, CartItem } from '../types';

interface StorytellerModalProps {
  product: Product;
  onClose: () => void;
  onInquire: () => void;
}

export default function StorytellerModal({ product, onClose, onInquire }: StorytellerModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedPackaging, setSelectedPackaging] = useState<'signature' | 'wooden' | 'minimum'>('signature');
  const [packSize, setPackSize] = useState<1 | 3 | 6>(1);
  const [added, setAdded] = useState(false);

  const slidesCount = 4;

  // Auto-progress is not recommended for story-driven details unless wanted, let's keep it manual so they can read at their own pace, but provide simple help indicators.
  const handleNext = () => {
    if (currentSlide < slidesCount - 1) {
      setCurrentSlide(p => p + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(p => p - 1);
    }
  };

  const handleInquireAction = () => {
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onInquire();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF5EE]/95 backdrop-blur-2xl overflow-hidden p-0 sm:p-4">
      {/* Immersive high resolution setting backdrop */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={`${product.id}-${currentSlide}`}
            src={product.bgImage}
            alt={product.name}
            className="w-full h-full object-cover opacity-15 filter blur-lg"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1.02, opacity: 0.15 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-[#FAF5EE]/80" />
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-5xl h-full sm:h-[90vh] bg-[#FDFBF9] sm:rounded-3xl border-0 sm:border border-stone-200/60 shadow-[0_30px_90px_rgba(139,115,85,0.08)] overflow-hidden flex flex-col justify-between z-10 text-neutral-900 animate-fade-in">
        
        {/* Header indicator bar */}
        <div className="relative z-20 px-6 sm:px-10 pt-6 sm:pt-8 flex justify-between items-center bg-gradient-to-b from-[#FAF5EE]/50 to-transparent pb-4 border-b border-stone-100">
          <div className="space-y-1 text-left">
            <span className="font-sans text-[9px] tracking-[0.3em] font-extrabold text-neutral-400 uppercase block">
              SENSORY STORYTELLING SYSTEM
            </span>
            <h2 className="font-sans text-lg font-light tracking-wide text-neutral-950">
              The Saga of {product.name}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Slide dot status line */}
            <div className="flex gap-1.5 items-center bg-white border border-stone-200/50 px-3 py-1.5 rounded-full shadow-xs">
              {Array.from({ length: slidesCount }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlide === idx ? 'w-6 bg-neutral-950' : 'w-1 bg-stone-300 hover:bg-stone-400'
                  }`}
                  aria-label={`Go to chapter ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-full bg-white border border-stone-200 hover:border-stone-400 text-neutral-600 hover:text-neutral-900 transition-all cursor-pointer shadow-xs"
              aria-label="Exit storytelling mode"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Narrative Core Workspace */}
        <div className="relative flex-1 px-6 sm:px-12 md:px-20 py-4 flex flex-col justify-center select-none overflow-y-auto max-h-[calc(100vh-180px)] sm:max-h-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full flex items-center"
            >
              {/* Slide 0: The Scent Symphony */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center w-full">
                  <div className="md:col-span-7 space-y-6 text-left">
                    <span className="font-sans text-[10px] tracking-[0.25em] font-extrabold text-[#2B7A78] uppercase block">
                      CHAPTER I &bull; THE MATERIALIZATION
                    </span>
                    <h3 className="font-sans text-3xl sm:text-5xl font-light tracking-tight text-neutral-950 leading-[1.1]">
                      Atmospheric Cleanliness.<br />Zero Syn Fillers.
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
                      {product.longDescription}
                    </p>
                    <div className="p-5 rounded-2xl bg-white border border-stone-200/50 backdrop-blur-md max-w-xl shadow-xs">
                      <span className="font-sans text-[10px] tracking-widest uppercase font-semibold text-neutral-500 block mb-2">Skin Compatibility Profile</span>
                      <p className="font-sans text-xs text-neutral-600 font-light leading-relaxed">
                        Designed at pH <strong className="text-neutral-900">{product.pHLevel}</strong>, our formula works in perfect equilibrium with cellular lipid walls. Safe for dermatological use on <strong className="text-neutral-950">{product.skinType}</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="md:col-span-5 flex justify-center py-4 md:py-0">
                    <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#F2DFCD]/30 to-[#E8D5EB]/20 rounded-full blur-3xl pointer-events-none" />
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(139,115,85,0.15)]"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Slide 1: Olfactory Pyramid Scent Story */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center w-full">
                  <div className="md:col-span-6 space-y-6 text-left order-2 md:order-1">
                    <span className="font-sans text-[10px] tracking-[0.25em] font-extrabold text-amber-805 uppercase block">
                      CHAPTER II &bull; THE OLFACTORY ARCHITECTURE
                    </span>
                    <h3 className="font-sans text-3xl sm:text-5xl font-light tracking-tight text-neutral-950 leading-tight">
                      Spectroscopic Scent Layers
                    </h3>
                    <p className="font-sans text-sm text-neutral-600 leading-relaxed font-light">
                      Like an ambient composition, our fragrances unfold sequentially as water dissolves the hydrogen bond matrix, releasing complex essential distillates into the steam.
                    </p>

                    <div className="space-y-4 pt-2">
                      <div className="flex gap-4 items-start pb-4 border-b border-stone-200/40">
                        <span className="font-sans font-mono text-xs text-amber-800 font-bold tracking-wider pt-0.5">TOP</span>
                        <div>
                          <p className="font-sans text-sm font-medium text-neutral-900">{product.scentNotes.top.join('  &bull;  ')}</p>
                          <p className="font-sans text-xs text-neutral-500 font-light mt-0.5">Atmospheric introduction. Energizing, dewy, and volatile.</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start pb-4 border-b border-stone-200/40">
                        <span className="font-sans font-mono text-xs text-amber-805 font-bold tracking-wider pt-0.5">CORE</span>
                        <div>
                          <p className="font-sans text-sm font-medium text-neutral-900">{product.scentNotes.heart.join('  &bull;  ')}</p>
                          <p className="font-sans text-xs text-neutral-500 font-light mt-0.5">The structural scent identity that characterizes the steam ritual.</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <span className="font-sans font-mono text-xs text-[#2B7A78] font-bold tracking-wider pt-0.5">BASE</span>
                        <div>
                          <p className="font-sans text-sm font-medium text-neutral-900">{product.scentNotes.base.join('  &bull;  ')}</p>
                          <p className="font-sans text-xs text-neutral-500 font-light mt-0.5">The lingering warm residue that stays close to skin pores for hours.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-6 order-1 md:order-2 flex justify-center">
                    <div className="aspect-square w-full max-w-sm rounded-[40px] border border-stone-200/60 overflow-hidden relative shadow-md">
                      <img
                        src={product.bgImage}
                        alt="Harvest setting background"
                        className="w-full h-full object-cover filter brightness-95 scale-in"
                      />
                      <div className="absolute inset-x-4 bottom-4 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200/40 shadow-sm text-left">
                        <Compass className="w-5 h-5 text-amber-800 mb-2" />
                        <h4 className="font-sans text-[11px] font-bold tracking-wider text-neutral-900 uppercase select-none">
                          Botanical Integrity Certificate
                        </h4>
                        <p className="font-sans text-[10px] text-neutral-600 font-light leading-relaxed mt-1">
                          Our extracts are hand-sourced via sustainable cooperatives and verified by high-pressure gas chromatography to maintain 100% molecular active purity.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Slide 2: Active Bio-Ingredients Spec */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center w-full animate-fade-in">
                  <div className="md:col-span-12 space-y-6 text-left">
                    <span className="font-sans text-[10px] tracking-[0.25em] font-extrabold text-[#2B7A78] uppercase block">
                      CHAPTER III &bull; CLINICAL SYNTHESIS
                    </span>
                    <h3 className="font-sans text-3xl md:text-4xl font-light tracking-tight text-neutral-950 select-none">
                      Active Botanical Bio-ingredients
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                      {product.keyIngredients.map((ing, idx) => (
                        <div 
                          key={idx} 
                          className="bg-white border border-stone-200/50 hover:bg-stone-50/50 p-5 sm:p-6 rounded-2xl space-y-3 transition-colors duration-300 shadow-xs"
                        >
                          <span className="w-6 h-6 rounded-full bg-neutral-100 text-xs flex items-center justify-center font-bold text-neutral-600">{idx + 1}</span>
                          <div className="space-y-1">
                            <h4 className="font-sans text-sm font-bold tracking-wide text-neutral-900">{ing.name}</h4>
                            <span className="font-sans text-[10px] font-semibold tracking-wide text-[#2B7A78] uppercase block">{ing.role}</span>
                          </div>
                          <p className="font-sans text-xs text-neutral-600 leading-relaxed font-light">{ing.description}</p>
                          <span className="font-sans text-[9px] text-neutral-400 font-medium tracking-wide font-mono block">Source: {ing.source}</span>
                        </div>
                      ))}
                    </div>

                    {/* Sensorics profile slider visualization */}
                    <div className="pt-4 space-y-3 bg-white p-5 border border-stone-201/20 rounded-2xl shadow-xs">
                      <span className="font-sans text-[10px] tracking-widest uppercase font-semibold text-neutral-500 block pb-1 border-b border-stone-100">Hydration Kinetics Diagnostics &bull; (Dermatological Index)</span>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
                        <div>
                          <div className="flex justify-between font-mono text-[10px] text-neutral-400 mb-1">
                            <span>Hydration Index</span>
                            <span className="font-bold text-neutral-800">{product.sensoryProfile.hydration}%</span>
                          </div>
                          <div className="h-1 bg-stone-100 rounded-full overflow-hidden">
                            <motion.div className="h-full bg-sky-400" initial={{ width: 0 }} animate={{ width: `${product.sensoryProfile.hydration}%` }} transition={{ duration: 1 }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between font-mono text-[10px] text-neutral-400 mb-1">
                            <span>Purity Density</span>
                            <span className="font-bold text-neutral-800">{product.sensoryProfile.purity}%</span>
                          </div>
                          <div className="h-1 bg-stone-100 rounded-full overflow-hidden">
                            <motion.div className="h-full bg-emerald-400" initial={{ width: 0 }} animate={{ width: `${product.sensoryProfile.purity}%` }} transition={{ duration: 1, delay: 0.1 }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between font-mono text-[10px] text-neutral-400 mb-1">
                            <span>Clinical Lather</span>
                            <span className="font-bold text-neutral-800">{product.sensoryProfile.latherDensity}%</span>
                          </div>
                          <div className="h-1 bg-stone-100 rounded-full overflow-hidden">
                            <motion.div className="h-full bg-purple-400" initial={{ width: 0 }} animate={{ width: `${product.sensoryProfile.latherDensity}%` }} transition={{ duration: 1, delay: 0.2 }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between font-mono text-[10px] text-neutral-400 mb-1">
                            <span>Matrix Longevity</span>
                            <span className="font-bold text-neutral-800">{product.sensoryProfile.longevity}%</span>
                          </div>
                          <div className="h-1 bg-stone-100 rounded-full overflow-hidden">
                            <motion.div className="h-full bg-amber-500" initial={{ width: 0 }} animate={{ width: `${product.sensoryProfile.longevity}%` }} transition={{ duration: 1, delay: 0.3 }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Slide 3: Interactive Purchase and Packaging Ritual */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center w-full">
                  <div className="md:col-span-6 space-y-6 text-left">
                    <span className="font-sans text-[10px] tracking-[0.25em] font-extrabold text-amber-805 uppercase block">
                      CHAPTER IV &bull; THE RITUAL DISPATCH
                    </span>
                    <h3 className="font-sans text-3xl sm:text-[44px] font-light tracking-tight text-neutral-950 leading-tight">
                      Elevate Your Bath Sanctuary
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                      Choose your bespoke architectural housing and volume. Individually vacuum sealed in oxygen-barrier films to conserve fresh fragrance integrity until unboxing.
                    </p>

                    <div className="space-y-4">
                      {/* Packaging selection option */}
                      <div className="space-y-1.5">
                        <span className="font-sans text-[9px] tracking-wider uppercase font-semibold text-neutral-500">Bespoke Outer Housing</span>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: 'signature', label: 'Signature Linen', desc: 'Linen box' },
                            { id: 'wooden', label: 'Bespoke Cryptomeria Wood', desc: 'Aroma Cedar' },
                            { id: 'minimum', label: 'Minimal Pulp Wrapper', desc: 'Reduced packaging' }
                          ].map((pack) => (
                            <button
                              key={pack.id}
                              onClick={() => setSelectedPackaging(pack.id as any)}
                              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                                selectedPackaging === pack.id
                                  ? 'border-neutral-950 bg-stone-50 font-bold text-neutral-950'
                                  : 'border-stone-200 bg-white hover:border-neutral-400 text-neutral-500'
                              }`}
                            >
                              <span className="font-sans text-[10px] uppercase block tracking-wide">{pack.label.split(' ')[0]}</span>
                              <span className="font-sans text-[8px] opacity-60 block mt-0.5">{pack.desc}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Package quantity size selector */}
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { val: 1, label: 'Single Bar', sub: `${product.weight}` },
                          { val: 3, label: 'Ritual Pack of 3', sub: 'Triple set' },
                          { val: 6, label: 'Continuous Suite of 6', sub: 'optimal aging set' },
                        ].map((pack) => (
                          <button
                            key={pack.val}
                            onClick={() => setPackSize(pack.val as any)}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                              packSize === pack.val
                                ? 'border-neutral-950 bg-stone-50 text-neutral-950 font-bold'
                                  : 'border-stone-200 bg-white hover:border-neutral-400 text-neutral-500'
                            }`}
                          >
                            <span className="font-sans text-[10px] block">{pack.label}</span>
                            <span className="font-sans text-[9px] opacity-70 block mt-0.5">{pack.sub}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Active purchase frame on right */}
                  <div className="md:col-span-6 flex flex-col items-center justify-center">
                    <div className="w-full max-w-sm p-6 sm:p-8 rounded-[32px] bg-white border border-stone-200/60 backdrop-blur-md space-y-6 text-center shadow-lg">
                      <div className="space-y-2">
                        <span className="font-sans text-[9px] tracking-[0.2em] font-bold text-neutral-400 uppercase select-none">
                          FINALIZE RITUAL
                        </span>
                        
                        {/* Display formulation compatibility info */}
                        <div className="flex flex-col items-center justify-center gap-1 pb-1">
                          <span className="font-sans text-[10px] text-neutral-400 uppercase tracking-widest font-light">Custom Inquiry Specification</span>
                          <span className="font-sans text-md font-semibold text-neutral-950 uppercase pt-1">{selectedPackaging} / {packSize === 1 ? 'Single' : packSize === 3 ? 'Set of 3' : 'Suite of 6'}</span>
                        </div>
                        
                        <div className="font-sans text-[10px] text-neutral-500 font-light flex items-center justify-center gap-1">
                          <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Includes custom botanical certification label</span>
                        </div>
                      </div>

                      <button
                        onClick={handleInquireAction}
                        disabled={added}
                        className={`w-full py-4 px-6 h-13 rounded-full font-sans text-xs tracking-widest uppercase transition-all duration-500 flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                          added
                            ? 'bg-emerald-600 text-white'
                            : 'bg-neutral-950 text-white hover:bg-neutral-800 active:scale-98'
                        }`}
                      >
                        {added ? (
                          <>
                            <Check className="w-4 h-4 text-white" /> Connecting to Consultation...
                          </>
                        ) : (
                          <>
                            <Mail className="w-4 h-4 text-white" /> Inquire About Variant
                          </>
                        )}
                      </button>

                      <p className="font-sans text-[10px] text-neutral-500 font-light leading-relaxed">
                        Inquiries are evaluated within 24 hours.<br />
                        Each micro-batch yields individual clinical quality analysis records.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer controls */}
        <div className="relative z-10 px-6 sm:px-10 pb-6 sm:pb-8 pt-4 flex justify-between items-center bg-gradient-to-t from-[#FAF5EE]/30 to-transparent border-t border-stone-150">
          <button
            onClick={handlePrev}
            disabled={currentSlide === 0}
            className={`font-sans text-[10px] tracking-widest uppercase py-3.5 px-6 rounded-full inline-flex items-center gap-2 border cursor-pointer transition-all ${
              currentSlide === 0
                ? 'opacity-30 border-stone-200 text-neutral-400 pointer-events-none'
                : 'border-stone-300 text-neutral-700 hover:text-black hover:bg-stone-50'
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> Previous Chapter
          </button>

          <button
            onClick={handleNext}
            disabled={currentSlide === slidesCount - 1}
            className={`font-sans text-[10px] tracking-widest uppercase py-3.5 px-6 rounded-full inline-flex items-center gap-2 cursor-pointer transition-all ${
              currentSlide === slidesCount - 1
                ? 'opacity-30 border-stone-200 text-neutral-400 pointer-events-none'
                : 'bg-neutral-950 text-white hover:bg-neutral-800 font-bold'
            }`}
          >
            Next Chapter <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
