/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [text, setText] = useState('');
  const fullText = 'SOUL VIVA';

  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < fullText.length) {
        setText(fullText.slice(0, currentIdx + 1));
        currentIdx++;
      } else {
        clearInterval(interval);
      }
    }, 120); // ~1s to type fully

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Complete loading screen after 2.3 seconds
    const timeout = setTimeout(() => {
      onLoadingComplete();
    }, 2300);

    return () => clearTimeout(timeout);
  }, [onLoadingComplete]);

  return (
    <motion.div
      id="loading-screen"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-light text-brand-dark"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className="flex flex-col items-center justify-center relative select-none">
        <h1 className="font-sans text-4xl sm:text-5xl font-light tracking-[0.45em] uppercase text-brand-dark flex items-center pl-[0.45em]">
          <span>{text}</span>
          <motion.span
            className="w-[2px] h-8 sm:h-10 bg-brand-dark/80 ml-2 inline-block"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
          />
        </h1>
      </div>
    </motion.div>
  );
}
