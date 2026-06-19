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
        <h1 className="text-4xl sm:text-5xl uppercase text-brand-dark flex items-baseline pl-[0.45em]">
          {text.length > 0 && (
            <span className="font-serif font-normal">{text[0]}</span>
          )}
          {text.length > 1 && (
            <span className="font-sans font-light tracking-[0.45em] ml-1">{text.slice(1)}</span>
          )}
          <motion.span
            className="w-[2px] h-6 sm:h-8 bg-brand-dark/80 ml-1 inline-block"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
          />
        </h1>
      </div>
    </motion.div>
  );
}
