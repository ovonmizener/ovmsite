import VistaWindow from "./vista-window"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Download, ExternalLink, Github, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react"

interface WindowContentProps {
  windowId: string
  onClose: () => void
  onWallpaperChange?: (wallpaper: any) => void
  wallpapers?: any[]
  onOpenWindow?: (windowId: string) => void
  selectedImage?: { src: string; alt: string } | null
  setSelectedImage?: (image: { src: string; alt: string } | null) => void
}

const skills = [
  "Python",
  "SQL",
  "Data Visualization",
  "Machine Learning",
  "Lean Six Sigma",
  "Product Management",
  "Communication Strategy",
  "Knowledge Management",
]

const experience = [
  { year: "2024", title: "Data Analytics Bootcamp", company: "Arizona State University" },
  { year: "2023", title: "Product Management", company: "Cornell University" },
  { year: "2022", title: "Lean Six Sigma", company: "Professional Certification" },
  { year: "2021", title: "Communication (MA)", company: "Arizona State University" },
  { year: "2020", title: "English Literature (BA)", company: "Arizona State University" },
]

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
]

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@olivervonmizener.com",
    href: "mailto:hello@olivervonmizener.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    href: "#",
  },
]

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com", color: "hover:text-gray-800" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com", color: "hover:text-blue-600" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com", color: "hover:text-blue-400" },
]

export function WindowContent({
  windowId,
  onClose,
  onWallpaperChange,
  wallpapers,
  onOpenWindow,
  selectedImage,
  setSelectedImage,
}: WindowContentProps) {
  const handleImageClick = (index: number) => {
    if (setSelectedImage) {
      setSelectedImage({
        src: `/gallery/image${index + 1}.jpg`,
        alt: `Gallery Image ${index + 1}`,
      })
    }
  }

  const renderContent = () => {
    switch (windowId) {
      case "about":
        return (
          <div className="p-6 space-y-4">
            <div className="relative w-48 h-48 mx-auto mb-8">
              <Image
                src="/placeholder-headshot.jpg"
                alt="Oliver von Mizener"
                width={192}
                height={192}
                className="rounded-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold text-center">About Oliver</h1>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                Hey, I'm Oliver—part legal technologist, part data nerd, part boba-slinging entrepreneur.
              </p>
              <p>
                I've spent the last few years helping organizations evolve, whether that's through smarter communication strategies, rethinking how knowledge flows, or finding ways to make change actually stick. I've got degrees in Communication (MA) and English Literature (BA) from Arizona State University, plus some extra firepower with Lean Six Sigma and a Product Management certificate from Cornell.
              </p>
              <p>
                More recently, I dove headfirst into data analytics through ASU's boot camp, where I picked up Python, SQL, data viz, and machine learning chops. Now I blend analytics and empathy to make transformation not just efficient, but human. I have a distinct interest in machine learning and the rapidly developing AI space.
              </p>
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Skills</h2>
                <div className="grid grid-cols-2 gap-3">
                  {skills.map((skill) => (
                    <div
                      key={skill}
                      className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 text-sm font-medium text-center"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Experience</h2>
                <div className="space-y-4">
                  {experience.map((item) => (
                    <div key={item.year} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {item.year}
                      </div>
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case "projects":
        return (
          <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold mb-6">Projects</h1>
            <div className="grid grid-cols-1 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-xl font-semibold">{project.title}</h2>
                      <span className="text-sm text-gray-500">{project.date}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={project.github}>
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={project.live}>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "contact":
        return (
          <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold mb-6">Contact Me</h1>
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <Link
                      href={item.href}
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
                    >
                      {item.value}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Connect With Me</h2>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    className={`flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 transition-all duration-200 hover:scale-110 ${social.color}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )

      case "gallery":
        return (
          <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold mb-6">Gallery</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div
                  key={index}
                  className="relative aspect-square cursor-pointer"
                  onClick={() => handleImageClick(index - 1)}
                >
                  <Image
                    src={`/gallery/image${index}.jpg`}
                    alt={`Gallery Image ${index}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        )

      case "social":
        return (
          <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold mb-6">Social Media</h1>
            <div className="space-y-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="block p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${social.color}`}>
                      <social.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{social.label}</h3>
                      <p className="text-sm text-gray-500">Follow me on {social.label}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return renderContent()
} 