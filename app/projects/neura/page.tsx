import ProjectLayout from "@/components/ProjectLayout";
import { ProjectData } from "@/types/project";

const neuraData: ProjectData = {
  title: "Neura Browser Extension",
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
      title: "Role & Process: Extension Developer",
      description: "Built the browser extension architecture focusing on performance, security, and cross-browser compatibility.",
      tasks: [
        { description: "Developed manifest V3 compliant extension structure" },
        { description: "Implemented background service workers for processing" },
        { description: "Created content scripts for page interaction" },
        { description: "Built popup interface and options page" },
        { description: "Integrated ML models using WebAssembly" },
        { description: "Established secure communication protocols" }
      ]
    }
  ]
};

export default function NeuraProject() {
  return (
    <ProjectLayout {...neuraData} />
  );
}