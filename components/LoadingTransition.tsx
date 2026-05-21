"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingTransitionProps {
  isLoading: boolean;
}

const LoadingTransition: React.FC<LoadingTransitionProps> = ({ isLoading }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [textOpacity, setTextOpacity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
  }, []);

  useEffect(() => {
    if (isLoading) {
      setShowOverlay(true);
      setTextOpacity(1);
    } else {
      // Drop the overlay immediately on isLoading=false; AnimatePresence handles the exit fade.
      setShowOverlay(false);
    }
  }, [isLoading]);

  return (
    <AnimatePresence mode="wait">
      {showOverlay && (
        <motion.div
          key="loading-overlay"
          className="loading-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            minHeight: '-webkit-fill-available', // For iOS Safari
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1a1a1a',
            pointerEvents: isLoading ? 'auto' : 'none',
            touchAction: 'none', // Prevent scrolling on mobile
          }}
        >
          <motion.div
            className="loading-text-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: textOpacity }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* Outlined text (unfilled) */}
            <h1
              className="loading-name-outline"
              style={{
                fontSize: isMobile ? '60px' : '120px',
                fontWeight: 400,
                letterSpacing: isMobile ? '-2px' : '-4px',
                lineHeight: 1,
                color: 'transparent',
                WebkitTextStroke: '1px #ffffff',
                margin: 0,
                position: 'relative',
                zIndex: 2,
              }}
            >
              Liam Bakker
            </h1>
            
            {/* Filled text with mask */}
            <motion.div
              className="loading-fill-wrapper"
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: isLoading ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
              transition={{ 
                duration: 0.8, 
                ease: "easeInOut",
                delay: isLoading ? 0.2 : 0
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
              }}
            >
              <h1
                className="loading-name-filled"
                style={{
                  fontSize: isMobile ? '60px' : '120px',
                  fontWeight: 400,
                  letterSpacing: isMobile ? '-2px' : '-4px',
                  lineHeight: 1,
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                Liam Bakker
              </h1>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingTransition;