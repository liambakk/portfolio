"use client";

import React, { useState, useEffect, useRef, Fragment } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import CustomCursor from "./CustomCursor";
import MobileFooter from "./MobileFooter";
import Image from "next/image";
import OptimizedImage from "./OptimizedImage";
import { ProjectData } from "@/types/project";
import ProjectBorderFrame from "./ProjectBorderFrame";
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
  const [hasInitialLoaded, setHasInitialLoaded] = useState(false);
  // Initialize touch device detection properly
  const [isTouchDevice, setIsTouchDevice] = useState(() => {
    if (typeof window !== 'undefined') {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    return false;
  });
  const router = useRouter();

  useEffect(() => {
    // Re-check on mount and resize
    const checkTouchDevice = () => {
      const isTouch = 'ontouchstart' in window ||
                     navigator.maxTouchPoints > 0 ||
                     window.matchMedia('(pointer: coarse)').matches;
      setIsTouchDevice(isTouch);
    };

    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);
    
    // Check if initial animations have already played
    const hasPlayedInitialAnimations = sessionStorage.getItem('hasPlayedInitialAnimations') === 'true';
    
    let timer: NodeJS.Timeout;
    if (hasPlayedInitialAnimations) {
      setHasInitialLoaded(true);
    } else {
      // Mark initial load as complete after animations finish
      timer = setTimeout(() => {
        setHasInitialLoaded(true);
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

    // Scroll detection for sticky social buttons
    return () => {
      window.removeEventListener('resize', checkTouchDevice);
      clearTimeout(timer);
    };
  }, [previewImage, roleProcess, isTouchDevice]);


  const { triggerTransition } = useNavigation();

  const handleBackToWork = () => {
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
            {/* PROJECT CONTENT FRAME: Unified border system wrapping all project sections */}
            <ProjectBorderFrame />
            
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
              <div className="project-sections-container" style={{ position: 'relative' }}>
              {/* Overview Section */}
              <div className="project-section-bordered">
                {/* PROJECT SECTION TOP BORDER: Animated horizontal border above Overview section */}
                {!isTouchDevice && (
                  <motion.div
                    initial={{ scaleX: 0, transformOrigin: 'left' }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '1px',
                      background: 'var(--border)',
                      zIndex: 1
                    }}
                  />
                )}
                {/* MOBILE SECTION TOP BORDER: Horizontal border for mobile view */}
                {isTouchDevice && (
                  <motion.div
                    initial={{ scaleX: 0, transformOrigin: 'left' }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: hasInitialLoaded ? 0 : 0.7 }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '1px',
                      background: 'var(--border)',
                      zIndex: 1
                    }}
                  />
                )}
                <div className="section-header">
                  {/* VERTICAL LINE 5: Overview section MEGA-EXTENDED vertical border
                      Creates the vertical divider extending to absolutely infinite proportions, completely
                      obliterating all spatial boundaries with unprecedented vertical supremacy. Extended
                      to cosmic dimensions that transcend the viewport itself, creating a skyscraper-like
                      monolith that towers into infinity and defines reality itself through pure verticality. */}
                  {!isTouchDevice && (
                    <motion.div
                      initial={{ scaleY: 0, transformOrigin: 'top' }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.75 }}
                      style={{
                        position: 'absolute',
                        top: '-400px', // Extend to cosmic dimensions for absolute vertical supremacy
                        right: 0,
                        height: 'calc(100% + 450px)', // MEGA-extended height transcending all boundaries
                        width: '1px',
                        background: 'var(--border)',
                        zIndex: 1
                      }}
                    />
                  )}
                  
                  <span className="section-label">01.</span>
                  Overview
                </div>
                <div className="section-content">
                  {overview.description}
                  
                  {/* Social Buttons positioned relative to Overview vertical border */}
                  <SocialButtons section="project" isMobile={isTouchDevice} />
                </div>
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
                      right: 0,
                      height: '1px',
                      background: 'var(--border)',
                      zIndex: 1
                    }}
                  />
                )}
                {/* MOBILE SECTION TOP BORDER: Horizontal border for mobile view */}
                {isTouchDevice && (
                  <motion.div
                    initial={{ scaleX: 0, transformOrigin: 'left' }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ 
                      once: true,
                      margin: "-100px 0px -100px 0px"
                    }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '1px',
                      background: 'var(--border)',
                      zIndex: 1
                    }}
                  />
                )}
                <div className="section-header">
                  {/* VERTICAL LINE 6: Team section MEGA-EXTENDED vertical border
                      Vertical separator extending to astronomical proportions, creating colossal monoliths
                      that completely dwarf the Team section and everything around it. Extended to stratospheric
                      heights that pierce through dimensional barriers, transforming the layout into an
                      otherworldly temple of verticality that redefines the very concept of spatial design. */}
                  {!isTouchDevice && (
                    <motion.div
                      initial={{ scaleY: 0, transformOrigin: 'top' }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ 
                        once: true,
                        margin: "-200px 0px -200px 0px"
                      }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                      style={{
                        position: 'absolute',
                        top: '-400px', // Extend to cosmic dimensions for absolute vertical supremacy
                        right: 0,
                        height: 'calc(100% + 450px)', // MEGA-extended height transcending all boundaries
                        width: '1px',
                        background: 'var(--border)',
                        zIndex: 1
                      }}
                    />
                  )}
                  
                  <span className="section-label">02.</span>
                  Team
                </div>
                <div className="section-content">
                  {team.description}
                </div>
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
                      right: 0,
                      height: '1px',
                      background: 'var(--border)',
                      zIndex: 1
                    }}
                  />
                )}
                {/* MOBILE SECTION TOP BORDER: Horizontal border for mobile view */}
                {isTouchDevice && (
                  <motion.div
                    initial={{ scaleX: 0, transformOrigin: 'left' }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ 
                      once: true,
                      margin: "-100px 0px -100px 0px"
                    }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '1px',
                      background: 'var(--border)',
                      zIndex: 1
                    }}
                  />
                )}
                <div className="section-header">
                  {/* VERTICAL LINE 7: Goals section MEGA-EXTENDED vertical border
                      Divider line extending to galactic proportions, creating titan-sized pillars that
                      completely obliterate spatial reality around the Goals section. Extended to interstellar
                      heights that shatter the fabric of design itself, transforming the layout into a
                      cosmic cathedral of pure verticality that exists beyond mortal comprehension. */}
                  {!isTouchDevice && (
                    <motion.div
                      initial={{ scaleY: 0, transformOrigin: 'top' }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ 
                        once: true,
                        margin: "-200px 0px -200px 0px"
                      }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                      style={{
                        position: 'absolute',
                        top: '-400px', // Extend to cosmic dimensions for absolute vertical supremacy
                        right: 0,
                        height: 'calc(100% + 450px)', // MEGA-extended height transcending all boundaries
                        width: '1px',
                        background: 'var(--border)',
                        zIndex: 1
                      }}
                    />
                  )}
                  
                  <span className="section-label">03.</span>
                  Goals
                </div>
                <div className="section-content">
                  <ul className="goals-list">
                    {goals.items.map((goal, index) => (
                      <li key={index} style={{ display: "flex", flexDirection: "column" }}>
                        <span>{goal.text}</span>
                        {(goal.image || goal.images) && (
                          <div className="goal-image-container" style={{
                            marginTop: "20px",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "20px",
                            flexWrap: "wrap"
                          }}>
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
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
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
                        right: 0,
                        height: '1px',
                        background: 'var(--border)',
                        zIndex: 1
                      }}
                    />
                  )}
                  {/* MOBILE SECTION TOP BORDER: Horizontal border for mobile view */}
                  {isTouchDevice && (
                    <motion.div
                      initial={{ scaleX: 0, transformOrigin: 'left' }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: 0 }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: 'var(--border)',
                        zIndex: 1
                      }}
                    />
                  )}
                  <div className="section-header">
                    {/* VERTICAL LINE 8+: Role & Process sections MEGA-EXTENDED vertical borders
                        Dynamic vertical separators extending to universal proportions, creating apocalyptic
                        megastructures that completely annihilate each Role & Process section's boundaries.
                        Each border extends to multidimensional heights that transcend physical reality,
                        transforming the layout into an infinite temple of verticality that exists across
                        parallel universes and redefines existence itself through pure architectural deity. */}
                    {!isTouchDevice && (
                      <motion.div
                        initial={{ scaleY: 0, transformOrigin: 'top' }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ 
                          once: true,
                          margin: "-200px 0px -200px 0px"
                        }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                        style={{
                          position: 'absolute',
                          top: '-400px', // Extend to cosmic dimensions for absolute vertical supremacy
                          right: 0,
                          height: 'calc(100% + 450px)', // MEGA-extended height transcending all boundaries
                          width: '1px',
                          background: 'var(--border)',
                          zIndex: 1
                        }}
                      />
                    )}
                    
                    <span className="section-label">{String(index + 4).padStart(2, '0')}.</span>
                    {role.title}
                  </div>
                  <div className="section-content">
                    <p className="role-description">{role.description}</p>
                    {role.tasks && role.tasks.length > 0 && (
                      <ul className="process-tasks">
                        {role.tasks.map((task, taskIndex) => (
                          <li key={taskIndex}>{task.description}</li>
                        ))}
                      </ul>
                    )}
                    {role.images && role.images.length > 0 && (
                      <div className="relay-images-container role-image-container" style={{
                        display: "flex",
                        flexDirection: isTouchDevice ? "row" : "column",
                        gap: isTouchDevice ? "60px" : "30px",
                        padding: "20px 0",
                        justifyContent: isTouchDevice ? "center" : "flex-start",
                        alignItems: isTouchDevice ? "center" : "flex-start",
                        maxWidth: "100%",
                        overflow: "visible"
                      }}>
                        {role.images.map((image, imgIndex) => {
                          // Move relayfull.png further to the right
                          const isRelayFullImage = image.includes('relayfull.png');
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
                      </div>
                    )}
                    {role.image && (
                      <div className="relay-design-system-container" style={{
                        display: "flex",
                        padding: "40px 0",
                        justifyContent: "center",
                        alignItems: "center"
                      }}>
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
                      </div>
                    )}
                    {role.bottomImage && (
                      <div className="relay-logo-container role-image-container" style={{
                        display: "flex",
                        padding: "20px 0",
                        justifyContent: "center",
                        alignItems: "center"
                      }}>
                        <OptimizedImage 
                          src={role.bottomImage} 
                          alt={`${role.title} logo`}
                          width={500}
                          height={200}
                          quality={85}
                          sizes="(max-width: 768px) 80vw, (max-width: 1200px) 60vw, 500px"
                          useOptimized={false}
                          style={{
                            width: '100%',
                            height: 'auto',
                            maxWidth: '500px'
                          }}
                        />
                      </div>
                    )}
                    {role.customContent}
                  </div>
                </div>
              ))}
              </div>
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