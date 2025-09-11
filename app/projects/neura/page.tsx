"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaLinkedin, FaInstagram, FaBehance } from "react-icons/fa";
import CustomCursor from "@/components/CustomCursor";
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
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: FaBehance, href: "https://behance.net", label: "Behance" },
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
              className="tab-fill"
              style={{
                transform: `translateX(${
                  (hoveredTab || activeTab) === "overview" ? 0 :
                  (hoveredTab || activeTab) === "process" ? 100 :
                  200
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
              className={`tab ${activeTab === "process" ? "active" : ""} ${
                (hoveredTab === "process" || (!hoveredTab && activeTab === "process")) ? "has-fill" : ""
              }`}
              onClick={() => setActiveTab("process")}
              onMouseEnter={() => setHoveredTab("process")}
            >
              Process
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

        {activeTab === "process" && (
          <div className="project-content-wrapper">
            <div className="project-sections-container" style={{ marginTop: '0' }}>
              {/* Role & Process Section for Process Tab */}
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
      </div>
    </div>
  );
}