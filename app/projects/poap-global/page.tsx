"use client";

import React from "react";
import ProjectLayout from "@/components/ProjectLayout";
import { ProjectData } from "@/types/project";

export default function PoapGlobalProject() {
  const projectData: ProjectData = {
    title: "POAP Global",
    previewImage: "/previews-optimized/poap1-md.png",
    overview: {
      description: "POAP Global is a mobile application that transforms travel into a digital collecting experience. The app allows travelers to collect digital stamps by visiting real-world locations, similar to collecting passport stamps but in a digital format."
    },
    team: {
      description: "When users visit different places around the world, they can \"check in\" using their phone's location services. If the location is verified, they receive a unique digital collectible featuring artwork of that landmark or place. These collectibles are stored in their digital passport within the app.",
      members: [
        { name: "Lucas Chen", role: "Blockchain Developer" },
        { name: "Maria Silva", role: "Product Designer" },
        { name: "Tom Harris", role: "Community Manager" }
      ]
    },
    goals: {
      items: [
        { text: "Digital Passport - A personal collection showcasing all the places visited, complete with statistics like number of countries explored and total collectibles earned." },
        { text: "Location Discovery - An interactive map helps users find nearby attractions and landmarks. Users can search for specific places or browse what's trending." },
        { text: "Social Elements - A leaderboard displays top travelers, and users can see trending destinations and popular collectibles. Privacy settings allow control over who sees check-in information." },
        { text: "Collectible System - Each verified location offers a unique digital stamp with custom artwork. Users can be \"pioneers\" by being among the first to check in at new locations." },
      ]
    },
    roleProcess: [
      {
        title: "How It Works",
        description: "Users create an account and grant location permissions. When near an interesting location, they open the app to see available check-in spots on the map. After physically arriving at a location, they can check in to receive the digital collectible. All collected stamps appear in their passport, creating a visual record of their travels.\n\nThe app encourages exploration by gamifying travel - users can compete on leaderboards, discover new places, and build a unique collection that represents their personal journey around the world.",
        tasks: [
          { description: "Create an account and enable location services" },
          { description: "Open the app to discover nearby check-in locations on the interactive map" },
          { description: "Physically visit the location and verify your presence" },
          { description: "Check in to receive your unique digital collectible" },
          { description: "View all collected stamps in your digital passport" },
          { description: "Compete on leaderboards and discover trending destinations" }
        ]
      },
      {
        title: "Design Principles",
        description: "",
        tasks: [
          { description: "Location-First Experience - Every interaction centers around real-world places and the memories they create" },
          { description: "Collectible Aesthetics - Each digital stamp features unique, artistic representations of landmarks and locations" },
          { description: "Seamless Verification - Location check-ins use intuitive, frictionless verification methods" },
          { description: "Social Discovery - Community features that inspire exploration through shared experiences" }
        ]
      },
      {
        title: "Design System",
        description: "",
        tasks: [
          { description: "Researched blockchain UX patterns and best practices" },
          { description: "Designed wallet connection and authentication flows" },
          { description: "Created badge templates and customization tools" },
          { description: "Developed event dashboard and analytics interface" },
          { description: "Implemented responsive design for mobile claiming" },
          { description: "Established visual language for Web3 interactions" }
        ],
        image: "/poapdesign.png",
        customContent: (
          <div style={{ minHeight: "200px" }} />
        )
      }
    ]
  };

  return <ProjectLayout {...projectData} />;
}