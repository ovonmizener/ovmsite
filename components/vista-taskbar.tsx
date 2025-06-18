"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Power } from "lucide-react"
import VistaOrb from "./vista-orb"

interface VistaTaskbarProps {
  openWindows: string[]
  minimizedWindows: string[]
  activeWindow: string | null
  onWindowClick: (windowId: string) => void
  currentTime: Date
  onSearch: () => void
  onPowerMenu: () => void
  showSearch: boolean
  showPowerMenu: boolean
  onPowerAction: (action: string) => void
}

export default function VistaTaskbar({
  openWindows,
  minimizedWindows,
  activeWindow,
  onWindowClick,
  currentTime,
  onSearch,
  onPowerMenu,
  showSearch,
  showPowerMenu,
  onPowerAction,
}: VistaTaskbarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const searchableContent = [
    { title: "About Me", content: "full-stack developer passionate creative", type: "page", id: "about" },
    {
      title: "Projects",
      content: "e-commerce platform task manager weather app portfolio",
      type: "page",
      id: "projects",
    },
    { title: "Contact", content: "get in touch send message email", type: "page", id: "contact" },
    { title: "Social Media", content: "linkedin twitter instagram youtube github discord", type: "page", id: "social" },
    { title: "Gallery", content: "images photos portfolio work", type: "page", id: "gallery" },
    { title: "Skills", content: "react nextjs typescript tailwind nodejs python", type: "content", id: "about" },
    { title: "Experience", content: "6 years technology frameworks databases", type: "content", id: "about" },
  ]

  const filteredResults = searchQuery
    ? searchableContent.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.content.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : []

  const powerOptions = [
    { name: "Sleep", desc: "Put computer to sleep", action: () => onPowerAction("sleep") },
    { name: "Restart", desc: "Restart the computer", action: () => onPowerAction("restart") },
    { name: "Shut Down", desc: "Turn off the computer", action: () => onPowerAction("shutdown") },
    { name: "Log Off", desc: "Log off current user", action: () => onPowerAction("logoff") },
  ]

  const handleSearchResultClick = (id: string) => {
    onWindowClick(id)
    onSearch() // Close the search menu
    setSearchQuery("") // Clear search
  }

  return (
    <div className="relative">
      {/* Overlay to close menus */}
      {(showSearch || showPowerMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            if (showSearch) onSearch()
            if (showPowerMenu) onPowerMenu()
          }}
        />
      )}

      {/* Search Menu */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-full left-4 mt-2 z-50 w-96 vista-window"
          >
            <div className="p-4">
              <div className="flex items-center mb-4">
                <Search className="w-5 h-5 text-white mr-2" />
                <span className="text-white font-semibold">Search Portfolio</span>
              </div>

              <input
                type="text"
                placeholder="Search for content, skills, projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
                autoFocus
              />

              {searchQuery && (
                <div className="max-h-64 overflow-y-auto">
                  {filteredResults.length > 0 ? (
                    <div className="space-y-2">
                      {filteredResults.map((result, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
                          onClick={() => handleSearchResultClick(result.id)}
                        >
                          <div className="text-white font-medium text-sm">{result.title}</div>
                          <div className="text-white/60 text-xs mt-1 capitalize">{result.type}</div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-white/60 text-sm text-center py-4">No results found for "{searchQuery}"</div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Power Menu */}
      <AnimatePresence>
        {showPowerMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute z-50 w-64 vista-window"
            style={{
              position: 'fixed',
              right: '1rem',
              top: '4rem'
            }}
          >
            <div className="p-4">
              <div className="flex items-center mb-4">
                <Power className="w-5 h-5 text-white mr-2" />
                <span className="text-white font-semibold">Power Options</span>
              </div>

              <div className="space-y-2">
                {powerOptions.map((option, index) => (
                  <motion.button
                    key={option.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="w-full text-left p-3 rounded-lg hover:bg-white/10 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      option.action()
                    }}
                  >
                    <div className="text-white text-sm font-medium">{option.name}</div>
                    <div className="text-white/60 text-xs mt-1">{option.desc}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Taskbar - Now at top */}
      <div className="fixed top-0 left-0 right-0 h-16 vista-taskbar flex items-center justify-between px-4 z-[5]">
        {/* Search Button */}
        <div className="flex items-center space-x-2">
          <VistaOrb className="w-10 h-10" onClick={onSearch}>
            <Search className="w-4 h-4" />
          </VistaOrb>
        </div>

        {/* Open Windows */}
        <div className="flex-1 flex items-center justify-center space-x-2 mx-4">
          {openWindows.map((windowId) => (
            <motion.button
              key={windowId}
              onClick={() => onWindowClick(windowId)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all relative ${
                activeWindow === windowId && !minimizedWindows.includes(windowId)
                  ? "aero-glass text-white vista-glow-blue"
                  : minimizedWindows.includes(windowId)
                    ? "bg-white/5 text-white/50 border border-white/20"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {windowId}
              {minimizedWindows.includes(windowId) && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full" />
              )}
            </motion.button>
          ))}
        </div>

        {/* System Tray - Time, Date, Power */}
        <div className="flex items-center space-x-4">
          <div className="text-white/80 text-sm font-medium">
            {currentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div className="text-white/60 text-xs">{currentTime.toLocaleDateString()}</div>
          <div className="relative">
            <VistaOrb className="w-8 h-8" onClick={onPowerMenu}>
              <Power className="w-3 h-3" />
            </VistaOrb>
          </div>
        </div>
      </div>
    </div>
  )
}
