"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaLinkedin, FaInstagram, FaBehance } from "react-icons/fa";
import CustomCursor from "@/components/CustomCursor";
import MobileFooter from "@/components/MobileFooter";
import Image from "next/image";

export default function RelayProject() {
  const [activeTab, setActiveTab] = useState("overview");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const router = useRouter();

  const title = "Relay";
  const previewImage = "/previews/relay1.png";
  const overview = {
    description: "Relay is a mobile app that helps you find compatible workout partners nearby when you want to exercise. Think of it as a social network specifically designed for fitness enthusiasts who want to connect with others for workouts."
  };
  const team = {
    description: "Ever wanted to go for a run, hit the gym, or play a sport but didn't have anyone to join you? Or maybe your usual workout partner cancelled last minute? Relay instantly connects you with people nearby who share your fitness interests, so that you can connect through the shared medium of exercise. Over the past 3 years we have seen the proliferation of exercise clubs of all types- predeminantly running clubs. While these have been great, and responsible for the forming of numerous new relationships, they still lack the intamicy that working out provides- the ability to push each other, and grow together. Relay was created as the platform to enable this, by simplifying the process of finding those who have similar interests, and share the same goals as you do- allowing you to find people to train with, regardless of where you are.",
    members: [
      { name: "James Wilson", role: "System Architect" },
      { name: "Sofia Martinez", role: "UI/UX Designer" },
      { name: "Chris Anderson", role: "DevOps Engineer" }
    ]
  };
  const goals = {
    items: [
      { text: "Broadcast Your Workout - When you're ready to exercise, simply open the app and share what activity you want to do (running, cycling, gym, yoga, etc.)." },
      { text: "Find Compatible Partners - The app shows you nearby users who match your fitness level, schedule, and activity preferences." },
      { text: "Connect Safely - Message potential workout partners, check out verified safe meeting spots, and coordinate your meetup—all within the app." },
      { text: "Build Your Fitness Community - Over time, you'll discover regular workout partners, join fitness clubs, and build a network of like-minded friends." },
    ]
  };
  const roleProcess: Array<{
    title: string;
    description: string;
    tasks: Array<{ description: string }>;
    image?: string;
    images?: string[];
    bottomImage?: string;
  }> = [
    {
      title: "Key Features",
      description: "",
      tasks: [
        { description: "Smart Matching - Finds partners at your fitness level for enjoyable workouts" },
        { description: "Spontaneous or Planned - Works for both \"I want to run right now\" and \"Let's plan a hike this weekend\"" },
        { description: "Safety First - Verified venues, safety check-ins, and user ratings ensure secure meetups" },
        { description: "Social Motivation - Share achievements, give kudos, and stay motivated with your fitness community" },
        { description: "Multiple Activities - Supports everything from running and cycling to tennis, basketball, yoga, and more" }
      ]
    },
    {
      title: "",
      description: "",
      tasks: [],
      images: ["/relayfull.png", "/relayofull.png"],
      bottomImage: "/relaylogo.png"
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
              <div className="section-header">The Problem</div>
              <div className="section-content">
                {team.description}
              </div>
            </div>

            {/* Goals Section */}
            <div className="project-section-bordered">
              <div className="section-header">How it Works</div>
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
                  {(role.image || role.images || role.bottomImage) ? (
                    <>
                      {(role.image || role.images) && (
                        <div className="relay-images-container" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '40px', padding: '20px 0', width: '100%', maxWidth: 'none' }}>
                          {role.images ? (
                            <>
                              {role.images.map((img, imgIndex) => (
                                <Image 
                                  key={imgIndex}
                                  src={img} 
                                  alt="Relay logo"
                                  width={450}
                                  height={150}
                                  quality={100}
                                  style={{ width: '450px', height: 'auto' }}
                                />
                              ))}
                            </>
                          ) : role.image ? (
                            <Image 
                              src={role.image} 
                              alt="Relay logo"
                              width={450}
                              height={150}
                              quality={100}
                              style={{ width: '450px', height: 'auto' }}
                            />
                          ) : null}
                        </div>
                      )}
                      {role.bottomImage && (
                        <div className="relay-logo-container" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '20px 0', marginTop: '0', width: '100%', maxWidth: 'none' }}>
                          <Image 
                            src={role.bottomImage} 
                            alt="Relay logo"
                            width={938}
                            height={501}
                            quality={100}
                            style={{ width: '938px', height: 'auto', maxWidth: 'none' }}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {role.description && <p className="role-description">{role.description}</p>}
                      {role.tasks.length > 0 && (
                        <ul className="process-tasks">
                          {role.tasks.map((task, taskIndex) => (
                            <li key={taskIndex}>{task.description}</li>
                          ))}
                        </ul>
                      )}
                    </>
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
                    {(role.image || role.images || role.bottomImage) ? (
                      <>
                        {(role.image || role.images) && (
                          <div className="role-image-container relay-images-container">
                            {role.images ? (
                              <>
                                {role.images.map((img, imgIndex) => (
                                  <Image 
                                    key={imgIndex}
                                    src={img} 
                                    alt="Relay logo"
                                    width={450}
                                    height={150}
                                    quality={100}
                                    style={{ width: '450px', height: 'auto' }}
                                  />
                                ))}
                              </>
                            ) : role.image ? (
                              <Image 
                                src={role.image} 
                                alt="Relay logo"
                                width={450}
                                height={150}
                                quality={100}
                              />
                            ) : null}
                          </div>
                        )}
                        {role.bottomImage && (
                          <div className="role-image-container relay-logo-container" style={{ marginTop: '0', padding: '20px 0' }}>
                            <Image 
                              src={role.bottomImage} 
                              alt="Relay logo"
                              width={938}
                              height={501}
                              quality={100}
                              style={{ width: '938px', height: 'auto' }}
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {role.description && <p className="role-description">{role.description}</p>}
                        {role.tasks.length > 0 && (
                          <ul className="process-tasks">
                            {role.tasks.map((task, taskIndex) => (
                              <li key={taskIndex}>{task.description}</li>
                            ))}
                          </ul>
                        )}
                      </>
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