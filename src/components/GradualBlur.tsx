"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';

interface GradualBlurProps {
  position?: 'top' | 'bottom';
  strength?: number; // Blur intensity in rem
  height?: string;   // Height of the blur area below the header
  divCount?: number; // Number of layered divs for smooth gradient transition
  zIndex?: number;   // zIndex layering
}

export default function GradualBlur({
  position = 'top',
  strength = 1.8,
  height = '6rem', // Height of the blur fade zone
  divCount = 6,
  zIndex = 39, // Just below Header (z-40)
}: GradualBlurProps) {
  const blurDivs = useMemo(() => {
    const divs = [];
    const increment = 100 / divCount;
    // 'to top' means bottom is 0% (clear/transparent) and top is 100% (blurry/opaque)
    const direction = position === 'top' ? 'to top' : 'to bottom';

    for (let i = 1; i <= divCount; i++) {
      const progress = i / divCount;
      const curvedProgress = progress * progress * (3 - 2 * progress); // smoothstep
      const blurValue = curvedProgress * strength;

      const p1 = Math.round((increment * (i - 1)) * 10) / 10;
      const p2 = Math.round(increment * i * 10) / 10;
      const p3 = Math.round((increment * i + increment) * 10) / 10;

      // Mask gradient sequence to blend smoothly
      let gradient = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) {
        gradient += `, black ${p3}%`;
      }

      // Parent handles masking to avoid Chrome's compositing limitation with backdrop-filter + mask-image on same element
      const parentStyle: React.CSSProperties = {
        position: 'absolute',
        inset: 0,
        maskImage: `linear-gradient(${direction}, ${gradient})`,
        WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
        pointerEvents: 'none',
      };

      // Child handles backdrop-filter with a subtle semi-transparent background to force browser compositing
      const childStyle: React.CSSProperties = {
        position: 'absolute',
        inset: 0,
        backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        background: 'rgba(245, 242, 235, 0.08)', // Matches #F5F2EB with opacity to allow blur rendering
        pointerEvents: 'none',
      };

      divs.push(
        <div key={i} style={parentStyle}>
          <div style={childStyle} />
        </div>
      );
    }
    return divs;
  }, [position, strength, divCount]);

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    left: 0,
    right: 0,
    height: height,
    pointerEvents: 'none',
    zIndex: zIndex,
    // Shift top position by 5rem (80px) to start exactly at the bottom of the Header
    top: position === 'top' ? '5rem' : undefined,
    bottom: position === 'bottom' ? 0 : undefined,
  };

  return (
    <div style={containerStyle} className="w-full overflow-hidden">
      {blurDivs}
    </div>
  );
}
