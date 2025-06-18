"use client"

import { motion } from "framer-motion"
import { X, Minus, Square } from "lucide-react"
import type { ReactNode } from "react"

interface VistaWindowProps {
  title: string
  children: ReactNode
  onClose: () => void
  onMinimize: () => void
  isActive?: boolean
  onClick?: () => void
  onMove?: (x: number, y: number) => void
  width?: number
  height?: number
  isDraggable?: boolean
}

export default function VistaWindow({
  title,
  children,
  onClose,
  onMinimize,
  isActive = true,
  onClick,
  onMove,
  width = 800,
  height = 600,
  isDraggable = true,
}: VistaWindowProps) {
  return (
    <motion.div
      className={`vista-window ${isActive ? "vista-glow-blue" : ""} cursor-move`}
      style={{ width, height, display: "flex", flexDirection: "column" }}
      onClick={onClick}
      drag={isDraggable}
      dragMomentum={false}
      dragElastic={0}
      onDrag={(event, info) => {
        if (onMove && isDraggable) {
          onMove(info.point.x - width / 2, info.point.y - height / 2)
        }
      }}
      whileHover={isDraggable ? { scale: 1.01 } : {}}
      transition={{ duration: 0.2 }}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between p-4 border-b border-white/20 flex-shrink-0 cursor-move">
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
          <button className="w-6 h-6 rounded-full bg-green-400/80 hover:bg-green-400 transition-colors flex items-center justify-center cursor-pointer">
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
      <div className="flex-1 overflow-auto cursor-default" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </motion.div>
  )
}
