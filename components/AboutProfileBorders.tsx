"use client";

import React from "react";
import { motion } from "framer-motion";

interface AboutProfileBordersProps {
  hasInitialLoaded: boolean;
  isMobile: boolean;
}

const AboutProfileBorders: React.FC<AboutProfileBordersProps> = ({ hasInitialLoaded, isMobile }) => {
  if (isMobile) return null;

  return (
    <>
      {/* ABOUT VIEWPORT LEFT BORDER: Vertical line at left viewport edge
          - Positioned at far left of viewport (left: -50vw)
          - Extends from top of about section up past header area
          - Creates left boundary of entire about section layout
          - Static on subsequent loads, animated bottom-to-top on initial load (1.2s delay) */}
      <>
        {hasInitialLoaded ? (
          <div
            style={{
              position: 'absolute',
              left: '-50vw',
              top: '-280px',
              height: 'calc(100% + 580px)',
              width: '1px',
              background: 'var(--border)',
              zIndex: 0
            }}
          />
        ) : (
          <motion.div
            initial={{ scaleY: 0, transformOrigin: 'bottom' }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 1.2 }}
            style={{
              position: 'absolute',
              left: '-50vw',
              top: '-280px',
              height: 'calc(100% + 580px)',
              width: '1px',
              background: 'var(--border)',
              zIndex: 0
            }}
          />
        )}
      </>
    </>
  );
};

export default AboutProfileBorders;