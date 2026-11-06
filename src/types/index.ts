export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  year: string;
  what: string;
  problem: string;
  stack: string;
  demo?: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  /** Employment type shown in the details row, e.g. "Internship", "Full-time". */
  type?: string;
  /** Display string, e.g. "Jun 2025". */
  startDate: string;
  /** Display string, e.g. "Aug 2025". Leave out for a current role (shows "Present"). */
  endDate?: string;
  /** Optional length of the stint, e.g. "3 mos", "1 yr 2 mos". */
  duration?: string;
  /** Shows the "Current Role" tag on the card. */
  current?: boolean;
  location: string;
  /** One or two sentence summary of the role. */
  description: string;
  /** Optional bullet points for key responsibilities or achievements. */
  highlights?: string[];
  stack: string[];
}
