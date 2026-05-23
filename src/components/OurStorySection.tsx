/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const CHAPTERS = [
  {
    id: '01',
    year: '2022',
    heading: 'In the Beginning',
    quote: 'What would be the ultimate purity formulation?',
    content: 'The Soul Viva formulation was born over a cold winter night in our laboratory. A small group of cosmetic chemists and skin-purity advocates gathered to ask a simple question: could we eliminate heavy synthetic fillers and binders and craft a luxury bar that acts directly like a block of solidified hydration? We worked through hundreds of gas chromatography tests to stabilize clear active lipids.',
    mainImage: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=1200',
    subImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '02',
    year: '2023',
    heading: 'The Pure Gel Matrix',
    quote: 'Could we suspend hydration without chemical compounds?',
    content: 'Traditional soap matrices rely on solid animal tallows and drying starches to maintain structural stability. Our breakthrough was discovering a physical gel structure that locks organic humectants in a solid state using hydrogen bond networks. This allowed us to cast-pour crystal-clear bars that leave zero dry residue, keeping pores completely respiratory.',
    mainImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1200',
    subImage: 'https://images.unsplash.com/photo-1607006342445-520e181f62ae?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '03',
    year: '2024',
    heading: 'The Botanical Integration',
    quote: 'How do you transport a real harvest atmosphere into the steam?',
    content: 'We integrated pristine harvests—high-altitude Kashmir Lavender, raw meadow honey, and Calabria Mandarin. By cold-pressing these botanical distillates and vacuum-sealing individual blocks in oxygen-barrier films, the raw molecular active structures remain untouched and fully materialize into sensory aromatherapy only upon contact with bath water.',
    mainImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200',
    subImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9dD0QuaWEX2tN8_NKp5Xg1pqqWPg2AIkbqFJT03E3zWRzzuV4i98UY-1j-LnDOpnrTXFfu4dpL1ywAAgDYR9VTUhF7UgMNJVq0iLAqNpwJ_ZqyjcncEfikTH64PH4s86b0qdJs2z6PjHiyDCnTzvc_HtEuRwcJH6Q2TESeaBVM4mFFVbDsTl3M_-mbnYHShHK-CBM3_XwWjFbMDPT2_CyyboeenIwwxv6m2ECiEtQuXZGkOyyb7FQMh6FlnSUBciKofLf1KT-tEg'
  }
];

// Aesthetic ink/paint splatters precisely styled after the Lauf webpage screenshot
const SplatterLeft = () => (
  <svg className="absolute left-0 top-[22%] w-24 sm:w-48 h-[600px] opacity-[0.25] text-[#2c2c2c] pointer-events-none z-0 select-none" viewBox="0 0 200 600" fill="currentColor">
    <circle cx="15" cy="50" r="2.5" />
    <circle cx="35" cy="45" r="4.5" />
    <circle cx="45" cy="62" r="1.5" />
    <circle cx="58" cy="38" r="5" />
    <circle cx="30" cy="80" r="3" />
    <circle cx="65" cy="110" r="2.5" />
    <circle cx="25" cy="120" r="3.5" />
    <circle cx="40" cy="140" r="6.5" />
    {/* Fine mist/spray pattern */}
    <circle cx="14" cy="180" r="2" />
    <circle cx="18" cy="184" r="1.2" />
    <circle cx="20" cy="178" r="1.8" />
    <circle cx="28" cy="190" r="3.5" />
    <circle cx="55" cy="210" r="4" />
    <circle cx="48" cy="198" r="1.5" />
    <circle cx="70" cy="220" r="2" />
    <circle cx="95" cy="195" r="1.8" />
    <circle cx="28" cy="240" r="5.5" />
    <circle cx="42" cy="265" r="3" />
    <circle cx="22" cy="290" r="2.5" />
    <circle cx="50" cy="310" r="4" />
    <circle cx="65" cy="325" r="1.5" />
    <circle cx="38" cy="350" r="3.5" />
    <circle cx="12" cy="410" r="2.5" />
    <circle cx="45" cy="430" r="5" />
    <circle cx="62" cy="460" r="1.8" />
    <circle cx="28" cy="495" r="3" />
    <circle cx="50" cy="530" r="4" />
    {/* Speckled run trails */}
    <path d="M 25 120 Q 28 135 22 142" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M 50 310 Q 53 328 48 335" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
);

