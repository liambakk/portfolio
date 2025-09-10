export interface TeamMember {
  name: string;
  role: string;
}

export interface ProjectGoal {
  text: string;
}

export interface ProcessTask {
  description: string;
}

export interface RoleProcess {
  title: string;
  description: string;
  tasks: ProcessTask[];
}

export interface ProjectData {
  title: string;
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