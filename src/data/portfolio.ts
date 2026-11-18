export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  description: string;
  technologies?: string[];
}

export interface AboutHighlight {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: 'education' | 'focus' | 'location';
}

export interface PortfolioData {
  owner: {
    name: string;
    brand: string;
    title: string;
    bio: string;
    academic: string;
    location: string;
    email: string;
    github: string;
    linkedin?: string;
  };
  navigation: Array<{
    id: string;
    label: string;
    href: string;
  }>;
  aboutHighlights: AboutHighlight[];
  projects: ProjectItem[];
  skillGroups: SkillGroup[];
  experiences: ExperienceItem[];
}

export const portfolioData: PortfolioData = {
  owner: {
    name: "Amirul Nur Cahyo",
    brand: "MirrDev",
    title: "Software Engineer & Informatics Student",
    bio: "Passionate developer focused on building clean, high-performance web applications and distributed architectures. Committed to minimalist aesthetics, type safety, and exceptional user interactions.",
    academic: "Undergraduate student in Informatics Engineering at Universitas Sriwijaya, studying computational systems, data structures, and web technologies.",
    location: "Indonesia",
    email: "09021282429093@student.unsri.ac.id",
    github: "https://github.com/MirrDev",
    linkedin: "https://linkedin.com/in/mirrdev",
  },
  navigation: [
    { id: "home", label: "Home", href: "#home" },
    { id: "about", label: "About", href: "#about" },
    { id: "project", label: "Project", href: "#project" },
    { id: "skills", label: "Skills", href: "#skills" },
    { id: "experiences", label: "Experiences", href: "#experiences" },
    { id: "contact", label: "Contact", href: "#contact" },
  ],
  aboutHighlights: [
    {
      id: "education",
      category: "Academic",
      title: "Education",
      description: "Universitas Sriwijaya • Informatics Engineering (B.Sc. candidate)",
      icon: "education",
    },
    {
      id: "focus",
      category: "Specialization",
      title: "Primary Focus",
      description: "Full-Stack Web Systems, Component Design & Distributed Services",
      icon: "focus",
    },
    {
      id: "location",
      category: "Base",
      title: "Location",
      description: "South Sumatra, Indonesia (UTC+7)",
      icon: "location",
    },
  ],
  projects: [
    {
      id: "emerald-portfolio",
      title: "Emerald Portfolio",
      description: "A minimalist futuristic personal portfolio inspired by Green Lantern aesthetics, featuring dynamic SVG reactor visuals, Next.js App Router, and responsive emerald/yellow theme switching.",
      tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Motion"],
      githubUrl: "https://github.com/MirrDev/emerald-portfolio",
      demoUrl: "#",
      featured: true,
    },
    {
      id: "mine-it-portal",
      title: "Mining IT Asset & Dispatch System",
      description: "Internal operations web platform designed for monitoring operational IT infrastructure, network telemetry, and maintenance schedules in heavy industrial environments.",
      tags: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
      githubUrl: "https://github.com/MirrDev",
      featured: true,
    },
    {
      id: "academic-sim-lab",
      title: "Algorithm Visualizer & Simulator",
      description: "Interactive visual simulator for complex data structures and graph traversal algorithms designed to help computer science students understand algorithmic runtime behaviors.",
      tags: ["React", "TypeScript", "Canvas API", "Algorithms"],
      githubUrl: "https://github.com/MirrDev",
      demoUrl: "#",
      featured: false,
    },
    {
      id: "rest-auth-service",
      title: "Distributed Auth & Session Microservice",
      description: "Lightweight, resilient authentication microservice with JWT rotation, rate limiting, and Redis session store designed for scalable cloud deployment.",
      tags: ["Node.js", "Express", "Redis", "JWT", "Docker"],
      githubUrl: "https://github.com/MirrDev",
      featured: false,
    },
  ],
  skillGroups: [
    {
      category: "Frontend Development",
      skills: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "Motion", "HTML5 & Semantic Web", "Responsive Architecture"],
    },
    {
      category: "Backend & Systems",
      skills: ["Node.js", "Express", "RESTful APIs", "PostgreSQL", "MySQL", "Authentication (JWT)", "API Integration"],
    },
    {
      category: "Developer Tools & DevOps",
      skills: ["Git & GitHub", "Linux CLI", "Docker", "VS Code", "Postman", "Turbopack / Vite", "ESLint"],
    },
    {
      category: "Core Competencies",
      skills: ["Data Structures & Algorithms", "Component Architecture", "Performance Optimization", "Clean Code & Refactoring", "UI/UX Precision"],
    },
  ],
  experiences: [
    {
      period: "2024 — Present",
      role: "Informatics Engineering Undergraduate",
      organization: "Universitas Sriwijaya",
      description: "Studying core computational engineering, data structures, algorithms, operating systems, database management, and object-oriented software engineering.",
      technologies: ["Data Structures", "Algorithms", "Database Systems", "Software Engineering"],
    },
    {
      period: "2024 — Present",
      role: "Independent Full-Stack Developer",
      organization: "MirrDev Projects",
      description: "Designing and developing production-grade web applications, exploring modern full-stack architectures, interactive design systems, and minimalist aesthetics.",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion"],
    },
    {
      period: "2023 — 2024",
      role: "Technical Explorer & Open Source Contributor",
      organization: "Developer Community",
      description: "Engaged in hands-on experimentation with modern JavaScript frameworks, distributed backends, developer automation tools, and responsive user interfaces.",
      technologies: ["JavaScript", "Node.js", "Git", "REST APIs"],
    },
  ],
};
