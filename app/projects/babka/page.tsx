"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import CustomCursor from "@/components/CustomCursor";
import MobileFooter from "@/components/MobileFooter";
import Image from "next/image";

export default function BabkaProject() {
  const [activeTab, setActiveTab] = useState("overview");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [socialIsSticky, setSocialIsSticky] = useState(false);
  const router = useRouter();
  const socialRef = useRef<HTMLDivElement>(null);

  const title = "Babka";
  const previewImage = undefined; // No preview image provided
  const overview = {
    description: "A modern bakery management system designed to streamline operations for artisanal bakeries. The platform integrates inventory management, customer ordering, and production scheduling into a unified solution."
  };
  const team = {
    description: "Product Designer, Front-End Developer, Back-End Developer",
    members: [
      { name: "Sarah Chen", role: "Product Designer" },
      { name: "Michael Rodriguez", role: "Front-End Developer" },
      { name: "Alex Kim", role: "Back-End Developer" }
    ]
  };
  const goals = {
    items: [
      { text: "Streamline bakery operations and reduce manual processes" },
      { text: "Improve inventory tracking and reduce waste" },
      { text: "Enhance customer ordering experience" },
      { text: "Provide real-time production scheduling" },
      { text: "Enable data-driven decision making for bakery owners" }
    ]
  };
  const roleProcess = [
    {
      title: "Role & Process: UX/UI Designer",
      description: "Led the design process from research to final implementation, ensuring a user-centered approach throughout the project.",
      tasks: [
        { description: "Conducted user interviews with bakery owners and staff" },
        { description: "Created user journey maps and personas" },
        { description: "Developed wireframes and interactive prototypes" },
        { description: "Designed the visual interface and design system" },
        { description: "Collaborated with developers for implementation" },
        { description: "Conducted usability testing and iterations" }
      ]
    }
  ];

  const socialLinks = [
    { icon: FaLinkedin, href: "https://linkedin.com", label: "Linkedin" },
    { icon: FaGithub, href: "https://github.com/liambakk", label: "Git" },
    { icon: FaXTwitter, href: "https://x.com", label: "X" },
  ];

  useEffect(() => {
    // Set document title
    document.title = 'Babka';

    // Scroll detection for sticky social buttons
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      // Clear the timeout to debounce the scroll handler
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        // Only handle sticky behavior on desktop
        if (window.innerWidth > 1024 && socialRef.current) {
          const rect = socialRef.current.getBoundingClientRect();
          // Make social buttons sticky when they're about to scroll out of viewport
          // Stick when top edge is 20px or less from viewport top
          setSocialIsSticky(rect.top <= 20);
        }
      }, 10); // Small debounce for performance
    };

    // Add scroll listener only on desktop
    // Need to listen to the scrollable container, not window
    const scrollableElement = document.querySelector('.project-scrollable-content');
    if (window.innerWidth > 1024 && scrollableElement) {
      scrollableElement.addEventListener('scroll', handleScroll);
      // Check initial scroll position
      handleScroll();
    }

    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener('scroll', handleScroll);
      }
      clearTimeout(scrollTimeout);
    };
  }, []);

  const handleBackToWork = () => {
    router.push("/");
  };

  return (
    <div className="project-page-container">
        <CustomCursor />
        
        {/* Fixed Social Links - Outside scrollable area */}
        <div ref={socialRef} className={`project-right-sidebar-fixed ${socialIsSticky ? 'project-right-sidebar-sticky' : ''}`}>
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
        <div className="project-top-bar">
          <div className="copyright">© 2025</div>
          
          <div 
            className="nav-tabs-right"
            onMouseLeave={() => setHoveredTab(null)}
          >
            <div 
              className="tab-fill-two"
              style={{
                transform: `translateX(${
                  (hoveredTab || activeTab) === "overview" ? 0 :
                  100
                }%)`,
                opacity: hoveredTab !== null || activeTab ? 1 : 0
              }}
            />
            <button
              className={`tab ${activeTab === "overview" ? "active" : ""} ${
                (hoveredTab === "overview" || (!hoveredTab && activeTab === "overview")) ? "has-fill" : ""
              }`}
              onClick={() => setActiveTab("overview")}
              onMouseEnter={() => setHoveredTab("overview")}
            >
              Overview
            </button>
            <button
              className={`tab ${activeTab === "back" ? "active" : ""} ${
                (hoveredTab === "back" || (!hoveredTab && activeTab === "back")) ? "has-fill" : ""
              }`}
              onClick={handleBackToWork}
              onMouseEnter={() => setHoveredTab("back")}
            >
              Back to Work
            </button>
          </div>
        </div>

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
            {/* Vertical line on left side */}
            <div className="project-vertical-line-left"></div>
            <div className="project-section">
              <h1 className="project-page-title">{title}</h1>
              <div className="project-title-border"></div>
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
              <div key={index} className="project-section-bordered">
                <div className="section-header">{role.title}</div>
                <div className="section-content">
                  <p className="role-description">{role.description}</p>
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
}