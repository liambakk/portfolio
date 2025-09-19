export interface TeamMember {
  name: string;
  role: string;
}

export interface ProjectGoal {
  text: string;
  image?: string;
  images?: string[];
}

export interface ProcessTask {
  description: string;
}

export interface RoleProcess {
  title: string;
  description: string;
  tasks: ProcessTask[];
  image?: string;
  images?: string[];
  bottomImage?: string;
  customContent?: React.ReactNode;
}

export interface ProjectData {
  title: string;
  titleIcon?: React.ReactNode;
  externalLink?: string;
  overview: {
    description: string;
  };
  team: {
    description: string;
    members?: TeamMember[];
  };
  goals: {
    items: ProjectGoal[];
  };
  roleProcess: RoleProcess[];
  previewImage?: string;
}