"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Briefcase, Mail, Monitor, ImageIcon, Power, Users, Building2, FileText, Trash2 } from "lucide-react"
import VistaTaskbar from "@/components/vista-taskbar"
import VistaWindow from "@/components/vista-window"
import VistaOrb from "@/components/vista-orb"
import DesktopIcon from "@/components/desktop-icon"
import PerformanceMonitorWindow from "./components/PerformanceMonitorWindow"
import Image from "next/image"
import React from "react"
import Cookies from "js-cookie"

const initialIcons = [
  { id: "about", name: "About Me", icon: User, gridX: 0, gridY: 0 },
  { id: "social", name: "Social Media", icon: Users, gridX: 1, gridY: 0 },
  { id: "projects", name: "Projects", icon: Briefcase, gridX: 0, gridY: 1 },
  { id: "businesses", name: "Businesses", icon: Building2, gridX: 0, gridY: 2 },
  { id: "writing-samples", name: "Writing Samples", icon: FileText, gridX: 0, gridY: 3 },
  { id: "contact", name: "Contact", icon: Mail, gridX: 0, gridY: 4 },
  { id: "gallery", name: "Gallery", icon: ImageIcon, gridX: 0, gridY: 5 },
  { id: "recycle-bin", name: "Recycle Bin", icon: Trash2, gridX: 1, gridY: 1 },
]

const GRID_SIZE = 100 // Size of each grid cell
const GRID_OFFSET_X = 30 // Horizontal offset from screen edge
const GRID_OFFSET_Y = 100 // Vertical offset from top (below taskbar)

