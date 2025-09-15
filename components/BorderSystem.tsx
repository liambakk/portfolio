"use client";

import React from "react";
import { cn } from "@/lib/utils";

type BorderType = "horizontal" | "vertical" | "section" | "decorative";
type BorderPosition = "top" | "bottom" | "left" | "right";
type BorderVariant = "default" | "header" | "content" | "nav" | "title";

interface BorderSystemProps {
  type: BorderType;
  position?: BorderPosition;
  variant?: BorderVariant;
  thickness?: number;
  color?: string;
  className?: string;
  customStyles?: React.CSSProperties;
  responsive?: {
    mobile?: boolean;
    tablet?: boolean;
    desktop?: boolean;
  };
}

const BorderSystem: React.FC<BorderSystemProps> = ({
  type,
  position = "bottom",
  variant = "default",
  thickness = 1,
  color,
  className,
  customStyles,
  responsive = { mobile: true, tablet: true, desktop: true },
}) => {
  // Base styles for all borders
  const baseStyles = {
    backgroundColor: color || "var(--border)",
    position: "absolute" as const,
  };

  // Determine dimensions based on type and position
  const getDimensions = () => {
    if (type === "horizontal") {
      return {
        ...baseStyles,
        height: `${thickness}px`,
        width: "100%",
        left: 0,
        ...(position === "top" ? { top: 0 } : { bottom: 0 }),
      };
    }

    if (type === "vertical") {
      return {
        ...baseStyles,
        width: `${thickness}px`,
        height: "100%",
        top: 0,
        ...(position === "left" ? { left: 0 } : { right: 0 }),
      };
    }

    if (type === "section") {
      // Section borders can be more complex
      if (variant === "header") {
        return {
          ...baseStyles,
          width: `${thickness}px`,
          height: "100%",
          right: 0,
          top: 0,
        };
      }
      return {
        ...baseStyles,
        height: `${thickness}px`,
        width: "100%",
        left: 0,
        bottom: 0,
      };
    }

    if (type === "decorative") {
      // Decorative elements have specific positioning
      switch (variant) {
        case "title":
          return position === "left"
            ? {
                ...baseStyles,
                width: `${thickness}px`,
                height: "100%",
                left: "-70px",
                top: "0",
              }
            : {
                ...baseStyles,
                width: `${thickness}px`,
                height: "calc(100% + 200px)",
                right: "-70px",
                top: 0,
              };
        case "nav":
          return {
            ...baseStyles,
            height: `${thickness}px`,
            width: "100%",
            left: 0,
            bottom: 0,
          };
        case "content":
          return position === "left"
            ? {
                ...baseStyles,
                width: `${thickness}px`,
                height: "100%",
                left: 0,
                top: 0,
              }
            : {
                ...baseStyles,
                width: `${thickness}px`,
                height: "100%",
                right: 0,
                top: 0,
              };
        default:
          return baseStyles;
      }
    }

    return baseStyles;
  };

  // Responsive visibility classes
  const responsiveClasses = cn(
    !responsive.mobile && "",
    !responsive.tablet && "hidden md:block lg:hidden",
    !responsive.desktop && "lg:hidden"
  );

  const dimensions = getDimensions();
  const finalStyles = customStyles ? { ...dimensions, ...customStyles } : dimensions;

  return (
    <div
      className={cn(
        "border-system",
        `border-${type}`,
        `border-${variant}`,
        responsiveClasses,
        className
      )}
      style={finalStyles}
      aria-hidden="true"
    />
  );
};

// Compound component for complex border layouts
export const BorderContainer: React.FC<{
  children: React.ReactNode;
  borders?: Array<Omit<BorderSystemProps, "className">>;
  className?: string;
}> = ({ children, borders = [], className }) => {
  return (
    <div className={cn("relative", className)}>
      {borders.map((border, index) => (
        <BorderSystem key={index} {...border} />
      ))}
      {children}
    </div>
  );
};

export default BorderSystem;