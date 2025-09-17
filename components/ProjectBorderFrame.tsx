"use client";

import React, { useState, useEffect, Fragment } from "react";
import { motion } from "framer-motion";

interface SectionBorder {
  top: number;
  hasTopBorder?: boolean;
  hasBottomBorder?: boolean;
}

interface ProjectBorderFrameProps {
  sections?: SectionBorder[];
  className?: string;
}

const ProjectBorderFrame: React.FC<ProjectBorderFrameProps> = ({
  sections = [],
  className = ""
}) => {
  const [hasInitialLoaded, setHasInitialLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasInitialLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`project-border-frame hidden lg:block ${className}`}
      style={{
        position: "absolute",
        left: "-70px",
        top: "52px",
        width: "calc(100% + 80px)",
        height: "100%",
        zIndex: 1
      }}
      aria-hidden="true"
    >
      {/* PROJECT FRAME LEFT BORDER: Left vertical border of main content frame */}
      {hasInitialLoaded ? (
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "1px",
          backgroundColor: "var(--border)"
        }} />
      ) : (
        <motion.div
          initial={{ scaleY: 0, transformOrigin: "top" }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "1px",
            backgroundColor: "var(--border)"
          }}
        />
      )}
      
      {/* PROJECT FRAME TOP BORDER: Top horizontal border of main content frame */}
      {hasInitialLoaded ? (
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          height: "1px",
          backgroundColor: "var(--border)"
        }} />
      ) : (
        <motion.div
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            height: "1px",
            backgroundColor: "var(--border)"
          }}
        />
      )}
      
      {/* PROJECT FRAME RIGHT BORDER: Right vertical border of main content frame */}
      {hasInitialLoaded ? (
        <div style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "1px",
          backgroundColor: "var(--border)"
        }} />
      ) : (
        <motion.div
          initial={{ scaleY: 0, transformOrigin: "top" }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "1px",
            backgroundColor: "var(--border)"
          }}
        />
      )}
      
      {/* PROJECT FRAME BOTTOM BORDER: Bottom horizontal border of main content frame */}
      {hasInitialLoaded ? (
        <div style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          right: 0,
          height: "1px",
          backgroundColor: "var(--border)"
        }} />
      ) : (
        <motion.div
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            right: 0,
            height: "1px",
            backgroundColor: "var(--border)"
          }}
        />
      )}
      
      {/* PROJECT FRAME INNER DIVIDER: Vertical separator between content and section headers */}
      {hasInitialLoaded ? (
        <div
          className="border-inner-vertical"
          style={{
            position: "absolute",
            right: "276px",
            top: "0",
            height: "100%",
            width: "1px",
            backgroundColor: "var(--border)",
            zIndex: 1
          }}
        />
      ) : (
        <motion.div
          className="border-inner-vertical"
          initial={{ scaleY: 0, transformOrigin: "top" }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.45 }}
          style={{
            position: "absolute",
            right: "276px",
            top: "0",
            height: "100%",
            width: "1px",
            backgroundColor: "var(--border)",
            zIndex: 1
          }}
        />
      )}


    </div>
  );
};

export default ProjectBorderFrame;