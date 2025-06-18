"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Briefcase, Mail, Monitor, ImageIcon, Power, Users } from "lucide-react"
import VistaTaskbar from "@/components/vista-taskbar"
import VistaWindow from "@/components/vista-window"
import VistaOrb from "@/components/vista-orb"
import DesktopIcon from "@/components/desktop-icon"
import Image from "next/image"
import React from "react"

const initialIcons = [
  { id: "about", name: "About Me", icon: User, gridX: 0, gridY: 0 },
  { id: "projects", name: "Projects", icon: Briefcase, gridX: 0, gridY: 1 },
  { id: "contact", name: "Contact", icon: Mail, gridX: 0, gridY: 2 },
  { id: "gallery", name: "Gallery", icon: ImageIcon, gridX: 0, gridY: 3 },
  { id: "social", name: "Social Media", icon: Users, gridX: 0, gridY: 4 },
]

const GRID_SIZE = 100 // Size of each grid cell
const GRID_OFFSET_X = 30 // Horizontal offset from screen edge
const GRID_OFFSET_Y = 100 // Vertical offset from top (below taskbar)

interface WindowState {
  id: string
  x: number
  y: number
  zIndex: number
  isMinimized: boolean
  isFullScreen: boolean
}

const wallpapers = [
  {
    id: "vista-default",
    name: "Vista Default",
    backgroundImage: "linear-gradient(135deg, #74b9ff 0%, #0984e3 25%, #00b894 50%, #00cec9 75%, #74b9ff 100%)",
    backgroundSize: "400% 400%",
    backgroundPosition: "0% 50%",
  },
  {
    id: "aurora",
    name: "Aurora",
    backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    backgroundSize: "400% 400%",
    backgroundPosition: "0% 50%",
  },
  {
    id: "sunset",
    name: "Sunset",
    backgroundImage: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
    backgroundSize: "400% 400%",
    backgroundPosition: "0% 50%",
  },
  {
    id: "ocean",
    name: "Ocean",
    backgroundImage: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    backgroundSize: "400% 400%",
    backgroundPosition: "0% 50%",
  },
  {
    id: "forest",
    name: "Forest",
    backgroundImage: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
    backgroundSize: "400% 400%",
    backgroundPosition: "0% 50%",
  },
  {
    id: "cosmic",
    name: "Cosmic",
    backgroundImage: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
    backgroundSize: "400% 400%",
    backgroundPosition: "0% 50%",
  },
]

interface WindowContentProps {
  windowId: string;
  onWallpaperChange: (wallpaper: any) => void;
  wallpapers: any[];
  onOpenWindow: (windowId: string) => void;
  selectedImage?: { src: string; alt: string } | null;
  setSelectedImage?: (image: { src: string; alt: string } | null) => void;
}

const ImageViewer = React.memo(({ selectedImage }: { selectedImage: { src: string; alt: string } | null | undefined }) => {
  console.log('Rendering ImageViewer with:', selectedImage);
  return (
    <div className="text-white h-[800px]">
      <div className="relative w-full h-full flex items-center justify-center p-8">
        {selectedImage ? (
          <div className="relative w-full h-full min-h-[700px]">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => console.error('Image failed to load:', e)}
              onLoad={() => console.log('Image loaded successfully')}
            />
          </div>
        ) : (
          <div>No image selected</div>
        )}
      </div>
    </div>
  );
});

ImageViewer.displayName = 'ImageViewer';

