import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface DesktopIconProps {
  icon: string
  label: string
  onClick: () => void
  onMove: (deltaX: number, deltaY: number) => void
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  icon,
  label,
  onClick,
  onMove
}) => {
  const [isDragging, setIsDragging] = React.useState(false)
  const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 })
  const iconRef = React.useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    const rect = iconRef.current?.getBoundingClientRect()
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    const deltaX = e.clientX - dragOffset.x
    const deltaY = e.clientY - dragOffset.y
    onMove(deltaX, deltaY)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  return (
    <motion.div
      ref={iconRef}
      className="flex flex-col items-center gap-2 cursor-pointer select-none"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      onMouseDown={handleMouseDown}
    >
      <div className="w-16 h-16 relative">
        <Image
          src={icon}
          alt={label}
          fill
          className="object-contain"
        />
      </div>
      <span className="text-white text-sm text-center max-w-[100px] break-words">
        {label}
      </span>
    </motion.div>
  )
} 