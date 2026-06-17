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
      className="min-h-screen w-full flex items-center justify-center pt-28 pb-28 md:pt-36 md:pb-36 bg-[#FAF8F5] text-[#2D3A2F] relative overflow-hidden font-sans border-b border-[#E5DEC1]/30"
    >
      {/* Background Soft Organic Glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#E5DEC1]/10 rounded-full blur-3xl pointer-events-none animate-slow-pan" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#EAD9EC]/8 animate-float rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left Column: Typographic Hook and Brand Philosophy Editorial */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-6 flex flex-col space-y-10 text-left"
          >
            {/* Header Block */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-10 h-[1px] bg-[#2D3A2F]" />
                <span className="text-xs md:text-sm font-bold tracking-[0.3em] text-[#2D3A2F] uppercase">
                  Who We Are
                </span>
              </div>
              
              <div className="space-y-4">
                <h2 className="font-serif text-[54px] sm:text-[68px] md:text-[80px] lg:text-[88px] font-normal leading-[0.95] tracking-tight uppercase select-none">
                  SOUL VIVA
                </h2>
              </div>
            </div>

            {/* Editorial Copy */}
            <div className="space-y-8 font-sans text-[17px] sm:text-[19px] md:text-[21px] text-neutral-700 leading-[1.8] font-light">
              <p>
                Every day, millions of people step into the shower for a moment that is entirely their own. Soul Viva is built around that moment — transforming a daily routine into a sensory escape inspired by nature and emotion.
              </p>
              <p>
                Six variants, each a different world: a burst of colour, a fragrance that transports, a lather that genuinely cares for skin. A product that gives consumers not just freshness and care, but something rarer: a reason to feel joy in the ordinary. To feel fresh. To feel alive.
              </p>
              <p>
                Crafted with natural extracts — mandarin, lavender, sea minerals, honey, shea, and more — each bar goes beyond cleansing. The skin-loving ingredients work with the glycerin-rich base to leave skin moisturised, nourished, and alive.
              </p>
            </div>

            {/* Social Links under the text */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href="https://www.facebook.com/profile.php?id=61590660097743"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full border border-[#2D3A2F]/15 text-[#2D3A2F]/70 hover:text-black hover:border-black/50 transition-all duration-300 bg-white/40 hover:bg-white/90 shadow-2xs hover:shadow-xs"
                aria-label="Facebook"
              >
                <Facebook className="w-5.5 h-5.5" />
              </a>
              <a
                href="https://www.instagram.com/soulviva.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full border border-[#2D3A2F]/15 text-[#2D3A2F]/70 hover:text-black hover:border-black/50 transition-all duration-300 bg-white/40 hover:bg-white/90 shadow-2xs hover:shadow-xs"
                aria-label="Instagram"
              >
                <Instagram className="w-5.5 h-5.5" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Three Brand Pillars */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-6 flex flex-col space-y-8 lg:ml-auto w-full self-center"
          >
            {/* Pillar 1: Botanicals */}
            <div className="bg-[#F5F2EB] border border-[#E5DEC1]/60 rounded-[32px] p-8 md:p-10 shadow-xs hover:shadow-md hover:border-[#2D3A2F]/30 transition-all duration-300 flex flex-col space-y-4 text-left">
              <div className="flex items-center gap-5">
                <div className="p-3.5 rounded-2xl bg-white text-[#2D3A2F] border border-[#E5DEC1]/60">
                  <Leaf className="w-7 h-7 md:w-8 md:h-8" />
                </div>
                <h4 className="font-sans text-xl sm:text-2xl md:text-[26px] text-[#2D3A2F] font-bold tracking-tight">
                  Skin-Loving Botanicals
                </h4>
              </div>
              <p className="font-sans text-[16px] sm:text-[18px] text-neutral-650 leading-relaxed font-light">
                Natural extracts of skin-loving botanicals for nourishment.
              </p>
            </div>

            {/* Pillar 2: Fragrances */}
            <div className="bg-[#F5F2EB] border border-[#E5DEC1]/60 rounded-[32px] p-8 md:p-10 shadow-xs hover:shadow-md hover:border-[#2D3A2F]/30 transition-all duration-300 flex flex-col space-y-4 text-left">
              <div className="flex items-center gap-5">
                <div className="p-3.5 rounded-2xl bg-white text-[#2D3A2F] border border-[#E5DEC1]/60">
                  <Sparkles className="w-7 h-7 md:w-8 md:h-8" />
                </div>
                <h4 className="font-sans text-xl sm:text-2xl md:text-[26px] text-[#2D3A2F] font-bold tracking-tight">
                  Mood-Enlivening Fragrances
                </h4>
              </div>
              <p className="font-sans text-[16px] sm:text-[18px] text-neutral-650 leading-relaxed font-light">
                Delightful fresh fragrances to evoke freshness and enliven the mood.
              </p>
            </div>

            {/* Pillar 3: Glycerin-Rich */}
            <div className="bg-[#F5F2EB] border border-[#E5DEC1]/60 rounded-[32px] p-8 md:p-10 shadow-xs hover:shadow-md hover:border-[#2D3A2F]/30 transition-all duration-300 flex flex-col space-y-4 text-left">
              <div className="flex items-center gap-5">
                <div className="p-3.5 rounded-2xl bg-white text-[#2D3A2F] border border-[#E5DEC1]/60">
                  <Droplet className="w-7 h-7 md:w-8 md:h-8" />
                </div>
                <h4 className="font-sans text-xl sm:text-2xl md:text-[26px] text-[#2D3A2F] font-bold tracking-tight">
                  Glycerin-Rich Formula
                </h4>
              </div>
              <p className="font-sans text-[16px] sm:text-[18px] text-neutral-650 leading-relaxed font-light">
                Glycerin-Rich Formula for long-lasting skin moisturisation.
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 cursor-pointer group bg-white/60 hover:bg-white/90 backdrop-blur-md px-6 py-3 rounded-full border border-[#E5DEC1]/50 shadow-xs transition-all duration-300 active:scale-95 select-none"
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
