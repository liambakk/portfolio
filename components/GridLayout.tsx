"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import CustomCursor from "./CustomCursor";
import MobileFooter from "./MobileFooter";

const GridLayout = () => {
  const [activeTab, setActiveTab] = useState("work");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const casesListRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1025);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cases = [
    { id: 1, title: "Relay", preview: "/previews/relay.png", slug: "relay" },
    { id: 2, title: "Neura Browser Extension", preview: "/previews/neura.png", slug: "neura" },
    { id: 3, title: "Poap Global", preview: "/previews/poap.png", slug: "poap-global" },
    { id: 4, title: "Heuristic", preview: "/previews/heuristic.png", slug: "essai" },
  ];

  const handleProjectClick = (slug: string) => {
    router.push(`/projects/${slug}`);
  };

  const socialLinks = [
    { icon: FaLinkedin, href: "https://linkedin.com", label: "Linkedin" },
    { icon: FaGithub, href: "https://github.com/liambakk", label: "Git" },
    { icon: FaXTwitter, href: "https://x.com", label: "X" },
  ];

  return (
    <div className="grid-container">
      <CustomCursor />

      {/* Top horizontal border */}
      {!isMobile && (
        <motion.div
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          style={{
            position: 'absolute',
            top: '152px',
            left: '30px',
            right: '30px',
            height: '1px',
            background: 'var(--border)',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />
      )}

      {/* Vertical border connecting top to bottom at right edge */}
      {!isMobile && (
        <motion.div
          initial={{ scaleY: 0, transformOrigin: 'top' }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          style={{
            position: 'absolute',
            top: '152px',
            right: '30px',
            width: '1px',
            height: '324px',
            background: 'var(--border)',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />
      )}

      {/* Horizontal border connecting bottom of vertical lines */}
      {!isMobile && (
        <motion.div
          initial={{ scaleX: 0, transformOrigin: 'right' }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          style={{
            position: 'absolute',
            top: 'calc(152px + 324px)',
            left: 'calc(50% + 40px)',
            right: '30px',
            height: '1px',
            background: 'var(--border)',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />
      )}


      {/* Top Bar */}
      <div className="top-bar">
        <motion.div
          className="copyright"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          © 2025
        </motion.div>
        
        <motion.div
          className="nav-tabs-right"
          onMouseLeave={() => setHoveredTab(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          <div
            className="tab-fill"
            style={{
              transform: `translateX(${
                (hoveredTab || activeTab) === "work" ? 0 :
                (hoveredTab || activeTab) === "about" ? 100 :
                200
              }%)`,
              opacity: hoveredTab !== null || activeTab ? 1 : 0
            }}
          />
          <button
            className={`tab ${activeTab === "work" ? "active" : ""} ${
              (hoveredTab === "work" || (!hoveredTab && activeTab === "work")) ? "has-fill" : ""
            }`}
            onClick={() => setActiveTab("work")}
            onMouseEnter={() => setHoveredTab("work")}
          >
            Work
          </button>
          <button
            className={`tab ${activeTab === "about" ? "active" : ""} ${
              (hoveredTab === "about" || (!hoveredTab && activeTab === "about")) ? "has-fill" : ""
            }`}
            onClick={() => setActiveTab("about")}
            onMouseEnter={() => setHoveredTab("about")}
          >
            About
          </button>
          <button
            className={`tab ${activeTab === "contact" ? "active" : ""} ${
              (hoveredTab === "contact" || (!hoveredTab && activeTab === "contact")) ? "has-fill" : ""
            }`}
            onClick={() => setActiveTab("contact")}
            onMouseEnter={() => setHoveredTab("contact")}
          >
            Contact
          </button>
        </motion.div>
      </div>

      {/* Left Sidebar - Logo */}
      <div
        className="left-sidebar"
        style={{
          gridArea: 'left-sidebar',
          display: isMobile ? 'none' : 'flex',
          alignItems: 'flex-start',
          paddingTop: '16px',
          paddingLeft: '32px',
          position: 'relative'
        }}
      >
        <motion.div
          className="logo"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          LB
        </motion.div>
      </div>

      {/* Project Preview */}
      {activeTab === "work" && previewImage && !isMobile && (
        <div
          className="project-preview"
          style={{
            position: 'fixed',
            right: 'calc(43% + 280px)',
            top: '40%',
            transform: 'translateY(-50%)',
            width: 'calc(57% - 240px)',
            maxWidth: '600px',
            zIndex: 20,
            pointerEvents: 'none',
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          <img
            src={previewImage}
            alt="Project preview"
            style={{
              width: '100%',
              height: 'auto',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
            }}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="main-content">
        {activeTab === "work" && (
          <div className="cases-section">
            <motion.h1
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            >
              Work
            </motion.h1>
            <div className="cases-list" ref={casesListRef}>
              <div
                className="cases-inner"
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  setPreviewImage(null);
                }}
                style={!isMobile ? {
                  marginLeft: '20px',
                  paddingLeft: '0',
                  marginRight: '-1px',
                  position: 'relative'
                } : {}}
              >
                {/* Animated left border */}
                {!isMobile && (
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
                {/* Animated right border */}
                {!isMobile && (
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
                {hoveredIndex !== null && (
                  <div 
                    className="cases-fill"
                    ref={fillRef}
                    style={{
                      transform: `translateY(${
                        hoveredIndex === 0 ? -1 : 
                        hoveredIndex === 1 ? 79 :
                        hoveredIndex === 2 ? 160 :
                        hoveredIndex === 3 ? 241 :
                        hoveredIndex * 74 + 5
                      }px)`
                    }}
                  />
                )}
                {cases.map((caseItem, index) => {
                  const isLastItem = index === cases.length - 1;
                  return (
                    <React.Fragment key={caseItem.id}>
                      <motion.div
                        className="case-item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.6,
                          ease: "easeOut",
                          delay: 0.6 + (index * 0.1)
                        }}
                        onMouseEnter={() => {
                          setHoveredIndex(index);
                          setPreviewImage(caseItem.preview);
                        }}
                        onClick={() => handleProjectClick(caseItem.slug)}
                        style={{
                          padding: '24px 20px',
                          fontSize: '20px',
                          fontWeight: 400,
                          width: '100%',
                          position: 'relative',
                          zIndex: 1,
                          transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          color: hoveredIndex === index ? '#000000' : 'inherit'
                        }}
                      >
                        {caseItem.title}
                      </motion.div>
                      {/* Animated horizontal border after each item except the last */}
                      {!isLastItem && !isMobile && (
                        <motion.div
                          initial={{ scaleX: 0, transformOrigin: 'left' }}
                          animate={{ scaleX: 1 }}
                          transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            delay: 0.65 + (index * 0.1)
                          }}
                          style={{
                            height: '1px',
                            background: 'var(--border)',
                            width: '100%',
                            position: 'relative',
                            zIndex: 0
                          }}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === "about" && (
          <div className="about-section">
            <motion.h1
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            >
              About
            </motion.h1>
            <div className="about-content">
              <div
                className="about-content-box"
                style={!isMobile ? {
                  marginLeft: '20px',
                  marginRight: '-1px',
                  position: 'relative'
                } : {}}
              >
                {/* Animated left border */}
                {!isMobile && (
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
                {/* Animated right border */}
                {!isMobile && (
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
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
                >
                  Product designer with over 7 years of experience focused on developing and maintaining design systems.
                </motion.p>
                <motion.p
                  className="mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
                >
                  Currently working as a Design System Expert, creating scalable and consistent design solutions.
                </motion.p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="contact-section">
            <motion.h1
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            >
              Contact
            </motion.h1>
            <div className="contact-content">
              <div
                className="contact-content-box"
                style={!isMobile ? {
                  marginLeft: '20px',
                  marginRight: '-1px',
                  position: 'relative'
                } : {}}
              >
                {/* Animated left border */}
                {!isMobile && (
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
                {/* Animated right border */}
                {!isMobile && (
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
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
                >
                  hello@example.com
                </motion.p>
                <motion.p
                  className="mt-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
                >
                  Based in Your City
                </motion.p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar - Social Links */}
      <div
        className="right-sidebar"
        style={!isMobile ? {
          position: 'absolute',
          right: '60px',
          top: '242px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start'
        } : {
          display: 'none'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
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
              style={{
                color: hoveredSocial === social.label ? 'var(--foreground)' : '#ffffff',
                textDecoration: 'none',
                fontSize: '13px',
                transition: 'color 0.2s',
                fontWeight: 400
              }}
            >
              {social.label}
            </motion.a>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bottom-bar">
        <motion.span
          className="bottom-name"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
        >
          Liam Bakker
        </motion.span>
      </div>

      {/* Mobile Footer - only visible on mobile */}
      <MobileFooter />
    </div>
  );
};

export default GridLayout;