"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const projects = [
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
  {
    id: 4,
    title: "Portfolio Website",
    description: "Responsive portfolio site with modern animations and interactive elements.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    date: "2023",
    github: "#",
    live: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Blog Platform",
    description: "Content management system with markdown support and SEO optimization.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["Next.js", "MDX", "Vercel"],
    date: "2023",
    github: "#",
    live: "#",
    featured: false,
  },
  {
    id: 6,
    title: "Mobile App UI Kit",
    description: "Comprehensive design system and component library for mobile applications.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["Figma", "React Native", "Design System"],
    date: "2022",
    github: "#",
    live: "#",
    featured: false,
  },
]

const categories = ["All", "Web Apps", "Mobile", "Design", "Open Source"]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mcm-cream-50 to-mcm-orange-50 dark:from-mcm-charcoal-900 dark:to-mcm-brown-900">
      {/* Header */}
      <header className="p-6">
        <nav className="max-w-7xl mx-auto">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-mcm-orange-600 to-mcm-green-600 bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            A collection of my recent work showcasing various technologies, design approaches, and problem-solving
            skills.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <Button
              key={category}
              variant={index === 0 ? "default" : "outline"}
              className={index === 0 ? "bg-gradient-to-r from-mcm-orange-500 to-mcm-green-500" : ""}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Featured Projects</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {projects
              .filter((p) => p.featured)
              .map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="relative overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button size="sm" variant="secondary" asChild>
                          <Link href={project.github}>
                            <Github className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button size="sm" variant="secondary" asChild>
                          <Link href={project.live}>
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">
                          {project.title}
                        </CardTitle>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {project.date}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-gradient-to-r from-mcm-orange-100 to-mcm-green-100 dark:from-mcm-orange-900/30 dark:to-mcm-green-900/30"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* All Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-gray-800">All Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              >
                <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="sm" variant="secondary" asChild>
                        <Link href={project.github}>
                          <Github className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="secondary" asChild>
                        <Link href={project.live}>
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {project.title}
                      </CardTitle>
                      <span className="text-sm text-gray-500">{project.date}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-gray-600 text-sm mb-4 flex-1">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-gradient-to-r from-orange-100 to-teal-100"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center mt-16"
        >
          <Card className="p-8 bg-gradient-to-r from-mcm-orange-500 to-mcm-green-500 text-white border-0 shadow-xl">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold mb-4">Interested in Collaborating?</h3>
              <p className="mb-6 opacity-90">
                I'm always excited to work on new projects and explore innovative solutions. Let's create something
                amazing together!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button variant="secondary" size="lg">
                    Start a Project
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-orange-500"
                  >
                    Learn More About Me
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