interface DesktopWindowState {
  id: string
  x: number
  y: number
  zIndex: number
  isMinimized: boolean
  isFullScreen: boolean
  lastPosition?: { x: number; y: number }
  width: number
  height: number
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
  {
    id: "night-mode",
    name: "Night Mode",
    backgroundImage: "linear-gradient(135deg, #111 0%, #222 100%)",
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
  isFirstVisit?: boolean;
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

function WindowContent({ windowId, onWallpaperChange, wallpapers, onOpenWindow, selectedImage, setSelectedImage, isFirstVisit }: WindowContentProps) {
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
                tech: "Jetpack Escape", 
                desc: "A Python implementation of Jetpack Escape, now playable in your browser!"
              },
              {
                id: "ipodfiller",
                name: "ipodfiller App",
                tech: "Desktop Music Manager",
                desc: "A modern desktop app to download and organize music from public Spotify playlists for classic iPods. More info coming soon!"
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

    case "businesses":
      return (
        <div className="text-white">
          <h2 className="text-3xl font-bold vista-text-gradient mb-6">Business Ventures</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="vista-window p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-4 text-white/90">JoyPop</h3>
              <p className="text-white/80 mb-4">
                A mobile app development company focused on creating engaging and innovative applications.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-white/70"><strong>Role:</strong> Founder & CEO</p>
                <p className="text-sm text-white/70"><strong>Focus:</strong> Mobile App Development</p>
                <p className="text-sm text-white/70"><strong>Status:</strong> Active</p>
              </div>
            </motion.div>
          </div>
        </div>
      )
    case "writing-samples":
      return (
        <div className="text-white">
          <h2 className="text-3xl font-bold vista-text-gradient mb-6">Writing Samples</h2>
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="vista-window p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-4 text-white/90">Coming Soon</h3>
              <p className="text-white/80 mb-4">
                This section will showcase various writing samples, including technical documentation, 
                creative writing, and professional articles.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-white/70">• Technical Documentation</p>
                <p className="text-sm text-white/70">• Creative Writing</p>
                <p className="text-sm text-white/70">• Professional Articles</p>
                <p className="text-sm text-white/70">• Blog Posts</p>
              </div>
            </motion.div>
          </div>
        </div>
      )

    case "music-sentiment":
      return (
        <div className="text-white">
          <h2 className="text-3xl font-bold vista-text-gradient mb-6">Sonic Sentiments – Music Sentiment Analyzer</h2>
          <div className="space-y-6">
            {/* GitHub Link at the Top */}
            <div className="pb-2">
              <a 
                href="https://github.com/ovonmizener/project4-databootcamp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 transition-colors border border-blue-400"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </div>
            {/* Project Overview */}
            <div className="bg-white/5 border-l-4 border-blue-400 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2 text-blue-200">Project Overview</h3>
              <p className="text-white/80 mb-2">For my data analytics bootcamp capstone, I built Sonic Sentiments, a web app that analyzes song lyrics for sentiment and genre. Using a Spotify dataset, I cleaned and preprocessed data, applied NLP techniques with TextBlob and TF-IDF, and trained models like logistic regression and Random Forest to predict sentiment and musical features.</p>
            </div>
            {/* What I Built & Learned */}
            <div className="bg-white/5 border-l-4 border-green-400 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2 text-green-200">What I Built & Learned</h3>
              <p className="text-white/80 mb-2">I developed the data pipeline in Python, handled NLP and model training with scikit-learn, and created a Flask backend with a user-friendly Dash dashboard to visualize trends and user inputs. The project combined data cleaning, modeling, and deployment into a seamless app.</p>
            </div>
            {/* Real-World Application */}
            <div className="bg-white/5 border-l-4 border-yellow-400 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2 text-yellow-200">How This Applies to Real-World Projects</h3>
              <p className="text-white/80">This experience reflects the full data analytics workflow, from raw data to interactive insights, applicable to customer feedback analysis, internal tools, or any project needing clear, data-driven storytelling.</p>
            </div>
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
          <h2 className="text-3xl font-bold vista-text-gradient mb-6">Python Game - Jetpack Escape</h2>
          <div className="aero-glass rounded-lg p-6">
            <p className="text-white/80 mb-4">Just for fun, I started making a "Flappy Bird" style game in Python. It's themed after popular streamer Raora, and her character Chattino. I'm just doing this for the experience, I may never finish it, but I wanted a repository available so I can share with friends. Feel free to take/use/modify this however you want. For source code and more details, please visit the GitHub repository.</p>
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
              <button 
                onClick={() => onOpenWindow("flappy-bird-game")}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 transition-colors border border-green-500/30"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                🎮 Play Game
              </button>
              <div className="mt-4 p-4 bg-white/5 rounded-lg">
                <p className="text-white/80 text-sm mb-2">🎯 How to Play:</p>
                <ul className="text-white/60 text-sm space-y-1">
                  <li>• SPACE: Jump / Double Jump</li>
                  <li>• ESC: Return to Menu</li>
                  <li>• Mouse: Navigate Menus</li>
                  <li>• Choose between Traditional and Continuous modes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )

    case "flappy-bird-game":
      return (
        <div style={{ width: "100%", height: "100%" }}>
          <iframe
            src="/games/flappy-bird/index.html"
            className="w-full h-full border-0"
            title="Jetpack Escape Game"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      )

    case "joypop":
      return (
        <div className="text-white">
          <h2 className="text-3xl font-bold vista-text-gradient mb-6">JoyPop Boba Cafe</h2>

          {/* Responsive Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <img src="/images/joypop/Capture1.JPG" alt="JoyPop boba and van" className="rounded-xl shadow-lg object-cover w-full h-56 sm:h-64" />
            <img src="/images/joypop/0P2A7628.jpg" alt="JoyPop outdoor event" className="rounded-xl shadow-lg object-cover w-full h-56 sm:h-64" />
            <img src="/images/joypop/Capture.JPG" alt="JoyPop van and boba" className="rounded-xl shadow-lg object-cover w-full h-56 sm:h-64" />
            <img src="/images/joypop/IMG_6873.jpg" alt="JoyPop indoor booth" className="rounded-xl shadow-lg object-cover w-full h-56 sm:h-64" />
          </div>

          <div className="space-y-6">
            {/* About Section */}
            <div className="aero-glass rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-white/90">About JoyPop Boba Cafe</h3>
              <p className="text-white/80 mb-4">I started JoyPop out of a love for community and boba culture. What began with a quirky little Suzuki JoyPop Every van has since grown into a full-service boba cafe and mobile catering business. I wanted to build something that felt fun, high-quality, and a little unexpected—something that brought people together through great drinks and shared experiences. Now based in Mesa, Arizona, JoyPop continues to reflect that original spark of creativity and joy.</p>
            </div>

            {/* Services Section */}
            <div className="aero-glass rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-white/90">Services: In-Store & Mobile</h3>
              <p className="text-white/80 mb-4">At our cafe, guests can enjoy handcrafted boba drinks in a cozy, welcoming space. We also specialize in mobile boba catering for events of all kinds—weddings, birthdays, corporate gatherings, and more. Our services are fully customizable, with options ranging from full-service boba bars to self-serve stations and bottled drinks. I also offer private tasting sessions to help clients craft the perfect signature drink for their event.</p>
            </div>

            {/* Location & Contact Section */}
            <div className="aero-glass rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-white/90">Location & Contact</h3>
              <p className="text-white/80 mb-4">You can find JoyPop inside The Enclave Salon Suites at 4936 S Power Rd #120, Mesa, AZ 85212. For event bookings or questions, I'm always happy to connect—just reach out at (480) 420‑4758 or email me at oliver@joypop.jp.</p>
              <div className="flex gap-4 mt-6">
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
                <a 
                  href="tel:+14804204758"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 transition-colors border border-green-500/30"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call (480) 420-4758
                </a>
              </div>
            </div>
          </div>
        </div>
      )

    case "portfolio":
      return (
        <div className="text-white">
          <h2 className="text-3xl font-bold vista-text-gradient mb-6">This Website – Portfolio Project</h2>
          <div className="space-y-6">
            {/* Ethos & Inspiration */}
            <div className="bg-white/5 border-l-4 border-cyan-400 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2 text-cyan-200">Ethos & Inspiration</h3>
              <p className="text-white/80 mb-2">
                This site is a love letter to the <span className="font-bold text-cyan-300">Frutiger Aero</span> aesthetic—think glassy surfaces, playful gradients, and a sense of digital optimism. I wanted to create a portfolio that felt like a desktop OS from a parallel universe: interactive, fun, and a little nostalgic, but with modern web tech under the hood.
              </p>
            </div>
            {/* Tech Stack */}
            <div className="bg-white/5 border-l-4 border-blue-400 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2 text-blue-200">Tech Stack</h3>
              <ul className="list-disc list-inside text-white/80 space-y-1">
                <li><span className="font-bold text-blue-300">Next.js</span> (App Router, SSR, API routes)</li>
                <li><span className="font-bold text-blue-300">React</span> (component-driven UI)</li>
                <li><span className="font-bold text-blue-300">Tailwind CSS</span> (utility-first styling, custom themes)</li>
                <li><span className="font-bold text-blue-300">Framer Motion</span> (animations, drag & drop)</li>
                <li><span className="font-bold text-blue-300">TypeScript</span> (type safety everywhere)</li>
                <li><span className="font-bold text-blue-300">Prisma</span> (future-proofed for backend/data)</li>
              </ul>
            </div>
            {/* Features */}
            <div className="bg-white/5 border-l-4 border-green-400 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2 text-green-200">Features</h3>
              <ul className="list-disc list-inside text-white/80 space-y-1">
                <li>Draggable, resizable windows (like a real OS)</li>
                <li>Animated taskbar, start orb, and desktop icons</li>
                <li>Project popups with embedded games, galleries, and more</li>
                <li>Responsive design for desktop and mobile</li>
                <li>Custom themes and wallpapers</li>
                <li>Konami code easter egg 🕹️</li>
              </ul>
            </div>
            {/* Technical Hurdles */}
            <div className="bg-white/5 border-l-4 border-yellow-400 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2 text-yellow-200">Technical Hurdles</h3>
              <ul className="list-disc list-inside text-white/80 space-y-1">
                <li>Making iframes and canvases scale perfectly inside draggable windows (CSS height inheritance is tricky!)</li>
                <li>Managing z-index and focus for overlapping windows</li>
                <li>State management for window positions, sizes, and active status</li>
                <li>Ensuring smooth drag-and-drop and animation performance</li>
                <li>Balancing aesthetics with accessibility and responsiveness</li>
              </ul>
            </div>
            {/* Screenshots Placeholder */}
            <div className="bg-white/5 border-l-4 border-pink-400 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2 text-pink-200">Screenshots</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-pink-400 rounded-lg h-40 flex items-center justify-center text-pink-300 text-lg">Screenshot coming soon!</div>
                <div className="border-2 border-dashed border-pink-400 rounded-lg h-40 flex items-center justify-center text-pink-300 text-lg">Screenshot coming soon!</div>
              </div>
            </div>
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
          <h2 className="text-3xl font-bold vista-text-gradient mb-6">Gallery</h2>
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
                  if (setSelectedImage && onOpenWindow) {
                    const imageData = {
                      src: `/gallery/photo-${i + 1}.jpg`,
                      alt: `Gallery photo ${i + 1}`
                    };
                    setSelectedImage(imageData);
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
      )

    case "image-viewer":
      return <ImageViewer selectedImage={selectedImage} />;

    case "wallpapers":
      return (
        <div className="text-white">
          <h2 className="text-3xl font-bold vista-text-gradient mb-6">Desktop Wallpapers</h2>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-white/90">Choose a Wallpaper</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {wallpapers.map((wallpaper, index) => (
                <motion.div
                  key={wallpaper.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="cursor-pointer group"
                  onClick={() => onWallpaperChange(wallpaper)}
                >
                  <div className="relative overflow-hidden rounded-lg vista-window p-2">
                    <div
                      className="w-full h-24 rounded-md"
                      style={{
                        background: wallpaper.backgroundImage,
                        backgroundSize: wallpaper.backgroundSize,
                        backgroundPosition: wallpaper.backgroundPosition,
                      }}
                    />
                    <p className="text-center text-sm mt-2 text-white/80 group-hover:text-white transition-colors">
                      {wallpaper.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )

    case "performance-monitor":
      return <PerformanceMonitorWindow />;

    case "welcome":
      return (
        <div className="p-8 text-center">
          <motion.div
            className="mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          >
            <Monitor className="w-24 h-24 mx-auto text-blue-400" />
          </motion.div>

          {isFirstVisit ? (
            <>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Welcome to my website and portfolio. Inspired by the Frutiger Aero aesthetic, here you can find a little more about me, my projects and get in touch. This site serves as my personal portfolio.
              </p>

              <div className="flex gap-4 justify-center">
                <VistaOrb onClick={() => onOpenWindow("about")} className="vista-gradient-blue px-4 py-2">
                  <User className="w-6 h-6" />
                  <span className="ml-2">Get Started</span>
                </VistaOrb>

                <VistaOrb onClick={() => onOpenWindow("projects")} className="vista-gradient-green px-4 py-2">
                  <Briefcase className="w-6 h-6" />
                  <span className="ml-2">View Work</span>
                </VistaOrb>
              </div>
            </>
          ) : (
            <>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Welcome back! It's great to see you again. Feel free to explore my latest updates, check out new projects, or just browse around. What would you like to see today?
              </p>

              <div className="flex gap-4 justify-center">
                <VistaOrb onClick={() => onOpenWindow("about")} className="vista-gradient-blue px-4 py-2">
                  <User className="w-6 h-6" />
                  <span className="ml-2">About Me</span>
                </VistaOrb>

                <VistaOrb onClick={() => onOpenWindow("projects")} className="vista-gradient-green px-4 py-2">
                  <Briefcase className="w-6 h-6" />
                  <span className="ml-2">My Projects</span>
                </VistaOrb>

                <VistaOrb onClick={() => onOpenWindow("contact")} className="vista-gradient-purple px-4 py-2">
                  <Mail className="w-6 h-6" />
                  <span className="ml-2">Contact</span>
                </VistaOrb>
              </div>
            </>
          )}
        </div>
      )

    case "recycle-bin":
      return (
        <div className="text-white">
          <h2 className="text-3xl font-bold vista-text-gradient mb-6">Recycle Bin</h2>
          <div className="space-y-4">
            <div className="aero-glass rounded-lg p-4 cursor-pointer hover:bg-white/10 transition-colors"
                 onClick={() => onOpenWindow("text-editor")}>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium">hopesanddreams.txt</div>
                  <div className="text-sm text-white/60">Text Document</div>
                </div>
              </div>
            </div>
            <div className="text-center text-white/60 mt-8">
              <Trash2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Empty your hopes and dreams here</p>
            </div>
          </div>
        </div>
      )

    case "text-editor":
      return (
        <div className="text-white h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">hopesanddreams.txt</h2>
            <div className="text-sm text-white/60">Notepad</div>
          </div>
          <div className="flex-1 bg-white/10 rounded-lg p-4 font-mono text-sm overflow-auto">
            <textarea
              className="w-full h-full bg-transparent text-white/80 leading-relaxed resize-none border-none outline-none font-mono text-sm"
              placeholder="Just kidding, but had you going."
              defaultValue="Just kidding, but had you going."
              style={{ minHeight: '300px' }}
            />
          </div>
        </div>
      )

    case "ipodfiller":
      return (
        <div className="text-white">
          <h2 className="text-3xl font-bold vista-text-gradient mb-6">ipodfiller App</h2>
          <img
            src="/images/ipodfiller-screenshot.png"
            alt="ipodfiller app screenshot"
            className="w-full max-w-lg mx-auto rounded-lg shadow-lg mb-6 border border-white/10"
          />
          <div className="space-y-6">
            <div className="aero-glass rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">More Information Coming Soon</h3>
              <p className="text-white/80 mb-4">
                A modern desktop app to download and organize music from public Spotify playlists, 
                with full metadata, for use on classic iPods and other devices.
              </p>
              <a 
                href="https://github.com/ovonmizener/ipodfiller" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 transition-colors border border-blue-400"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </div>
            <div className="text-center text-white/60">
              <Monitor className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Desktop application for music management</p>
            </div>
          </div>
        </div>
      )

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
  const [openWindows, setOpenWindows] = useState<DesktopWindowState[]>([])
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
  const [isFirstVisit, setIsFirstVisit] = useState(true)
  // Add state for window size at the top of VistaDesktop
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 900 });
  
  // Welcome window state
  const [welcomeMinimized, setWelcomeMinimized] = useState(false)
  const [welcomeFullScreen, setWelcomeFullScreen] = useState(false)
  const [welcomePosition, setWelcomePosition] = useState({ x: 0, y: 0 })
  const [welcomeLastPosition, setWelcomeLastPosition] = useState<{ x: number; y: number } | null>(null)
  const [welcomeSize, setWelcomeSize] = useState({ width: 700, height: 500 })

  // Sound refs
  const clickSoundRef = useRef<HTMLAudioElement | null>(null)
  const shutdownSoundRef = useRef<HTMLAudioElement | null>(null)

  // Konami code detection
  const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"]
  const [konamiIndex, setKonamiIndex] = useState(0)

  // Check for existing visit cookie on component mount
  useEffect(() => {
    const hasVisited = Cookies.get('hasVisited')
    if (hasVisited) {
      setIsFirstVisit(false)
    } else {
      // Set cookie for first visit (expires in 1 year)
      Cookies.set('hasVisited', 'true', { expires: 365 })
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) {
        setKonamiIndex((prev) => {
          const newIndex = prev + 1
          if (newIndex === konamiCode.length) {
            // Check if the secret window is already open
            if (!openWindows.some(window => window.id === "secret-dev-log")) {
              openWindow("secret-dev-log")
            }
            return 0
          }
          return newIndex
        })
      } else {
        setKonamiIndex(0)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [konamiIndex, openWindows])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Load sound effects
  useEffect(() => {
    clickSoundRef.current = new Audio("/sounds/click.mp3")
    shutdownSoundRef.current = new Audio("/sounds/shutdown.mp3")
  }, [])

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const openWindow = (windowId: string) => {
    console.log("Opening window:", windowId)
    setShowWelcome(false)
    // Play click sound
    clickSoundRef.current?.play().catch(e => console.error("Error playing click sound:", e))

    // Check if window is already open but minimized
    const existingWindow = openWindows.find((w: DesktopWindowState) => w.id === windowId)
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

    // Prevent opening a duplicate window
    if (openWindows.some((window: DesktopWindowState) => window.id === windowId)) {
      return
    }

    // Calculate position to ensure window stays within screen bounds
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight - 80 // Account for taskbar at top

    // For the game window, use a large square size
    const isGameWindow = windowId === "flappy-bird-game"
    const isTextEditor = windowId === "text-editor"
    const maxSquare = Math.min(window.innerWidth, window.innerHeight - 80, 1000)
    const initialWindowWidth = isGameWindow ? maxSquare : isTextEditor ? 500 : 800
    const initialWindowHeight = isGameWindow ? maxSquare : isTextEditor ? 400 : 600

    // Ensure square window for the game
    const windowWidth = isGameWindow ? maxSquare : initialWindowWidth
    const windowHeight = isGameWindow ? maxSquare : initialWindowHeight

    const baseX = 100 + openWindows.length * 50
    const baseY = 100 + openWindows.length * 50 + 80 // Add offset for top taskbar

    // Ensure window doesn't go off screen
    const x = Math.min(baseX, screenWidth - windowWidth - 50)
    const y = Math.min(baseY, screenHeight - 80 - windowHeight - 50)

    // Create new window
    const newWindow: DesktopWindowState = {
      id: windowId,
      x: Math.max(50, x), // Minimum 50px from left edge
      y: Math.max(80, y), // Minimum 80px from top edge (below taskbar)
      zIndex: nextZIndex,
      isMinimized: false,
      isFullScreen: false,
      width: windowWidth,
      height: windowHeight,
    }

    console.log("Creating new window:", newWindow)
    setOpenWindows((prev) => [...prev, newWindow])
    setActiveWindow(windowId)
    setNextZIndex((prev) => prev + 1)
  }

  const closeWindow = (windowId: string) => {
    setOpenWindows(openWindows.filter((w: DesktopWindowState) => w.id !== windowId))
    if (activeWindow === windowId) {
      const remainingWindows = openWindows.filter((w: DesktopWindowState) => w.id !== windowId && !w.isMinimized)
      setActiveWindow(remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1].id : null)
    }
  }

  const minimizeWindow = (windowId: string) => {
    setOpenWindows((windows: DesktopWindowState[]) => windows.map((w) => (w.id === windowId ? { ...w, isMinimized: true } : w)))
    if (activeWindow === windowId) {
      const remainingWindows = openWindows.filter((w: DesktopWindowState) => w.id !== windowId && !w.isMinimized)
      setActiveWindow(remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1].id : null)
    }
  }

  const updateWindowPosition = (windowId: string, x: number, y: number) => {
    setOpenWindows((windows: DesktopWindowState[]) => windows.map((w) => (w.id === windowId ? { ...w, x, y } : w)))
  }

  const updateWindowSize = (windowId: string, width: number, height: number) => {
    setOpenWindows((windows: DesktopWindowState[]) => windows.map((w) => (w.id === windowId ? { ...w, width, height } : w)))
  }

  const bringWindowToFront = (windowId: string) => {
    const win = openWindows.find((w: DesktopWindowState) => w.id === windowId)
    if (win?.isMinimized) {
      // Restore from minimized state
      setOpenWindows((windows: DesktopWindowState[]) =>
        windows.map((w) => (w.id === windowId ? { ...w, isMinimized: false, zIndex: nextZIndex } : w)),
      )
    } else {
      // Bring to front
      setOpenWindows((windows: DesktopWindowState[]) => windows.map((w) => (w.id === windowId ? { ...w, zIndex: nextZIndex } : w)))
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
    // Play shutdown sound
    shutdownSoundRef.current?.play().catch(e => console.error("Error playing shutdown sound:", e))

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
          if (!w.isFullScreen) {
            // Going full screen: store current position
            setNextZIndex((prev) => prev + 1)
            return {
              ...w,
              isFullScreen: true,
              zIndex: nextZIndex,
              lastPosition: { x: w.x, y: w.y },
              x: 0, // Optionally reset x/y to 0 for full screen
              y: 0,
            }
          } else {
            // Exiting full screen: restore last position
            return {
              ...w,
              isFullScreen: false,
              x: w.lastPosition?.x ?? w.x,
              y: w.lastPosition?.y ?? w.y,
              lastPosition: undefined,
            }
          }
        }
        return w
      })
    )
  }

