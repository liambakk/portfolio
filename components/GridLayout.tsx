"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaInstagram, FaBehance } from "react-icons/fa";

const GridLayout = () => {
  const [activeTab, setActiveTab] = useState("work");

  const cases = [
    { id: 1, title: "Xsolla Design System" },
    { id: 2, title: "Babka Twitch Extension" },
    { id: 3, title: "Babka" },
    { id: 4, title: "Virtual Mate (TBD)" },
  ];

  const socialLinks = [
    { icon: FaLinkedin, href: "https://linkedin.com", label: "Linkedin" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: FaBehance, href: "https://behance.net", label: "Behance" },
  ];

  return (
    <div className="grid-container">
      {/* Additional border element */}
      <div className="horizontal-border-bottom"></div>
      
      {/* Top Bar */}
      <div className="top-bar">
        <div className="copyright">© 2025</div>
        
        <div className="nav-tabs-right">
          <button
            className={`tab ${activeTab === "work" ? "active" : ""}`}
            onClick={() => setActiveTab("work")}
          >
            Work
          </button>
          <button
            className={`tab ${activeTab === "about" ? "active" : ""}`}
            onClick={() => setActiveTab("about")}
          >
            About
          </button>
          <button
            className={`tab ${activeTab === "contact" ? "active" : ""}`}
            onClick={() => setActiveTab("contact")}
          >
            Contact
          </button>
        </div>
      </div>

      {/* Left Sidebar - Logo */}
      <div className="left-sidebar">
        <div className="logo">LB</div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {activeTab === "work" && (
          <div className="cases-section">
            <h1 className="section-title">Work</h1>
            <div className="cases-list">
              {cases.map((caseItem) => (
                <motion.div
                  key={caseItem.id}
                  className="case-item"
                  whileHover={{ opacity: 0.7 }}
                  transition={{ duration: 0.2 }}
                >
                  {caseItem.title}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "about" && (
          <div className="about-section">
            <h1 className="section-title">About</h1>
            <div className="about-content">
              <p>Product designer with over 7 years of experience focused on developing and maintaining design systems.</p>
              <p className="mt-4">Currently working as a Design System Expert, creating scalable and consistent design solutions.</p>
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="contact-section">
            <h1 className="section-title">Contact</h1>
            <div className="contact-content">
              <p>hello@example.com</p>
              <p className="mt-2">Based in Your City</p>
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar - Social Links */}
      <div className="right-sidebar">
        <div className="social-links">
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

      {/* Bottom Bar */}
      <div className="bottom-bar"></div>
    </div>
  );
};

export default GridLayout;