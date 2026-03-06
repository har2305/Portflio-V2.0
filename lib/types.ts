export type Profile = {
  name: string;
  title: string;
  location: string;
  email: string;
  phone?: string;
  summary: string;
  links: Array<{ label: string; href: string }>;
};

export type Experience = {
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string;
  highlights: string[];
  technologies: string[];
};

export type Project = {
  slug: string;
  name: string;
  description: string;
  impact: string;
  technologies: string[];
  href?: string;
  featured?: boolean;
};

export type SkillGroup = {
  title: string;
  skills: string[];
};

export type Education = {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  highlights?: string[];
};

export type Contact = {
  heading: string;
  description: string;
  cta: string;
};

export type PortfolioData = {
  profile: Profile;
  experiences: Experience[];
  projects: Project[];
  skillGroups: SkillGroup[];
  education: Education[];
  contact: Contact;
};

export type ResumeIngestionOutput = {
  filePath: string;
  normalizedAt: string;
  rawText: string;
  sections: Record<string, string[]>;
  inferredProfile: Partial<Profile>;
  inferredProjects: Array<Pick<Project, "name" | "description" | "technologies">>;
};