const SplatterRight = () => (
  <svg className="absolute right-0 top-[5%] w-32 sm:w-64 h-[400px] opacity-[0.22] text-[#2c2c2c] pointer-events-none z-0 select-none" viewBox="0 0 200 400" fill="currentColor">
    <circle cx="180" cy="45" r="2" />
    <circle cx="160" cy="62" r="3.5" />
    <circle cx="145" cy="80" r="1.5" />
    <circle cx="132" cy="55" r="4.5" />
    <circle cx="110" cy="90" r="2" />
    <circle cx="175" cy="120" r="3" />
    <circle cx="190" cy="150" r="5.5" />
    <circle cx="155" cy="180" r="2.5" />
    <circle cx="140" cy="210" r="4" />
    <circle cx="120" cy="240" r="1.8" />
    <circle cx="165" cy="285" r="3.5" />
    <circle cx="185" cy="310" r="5" />
    {/* Fine specs */}
    <circle cx="112" cy="135" r="1" />
    <circle cx="128" cy="152" r="1.2" />
    <circle cx="98" cy="202" r="1" />
    <path d="M 190 150 Q 186 168 192 174" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

export default function OurStorySection() {
  const [activeChapterId, setActiveChapterId] = useState('01');
  
  const currentChapter = CHAPTERS.find(ch => ch.id === activeChapterId) || CHAPTERS[0];

  return (
    <section id="our-story-section" className="py-20 sm:py-28 bg-[#FFFFFF] text-stone-900 relative overflow-hidden font-sans border-b border-stone-200/50">
      
      {/* Decorative ink/distressed grunge splatters styled precisely like Lauf Forks screenshot */}
      <SplatterLeft />
      <SplatterRight />

      <div className="max-w-[1300px] mx-auto px-6 md:px-16 relative z-10">
        
        {/* TOP LAYOUT: Grand Header Block styled after Lauf "Our Story" */}
        <div className="relative pb-4 select-none">
          {/* Subtle scoop label at bottom left of title */}
          <div className="flex items-center gap-4 mb-4">
            <span className="w-10 h-[1.5px] bg-neutral-900" />
            <span className="text-[10px] sm:text-xs font-black tracking-[0.2em] text-neutral-800 uppercase block">
              Get the Inside Scoop
            </span>
          </div>

          {/* Massively sized, impact-heavy rustic typography block */}
          <h2 className="text-6xl sm:text-8xl md:text-[8.5rem] font-extrabold tracking-tighter text-neutral-950 font-[Impact, 'Arial Black', sans-serif] uppercase leading-[0.85] select-text">
            Our Story
          </h2>
        </div>

        {/* DOUBLE COLUMN SPLIT: Story on Left, Overlay Collage on Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-14 items-start pt-10">
          
          {/* Narrative Content Column */}
          <div className="md:col-span-5 space-y-8 text-left z-10">
            
            {/* Red high-contrast badge controls */}
            <div className="flex gap-2">
              {CHAPTERS.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setActiveChapterId(ch.id)}
                  className={`w-9 h-9 flex items-center justify-center font-sans text-xs font-bold transition-all duration-300 cursor-pointer ${
                    activeChapterId === ch.id
                      ? 'bg-[#C52B3E] text-white border border-[#C52B3E]' // Brick red badge
                      : 'bg-[#FAF5EE] text-stone-700 border border-stone-200/60 hover:border-stone-400'
                  }`}
                  aria-label={`Go to chapter ${ch.id}`}
                >
                  {ch.id}
                </button>
              ))}
            </div>

            {/* Main title and body text blocks */}
            <div className="space-y-4">
              <span className="font-mono text-[9px] tracking-[0.25em] font-bold text-stone-400 uppercase block select-none">
                YEAR &bull; {currentChapter.year} CERTIFICATION
              </span>
              <h3 className="font-sans text-2xl sm:text-3.5xl font-extrabold text-[#111111] tracking-tight leading-tight select-text">
                {currentChapter.heading}
              </h3>
              <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed font-light select-text">
                {currentChapter.content}
              </p>
            </div>

            {/* Bottom beautiful aesthetic quote with horizontal divider matching Lauf */}
            <div className="pt-6">
              <span className="font-serif text-[13px] sm:text-[14px] text-neutral-800 italic leading-snug block select-text font-medium">
                "{currentChapter.quote}"
              </span>
              <div className="w-16 h-[2px] bg-neutral-900 mt-4" />
            </div>

          </div>

          {/* Overlapping Offset Collage Column */}
          <div className="md:col-span-7 w-full pt-4 md:pt-0 pb-16 relative">
            <div className="relative w-full max-w-[580px] mx-auto md:ml-auto">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeChapterId}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="relative w-full"
                >
                  {/* Large main offset horizontal picture */}
                  <div className="w-[88%] aspect-[1.45] overflow-hidden rounded-xs border border-stone-200 shadow-[0_12px_44px_rgba(0,0,0,0.06)] relative bg-[#F7F5F0]">
                    <img 
                      src={currentChapter.mainImage} 
                      alt={currentChapter.heading} 
                      className="w-full h-full object-cover filter brightness-[0.94] contrast-[1.02]"
                    />
                  </div>

                  {/* Smaller overlapping vertical/portrait portrait picture lower right */}
                  <div className="absolute right-0 bottom-[-16%] w-[45%] aspect-[0.8] rounded-xs border-[9px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.14)] overflow-hidden bg-[#FAF5EE] z-20">
                    <img 
                      src={currentChapter.subImage} 
                      alt={`${currentChapter.heading} detailed perspective`} 
                      className="w-full h-full object-cover filter brightness-[0.96]"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Sophisticated downward pointing arrow helper from Lauf screenshot */}
              <div className="absolute left-4 bottom-[-10%] flex items-center gap-1.5 opacity-40 select-none z-10 pointer-events-none">
                <span className="font-mono text-[9px] font-bold text-neutral-800 tracking-wider">SCROLL</span>
                <span className="text-xs">&darr;</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
