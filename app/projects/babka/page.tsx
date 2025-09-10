import ProjectLayout from "@/components/ProjectLayout";
import { ProjectData } from "@/types/project";

const babkaData: ProjectData = {
  title: "Babka",
  overview: {
    description: "A modern bakery management system designed to streamline operations for artisanal bakeries. The platform integrates inventory management, customer ordering, and production scheduling into a unified solution."
  },
  team: {
    description: "Product Designer, Front-End Developer, Back-End Developer",
    members: [
      { name: "Sarah Chen", role: "Product Designer" },
      { name: "Michael Rodriguez", role: "Front-End Developer" },
      { name: "Alex Kim", role: "Back-End Developer" }
    ]
  },
  goals: {
    items: [
      { text: "Streamline bakery operations and reduce manual processes" },
      { text: "Improve inventory tracking and reduce waste" },
      { text: "Enhance customer ordering experience" },
      { text: "Provide real-time production scheduling" },
      { text: "Enable data-driven decision making for bakery owners" }
    ]
  },
  roleProcess: [
    {
      title: "Role & Process: UX/UI Designer",
      description: "Led the design process from research to final implementation, ensuring a user-centered approach throughout the project.",
      tasks: [
        { description: "Conducted user interviews with bakery owners and staff" },
        { description: "Created user journey maps and personas" },
        { description: "Developed wireframes and interactive prototypes" },
        { description: "Designed the visual interface and design system" },
        { description: "Collaborated with developers for implementation" },
        { description: "Conducted usability testing and iterations" }
      ]
    }
  ]
};

export default function BabkaProject() {
  return (
    <ProjectLayout {...babkaData} />
  );
}