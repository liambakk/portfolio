"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface SocialButtonsProps {
  section: string; // "about", "contact", or "work"
  isMobile?: boolean;
}

const SocialButtons: React.FC<SocialButtonsProps> = ({ section, isMobile = false }) => {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const socialLinks = [
    { icon: FaLinkedin, href: "https://linkedin.com", label: "Linkedin" },
    { icon: FaGithub, href: "https://github.com/liambakk", label: "Git" },
    { icon: FaXTwitter, href: "https://x.com", label: "X" },
  ];



  if (isMobile) {
    return null; // Don't render on mobile
  }

  return (
    <div 
      ref={containerRef}
      className={`social-buttons-container social-buttons-${section}`}
    >
      <div
        className="social-links"
      >
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.7 + (index * 0.1)
            }}
            onMouseEnter={() => setHoveredSocial(social.label)}
            onMouseLeave={() => setHoveredSocial(null)}
            className="social-link"
          >
            <span className="social-text">{social.label}</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default SocialButtons;