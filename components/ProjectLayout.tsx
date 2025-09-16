"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import CustomCursor from "./CustomCursor";
import MobileFooter from "./MobileFooter";
import Image from "next/image";
import { ProjectData } from "@/types/project";
import BorderSystem, { BorderContainer } from "./BorderSystem";
import ProjectBorderFrame from "./ProjectBorderFrame";

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

    return () => {
      window.removeEventListener('resize', checkTouchDevice);
    };
  }, []);

  const handleBackToWork = () => {
    router.push("/");
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
      
      {/* Scrollable Content Wrapper */}
      <div className="project-scrollable-content">
        {/* Top Bar */}
        <BorderContainer
          className="project-top-bar"
          borders={[
            {
              type: "horizontal",
              position: "bottom",
              customStyles: {
                left: "70px",
                right: "70px",
                width: "calc(100% - 140px)"
              }
            }
          ]}
        >
          <div className="copyright" style={{ position: 'relative' }}>
            © 2025
            {/* Copyright left vertical border */}
            {!isTouchDevice && (
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
            )}
            {/* Copyright bottom horizontal border */}
            {!isTouchDevice && (
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: '1px',
                  background: 'var(--border)'
                }}
              />
            )}
          </div>
          
          <div
            className="nav-tabs-right"
            onMouseLeave={handleTabLeave}
            style={{ position: 'relative' }}
          >
            {/* White bar at top of tabs */}
            {!isTouchDevice && (
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
            )}
            {/* Left border of tab section */}
            {!isTouchDevice && (
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
            )}
            {/* Bottom border of tabs */}
            {!isTouchDevice && (
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: '1px',
                  background: 'var(--border)',
                  zIndex: 2
                }}
              />
            )}
            {/* Tab divider (between Overview and Back to Work) */}
            {!isTouchDevice && (
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
            )}
            {/* Right border of tab section */}
            {!isTouchDevice && (
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
            )}
            <div
              className="tab-fill"
              style={{
                transform: `translateX(${
                  (hoveredTab || activeTab) === "overview" ? 0 :
                  (hoveredTab || activeTab) === "back" ? 100 : 0
                }%)`,
                opacity: hoveredTab !== null || activeTab ? 1 : 0,
                width: "50%" // Two tabs instead of three
              }}
            />
            <button
              className={`tab ${activeTab === "overview" ? "active" : ""} ${
                (hoveredTab === "overview" || (!hoveredTab && activeTab === "overview")) ? "has-fill" : ""
              }`}
              onClick={() => setActiveTab("overview")}
              onMouseEnter={() => handleTabHover("overview")}
              onTouchStart={(e) => {
                e.preventDefault();
                setActiveTab("overview");
              }}
            >
              Overview
            </button>
            <button
              className={`tab ${activeTab === "back" ? "active" : ""} ${
                (!isTouchDevice && hoveredTab === "back") ? "has-fill" : ""
              }`}
              onClick={handleBackToWork}
              onMouseEnter={() => handleTabHover("back")}
              onTouchStart={(e) => {
                e.preventDefault();
                handleBackToWork();
              }}
            >
              Back to Work
            </button>
          </div>
        </BorderContainer>

        {/* Main Content Area */}
        <div className="project-main-area">
          {/* Left Sidebar - Logo */}
          <div className="project-left-sidebar">
            <div className="logo" onClick={handleBackToWork} style={{ cursor: "none" }}>
              LB
            </div>
          </div>

          {/* Main Content */}
          <div className="project-main-content">
        {activeTab === "overview" && (
          <div className="project-content-wrapper">
            <div className="project-section">
              <h1 className="project-page-title" style={externalLink ? { display: "flex", alignItems: "center", gap: "12px" } : undefined}>
                {title}
                {externalLink && titleIcon}
              </h1>
              {/* Unified border frame component */}
              <ProjectBorderFrame />
              {previewImage && (
                <div className="project-image-container">
                  <Image 
                    src={previewImage} 
                    alt={`${title} preview`}
                    width={780}
                    height={520}
                    quality={100}
                    priority
                  />
                </div>
              )}
            </div>
            <div className="project-sections-container">
              {/* Overview Section */}
              <div className="project-section-bordered">
                <div className="section-header">Overview</div>
                <div className="section-content">
                  {overview.description}
                </div>
              </div>

            {/* Team Section */}
            <div className="project-section-bordered">
              <div className="section-header">Team</div>
              <div className="section-content">
                {team.description}
              </div>
            </div>

            {/* Goals Section */}
            <div className="project-section-bordered">
              <div className="section-header">Goals</div>
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
              <div
                key={index}
                className="project-section-bordered"
              >
                <div className="section-header">{role.title}</div>
                <div className="section-content">
                  {role.description && <p className="role-description">{role.description}</p>}
                  {/* Handle Relay-specific images */}
                  {role.images && (
                    <div className="relay-images-container role-image-container" style={{
                      display: "flex",
                      gap: "20px",
                      padding: "20px 0",
                      justifyContent: "center",
                      alignItems: "center"
                    }}>
                      {role.images.map((img, imgIndex) => (
                        <Image
                          key={imgIndex}
                          src={img}
                          alt={`${role.title} image ${imgIndex + 1}`}
                          width={450}
                          height={300}
                          quality={100}
                        />
                      ))}
                    </div>
                  )}
                  {role.bottomImage && (
                    <div className="relay-logo-container role-image-container" style={{
                      display: "flex",
                      padding: "20px 0",
                      justifyContent: "center",
                      alignItems: "center"
                    }}>
                      <Image
                        src={role.bottomImage}
                        alt={`${role.title} logo`}
                        width={938}
                        height={300}
                        quality={100}
                      />
                    </div>
                  )}
                  {role.image && (
                    <div className="relay-design-system-container" style={{
                      display: "flex",
                      padding: "40px 0",
                      justifyContent: "center",
                      alignItems: "center"
                    }}>
                      <Image
                        src={role.image}
                        alt={`${role.title} design system`}
                        width={1600}
                        height={900}
                        quality={100}
                      />
                    </div>
                  )}
                  {role.customContent}
                  {role.tasks.length > 0 && (
                    <ul className="process-tasks">
                      {role.tasks.map((task, taskIndex) => (
                        <li key={taskIndex}>{task.description}</li>
                      ))}
                    </ul>
                  )}
                </div>
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