  const desktopStyle = {
    background: currentWallpaper.backgroundImage,
    backgroundSize: currentWallpaper.backgroundSize,
    backgroundPosition: currentWallpaper.backgroundPosition,
    animation: "vistaGradient 15s ease infinite",
  }

  const windows = [
    {
      id: "welcome",
      title: "Welcome",
      content: <WindowContent windowId="welcome" onWallpaperChange={setSelectedWallpaper} wallpapers={wallpapers} onOpenWindow={setActiveWindow} isFirstVisit={isFirstVisit} />,
      isMinimized: false,
      isMaximized: false,
      position: { x: 100, y: 100 },
      size: { width: 600, height: 400 },
    },
    {
      id: "about",
      title: "About Me",
      content: <WindowContent windowId="about" onWallpaperChange={setSelectedWallpaper} wallpapers={wallpapers} onOpenWindow={setActiveWindow} isFirstVisit={isFirstVisit} />,
      isMinimized: false,
      isMaximized: false,
      position: { x: 150, y: 150 },
      size: { width: 800, height: 600 },
    },
    {
      id: "projects",
      title: "Projects",
      content: <WindowContent windowId="projects" onWallpaperChange={setSelectedWallpaper} wallpapers={wallpapers} onOpenWindow={setActiveWindow} isFirstVisit={isFirstVisit} />,
      isMinimized: false,
      isMaximized: false,
      position: { x: 200, y: 200 },
      size: { width: 800, height: 600 },
    },
    {
      id: "gallery",
      title: "Gallery",
      content: <WindowContent windowId="gallery" onWallpaperChange={setSelectedWallpaper} wallpapers={wallpapers} onOpenWindow={setActiveWindow} selectedImage={selectedImage} setSelectedImage={setSelectedImage} isFirstVisit={isFirstVisit} />,
      isMinimized: false,
      isMaximized: false,
      position: { x: 250, y: 250 },
      size: { width: 800, height: 600 },
    },
    {
      id: "contact",
      title: "Contact",
      content: <WindowContent windowId="contact" onWallpaperChange={setSelectedWallpaper} wallpapers={wallpapers} onOpenWindow={setActiveWindow} isFirstVisit={isFirstVisit} />,
      isMinimized: false,
      isMaximized: false,
      position: { x: 300, y: 300 },
      size: { width: 600, height: 400 },
    },
    {
      id: "flappy-bird-game",
      title: "🎮 Jetpack Escape",
      content: (
        <div className="h-full">
          <WindowContent 
            windowId="flappy-bird-game" 
            onWallpaperChange={changeWallpaper} 
            wallpapers={wallpapers}
            onOpenWindow={openWindow}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            isFirstVisit={isFirstVisit}
          />
        </div>
      ),
      isMinimized: false,
      isMaximized: false,
      position: { x: 350, y: 350 },
      size: { width: Math.min(1200, windowSize.width - 100), height: Math.min(900, windowSize.height - 180) },
    },
  ]

