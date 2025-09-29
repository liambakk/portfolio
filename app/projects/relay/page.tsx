"use client";

import React, { useEffect } from "react";
import ProjectLayout from "@/components/ProjectLayout";
import { ProjectData } from "@/types/project";

export default function RelayProject() {
  useEffect(() => {
    document.title = 'Relay';
  }, []);

  const projectData: ProjectData = {
    title: "Relay",
    previewImage: "/previews/relay1.png",
    overview: {
      description: "Relay is a mobile app that helps you find compatible workout partners nearby when you want to exercise. Think of it as a social network specifically designed for fitness enthusiasts who want to connect with others for workouts."
    },
    team: {
      title: "Problem",
      description: "Ever wanted to go for a run, hit the gym, or play a sport but didn't have anyone to join you? Or maybe your usual workout partner cancelled last minute? Relay instantly connects you with people nearby who share your fitness interests, so that you can connect through the shared medium of exercise. Over the past 3 years we have seen the proliferation of exercise clubs of all types- predeminantly running clubs. While these have been great, and responsible for the forming of numerous new relationships, they still lack the intamicy that working out provides- the ability to push each other, and grow together. Relay was created as the platform to enable this, by simplifying the process of finding those who have similar interests, and share the same goals as you do- allowing you to find people to train with, regardless of where you are.",
      members: [
        { name: "James Wilson", role: "System Architect" },
        { name: "Sofia Martinez", role: "UI/UX Designer" },
        { name: "Chris Anderson", role: "DevOps Engineer" }
      ]
    },
    goals: {
      items: [
        { text: "Broadcast Your Workout - When you're ready to exercise, simply open the app and share what activity you want to do (running, cycling, gym, yoga, etc.)." },
        { text: "Find Compatible Partners - The app shows you nearby users who match your fitness level, schedule, and activity preferences." },
        { text: "Connect Safely - Message potential workout partners, check out verified safe meeting spots, and coordinate your meetup—all within the app." },
        { text: "Build Your Fitness Community - Over time, you'll discover regular workout partners, join fitness clubs, and build a network of like-minded friends.", images: ["/record.png", "/post.png", "/post1.png", "/takeimage.png"] },
      ]
    },
    roleProcess: [
      {
        title: "Design Principles",
        description: "",
        tasks: [
          { description: "Energetic Color Palette - Vibrant gradients and bold accents that inspire movement and activity" },
          { description: "Dynamic Typography - Athletic, modern typefaces that convey strength and approachability" },
          { description: "Motion-First Interface - Smooth animations and transitions that mirror physical movement" },
          { description: "Community Focus - Visual elements that emphasize connection and shared experiences" }
        ],
        images: ["/relaycolors.png", "/relaylogo.png", "/relayfull.png"],
        bottomImage: "/relayofull.png"
      },
      {
        title: "Design System",
        description: "A comprehensive design system built from the ground up to ensure consistency across all touchpoints. The system includes modular components, responsive layouts, and accessibility-first patterns that scale seamlessly from mobile to tablet interfaces. Every element was crafted to balance aesthetic appeal with functional clarity, creating an intuitive experience for users of all fitness levels.",
        tasks: [],
        image: "/relaydesign.png"
      },
      {
        title: "Contributions",
        description: "",
        tasks: [
          { description: "Developed robust matching algorithm for workout partners" },
          { description: "Integrated location-based services for real-time proximity" },
          { description: "Built messaging system with safety features" },
          { description: "Created user verification and trust systems" },
          { description: "Implemented workout tracking and progress sharing" },
          { description: "Designed and developed the entire frontend and backend of the application" },
          { description: "Integrated backned and frontend to create a production-ready build" }
        ]
      }
    ]
  };

  return <ProjectLayout {...projectData} />;
}