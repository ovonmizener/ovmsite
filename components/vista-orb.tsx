"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface VistaOrbProps {
  children: ReactNode
  onClick?: () => void
  className?: string
}

export default function VistaOrb({ children, onClick, className = "" }: VistaOrbProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`vista-orb rounded-full flex items-center justify-center text-white font-medium ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.button>
  )
}
