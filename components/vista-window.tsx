"use client"

import { motion } from "framer-motion"
import { X, Minus, Square } from "lucide-react"
import type { ReactNode } from "react"
import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"

interface VistaWindowProps {
  title: string
  children: ReactNode
  onClose: () => void
  onMinimize: () => void
  onFullScreen?: () => void
  isActive?: boolean
  onClick?: () => void
  onMove?: (x: number, y: number) => void
  width?: number
  height?: number
  isDraggable?: boolean
  isFullScreen?: boolean
}

export default function VistaWindow({
  title,
  children,
  onClose,
  onMinimize,
  onFullScreen,
  isActive = true,
  onClick,
  onMove,
  width = 800,
  height = 600,
  isDraggable = true,
  isFullScreen = false,
}: VistaWindowProps) {
  // Portal logic for full screen
  const windowContent = (
    <motion.div
      className={`vista-window ${isActive ? "vista-glow-blue" : ""} ${isFullScreen ? "fixed" : "cursor-move"}`}
      style={{ 
        width: isFullScreen ? "100%" : width, 
        height: isFullScreen ? "calc(100% - 64px)" : height,
        display: "flex", 
        flexDirection: "column",
        position: isFullScreen ? "fixed" : "absolute",
        top: isFullScreen ? "64px" : undefined,
        left: isFullScreen ? 0 : undefined,
        zIndex: isFullScreen ? 9999 : undefined
      }}
      onClick={onClick}
      drag={isDraggable && !isFullScreen}
      dragMomentum={false}
      dragElastic={0}
      onDrag={(event, info) => {
        if (onMove && isDraggable && !isFullScreen) {
          onMove(info.point.x - width / 2, info.point.y - height / 2)
        }
      }}
      whileHover={isDraggable && !isFullScreen ? { scale: 1.01 } : {}}
      transition={{ duration: 0.2 }}
    >
      {/* Title Bar */}
      <div 
        className="flex items-center justify-between p-4 border-b border-white/20 flex-shrink-0 cursor-move"
        style={{
          position: isFullScreen ? "absolute" : "relative",
          top: isFullScreen ? 0 : undefined,
          left: isFullScreen ? 0 : undefined,
          right: isFullScreen ? 0 : undefined,
          zIndex: isFullScreen ? 10000 : undefined,
          backgroundColor: isFullScreen ? "rgba(0, 0, 0, 0.8)" : undefined,
          backdropFilter: isFullScreen ? "blur(8px)" : undefined
        }}
      >
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 rounded-full vista-gradient-blue vista-reflection"></div>
          <h3 className="font-semibold text-white vista-text-glow">{title}</h3>
        </div>

        <div className="flex items-center space-x-2">
          <button
            className="w-6 h-6 rounded-full bg-yellow-400/80 hover:bg-yellow-400 transition-colors flex items-center justify-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              onMinimize()
            }}
          >
            <Minus className="w-3 h-3 text-yellow-900" />
          </button>
          <button 
            className="w-6 h-6 rounded-full bg-green-400/80 hover:bg-green-400 transition-colors flex items-center justify-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              if (!isFullScreen && onMove) {
                onMove(0, 0)
              }
              onFullScreen?.()
            }}
          >
            <Square className="w-3 h-3 text-green-900" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="w-6 h-6 rounded-full bg-red-400/80 hover:bg-red-400 transition-colors flex items-center justify-center cursor-pointer"
          >
            <X className="w-3 h-3 text-red-900" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div 
        className="flex-1 overflow-auto cursor-default" 
        onClick={(e) => e.stopPropagation()}
        style={{
          marginTop: isFullScreen ? "56px" : undefined,
          height: isFullScreen ? "calc(100% - 56px)" : "100%",
          minHeight: "800px"
        }}
      >
        {children}
      </div>
    </motion.div>
  )

  if (isFullScreen && typeof window !== "undefined") {
    return createPortal(windowContent, document.body)
  }
  return windowContent
}
