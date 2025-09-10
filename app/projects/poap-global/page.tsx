import ProjectLayout from "@/components/ProjectLayout";
import { ProjectData } from "@/types/project";

const poapData: ProjectData = {
  title: "POAP Global",
  previewImage: "/previews/poap1.png",
  overview: {
    description: "A blockchain-based proof of attendance protocol platform. POAP Global enables event organizers to create and distribute digital badges that serve as verifiable records of participation."
  },
  team: {
    description: "Blockchain Developer, Product Designer, Community Manager",
    members: [
      { name: "Lucas Chen", role: "Blockchain Developer" },
      { name: "Maria Silva", role: "Product Designer" },
      { name: "Tom Harris", role: "Community Manager" }
    ]
  },
  goals: {
    items: [
      { text: "Create seamless NFT badge creation process" },
      { text: "Build decentralized verification system" },
      { text: "Enable cross-chain compatibility" },
      { text: "Develop intuitive event management tools" },
      { text: "Foster community engagement and adoption" }
    ]
  },
  roleProcess: [
    {
      title: "Role & Process: Design System Designer",
      description: "Created a comprehensive design system for blockchain interactions while maintaining accessibility for non-crypto users.",
      tasks: [
        { description: "Researched blockchain UX patterns and best practices" },
        { description: "Designed wallet connection and authentication flows" },
        { description: "Created badge templates and customization tools" },
        { description: "Developed event dashboard and analytics interface" },
        { description: "Implemented responsive design for mobile claiming" },
        { description: "Established visual language for Web3 interactions" }
      ]
    }
  ]
};

export default function PoapGlobalProject() {
  return (
    <ProjectLayout {...poapData} />
  );
}