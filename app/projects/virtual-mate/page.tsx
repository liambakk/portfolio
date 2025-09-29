"use client";

import { useEffect } from "react";
import ProjectPageUnified from "@/components/ProjectPageUnified";
import { ProjectData } from "@/types/project";

export default function VirtualMateProject() {
  useEffect(() => {
    document.title = 'Virtual Mate';
  }, []);
  const projectData: ProjectData = {
    title: "Virtual Mate",
    previewImage: undefined, // No preview image provided
    overview: {
      description: "An AI-powered virtual companion platform that provides personalized interaction and support. The system uses advanced natural language processing to create meaningful conversations and emotional connections."
    },
    team: {
      description: "AI Engineer, Product Designer, Full-Stack Developer",
      members: [
        { name: "David Park", role: "AI Engineer" },
        { name: "Emma Johnson", role: "Product Designer" },
        { name: "Ryan Thompson", role: "Full-Stack Developer" }
      ]
    },
    goals: {
      items: [
        { text: "Create natural and engaging conversational experiences" },
        { text: "Develop emotional intelligence capabilities" },
        { text: "Ensure user privacy and data security" },
        { text: "Build scalable architecture for real-time interactions" },
        { text: "Implement personalization and learning algorithms" }
      ]
    },
    roleProcess: [
      {
        title: "Role & Process: Product Designer",
        description: "Focused on creating an intuitive and emotionally resonant user experience that balances AI capabilities with human needs.",
        tasks: [
          { description: "Researched user needs for virtual companionship" },
          { description: "Designed conversation flow and interaction patterns" },
          { description: "Created personality frameworks for AI responses" },
          { description: "Developed visual identity and interface design" },
          { description: "Prototyped and tested user interactions" },
          { description: "Established guidelines for ethical AI interaction" }
        ]
      }
    ]
  };

  return <ProjectPageUnified {...projectData} />;
}