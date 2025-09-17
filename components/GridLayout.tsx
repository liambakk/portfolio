"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import Image from "next/image";
import CustomCursor from "./CustomCursor";
import MobileFooter from "./MobileFooter";
import { useNavigation } from "./ClientWrapper";

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

    // Check if initial animations have already played
    const hasPlayedInitialAnimations = sessionStorage.getItem('hasPlayedInitialAnimations') === 'true';
    
    if (hasPlayedInitialAnimations) {
      setHasInitialLoaded(true);
    } else {
      // Mark initial load as complete after animations finish
      const timer = setTimeout(() => {
        setHasInitialLoaded(true);
        sessionStorage.setItem('hasPlayedInitialAnimations', 'true');
      }, 1000);
      
      return () => {
        clearTimeout(timer);
      };
    }

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
    };
  }, []);

  const { triggerTransition } = useNavigation();

  const handleProjectClick = (slug: string) => {
    triggerTransition(() => {
      router.push(`/projects/${slug}`);
    });
  };

  const socialLinks = [
    { icon: FaLinkedin, href: "https://linkedin.com", label: "Linkedin" },
    { icon: FaGithub, href: "https://github.com/liambakk", label: "Git" },
    { icon: FaXTwitter, href: "https://x.com", label: "X" },
  ];

  return (
    <div className="grid-container">
      <CustomCursor />

      {/* GLOBAL HEADER BORDER: Top horizontal border separating header from main content
          - Spans full width between left and right margins (30px each)
          - Located at 80px from top, directly below the top navigation bar
          - Appears on all sections (work/about/contact)
          - Animated with left-to-right scale on initial load (0.2s delay) */}
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

      {/* WORK SECTION L-SHAPED BORDER: Composite border creating L-shape on right side
          - Only visible on WORK section
          - Positioned at right viewport edge (30px from right)
          - Height spans from content top (152px) down 403px
          - Creates visual frame for work content area */}
      {!isMobile && activeTab === 'work' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          style={{
            position: 'absolute',
            top: '152px',
            right: '30px',
            width: '1px',
            height: '403px',
            background: 'transparent',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        >
          {/* WORK SECTION VERTICAL BORDER: Right edge border of work content area
              - Extends vertically down from content separator
              - Animated top-to-bottom on work tab activation
              - Creates right boundary for case studies list */}
          <motion.div
            initial={{ scaleY: 0, transformOrigin: 'top' }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0 }}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '1px',
              height: '100%',
              background: 'var(--border)'
            }}
          />
          {/* WORK SECTION HORIZONTAL EXTENSION: Bottom border extending left from vertical
              - Creates L-shape by extending horizontally from bottom of vertical border
              - Width calculated to reach specific layout boundary (905px from left)
              - Animated right-to-left after vertical border completes */}
          <motion.div
            initial={{ scaleX: 0, transformOrigin: 'right' }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 'calc(100vw - 905px)',
              height: '1px',
              background: 'var(--border)'
            }}
          />
        </motion.div>
      )}


      {/* CONTENT SEPARATOR BORDER: Horizontal border separating section titles from main content
          - Spans full width between margins, positioned 152px from top
          - Appears below section titles (Work/About/Contact)
          - Creates visual separation between header area and content area
          - Animated left-to-right scale on initial load (0.2s delay)
          - Visible on all sections */}
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


      {/* ABOUT/CONTACT RIGHT BORDER: Vertical border separating content from social links
          - Only visible on ABOUT and CONTACT sections
          - Positioned at right viewport edge (30px from right)
          - Starts from content separator (152px) and extends down 324px
          - Creates visual boundary between main content and social sidebar
          - Animated top-to-bottom on section change (0.4s delay) */}
      {!isMobile && (activeTab === 'about' || activeTab === 'contact') && (
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
          {/* COPYRIGHT LEFT BORDER: Vertical border extending down from copyright text
              - Positioned at left edge of copyright text (left: 0)
              - Extends from 24px below text down to header bottom
              - Creates visual connection between copyright and layout structure
              - Animated top-to-bottom with 0.3s delay */}
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
          {/* NAVIGATION WHITE ACCENT: White bar accent at top of tab section
              - Spans full width of navigation tabs area
              - Height: 8px, positioned at very top of tabs (top: 0)
              - Provides visual weight and contrast for navigation area
              - Animated left-to-right scale with 0.35s delay */}
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
          {/* NAVIGATION LEFT BORDER: Left boundary of tab section
              - Creates left edge of the navigation tab container
              - Starts 32px from top (below white accent bar)
              - Extends to bottom of navigation area
              - Animated top-to-bottom with 0.3s delay */}
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
          {/* NAVIGATION TAB DIVIDER 1: Vertical separator between Work and About tabs
              - Positioned at 33.333% from left (1/3 width) to separate first two tabs
              - Starts 32px from top (below white accent bar)
              - Creates visual separation between Work and About navigation options
              - Animated top-to-bottom with 0.35s delay */}
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
          {/* NAVIGATION TAB DIVIDER 2: Vertical separator between About and Contact tabs
              - Positioned at 66.666% from left (2/3 width) to separate last two tabs
              - Starts 32px from top (below white accent bar)
              - Creates visual separation between About and Contact navigation options
              - Animated top-to-bottom with 0.4s delay */}
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
          {/* NAVIGATION RIGHT BORDER: Right boundary of tab section
              - Creates right edge of the navigation tab container
              - Starts 32px from top (below white accent bar)
              - Extends to bottom of navigation area
              - Animated top-to-bottom with 0.45s delay (last border to appear) */}
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
              (hoveredTab === "work" || (!hoveredTab && activeTab === "work" && tabFillAnimated)) ? "has-fill" : ""
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
              (hoveredTab === "about" || (!hoveredTab && activeTab === "about" && tabFillAnimated)) ? "has-fill" : ""
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
              (hoveredTab === "contact" || (!hoveredTab && activeTab === "contact" && tabFillAnimated)) ? "has-fill" : ""
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
            right: 'clamp(45%, calc(50% + 15vw), 60%)',
            top: 'clamp(25%, 30vh, 35%)',
            transform: 'translateY(-50%)',
            width: 'clamp(300px, 35vw, 600px)',
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
            <div className="cases-list" ref={casesListRef} style={{ position: 'relative' }}>
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
                {/* WORK SECTION CASE LIST RIGHT BORDER: Right edge of case studies list
                    - Creates right boundary for the work cases container
                    - Extends full height of the cases list area
                    - Positioned at right edge of cases container (right: 0)
                    - Animated top-to-bottom with 0.55s delay
                    - Only visible in WORK section */}
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
                       hoveredIndex === 4 ? 322 :
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
                      {/* WORK SECTION CASE ITEM DIVIDER: Horizontal separator between case study items
                          - Appears between each case study item in the list
                          - Full width (100%) horizontal line
                          - Animated left-to-right with staggered delay (0.65s + index * 0.1s)
                          - Not rendered after the last item */}
                      {!isLastItem && (
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
                      )}
                    </React.Fragment>
                  );
                })}
                
                {/* WORK SECTION FINAL DIVIDER: Horizontal border after last case study item
                    - Positioned after all case study items, before "More" button
                    - Full width (100%) horizontal separator
                    - Animated left-to-right on initial load (1.05s delay)
                    - Creates visual separation between case studies and additional content */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 1.05
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
                
                {/* More button */}
                <motion.div
                  className="case-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 1.0
                  }}
                  onMouseEnter={() => {
                    setPrevHoveredIndex(hoveredIndex);
                    setHoveredIndex(cases.length);
                    setPreviewImage(null);
                  }}
                  onClick={() => {
                    window.open('https://drive.google.com/file/d/1xlb2JgP_P0qrBXVIl0h_QMbs3M3pu-Kv/view?usp=sharing', '_blank');
                  }}
                  style={{
                    padding: '24px 20px',
                    fontSize: '20px',
                    fontWeight: 400,
                    width: '100%',
                    position: 'relative',
                    zIndex: 1,
                    color: hoveredIndex === cases.length ? '#000000' : 'inherit',
                    transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer'
                  }}
                >
                  More
                </motion.div>
                
                {/* WORK SECTION CASE LIST LEFT BORDER: Left edge of case studies container
                    - Creates left boundary for the work cases list
                    - Positioned at left edge of cases container (left: 0)
                    - Height covers 99.5% of container to avoid overlap issues
                    - Animated top-to-bottom on initial load (0.5s delay)
                    - Only visible in WORK section */}
                {!isMobile && activeTab === 'work' && (
                  <>
                    <motion.div
                      initial={{ scaleY: 0, transformOrigin: 'top' }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
                      style={{
                        position: 'absolute',
                        left: '0',
                        top: '0',
                        width: '1px',
                        height: '99.5%',
                        background: 'var(--border)',
                        pointerEvents: 'none',
                        zIndex: 0
                      }}
                    />
                    
                  </>
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
                className="about-content-wrapper"
                style={!isMobile ? {
                  position: 'relative',
                  width: '100%'
                } : {}}
              >
                <div
                  className="about-content-box"
                  style={!isMobile ? {
                    marginLeft: '20px',
                    marginRight: '-1px',
                    position: 'relative'
                  } : {}}
              >
                {/* ABOUT SECTION CONTENT RIGHT BORDER: Right edge of about text content box
                    - Creates right boundary for the about text content area
                    - Positioned at right edge of content box (right: 0)
                    - On initial load: starts from top (top: 0), animated top-to-bottom (0.55s delay)
                    - On subsequent loads: starts 10px from top to avoid visual overlap
                    - Only visible in ABOUT section */}
                {!isMobile && (hasInitialLoaded ? (
                  <div
                    style={{
                      position: 'absolute',
                      top: 10,
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
              </div>
              
              {/* Extended border container for profile image - only on about page */}
              {!isMobile && (
                <>
                  {/* ABOUT SECTION COMPLEX BORDER STRUCTURE: Multi-segment border creating layout frame
                      - Large container extending left to viewport edge and up to header area
                      - Creates comprehensive border system for about section with profile image area
                      - Static rendering on subsequent loads for performance */}
                  {hasInitialLoaded ? (
                    <div
                      style={{
                        position: 'absolute',
                        left: '-50vw',
                        top: '-280px',
                        width: 'calc(50vw + 20px)',
                        height: 'calc(100% + 580px)',
                        pointerEvents: 'none',
                        zIndex: 0
                      }}
                    >
                      {/* ABOUT CONTENT LEFT BORDER: Right edge of profile image area
                          - Vertical border separating profile image area from content
                          - Starts 280px from container top, extends to bottom
                          - Creates left boundary for about text content */}
                      <div
                        style={{
                          position: 'absolute',
                          right: '0',
                          top: '280px',
                          width: '1px',
                          height: 'calc(100% - 280px)',
                          background: 'var(--border)'
                        }}
                      />
                      {/* ABOUT BOTTOM BORDER: Horizontal border at bottom of layout
                          - Spans full width of the extended border container
                          - Creates bottom boundary of the about section layout frame */}
                      <div
                        style={{
                          position: 'absolute',
                          left: '0',
                          bottom: '0',
                          right: '0',
                          height: '1px',
                          background: 'var(--border)'
                        }}
                      />
                      {/* ABOUT VIEWPORT LEFT BORDER: Left edge at viewport boundary
                          - Vertical border at far left of viewport
                          - Extends full height of extended container
                          - Creates left boundary of the entire layout frame */}
                      <div
                        style={{
                          position: 'absolute',
                          left: '0',
                          top: '0',
                          width: '1px',
                          height: '100%',
                          background: 'var(--border)'
                        }}
                      />
                      {/* ABOUT HEADER CONNECTION BORDER: Vertical link from header to content
                          - Connects header area to main content area
                          - Complex positioning calculation to align with header structure
                          - Higher z-index (10) to appear above other elements */}
                      <div
                        style={{
                          position: 'absolute',
                          right: 'calc(0px - 30px + 50vw)',
                          top: 'calc(280px + 100vh - 673px)',
                          width: '1px',
                          height: 'calc(100vh - 725px)',
                          background: 'var(--border)',
                          zIndex: 10
                        }}
                      />
                      {/* ABOUT SOCIAL CONNECTION BORDER: Horizontal extension to social area
                          - Only visible in ABOUT section
                          - Extends from content area to social sidebar
                          - Creates connection between main content and social links */}
                      {activeTab === 'about' && (
                        <div
                          style={{
                            position: 'absolute',
                            left: 'calc(100% - 1px)',
                            bottom: '0',
                            width: 'calc(100vw - 50vw - 50px)',
                            height: '1px',
                            background: 'var(--border)',
                            zIndex: 10
                          }}
                        />
                      )}
                    </div>
                  ) : (
                    <>
                      {/* ABOUT SECTION ANIMATED BORDER STRUCTURE: Initial load animation sequence
                          - Same border structure as static version but with sequential animations
                          - Creates choreographed appearance of layout borders
                          - Overflow hidden to prevent animation artifacts */}
                      <motion.div
                      style={{
                        position: 'absolute',
                        left: '-50vw',
                        top: '-280px',
                        width: 'calc(50vw + 20px)',
                        height: 'calc(100% + 580px)',
                        pointerEvents: 'none',
                        zIndex: 0,
                        overflow: 'hidden'
                      }}
                    >
                      {/* ABOUT ANIMATED CONTENT LEFT BORDER: Animated profile/content separator
                          - Same as static version but animated top-to-bottom (0.5s delay)
                          - Creates left boundary for about text content */}
                      <motion.div
                        initial={{ scaleY: 0, transformOrigin: 'top' }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
                        style={{
                          position: 'absolute',
                          right: '0',
                          top: '280px',
                          width: '1px',
                          height: 'calc(100% - 280px)',
                          background: 'var(--border)'
                        }}
                      />
                      {/* ABOUT ANIMATED BOTTOM BORDER: Animated horizontal bottom boundary
                          - Animated right-to-left scale (0.9s delay)
                          - Creates bottom boundary of the layout frame */}
                      <motion.div
                        initial={{ scaleX: 0, transformOrigin: 'right' }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.9 }}
                        style={{
                          position: 'absolute',
                          left: '0',
                          bottom: '0',
                          right: '0',
                          height: '1px',
                          background: 'var(--border)'
                        }}
                      />
                      {/* ABOUT ANIMATED VIEWPORT LEFT BORDER: Animated left edge boundary
                          - Animated bottom-to-top scale (1.2s delay, last vertical to appear)
                          - Creates left boundary of the entire layout frame */}
                      <motion.div
                        initial={{ scaleY: 0, transformOrigin: 'bottom' }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 1.2 }}
                        style={{
                          position: 'absolute',
                          left: '0',
                          top: '0',
                          width: '1px',
                          height: '100%',
                          background: 'var(--border)'
                        }}
                      />
                      {/* ABOUT ANIMATED HEADER CONNECTION: Animated header-to-content link
                          - Animated top-to-bottom (0.3s delay, appears early in sequence)
                          - Connects header structure to content area */}
                      <motion.div
                        initial={{ scaleY: 0, transformOrigin: 'top' }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                        style={{
                          position: 'absolute',
                          right: 'calc(0px - 30px + 50vw)',
                          top: 'calc(280px + 100vh - 673px)',
                          width: '1px',
                          height: 'calc(100vh - 725px)',
                          background: 'var(--border)',
                          zIndex: 10
                        }}
                      />
                      {/* ABOUT ANIMATED SOCIAL CONNECTION: Animated content-to-social link
                          - Only visible in ABOUT section
                          - Animated left-to-right scale (0.6s delay)
                          - Creates connection to social sidebar */}
                      {activeTab === 'about' && (
                        <motion.div
                          initial={{ scaleX: 0, transformOrigin: 'left' }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                          style={{
                            position: 'absolute',
                            left: 'calc(100% - 1px)',
                            bottom: '0',
                            width: 'calc(100vw - 50vw - 50px)',
                            height: '1px',
                            background: 'var(--border)',
                            zIndex: 10
                          }}
                        />
                      )}
                    </motion.div>
                    </>
                  )}
                  
                  {/* Profile image container */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 1.3 }}
                    style={{
                      position: 'absolute',
                      left: 'calc(-50vw + 1px)',
                      top: '-279px',
                      right: '19px',
                      height: 'calc(100% + 579px)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-start',
                      overflow: 'hidden',
                      padding: '40px'
                    }}
                  >
                    <div style={{ 
                      position: 'relative', 
                      width: '280px', 
                      height: '380px',
                      marginBottom: '80px',
                      marginLeft: '300px'
                    }}>
                      <Image
                        src="/liamlook.jpg"
                        alt="Liam Bakker"
                        fill
                        sizes="280px"
                        quality={90}
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center'
                        }}
                      />
                    </div>
                  </motion.div>
                </>
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
                {/* CONTACT SECTION CONTENT LEFT BORDER: Left edge of contact content box
                    - Creates left boundary for contact information area
                    - Positioned at left edge of content box (left: 0)
                    - Extends full height of content area (top: 0 to bottom: 0)
                    - Static on subsequent loads, animated top-to-bottom on initial load (0.5s delay)
                    - Only visible in CONTACT section */}
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
                {/* CONTACT SECTION CONTENT RIGHT BORDER: Right edge of contact content box
                    - Creates right boundary for contact information area
                    - Positioned at right edge of content box (right: 0)
                    - Extends full height of content area (top: 0 to bottom: 0)
                    - Static on subsequent loads, animated top-to-bottom on initial load (0.55s delay)
                    - Only visible in CONTACT section */}
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
                {/* CONTACT SECTION CONTENT BOTTOM BORDER: Bottom edge of contact content box
                    - Creates bottom boundary for contact information area
                    - Spans full width of content box (width: 100%)
                    - Positioned at bottom of content area (bottom: 0)
                    - Static on subsequent loads, animated left-to-right width expansion on initial load (0.9s delay)
                    - Only visible in CONTACT section */}
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

      {!isMobile && activeTab === 'contact' && (
        <>
          {/* CONTACT SECTION SOCIAL CONNECTION BORDER: Horizontal border connecting content to social area
              - Only visible in CONTACT section
              - Positioned at bottom of contact content area (152px + 324px from top)
              - Spans from content left edge (50px) to viewport right margin (30px)
              - Creates visual connection between contact content and social sidebar
              - Animated left-to-right scale with 0.6s delay
              - Higher z-index (10) to appear above other elements */}
          <motion.div
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            style={{
              position: 'absolute',
              top: 'calc(152px + 324px)',
              left: '50px',
              right: '30px',
              height: '1px',
              background: 'var(--border)',
              zIndex: 10,
              pointerEvents: 'none'
            }}
          />
        </>
      )}

      {/* Right Sidebar - Social Links */}
      {!isMobile && (
        <div className="grid-right-sidebar-fixed">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            paddingLeft: '20px',
            paddingTop: '30px'
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
      )}

      {/* Bottom Bar */}
      <div className="bottom-bar">
        {/* BOTTOM BAR WHITE ACCENT: Decorative white bar in footer area
            - Only visible on WORK and CONTACT sections (not on ABOUT)
            - Positioned in bottom right area of viewport
            - Width spans half viewport minus margin (calc(50% - 30px))
            - Height: 8px for visual prominence
            - White background for contrast and visual weight
            - Animated left-to-right on enter, right-to-left on exit
            - Different delay timing for initial vs subsequent loads */}
        <AnimatePresence>
          {!isMobile && (activeTab === 'work' || activeTab === 'contact') && (
            <motion.div
              key="white-accent"
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0, transformOrigin: 'right' }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
                delay: hasInitialLoaded ? 0 : 0.35
              }}
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
        </AnimatePresence>
        {/* Liam Bakker text - only on work and contact */}
        <AnimatePresence>
          {(activeTab === 'work' || activeTab === 'contact') && (
            <motion.span
              key="liam-text"
              className="bottom-name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: hasInitialLoaded ? 0 : 0.8
              }}
            >
              Liam Bakker
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Footer - only visible on mobile */}
      <MobileFooter />
    </div>
  );
};

export default GridLayout;