/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Droplets, Sparkles, Wand2, ShieldCheck } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const RUNNING_PHRASES = [
  'Triple-purifying raw vegetable glycerin...',
  'Extracting Supercritical CO2 botanical oils...',
  'Assembling high-viscosity moisture lock matrix...',
  'Calibrating pH neutrality (optimal 5.5)...',
  'Optical transparency verified. Enjoy the Sanctity.'
];

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    // Progress counter
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Speed up initially, slowdown towards the end for realism
        const increment = prev < 50 ? Math.random() * 8 + 4 : Math.random() * 3 + 1;
        return Math.min(Math.round(prev + increment), 100);
      });
    }, 120);

    return () => clearInterval(progressInterval);
  }, []);

  // Phrase rotator
  useEffect(() => {
    if (progress >= 100) {
      setPhraseIndex(4);
      // Wait a moment and then complete
      const timeout = setTimeout(onLoadingComplete, 1200);
      return () => clearTimeout(timeout);
    }

    if (progress > 80) setPhraseIndex(3);
    else if (progress > 50) setPhraseIndex(2);
    else if (progress > 20) setPhraseIndex(1);
  }, [progress, onLoadingComplete]);

  // Icon corresponding to the loading step
  const getStepIcon = () => {
    switch (phraseIndex) {
      case 0:
        return <Droplets className="w-5 h-5 text-sky-400 animate-pulse" />;
      case 1:
        return <Wand2 className="w-5 h-5 text-purple-400 animate-pulse" />;
      case 2:
        return <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />;
      case 3:
        return <ShieldCheck className="w-5 h-5 text-emerald-400 animate-pulse" />;
      default:
        return <Sparkles className="w-5 h-5 text-teal-300 animate-pulse" />;
    }
  };

  return (
    <motion.div
      id="loading-screen"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-light text-brand-dark"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Decorative ambient blurred backdrops */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[25%] left-[25%] w-[45vw] h-[45vw] rounded-full bg-sky-100/40 blur-3xl mix-blend-multiply animate-slow-pan" />
        <div className="absolute bottom-[25%] right-[25%] w-[35vw] h-[35vw] rounded-full bg-amber-100/30 blur-3xl mix-blend-multiply animate-slow-pan" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative flex flex-col items-center max-w-md px-6 text-center z-10 w-full">
        {/* Transparent floating bar visual representation */}
        <div className="relative mb-16 w-48 h-32 flex items-center justify-center">
          {/* Water rings background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border border-sky-200/40 animate-ripple" style={{ animationDelay: '0s' }} />
            <div className="w-40 h-40 rounded-full border border-teal-200/30 animate-ripple" style={{ animationDelay: '1s' }} />
            <div className="w-40 h-40 rounded-full border border-purple-200/20 animate-ripple" style={{ animationDelay: '2s' }} />
          </div>

          {/* Crystalline Glass bar representing Soul Viva */}
          <motion.div
            className="w-32 h-20 rounded-2xl glass shadow-[0_20px_50px_rgba(56,189,248,0.15)] flex flex-col items-center justify-center border border-white/60 relative p-1 cursor-default"
            initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
            animate={{ scale: 1.05, rotate: 2, opacity: 0.95 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            {/* Gloss reflection line */}
            <div className="absolute top-1 left-2 right-2 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent rounded-full" />
            <span className="font-sans text-[10px] tracking-[0.3em] font-light text-brand-dark/70">SOUL VIVA</span>
            <div className="absolute bottom-1 right-2 w-1.5 h-1.5 rounded-full bg-sky-400/40 blur-[1px]" />
          </motion.div>
        </div>

        {/* Brand Name */}
        <motion.h1
          className="font-sans text-3xl font-light tracking-[0.4em] uppercase text-brand-dark mb-4 pl-[0.4em]"
          initial={{ letterSpacing: '0.2em', opacity: 0 }}
          animate={{ letterSpacing: '0.4em', opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          SOUL VIVA
        </motion.h1>

        {/* Minimal Divider */}
        <div className="w-16 h-[1px] bg-brand-dark/15 mb-8" />

        {/* Loading details */}
        <div className="h-6 flex items-center justify-center gap-2 mb-6 text-xs text-brand-dark/60 font-mono">
          {getStepIcon()}
          <motion.span
            key={phraseIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {RUNNING_PHRASES[phraseIndex]}
          </motion.span>
        </div>

        {/* Progress bar container */}
        <div className="w-56 h-[2px] bg-neutral-200/60 rounded-full overflow-hidden mb-2 relative">
          <motion.div
            className="h-full bg-brand-dark transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <span className="font-mono text-xs font-light text-brand-dark/40 tracking-wider">
          {progress}%
        </span>
      </div>
    </motion.div>
  );
}
