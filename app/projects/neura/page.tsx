"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import CustomCursor from "@/components/CustomCursor";
import MobileFooter from "@/components/MobileFooter";
import Image from "next/image";

export default function NeuraProject() {
  const [activeTab, setActiveTab] = useState("overview");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const router = useRouter();

  const title = "Neura Browser Extension";
  const previewImage = "/previews/neura1.png";
  const overview = {
    description: "An intelligent browser extension that enhances web browsing with AI-powered features. Neura provides smart summarization, content extraction, and automated workflows to improve productivity."
  };
  const team = {
    description: "Extension Developer, ML Engineer, UX Designer",
    members: [
      { name: "Kevin Zhang", role: "Extension Developer" },
      { name: "Priya Patel", role: "ML Engineer" },
      { name: "Jordan Lee", role: "UX Designer" }
    ]
  };
  const goals = {
    items: [
      { text: "Integrate AI capabilities seamlessly into browsing" },
      { text: "Minimize performance impact on browser" },
      { text: "Ensure user privacy and data protection" },
      { text: "Provide customizable automation workflows" },
      { text: "Support cross-browser compatibility" }
    ]
  };
  const roleProcess = [
    {
      title: "Role & Process: Extension Developer",
      description: "Built the browser extension architecture focusing on performance, security, and cross-browser compatibility.",
      tasks: [
        { description: "Developed manifest V3 compliant extension structure" },
        { description: "Implemented background service workers for processing" },
        { description: "Created content scripts for page interaction" },
        { description: "Built popup interface and options page" },
        { description: "Integrated ML models using WebAssembly" },
        { description: "Established secure communication protocols" }
      ]
    }
  ];

  const socialLinks = [
    { icon: FaLinkedin, href: "https://linkedin.com", label: "Linkedin" },
    { icon: FaGithub, href: "https://github.com/liambakk", label: "Git" },
    { icon: FaXTwitter, href: "https://x.com", label: "X" },
  ];

  const handleBackToWork = () => {
    router.push("/");
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
              <h1 className="project-page-title" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {title}
                <FiExternalLink
                  style={{
                    fontSize: "0.7em",
                    opacity: 0.7,
                    cursor: "pointer",
                    transition: "opacity 0.2s ease",
                    color: "#FFF",
                    marginTop: "4px"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = "0.7"}
                  onClick={() => window.open("https://www.neura.fyi", "_blank")}
                />
              </h1>
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

            {/* Features Section */}
            <div className="project-section-bordered">
              <div className="section-header">Key Features</div>
              <div className="section-content">
                <p className="role-description">
                  The extension leverages advanced natural language processing to provide intelligent assistance across various web activities.
                </p>
                <div style={{
                  position: "relative",
                  width: "100%",
                  margin: "1.5rem 0",
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                  flexWrap: "wrap"
                }}>
                  <Image
                    src="/neuraext.png"
                    alt="Neura Browser Extension Interface"
                    width={400}
                    height={300}
                    quality={100}
                    style={{
                      width: "48%",
                      minWidth: "280px",
                      height: "auto",
                      borderRadius: "8px"
                    }}
                  />
                  <Image
                    src="/box.png"
                    alt="Neura Extension Settings"
                    width={400}
                    height={300}
                    quality={100}
                    style={{
                      width: "48%",
                      minWidth: "280px",
                      height: "auto",
                      borderRadius: "8px"
                    }}
                  />
                </div>
                <ul className="process-tasks">
                  <li>One-click page summarization with key point extraction</li>
                  <li>Smart text selection with contextual AI actions</li>
                  <li>Automated form filling using intelligent data recognition</li>
                  <li>Real-time language translation with context awareness</li>
                  <li>Custom workflow automation with visual scripting</li>
                  <li>Privacy-focused local processing for sensitive data</li>
                </ul>
              </div>
            </div>

            {/* Role & Process Section */}
            {roleProcess.map((role, index) => (
              <div key={index} className="project-section-bordered">
                <div className="section-header">{role.title}</div>
                <div className="section-content">
                  <p className="role-description">{role.description}</p>
                  <div style={{
                    position: "relative",
                    width: "100%",
                    margin: "1.5rem 0",
                    display: "flex",
                    justifyContent: "center"
                  }}>
                    <Image
                      src="/neurabox.png"
                      alt="Neura Extension Features"
                      width={600}
                      height={400}
                      quality={100}
                      style={{
                        width: "100%",
                        maxWidth: "600px",
                        height: "auto",
                        borderRadius: "8px"
                      }}
                    />
                  </div>
                  <div style={{
                    width: "100%",
                    margin: "2rem 0",
                    display: "flex",
                    justifyContent: "center"
                  }}>
                    <Image
                      src="/neurabox.gif"
                      alt="Neura Extension Demo"
                      width={800}
                      height={600}
                      quality={100}
                      unoptimized
                      style={{
                        width: "100%",
                        maxWidth: "800px",
                        height: "auto",
                        borderRadius: "8px"
                      }}
                    />
                  </div>
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

            {/* Demo Section */}
            <div className="project-section-bordered">
              <div className="section-header">Live Demo</div>
              <div className="section-content">
                <p className="role-description">
                  Experience Neura in action as it intelligently extracts and processes information from web pages, providing instant insights and summaries.
                </p>
                <div style={{
                  position: "relative",
                  width: "100%",
                  margin: "1.5rem 0",
                  display: "flex",
                  justifyContent: "center"
                }}>
                  <Image
                    src="/neura.gif"
                    alt="Neura Extension Demo"
                    width={800}
                    height={500}
                    quality={100}
                    unoptimized
                    style={{
                      width: "100%",
                      maxWidth: "800px",
                      height: "auto",
                      borderRadius: "8px"
                    }}
                  />
                </div>
              </div>
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
}