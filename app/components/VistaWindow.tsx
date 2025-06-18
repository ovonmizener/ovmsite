import React from 'react'
import { motion } from 'framer-motion'
import { X, Minus, Maximize2 } from 'lucide-react'

interface VistaWindowProps {
  title: string
  onClose: () => void
  onMinimize: () => void
  onFullScreen: () => void
  isActive: boolean
  isFullScreen: boolean
  onClick: () => void
  onMove: (x: number, y: number) => void
  width: number
  height: number
  isDraggable: boolean
  children: React.ReactNode
}

export const VistaWindow: React.FC<VistaWindowProps> = ({
  title,
  onClose,
  onMinimize,
  onFullScreen,
  isActive,
  isFullScreen,
  onClick,
  onMove,
  width,
  height,
  isDraggable,
  children
}) => {
  const [isDragging, setIsDragging] = React.useState(false)
  const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 })
  const windowRef = React.useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isDraggable) return
    setIsDragging(true)
    const rect = windowRef.current?.getBoundingClientRect()
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !isDraggable) return
    const x = e.clientX - dragOffset.x
    const y = e.clientY - dragOffset.y
    onMove(x, y)
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
      ref={windowRef}
      className={`bg-white/10 backdrop-blur-md rounded-lg shadow-lg overflow-hidden ${
        isActive ? 'ring-2 ring-blue-500' : ''
      }`}
      style={{
        width: isFullScreen ? '100%' : width,
        height: isFullScreen ? '100%' : height,
        cursor: isDraggable ? 'move' : 'default'
      }}
      onClick={onClick}
      onMouseDown={handleMouseDown}
    >
      {/* Title Bar */}
      <div className="bg-gradient-to-r from-blue-500/50 to-blue-600/50 p-2 flex items-center justify-between">
        <div className="text-white font-medium">{title}</div>
        <div className="flex items-center gap-2">
          <button
            onClick={onMinimize}
            className="p-1 hover:bg-white/20 rounded"
          >
            <Minus className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={onFullScreen}
            className="p-1 hover:bg-white/20 rounded"
          >
            <Maximize2 className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-red-500/50 rounded"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="p-4 h-[calc(100%-40px)] overflow-auto">
        {children}
      </div>
    </motion.div>
  )
} 