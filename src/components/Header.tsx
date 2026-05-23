/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Search, Menu, X, Landmark, SlidersHorizontal, BookOpen } from 'lucide-react';

interface HeaderProps {
  currentScreen: 'home' | 'range' | 'craft' | 'story' | 'inquire';
  setScreen: (screen: 'home' | 'range' | 'craft' | 'story' | 'inquire') => void;
  onOpenInquiry: () => void;
  onOpenSearch: () => void;
}

export default function Header({
  currentScreen,
  setScreen,
  onOpenInquiry,
  onOpenSearch,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'range', label: 'Range', icon: <SlidersHorizontal className="w-4 h-4 mr-2 md:hidden" /> },
    { id: 'craft', label: 'The Craft', icon: <Landmark className="w-4 h-4 mr-2 md:hidden" /> },
    { id: 'story', label: 'Our Story', icon: <BookOpen className="w-4 h-4 mr-2 md:hidden" /> },
  ] as const;

  const navigateTo = (screen: 'home' | 'range' | 'craft' | 'story' | 'inquire') => {
    setScreen(screen);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 w-full z-40 bg-white/60 dark:bg-black/60 backdrop-blur-xl border-b border-neutral-100 dark:border-neutral-900 transition-all duration-300">
      <div className="relative flex justify-between items-center px-6 md:px-20 h-20 w-full max-w-[1440px] mx-auto">
        
        {/* Left Links - Desktop */}
        <div className="hidden md:flex md:flex-1 items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`font-sans text-xs tracking-[0.18em] transition-all duration-300 pb-1 cursor-pointer border-b-2 hover:text-brand-dark hover:border-brand-dark/40 ${
                currentScreen === item.id
                  ? 'text-brand-dark border-brand-dark font-medium'
                  : 'text-neutral-500 border-transparent'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-brand-dark cursor-pointer p-1"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Center Logo */}
        <div className="md:absolute md:left-1/2 md:-translate-x-1/2 md:transform flex-shrink-0 flex justify-center">
          <button
            onClick={() => navigateTo('home')}
            className="font-sans text-[21px] tracking-[0.25em] font-light text-brand-dark cursor-pointer select-none pl-[0.25em] hover:opacity-80 transition-opacity"
          >
            SOUL VIVA
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-6 md:flex-1 md:justify-end">
          <button
            onClick={() => navigateTo('inquire')}
            className={`hidden md:block font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 pb-1 cursor-pointer border-b-2 hover:text-brand-dark hover:border-brand-dark/40 ${
              currentScreen === 'inquire'
                ? 'text-brand-dark border-brand-dark font-medium'
                : 'text-neutral-500 border-transparent'
            }`}
          >
            INQUIRE
          </button>

          <div className="flex items-center gap-4">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="text-brand-dark hover:scale-105 transition-transform duration-300 cursor-pointer p-1.5 rounded-full hover:bg-neutral-100/60"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide-down Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 glass shadow-xl border-t border-neutral-100/50 flex flex-col py-6 px-6 z-50 animate-slow-pan">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] tracking-widest font-semibold uppercase text-neutral-400 mb-2 border-b pb-1">
              Sanctuary Menu
            </span>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`flex items-center text-sm tracking-wider uppercase font-medium py-2.5 transition-colors ${
                  currentScreen === item.id ? 'text-brand-dark' : 'text-neutral-500'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <button
              onClick={() => navigateTo('inquire')}
              className={`flex items-center text-sm tracking-wider uppercase font-medium py-2.5 mt-2 border-t border-neutral-100/50 pt-4 cursor-pointer transition-colors ${
                currentScreen === 'inquire' ? 'text-brand-dark' : 'text-neutral-500 hover:text-brand-dark'
              }`}
            >
              Consult & Inquire
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
