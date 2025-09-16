"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import Image from "next/image";
import CustomCursor from "./CustomCursor";
import MobileFooter from "./MobileFooter";

const GridLayout = () => {
  const [activeTab, setActiveTab] = useState("work");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [prevHoveredIndex, setPrevHoveredIndex] = useState<number | null>(null);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState<{ [key: string]: boolean }>({});
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [tabFillAnimated, setTabFillAnimated] = useState(false);
  const [hasInitialLoaded, setHasInitialLoaded] = useState(false);
  const casesListRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const cases = [
    { id: 1, title: "Relay", preview: "/previews/relay.png", slug: "relay", width: 1920, height: 1080 },
    { id: 2, title: "Neura Browser Extension", preview: "/previews/neura.png", slug: "neura", width: 1920, height: 1080 },
    { id: 3, title: "Poap Global", preview: "/previews/poap.png", slug: "poap-global", width: 1920, height: 1080 },
    { id: 4, title: "Heuristic", preview: "/previews/heuristic.png", slug: "essai", width: 1920, height: 1080 },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1025);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Mark initial load as complete after animations finish
    const timer = setTimeout(() => {
      setHasInitialLoaded(true);
    }, 1000);

    // Preload first 2 images for faster hover response
    if (!isMobile) {
      cases.slice(0, 2).forEach(caseItem => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = caseItem.preview;
        document.head.appendChild(link);
      });
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

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
            top: '80px',
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
            top: '80px',
            right: '30px',
            width: '1px',
            height: '396px',
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
            top: 'calc(80px + 396px)',
            left: 'calc(50% + 40px)',
            right: '30px',
            height: '1px',
            background: 'var(--border)',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />
      )}

      {/* Horizontal border under logo and section title */}
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


      {/* Top Bar */}
      <div className="top-bar">
        <motion.div
          className="copyright"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
          style={{ position: 'relative' }}
        >
          © 2025
          {/* Copyright left vertical border */}
          {!isMobile && (
            <motion.div
              initial={{ scaleY: 0, transformOrigin: 'top' }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                top: 24,
                width: '1px',
                background: 'var(--border)'
              }}
            />
          )}
        </motion.div>
        
        <motion.div
          className="nav-tabs-right"
          onMouseLeave={() => setHoveredTab(null)}
          style={{ position: 'relative' }}
        >
          {/* White bar at top of tabs */}
          {!isMobile && (
            <motion.div
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '8px',
                background: '#ffffff'
              }}
            />
          )}
          {/* Left border of tab section */}
          {!isMobile && (
            <motion.div
              initial={{ scaleY: 0, transformOrigin: 'top' }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              style={{
                position: 'absolute',
                left: 0,
                top: 32,
                bottom: 0,
                width: '1px',
                background: 'var(--border)',
                zIndex: 2
              }}
            />
          )}
          {/* Tab divider 1 (between Work and About) */}
          {!isMobile && (
            <motion.div
              initial={{ scaleY: 0, transformOrigin: 'top' }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
              style={{
                position: 'absolute',
                left: '33.333%',
                top: 32,
                bottom: 0,
                width: '1px',
                background: 'var(--border)',
                zIndex: 2
              }}
            />
          )}
          {/* Tab divider 2 (between About and Contact) */}
          {!isMobile && (
            <motion.div
              initial={{ scaleY: 0, transformOrigin: 'top' }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
              style={{
                position: 'absolute',
                left: '66.666%',
                top: 32,
                bottom: 0,
                width: '1px',
                background: 'var(--border)',
                zIndex: 2
              }}
            />
          )}
          {/* Right border of tab section */}
          {!isMobile && (
            <motion.div
              initial={{ scaleY: 0, transformOrigin: 'top' }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.45 }}
              style={{
                position: 'absolute',
                right: 0,
                top: 32,
                bottom: 0,
                width: '1px',
                background: 'var(--border)',
                zIndex: 2
              }}
            />
          )}
          <motion.div
            className="tab-fill"
            initial={{ scaleY: 0, x: "0%" }}
            animate={{
              scaleY: hoveredTab !== null || activeTab ? 1 : 0,
              x: (hoveredTab || activeTab) === "work" ? "0%" :
                 (hoveredTab || activeTab) === "about" ? "100%" :
                 "200%"
            }}
            transition={{
              scaleY: {
                duration: tabFillAnimated ? 0 : 0.8,
                ease: [0.25, 0.1, 0.25, 1],
                delay: tabFillAnimated ? 0 : 0.7
              },
              x: {
                duration: 0.3,
                ease: "easeOut",
                delay: 0
              }
            }}
            onAnimationComplete={() => {
              if (!tabFillAnimated) setTabFillAnimated(true);
            }}
            style={{
              transformOrigin: 'bottom'
            }}
          />
          <motion.button
            className={`tab ${activeTab === "work" ? "active" : ""} ${
              (hoveredTab === "work" || (!hoveredTab && activeTab === "work")) ? "has-fill" : ""
            }`}
            onClick={() => setActiveTab("work")}
            onMouseEnter={() => setHoveredTab("work")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.55 }}
          >
            Work
          </motion.button>
          <motion.button
            className={`tab ${activeTab === "about" ? "active" : ""} ${
              (hoveredTab === "about" || (!hoveredTab && activeTab === "about")) ? "has-fill" : ""
            }`}
            onClick={() => setActiveTab("about")}
            onMouseEnter={() => setHoveredTab("about")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          >
            About
          </motion.button>
          <motion.button
            className={`tab ${activeTab === "contact" ? "active" : ""} ${
              (hoveredTab === "contact" || (!hoveredTab && activeTab === "contact")) ? "has-fill" : ""
            }`}
            onClick={() => setActiveTab("contact")}
            onMouseEnter={() => setHoveredTab("contact")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.65 }}
          >
            Contact
          </motion.button>
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
            opacity: imageLoaded[previewImage] ? 1 : 0,
            transition: 'opacity 0.3s ease-out'
          }}
        >
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
            <Image
              src={previewImage}
              alt="Project preview"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              quality={85}
              priority={cases.findIndex(c => c.preview === previewImage) < 2}
              onLoad={() => setImageLoaded(prev => ({ ...prev, [previewImage]: true }))}
              style={{
                objectFit: 'cover',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
              }}
            />
          </div>
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
                  setPrevHoveredIndex(null);
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
                {!isMobile && (hasInitialLoaded ? (
                  <div
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
                ) : (
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
                ))}
                {/* Animated right border */}
                {!isMobile && (hasInitialLoaded ? (
                  <div
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
                ) : (
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
                ))}
                <motion.div
                  className="cases-fill"
                  ref={fillRef}
                  initial={{ opacity: 0, y: -1 }}
                  animate={{
                    opacity: hoveredIndex !== null ? 1 : 0,
                    y: hoveredIndex === null ? -1 :
                       hoveredIndex === 0 ? -1 :
                       hoveredIndex === 1 ? 79 :
                       hoveredIndex === 2 ? 160 :
                       hoveredIndex === 3 ? 241 :
                       hoveredIndex * 74 + 5
                  }}
                  transition={{
                    opacity: {
                      duration: 0,
                      ease: "easeOut"
                    },
                    y: {
                      duration: prevHoveredIndex === null ? 0 : 0.3,
                      ease: [0.4, 0, 0.2, 1]
                    }
                  }}
                />
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
                          setPrevHoveredIndex(hoveredIndex);
                          setHoveredIndex(index);
                          setPreviewImage(caseItem.preview);
                          // Preload image if not already loaded
                          if (!imageLoaded[caseItem.preview]) {
                            const img = new window.Image();
                            img.src = caseItem.preview;
                          }
                        }}
                        onClick={() => handleProjectClick(caseItem.slug)}
                        style={{
                          padding: '24px 20px',
                          fontSize: '20px',
                          fontWeight: 400,
                          width: '100%',
                          position: 'relative',
                          zIndex: 1,
                          color: hoveredIndex === index ? '#000000' : 'inherit',
                          transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      >
                        {caseItem.title}
                      </motion.div>
                      {/* Animated horizontal border after each item except the last */}
                      {!isLastItem && (hasInitialLoaded ? (
                        <div
                          style={{
                            height: '1px',
                            background: 'var(--border)',
                            width: '100%',
                            position: 'relative',
                            zIndex: 0
                          }}
                        />
                      ) : (
                        <motion.div
                          initial={{ scaleX: 0 }}
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
                            zIndex: 0,
                            transformOrigin: '0% 50%'
                          }}
                        />
                      ))}
                    </React.Fragment>
                  );
                })}
                {/* Animated bottom border for the entire container */}
                {hasInitialLoaded ? (
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      width: '100%',
                      height: '1px',
                      background: 'var(--border)',
                      zIndex: 0
                    }}
                  />
                ) : (
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.95 }}
                    style={{
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      height: '1px',
                      background: 'var(--border)',
                      zIndex: 0
                    }}
                  />
                )}
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
                {!isMobile && (hasInitialLoaded ? (
                  <div
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
                ) : (
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
                ))}
                {/* Animated right border */}
                {!isMobile && (hasInitialLoaded ? (
                  <div
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
                ) : (
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
                ))}
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
                {/* Animated bottom border for about content */}
                {hasInitialLoaded ? (
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      width: '100%',
                      height: '1px',
                      background: 'var(--border)',
                      zIndex: 0
                    }}
                  />
                ) : (
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.9 }}
                    style={{
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      height: '1px',
                      background: 'var(--border)',
                      zIndex: 0
                    }}
                  />
                )}
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
                {!isMobile && (hasInitialLoaded ? (
                  <div
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
                ) : (
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
                ))}
                {/* Animated right border */}
                {!isMobile && (hasInitialLoaded ? (
                  <div
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
                ) : (
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
                ))}
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
                {/* Animated bottom border for contact content */}
                {hasInitialLoaded ? (
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      width: '100%',
                      height: '1px',
                      background: 'var(--border)',
                      zIndex: 0
                    }}
                  />
                ) : (
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.9 }}
                    style={{
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      height: '1px',
                      background: 'var(--border)',
                      zIndex: 0
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar - Social Links */}
      <div
        style={!isMobile ? {
          position: 'absolute',
          left: 'calc(50% + 550px)',
          top: '170px',
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
            gap: '8px',
            paddingLeft: '30px'
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
        {/* White rectangle in bottom right corner */}
        {!isMobile && (
          <motion.div
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 30,
              width: 'calc(50% - 30px)',
              height: '8px',
              background: '#ffffff'
            }}
          />
        )}
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