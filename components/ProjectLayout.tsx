"use client";

import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import CustomCursor from "./CustomCursor";
import MobileFooter from "./MobileFooter";
import Image from "next/image";
import OptimizedImage from "./OptimizedImage";
import { ProjectData } from "@/types/project";
import ProjectBorderFrame from "./ProjectBorderFrame";
import { useNavigation } from "./ClientWrapper";

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
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
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

  const socialLinks = [
    { icon: FaLinkedin, href: "https://linkedin.com", label: "Linkedin" },
    { icon: FaGithub, href: "https://github.com/liambakk", label: "Git" },
    { icon: FaXTwitter, href: "https://x.com", label: "X" },
  ];

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
    
    // Mark initial load as complete after animations finish
    const timer = setTimeout(() => {
      setHasInitialLoaded(true);
    }, 1000);

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
        
        {/* Fixed Social Links - Outside scrollable area */}
        <div className="project-right-sidebar-fixed">
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
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
                  color: hoveredSocial === social.label ? 'var(--foreground)' : 'inherit',
                  transition: 'color 0.2s'
                }}
              >
                <span className="social-text">{social.label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      
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
            {/* PROJECT COPYRIGHT BORDER: Left vertical border of copyright text */}
            {!isTouchDevice && (hasInitialLoaded ? (
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  top: 24,
                  width: '1px',
                  background: 'var(--border)'
                }}
              />
            ) : (
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
            ))}
          </motion.div>
          
          <div
            className="nav-tabs-right"
            onMouseLeave={handleTabLeave}
            style={{ position: 'relative' }}
          >
            {/* PROJECT TAB TOP BAR: White horizontal accent bar above tab section */}
            {!isTouchDevice && (hasInitialLoaded ? (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '8px',
                  background: '#ffffff'
                }}
              />
            ) : (
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
            ))}
            {/* PROJECT TAB BORDER LEFT: Left vertical border of tab navigation section */}
            {!isTouchDevice && (hasInitialLoaded ? (
              <div
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
            ) : (
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
            ))}
            {/* PROJECT TAB DIVIDER: Vertical separator between Overview and Back to Work tabs */}
            {!isTouchDevice && (hasInitialLoaded ? (
              <div
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
            ) : (
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
            ))}
            {/* PROJECT TAB BORDER RIGHT: Right vertical border of tab navigation section */}
            {!isTouchDevice && (hasInitialLoaded ? (
              <div
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
            ) : (
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
            ))}
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
        {!isTouchDevice && (hasInitialLoaded ? (
          <div
            style={{
              marginLeft: '30px',
              marginRight: '30px',
              height: '1px',
              background: 'var(--border)',
              pointerEvents: 'none'
            }}
          />
        ) : (
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
        ))}

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
                {/* PROJECT CONTENT FRAME: Unified border system wrapping all project sections */}
                <ProjectBorderFrame />
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
              <div className="project-sections-container">
              {/* Overview Section */}
              <div className="project-section-bordered">
                <div className="section-header">
                  <span className="section-label">01.</span>
                  Overview
                </div>
                <div className="section-content">
                  {overview.description}
                </div>
              </div>

              {/* Team Section */}
              <div className="project-section-bordered">
                <div className="section-header">
                  <span className="section-label">02.</span>
                  Team
                </div>
                <div className="section-content">
                  {team.description}
                </div>
              </div>

              {/* Goals Section */}
              <div className="project-section-bordered">
                <div className="section-header">
                  <span className="section-label">03.</span>
                  Goals
                </div>
                <div className="section-content">
                  <ul className="goals-list">
                    {goals.items.map((goal, index) => (
                      <li key={index}>{goal.text}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Role & Process Section */}
              {roleProcess.map((role, index) => (
                <div key={index} className="project-section-bordered">
                  <div className="section-header">
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
                        gap: "20px",
                        padding: "20px 0",
                        justifyContent: "center",
                        alignItems: "center"
                      }}>
                        {role.images.map((image, imgIndex) => (
                          <OptimizedImage 
                            key={imgIndex}
                            src={image} 
                            alt={`${role.title} image ${imgIndex + 1}`}
                            width={450}
                            height={300}
                            quality={85}
                            sizes="(max-width: 768px) 100vw, 450px"
                            priority={index === 0}
                            style={{
                              width: '100%',
                              height: 'auto'
                            }}
                          />
                        ))}
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
                          width={1600}
                          height={900}
                          quality={85}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1600px"
                          style={{
                            width: '100%',
                            height: 'auto'
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
                          width={938}
                          height={300}
                          quality={85}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 938px"
                          style={{
                            width: '100%',
                            height: 'auto'
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