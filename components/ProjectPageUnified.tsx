"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import CustomCursor from "./CustomCursor";
import MobileFooter from "./MobileFooter";
import OptimizedImage from "./OptimizedImage";
import { ProjectData } from "@/types/project";
import { useNavigation } from "./ClientWrapper";

type ProjectPageUnifiedProps = ProjectData;

const ProjectPageUnified = ({
  title,
  titleIcon,
  externalLink,
  previewImage,
  overview,
  team,
  goals,
  roleProcess
}: ProjectPageUnifiedProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const router = useRouter();
  const { triggerTransition, setIsReturningFromProject } = useNavigation();

  useEffect(() => {
    // Check touch device only once on mount
    const isTouch = 'ontouchstart' in window ||
                   navigator.maxTouchPoints > 0 ||
                   window.matchMedia('(pointer: coarse)').matches;
    
    setIsTouchDevice(isTouch);
    // No resize listener needed - touch capability doesn't change during session
  }, []);

  const handleBackToWork = () => {
    setIsReturningFromProject(true);
    triggerTransition(() => {
      router.push("/");
    });
  };

  const sections = [
    {
      id: "overview",
      label: "01.",
      title: "Overview",
      content: overview.description
    },
    {
      id: "team",
      label: "02.",
      title: team.title || "Team",
      content: team.description
    },
    {
      id: "goals",
      label: "03.",
      title: "Goals",
      content: (
        <ul className="unified-goals-list">
          {goals.items.map((goal, index) => (
            <li key={index}>
              <span>{goal.text}</span>
              {(goal.image || goal.images) && (
                <div className="unified-goal-images">
                  {goal.image && (
                    <OptimizedImage 
                      src={goal.image} 
                      alt={`Goal ${index + 1}`}
                      width={150}
                      height={100}
                      quality={85}
                      sizes="150px"
                      useOptimized={false}
                    />
                  )}
                  {goal.images?.map((img, imgIndex) => (
                    <OptimizedImage 
                      key={imgIndex}
                      src={img} 
                      alt={`Goal ${index + 1} image ${imgIndex + 1}`}
                      width={150}
                      height={100}
                      quality={85}
                      sizes="150px"
                      useOptimized={false}
                    />
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )
    },
    ...roleProcess.map((role, index) => ({
      id: `role-${index}`,
      label: `${String(index + 4).padStart(2, '0')}.`,
      title: role.title,
      content: (
        <>
          <p className="unified-role-description">{role.description}</p>
          {role.tasks && role.tasks.length > 0 && (
            <ul className="unified-process-tasks">
              {role.tasks.map((task, taskIndex) => (
                <li key={taskIndex}>{task.description}</li>
              ))}
            </ul>
          )}
          {role.images && role.images.length > 0 && (
            <div className="unified-role-images">
              {role.images.map((image, imgIndex) => (
                <OptimizedImage 
                  key={imgIndex}
                  src={image} 
                  alt={`${role.title} image ${imgIndex + 1}`}
                  width={180}
                  height={200}
                  quality={85}
                  sizes="180px"
                  priority={index === 0}
                  useOptimized={false}
                />
              ))}
            </div>
          )}
          {role.image && (
            <div className="unified-role-single-image">
              <OptimizedImage 
                src={role.image} 
                alt={`${role.title} design`}
                width={800}
                height={600}
                quality={85}
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          )}
          {role.bottomImage && (
            <div className="unified-role-bottom-image">
              <OptimizedImage 
                src={role.bottomImage} 
                alt={`${role.title} logo`}
                width={180}
                height={200}
                quality={85}
                sizes="180px"
                useOptimized={false}
              />
            </div>
          )}
          {role.customContent}
        </>
      )
    }))
  ];

  return (
    <div className="unified-project-container">
      <CustomCursor />
      
      {/* Header */}
      <motion.header 
        className="unified-project-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="unified-header-left">
          <div className="unified-logo" onClick={handleBackToWork}>
            LB
          </div>
          <div className="unified-copyright">© 2026</div>
        </div>
        
        <nav className="unified-header-nav">
          <button
            className={`unified-tab ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
            onMouseEnter={() => !isTouchDevice && setHoveredTab("overview")}
            onMouseLeave={() => !isTouchDevice && setHoveredTab(null)}
          >
            Overview
          </button>
          <button
            className={`unified-tab ${hoveredTab === "back" ? "hover" : ""}`}
            onClick={handleBackToWork}
            onMouseEnter={() => !isTouchDevice && setHoveredTab("back")}
            onMouseLeave={() => !isTouchDevice && setHoveredTab(null)}
          >
            Back to Work
          </button>
        </nav>
      </motion.header>

      {/* Main Content */}
      <main className="unified-project-content">
        <motion.div
          className="unified-content-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Title Section */}
          <section className="unified-title-section">
            <h1 className="unified-project-title">
              {title}
              {externalLink && titleIcon}
            </h1>
            {previewImage && (
              <div className="unified-preview-image">
                <OptimizedImage 
                  src={previewImage} 
                  alt={`${title} preview`}
                  width={1560}
                  height={1040}
                  quality={95}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1560px"
                  useOptimized={false}
                />
              </div>
            )}
          </section>

          {/* Content Sections */}
          <div className="unified-sections">
            {sections.map((section, index) => (
              <motion.section
                key={section.id}
                className="unified-section"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="unified-section-header">
                  <span className="unified-section-label">{section.label}</span>
                  <h2 className="unified-section-title">{section.title}</h2>
                </div>
                <div className="unified-section-content">
                  {typeof section.content === 'string' ? (
                    <p>{section.content}</p>
                  ) : (
                    section.content
                  )}
                </div>
              </motion.section>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Decorative Borders */}
      <div className="unified-borders" aria-hidden="true">
        <motion.div
          className="unified-border-left"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <motion.div
          className="unified-border-right"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        />
        <motion.div
          className="unified-border-top"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />
        <motion.div
          className="unified-border-bottom"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        />
      </div>

      <MobileFooter />
    </div>
  );
};

export default ProjectPageUnified;