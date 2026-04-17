export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  github: string;
  live?: string;
  year: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}
