"use client";

import React from "react";
import ProjectLayout from "@/components/ProjectLayout";
import { ProjectData } from "@/types/project";

export default function EssaiProject() {
  const projectData: ProjectData = {
    title: "Heuristic",
    previewImage: "/previews/heuristic1.png",
    overview: {
      description: "An AI-powered deal flow automation platform addressing a critical inefficiency in venture capital: ~62% of analysts spend less than 12 hours per week on high-value work. Heuristic transforms pitch decks, documents, and investment theses into structured insights in minutes, enabling VCs to reclaim 400+ hours per analyst annually while uncovering overlooked opportunities through thesis-aligned AI analysis."
    },
    team: {
      description: "Built by operators with deep AI expertise and success in sales, tech, and finance",
      members: [
        { name: "Thomas Van Melsem Kocsis", role: "CEO & Co-Founder" },
        { name: "Liam Bakker", role: "CCO & Co-Founder" },
        { name: "Tibor Van Melsem Kocsis", role: "Advisor" },
        { name: "Bob Stassar", role: "Advisor" }
      ]
    },
    goals: {
      items: [
        { text: "Out-pace: Turn pitch decks into structured insights in minutes, not hours" },
        { text: "Out-think: Find overlooked opportunities by aligning AI with your investment thesis" },
        { text: "Out-maneuver: Save 400+ hours per analyst by automating memo drafting and data entry" },
        { text: "Target €5B of inefficiency in the VC market through intelligent automation" },
        { text: "Achieve €1.8M revenue with 150+ clients by Year 3", image: "/heuristiclogo.png" }
      ]
    },
    roleProcess: [
      {
        title: "Core Platform Architecture",
        description: "Designed and built a comprehensive deal flow automation system that processes multiple input formats and delivers actionable insights through advanced AI.",
        tasks: [
          { description: "Built data extraction engine supporting PDF, XLSX, DOCX, and PPT formats" },
          { description: "Implemented drag-and-drop interface for seamless document processing" },
          { description: "Developed AI-powered data enrichment using external providers and latest LLMs" },
          { description: "Created chat-driven filtering system (e.g., 'Show me Series A healthtech in EU with >30% MoM')" },
          { description: "Engineered structured data outputs including filtered shortlists and risk scores" },
          { description: "Built automated memo generation reducing drafting time by 80%" }
        ],
        bottomImage: "/heuristicflow.png"
      },
      {
        title: "Competitive Advantage & Market Positioning",
        description: "Established Heuristic as the purpose-built VC solution in a market of generic automation tools, focusing on deeper data enrichment and CRM integration.",
        tasks: [
          { description: "Analyzed competitor landscape including Deckmatch, Hebbia, V7Go, and Carried AI" },
          { description: "Developed VC-specific UX with investment thesis alignment capabilities" },
          { description: "Built comprehensive data enrichment including founder history and market gap analysis" },
          { description: "Implemented seamless integration with existing VC CRM workflows" },
          { description: "Created differentiated pricing model: Basic, Pro, and Enterprise tiers" },
          { description: "Positioned premium offering with superior ROI vs generic tools" }
        ],
        bottomImage: "/companalysis.png"
      },
      {
        title: "Business Development & Go-to-Market",
        description: "Executed strategic roadmap targeting the European VC market, with initial focus on UK and Netherlands, achieving measurable client success.",
        tasks: [
          { description: "Identified TAM of 3,400 global VCs, focusing on SAM of 817 European VCs" },
          { description: "Secured BenedictPeax as pilot client, automating WBSO applications" },
          { description: "Achieved significant time savings and cost reduction for pilot clients" },
          { description: "Developed Q1 2025-Q1 2026 roadmap including Outbound Intelligence features" },
          { description: "Targeted first-year ARR of €380K with 19 clients at €10K average" },
          { description: "Raised €150K+ to accelerate product development and market expansion" }
        ]
      }
    ]
  };

  return <ProjectLayout {...projectData} />;
}