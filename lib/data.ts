// Centralized data for the portfolio site
// This file contains all the information that should be consistent across the site

export interface UserInfo {
  name: string
  role: string
  location: string
  interests: string[]
  currentProject: string
  tagline: string
}

export interface Skill {
  name: string
  category?: string
}

export interface Experience {
  year: string
  title: string
  company: string
  description?: string[]
}

export interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  date: string
  github: string
  live: string
  featured: boolean
}

// User Information
export const userInfo: UserInfo = {
  name: "Oliver von Mizener",
  role: "Full-Stack Developer & Data Analyst",
  location: "Mesa, Arizona",
  interests: ["Machine Learning", "AI", "Boba Tea", "Classic Cars"],
  currentProject: "This Vista-inspired portfolio",
  tagline: "Part legal technologist, part data nerd, part boba-slinging entrepreneur"
}

// Skills List
export const skills: Skill[] = [
  { name: "Python" },
  { name: "SQL" },
  { name: "JavaScript" },
  { name: "APIs / Application Programming Interfaces" },
  { name: "Data Analysis" },
  { name: "Tableau" },
  { name: "CSS" },
  { name: "Matplotlib" },
  { name: "JavaScript Libraries" },
  { name: "Contentful" },
  { name: "Data Analytics" },
  { name: "SharePoint" },
  { name: "Project Management" },
  { name: "Documentation" },
  { name: "Communication" },
  { name: "Training & Development" },
  { name: "Presentations" },
  { name: "Editing" },
  { name: "Voice Over / Public Speaking" }
]

// Experience
export const experience: Experience[] = [
  {
    year: "2024",
    title: "Data Analytics Bootcamp",
    company: "Arizona State University"
  },
  {
    year: "2023",
    title: "Product Management",
    company: "Cornell University"
  },
  {
    year: "2022",
    title: "Lean Six Sigma",
    company: "Professional Certification"
  },
  {
    year: "2021",
    title: "Communication (MA)",
    company: "Arizona State University"
  },
  {
    year: "2020",
    title: "English Literature (BA)",
    company: "Arizona State University"
  }
]

// Projects
export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with modern UI/UX, payment integration, and admin dashboard.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    date: "2024",
    github: "#",
    live: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative project management tool with real-time updates and team collaboration features.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["Next.js", "TypeScript", "Prisma", "WebSocket"],
    date: "2024",
    github: "#",
    live: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Beautiful weather application with location-based forecasts and interactive maps.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["React", "API Integration", "Charts.js"],
    date: "2023",
    github: "#",
    live: "#",
    featured: false,
  },
]

// Fortune quotes for terminal
export const fortunes = [
  "A bug in the hand is better than one as yet undetected.",
  "The best code is no code at all.",
  "There are 10 types of people: those who understand binary and those who don't.",
  "It's not a bug, it's an undocumented feature.",
  "The only way to learn a new programming language is by writing programs in it.",
  "Talk is cheap. Show me the code.",
  "First, solve the problem. Then, write the code.",
  "Code is like humor. When you have to explain it, it's bad.",
  "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.",
  "The most damaging phrase in the language is 'We've always done it this way!'"
]

// File structure for terminal ls command
export const fileStructure = `Desktop/
├── about.txt
├── projects/
├── contact.txt
├── social/
├── businesses/
├── writing-samples/
└── gallery/

Total: 7 items`

// Helper functions
export const getSkillsList = (): string[] => skills.map(skill => skill.name)

export const getRandomFortune = (): string => {
  return fortunes[Math.floor(Math.random() * fortunes.length)]
} 