"use client";

import React from "react";
import { FiExternalLink } from "react-icons/fi";
import ProjectLayout from "@/components/ProjectLayout";
import { ProjectData } from "@/types/project";
import Image from "next/image";

export default function NeuraProject() {
  const projectData: ProjectData = {
    title: "Neura Browser Extension",
    titleIcon: (
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
    ),
    externalLink: "https://www.neura.fyi",
    previewImage: "/previews/neura1.png",
    overview: {
      description: "An intelligent browser extension that enhances web browsing with AI-powered features. Neura provides smart summarization, content extraction, and automated workflows to improve productivity."
    },
    team: {
      description: "Extension Developer, ML Engineer, UX Designer",
      members: [
        { name: "Kevin Zhang", role: "Extension Developer" },
        { name: "Priya Patel", role: "ML Engineer" },
        { name: "Jordan Lee", role: "UX Designer" }
      ]
    },
    goals: {
      items: [
        { text: "Integrate AI capabilities seamlessly into browsing" },
        { text: "Minimize performance impact on browser" },
        { text: "Ensure user privacy and data protection" },
        { text: "Provide customizable automation workflows" },
        { text: "Support cross-browser compatibility" }
      ]
    },
    roleProcess: [
      {
        title: "Key Features",
        description: "The extension leverages advanced natural language processing to provide intelligent assistance across various web activities.",
        tasks: [
          { description: "One-click page summarization with key point extraction" },
          { description: "Automated form filling using intelligent data recognition" },
          { description: "Real-time language translation with context awareness" },
          { description: "Custom workflow automation with visual scripting" },
          { description: "Privacy-focused local processing for sensitive data" }
        ],
        customContent: (
          <div style={{
            position: "relative",
            width: "100%",
            margin: "1.5rem 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "1rem",
            flexWrap: "wrap"
          }}>
            <Image
              src="/project-images-optimized/neuraext-md.png"
              alt="Neura Browser Extension Interface"
              width={1280}
              height={747}
              quality={85}
              sizes="(max-width: 768px) 100vw, 48vw"
              style={{
                width: "48%",
                minWidth: "280px",
                height: "auto",
                borderRadius: "8px"
              }}
            />
            <Image
              src="/project-images-optimized/box-md.png"
              alt="Neura Extension Settings"
              width={1280}
              height={1388}
              quality={85}
              sizes="(max-width: 768px) 100vw, 48vw"
              style={{
                width: "48%",
                minWidth: "280px",
                height: "auto",
                borderRadius: "8px"
              }}
            />
          </div>
        )
      },
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
        ],
        customContent: (
          <>
            <div style={{
              position: "relative",
              width: "100%",
              margin: "1.5rem 0",
              display: "flex",
              justifyContent: "center"
            }}>
              <Image
                src="/project-images-optimized/neurabox-md.png"
                alt="Neura Extension Features"
                width={600}
                height={400}
                quality={85}
                sizes="(max-width: 768px) 100vw, 600px"
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
                quality={85}
                unoptimized
                sizes="(max-width: 768px) 100vw, 800px"
                style={{
                  width: "100%",
                  maxWidth: "800px",
                  height: "auto",
                  borderRadius: "8px"
                }}
              />
            </div>
          </>
        )
      },
      {
        title: "Live Demo",
        description: "Experience Neura in action as it intelligently extracts and processes information from web pages, providing instant insights and summaries.",
        tasks: [],
        customContent: (
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
              quality={85}
              unoptimized
              sizes="(max-width: 768px) 100vw, 800px"
              style={{
                width: "100%",
                maxWidth: "800px",
                height: "auto",
                borderRadius: "8px"
              }}
            />
          </div>
        )
      }
    ]
  };

  return <ProjectLayout {...projectData} />;
}