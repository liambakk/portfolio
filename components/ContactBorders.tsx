"use client";

import React from "react";
import { motion } from "framer-motion";

interface ContactBordersProps {
  hasInitialLoaded: boolean;
  isMobile: boolean;
}

const ContactBorders: React.FC<ContactBordersProps> = ({ hasInitialLoaded, isMobile }) => {
  return (
    <>
      
      {/* CONTACT CONTENT BORDERS: Combined outline of contact information box
          - Creates left, right, and bottom borders in a single div
          - Forms complete rectangular outline around contact content
          - Static on subsequent loads, animated sequentially on initial load */}
      {!isMobile && (
        <>
          {hasInitialLoaded ? (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                border: '1px solid var(--border)',
                borderTop: 'none',
                zIndex: 0
              }}
            />
          ) : (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
              {/* Left border */}
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
                  background: 'var(--border)'
                }}
              />
              {/* Right border */}
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
                  background: 'var(--border)'
                }}
              />
              {/* Bottom border - connects left and right */}
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: 'calc(100vw - 877.5px)' }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.9 }}
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  height: '1px',
                  background: 'var(--border)'
                }}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ContactBorders;