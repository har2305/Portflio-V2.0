import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  location: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  summary: z.string().min(10),
  links: z.array(
    z.object({
      label: z.string().min(1),
      href: z.string().url(),
    }),
  ),
});

export const experienceSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  location: z.string().optional(),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  highlights: z.array(z.string().min(1)).min(1),
  technologies: z.array(z.string().min(1)).min(1),
});

export const projectSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  impact: z.string().min(1),
  technologies: z.array(z.string().min(1)).min(1),
  href: z.string().url().optional(),
  featured: z.boolean().optional(),
});

export const skillGroupSchema = z.object({
  title: z.string().min(1),
  skills: z.array(z.string().min(1)).min(1),
});

export const educationSchema = z.object({
  school: z.string().min(1),
  degree: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  highlights: z.array(z.string().min(1)).optional(),
});

export const contactSchema = z.object({
  heading: z.string().min(1),
  description: z.string().min(1),
  cta: z.string().min(1),
});

export const portfolioSchema = z.object({
  profile: profileSchema,
  experiences: z.array(experienceSchema).min(1),
  projects: z.array(projectSchema).min(1),
  skillGroups: z.array(skillGroupSchema).min(1),
  education: z.array(educationSchema).min(1),
  contact: contactSchema,
});

export const contactRequestSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  message: z.string().trim().min(15).max(2000),
});

export const resumeIngestionOutputSchema = z.object({
  filePath: z.string().min(1),
  normalizedAt: z.string().min(1),
  rawText: z.string().min(1),
  sections: z.record(z.string(), z.array(z.string())),
  inferredProfile: profileSchema.partial(),
  inferredProjects: z.array(
    z.object({
      name: z.string().min(1),
      description: z.string().min(1),
      technologies: z.array(z.string()).default([]),
    }),
  ),
});