function WindowContent({ windowId, onWallpaperChange, wallpapers, onOpenWindow, selectedImage, setSelectedImage }: WindowContentProps) {
  const handleImageClick = (index: number) => {
    if (setSelectedImage) {
      setSelectedImage({
        src: `/gallery/photo-${index + 1}.jpg`,
        alt: `Gallery photo ${index + 1}`
      });
      onOpenWindow("image-viewer");
    }
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/olivervonmizener",
      description: "Professional network and career updates",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      color: "from-blue-600 to-blue-700",
      hoverColor: "hover:from-blue-700 hover:to-blue-800",
    },
    {
      name: "X (Twitter)",
      url: "https://x.com/olivervonmizener",
      description: "Tech thoughts and quick updates",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      color: "from-gray-800 to-black",
      hoverColor: "hover:from-black hover:to-gray-900",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/olivervonmizener",
      description: "Behind the scenes and creative shots",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      color: "from-pink-500 to-purple-600",
      hoverColor: "hover:from-pink-600 hover:to-purple-700",
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@olivervonmizener",
      description: "Coding tutorials and tech reviews",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      color: "from-red-600 to-red-700",
      hoverColor: "hover:from-red-700 hover:to-red-800",
    },
    {
      name: "GitHub",
      url: "https://github.com/ovonmizener",
      description: "Open source projects and code",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      color: "from-gray-700 to-gray-800",
      hoverColor: "hover:from-gray-800 hover:to-gray-900",
    },
    {
      name: "TikTok",
      url: "https://tiktok.com/@olivervonmizener",
      description: "Quick coding tips and tech content",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      color: "from-black to-gray-900",
      hoverColor: "hover:from-gray-900 hover:to-black",
    },
  ]

  switch (windowId) {
    case "social":
      return (
        <div className="text-white">
          <h2 className="text-3xl font-bold vista-text-gradient mb-6">Connect With Me</h2>
          <p className="text-white/80 mb-8 text-lg">
            Follow me across different platforms to stay updated with my latest projects, tutorials, and tech insights!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`aero-glass rounded-lg p-6 vista-shine hover:scale-105 transition-all duration-300 cursor-pointer group block`}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${social.color} ${social.hoverColor} flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110`}
                  >
                    {social.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-blue-300 transition-colors">
                      {social.name}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">{social.description}</p>
                    <div className="mt-3 flex items-center text-blue-300 text-sm group-hover:text-blue-200 transition-colors">
                      <span>Visit Profile</span>
                      <motion.span
                        className="ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        →
                      </motion.span>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 aero-glass rounded-lg p-6"
          >
            <h3 className="text-xl font-bold mb-4 text-center">Social Media Stats</h3>
            <div className="text-center text-white/60">
              Stats coming soon...
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-8 text-center"
          >
            <div className="aero-glass rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Stay Connected!</h3>
              <p className="text-white/80 text-sm mb-4">
                Don't miss out on the latest updates, tutorials, and behind-the-scenes content. Follow me on your
                favorite platforms!
              </p>
            </div>
          </motion.div>
        </div>
      )

    case "about":
      return (
        <div className="text-white max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold vista-text-gradient mb-6">About Oliver</h2>
          <div className="space-y-4 text-white/90">
            <div className="relative mb-8">
              <div className="float-left mr-8 mb-4">
                <div className="w-48 h-48 rounded-lg overflow-hidden vista-shine">
                  <img
                    src="/images/placeholder-headshot.jpg"
                    alt="Oliver von Mizener"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <p>
                  Hey, I'm Oliver—part legal technologist, part data nerd, part boba-slinging entrepreneur. I've spent the last few years helping organizations evolve, whether that's through smarter communication strategies, rethinking how knowledge flows, or finding ways to make change actually stick. I've got degrees in Communication (MA) and English Literature (BA) from Arizona State University, plus some extra firepower with Lean Six Sigma and a Product Management certificate from Cornell.
                </p>
                <p>
                  More recently, I dove headfirst into data analytics through ASU's boot camp, where I picked up Python, SQL, data viz, and machine learning chops. Now I blend analytics and empathy to make transformation not just efficient, but human. I have a distinct interest in machine learning and the rapidly developing AI space.
                </p>
                <p>
                  On the side? I run a milk tea and boba food truck and storefront, contribute auto features as a published writer for Performance Sound & Auto Magazine, and organize large-scale car shows and events—because spreadsheets are great, but there's something inspiring about an old imported car.
                </p>
                <p>
                  I love connecting with folks who are reimagining how things work—especially if they value tech-savvy, creative approaches that don't lose sight of the people involved.
                </p>
              </div>
              <div className="clear-both"></div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8 text-center"
            >
              <a
                href="/ovmresume.txt"
                download="Oliver_von_Mizener_Resume.txt"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download my Resume
              </a>
            </motion.div>
            <div className="grid grid-cols-2 gap-6">
              <div className="aero-glass rounded-lg p-6">
                <h3 className="font-semibold mb-4 text-xl">Skills</h3>
                <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "Python",
                      "SQL",
                      "JavaScript",
                      "APIs / Application Programming Interfaces",
                      "Data Analysis",
                      "Tableau",
                      "CSS",
                      "Matplotlib",
                      "JavaScript Libraries",
                      "Contentful",
                      "Data Analytics",
                      "SharePoint",
                      "Project Management",
                      "Documentation",
                      "Communication",
                      "Training & Development",
                      "Presentations",
                      "Editing",
                      "Voice Over / Public Speaking"
                    ].map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <span className="text-blue-300">•</span>
                        <span className="text-sm">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="aero-glass rounded-lg p-6">
                <h3 className="font-semibold mb-4 text-xl">Experience</h3>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {[
                    {
                      title: "Knowledge Management Analyst",
                      institution: "Finnegan, Henderson, Farabow, Garrett & Dunner, LLP",
                      year: "Mar 2024 – Present",
                      description: [
                        "Lead the design and deployment of knowledge systems and automation strategies in alignment with firm-wide AI/tech initiatives.",
                        "Drove strategic transformation by applying advanced data analytics to optimize internal resources and system efficiency."
                      ]
                    },
                    {
                      title: "Senior Knowledge Management Analyst",
                      institution: "Pearson",
                      year: "Aug 2019 – Aug 2023",
                      description: [
                        "Managed the architecture and evolution of enterprise knowledge systems using metadata, taxonomy, and machine learning.",
                        "Boosted productivity by improving search accuracy 30% and integrating AI to halve customer response time."
                      ]
                    },
                    {
                      title: "Process Improvement Consultant",
                      institution: "Self-Employed",
                      year: "Jun 2021 – Apr 2023",
                      description: [
                        "Advised leadership teams on smooth adoption of new tech and process redesigns in knowledge management.",
                        "Achieved a 90% user adoption rate through hands-on training and automation that cut manual effort by 40%."
                      ]
                    },
                    {
                      title: "Project Control Analyst",
                      institution: "U-Haul International, Inc.",
                      year: "Apr 2017 – Aug 2019",
                      description: [
                        "Modernized intranet systems and served as a key bridge between technical and business teams.",
                        "Converted and retained 10+ years of documentation and accelerated project completion by over 80% with improved SOPs."
                      ]
                    }
                  ].map((exp, index) => (
                    <motion.div
                      key={exp.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-l-2 border-blue-300 pl-4 mb-6 last:mb-0"
                    >
                      <h4 className="font-medium text-lg">{exp.title}</h4>
                      <p className="text-sm text-blue-200">{exp.institution} • {exp.year}</p>
                      <ul className="mt-2 space-y-2">
                        {exp.description.map((item, i) => (
                          <li key={i} className="text-sm text-white/70 leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )

    case "projects":
      return (
        <div className="text-white">
          <h2 className="text-3xl font-bold vista-text-gradient mb-6">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { 
                id: "music-sentiment",
                name: "Music Sentiment Analysis", 
                tech: "Machine Learning Model", 
                desc: "Analyzing emotional patterns in music using ML techniques"
              },
              { 
                id: "asu-bootcamp",
                name: "ASU Data Analytics Boot Camp", 
                tech: "Deep Learning Challenge", 
                desc: "Advanced data analysis and deep learning project"
              },
              { 
                id: "flappy-bird",
                name: "Python Game", 
                tech: "Flappy Bird Clone", 
                desc: "Classic game recreated with Python"
              },
              { 
                id: "joypop",
                name: "JoyPop", 
                tech: "Mobile Boba Cafe", 
                desc: "Innovative mobile boba tea business"
              },
              { 
                id: "portfolio",
                name: "This Website", 
                tech: "Portfolio Project", 
                desc: "A Windows Vista-inspired portfolio built with Next.js"
              },
              { 
                id: "coming-soon",
                name: "Coming Soon", 
                tech: "Placeholder", 
                desc: "More projects on the way..."
              },
            ].map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="aero-glass rounded-lg p-6 vista-shine hover:scale-105 transition-transform cursor-pointer"
                onClick={() => onOpenWindow(project.id)}
              >
                <h3 className="font-bold text-lg mb-2">{project.name}</h3>
                <p className="text-blue-200 text-sm mb-2">{project.tech}</p>
                <p className="text-white/80 text-sm">{project.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )

    case "music-sentiment":
      return (
        <div className="text-white">
          <h2 className="text-3xl font-bold vista-text-gradient mb-6">Music Sentiment Analysis</h2>
          <div className="aero-glass rounded-lg p-6">
            <p className="text-white/80 mb-4">A machine learning project that analyzes emotional patterns in music using ML techniques.</p>
            <a 
              href="https://github.com/ovonmizener/project4-databootcamp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
          </div>
        </div>
      )

    case "asu-bootcamp":
      return (
        <div className="text-white">
          <h2 className="text-3xl font-bold vista-text-gradient mb-6">ASU Data Analytics Boot Camp</h2>
          <div className="aero-glass rounded-lg p-6">
            <p className="text-white/80 mb-4">Deep learning challenge project from the ASU Data Analytics Boot Camp.</p>
            <a 
              href="https://github.com/ovonmizener/deep-learning-challenge" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
          </div>
        </div>
      )

    case "flappy-bird":
      return (
        <div className="text-white">
          <h2 className="text-3xl font-bold vista-text-gradient mb-6">Python Game - Flappy Bird Clone</h2>
          <div className="aero-glass rounded-lg p-6">
            <p className="text-white/80 mb-4">A Python implementation of the classic Flappy Bird game.</p>
            <div className="space-y-4">
              <a 
                href="https://github.com/ovonmizener/chattinogame" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
              <div className="mt-4 p-4 bg-white/5 rounded-lg">
                <p className="text-white/60 text-sm">Game preview coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      )

    case "joypop":
      return (
        <div className="text-white">
          <h2 className="text-3xl font-bold vista-text-gradient mb-6">JoyPop - Mobile Boba Cafe</h2>
          <div className="aero-glass rounded-lg p-6">
            <p className="text-white/80 mb-4">A mobile boba tea business bringing joy through delicious drinks.</p>
            <a 
              href="https://joypop.jp/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Visit Website
            </a>
          </div>
        </div>
      )

    case "portfolio":
      return (
        <div className="text-white">
          <h2 className="text-3xl font-bold vista-text-gradient mb-6">This Website - Portfolio Project</h2>
          <div className="aero-glass rounded-lg p-6">
            <p className="text-white/80 mb-4">Project details coming soon...</p>
          </div>
        </div>
      )

    case "coming-soon":
      return (
        <div className="text-white">
          <h2 className="text-3xl font-bold vista-text-gradient mb-6">Coming Soon</h2>
          <div className="aero-glass rounded-lg p-6">
            <p className="text-white/80 mb-4">More exciting projects are in development...</p>
          </div>
        </div>
      )

    case "contact":
      return (
        <div className="text-white">
          <h2 className="text-3xl font-bold vista-text-gradient mb-6">Get In Touch</h2>
          <div className="space-y-6">
            <div className="aero-glass rounded-lg p-6">
              <h3 className="font-semibold mb-4">Send me a message</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                />
                <VistaOrb className="vista-gradient-blue px-4 py-2">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </VistaOrb>
              </form>
            </div>
          </div>
        </div>
      )

    case "gallery":
      return (
        <div className="text-white">
          <h2 className="text-3xl font-bold vista-text-gradient mb-6">Gallery & Wallpapers</h2>

          {/* Wallpaper Picker Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-white/90">Desktop Wallpapers</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {wallpapers.map((wallpaper, index) => (
                <motion.div
                  key={wallpaper.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="aero-glass rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => onWallpaperChange(wallpaper)}
                >
                  <div className="w-full h-20 rounded-lg mb-3" style={{ backgroundImage: wallpaper.backgroundImage }} />
                  <p className="text-sm text-center font-medium">{wallpaper.name}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Project Gallery Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white/90">Project Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="aero-glass rounded-lg p-4 aspect-square relative group overflow-hidden cursor-pointer"
                  onClick={() => {
                    console.log('Gallery image clicked:', i + 1);
                    if (setSelectedImage && onOpenWindow) {
                      const imageData = {
                        src: `/gallery/photo-${i + 1}.jpg`,
                        alt: `Gallery photo ${i + 1}`
                      };
                      console.log('Setting selected image:', imageData);
                      setSelectedImage(imageData);
                      console.log('Opening image viewer window');
                      onOpenWindow("image-viewer");
                    }
                  }}
                >
                  <div className="absolute inset-0">
                    <Image
                      src={`/gallery/photo-${i + 1}.jpg`}
                      alt={`Gallery photo ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="text-white/80 hover:text-white transition-colors">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )

    case "image-viewer":
      return <ImageViewer selectedImage={selectedImage} />;

    default:
      return (
        <div className="text-white text-center py-12">
          <h2 className="text-2xl font-bold vista-text-gradient mb-4">Coming Soon</h2>
          <p className="text-white/80">This section is under development!</p>
        </div>
      )
  }
}

