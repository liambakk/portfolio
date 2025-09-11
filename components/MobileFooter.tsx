"use client";

import React from "react";
import { FaLinkedin, FaInstagram, FaBehance } from "react-icons/fa";

const MobileFooter = () => {
  const socialLinks = [
    { icon: FaLinkedin, href: "https://linkedin.com", label: "Linkedin" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: FaBehance, href: "https://behance.net", label: "Behance" },
  ];

  return (
    <div className="project-mobile-footer">
      <div className="mobile-footer-social">
        <div className="social-links-group">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label={social.label}
            >
              <span className="social-text">{social.label}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="mobile-footer-name">
        <span className="bottom-name">Liam Bakker</span>
      </div>
    </div>
  );
};

export default MobileFooter;