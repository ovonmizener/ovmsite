import React from 'react'
import { motion } from 'framer-motion'

interface VistaOrbProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export const VistaOrb: React.FC<VistaOrbProps> = ({ children, onClick, className = '' }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center justify-center rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-colors ${className}`}
    >
      {children}
    </motion.button>
  )
} 