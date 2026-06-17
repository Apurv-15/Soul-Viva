/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Leaf, Droplet, Facebook, Instagram, ChevronDown } from 'lucide-react';

export default function BrandIntro() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  return (
    <section 
      id="brand-intro-section" 
      className="pt-12 pb-20 md:pt-16 md:pb-24 bg-[#FAF8F5] text-[#2D3A2F] relative overflow-hidden font-sans border-b border-[#E5DEC1]/30"
    >
      {/* Background Soft Organic Glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#E5DEC1]/10 rounded-full blur-3xl pointer-events-none animate-slow-pan" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#EAD9EC]/8 animate-float rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
        >
          {/* Left Column: Typographic Hook */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-5 flex flex-col space-y-8 text-left"
          >
            {/* Header Block */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#2D3A2F]" />
                <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#2D3A2F] uppercase">
                  Who We Are
                </span>
              </div>
              
              <div className="space-y-4">
                <h2 className="font-serif text-[48px] sm:text-[60px] md:text-[72px] lg:text-[76px] font-normal leading-[0.95] tracking-tight uppercase select-none">
                  SOUL VIVA
                </h2>
                <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#2D3A2F]/90 font-normal leading-tight">
                  Transforming everyday bathing into a ritual of renewal.
                </p>
              </div>

              {/* Social Links under the text */}
              <div className="flex items-center gap-4 pt-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61590660097743"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 rounded-full border border-[#2D3A2F]/15 text-[#2D3A2F]/70 hover:text-black hover:border-black/50 transition-all duration-300 bg-white/40 hover:bg-white/90 shadow-2xs hover:shadow-xs"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/soulviva.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 rounded-full border border-[#2D3A2F]/15 text-[#2D3A2F]/70 hover:text-black hover:border-black/50 transition-all duration-300 bg-white/40 hover:bg-white/90 shadow-2xs hover:shadow-xs"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High Hierarchy Story Cards */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-7 flex flex-col space-y-6 lg:ml-auto w-full"
          >
            {/* Story Card 1: Inspired by Nature */}
            <div className="bg-[#F5F2EB] border border-[#E5DEC1]/60 rounded-[28px] p-6 md:p-8 shadow-xs hover:shadow-md hover:border-[#2D3A2F]/30 transition-all duration-300 flex flex-col space-y-4 text-left">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-white text-[#2D3A2F] border border-[#E5DEC1]/60">
                  <Leaf className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <h4 className="font-serif italic text-xl md:text-2xl text-[#2D3A2F] font-semibold">
                  Inspired by Nature
                </h4>
              </div>
              <p className="font-sans text-[15px] sm:text-base text-neutral-600 leading-relaxed font-light">
                Crafted with natural extracts — mandarin, lavender, sea minerals, honey, shea, and more — each bar goes beyond cleansing. The skin-loving ingredients work with the glycerin-rich base to leave skin moisturised, nourished, and alive.
              </p>
            </div>

            {/* Story Card 2: Crafted for Skin */}
            <div className="bg-[#F5F2EB] border border-[#E5DEC1]/60 rounded-[28px] p-6 md:p-8 shadow-xs hover:shadow-md hover:border-[#2D3A2F]/30 transition-all duration-300 flex flex-col space-y-4 text-left">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-white text-[#2D3A2F] border border-[#E5DEC1]/60">
                  <Droplet className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <h4 className="font-serif italic text-xl md:text-2xl text-[#2D3A2F] font-semibold">
                  Crafted for Skin
                </h4>
              </div>
              <p className="font-sans text-[15px] sm:text-base text-neutral-600 leading-relaxed font-light">
                Six variants, each a different world: a burst of colour, a fragrance that transports, a lather that genuinely cares for skin. A product that gives consumers not just freshness and care, but something rarer: a reason to feel joy in the ordinary.
              </p>
            </div>

            {/* Story Card 3: Designed for Experience */}
            <div className="bg-[#F5F2EB] border border-[#E5DEC1]/60 rounded-[28px] p-6 md:p-8 shadow-xs hover:shadow-md hover:border-[#2D3A2F]/30 transition-all duration-300 flex flex-col space-y-4 text-left">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-white text-[#2D3A2F] border border-[#E5DEC1]/60">
                  <Sparkles className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <h4 className="font-serif italic text-xl md:text-2xl text-[#2D3A2F] font-semibold">
                  Designed for Experience
                </h4>
              </div>
              <p className="font-sans text-[15px] sm:text-base text-neutral-600 leading-relaxed font-light">
                Every day, millions of people step into the shower for a moment that is entirely their own. Soul Viva is built around that moment — transforming a daily routine into a sensory escape inspired by nature and emotion.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div 
        onClick={() => {
          const nextSection = document.getElementById('our-story-section') || document.getElementById('catalog-section');
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 cursor-pointer group bg-white/60 hover:bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-[#E5DEC1]/50 shadow-xs transition-all duration-300 active:scale-95 select-none"
      >
        <span className="text-[10px] tracking-[0.25em] text-[#2D3A2F] uppercase font-sans font-bold transition-colors duration-300">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="text-[#2D3A2F]"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </div>
    </section>
  );
}
