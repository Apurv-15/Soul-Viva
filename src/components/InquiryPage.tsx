/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronDown } from 'lucide-react';

interface InquiryPageProps {
  onBackToHome?: () => void;
}

const COUNTRY_CODES = [
  { flag: '🇺🇸', code: '+1', name: 'United States' },
  { flag: '🇬🇧', code: '+44', name: 'United Kingdom' },
  { flag: '🇮🇳', code: '+91', name: 'India' },
  { flag: '🇨🇦', code: '+1', name: 'Canada' },
  { flag: '🇦🇺', code: '+61', name: 'Australia' },
  { flag: '🇫🇷', code: '+33', name: 'France' },
  { flag: '🇩🇪', code: '+49', name: 'Germany' },
  { flag: '🇯🇵', code: '+81', name: 'Japan' },
  { flag: '🇸🇬', code: '+65', name: 'Singapore' },
];

export default function InquiryPage({ onBackToHome }: InquiryPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [title, setTitle] = useState('');
  const [comments, setComments] = useState('');

  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setCompanyName('');
    setTitle('');
    setComments('');
    setSubmitted(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16 select-none bg-transparent">
      
      {/* Immersive Rounded Main Frame Outer Shell Layout matching user screenshot */}
      <div className="w-full bg-[#f4fbf9] rounded-[40px] border-[12px] border-white shadow-[0_24px_70px_rgba(139,115,85,0.06)] overflow-hidden flex flex-col md:flex-row min-h-[700px] relative">
        
        {/* LEFT COLUMN: Clean white inquiry block */}
        <div className="w-full md:w-1/2 p-6 sm:p-12 md:p-16 flex flex-col justify-between bg-[#f4fbf9] relative z-10">
          
          {/* Top Logo & Identity Banner */}
          <div className="space-y-6 text-center md:text-left mb-8 md:mb-0">
            {/* Elegant Jiffyboard-inspired custom floral logo */}
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <span className="font-sans text-2xl font-bold tracking-tight text-neutral-800 flex items-center gap-1.5">
                <span>J</span>
                <span className="relative inline-block w-6 h-6 -mt-1 select-none">
                  <svg className="w-6 h-6 text-[#5EC7B6] animate-spin-slow" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a1 1 0 0 1 1 1v2.1c1.9.2 3.5 1.2 4.4 2.8.5-.3 1-.5 1.6-.5a3 3 0 1 1 0 6H19a1 1 0 0 1-1-1v-2c0-1.7-1.3-3-3-3h-2v3h1c1.1 0 2 .9 2 2s-.9 2-2 2h-1v2c0 1.7 1.3 3 3 3h1a1 1 0 0 1 1 1v1.1a1 1 0 0 1-1 1c-1.9-.2-3.5-1.2-4.4-2.8-.5.3-1 .5-1.6.5a3 3 0 1 1 0-6h.1c0 1.7 1.3 3 3 3h2v-3h-1c-1.1 0-2-.9-2-2s.9-2 2-2h1v-2c0-1.7-1.3-3-3-3h-1A1 1 0 0 1  12 2z"/>
                  </svg>
                </span>
                <span>ffyboard</span>
              </span>
            </div>

            {/* Custom high end invitation headers */}
            <div className="space-y-2 mt-4">
              <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-neutral-800 tracking-tight leading-tight select-text">
                Please provide your contact information:
              </h2>
              <p className="font-sans text-sm font-medium text-neutral-500/90 tracking-wide select-text">
                Our team will reach out to you for a demo.
              </p>
            </div>
          </div>

          {/* Centered interaction workspace: card block containing custom inputs */}
          <div className="my-auto py-2">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="inquiry_form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-100 shadow-[0_12px_45px_rgba(94,199,182,0.05)] space-y-4"
                >
                  <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                    
                    {/* Name */}
                    <div>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        className="w-full text-sm font-medium text-neutral-800 bg-white border border-stone-200 hover:border-neutral-300 focus:border-[#5EC7B6] focus:ring-1 focus:ring-[#5EC7B6]/20 rounded-lg px-4 py-3 outline-none transition-colors"
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        className="w-full text-sm font-medium text-neutral-800 bg-white border border-stone-200 hover:border-neutral-300 focus:border-[#5EC7B6] focus:ring-1 focus:ring-[#5EC7B6]/20 rounded-lg px-4 py-3 outline-none transition-colors"
                      />
                    </div>

                    {/* Phone Row */}
                    <div className="flex gap-2 relative">
                      
                      {/* Flag Dropdown Indicator */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                          className="h-full flex items-center justify-between gap-1.5 bg-white border border-stone-200 hover:border-neutral-300 rounded-lg px-3 py-3 font-sans text-sm font-medium text-neutral-700 cursor-pointer min-w-[85px]"
                        >
                          <span className="text-lg leading-none">{selectedCountry.flag}</span>
                          <span className="text-neutral-600">{selectedCountry.code}</span>
                          <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${showCountryDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Custom absolute dropdown items with scroll */}
                        <AnimatePresence>
                          {showCountryDropdown && (
                            <>
                              {/* Overlay backing clicking outside */}
                              <div className="fixed inset-0 z-30" onClick={() => setShowCountryDropdown(false)} />
                              
                              <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 5 }}
                                className="absolute left-0 top-full mt-1 w-56 max-h-56 bg-white border border-stone-200 rounded-lg shadow-lg overflow-y-auto z-40 p-1 divide-y divide-stone-50"
                              >
                                {COUNTRY_CODES.map((item, idx) => (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => {
                                      setSelectedCountry(item);
                                      setShowCountryDropdown(false);
                                    }}
                                    className="w-full text-left font-sans text-xs flex items-center gap-2.5 px-3 py-2.5 hover:bg-stone-50 rounded-md text-neutral-700 hover:text-black transition-colors"
                                  >
                                    <span className="text-base select-none">{item.flag}</span>
                                    <span className="font-semibold text-neutral-900 w-10 text-right">{item.code}</span>
                                    <span className="text-neutral-500 truncate">{item.name}</span>
                                  </button>
                                ))}
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Phone Number Input */}
                      <div className="flex-grow">
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="201-555-0123"
                          className="w-full text-sm font-medium text-neutral-800 bg-white border border-stone-200 hover:border-neutral-300 focus:border-[#5EC7B6] focus:ring-1 focus:ring-[#5EC7B6]/20 rounded-lg px-4 py-3 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Company Name */}
                    <div>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Company Name"
                        className="w-full text-sm font-medium text-neutral-800 bg-white border border-stone-200 hover:border-neutral-300 focus:border-[#5EC7B6] focus:ring-1 focus:ring-[#5EC7B6]/20 rounded-lg px-4 py-3 outline-none transition-colors"
                      />
                    </div>

                    {/* Your Title */}
                    <div>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Your Title"
                        className="w-full text-sm font-medium text-neutral-800 bg-white border border-stone-200 hover:border-neutral-300 focus:border-[#5EC7B6] focus:ring-1 focus:ring-[#5EC7B6]/20 rounded-lg px-4 py-3 outline-none transition-colors"
                      />
                    </div>

                    {/* Comments */}
                    <div>
                      <textarea
                        rows={4}
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder="Comments"
                        className="w-full text-sm font-medium text-neutral-800 bg-white border border-stone-200 hover:border-neutral-300 focus:border-[#5EC7B6] focus:ring-1 focus:ring-[#5EC7B6]/20 rounded-lg px-4 py-3 outline-none transition-colors resize-y leading-relaxed"
                      />
                    </div>

                    {/* Submit Bar Button with mint green style from illustration screenshot */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSending}
                        className="w-full bg-[#5EC7B6] hover:bg-[#52B3A4] text-white font-sans text-sm font-bold py-4.5 px-6 rounded-xl cursor-pointer shadow-sm hover:shadow transition-all duration-300 active:scale-99 flex justify-center items-center gap-2 outline-none"
                      >
                        {isSending ? (
                          <>
                            <span className="w-4.5 h-4.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <span>Contact Me!</span>
                        )}
                      </button>
                    </div>

                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="inquiry_success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl p-8 sm:p-12 border border-neutral-100 shadow-[0_12px_45px_rgba(94,199,182,0.05)] text-center space-y-6 flex flex-col items-center justify-center min-h-[350px]"
                >
                  <div className="w-16 h-16 rounded-full bg-[#f4fbf9] border border-[#5EC7B6]/30 flex items-center justify-center text-[#5EC7B6] scale-in">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-sans text-xl font-extrabold text-neutral-800 tracking-tight select-text">
                      Thank You!
                    </h3>
                    <p className="font-sans text-sm text-neutral-500 leading-relaxed font-medium select-text max-w-sm">
                      We have received your enquiry, <strong>{name}</strong>. A dedicated representative will reach out to schedule your private demo with <strong>{companyName || 'your group'}</strong> shortly.
                    </p>
                  </div>

                  <button
                    onClick={handleReset}
                    className="font-sans text-xs font-bold tracking-wider uppercase text-[#5EC7B6] hover:text-[#4da394] px-6 py-2.5 border border-[#5EC7B6]/30 hover:border-[#5EC7B6] rounded-xl cursor-pointer transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Simple Clean footer anchor link */}
          <div className="pt-6 border-t border-stone-200/40 text-center md:text-left self-stretch">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="font-sans text-xs font-bold text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer block md:inline"
              >
                &larr; Return to Cosmetic Formulation Story
              </button>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: Splendid layout of solid mint background and highly faithful SVGs */}
        <div className="w-full md:w-1/2 bg-[#5EC7B6] relative overflow-hidden flex items-center justify-center min-h-[450px] md:min-h-[700px] select-none p-8">
          
          {/* Aesthetic stars & plus background decoration elements from user screenshot */}
          {/* Top-Right Big Star */}
          <div className="absolute top-[15%] right-[10%] opacity-84 text-white z-0 pointer-events-none">
            <svg className="w-7 h-7 text-white/95 filter drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z"/>
            </svg>
          </div>
          
          {/* Mid-Left small Star */}
          <div className="absolute top-[30%] left-[10%] opacity-80 text-white z-0 pointer-events-none">
            <svg className="w-4 h-4 text-white/95" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z"/>
            </svg>
          </div>

          {/* Bottom Star */}
          <div className="absolute bottom-[28%] right-[20%] opacity-90 text-white z-0 pointer-events-none">
            <svg className="w-5 h-5 text-white/95" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z"/>
            </svg>
          </div>

          {/* Solid sun dot bottom right */}
          <div className="absolute bottom-[10%] right-[10%] w-10.5 h-10.5 rounded-full bg-[#fcd116] pointer-events-none z-0" />

          {/* Bottom Star near bottom edge */}
          <div className="absolute bottom-[4%] left-[12%] opacity-80 text-white z-0 pointer-events-none">
            <svg className="w-3 h-3 text-white/95" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z"/>
            </svg>
          </div>

          {/* Black Bold Plus symbol overlays */}
          <span className="absolute top-[12%] left-[8%] text-neutral-800 text-[24px] font-bold tracking-tighter select-none pointer-events-none">+</span>
          <span className="absolute top-[23%] left-[62%] text-neutral-800 text-[28px] font-bold tracking-tighter select-none pointer-events-none">+</span>
          <span className="absolute bottom-[36%] right-[15%] text-neutral-800 text-[28px] font-bold tracking-tighter select-none pointer-events-none">+</span>

          {/* Tiny white circle/spark decoration */}
          <div className="absolute top-[32%] left-[20%] w-1.5 h-1.5 rounded-full bg-white opacity-90 pointer-events-none" />

          {/* Bottom-left dotted pixel art grid (exact 11x5 rows matrix of small dots) */}
          <div className="absolute bottom-[12%] left-[15%] grid grid-cols-11 gap-1.5 opacity-80 z-0 pointer-events-none">
            {Array.from({ length: 55 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-[#4AA697] rounded-full" />
            ))}
          </div>

          {/* 3. CENTRAL VECTOR ILLUSTRATION MATCHING USER SCREENSHOT */}
          <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center z-10 p-4">
            
            {/* Center yellow envelope (scaled & placed) */}
            <motion.div 
              className="relative w-76 h-56 mt-16 select-none pointer-events-none"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            >
              {/* Outer Envelope base background & shade */}
              <div className="absolute inset-0 bg-[#ffd653] rounded-[16px] border-[5px] border-neutral-800 shadow-[0_12px_24px_rgba(0,0,0,0.06)] overflow-hidden">
                {/* Internal letter paper card peeking */}
                <div className="absolute -top-[55%] left-[8%] right-[8%] h-[120%] bg-[#fffae8] rounded-[8px] border-[5px] border-neutral-800 p-5 flex flex-col justify-end space-y-2.5 z-10 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
                  {/* Three dynamic dark lines peaking representing content list */}
                  <div className="w-[85%] h-1.5 bg-neutral-800 rounded-full" />
                  <div className="w-[90%] h-1.5 bg-neutral-800 rounded-full" />
                  <div className="w-[50%] h-1.5 bg-neutral-800 rounded-full" />
                </div>

                {/* Left flat diagonal tab fold fold vector */}
                <div 
                  className="absolute bottom-0 left-0 w-1/2 h-full bg-[#fbc634] border-t-[5px] border-neutral-800 origin-bottom-left"
                  style={{ transform: 'skewY(30deg)' }}
                />

                {/* Right flat diagonal tab fold fold vector */}
                <div 
                  className="absolute bottom-0 right-0 w-1/2 h-full bg-[#fbc634] border-t-[5px] border-neutral-800 origin-bottom-right"
                  style={{ transform: 'skewY(-30deg)' }}
                />

                {/* bottom boundary shadow tab */}
                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-[#efbc29] border-t-[5px] border-neutral-800 z-10" />
              </div>
            </motion.div>

            {/* Left side hovering yellow Avatar person silhouette sticker */}
            <motion.div 
              className="absolute top-[35%] left-[6%] w-[42px] h-[42px] bg-[#ffd653] border-4 border-neutral-800 rounded-xl overflow-hidden z-20 flex flex-col items-center justify-end shadow-md"
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.5 }}
            >
              {/* Head orb */}
              <div className="w-[15px] h-[15px] rounded-full bg-neutral-800 mb-0.5 border-2 border-[#ffd653]" />
              {/* Shoulder base */}
              <div className="w-[30px] h-[16px] bg-neutral-800 rounded-t-lg" />
            </motion.div>

            {/* Top-Right pink stylized flyaway paper airplane from screenshot */}
            <motion.div 
              className="absolute top-[5%] right-[0%] w-36 h-36 z-20 pointer-events-none"
              animate={{ 
                x: [0, 2, 0], 
                y: [0, -3, 0]
              }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
            >
              <svg className="w-full h-full filter drop-shadow-md" viewBox="0 0 100 100" fill="none">
                {/* 3 speed tail dashes */}
                <path d="M12 68 L24 62 M18 78 L30 72 M26 86 L38 80" stroke="#1F2937" strokeWidth="4.5" strokeLinecap="round" />
                
                {/* Paper airplane body paths */}
                {/* Left wing shaded */}
                <path d="M85 24 L22 55 L58 60 Z" fill="#eb4d80" stroke="#1F2937" strokeWidth="5.5" strokeLinejoin="round" />
                {/* Right wing main body folded */}
                <path d="M85 24 L58 60 L68 76 L74 62 Z" fill="#fc5c9c" stroke="#1F2937" strokeWidth="5.5" strokeLinejoin="round" />
                {/* fold edge crease */}
                <path d="M85 24 L58 60" stroke="#1F2937" strokeWidth="5.5" strokeLinejoin="round" />
              </svg>
            </motion.div>

          </div>

        </div>

      </div>

      {/* COMMERCIAL & EXPORT SPECIFICATIONS MODULE */}
      <div className="mt-16 space-y-12">
        <div className="text-center md:text-left space-y-3">
          <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-neutral-400 uppercase block select-none">
            B2B OPERATIONS & SPECIFICATIONS
          </span>
          <h2 className="font-sans text-2xl md:text-4xl font-light tracking-tight text-[#2D5A56] leading-none">
            Commercial & Export Information
          </h2>
          <p className="font-sans text-xs md:text-sm text-neutral-500 font-light max-w-2xl leading-relaxed">
            Direct access to our micro-batch contract logistics, certified standards, and regulatory documentation.
          </p>
        </div>

        {/* Specs bento grids */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
          
          {/* Card A: Product & Logistics Specifications */}
          <div className="bg-white rounded-[24px] p-8 border border-neutral-250/50 shadow-sm space-y-6">
            <h3 className="font-sans text-lg font-semibold text-neutral-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5EC7B6]" />
              Product Technical Specs
            </h3>
            
            <div className="divide-y divide-neutral-100 font-sans text-xs leading-relaxed">
              <div className="py-3 flex justify-between items-center">
                <span className="text-neutral-400 font-light">Bar Type</span>
                <span className="text-neutral-850 font-semibold text-right">Glycerin-rich transparent gel bar (Melt & Pour)</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-neutral-400 font-light">Skin Type Compatibility</span>
                <span className="text-neutral-850 font-semibold text-right font-medium">All skin types</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-neutral-400 font-light">Packaging Assembly</span>
                <span className="text-neutral-850 font-semibold text-right">Flow wrapped soap bars, each in monocarton</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-neutral-400 font-light">Net Packed Weight</span>
                <span className="text-neutral-850 font-semibold text-right">100g per unit</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-neutral-400 font-light">Shelf Life Stability</span>
                <span className="text-neutral-850 font-semibold text-right">24 Months</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-neutral-400 font-light">Units per Standard Carton</span>
                <span className="text-neutral-850 font-semibold text-right">48 units (8 shrink packs of 6)</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-neutral-400 font-light">Pallet Loadability Limit</span>
                <span className="text-neutral-850 font-semibold text-right">5,760 pcs / pallet</span>
              </div>
              <div className="py-3 flex flex-col gap-2 pt-4">
                <span className="text-neutral-400 font-light">Sought-after Formulations Claims</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Dermatologically tested', 'Cruelty Free', 'Paraben Free', 'Silicon Free', '100% Natural Extracts'].map((claim) => (
                    <span key={claim} className="bg-neutral-100 text-neutral-600 font-medium px-2.5 py-1 rounded-md text-[9px] tracking-wider uppercase font-semibold">
                      {claim}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card B: Export & Logistics Specifications */}
          <div className="bg-white rounded-[24px] p-8 border border-neutral-250/50 shadow-sm space-y-6">
            <h3 className="font-sans text-lg font-semibold text-neutral-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#fcd116]" />
              Export & Logistics Capabilities
            </h3>
            
            <div className="divide-y divide-neutral-100 font-sans text-xs leading-relaxed">
              <div className="py-3 flex justify-between items-center">
                <span className="text-neutral-400 font-light">Monthly Production Capacity</span>
                <span className="text-emerald-700 font-semibold text-right font-bold">750K units / month</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-neutral-400 font-light">First Order Lead Time</span>
                <span className="text-neutral-850 font-semibold text-right">45 Days in dispatch</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-neutral-400 font-light">Repeat Orders Lead Time</span>
                <span className="text-neutral-850 font-semibold text-right">30 Days in dispatch</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-neutral-400 font-light">Minimum Order Quantity (MOQ)</span>
                <span className="text-amber-800 font-semibold text-right font-bold">15,000 pcs / variant</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-neutral-400 font-light">Country of Origin</span>
                <span className="text-neutral-850 font-semibold text-right">India</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-neutral-400 font-light">Harmonized Tariff (HS Code)</span>
                <span className="text-neutral-850 font-mono text-right">3401</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-neutral-400 font-light">Standard Documentation</span>
                <span className="text-neutral-850 font-semibold text-right">INCI &bull; MSDS &bull; COA Available</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-neutral-400 font-light">Audit & Compliance Status</span>
                <span className="text-neutral-850 font-semibold flex items-center gap-1.5 text-right">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse inline-block" />
                  GMP Certified, FDA Approved
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Section: Manufacturing Facilities Allocation Details */}
        <div className="bg-[#f0f9f7] border border-[#dbece7] rounded-[32px] p-8 md:p-12 text-left space-y-8">
          <div className="space-y-2">
            <span className="font-sans text-[10px] tracking-widest font-bold text-neutral-400 uppercase block">PRODUCTION INFRASTRUCTURE</span>
            <h3 className="font-sans text-xl md:text-2xl font-light text-[#2D5A56]">Global-Scale Manufacturing Capabilities</h3>
            <p className="font-sans text-xs md:text-sm text-neutral-500 leading-relaxed font-light">
              SOUL VIVA is manufactured at state-of-the-art 3rd Party Manufacturing Facilities in India. Our partners are industry-renowned specialists in transparent soap formulation, implementing high-purity molding methods to deliver international export quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Factory 1 */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-150 shadow-xs space-y-3">
              <div className="flex justify-between items-start">
                <span className="font-sans text-[9px] tracking-widest uppercase font-bold text-[#5EC7B6]">Factory 1 (Maharashtra)</span>
                <span className="bg-[#f4fbf9] text-xs text-[#5EC7B6] font-mono px-2.5 py-0.5 rounded-full font-bold">250K / month</span>
              </div>
              <h4 className="font-sans text-sm font-semibold text-neutral-800">Clear Gel High-Viscosity Unit</h4>
              <p className="font-sans text-xs text-neutral-400 font-light leading-relaxed">
                Specialized in micro-molding technology, stabilizing the multi-pore crystallization network to yield a perfect waterlike translucency and smooth melt profile.
              </p>
            </div>

            {/* Factory 2 */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-150 shadow-xs space-y-3">
              <div className="flex justify-between items-start">
                <span className="font-sans text-[9px] tracking-widest uppercase font-bold text-[#5EC7B6]">Factory 2 (Himachal Pradesh)</span>
                <span className="bg-[#f4fbf9] text-xs text-[#5EC7B6] font-mono px-2.5 py-0.5 rounded-full font-bold">500K / month</span>
              </div>
              <h4 className="font-sans text-sm font-semibold text-neutral-800">High-Output Export Unit</h4>
              <p className="font-sans text-xs text-neutral-400 font-light leading-relaxed">
                Equipped with automatic sealed primary flow-pack monocarton facilities, offering speed with pristine microbiological security audits for world transport.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
