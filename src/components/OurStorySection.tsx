/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Leaf, Award, Globe, Droplet, ShieldCheck } from 'lucide-react';

export default function OurStorySection() {
  return (
    <section id="our-story-section" className="py-24 bg-[#FAF8F5] text-stone-900 relative overflow-hidden font-sans border-b border-stone-200/50">
      
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#EAD9EC]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#E5DEC1]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-20 relative z-10 space-y-16">
        
        {/* Header Block */}
        <div className="text-center md:text-left space-y-4">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span className="w-8 h-[1px] bg-[#2D3A2F]" />
            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#2D3A2F] uppercase">
              Why Us
            </span>
          </div>
          <h2 className="font-serif text-[42px] sm:text-[54px] md:text-[64px] font-normal leading-[1.1] text-[#2D3A2F] tracking-tight">
            The Soul Viva <span className="italic font-serif">Difference</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-neutral-500 font-light max-w-xl leading-relaxed">
            More than a soap. A feeling of freshness.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Card 1: 01 — Glycerin-Rich Gel Formula (Col Span 2) */}
          <div className="col-span-1 md:col-span-2 bg-white border border-[#E5DEC1]/50 rounded-[32px] p-8 md:p-10 flex flex-col sm:flex-row gap-8 justify-between items-stretch overflow-hidden relative shadow-xs hover:shadow-md transition-all duration-300">
            <div className="flex-1 flex flex-col justify-between space-y-6 text-left">
              <div className="space-y-4">
                <span className="inline-block bg-[#E5DEC1]/40 text-[#2D3A2F] px-3.5 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold">
                  01 — Gel Formula
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-normal text-[#2D3A2F] tracking-tight leading-tight">
                  Glycerin-Rich <br /><span className="italic">Gel Formula</span>
                </h3>
                <p className="font-sans text-xs md:text-sm text-neutral-600 font-light leading-relaxed">
                  Unlike conventional soaps that strip the skin, Soul Viva's transparent glycerin base acts as a humectant — drawing moisture into the skin with every wash. The result is skin that feels soft and hydrated, not dry and tight. This is the fundamental difference between a bathing bar that merely cleans and one that actively cares.
                </p>
              </div>
              <div className="flex items-center gap-3 text-neutral-500">
                <div className="p-2 rounded-full bg-[#FAF8F5]">
                  <Droplet className="w-4 h-4 text-[#2D3A2F]" />
                </div>
                <span className="font-serif text-xs italic text-stone-700">"Drawing moisture in with every wash."</span>
              </div>
            </div>
            <div className="w-full sm:w-[38%] min-h-[200px] rounded-2xl overflow-hidden relative shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600" 
                alt="Glycerin-rich gel formula" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Card 2: 02 — Genuine Natural Extracts (Col Span 1) */}
          <div className="col-span-1 bg-[#F5F2EB] border border-[#E5DEC1]/60 rounded-[32px] p-8 flex flex-col justify-between gap-6 overflow-hidden relative shadow-xs hover:shadow-md transition-all duration-300">
            <div className="space-y-4 text-left">
              <span className="inline-block bg-white text-[#2D3A2F] px-3.5 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold">
                02 — Extracts
              </span>
              <h3 className="font-serif text-2xl font-normal text-[#2D3A2F] tracking-tight leading-tight">
                Genuine <br /><span className="italic">Natural Extracts</span>
              </h3>
              <p className="font-sans text-xs text-neutral-600 font-light leading-relaxed">
                Every variant contains real botanical extracts — not artificial fragrance alone. Shea butter, cherry blossom, waterlily, sea minerals, black currant, mandarin — each ingredient selected not just for its name, but for its active skin-care benefit. Real botanicals, real results.
              </p>
            </div>
            <div className="w-full h-[140px] rounded-2xl overflow-hidden shadow-inner">
              <img 
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600" 
                alt="Genuine natural extracts" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Card 3: 03 — Sensory-First Design (Col Span 1) */}
          <div className="col-span-1 bg-[#EAD9EC]/20 border border-[#DCBFDE]/45 rounded-[32px] p-8 flex flex-col justify-between gap-6 overflow-hidden relative shadow-xs hover:shadow-md transition-all duration-300 text-left">
            <div className="space-y-4">
              <span className="inline-block bg-[#EAD9EC]/50 text-[#6B2E76] px-3.5 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold">
                03 — Experience
              </span>
              <h3 className="font-serif text-2xl font-normal text-[#6B2E76] tracking-tight leading-tight">
                Sensory-First <br /><span className="italic">Design</span>
              </h3>
              <p className="font-sans text-xs text-neutral-600 font-light leading-relaxed">
                Each variant is built around an emotional story — a feeling, a scene, an escape. The fragrance, the colour, the name, and the key visual all work together to create an experience that goes far beyond the functional. Soul Viva doesn't just clean skin. It transports the person using it.
              </p>
            </div>
            <div className="flex items-center gap-2.5 text-[#6B2E76] bg-white/50 border border-[#DCBFDE]/25 rounded-2xl p-4">
              <Sparkles className="w-5 h-5 text-[#6B2E76]" />
              <span className="font-sans text-xs font-semibold">An immersive emotional journey.</span>
            </div>
          </div>

          {/* Card 4: 04 — Premium Shelf Presence (Col Span 2) */}
          <div className="col-span-1 md:col-span-2 bg-white border border-[#E5DEC1]/50 rounded-[32px] p-8 md:p-10 flex flex-col sm:flex-row-reverse gap-8 justify-between items-stretch overflow-hidden relative shadow-xs hover:shadow-md transition-all duration-300">
            <div className="flex-1 flex flex-col justify-between space-y-6 text-left">
              <div className="space-y-4">
                <span className="inline-block bg-[#E5DEC1]/40 text-[#2D3A2F] px-3.5 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold">
                  04 — Packaging
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-normal text-[#2D3A2F] tracking-tight leading-tight">
                  Premium <br /><span className="italic">Shelf Presence</span>
                </h3>
                <p className="font-sans text-xs md:text-sm text-neutral-600 font-light leading-relaxed">
                  Each bar is individually flow-wrapped and presented in a full-colour printed monocarton with matte lamination and Spot UV finishing. The packaging is designed to command attention on shelf — with bold colour, considered design, and a visual identity that stands far apart from commodity soap.
                </p>
              </div>
              <div className="flex items-center gap-3 text-neutral-500">
                <div className="p-2 rounded-full bg-[#FAF8F5]">
                  <Award className="w-4 h-4 text-[#2D3A2F]" />
                </div>
                <span className="font-serif text-xs italic text-stone-700">"Commanding attention with luxury print detailing."</span>
              </div>
            </div>
            <div className="w-full sm:w-[38%] min-h-[200px] rounded-2xl overflow-hidden relative shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1607006342445-520e181f62ae?auto=format&fit=crop&q=80&w=600" 
                alt="Premium shelf presence" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Card 5: 06 — Export-Ready from Day One (Col Span 3) */}
          <div className="col-span-1 md:col-span-3 bg-[#2D3A2F] text-white rounded-[32px] p-8 md:p-10 flex flex-col md:flex-row gap-8 justify-between items-center overflow-hidden relative shadow-xs hover:shadow-md transition-all duration-300">
            <div className="flex-1 space-y-4 text-left">
              <span className="inline-block bg-white/10 text-emerald-200 px-3.5 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold">
                06 — Global
              </span>
              <h3 className="font-serif text-3xl font-normal tracking-tight leading-tight text-white">
                Export-Ready <span className="italic text-emerald-300">from Day One</span>
              </h3>
              <p className="font-sans text-xs md:text-sm text-neutral-300 font-light leading-relaxed max-w-2xl">
                Manufactured by a certified contract partner with international export capability. GS1 barcodes registered via GS1 India DataKart. Compliant labelling for international markets. Soul Viva is built to be a global brand.
              </p>
            </div>
            
            <div className="flex flex-row md:flex-col gap-4 w-full md:w-auto">
              <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3.5 text-left md:min-w-[220px]">
                <Globe className="w-6 h-6 text-emerald-300 flex-shrink-0" />
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400">Standard</span>
                  <span className="font-serif text-xs font-semibold text-emerald-300">GS1 Registered EANs</span>
                </div>
              </div>
              <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3.5 text-left md:min-w-[220px]">
                <ShieldCheck className="w-6 h-6 text-emerald-300 flex-shrink-0" />
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400">Compliance</span>
                  <span className="font-serif text-xs font-semibold text-emerald-300">International Export-Ready</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
