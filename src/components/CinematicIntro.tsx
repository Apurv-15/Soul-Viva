"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';

interface CinematicIntroProps {
  videoUrl: string;
  onComplete: () => void;
  onRevealStart: () => void;
}

export default function CinematicIntro({ videoUrl, onComplete, onRevealStart }: CinematicIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasEnded, setHasEnded] = useState(false);
  const hasEndedRef = useRef(false);
  const [maskActive, setMaskActive] = useState(false);
  const radius = useMotionValue(0);

  const handleRevealRef = useRef(() => {});

  handleRevealRef.current = () => {
    if (hasEndedRef.current) return; // Prevent multiple triggers
    hasEndedRef.current = true;
    setHasEnded(true);

    if (videoRef.current) {
      videoRef.current.pause(); // Freeze on last frame
    }

    // Freeze for 0.2s before expanding mask
    setTimeout(() => {
      setMaskActive(true);
      onRevealStart();
      animate(radius, 150, {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1], // ease-out cubic curve (Apple/Dior signature)
        onComplete: () => {
          onComplete();
        }
      });
    }, 200);
  };

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const timerStartedRef = useRef(false);

  // Lock scroll on mount
  useEffect(() => {
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleVideoPlaying = () => {
    if (!timerStartedRef.current) {
      timerStartedRef.current = true;
      timerRef.current = setTimeout(() => {
        handleRevealRef.current();
      }, 3000);
    }
  };

  const handleVideoEnded = () => {
    handleRevealRef.current();
  };

  const handleSkip = () => {
    handleRevealRef.current();
  };

  // Map radius (0 -> 150) to radial-gradient mask
  // Circle farthest-corner at center makes the gradient circular and covers the entire screen at 100%
  // Edge soft region from r% to (r+8)% creates the subtle motion blur effect
  const maskValue = useTransform(
    radius,
    (r) => `radial-gradient(circle farthest-corner at center, transparent ${r}%, rgba(0,0,0,0.4) ${r + 5}%, black ${r + 10}%)`
  );

  return (
    <motion.div
      className="fixed inset-0 w-screen h-screen z-50 bg-black overflow-hidden flex items-center justify-center select-none pointer-events-auto"
      style={{
        maskImage: maskActive ? maskValue : 'none',
        WebkitMaskImage: maskActive ? maskValue : 'none',
        willChange: 'mask-image, -webkit-mask-image',
      }}
    >
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          playsInline
          className="w-full h-full object-cover scale-100"
          onPlaying={handleVideoPlaying}
          onEnded={handleVideoEnded}
          style={{ pointerEvents: 'none' }}
        />
        
        {/* Skip button in bottom right */}
        {!hasEnded && (
          <button
            onClick={handleSkip}
            className="absolute bottom-8 right-8 z-50 bg-white/10 hover:bg-white/20 text-white font-sans text-xs tracking-widest uppercase px-6 py-3 rounded-full backdrop-blur-md border border-white/20 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            Skip Intro
          </button>
        )}
      </div>
    </motion.div>
  );
}
