"use client"

import React, { useState } from 'react'
import { Folder, FileText, Image as ImageIcon, File, Code, Video, Music, Archive, FileX, ChevronRight, ChevronDown, Presentation, Table } from 'lucide-react'
import Image from 'next/image'

interface FileItem {
  id: string
  name: string
  type: 'text' | 'image' | 'code' | 'video' | 'audio' | 'archive' | 'spreadsheet' | 'presentation' | 'pdf' | 'unknown'
  content?: string
  imageSrc?: string
  size?: string
  modified?: string
}

interface FileType {
  id: string
  name: string
  icon: React.ComponentType<any>
  color: string
  files: FileItem[]
}

const SampleWindow: React.FC = () => {
  const [selectedFileType, setSelectedFileType] = useState<string>('all')
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['all']))

  const fileTypes: FileType[] = [
    {
      id: 'all',
      name: 'All Projects',
      icon: Folder,
      color: 'text-blue-400',
      files: [
        {
          id: 'music-sentiment',
          name: 'Sonic Sentiments – Music Sentiment Analyzer',
          type: 'text',
          content: `# Sonic Sentiments – Music Sentiment Analyzer

## Project Overview
For my data analytics bootcamp capstone, I built Sonic Sentiments, a web app that analyzes song lyrics for sentiment and genre. Using a Spotify dataset, I cleaned and preprocessed data, applied NLP techniques with TextBlob and TF-IDF, and trained models like logistic regression and Random Forest to predict sentiment and musical features.

## What I Built & Learned
I developed the data pipeline in Python, handled NLP and model training with scikit-learn, and created a Flask backend with a user-friendly Dash dashboard to visualize trends and user inputs. The project combined data cleaning, modeling, and deployment into a seamless app.

## Real-World Application
This experience reflects the full data analytics workflow, from raw data to interactive insights, applicable to customer feedback analysis, internal tools, or any project needing clear, data-driven storytelling.

## GitHub Repository
https://github.com/ovonmizener/project4-databootcamp`,
          size: '3.2 KB',
          modified: '2024-01-15'
        },
        {
          id: 'ipodfiller',
          name: 'ipodfiller App',
          type: 'text',
          content: `# ipodfiller App

## Project Description
A modern desktop app to download and organize music from public Spotify playlists, with full metadata, for use on classic iPods and other devices.

## Features
- Download music from public Spotify playlists
- Full metadata preservation
- Classic iPod compatibility
- Desktop application interface
- Music organization tools

## Technology Stack
- Desktop application framework
- Spotify API integration
- Music file processing
- Metadata management

## GitHub Repository
https://github.com/ovonmizener/ipodfiller

## Status
More information coming soon!`,
          size: '2.8 KB',
          modified: '2024-01-14'
        },
        {
          id: 'python-game',
          name: 'Python Game - Jetpack Escape',
          type: 'text',
          content: `# Python Game - Jetpack Escape

## Project Description
Just for fun, I started making a "Flappy Bird" style game in Python. It's themed after popular streamer Raora, and her character Chattino. I'm just doing this for the experience, I may never finish it, but I wanted a repository available so I can share with friends. Feel free to take/use/modify this however you want.

## Game Features
- Flappy Bird style gameplay
- Themed after streamer Raora and character Chattino
- Python-based implementation
- Open source and modifiable

## How to Play
• SPACE: Jump / Double Jump
• ESC: Return to Menu
• Mouse: Navigate Menus
• Choose between Traditional and Continuous modes

## GitHub Repository
https://github.com/ovonmizener/chattinogame

## Play Game
The game is available to play directly in the browser through the original project window.`,
          size: '2.1 KB',
          modified: '2024-01-13'
        },
        {
          id: 'portfolio',
          name: 'This Website – Portfolio Project',
          type: 'text',
          content: `# This Website – Portfolio Project

## Ethos & Inspiration
This site is a love letter to the **Frutiger Aero** aesthetic—think glassy surfaces, playful gradients, and a sense of digital optimism. I wanted to create a portfolio that felt like a desktop OS from a parallel universe: interactive, fun, and a little nostalgic, but with modern web tech under the hood.

## Tech Stack
- **Next.js** (App Router, SSR, API routes)
- **React** (component-driven UI)
- **Tailwind CSS** (utility-first styling, custom themes)
- **Framer Motion** (animations, drag & drop)
- **TypeScript** (type safety everywhere)
- **Prisma** (future-proofed for backend/data)

## Features
- Draggable, resizable windows (like a real OS)
- Animated taskbar, start orb, and desktop icons
- Vista/Aero glass effects and gradients
- Interactive project windows
- Responsive design with mobile considerations
- Boot animation and welcome screen
- Konami code easter egg

## Design Philosophy
The goal was to create something that feels both nostalgic and modern, combining the playful optimism of Windows Vista's design language with contemporary web development practices. Every interaction should feel smooth and delightful, just like using a well-designed operating system.

## Development Notes
This project showcases my ability to blend different design paradigms and create cohesive, interactive experiences. The Vista aesthetic isn't just visual—it's functional, with windows that behave like real desktop applications.`,
          size: '2.1 KB',
          modified: '2024-01-12'
        },
        {
          id: 'joypop',
          name: 'JoyPop Boba Cafe',
          type: 'text',
          content: `# JoyPop Boba Cafe

## About JoyPop Boba Cafe
I started JoyPop out of a love for community and boba culture. What began with a quirky little Suzuki JoyPop Every van has since grown into a full-service boba cafe and mobile catering business. I wanted to build something that felt fun, high-quality, and a little unexpected—something that brought people together through great drinks and shared experiences. Now based in Mesa, Arizona, JoyPop continues to reflect that original spark of creativity and joy.

## Services: In-Store & Mobile
At our cafe, guests can enjoy handcrafted boba drinks in a cozy, welcoming space. We also specialize in mobile boba catering for events of all kinds—weddings, birthdays, corporate gatherings, and more. Our services are fully customizable, with options ranging from full-service boba bars to self-serve stations and bottled drinks. I also offer private tasting sessions to help clients craft the perfect signature drink for their event.

## Location & Contact
You can find JoyPop inside The Enclave Salon Suites at 4936 S Power Rd #120, Mesa, AZ 85212. For event bookings or questions, I'm always happy to connect—just reach out at (480) 420‑4758 or email me at oliver@joypop.jp.

## Business Details
- **Role**: Founder & Owner
- **Location**: Mesa, Arizona
- **Status**: Active
- **Founded**: 2023
- **Website**: https://joypop.jp/

## Contact Information
- **Phone**: (480) 420-4758
- **Email**: oliver@joypop.jp
- **Address**: 4936 S Power Rd #120, Mesa, AZ 85212`,
          size: '1.8 KB',
          modified: '2024-01-11'
        }
      ]
    },
    {
      id: 'text',
      name: 'Documentation',
      icon: FileText,
      color: 'text-green-400',
      files: [
        {
          id: 'music-sentiment',
          name: 'Sonic Sentiments – Music Sentiment Analyzer',
          type: 'text',
          content: `# Sonic Sentiments – Music Sentiment Analyzer

## Project Overview
For my data analytics bootcamp capstone, I built Sonic Sentiments, a web app that analyzes song lyrics for sentiment and genre. Using a Spotify dataset, I cleaned and preprocessed data, applied NLP techniques with TextBlob and TF-IDF, and trained models like logistic regression and Random Forest to predict sentiment and musical features.

## What I Built & Learned
I developed the data pipeline in Python, handled NLP and model training with scikit-learn, and created a Flask backend with a user-friendly Dash dashboard to visualize trends and user inputs. The project combined data cleaning, modeling, and deployment into a seamless app.

## Real-World Application
This experience reflects the full data analytics workflow, from raw data to interactive insights, applicable to customer feedback analysis, internal tools, or any project needing clear, data-driven storytelling.

## GitHub Repository
https://github.com/ovonmizener/project4-databootcamp`,
          size: '3.2 KB',
          modified: '2024-01-15'
        },
        {
          id: 'ipodfiller',
          name: 'ipodfiller App',
          type: 'text',
          content: `# ipodfiller App

## Project Description
A modern desktop app to download and organize music from public Spotify playlists, with full metadata, for use on classic iPods and other devices.

## Features
- Download music from public Spotify playlists
- Full metadata preservation
- Classic iPod compatibility
- Desktop application interface
- Music organization tools

## Technology Stack
- Desktop application framework
- Spotify API integration
- Music file processing
- Metadata management

## GitHub Repository
https://github.com/ovonmizener/ipodfiller

## Status
More information coming soon!`,
          size: '2.8 KB',
          modified: '2024-01-14'
        },
        {
          id: 'portfolio',
          name: 'This Website – Portfolio Project',
          type: 'text',
          content: `# This Website – Portfolio Project

## Ethos & Inspiration
This site is a love letter to the **Frutiger Aero** aesthetic—think glassy surfaces, playful gradients, and a sense of digital optimism. I wanted to create a portfolio that felt like a desktop OS from a parallel universe: interactive, fun, and a little nostalgic, but with modern web tech under the hood.

## Tech Stack
- **Next.js** (App Router, SSR, API routes)
- **React** (component-driven UI)
- **Tailwind CSS** (utility-first styling, custom themes)
- **Framer Motion** (animations, drag & drop)
- **TypeScript** (type safety everywhere)
- **Prisma** (future-proofed for backend/data)

## Features
- Draggable, resizable windows (like a real OS)
- Animated taskbar, start orb, and desktop icons
- Vista/Aero glass effects and gradients
- Interactive project windows
- Responsive design with mobile considerations
- Boot animation and welcome screen
- Konami code easter egg

## Design Philosophy
The goal was to create something that feels both nostalgic and modern, combining the playful optimism of Windows Vista's design language with contemporary web development practices. Every interaction should feel smooth and delightful, just like using a well-designed operating system.

## Development Notes
This project showcases my ability to blend different design paradigms and create cohesive, interactive experiences. The Vista aesthetic isn't just visual—it's functional, with windows that behave like real desktop applications.`,
          size: '2.1 KB',
          modified: '2024-01-12'
        },
        {
          id: 'joypop',
          name: 'JoyPop Boba Cafe',
          type: 'text',
          content: `# JoyPop Boba Cafe

## About JoyPop Boba Cafe
I started JoyPop out of a love for community and boba culture. What began with a quirky little Suzuki JoyPop Every van has since grown into a full-service boba cafe and mobile catering business. I wanted to build something that felt fun, high-quality, and a little unexpected—something that brought people together through great drinks and shared experiences. Now based in Mesa, Arizona, JoyPop continues to reflect that original spark of creativity and joy.

## Services: In-Store & Mobile
At our cafe, guests can enjoy handcrafted boba drinks in a cozy, welcoming space. We also specialize in mobile boba catering for events of all kinds—weddings, birthdays, corporate gatherings, and more. Our services are fully customizable, with options ranging from full-service boba bars to self-serve stations and bottled drinks. I also offer private tasting sessions to help clients craft the perfect signature drink for their event.

## Location & Contact
You can find JoyPop inside The Enclave Salon Suites at 4936 S Power Rd #120, Mesa, AZ 85212. For event bookings or questions, I'm always happy to connect—just reach out at (480) 420‑4758 or email me at oliver@joypop.jp.

## Business Details
- **Role**: Founder & Owner
- **Location**: Mesa, Arizona
- **Status**: Active
- **Founded**: 2023
- **Website**: https://joypop.jp/

## Contact Information
- **Phone**: (480) 420-4758
- **Email**: oliver@joypop.jp
- **Address**: 4936 S Power Rd #120, Mesa, AZ 85212`,
          size: '1.8 KB',
          modified: '2024-01-11'
        }
      ]
    },
    {
      id: 'code',
      name: 'Code Projects',
      icon: Code,
      color: 'text-yellow-400',
      files: [
        {
          id: 'python-game',
          name: 'Python Game - Jetpack Escape',
          type: 'text',
          content: `# Python Game - Jetpack Escape

## Project Description
Just for fun, I started making a "Flappy Bird" style game in Python. It's themed after popular streamer Raora, and her character Chattino. I'm just doing this for the experience, I may never finish it, but I wanted a repository available so I can share with friends. Feel free to take/use/modify this however you want.

## Game Features
- Flappy Bird style gameplay
- Themed after streamer Raora and character Chattino
- Python-based implementation
- Open source and modifiable

## How to Play
• SPACE: Jump / Double Jump
• ESC: Return to Menu
• Mouse: Navigate Menus
• Choose between Traditional and Continuous modes

## GitHub Repository
https://github.com/ovonmizener/chattinogame

## Play Game
The game is available to play directly in the browser through the original project window.`,
          size: '2.1 KB',
          modified: '2024-01-13'
        }
      ]
    },
    {
      id: 'image',
      name: 'Screenshots',
      icon: ImageIcon,
      color: 'text-purple-400',
      files: [
        {
          id: 'ipodfiller-screenshot',
          name: 'ipodfiller-screenshot.png',
          type: 'image',
          imageSrc: '/images/ipodfiller-screenshot.png',
          size: '156 KB',
          modified: '2024-01-14'
        }
      ]
    },
    {
      id: 'presentation',
      name: 'Business Projects',
      icon: Presentation,
      color: 'text-orange-400',
      files: [
        {
          id: 'joypop',
          name: 'JoyPop Boba Cafe',
          type: 'text',
          content: `# JoyPop Boba Cafe

## About JoyPop Boba Cafe
I started JoyPop out of a love for community and boba culture. What began with a quirky little Suzuki JoyPop Every van has since grown into a full-service boba cafe and mobile catering business. I wanted to build something that felt fun, high-quality, and a little unexpected—something that brought people together through great drinks and shared experiences. Now based in Mesa, Arizona, JoyPop continues to reflect that original spark of creativity and joy.

## Services: In-Store & Mobile
At our cafe, guests can enjoy handcrafted boba drinks in a cozy, welcoming space. We also specialize in mobile boba catering for events of all kinds—weddings, birthdays, corporate gatherings, and more. Our services are fully customizable, with options ranging from full-service boba bars to self-serve stations and bottled drinks. I also offer private tasting sessions to help clients craft the perfect signature drink for their event.

## Location & Contact
You can find JoyPop inside The Enclave Salon Suites at 4936 S Power Rd #120, Mesa, AZ 85212. For event bookings or questions, I'm always happy to connect—just reach out at (480) 420‑4758 or email me at oliver@joypop.jp.

## Business Details
- **Role**: Founder & Owner
- **Location**: Mesa, Arizona
- **Status**: Active
- **Founded**: 2023
- **Website**: https://joypop.jp/

## Contact Information
- **Phone**: (480) 420-4758
- **Email**: oliver@joypop.jp
- **Address**: 4936 S Power Rd #120, Mesa, AZ 85212`,
          size: '1.8 KB',
          modified: '2024-01-11'
        }
      ]
    }
  ]

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId)
    } else {
      newExpanded.add(folderId)
    }
    setExpandedFolders(newExpanded)
  }

  const currentFileType = fileTypes.find(ft => ft.id === selectedFileType) || fileTypes[0]
  const currentFiles = currentFileType.files

  const getFileIcon = (file: FileItem) => {
    const iconMap = {
      text: FileText,
      image: ImageIcon,
      code: Code,
      video: Video,
      audio: Music,
      archive: Archive,
      spreadsheet: Table,
      presentation: Presentation,
      pdf: FileX,
      unknown: FileX
    }
    const IconComponent = iconMap[file.type] || FileX
    const color = getFileColor(file)
    return <IconComponent className={`w-4 h-4 ${color}`} />
  }

  const getFileColor = (file: FileItem) => {
    const colorMap = {
      text: 'text-green-400',
      image: 'text-purple-400',
      code: 'text-yellow-400',
      video: 'text-red-400',
      audio: 'text-pink-400',
      archive: 'text-orange-400',
      spreadsheet: 'text-green-500',
      presentation: 'text-orange-400',
      pdf: 'text-red-500',
      unknown: 'text-gray-400'
    }
    return colorMap[file.type] || 'text-gray-400'
  }

  const renderFileContent = (file: FileItem) => {
    switch (file.type) {
      case 'text':
      case 'code':
      case 'spreadsheet':
      case 'presentation':
        return (
          <div className="bg-white/5 rounded-lg p-6 shadow-sm border border-white/10">
            <div className="prose prose-invert prose-sm max-w-none text-white/90">
              <div className="whitespace-pre-wrap font-sans leading-relaxed">
                {file.content}
              </div>
            </div>
          </div>
        )
      case 'image':
        return (
          <div className="bg-white/5 rounded-lg p-4 shadow-sm border border-white/10 flex items-center justify-center">
            {file.imageSrc ? (
              <div className="relative w-full h-full max-h-96">
                <Image
                  src={file.imageSrc}
                  alt={file.name}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            ) : (
              <div className="text-white/60">Image not available</div>
            )}
          </div>
        )
      default:
        return (
          <div className="bg-white/5 rounded-lg p-4 shadow-sm border border-white/10 flex items-center justify-center">
            <div className="text-white/60">Preview not available for this file type</div>
          </div>
        )
    }
  }

  return (
    <div className="w-full h-full flex bg-white/10 backdrop-blur-sm text-white/90 overflow-hidden aero-glass">
      {/* Sidebar */}
      <div className="w-64 bg-white/5 border-r border-white/20 flex flex-col">
        <div className="p-4 border-b border-white/20">
          <h3 className="text-white font-semibold text-lg vista-text-glow">Project Files</h3>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {fileTypes.map((fileType) => (
            <div key={fileType.id}>
              <button
                onClick={() => toggleFolder(fileType.id)}
                className={`w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/8 transition-all duration-200 ${
                  selectedFileType === fileType.id ? 'bg-white/12 border-r-2 border-blue-400/60 shadow-sm' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <fileType.icon className={`w-4 h-4 ${fileType.color}`} />
                  <span className="text-white/90 text-sm font-medium">{fileType.name}</span>
                </div>
                {expandedFolders.has(fileType.id) ? (
                  <ChevronDown className="w-4 h-4 text-white/70 transition-transform duration-200" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-white/70 transition-transform duration-200" />
                )}
              </button>
              {expandedFolders.has(fileType.id) && (
                <div className="ml-6 border-l border-white/10">
                  {fileType.files.map((file) => (
                    <button
                      key={file.id}
                      onClick={() => setSelectedFile(file)}
                      className={`w-full flex items-center space-x-3 px-4 py-2 hover:bg-white/6 transition-all duration-200 ${
                        selectedFile?.id === file.id ? 'bg-white/10 border-r border-blue-300/40 shadow-sm' : ''
                      }`}
                    >
                      {getFileIcon(file)}
                      <span className="text-white/75 text-xs truncate">{file.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedFile ? (
          <>
            {/* File Header */}
            <div className="p-4 border-b border-white/20">
              <div className="flex items-center space-x-2">
                {getFileIcon(selectedFile)}
                <div>
                  <h3 className="text-white font-semibold text-lg">{selectedFile.name}</h3>
                  <div className="flex items-center space-x-4 text-xs text-white/60">
                    <span>{selectedFile.size}</span>
                    <span>{selectedFile.modified}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* File Content */}
            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              <div className="prose prose-invert prose-sm max-w-none">
                {renderFileContent(selectedFile)}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-white/60">
            <div className="text-center">
              <File className="w-12 h-12 mx-auto mb-2 text-white/30" />
              <p>Select a file to view its content</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SampleWindow 