export default function VistaDesktop() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [openWindows, setOpenWindows] = useState<WindowState[]>([])
  const [activeWindow, setActiveWindow] = useState<string | null>(null)
  const [showWelcome, setShowWelcome] = useState(true)
  const [desktopIcons, setDesktopIcons] = useState(initialIcons)
  const [nextZIndex, setNextZIndex] = useState(1)
  const [showSearch, setShowSearch] = useState(false)
  const [showPowerMenu, setShowPowerMenu] = useState(false)
  const [currentWallpaper, setCurrentWallpaper] = useState(wallpapers[0])
  const [showPowerScreen, setShowPowerScreen] = useState(false)
  const [powerAction, setPowerAction] = useState("")
  const [selectedWallpaper, setSelectedWallpaper] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const openWindow = (windowId: string) => {
    console.log("Opening window:", windowId)
    setShowWelcome(false)

    // Check if window is already open but minimized
    const existingWindow = openWindows.find((w) => w.id === windowId)
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        // Restore from minimized state
        setOpenWindows((windows) =>
          windows.map((w) => (w.id === windowId ? { ...w, isMinimized: false, zIndex: nextZIndex } : w)),
        )
        setActiveWindow(windowId)
        setNextZIndex((prev) => prev + 1)
      } else {
        // Bring to front
        setActiveWindow(windowId)
        setOpenWindows((windows) => windows.map((w) => (w.id === windowId ? { ...w, zIndex: nextZIndex } : w)))
        setNextZIndex((prev) => prev + 1)
      }
      return
    }

    // Calculate position to ensure window stays within screen bounds
    const windowWidth = 800
    const windowHeight = 600
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight - 80 // Account for taskbar at top

    const baseX = 100 + openWindows.length * 50
    const baseY = 100 + openWindows.length * 50 + 80 // Add offset for top taskbar

    // Ensure window doesn't go off screen
    const x = Math.min(baseX, screenWidth - windowWidth - 50)
    const y = Math.min(baseY, screenHeight - windowHeight - 50)

    // Create new window
    const newWindow: WindowState = {
      id: windowId,
      x: Math.max(50, x), // Minimum 50px from left edge
      y: Math.max(80, y), // Minimum 80px from top edge (below taskbar)
      zIndex: nextZIndex,
      isMinimized: false,
      isFullScreen: false,
    }

    console.log("Creating new window:", newWindow)
    setOpenWindows((prev) => [...prev, newWindow])
    setActiveWindow(windowId)
    setNextZIndex((prev) => prev + 1)
  }

  const closeWindow = (windowId: string) => {
    setOpenWindows(openWindows.filter((w) => w.id !== windowId))
    if (activeWindow === windowId) {
      const remainingWindows = openWindows.filter((w) => w.id !== windowId && !w.isMinimized)
      setActiveWindow(remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1].id : null)
    }
  }

  const minimizeWindow = (windowId: string) => {
    setOpenWindows((windows) => windows.map((w) => (w.id === windowId ? { ...w, isMinimized: true } : w)))
    if (activeWindow === windowId) {
      const remainingWindows = openWindows.filter((w) => w.id !== windowId && !w.isMinimized)
      setActiveWindow(remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1].id : null)
    }
  }

  const updateWindowPosition = (windowId: string, x: number, y: number) => {
    setOpenWindows((windows) => windows.map((w) => (w.id === windowId ? { ...w, x, y } : w)))
  }

  const bringWindowToFront = (windowId: string) => {
    const window = openWindows.find((w) => w.id === windowId)
    if (window?.isMinimized) {
      // Restore from minimized state
      setOpenWindows((windows) =>
        windows.map((w) => (w.id === windowId ? { ...w, isMinimized: false, zIndex: nextZIndex } : w)),
      )
    } else {
      // Bring to front
      setOpenWindows((windows) => windows.map((w) => (w.id === windowId ? { ...w, zIndex: nextZIndex } : w)))
    }
    setActiveWindow(windowId)
    setNextZIndex((prev) => prev + 1)
  }

  const moveIcon = (iconId: string, newGridX: number, newGridY: number) => {
    // Check if the new position is occupied
    const isOccupied = desktopIcons.some(
      (icon) => icon.id !== iconId && icon.gridX === newGridX && icon.gridY === newGridY,
    )

    if (!isOccupied && newGridX >= 0 && newGridY >= 0) {
      setDesktopIcons((icons) =>
        icons.map((icon) => (icon.id === iconId ? { ...icon, gridX: newGridX, gridY: newGridY } : icon)),
      )
    }
  }

  const handleSearch = () => {
    setShowSearch(!showSearch)
    setShowPowerMenu(false)
  }

  const handlePowerMenu = () => {
    setShowPowerMenu(!showPowerMenu)
    setShowSearch(false)
  }

  const handlePowerAction = (action: string) => {
    setPowerAction(action)
    setShowPowerScreen(true)
    setShowPowerMenu(false)

    // Auto-restore after 2 seconds
    setTimeout(() => {
      setShowPowerScreen(false)
      setPowerAction("")
    }, 2000)
  }

  const handlePowerScreenClick = () => {
    setShowPowerScreen(false)
    setPowerAction("")
  }

  const changeWallpaper = (wallpaper: (typeof wallpapers)[0]) => {
    setCurrentWallpaper(wallpaper)
  }

  const toggleFullScreen = (windowId: string) => {
    setOpenWindows((windows) =>
      windows.map((w) => {
        if (w.id === windowId) {
          // If going full screen, bring to front
          if (!w.isFullScreen) {
            setNextZIndex((prev) => prev + 1)
            return { ...w, isFullScreen: true, zIndex: nextZIndex }
          }
          return { ...w, isFullScreen: false }
        }
        return w
      })
    )
  }

  const desktopStyle = {
    backgroundImage: currentWallpaper.backgroundImage,
    backgroundSize: currentWallpaper.backgroundSize,
    backgroundPosition: currentWallpaper.backgroundPosition,
    animation: "vistaGradient 15s ease infinite",
  }

  const windows = [
    {
      id: "welcome",
      title: "Welcome",
      content: <WindowContent windowId="welcome" onWallpaperChange={setSelectedWallpaper} wallpapers={wallpapers} onOpenWindow={setActiveWindow} />,
      isMinimized: false,
      isMaximized: false,
      position: { x: 100, y: 100 },
      size: { width: 600, height: 400 },
    },
    {
      id: "about",
      title: "About Me",
      content: <WindowContent windowId="about" onWallpaperChange={setSelectedWallpaper} wallpapers={wallpapers} onOpenWindow={setActiveWindow} />,
      isMinimized: false,
      isMaximized: false,
      position: { x: 150, y: 150 },
      size: { width: 800, height: 600 },
    },
    {
      id: "projects",
      title: "Projects",
      content: <WindowContent windowId="projects" onWallpaperChange={setSelectedWallpaper} wallpapers={wallpapers} onOpenWindow={setActiveWindow} />,
      isMinimized: false,
      isMaximized: false,
      position: { x: 200, y: 200 },
      size: { width: 800, height: 600 },
    },
    {
      id: "gallery",
      title: "Gallery",
      content: <WindowContent windowId="gallery" onWallpaperChange={setSelectedWallpaper} wallpapers={wallpapers} onOpenWindow={setActiveWindow} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />,
      isMinimized: false,
      isMaximized: false,
      position: { x: 250, y: 250 },
      size: { width: 800, height: 600 },
    },
    {
      id: "contact",
      title: "Contact",
      content: <WindowContent windowId="contact" onWallpaperChange={setSelectedWallpaper} wallpapers={wallpapers} onOpenWindow={setActiveWindow} />,
      isMinimized: false,
      isMaximized: false,
      position: { x: 300, y: 300 },
      size: { width: 600, height: 400 },
    },
    {
      id: "image-viewer",
      title: selectedImage?.alt || "Image Viewer",
      content: (
        <div className="h-[800px]">
          <WindowContent 
            windowId="image-viewer" 
            onWallpaperChange={setSelectedWallpaper} 
            wallpapers={wallpapers} 
            onOpenWindow={setActiveWindow} 
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        </div>
      ),
      isMinimized: false,
      isMaximized: false,
      position: { x: 350, y: 350 },
      size: { width: 1200, height: 900 },
    },
  ]

  return (
    <div className="h-screen w-screen overflow-hidden relative" style={desktopStyle}>
      {/* Floating Orbs Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full vista-glow-blue opacity-20"
            style={{
              background: `radial-gradient(circle, rgba(116, 185, 255, 0.3) 0%, transparent 70%)`,
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Desktop Icons */}
      <div className="absolute top-0 left-0 right-0 bottom-0 p-8 pointer-events-none">
        <div className="grid grid-cols-1 gap-8 mt-24" style={{ maxWidth: "200px" }}>
          {desktopIcons.map((icon) => (
            <motion.div
              key={icon.id}
              className="pointer-events-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                gridColumn: icon.gridX + 1,
                gridRow: icon.gridY + 1,
              }}
            >
              <DesktopIcon
                icon={icon.icon}
                label={icon.name}
                onClick={() => openWindow(icon.id)}
                onMove={(deltaX, deltaY) => {
                  const newGridX = Math.round(deltaX / GRID_SIZE)
                  const newGridY = Math.round(deltaY / GRID_SIZE)
                  moveIcon(icon.id, newGridX, newGridY)
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Welcome Window */}
      <AnimatePresence>
        {showWelcome && openWindows.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ zIndex: 1000 }}
          >
            <VistaWindow
              title="Welcome"
              onClose={() => setShowWelcome(false)}
              onMinimize={() => {}}
              isActive={true}
              width={700}
              height={500}
              isDraggable={false}
            >
              <div className="p-8 text-center">
                <motion.div
                  className="mb-6"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Monitor className="w-24 h-24 mx-auto text-blue-400" />
                </motion.div>

                <p className="text-lg text-white/80 mb-8 leading-relaxed">
                  Welcome to my website and portfolio. Inspired by the Frutiger Aero aesthetic, here you can find a little more about me, my projects and get in touch. This site serves as my personal portfolio.
                </p>

                <div className="flex gap-4 justify-center">
                  <VistaOrb onClick={() => openWindow("about")} className="vista-gradient-blue px-4 py-2">
                    <User className="w-6 h-6" />
                    <span className="ml-2">Get Started</span>
                  </VistaOrb>

                  <VistaOrb onClick={() => openWindow("projects")} className="vista-gradient-green px-4 py-2">
                    <Briefcase className="w-6 h-6" />
                    <span className="ml-2">View Work</span>
                  </VistaOrb>
                </div>
              </div>
            </VistaWindow>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Open Windows */}
      <AnimatePresence>
        {openWindows
          .filter((window) => !window.isMinimized)
          .map((window) => (
            <motion.div
              key={window.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute"
              style={{
                left: window.x,
                top: window.y,
                zIndex: window.zIndex,
              }}
            >
              <VistaWindow
                title={desktopIcons.find((icon) => icon.id === window.id)?.name || window.id}
                onClose={() => closeWindow(window.id)}
                onMinimize={() => minimizeWindow(window.id)}
                onFullScreen={() => toggleFullScreen(window.id)}
                isActive={activeWindow === window.id}
                onClick={() => bringWindowToFront(window.id)}
                onMove={(x, y) => updateWindowPosition(window.id, x, y)}
                width={800}
                height={600}
                isDraggable={!window.isFullScreen}
                isFullScreen={window.isFullScreen}
              >
                <div className="p-8">
                  <WindowContent 
                    windowId={window.id} 
                    onWallpaperChange={changeWallpaper} 
                    wallpapers={wallpapers}
                    onOpenWindow={openWindow}
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                  />
                </div>
              </VistaWindow>
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Taskbar - Now at top */}
      <VistaTaskbar
        openWindows={openWindows.map((w) => w.id)}
        minimizedWindows={openWindows.filter((w) => w.isMinimized).map((w) => w.id)}
        activeWindow={activeWindow}
        onWindowClick={bringWindowToFront}
        currentTime={currentTime}
        onSearch={handleSearch}
        onPowerMenu={handlePowerMenu}
        showSearch={showSearch}
        showPowerMenu={showPowerMenu}
        onPowerAction={handlePowerAction}
      />

      {/* Power Screen Overlay */}
      <AnimatePresence>
        {showPowerScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[9999] flex items-center justify-center cursor-pointer"
            onClick={handlePowerScreenClick}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="text-center"
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-6 vista-gradient-blue rounded-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Power className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-4xl font-bold text-white mb-4 capitalize">
                {powerAction === "logoff"
                  ? "Logging Off"
                  : powerAction === "shutdown"
                    ? "Shutting Down"
                    : powerAction === "restart"
                      ? "Restarting"
                      : "Sleep Mode"}
              </h2>
              <p className="text-white/60 text-lg">Click anywhere to return</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
