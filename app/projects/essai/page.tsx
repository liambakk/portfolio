"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaLinkedin, FaInstagram, FaBehance } from "react-icons/fa";
import CustomCursor from "@/components/CustomCursor";
import Image from "next/image";

export default function EssaiProject() {
  const [activeTab, setActiveTab] = useState("overview");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const router = useRouter();

  const title = "Heuristic";
  const previewImage = "/previews/heuristic1.png";
  const overview = {
    description: "A data analytics platform that uses heuristic algorithms to identify patterns and insights. The system helps businesses make data-driven decisions through intelligent analysis and visualization."
  };
  const team = {
    description: "Data Scientist, Backend Engineer, Visualization Designer",
    members: [
      { name: "Rachel Green", role: "Data Scientist" },
      { name: "Marcus Brown", role: "Backend Engineer" },
      { name: "Lisa Wang", role: "Visualization Designer" }
    ]
  };
  const goals = {
    items: [
      { text: "Develop advanced heuristic analysis algorithms" },
      { text: "Create intuitive data visualization interfaces" },
      { text: "Enable real-time data processing at scale" },
      { text: "Provide actionable insights and recommendations" },
      { text: "Support multiple data sources and formats" }
    ]
  };
  const roleProcess = [
    {
      title: "Role & Process: Visualization Designer",
      description: "Designed interactive data visualizations that make complex analytics accessible to business users.",
      tasks: [
        { description: "Researched data visualization best practices" },
        { description: "Created interactive dashboard components" },
        { description: "Designed responsive chart libraries" },
        { description: "Developed color systems for data representation" },
        { description: "Built custom visualization tools for specific metrics" },
        { description: "Implemented accessibility features for charts" }
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