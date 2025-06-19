"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface DesktopIconProps {
  icon: LucideIcon
  label: string
  onClick: () => void
  onMove?: (deltaX: number, deltaY: number) => void
}

export default function DesktopIcon({ icon: Icon, label, onClick, onMove }: DesktopIconProps) {
  return (
    <motion.div
      className="flex flex-col items-center px-1 py-3 rounded-lg hover:bg-white/10 transition-colors group cursor-pointer select-none"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragEnd={(event, info) => {
        // Check if this was a drag or a click
        const dragDistance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2)

        if (dragDistance < 5) {
          // This was a click, not a drag
          onClick()
        } else if (onMove && dragDistance > 10) {
          // This was a significant drag
          onMove(info.offset.x, info.offset.y)
        }
      }}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onClick()
      }}
    >
      <div className="w-12 h-12 mb-2 vista-orb rounded-lg flex items-center justify-center vista-gradient-blue group-hover:vista-glow-blue">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <span className="text-white text-xs font-medium text-center vista-text-glow max-w-16 leading-tight">{label}</span>
    </motion.div>
  )
}
