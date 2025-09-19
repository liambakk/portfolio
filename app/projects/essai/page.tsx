"use client";

import React from "react";
import ProjectLayout from "@/components/ProjectLayout";
import { ProjectData } from "@/types/project";

export default function EssaiProject() {
  const projectData: ProjectData = {
    title: "Heuristic",
    previewImage: "/previews-optimized/heuristic1-md.png",
    overview: {
      description: "A data analytics platform that uses heuristic algorithms to identify patterns and insights. The system helps businesses make data-driven decisions through intelligent analysis and visualization."
    },
    team: {
      description: "Data Scientist, Backend Engineer, Visualization Designer",
      members: [
        { name: "Rachel Green", role: "Data Scientist" },
        { name: "Marcus Brown", role: "Backend Engineer" },
        { name: "Lisa Wang", role: "Visualization Designer" }
      ]
    },
    goals: {
      items: [
        { text: "Develop advanced heuristic analysis algorithms" },
        { text: "Create intuitive data visualization interfaces" },
        { text: "Enable real-time data processing at scale" },
        { text: "Provide actionable insights and recommendations" },
        { text: "Support multiple data sources and formats" }
      ]
    },
    roleProcess: [
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
    ]
  };

  return <ProjectLayout {...projectData} />;
}