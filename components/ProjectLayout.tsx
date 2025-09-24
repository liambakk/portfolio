"use client";

import React, { useState, useEffect, useRef, Fragment } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import CustomCursor from "./CustomCursor";
import MobileFooter from "./MobileFooter";
import Image from "next/image";
import OptimizedImage from "./OptimizedImage";
import { ProjectData } from "@/types/project";
import { useNavigation } from "./ClientWrapper";
import SocialButtons from "./SocialButtons";

type ProjectLayoutProps = ProjectData;

const ProjectLayout = ({
  title,
  titleIcon,
  externalLink,
  previewImage,
  overview,
  team,
  goals,
  roleProcess
}: ProjectLayoutProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState<{ [key: string]: boolean }>({});
  const [tabFillAnimated, setTabFillAnimated] = useState(false);
  // Initialize touch device detection properly
  const [isTouchDevice, setIsTouchDevice] = useState(() => {
    if (typeof window !== 'undefined') {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    return false;
  });
  const router = useRouter();

  useEffect(() => {
    // Check touch device only once on mount
    const isTouch = 'ontouchstart' in window ||
                   navigator.maxTouchPoints > 0 ||
                   window.matchMedia('(pointer: coarse)').matches;
    
    setIsTouchDevice(isTouch);
    
    // No resize listeners needed - touch capability doesn't change during session
    
    // Check if initial animations have already played
    const hasPlayedInitialAnimations = sessionStorage.getItem('hasPlayedInitialAnimations') === 'true';
    
    let timer: NodeJS.Timeout;
    if (!hasPlayedInitialAnimations) {
      // Mark initial load as complete after animations finish
      timer = setTimeout(() => {
        sessionStorage.setItem('hasPlayedInitialAnimations', 'true');
      }, 1000);
    }

    // Preload priority images
    if (previewImage && !isTouchDevice) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = previewImage;
      document.head.appendChild(link);
    }

    // Preload role process images that are above the fold
    roleProcess.forEach((role, index) => {
      if (index === 0) { // Only preload first section's images
        if (role.images) {
          role.images.forEach(img => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = img;
            document.head.appendChild(link);
          });
        }
        // Also preload single images in first section
        if (role.bottomImage) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = role.bottomImage;
          document.head.appendChild(link);
        }
        if (role.image) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = role.image;
          document.head.appendChild(link);
        }
      }
    });

    // Cleanup
    return () => {
      clearTimeout(timer);
    };
  }, [previewImage, roleProcess]);


  const { triggerTransition, setIsReturningFromProject } = useNavigation();

  // Helper function to conditionally apply animations
  const getAnimationProps = (delay = 0) => {
    if (isTouchDevice) {
      return {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0 }
      };
    }
    return {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-100px" },
      transition: { duration: 0.6, ease: "easeOut" as const, delay }
    };
  };

  const getScaleAnimationProps = (delay = 0) => {
    if (isTouchDevice) {
      return {
        initial: { opacity: 1, scale: 1 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0 }
      };
    }
    return {
      initial: { opacity: 0, scale: 0.95 },
      whileInView: { opacity: 1, scale: 1 },
      viewport: { once: true, margin: "-50px" },
      transition: { duration: 0.6, ease: "easeOut" as const, delay }
    };
  };

  const handleBackToWork = () => {
    setIsReturningFromProject(true);
    triggerTransition(() => {
      router.push("/");
    });
  };

  const handleTabHover = (tab: string) => {
    if (!isTouchDevice) {
      setHoveredTab(tab);
    }
  };

  const handleTabLeave = () => {
    if (!isTouchDevice) {
      setHoveredTab(null);
    }
  };


  return (
    <div className="project-page-container">
        <CustomCursor />
        
      
      {/* Scrollable Content Wrapper */}
      <div className="project-scrollable-content">
        {/* Top Bar */}
        <div className="project-top-bar" style={{ position: 'relative' }}>
          <motion.div 
            className="copyright" 
            style={{ position: 'relative' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
          >
            © 2025
            {/* VERTICAL LINE 1: Copyright section left edge marker
                Creates a subtle vertical accent line extending down from the copyright text,
                positioned at the left edge (left: 0) and spanning from 24px below the text
                to the bottom of the copyright container. Provides visual anchoring for the
                copyright element within the header layout structure. */}
            {!isTouchDevice && (
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
          
          <div
            className="nav-tabs-right"
            onMouseLeave={handleTabLeave}
            style={{ position: 'relative' }}
          >
            {/* PROJECT TAB TOP BAR: White horizontal accent bar above tab section */}
            {!isTouchDevice && (
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
            {/* VERTICAL LINE 2: Tab navigation left border
                Defines the leftmost edge of the tab navigation container,
                positioned at left: 0 and extending from 32px below the white accent bar
                down to the bottom of the tab section. Serves as the structural left boundary
                for the two-tab navigation system (Overview/Back to Work). */}
            {!isTouchDevice && (
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
            {/* VERTICAL LINE 3: Tab navigation center divider
                Vertical separator line positioned at the exact center (left: 50%) of the tab area,
                creating the visual division between the Overview tab (left half) and
                Back to Work tab (right half). Extends from 32px below the accent bar
                to the bottom, providing clear navigation structure and visual balance. */}
            {!isTouchDevice && (
              <motion.div
                initial={{ scaleY: 0, transformOrigin: 'top' }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: 32,
                  bottom: 0,
                  width: '1px',
                  background: 'var(--border)',
                  zIndex: 2
                }}
              />
            )}
            {/* VERTICAL LINE 4: Tab navigation right border
                Defines the rightmost boundary of the tab navigation container,
                positioned at right: 0 and extending vertically from 32px below the accent bar
                to the bottom edge. Completes the structural framing of the tab area,
                providing symmetrical borders with the left edge for visual containment. */}
            {!isTouchDevice && (
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
                x: (hoveredTab || activeTab) === "overview" ? "0%" :
                   (hoveredTab || activeTab) === "back" ? "100%" : "0%"
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
                transformOrigin: 'bottom',
                width: "50%" // Two tabs instead of three
              }}
            />
            <motion.button
              className={`tab ${activeTab === "overview" ? "active" : ""} ${
                (hoveredTab === "overview" || (!hoveredTab && activeTab === "overview")) ? "has-fill" : ""
              }`}
              onClick={() => setActiveTab("overview")}
              onMouseEnter={() => handleTabHover("overview")}
              onTouchStart={(e) => {
                e.preventDefault();
                setActiveTab("overview");
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.55 }}
            >
              Overview
            </motion.button>
            <motion.button
              className={`tab ${activeTab === "back" ? "active" : ""} ${
                (!isTouchDevice && hoveredTab === "back") ? "has-fill" : ""
              }`}
              onClick={handleBackToWork}
              onMouseEnter={() => handleTabHover("back")}
              onTouchStart={(e) => {
                e.preventDefault();
                handleBackToWork();
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            >
              Back to Work
            </motion.button>
          </div>
        </div>

        {/* PROJECT HEADER BORDER: Main horizontal separator below header/tabs area */}
        {!isTouchDevice && (
          <div style={{ position: 'relative' }}>
            <motion.div
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              style={{
                marginLeft: '30px',
                marginRight: '30px',
                height: '1px',
                background: 'var(--border)',
                pointerEvents: 'none'
              }}
            />
          </div>
        )}

        {/* Main Content Area */}
        <div className="project-main-area">
          {/* Left Sidebar - Logo */}
          <div className="project-left-sidebar">
            <motion.div 
              className="logo" 
              onClick={handleBackToWork} 
              style={{ cursor: "none" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              LB
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="project-main-content">
        {activeTab === "overview" && (
          <div className="project-content-wrapper">
            {/* Sections now handle their own frame borders - ProjectBorderFrame removed */}
            
            <div className="project-section">
              <div className="project-title-border-wrapper">
                <motion.h1 
                  className="project-page-title" 
                  style={externalLink ? { display: "flex", alignItems: "center", gap: "12px" } : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                >
                  {title}
                  {externalLink && titleIcon}
                </motion.h1>
                
                {/* Horizontal line under title, above preview image */}
                {!isTouchDevice && (
                  <>
                    <motion.div
                      initial={{ scaleX: 0, transformOrigin: 'left' }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '-70px',
                        right: '-80px',
                        height: '1px',
                        background: 'var(--border)',
                        zIndex: 1
                      }}
                    />
                  </>
                )}
                {/* Mobile line under title */}
                {isTouchDevice && (
                  <motion.div
                    initial={{ scaleX: 0, transformOrigin: 'left' }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '-40px',
                      right: '-50px',
                      height: '1px',
                      background: 'var(--border)',
                      zIndex: 1
                    }}
                  />
                )}
              </div>
              {previewImage && (
                <motion.div 
                  className="project-image-container"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                >
                  <OptimizedImage 
                    src={previewImage} 
                    alt={`${title} preview`}
                    width={1560}
                    height={1040}
                    quality={95}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1560px"
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxWidth: '780px'
                    }}
                    useOptimized={false} // Disable optimization for now as these are in previews folder
                  />
                </motion.div>
              )}
            </div>
              
              <div className="project-sections-container" style={{ position: 'relative' }}>
              {/* Overview Section */}
              <div className="project-section-bordered">
                {/* PROJECT SECTION TOP BORDER: Animated horizontal border above Overview section */}
                {!isTouchDevice && (
                  <>
                    <motion.div
                      initial={{ scaleX: 0, transformOrigin: 'left' }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0, // Container now matches frame width
                        height: '1px',
                        background: 'var(--border)',
                        zIndex: 1
                      }}
                    />
                  </>
                )}
                {/* MOBILE SECTION TOP BORDER: Horizontal border for mobile view */}
                {isTouchDevice && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0, // Container now matches frame width
                      height: '1px',
                      background: 'var(--border)',
                      zIndex: 1
                    }}
                  />
                )}
                {/* Animated left vertical border */}
                {!isTouchDevice && (
                  <motion.div
                    initial={{ scaleY: 0, transformOrigin: 'top' }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '1px',
                      background: 'var(--border)',
                      zIndex: 1
                    }}
                  />
                )}
                {/* Animated right vertical border */}
                {!isTouchDevice && (
                  <motion.div
                    initial={{ scaleY: 0, transformOrigin: 'top' }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.9 }}
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      bottom: 0,
                      width: '1px',
                      background: 'var(--border)',
                      zIndex: 1
                    }}
                  />
                )}
                <motion.div 
                  className="section-header"
                  {...(isTouchDevice ? {} : {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.6, ease: "easeOut", delay: 1.0 }
                  })}
                >
                  {/* VERTICAL LINE 5: Overview section MEGA-EXTENDED vertical border - REMOVED */}
                  
                  <span className="section-label">01.</span>
                  Overview
                </motion.div>
                <motion.div 
                  className="section-content"
                  {...(isTouchDevice ? {} : {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.6, ease: "easeOut", delay: 1.1 }
                  })}
                >
                  {overview.description}
                  
                  {/* Social Buttons removed from project pages */}
                  {/* <SocialButtons section="project" isMobile={isTouchDevice} /> */}
                </motion.div>
              </div>

              {/* Team Section */}
              <div className="project-section-bordered">
                {/* PROJECT SECTION TOP BORDER: Animated horizontal border above Team section */}
                {!isTouchDevice && (
                  <motion.div
                    initial={{ scaleX: 0, transformOrigin: 'left' }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ 
                      once: true,
                      margin: "-150px 0px -150px 0px"
                    }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0, // Container now matches frame width
                      height: '1px',
                      background: 'var(--border)',
                      zIndex: 1
                    }}
                  />
                )}
                {/* MOBILE SECTION TOP BORDER: Horizontal border for mobile view */}
                {isTouchDevice && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0, // Container now matches frame width
                      height: '1px',
                      background: 'var(--border)',
                      zIndex: 1
                    }}
                  />
                )}
                {/* Animated left vertical border */}
                {!isTouchDevice && (
                  <motion.div
                    initial={{ scaleY: 0, transformOrigin: 'top' }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: "-150px 0px -150px 0px" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '1px',
                      background: 'var(--border)',
                      zIndex: 1
                    }}
                  />
                )}
                {/* Animated right vertical border */}
                {!isTouchDevice && (
                  <motion.div
                    initial={{ scaleY: 0, transformOrigin: 'top' }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: "-150px 0px -150px 0px" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      bottom: 0,
                      width: '1px',
                      background: 'var(--border)',
                      zIndex: 1
                    }}
                  />
                )}
                <motion.div 
                  className="section-header"
                  {...getAnimationProps(0.4)}
                >
                  {/* VERTICAL LINE 6: Team section MEGA-EXTENDED vertical border - REMOVED */}
                  
                  <span className="section-label">02.</span>
                  {team.title || "Team"}
                </motion.div>
                <motion.div 
                  className="section-content"
                  {...getAnimationProps(0.5)}
                >
                  {team.description}
                </motion.div>
              </div>

              {/* Goals Section */}
              <div className="project-section-bordered">
                {/* PROJECT SECTION TOP BORDER: Animated horizontal border above Goals section */}
                {!isTouchDevice && (
                  <motion.div
                    initial={{ scaleX: 0, transformOrigin: 'left' }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ 
                      once: true,
                      margin: "-150px 0px -150px 0px"
                    }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0, // Container now matches frame width
                      height: '1px',
                      background: 'var(--border)',
                      zIndex: 1
                    }}
                  />
                )}
                {/* MOBILE SECTION TOP BORDER: Horizontal border for mobile view */}
                {isTouchDevice && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0, // Container now matches frame width
                      height: '1px',
                      background: 'var(--border)',
                      zIndex: 1
                    }}
                  />
                )}
                {/* Animated left vertical border */}
                {!isTouchDevice && (
                  <motion.div
                    initial={{ scaleY: 0, transformOrigin: 'top' }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: "-150px 0px -150px 0px" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '1px',
                      background: 'var(--border)',
                      zIndex: 1
                    }}
                  />
                )}
                {/* Animated right vertical border */}
                {!isTouchDevice && (
                  <motion.div
                    initial={{ scaleY: 0, transformOrigin: 'top' }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: "-150px 0px -150px 0px" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      bottom: 0,
                      width: '1px',
                      background: 'var(--border)',
                      zIndex: 1
                    }}
                  />
                )}
                <motion.div 
                  className="section-header"
                  {...getAnimationProps(0.4)}
                >
                  {/* VERTICAL LINE 7: Goals section MEGA-EXTENDED vertical border - REMOVED */}
                  
                  <span className="section-label">03.</span>
                  Goals
                </motion.div>
                <motion.div 
                  className="section-content"
                  {...getAnimationProps(0.5)}
                >
                  <ul className="goals-list">
                    {goals.items.map((goal, index) => (
                      <motion.li 
                        key={index} 
                        style={{ display: "flex", flexDirection: "column" }}
                        {...getAnimationProps(0.6 + (index * 0.1))}
                      >
                        <span>{goal.text}</span>
                        {(goal.image || goal.images) && (
                          <motion.div 
                            className="goal-image-container" 
                            style={{
                              marginTop: "20px",
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "center",
                              gap: "20px",
                              flexWrap: "wrap"
                            }}
                            {...getScaleAnimationProps(0.7 + (index * 0.1))}
                          >
                            {goal.image && (
                              <OptimizedImage 
                                src={goal.image} 
                                alt={`Goal ${index + 1} illustration`}
                                width={150}
                                height={100}
                                quality={85}
                                sizes="(max-width: 768px) 30vw, 150px"
                                useOptimized={false}
                                style={{
                                  borderRadius: "8px",
                                  maxWidth: "150px",
                                  height: "auto",
                                  objectFit: "contain"
                                }}
                              />
                            )}
                            {goal.images && goal.images.map((img, imgIndex) => {
                              // Make record.png wider to match post.png height
                              const isRecordImage = img.includes('record.png');
                              const imageWidth = isRecordImage ? 450 : 150;
                              const imageMaxWidth = isRecordImage ? "450px" : "150px";
                              const imageSizes = isRecordImage ? "(max-width: 768px) 80vw, 450px" : "(max-width: 768px) 30vw, 150px";
                              
                              return (
                                <OptimizedImage 
                                  key={imgIndex}
                                  src={img} 
                                  alt={`Goal ${index + 1} illustration ${imgIndex + 1}`}
                                  width={imageWidth}
                                  height={200}
                                  quality={85}
                                  sizes={imageSizes}
                                  useOptimized={false}
                                  style={{
                                    borderRadius: "8px",
                                    maxWidth: imageMaxWidth,
                                    height: "auto"
                                  }}
                                />
                              );
                            })}
                          </motion.div>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Role & Process Sections */}
              {roleProcess.map((role, index) => (
                <div key={index} className="project-section-bordered">
                  {/* PROJECT SECTION TOP BORDER: Animated horizontal border above Role & Process sections */}
                  {!isTouchDevice && (
                    <motion.div
                      initial={{ scaleX: 0, transformOrigin: 'left' }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ 
                        once: true,
                        margin: "-150px 0px -150px 0px"
                      }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0, // Container now matches frame width
                        height: '1px',
                        background: 'var(--border)',
                        zIndex: 1
                      }}
                    />
                  )}
                  {/* MOBILE SECTION TOP BORDER: Horizontal border for mobile view */}
                  {isTouchDevice && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0, // Container now matches frame width
                        height: '1px',
                        background: 'var(--border)',
                        zIndex: 1
                      }}
                    />
                  )}
                  {/* Animated left vertical border */}
                  {!isTouchDevice && (
                    <motion.div
                      initial={{ scaleY: 0, transformOrigin: 'top' }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, margin: "-150px 0px -150px 0px" }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '1px',
                        background: 'var(--border)',
                        zIndex: 1
                      }}
                    />
                  )}
                  {/* Animated right vertical border */}
                  {!isTouchDevice && (
                    <motion.div
                      initial={{ scaleY: 0, transformOrigin: 'top' }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, margin: "-150px 0px -150px 0px" }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: '1px',
                        background: 'var(--border)',
                        zIndex: 1
                      }}
                    />
                  )}
                  <motion.div 
                    className="section-header"
                    {...getAnimationProps(0.4)}
                  >
                    {/* VERTICAL LINE 8+: Role & Process sections MEGA-EXTENDED vertical borders - REMOVED */}
                    
                    <span className="section-label">{String(index + 4).padStart(2, '0')}.</span>
                    {role.title}
                  </motion.div>
                  <motion.div 
                    className="section-content"
                    {...getAnimationProps(0.5)}
                  >
                    <p className="role-description">{role.description}</p>
                    {role.tasks && role.tasks.length > 0 && (
                      <ul className="process-tasks">
                        {role.tasks.map((task, taskIndex) => (
                          <motion.li 
                            key={taskIndex}
                            {...getAnimationProps(0.6 + (taskIndex * 0.1))}
                          >
                            {task.description}
                          </motion.li>
                        ))}
                      </ul>
                    )}
                    {role.images && role.images.length > 0 && (
                      <motion.div 
                        className="relay-images-container role-image-container" 
                        style={{
                          display: "flex",
                          flexDirection: isTouchDevice ? "row" : "column",
                          gap: isTouchDevice ? "60px" : "30px",
                          padding: "20px 0",
                          justifyContent: isTouchDevice ? "center" : "flex-start",
                          alignItems: isTouchDevice ? "center" : "flex-start",
                          maxWidth: "100%",
                          overflow: "visible"
                        }}
                        {...getScaleAnimationProps(0.7)}
                      >
                        {role.images.map((image, imgIndex) => {
                          // Make featured.png much smaller, but larger on mobile
                          const isFeaturedImage = image.includes('featured.png');
                          const imageWidth = isFeaturedImage ? (isTouchDevice ? 160 : 120) : (isTouchDevice ? 380 : 180);
                          const imageMaxWidth = isFeaturedImage ? (isTouchDevice ? '160px' : '120px') : (isTouchDevice ? '380px' : '180px');
                          const imageSizes = isFeaturedImage ? 
                            (isTouchDevice ? "(max-width: 768px) 45vw, 160px" : "(max-width: 768px) 30vw, 120px") : 
                            (isTouchDevice ? "(max-width: 768px) 75vw, 380px" : "(max-width: 768px) 40vw, 180px");
                          
                          return (
                            <OptimizedImage 
                              key={imgIndex}
                              src={image} 
                              alt={`${role.title} image ${imgIndex + 1}`}
                              width={imageWidth}
                              height={isFeaturedImage ? (isTouchDevice ? 200 : 200) : (isTouchDevice ? 300 : 200)}
                              quality={85}
                              sizes={imageSizes}
                              priority={index === 0}
                              useOptimized={false}
                              style={{
                                borderRadius: "8px",
                                maxWidth: imageMaxWidth,
                                height: 'auto',
                                objectFit: 'contain',
                                marginLeft: '0'
                              }}
                            />
                          );
                        })}
                      </motion.div>
                    )}
                    {role.image && (
                      <motion.div 
                        className="relay-design-system-container" 
                        style={{
                          display: "flex",
                          padding: "40px 0",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                        {...getScaleAnimationProps(0.7)}
                      >
                        <OptimizedImage 
                          src={role.image} 
                          alt={`${role.title} design system`}
                          width={role.image.includes('poapflow.png') ? 600 : 1600}
                          height={role.image.includes('poapflow.png') ? 400 : 900}
                          quality={85}
                          sizes={role.image.includes('poapflow.png') ? 
                            "(max-width: 768px) 80vw, (max-width: 1200px) 60vw, 600px" : 
                            "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1600px"}
                          style={{
                            width: '100%',
                            height: 'auto',
                            maxWidth: role.image.includes('poapflow.png') ? '600px' : '100%'
                          }}
                        />
                      </motion.div>
                    )}
                    {role.bottomImage && (
                      <motion.div 
                        className="relay-logo-container role-image-container" 
                        style={{
                          display: "flex",
                          padding: "20px 0",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                        {...getScaleAnimationProps(0.7)}
                      >
                        <OptimizedImage 
                          src={role.bottomImage} 
                          alt={`${role.title} logo`}
                          width={isTouchDevice ? 380 : 180}
                          height={isTouchDevice ? 300 : 200}
                          quality={85}
                          sizes={isTouchDevice ? "(max-width: 768px) 75vw, 380px" : "(max-width: 768px) 40vw, 180px"}
                          useOptimized={false}
                          style={{
                            height: 'auto',
                            maxWidth: isTouchDevice ? '380px' : '180px'
                          }}
                        />
                      </motion.div>
                    )}
                    {role.customContent}
                  </motion.div>
                  {/* Bottom border for last section only */}
                  {!isTouchDevice && index === roleProcess.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0, transformOrigin: 'left' }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: 'var(--border)',
                        zIndex: 1
                      }}
                    />
                  )}
                  {/* Mobile bottom border for last section */}
                  {isTouchDevice && index === roleProcess.length - 1 && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: 'var(--border)',
                        zIndex: 1
                      }}
                    />
                  )}
                </div>
              ))}
              </div>
            </div>
        )}
        </div>
      </div>
        
        {/* Mobile Footer - only visible on mobile */}
        <MobileFooter />
      </div>
    </div>
  );
};

export default ProjectLayout;