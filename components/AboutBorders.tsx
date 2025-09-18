"use client";

import React from "react";
import { motion } from "framer-motion";

interface AboutBordersProps {
  hasInitialLoaded: boolean;
  isMobile: boolean;
}

const AboutBorders: React.FC<AboutBordersProps> = ({ hasInitialLoaded, isMobile }) => {
  return (
    <>
      {/* ABOUT CONTENT LEFT BORDER: Left boundary of about text content
          - Positioned at left edge of content box (left: 0)
          - Extends full height of content area (top: 0 to bottom: 0)
          - Creates left edge of the about text container
          - Static on subsequent loads, animated top-to-bottom on initial load (0.5s delay) */}
      {!isMobile && (
        <>
          {hasInitialLoaded ? (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: '1px',
                background: 'var(--border)',
                zIndex: 0
              }}
            />
          ) : (
            <motion.div
              initial={{ scaleY: 0, transformOrigin: 'top' }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: '1px',
                background: 'var(--border)',
                zIndex: 0
              }}
            />
          )}
        </>
      )}
      
      {/* ABOUT CONTENT RIGHT BORDER: Right boundary of about text content
          - Positioned at right edge of content box (right: 0)
          - Extends full height of content area (top: 0 to bottom: 0)
          - Creates right edge of the about text container
          - Static on subsequent loads, animated top-to-bottom on initial load (0.55s delay) */}
      {!isMobile && (
        <>
          {hasInitialLoaded ? (
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: '1px',
                background: 'var(--border)',
                zIndex: 0
              }}
            />
          ) : (
            <motion.div
              initial={{ scaleY: 0, transformOrigin: 'top' }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.55 }}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: '1px',
                background: 'var(--border)',
                zIndex: 0
              }}
            />
          )}
        </>
      )}
      
      {/* ABOUT CONTENT BOTTOM BORDER: Bottom boundary of about text content
          - Positioned at bottom of content box (bottom: 0)
          - Spans full width of content area (width: 100%)
          - Creates bottom edge of the about text container
          - Static on subsequent loads, animated left-to-right on initial load (0.9s delay) */}
      <>
        {hasInitialLoaded ? (
          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: 'calc(100vw - 877.5px)',
              height: '1px',
              background: 'var(--border)',
              zIndex: 0
            }}
          />
        ) : (
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: 'calc(100vw - 877.5px)' }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.9 }}
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              height: '1px',
              background: 'var(--border)',
              zIndex: 0
            }}
          />
        )}
      </>
    </>
  );
};

export default AboutBorders;