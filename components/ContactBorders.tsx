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
      {/* CONTACT CONTENT LEFT BORDER: Left boundary of contact information box
          - Positioned at left edge of content box (left: 0)
          - Extends full height of content area (top: 0 to bottom: 0)
          - Creates left edge of the contact info container
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
          {/* Debug label for CONTACT CONTENT LEFT BORDER */}
          <div
            style={{
              position: 'absolute',
              left: '10px',
              top: '50px',
              color: 'red',
              fontSize: '12px',
              fontWeight: 'bold',
              background: 'white',
              padding: '2px 4px',
              zIndex: 20,
              whiteSpace: 'nowrap'
            }}
          >
            CONTACT CONTENT LEFT
          </div>
        </>
      )}
      
      {/* CONTACT CONTENT RIGHT BORDER: Right boundary of contact information box
          - Positioned at right edge of content box (right: 0)
          - Extends full height of content area (top: 0 to bottom: 0)
          - Creates right edge of the contact info container
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
          {/* Debug label for CONTACT CONTENT RIGHT BORDER */}
          <div
            style={{
              position: 'absolute',
              right: '10px',
              top: '50px',
              color: 'red',
              fontSize: '12px',
              fontWeight: 'bold',
              background: 'white',
              padding: '2px 4px',
              zIndex: 20,
              whiteSpace: 'nowrap'
            }}
          >
            CONTACT CONTENT RIGHT
          </div>
        </>
      )}
      
      {/* CONTACT CONTENT BOTTOM BORDER: Bottom boundary of contact information box
          - Positioned at bottom of content box (bottom: 0)
          - Spans full width of content area (width: 100%)
          - Creates bottom edge of the contact info container
          - Static on subsequent loads, animated left-to-right on initial load (0.9s delay) */}
      <>
        {hasInitialLoaded ? (
          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: 'calc(100% + 50vw)',
              height: '1px',
              background: 'var(--border)',
              zIndex: 0
            }}
          />
        ) : (
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: 'calc(100% + 50vw)' }}
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
        {/* Debug label for CONTACT CONTENT BOTTOM BORDER */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '10px',
            transform: 'translateX(-50%)',
            color: 'red',
            fontSize: '12px',
            fontWeight: 'bold',
            background: 'white',
            padding: '2px 4px',
            zIndex: 20,
            whiteSpace: 'nowrap'
          }}
        >
          CONTACT CONTENT BOTTOM
        </div>
      </>
    </>
  );
};

export default ContactBorders;