  // Handler to open the wallpapers window
  const handleOpenWallpapers = () => {
    openWindow('wallpapers');
  };

  // Welcome window handlers
  const handleWelcomeMinimize = () => {
    setWelcomeMinimized(true)
    setShowWelcome(false)
  }

  const handleWelcomeFullScreen = () => {
    if (!welcomeFullScreen) {
      // Going fullscreen: store current position
      setWelcomeLastPosition(welcomePosition)
      setWelcomeFullScreen(true)
      setWelcomePosition({ x: 0, y: 0 })
    } else {
      // Exiting fullscreen: restore last position
      setWelcomeFullScreen(false)
      if (welcomeLastPosition) {
        setWelcomePosition(welcomeLastPosition)
        setWelcomeLastPosition(null)
      }
    }
  }

  const handleWelcomeRestore = () => {
    setWelcomeMinimized(false)
    setShowWelcome(true)
  }

  const handleWelcomeMove = (x: number, y: number) => {
    setWelcomePosition({ x, y })
  }

  const handleWelcomeResize = (width: number, height: number) => {
    setWelcomeSize({ width, height })
  }

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
        <div className="grid grid-cols-2 gap-0 mt-24" style={{ maxWidth: "400px", minHeight: "calc(100vh - 200px)", columnGap: "8px" }}>
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
        {showWelcome && !welcomeMinimized && openWindows.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="absolute"
            style={
              welcomeFullScreen
                ? { zIndex: 1000, left: 0, top: 0, width: '100vw', height: '100vh' }
                : { 
                    zIndex: 1000, 
                    left: welcomePosition.x || '50%', 
                    top: welcomePosition.y || '50%', 
                    transform: welcomePosition.x ? 'none' : 'translate(-50%, -50%)'
                  }
            }
          >
            <VistaWindow
              title={isFirstVisit ? "Welcome" : "Welcome Back"}
              onClose={() => setShowWelcome(false)}
              onMinimize={handleWelcomeMinimize}
              onFullScreen={handleWelcomeFullScreen}
              isActive={true}
              width={welcomeFullScreen ? windowSize.width : welcomeSize.width}
              height={welcomeFullScreen ? windowSize.height : welcomeSize.height}
              isDraggable={!welcomeFullScreen}
              isFullScreen={welcomeFullScreen}
              onMove={handleWelcomeMove}
              onResize={handleWelcomeResize}
              initialX={welcomePosition.x}
              initialY={welcomePosition.y}
            >
              <div className="p-8 text-center">
                <motion.div
                  className="mb-6"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Monitor className="w-24 h-24 mx-auto text-blue-400" />
                </motion.div>

                {isFirstVisit ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <p className="text-lg text-white/80 mb-8 leading-relaxed">
                      Welcome back! It's great to see you again. Feel free to explore my latest updates, check out new projects, or just browse around. What would you like to see today?
                    </p>

                    <div className="flex gap-4 justify-center">
                      <VistaOrb onClick={() => openWindow("about")} className="vista-gradient-blue px-4 py-2">
                        <User className="w-6 h-6" />
                        <span className="ml-2">About Me</span>
                      </VistaOrb>

                      <VistaOrb onClick={() => openWindow("projects")} className="vista-gradient-green px-4 py-2">
                        <Briefcase className="w-6 h-6" />
                        <span className="ml-2">My Projects</span>
                      </VistaOrb>

                      <VistaOrb onClick={() => openWindow("contact")} className="vista-gradient-purple px-4 py-2">
                        <Mail className="w-6 h-6" />
                        <span className="ml-2">Contact</span>
                      </VistaOrb>
                    </div>
                  </>
                )}
              </div>
            </VistaWindow>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Open Windows */}
      <AnimatePresence>
        {openWindows
          .filter((win: DesktopWindowState) => !win.isMinimized)
          .map((win: DesktopWindowState) => (
            <motion.div
              key={win.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute"
              style={
                win.isFullScreen
                  ? { zIndex: win.zIndex }
                  : { left: win.x, top: win.y, zIndex: win.zIndex }
              }
            >
              <VistaWindow
                title={
                  win.id === "welcome" 
                    ? (isFirstVisit ? "Welcome" : "Welcome Back")
                    : desktopIcons.find((icon) => icon.id === win.id)?.name || win.id
                }
                onClose={() => closeWindow(win.id)}
                onMinimize={() => minimizeWindow(win.id)}
                onFullScreen={() => toggleFullScreen(win.id)}
                isActive={activeWindow === win.id}
                onClick={() => bringWindowToFront(win.id)}
                onMove={(x, y) => updateWindowPosition(win.id, x, y)}
                onResize={(width: number, height: number) => updateWindowSize(win.id, width, height)}
                width={win.isFullScreen ? windowSize.width : win.width}
                height={win.isFullScreen ? windowSize.height : win.height}
                isDraggable={!win.isFullScreen}
                isFullScreen={win.isFullScreen}
                initialX={win.x}
                initialY={win.y}
              >
                <div className={win.id === "flappy-bird-game" ? "h-full" : "p-8"}>
                  <WindowContent 
                    windowId={win.id} 
                    onWallpaperChange={changeWallpaper} 
                    wallpapers={wallpapers}
                    onOpenWindow={openWindow}
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    isFirstVisit={isFirstVisit}
                  />
                </div>
              </VistaWindow>
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Taskbar - Now at top */}
      <VistaTaskbar
        openWindows={[
          ...openWindows.map((w) => w.id),
          ...(welcomeMinimized ? ["welcome"] : [])
        ]}
        minimizedWindows={[
          ...openWindows.filter((w) => w.isMinimized).map((w) => w.id),
          ...(welcomeMinimized ? ["welcome"] : [])
        ]}
        activeWindow={activeWindow}
        onWindowClick={(windowId) => {
          if (windowId === "welcome") {
            handleWelcomeRestore()
          } else {
            bringWindowToFront(windowId)
          }
        }}
        currentTime={currentTime}
        onSearch={handleSearch}
        onPowerMenu={handlePowerMenu}
        showSearch={showSearch}
        showPowerMenu={showPowerMenu}
        onPowerAction={handlePowerAction}
        onOpenWallpapers={handleOpenWallpapers}
        openWindow={openWindow}
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
