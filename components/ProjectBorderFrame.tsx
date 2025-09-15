"use client";

import React from "react";

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
  return (
    <div
      className={`project-border-frame hidden lg:block ${className}`}
      style={{
        position: "absolute",
        left: "-70px",
        top: "52px",
        width: "calc(100% + 80px)",
        height: "calc(100vh + 2386px)",
        borderLeft: "1px solid var(--border)",
        borderTop: "1px solid var(--border)",
        borderRight: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        zIndex: 1
      }}
      aria-hidden="true"
    >
      {/* Inner vertical line */}
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

      {/* Horizontal line at top of first content section */}
      <div
        className="border-first-section-top"
        style={{
          position: "absolute",
          top: "610px", // Positioned at 610px
          left: "1px", // Start after the vertical border to prevent overlap
          right: "276px",
          height: "0.5px",
          backgroundColor: "var(--border)",
          zIndex: 2
        }}
      />
    </div>
  );
};

export default ProjectBorderFrame;