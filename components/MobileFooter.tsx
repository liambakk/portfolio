"use client";

import React from "react";
import { FaLinkedin, FaXTwitter, FaGithub } from "react-icons/fa6";

const MobileFooter = () => {
  const socialLinks = [
    { icon: FaXTwitter, href: "https://x.com/liambakk", label: "X" },
    { icon: FaGithub, href: "https://github.com/liambakk", label: "Git" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/liambakker/", label: "Linkedin" },
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