"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaLinkedin, FaInstagram, FaBehance } from "react-icons/fa";
import CustomCursor from "./CustomCursor";
import Image from "next/image";

interface ProjectLayoutProps {
  title: string;
  previewImage?: string;
}

const ProjectLayout = ({ title, previewImage }: ProjectLayoutProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const router = useRouter();

  const socialLinks = [
    { icon: FaLinkedin, href: "https://linkedin.com", label: "Linkedin" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: FaBehance, href: "https://behance.net", label: "Behance" },
  ];

  const handleBackToWork = () => {
    router.push("/");
  };

  return (
    <div className="grid-container project-page">
      <CustomCursor />
      <div className="project-vertical-border"></div>
      
      {/* Top Bar */}
      <div className="top-bar">
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

      {/* Left Sidebar - Logo */}
      <div className="left-sidebar">
        <div className="logo" onClick={handleBackToWork} style={{ cursor: "none" }}>
          LB
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {activeTab === "overview" && (
          <div className="project-section">
            <h1 className="section-title">{title}</h1>
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
        )}

        {activeTab === "process" && (
          <div className="project-section">
            <h1 className="section-title">Process</h1>
          </div>
        )}
      </div>

      {/* Right Sidebar - Social Links */}
      <div className="right-sidebar">
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

      {/* Bottom Bar */}
      <div className="bottom-bar"></div>
    </div>
  );
};

export default ProjectLayout;