"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import CustomCursor from "./CustomCursor";
import MobileFooter from "./MobileFooter";

const GridLayout = () => {
  const [activeTab, setActiveTab] = useState("work");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const casesListRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cases = [
    { id: 1, title: "Relay", preview: "/previews/relay.png", slug: "relay" },
    { id: 2, title: "Neura Browser Extension", preview: "/previews/neura.png", slug: "neura" },
    { id: 3, title: "Poap Global", preview: "/previews/poap.png", slug: "poap-global" },
    { id: 4, title: "Heuristic", preview: "/previews/heuristic.png", slug: "essai" },
  ];

  const handleProjectClick = (slug: string) => {
    router.push(`/projects/${slug}`);
  };

  const socialLinks = [
    { icon: FaLinkedin, href: "https://linkedin.com", label: "Linkedin" },
    { icon: FaGithub, href: "https://github.com/liambakk", label: "Git" },
    { icon: FaXTwitter, href: "https://x.com", label: "X" },
  ];

  return (
    <div className="grid-container">
      <CustomCursor />
      
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
                (hoveredTab || activeTab) === "work" ? 0 :
                (hoveredTab || activeTab) === "about" ? 100 :
                200
              }%)`,
              opacity: hoveredTab !== null || activeTab ? 1 : 0
            }}
          />
          <button
            className={`tab ${activeTab === "work" ? "active" : ""} ${
              (hoveredTab === "work" || (!hoveredTab && activeTab === "work")) ? "has-fill" : ""
            }`}
            onClick={() => setActiveTab("work")}
            onMouseEnter={() => setHoveredTab("work")}
          >
            Work
          </button>
          <button
            className={`tab ${activeTab === "about" ? "active" : ""} ${
              (hoveredTab === "about" || (!hoveredTab && activeTab === "about")) ? "has-fill" : ""
            }`}
            onClick={() => setActiveTab("about")}
            onMouseEnter={() => setHoveredTab("about")}
          >
            About
          </button>
          <button
            className={`tab ${activeTab === "contact" ? "active" : ""} ${
              (hoveredTab === "contact" || (!hoveredTab && activeTab === "contact")) ? "has-fill" : ""
            }`}
            onClick={() => setActiveTab("contact")}
            onMouseEnter={() => setHoveredTab("contact")}
          >
            Contact
          </button>
        </div>
      </div>

      {/* Left Sidebar - Logo */}
      <div className="left-sidebar">
        <div className="logo">LB</div>
      </div>

      {/* Project Preview */}
      {activeTab === "work" && previewImage && (
        <div className="project-preview">
          <img src={previewImage} alt="Project preview" />
        </div>
      )}

      {/* Main Content */}
      <div className="main-content">
        {activeTab === "work" && (
          <div className="cases-section">
            <h1 className="section-title">Work</h1>
            <div className="cases-list" ref={casesListRef}>
              <div
                className="cases-inner"
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  setPreviewImage(null);
                }}
                style={!isMobile ? {
                  marginLeft: '-30px',
                  paddingLeft: '30px',
                  borderLeft: '1px solid var(--border)',
                  borderRight: '1px solid var(--border)',
                  marginRight: '-1px'
                } : {}}
              >
                {hoveredIndex !== null && (
                  <div 
                    className="cases-fill"
                    ref={fillRef}
                    style={{
                      transform: `translateY(${
                        hoveredIndex === 0 ? -1 : 
                        hoveredIndex === 1 ? 79 :
                        hoveredIndex === 2 ? 160 :
                        hoveredIndex === 3 ? 241 :
                        hoveredIndex * 74 + 5
                      }px)`
                    }}
                  />
                )}
                {cases.map((caseItem, index) => {
                  const isLastItem = index === cases.length - 1;

                  return (
                    <div
                      key={caseItem.id}
                      className="case-item"
                      onMouseEnter={() => {
                        setHoveredIndex(index);
                        setPreviewImage(caseItem.preview);
                      }}
                      onClick={() => handleProjectClick(caseItem.slug)}
                      style={{
                        padding: '24px 20px',
                        fontSize: '20px',
                        borderBottom: isLastItem ? 'none' : '1px solid var(--border)',
                        fontWeight: 400,
                        width: '100%',
                        position: 'relative',
                        zIndex: 1,
                        transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        color: hoveredIndex === index ? '#000000' : 'inherit'
                      }}
                    >
                      {caseItem.title}
                      {isLastItem && !isMobile && (
                        <>
                          {/* Horizontal border extending from last case item */}
                          <div
                            style={{
                              position: 'absolute',
                              bottom: 0,
                              left: '-30px',
                              width: 'calc(100% + 30px + 892px)',
                              height: '1px',
                              background: 'var(--border)',
                              pointerEvents: 'none'
                            }}
                          />
                          {/* Right vertical border extending upward */}
                          <div
                            style={{
                              position: 'absolute',
                              bottom: 0,
                              left: 'calc(100% + 862px)',
                              width: '1px',
                              height: '324px',
                              background: 'var(--border)',
                              zIndex: 10,
                              pointerEvents: 'none'
                            }}
                          />
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === "about" && (
          <div className="about-section">
            <h1 className="section-title">About</h1>
            <div className="about-content">
              <div className="about-content-box">
                <p>Product designer with over 7 years of experience focused on developing and maintaining design systems.</p>
                <p className="mt-4">Currently working as a Design System Expert, creating scalable and consistent design solutions.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="contact-section">
            <h1 className="section-title">Contact</h1>
            <div className="contact-content">
              <div className="contact-content-box">
                <p>hello@example.com</p>
                <p className="mt-2">Based in Your City</p>
              </div>
            </div>
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
      <div className="bottom-bar">
        <span className="bottom-name">Liam Bakker</span>
      </div>

      {/* Mobile Footer - only visible on mobile */}
      <MobileFooter />
    </div>
  );
};

export default GridLayout;