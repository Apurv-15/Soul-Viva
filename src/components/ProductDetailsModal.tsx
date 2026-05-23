/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem } from '../types';
import { X, Check, Droplet, Sparkles, Wind, Weight, Layers, ShieldCheck, ShoppingCart } from 'lucide-react';

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
  onInquire: () => void;
}

export default function ProductDetailsModal({ product, onClose, onInquire }: ProductDetailsModalProps) {
  const [packSize, setPackSize] = useState<1 | 3 | 6>(1);
  const [packaging, setPackaging] = useState<'signature' | 'wooden' | 'minimum'>('signature');
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'scents'>('benefits');
  const [added, setAdded] = useState(false);

  const handleInquireAction = () => {
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onInquire();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end overflow-hidden">
      {/* Semi-transparent blur backdrop */}
      <motion.div
        className="absolute inset-0 bg-neutral-900/45 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Main Luxury Drawer panel (Right heavy, slide over) */}
      <motion.div
        className="relative w-full max-w-2xl h-full bg-brand-light text-brand-dark flex flex-col justify-between overflow-y-auto shadow-[0_0_80px_rgba(0,0,0,0.15)] z-10"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 190 }}
      >
        {/* Header toolbar */}
        <div className="sticky top-0 z-20 flex justify-between items-center px-8 py-5 border-b border-neutral-100 bg-brand-light/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="font-sans text-[10px] tracking-widest font-semibold uppercase text-neutral-400">
              EXPLORING VARIANT
            </span>
            <div className={`w-2.5 h-2.5 rounded-full ${
              product.id === 'crystal-clarity' ? 'bg-sky-300' :
              product.id === 'shea-honey' ? 'bg-amber-300' :
              product.id === 'mandarin-peach' ? 'bg-orange-300' : 'bg-purple-300'
            }`} />
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-500 hover:text-brand-dark cursor-pointer"
            aria-label="Close product view"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal content area */}
        <div className="flex-1 p-8 md:p-10 space-y-10">
          
          {/* Editorial split: Image ambient box left-ish, title right-ish */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            
            {/* Visual focus frame */}
            <div className="md:col-span-2 relative h-56 rounded-2xl overflow-hidden bg-white/40 shadow-sm flex items-center justify-center p-3 border border-neutral-200/50">
              <div className={`absolute inset-0 opacity-40 bg-gradient-to-b ${product.accentClass}`} />
              <img
                src={product.bgImage}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
              
              {/* Floating translucent mock crystalline soap on top */}
              {product.id === 'crystal-clarity' && (
                <img
                  src={product.image}
                  alt="Transparent bar layer"
                  className="w-32 h-32 object-contain animate-float drop-shadow-lg z-10 select-none"
                  style={{ maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)' }}
                />
              )}
            </div>

            {/* Core titles */}
            <div className="md:col-span-3 space-y-2">
              <span className="font-sans text-xs tracking-[0.2em] font-medium text-neutral-400 uppercase">
                {product.subtitle}
              </span>
              <h2 className="font-sans text-3xl font-light tracking-tight text-neutral-900">
                {product.name}
              </h2>
              <p className="font-mono text-xs text-neutral-400 font-light flex items-center gap-1.5 pt-1">
                <span>{product.weight}</span>
                <span>&bull;</span>
                <span className="text-secondary">pH {product.pHLevel}</span>
              </p>
              <p className="font-sans text-sm text-neutral-500 leading-relaxed pt-2">
                {product.description}
              </p>
            </div>
          </div>

          {/* Experiential Interactive Tabs */}
          <div className="space-y-4">
            <div className="flex border-b border-neutral-100 gap-6">
              {[
                { id: 'benefits', label: 'Sensory Formula' },
                { id: 'ingredients', label: 'Bio Ingredients' },
                { id: 'scents', label: 'Fragrance Pyramid' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`font-sans text-xs tracking-wider pb-3 cursor-pointer border-b transition-colors ${
                    activeTab === tab.id
                      ? 'text-brand-dark border-brand-dark font-medium'
                      : 'text-neutral-400 border-transparent hover:text-neutral-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content 1: Sensory graphs */}
            {activeTab === 'benefits' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2"
              >
                {[
                  { label: 'Skin Hydration Density', val: product.sensoryProfile.hydration, desc: 'Lactate and Glycerin skin water bonding rate', icon: <Droplet className="w-4 h-4 text-sky-400" /> },
                  { label: 'Formulation Purity Index', val: product.sensoryProfile.purity, desc: 'Water-soluble clean extraction standard', icon: <ShieldCheck className="w-4 h-4 text-teal-400" /> },
                  { label: 'Lather Texture Density', val: product.sensoryProfile.latherDensity, desc: 'Hydrated solid molecule surface-tension bubble size', icon: <Layers className="w-4 h-4 text-amber-400" /> },
                  { label: 'Molecular Integrity Lifespan', val: product.sensoryProfile.longevity, desc: 'Resilience of the crystal form against direct water streams', icon: <Wind className="w-4 h-4 text-purple-400" /> },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white/60 p-4 rounded-xl border border-neutral-100 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-sans text-xs font-medium text-neutral-700 flex items-center gap-1.5">
                        {stat.icon}
                        {stat.label}
                      </span>
                      <span className="font-mono text-xs text-brand-dark/70 font-semibold">{stat.val}%</span>
                    </div>
                    {/* Linear slide visualizer */}
                    <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden relative">
                      <motion.div
                        className="h-full bg-brand-dark"
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.val}%` }}
                        transition={{ duration: 1, delay: idx * 0.1, ease: 'easeOut' }}
                      />
                    </div>
                    <p className="font-sans text-[10px] text-neutral-400 leading-normal">
                      {stat.desc}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Tab content 2: Core Ingredients Table */}
            {activeTab === 'ingredients' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 pt-2"
              >
                <div className="overflow-hidden border border-neutral-100 rounded-xl bg-white/40">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-neutral-50 border-b border-neutral-100 font-sans text-[10px] tracking-wider uppercase text-neutral-400">
                        <th className="py-3 px-4">Key Molecule / Extract</th>
                        <th className="py-3 px-4">Functional Role</th>
                        <th className="py-3 px-4">Source Heritage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 font-sans text-xs">
                      {product.keyIngredients.map((item, idx) => (
                        <tr key={idx} className="hover:bg-neutral-50/50 transition-colors">
                          <td className="py-3 px-4">
                            <span className="font-medium text-neutral-800 block">{item.name}</span>
                            <span className="text-[10px] text-neutral-400 block pt-0.5 leading-relaxed font-normal">{item.description}</span>
                          </td>
                          <td className="py-3 px-4 text-neutral-600 align-top">{item.role}</td>
                          <td className="py-3 px-4 text-neutral-500 font-light align-top">{item.source}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Tab content 3: Fragrance Pyramid */}
            {activeTab === 'scents' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-2 space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { level: 'Top Notes', notes: product.scentNotes.top, desc: 'Immediate sensory burst during early water contact, clean & effervescent.' },
                    { level: 'Heart Notes', notes: product.scentNotes.heart, desc: 'Rich textural botanical atmosphere that expands in the heated lather.' },
                    { level: 'Base Notes', notes: product.scentNotes.base, desc: 'Warm, grounding traces that remain lightly with the skin pore structure.' },
                  ].map((level, idx) => (
                    <div key={idx} className="bg-white/60 p-5 rounded-xl border border-neutral-100 flex flex-col justify-between">
                      <div>
                        <span className="font-sans text-[10px] tracking-widest font-semibold uppercase text-neutral-400 block mb-2">
                          {level.level}
                        </span>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {level.notes.map((n, i) => (
                            <span key={i} className="font-sans text-xs bg-neutral-100 border border-neutral-200/50 text-neutral-700 px-2 py-0.5 rounded-md font-light">
                              {n}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="font-sans text-[10px] text-neutral-400 leading-normal border-t border-neutral-100/60 pt-2.5">
                        {level.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Customize section: packaging & size */}
          <div className="space-y-6 border-t border-neutral-100 pt-8">
            <h3 className="font-sans text-sm font-medium text-neutral-800 uppercase tracking-widest">
              Tailor Your Ritual
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Packaging container option */}
              <div className="space-y-3">
                <label className="font-sans text-[10px] tracking-wider text-neutral-400 uppercase block font-semibold">
                  Select Design Housing
                </label>
                <div className="flex flex-col gap-2">
                  {[
                    { id: 'signature', label: 'Signature White Glassmorphism Box', desc: 'Embossed frosted cardstock casing. (Standard)', cost: 'Signature' },
                    { id: 'wooden', label: 'Bespoke Cedar Wood Travel Box', desc: 'Handcrafted hollowed cedar container with lock lid.', cost: 'Premium' },
                    { id: 'minimum', label: 'Minimalist Compostable Paper Wrapping', desc: 'Recycled plant-fiber protective wrapping.', cost: 'Eco-Choice' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setPackaging(opt.id as any)}
                      className={`flex justify-between items-start p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        packaging === opt.id
                          ? 'border-brand-dark bg-white shadow-sm'
                          : 'border-neutral-200/60 bg-white/20 hover:border-neutral-300'
                      }`}
                    >
                      <div className="max-w-[80%]">
                        <span className="font-sans text-xs font-semibold text-neutral-800 block">{opt.label}</span>
                        <span className="font-sans text-[10px] text-neutral-400 block leading-tight pt-1 font-light">{opt.desc}</span>
                      </div>
                      <span className="font-sans text-[10px] font-semibold text-neutral-500 uppercase tracking-widest">{opt.cost}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Ritual pack size option */}
              <div className="space-y-3">
                <label className="font-sans text-[10px] tracking-wider text-neutral-400 uppercase block font-semibold">
                  Ritual Pack Configuration
                </label>
                <div className="flex flex-col gap-2">
                  {[
                    { id: 1 as const, label: 'Single Sanctuary Bar', desc: 'One hand-poured gel bar, 120g.' },
                    { id: 3 as const, label: 'Starter Triplet Set', desc: 'Three gel bars of this variant, custom housing.' },
                    { id: 6 as const, label: 'Custom Ritual Box Set', desc: 'Six gel bars, optimal aging moisture cabinet.' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setPackSize(opt.id)}
                      className={`flex justify-between items-start p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        packSize === opt.id
                          ? 'border-brand-dark bg-white shadow-sm'
                          : 'border-neutral-200/60 bg-white/20 hover:border-neutral-300'
                      }`}
                    >
                      <div className="max-w-[90%]">
                        <span className="font-sans text-xs font-semibold text-neutral-800 block">{opt.label}</span>
                        <span className="font-sans text-[10px] text-neutral-400 block leading-tight pt-1 font-light">{opt.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer sticky: Price display & primary action */}
        <div className="sticky bottom-0 z-20 bg-white border-t border-neutral-105 py-6 px-8 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <span className="font-sans text-[10px] tracking-wider text-neutral-400 uppercase block">Selected Showcase Spec</span>
            <div className="flex items-baseline gap-1.5 mt-0.5 justify-center md:justify-start">
              <span className="font-sans text-sm font-semibold uppercase text-brand-dark tracking-wider">
                {packaging} Housing &bull; {packSize === 1 ? 'Single' : `Set of ${packSize}`}
              </span>
            </div>
          </div>

          <button
            onClick={handleInquireAction}
            disabled={added}
            style={{ width: '100%' }}
            className={`max-w-md bg-brand-dark text-white px-8 py-4 font-sans text-xs tracking-[0.2em] rounded-full uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              added ? 'bg-emerald-600' : 'hover:bg-neutral-800 active:scale-98'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" /> Connecting to Consultation...
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 stroke-[1.8]" /> Contact to Inquire / Schedule Demo
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
