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
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const casesListRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1025);
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

      {/* Top horizontal border */}
      {!isMobile && (
        <div
          style={{
            position: 'absolute',
            top: '152px',
            left: '100px',
            right: '30px',
            height: '1px',
            background: 'var(--border)',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />
      )}

      {/* Vertical border connecting top to bottom at right edge */}
      {!isMobile && (
        <div
          style={{
            position: 'absolute',
            top: '152px',
            right: '30px',
            width: '1px',
            height: '324px',
            background: 'var(--border)',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />
      )}

      {/* Horizontal border connecting bottom of vertical lines */}
      {!isMobile && (
        <div
          style={{
            position: 'absolute',
            top: '476px',
            left: 'calc(57% - 182px)',
            right: '30px',
            height: '1px',
            background: 'var(--border)',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />
      )}


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
      <div
        className="left-sidebar"
        style={{
          gridArea: 'left-sidebar',
          display: isMobile ? 'none' : 'flex',
          alignItems: 'flex-start',
          paddingTop: '16px',
          paddingLeft: '32px',
          position: 'relative'
        }}
      >
        <div className="logo">LB</div>
        {/* Horizontal border under logo */}
        {!isMobile && (
          <div
            style={{
              position: 'absolute',
              top: '72px',
              left: '30px',
              right: '0',
              height: '1px',
              background: 'var(--border)',
              pointerEvents: 'none'
            }}
          />
        )}
      </div>

      {/* Project Preview */}
      {activeTab === "work" && previewImage && !isMobile && (
        <div
          className="project-preview"
          style={{
            position: 'fixed',
            right: 'calc(43% + 280px)',
            top: '40%',
            transform: 'translateY(-50%)',
            width: 'calc(57% - 240px)',
            maxWidth: '600px',
            zIndex: 20,
            pointerEvents: 'none',
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          <img
            src={previewImage}
            alt="Project preview"
            style={{
              width: '100%',
              height: 'auto',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
            }}
          />
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
                  paddingLeft: '0',
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
              <div
                className="about-content-box"
                style={!isMobile ? {
                  marginLeft: '-30px',
                  borderLeft: '1px solid var(--border)',
                  borderRight: '1px solid var(--border)',
                  marginRight: '-1px'
                } : {}}
              >
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
              <div
                className="contact-content-box"
                style={!isMobile ? {
                  marginLeft: '-30px',
                  borderLeft: '1px solid var(--border)',
                  borderRight: '1px solid var(--border)',
                  marginRight: '-1px'
                } : {}}
              >
                <p>hello@example.com</p>
                <p className="mt-2">Based in Your City</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar - Social Links */}
      <div
        className="right-sidebar"
        style={!isMobile ? {
          gridArea: 'right-sidebar',
          display: 'flex',
          alignItems: 'flex-start',
          paddingTop: '90px',
          paddingLeft: '0',
          marginLeft: 'calc(-15% - 160px)',
          justifyContent: 'flex-start',
          position: 'relative'
        } : {
          display: 'none'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              onMouseEnter={() => setHoveredSocial(social.label)}
              onMouseLeave={() => setHoveredSocial(null)}
              style={{
                color: hoveredSocial === social.label ? 'var(--foreground)' : '#ffffff',
                textDecoration: 'none',
                fontSize: '13px',
                transition: 'color 0.2s',
                fontWeight: 400
              }}
            >
              {social.label}
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