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
    title: "Building Software, Exploring Systems",
    bio: "Curious about how systems are built and how they break. I build web applications, explore AI and machine learning, play CTFs, and make 3D games in Godot.",
    academic: "Informatics Engineering student at Universitas Sriwijaya.",
    location: "Palembang, South Sumatra, Indonesia",
    email: "nurcahyoamirul@gmail.com",
    github: "https://github.com/Hatzlingr",
    linkedin: "https://linkedin.com/in/amirul-nur-cahyo-a88485322",
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
      id: "focus",
      category: "Interests",
      title: "What I Do",
      description: "Web Development, AI / Machine Learning, Cybersecurity & Game Dev",
      icon: "focus",
    },
    {
      id: "education",
      category: "Education",
      title: "University",
      description: "Universitas Sriwijaya • Informatics Engineering",
      icon: "education",
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
      id: "splitnota",
      title: "SplitNota",
      description: "Web app that scans receipts using the Gemini API and splits bills fairly, including tax and service charges.",
      tags: ["Next.js", "TypeScript", "Gemini API", "Tailwind CSS", "Vercel"],
      githubUrl: "https://github.com/Hatzlingr/splitnota",
      featured: true,
    },
    {
      id: "movie-review-laravel",
      title: "ELITISRIPIW",
      description: "Full-stack movie review and rating platform built with Laravel, featuring user authentication, watchlists, and review management.",
      tags: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "JavaScript"],
      githubUrl: "https://github.com/sheisndz/ELITISRIPIW",
      featured: true,
    },
    {
      id: "toxemia-game",
      title: "TOXEMIA",
      description: "Top-down 3D action-puzzle dungeon crawler built in 10 days for a game jam using Godot and Blender.",
      tags: ["Godot", "GDScript", "Blender", "3D Game Dev"],
      githubUrl: "https://github.com/Hatzlingr",
      featured: true,
    },
  ],
  skillGroups: [
    {
      category: "Web Development",
      skills: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "PHP", "Laravel", "Node.js", "MySQL", "Supabase"],
    },
    {
      category: "AI & Machine Learning",
      skills: ["Python", "Scikit-Learn", "Data Mining"],
    },
    {
      category: "Cybersecurity & Networking",
      skills: ["CTF (Web & Cryptography)", "Kali Linux", "Linux CLI", "Wazuh SIEM", "Wireshark", "Networking"],
    },
    {
      category: "Game Development",
      skills: ["Godot Engine", "GDScript", "Blender 3D"],
    },
    {
      category: "Tools",
      skills: ["Git & GitHub", "WSL", "Docker", "Antigravity", "Microsoft Azure", "Vercel"],
    },
  ],
  experiences: [
    {
      period: "2026",
      role: "CTF Team Player",
      organization: "0xUCL",
      description: "Won 2nd place at the South Sumatra provincial CTF and reached Top 10 multiple times in online team CTFs across web exploitation, forensics, and Linux challenges.",
      technologies: ["Kali Linux", "Python", "Web Security"],
    },
    {
      period: "2025",
      role: "Staff of Arrait Division",
      organization: "BO INTEL Fasilkom UNSRI",
      description: "Responsible for web development and design projects within the organization.",
      technologies: ["PHP", "JavaScript", "Web Development", "Git"],
    },
    {
      period: "2025 — Present",
      role: "Staff of Media & Information",
      organization: "BO FASCO Fasilkom UNSRI",
      description: "Responsible for visual design systems, media social captions, and promotional content.",
      technologies: ["Figma", "Canva", "Social Media Strategy", "Content Creation"],
    },
  ],
};