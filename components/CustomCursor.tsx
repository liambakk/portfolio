"use client";

import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
      
      // Check if hovering over interactive elements (excluding case-items and tabs which should show cursor)
      const target = e.target as HTMLElement;
      const isInteractive = 
        (target.tagName === 'BUTTON' && !target.classList.contains('tab')) ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        (target.closest('button') && !target.closest('.tab')) ||
        target.closest('a') ||
        target.closest('.social-link');
      
      setIsHidden(!!isInteractive);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener("mousemove", updateCursor);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible || isHidden) return null;

  return (
    <div
      className="cursor"
      style={{
        left: `${position.x - 10}px`,
        top: `${position.y - 10}px`,
      }}
    />
  );
};

export default CustomCursor;