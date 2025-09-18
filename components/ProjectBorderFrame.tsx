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
    // Check if initial animations have already played
    const hasPlayedInitialAnimations = sessionStorage.getItem('hasPlayedInitialAnimations') === 'true';
    
    if (hasPlayedInitialAnimations) {
      setHasInitialLoaded(true);
    } else {
      const timer = setTimeout(() => {
        setHasInitialLoaded(true);
        sessionStorage.setItem('hasPlayedInitialAnimations', 'true');
      }, 1000);
      
      return () => clearTimeout(timer);
    }
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
      {/* VERTICAL LINE 9: Project frame left border
          Main structural left boundary of the entire project content frame.
          Positioned at left: 0 of the frame container (-70px from content),
          extending the full height from top to bottom. Creates the primary
          left edge that contains all project sections and content within the frame. */}
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
      
      {/* DEBUG LABEL: Left Border */}
      <div
        style={{
          position: "absolute",
          left: 5,
          top: 50,
          background: "#ff6b6b",
          color: "white",
          padding: "2px 6px",
          fontSize: "10px",
          fontFamily: "monospace",
          borderRadius: "3px",
          zIndex: 1000,
          whiteSpace: "nowrap"
        }}
      >
        LEFT BORDER
      </div>
      
      {/* PROJECT FRAME TOP BORDER: Top horizontal border of main content frame */}
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
      
      {/* DEBUG LABEL: Top Border */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 5,
          transform: "translateX(-50%)",
          background: "#4ecdc4",
          color: "white",
          padding: "2px 6px",
          fontSize: "10px",
          fontFamily: "monospace",
          borderRadius: "3px",
          zIndex: 1000,
          whiteSpace: "nowrap"
        }}
      >
        TOP BORDER
      </div>
      
      {/* VERTICAL LINE 10: Project frame right border
          Primary structural right boundary of the project content frame.
          Positioned at right: 0 of the frame container, spanning full height
          from top to bottom. Forms the rightmost containment edge for all
          project content, completing the rectangular frame structure. */}
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
      
      {/* DEBUG LABEL: Right Border */}
      <div
        style={{
          position: "absolute",
          right: 5,
          top: 50,
          background: "#9b59b6",
          color: "white",
          padding: "2px 6px",
          fontSize: "10px",
          fontFamily: "monospace",
          borderRadius: "3px",
          zIndex: 1000,
          whiteSpace: "nowrap"
        }}
      >
        RIGHT BORDER
      </div>
      
      {/* PROJECT FRAME BOTTOM BORDER: Bottom horizontal border of main content frame */}
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
      
      {/* DEBUG LABEL: Bottom Border */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 5,
          transform: "translateX(-50%)",
          background: "#f39c12",
          color: "white",
          padding: "2px 6px",
          fontSize: "10px",
          fontFamily: "monospace",
          borderRadius: "3px",
          zIndex: 1000,
          whiteSpace: "nowrap"
        }}
      >
        BOTTOM BORDER
      </div>
      


    </div>
  );
};

export default ProjectBorderFrame;