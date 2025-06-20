"use client"

import { motion } from "framer-motion"
import { X, Minus, Square } from "lucide-react"
import type { ReactNode } from "react"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

interface VistaWindowProps {
  title: string
  children: ReactNode
  onClose: () => void
  onMinimize?: () => void
  onFullScreen?: () => void
  isActive?: boolean
  onClick?: () => void
  onMove?: (x: number, y: number) => void
  onResize?: (width: number, height: number) => void
  width?: number
  height?: number
  isDraggable?: boolean
  isFullScreen?: boolean
  initialX?: number
  initialY?: number
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
  onResize,
  width = 800,
  height = 600,
  isDraggable = true,
  isFullScreen = false,
  initialX,
  initialY,
}: VistaWindowProps) {
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState<string>('')
  const [startResizePos, setStartResizePos] = useState({ x: 0, y: 0 })
  const [startResizeSize, setStartResizeSize] = useState({ width: 0, height: 0 })
  const [startResizeWindowPos, setStartResizeWindowPos] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(isMobileDevice)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleResizeStart = (direction: string, e: React.MouseEvent) => {
    if (isFullScreen || !onResize) return
    e.stopPropagation()
    setIsResizing(true)
    setResizeDirection(direction)
    setStartResizePos({ x: e.clientX, y: e.clientY })
    setStartResizeSize({ width, height })
    setStartResizeWindowPos({ x: initialX || 0, y: initialY || 0 })
  }

  const handleResizeMove = (e: MouseEvent) => {
    if (!isResizing || !onResize) return
    
    const deltaX = e.clientX - startResizePos.x
    const deltaY = e.clientY - startResizePos.y
    
    let newWidth = startResizeSize.width
    let newHeight = startResizeSize.height
    let newX = startResizeWindowPos.x
    let newY = startResizeWindowPos.y
    
    // Minimum size constraints
    const minWidth = 300
    const minHeight = 200
    
    if (resizeDirection.includes('e')) {
      newWidth = Math.max(minWidth, startResizeSize.width + deltaX)
    }
    if (resizeDirection.includes('w')) {
      const oldWidth = startResizeSize.width
      newWidth = Math.max(minWidth, startResizeSize.width - deltaX)
      const widthChange = oldWidth - newWidth
      newX = startResizeWindowPos.x + widthChange
    }
    if (resizeDirection.includes('s')) {
      newHeight = Math.max(minHeight, startResizeSize.height + deltaY)
    }
    if (resizeDirection.includes('n')) {
      const oldHeight = startResizeSize.height
      newHeight = Math.max(minHeight, startResizeSize.height - deltaY)
      const heightChange = oldHeight - newHeight
      newY = startResizeWindowPos.y + heightChange
    }
    
    onResize(newWidth, newHeight)
    
    // Update position if resizing from left or top
    if ((resizeDirection.includes('w') || resizeDirection.includes('n')) && onMove) {
      onMove(newX, newY)
    }
  }

  const handleResizeEnd = () => {
    setIsResizing(false)
    setResizeDirection('')
  }

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResizeMove)
      window.addEventListener('mouseup', handleResizeEnd)
      return () => {
        window.removeEventListener('mousemove', handleResizeMove)
        window.removeEventListener('mouseup', handleResizeEnd)
      }
    }
  }, [isResizing, resizeDirection, startResizePos, startResizeSize, onResize])

  // Portal logic for full screen
  const windowContent = (
    <motion.div
      className={`vista-window ${isActive ? "vista-glow-blue" : ""} ${isFullScreen ? "fixed" : ""} relative`}
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
      drag={isDraggable && !isFullScreen && !isResizing && !isMobile}
      dragMomentum={false}
      dragElastic={0}
      onDrag={(event, info) => {
        if (onMove && isDraggable && !isFullScreen && !isResizing && !isMobile) {
          onMove(info.point.x - width / 2, info.point.y - height / 2)
        }
      }}
      whileHover={isDraggable && !isFullScreen && !isMobile ? { scale: 1.01 } : {}}
      transition={{ duration: 0.2 }}
    >
      {/* Resize Handles - Disabled on mobile */}
      {!isFullScreen && onResize && !isMobile && (
        <>
          {/* Corner handles */}
          <div 
            className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize z-10"
            onMouseDown={(e) => handleResizeStart('nw', e)}
          />
          <div 
            className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize z-10"
            onMouseDown={(e) => handleResizeStart('ne', e)}
          />
          <div 
            className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize z-10"
            onMouseDown={(e) => handleResizeStart('sw', e)}
          />
          <div 
            className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize z-10"
            onMouseDown={(e) => handleResizeStart('se', e)}
          />
          
          {/* Edge handles */}
          <div 
            className="absolute top-0 left-3 right-3 h-1 cursor-n-resize z-10"
            onMouseDown={(e) => handleResizeStart('n', e)}
          />
          <div 
            className="absolute bottom-0 left-3 right-3 h-1 cursor-s-resize z-10"
            onMouseDown={(e) => handleResizeStart('s', e)}
          />
          <div 
            className="absolute left-0 top-3 bottom-3 w-1 cursor-w-resize z-10"
            onMouseDown={(e) => handleResizeStart('w', e)}
          />
          <div 
            className="absolute right-0 top-3 bottom-3 w-1 cursor-e-resize z-10"
            onMouseDown={(e) => handleResizeStart('e', e)}
          />
        </>
      )}

      {/* Title Bar */}
      <div 
        className={`flex items-center justify-between border-b border-white/20 flex-shrink-0 ${isMobile ? 'p-3' : 'p-4'}`}
        style={{
          position: isFullScreen ? "absolute" : "relative",
          top: isFullScreen ? 0 : undefined,
          left: isFullScreen ? 0 : undefined,
          right: isFullScreen ? 0 : undefined,
          zIndex: isFullScreen ? 10000 : undefined,
          backgroundColor: isFullScreen ? "rgba(0, 0, 0, 0.8)" : undefined,
          backdropFilter: isFullScreen ? "blur(8px)" : undefined,
          cursor: isMobile ? "default" : "move"
        }}
      >
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 rounded-full vista-gradient-blue vista-reflection"></div>
          <h3 className={`font-semibold text-white vista-text-glow ${isMobile ? 'text-sm' : ''}`}>{title}</h3>
        </div>

        <div className="flex items-center space-x-2">
          <button
            className={`${isMobile ? 'w-8 h-8' : 'w-6 h-6'} rounded-full bg-yellow-400/80 hover:bg-yellow-400 transition-colors flex items-center justify-center cursor-pointer`}
            onClick={(e) => {
              e.stopPropagation()
              onMinimize?.()
            }}
          >
            <Minus className={`${isMobile ? 'w-4 h-4' : 'w-3 h-3'} text-yellow-900`} />
          </button>
          <button 
            className={`${isMobile ? 'w-8 h-8' : 'w-6 h-6'} rounded-full bg-green-400/80 hover:bg-green-400 transition-colors flex items-center justify-center cursor-pointer`}
            onClick={(e) => {
              e.stopPropagation()
              if (!isFullScreen && onMove) {
                onMove(0, 0)
              }
              onFullScreen?.()
            }}
          >
            <Square className={`${isMobile ? 'w-4 h-4' : 'w-3 h-3'} text-green-900`} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className={`${isMobile ? 'w-8 h-8' : 'w-6 h-6'} rounded-full bg-red-400/80 hover:bg-red-400 transition-colors flex items-center justify-center cursor-pointer`}
          >
            <X className={`${isMobile ? 'w-4 h-4' : 'w-3 h-3'} text-red-900`} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div 
        className="flex-1 cursor-default overflow-auto"
        onClick={(e) => e.stopPropagation()}
        style={{
          marginTop: isFullScreen ? "56px" : undefined,
          height: isFullScreen ? "calc(100% - 56px)" : "calc(100% - 56px)",
          overflow: "auto",
          padding: 0,
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
