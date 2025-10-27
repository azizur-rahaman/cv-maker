export interface PersonalInfo {
  fullName: string;
  title: string;
  profileImage?: string;
  profileSummary: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  isPresent: boolean;
  responsibilities: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  category?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Basic' | 'Intermediate' | 'Fluent' | 'Native';
}

export interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  phone: string;
  email: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  contactInfo: ContactInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  references: Reference[];
}

export const defaultCVData: CVData = {
  personalInfo: {
    fullName: 'Richard Sanchez',
    title: 'Marketing Manager',
    profileSummary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation.',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
  },
  contactInfo: {
    phone: '+123-456-7890',
    email: 'hello@reallygreatsite.com',
    address: '123 Anywhere St., Any City',
    website: 'www.reallygreatsite.com',
  },
  workExperience: [
    {
      id: '1',
      company: 'Borcelle Studio',
      position: 'Marketing Manager & Specialist',
      startDate: '2030',
      endDate: 'PRESENT',
      isPresent: true,
      responsibilities: [
        'Develop and execute comprehensive marketing strategies and campaigns that align with the company\'s goals and objectives.',
        'Lead, mentor, and manage a high-performing marketing team, fostering a collaborative and results-driven work environment.',
        'Monitor brand consistency across marketing channels and materials.',
      ],
    },
    {
      id: '2',
      company: 'Fauget Studio',
      position: 'Marketing Manager & Specialist',
      startDate: '2025',
      endDate: '2029',
      isPresent: false,
      responsibilities: [
        'Create and manage the marketing budget, ensuring efficient allocation of resources and optimizing ROI.',
        'Oversee market research to identify emerging trends, customer needs, and competitor strategies.',
      ],
    },
    {
      id: '3',
      company: 'Studio Shodwe',
      position: 'Marketing Manager & Specialist',
      startDate: '2024',
      endDate: '2025',
      isPresent: false,
      responsibilities: [
        'Develop and maintain strong relationships with partners, agencies, and vendors to support marketing initiatives.',
        'Monitor and maintain brand consistency across all marketing channels and materials.',
      ],
    },
  ],
  education: [
    {
      id: '1',
      institution: 'School of business | Wardiere University',
      degree: 'Master of Business Management',
      fieldOfStudy: 'Business Management',
      startDate: '2029',
      endDate: '2031',
      gpa: '3.8 / 4.0',
    },
    {
      id: '2',
      institution: 'School of business | Wardiere University',
      degree: 'Bachelor of Business Management',
      fieldOfStudy: 'Business Management',
      startDate: '2025',
      endDate: '2029',
      gpa: '3.8 / 4.0',
    },
  ],
  skills: [
    { id: '1', name: 'Project Management' },
    { id: '2', name: 'Public Relations' },
    { id: '3', name: 'Teamwork' },
    { id: '4', name: 'Time Management' },
    { id: '5', name: 'Leadership' },
    { id: '6', name: 'Effective Communication' },
    { id: '7', name: 'Critical Thinking' },
    { id: '8', name: 'Digital Marketing' },
  ],
  languages: [
    { id: '1', name: 'English', proficiency: 'Fluent' },
    { id: '2', name: 'French', proficiency: 'Fluent' },
    { id: '3', name: 'German', proficiency: 'Basic' },
    { id: '4', name: 'Spanish', proficiency: 'Intermediate' },
  ],
  references: [
    {
      id: '1',
      name: 'Estelle Darcy',
      position: 'CTO',
      company: 'Wardiere Inc.',
      phone: '123-456-7890',
      email: 'hello@reallygreatsite.com',
    },
  ],
};