// Core Models and Interfaces

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'design';
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  date: Date;
}

export interface Skill {
  name: string;
  level: number; // 1-100
  category: 'frontend' | 'backend' | 'tools' | 'design' | 'soft-skills';
  icon?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate: Date;
  gpa?: string;
  achievements?: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  image?: string;
  testimonial: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  author: string;
  publishDate: Date;
  readTime: number;
}

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'ar';
