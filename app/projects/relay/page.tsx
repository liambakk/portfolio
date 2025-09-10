import ProjectLayout from "@/components/ProjectLayout";
import { ProjectData } from "@/types/project";

const relayData: ProjectData = {
  title: "Relay",
  previewImage: "/previews/relay1.png",
  overview: {
    description: "A real-time collaboration platform for distributed teams. Relay enables seamless communication, file sharing, and project management with an emphasis on speed and reliability."
  },
  team: {
    description: "System Architect, UI/UX Designer, DevOps Engineer",
    members: [
      { name: "James Wilson", role: "System Architect" },
      { name: "Sofia Martinez", role: "UI/UX Designer" },
      { name: "Chris Anderson", role: "DevOps Engineer" }
    ]
  },
  goals: {
    items: [
      { text: "Enable real-time collaboration across time zones" },
      { text: "Minimize latency in message delivery" },
      { text: "Provide robust file sharing and versioning" },
      { text: "Ensure end-to-end encryption for security" },
      { text: "Create intuitive project management workflows" }
    ]
  },
  roleProcess: [
    {
      title: "Role & Process: System Designer",
      description: "Architected the distributed system infrastructure to handle real-time communication at scale.",
      tasks: [
        { description: "Designed microservices architecture for scalability" },
        { description: "Implemented WebSocket connections for real-time updates" },
        { description: "Created message queuing system for reliability" },
        { description: "Developed data synchronization protocols" },
        { description: "Optimized database schema for performance" },
        { description: "Established monitoring and alerting systems" }
      ]
    }
  ]
};

export default function RelayProject() {
  return (
    <ProjectLayout {...relayData} />
  );
}