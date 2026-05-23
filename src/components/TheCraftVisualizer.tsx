/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Beaker, Droplet, Eye, ShieldCheck, HeartPulse, RefreshCw, Thermometer } from 'lucide-react';

export default function TheCraftVisualizer() {
  const [activeBar, setActiveBar] = useState<'traditional' | 'soulviva'>('soulviva');
  const [microscopeZoom, setMicroscopeZoom] = useState(false);

  return (
    <section id="the-craft-section" className="py-24 bg-brand-light text-brand-dark overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20 space-y-16">
        
        {/* Header editorial block */}
        <div className="text-center max-w-xl mx-auto space-y-4">
          <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-neutral-400 uppercase block">
            THE MOLECULAR SANCTUARY
          </span>
          <h2 className="font-sans text-3xl md:text-4xl font-light tracking-tight text-neutral-900">
            Formulated for Purity. <br />Backed by Bio-Science.
          </h2>
          <div className="w-16 h-[1px] bg-brand-dark/15 mx-auto" />
          <p className="font-sans text-xs text-neutral-500 leading-relaxed">
            Conventional cleansing uses heavy animal tallows and synthetic starches. Explore how Soul Viva suspends skin-identical active lipids in a stable, transparent water-bonded matrix.
          </p>
        </div>

        {/* Modular Lab Cabin Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Bar select & molecular indicator */}
          <div className="lg:col-span-5 bg-white/70 backdrop-blur-md rounded-3xl p-8 border border-neutral-100 flex flex-col justify-between space-y-8 shadow-sm">
            <div className="space-y-4">
              <span className="font-sans text-[10px] tracking-widest font-semibold uppercase text-neutral-400 block">
                LAB SWITCHBOARD
              </span>
              <p className="font-sans text-xs text-neutral-500 leading-normal">
                Compare the surface impact of common alkaline cleansing agents against our water-soluble transparent gel formula.
              </p>
              
              <div className="flex bg-neutral-100 p-1 rounded-xl gap-1">
                <button
                  onClick={() => setActiveBar('traditional')}
                  className={`flex-1 py-3 text-center rounded-lg font-sans text-xs tracking-wider uppercase cursor-pointer transition-all ${
                    activeBar === 'traditional'
                      ? 'bg-red-500 text-white shadow-sm font-semibold'
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  Standard Alkaline Soap
                </button>
                <button
                  onClick={() => setActiveBar('soulviva')}
                  className={`flex-1 py-3 text-center rounded-lg font-sans text-xs tracking-wider uppercase cursor-pointer transition-all ${
                    activeBar === 'soulviva'
                      ? 'bg-brand-dark text-white shadow-sm font-semibold'
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  Soul Viva Gel Bar
                </button>
              </div>
            </div>

            {/* Interactive pH color indicator bubble */}
            <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200/40 relative overflow-hidden flex flex-col items-center">
              <span className="font-sans text-[9px] tracking-widest font-bold text-neutral-400 uppercase block mb-4">
                pH Universal Indicator Test
              </span>

              {/* Liquid Beaker Graphic */}
              <div className="relative w-28 h-28 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border-4 border-neutral-300 relative flex items-center justify-center bg-white shadow-inner overflow-hidden">
                  
                  {/* Liquid inside the beaker */}
                  <div
                    className={`absolute inset-x-0 bottom-0 h-[65%] transition-all duration-800 ease-in-out opacity-85 ${
                      activeBar === 'traditional' ? 'bg-indigo-600' : 'bg-amber-300'
                    }`}
                  />
                  
                  {/* Bubble rings inside */}
                  <div className="absolute inset-x-0 bottom-4 flex justify-around opacity-60">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce-slow" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.5s' }} />
                    <div className="w-1 h-1 rounded-full bg-white animate-bounce-slow" style={{ animationDelay: '1.2s' }} />
                  </div>

                  <span className="font-mono text-xl font-bold text-neutral-900 z-10 transition-transform hover:scale-105 select-none">
                    pH {activeBar === 'traditional' ? '9.8' : '5.5'}
                  </span>
                </div>
              </div>

              {/* pH scale details */}
              <div className="text-center mt-5 space-y-1">
                <span className={`font-sans text-xs font-semibold uppercase ${
                  activeBar === 'traditional' ? 'text-indigo-600' : 'text-amber-600'
                }`}>
                  {activeBar === 'traditional' ? 'Harsh Alkaline Soap' : 'Acid-Balanced Hydrator'}
                </span>
                <p className="font-sans text-[11px] text-neutral-400 max-w-xs leading-normal">
                  {activeBar === 'traditional'
                    ? 'Strips natural lipid barriers on contact. Induces surface tightening, redness and long-term hydration loss.'
                    : 'Uniquely matches the natural skin pH level (5.5). Respects the protective acid mantle to keep cells neutral and supple.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right panel: Comparative hydration preservation linechart (SVG crafted!) */}
          <div className="lg:col-span-7 bg-white/70 backdrop-blur-md rounded-3xl p-8 border border-neutral-100 flex flex-col justify-between space-y-8 shadow-sm">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-sans text-[10px] tracking-widest font-semibold uppercase text-neutral-400">
                    SENSORY RETENTION INDEX
                  </span>
                  <h3 className="font-sans text-xl font-medium text-neutral-800 mt-1">
                    Skin Moisture Curve (12 Hour Track)
                  </h3>
                </div>
                <span className="flex items-center gap-1 font-sans text-[10px] text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-md border border-neutral-200/50">
                  <Beaker className="w-3.5 h-3.5 text-neutral-400" /> Clinical Data
                </span>
              </div>
              <p className="font-sans text-xs text-neutral-500">
                Moisture evaporation indices tracked hourly using clinical scalp corneometers following application.
              </p>
            </div>

            {/* Custom SVG Line Chart */}
            <div className="relative h-60 w-full bg-neutral-50/50 rounded-2xl p-4 flex items-center justify-center border border-neutral-100">
              
              {/* Vertical grids / marks */}
              <div className="absolute inset-x-8 inset-y-6 flex justify-between pointer-events-none">
                <div className="w-[1px] h-full bg-neutral-200/50 relative">
                  <span className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 font-mono text-[9px] text-neutral-400">0h</span>
                </div>
                <div className="w-[1px] h-full bg-neutral-200/50 relative">
                  <span className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 font-mono text-[9px] text-neutral-400">3h</span>
                </div>
                <div className="w-[1px] h-full bg-neutral-200/50 relative">
                  <span className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 font-mono text-[9px] text-neutral-400">6h</span>
                </div>
                <div className="w-[1px] h-full bg-neutral-200/50 relative">
                  <span className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 font-mono text-[9px] text-neutral-400 font-semibold text-neutral-500">9h</span>
                </div>
                <div className="w-[1px] h-full bg-neutral-200/50 relative">
                  <span className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 font-mono text-[9px] text-neutral-400">12h</span>
                </div>
              </div>

              {/* Horizontal baseline guide */}
              <div className="absolute inset-x-6 top-1/2 h-[1px] bg-red-200/60 flex items-center justify-end">
                <span className="font-mono text-[9px] text-red-500 pr-2 absolute -top-3.5 tracking-wider uppercase font-semibold">
                  Skin Barrier Baseline (Drying Limit)
                </span>
              </div>

              {/* Chart Core Drawing area */}
              <svg className="w-full h-full overflow-visible z-10" viewBox="0 0 500 200" preserveAspectRatio="none">
                
                {/* Traditional Evaporation Curve line */}
                <motion.path
                  d="M 20,40 Q 120,180 250,185 T 480,195"
                  fill="none"
                  stroke={activeBar === 'traditional' ? '#4F46E5' : '#D1D5DB'}
                  strokeWidth={activeBar === 'traditional' ? 3.5 : 1.5}
                  strokeDasharray={activeBar === 'traditional' ? '0' : '4 4'}
                  className="transition-colors duration-500"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />

                {/* Soul Viva Evaporation Curve line */}
                <motion.path
                  d="M 20,40 Q 150,15 280,35 T 480,45"
                  fill="none"
                  stroke={activeBar === 'soulviva' ? '#1c1b1b' : '#D1D5DB'}
                  strokeWidth={activeBar === 'soulviva' ? 4 : 1.5}
                  strokeDasharray={activeBar === 'soulviva' ? '0' : '4 4'}
                  className="transition-colors duration-500"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />

                {/* Markers tooltips on points */}
                {activeBar === 'soulviva' ? (
                  <>
                    <circle cx="280" cy="35" r="5" fill="#1c1b1b" className="animate-ping" />
                    <circle cx="280" cy="35" r="4" fill="#1c1b1b" />
                  </>
                ) : (
                  <>
                    <circle cx="250" cy="185" r="5" fill="#4F46E5" className="animate-ping" />
                    <circle cx="250" cy="185" r="4" fill="#4F46E5" />
                  </>
                )}
              </svg>

              {/* Micro info on nodes */}
              {activeBar === 'soulviva' && (
                <div className="absolute top-[20%] right-[32%] bg-brand-dark text-white text-[10px] font-mono py-1 px-2.5 rounded-lg border border-white/25 shadow-md flex items-center gap-1">
                  <HeartPulse className="w-3.5 h-3.5 text-rose-300 animate-pulse" /> 88% Moisture Retained
                </div>
              )}
              {activeBar === 'traditional' && (
                <div className="absolute bottom-[14%] right-[44%] bg-indigo-600 text-white text-[10px] font-mono py-1 px-2.5 rounded-lg shadow-md flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-sky-200" /> -42% Critical Dryout
                </div>
              )}
            </div>

            {/* Microscopic Molecular zoom subcomponent */}
            <div className="border-t border-neutral-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="space-y-1 max-w-sm text-center md:text-left">
                <span className="font-sans text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
                  Crystalline Micro-Zoom
                </span>
                <p className="font-sans text-[11px] text-neutral-500leading-relaxed">
                  {microscopeZoom
                    ? 'Magnifying: 1,000,000x zoom showing Hydrogen bonds linking polar water with the non-volatile glycerin Humectant shield.'
                    : 'Click microscope to scan the structural layout of the hydrogen bonds.'}
                </p>
              </div>

              <button
                onClick={() => setMicroscopeZoom(!microscopeZoom)}
                className={`px-5 py-2.5 rounded-full font-sans text-xs tracking-wider uppercase border cursor-pointer transition-all flex items-center gap-2 ${
                  microscopeZoom
                    ? 'bg-neutral-900 border-neutral-900 text-white shadow-inner'
                    : 'border-neutral-200 text-brand-dark bg-white hover:border-neutral-400'
                }`}
              >
                <Eye className="w-4 h-4" />
                {microscopeZoom ? 'Deactivate Zoom' : 'Engage Micro-Scan'}
              </button>
            </div>

            {/* Microscope zoom layout illustration */}
            <AnimatePresence>
              {microscopeZoom && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-brand-dark text-white rounded-2xl w-full p-6 space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-mono text-[9px] tracking-widest text-[#93C5FD] uppercase">
                      ACTIVE SPECTROSCOPIC DIAGRAM (LUMINOUS)
                    </span>
                    <RefreshCw className="w-3.5 h-3.5 text-neutral-400 animate-spin" style={{ animationDuration: '6s' }} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-white/10 p-4 rounded-xl space-y-2 bg-white/5">
                      <span className="font-sans text-xs font-semibold text-[#FCD34D] block uppercase">
                        Water bonding network
                      </span>
                      <p className="font-sans text-[10px] text-neutral-300 leading-relaxed font-light">
                        Rather than precipitating into isolated mineral aggregates, the water molecules are aligned in an organic crystalline grid, maintaining stable transparency and structural cohesion.
                      </p>
                    </div>

                    <div className="border border-white/10 p-4 rounded-xl space-y-2 bg-white/5">
                      <span className="font-sans text-xs font-semibold text-[#A7F3D0] block uppercase">
                        Soluble glycerin layers
                      </span>
                      <p className="font-sans text-[10px] text-neutral-300 leading-relaxed font-light">
                        Creates an absolute water binder on the skin that completely matches cell-wall structures, blocking the trans-epidermal moisture loss (TEWL) during lather removal.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
