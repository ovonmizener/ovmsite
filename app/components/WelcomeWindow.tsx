import React from 'react'
import { motion } from 'framer-motion'
import { Monitor, User, Briefcase } from 'lucide-react'
import { VistaOrb } from './VistaOrb'

interface WelcomeWindowProps {
  onClose: () => void
}

export const WelcomeWindow: React.FC<WelcomeWindowProps> = ({ onClose }) => {
  return (
    <div className="p-8 text-center">
      <motion.div
        className="mb-6"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      >
        <Monitor className="w-24 h-24 mx-auto text-blue-400" />
      </motion.div>

      <p className="text-lg text-white/80 mb-8 leading-relaxed">
        Welcome to my website and portfolio. Inspired by the Frutiger Aero aesthetic, here you can find a little more about me, my projects and get in touch. This site serves as my personal portfolio.
      </p>

      <div className="flex gap-4 justify-center">
        <VistaOrb onClick={() => {}} className="vista-gradient-blue px-4 py-2">
          <User className="w-6 h-6" />
          <span className="ml-2">Get Started</span>
        </VistaOrb>

        <VistaOrb onClick={() => {}} className="vista-gradient-green px-4 py-2">
          <Briefcase className="w-6 h-6" />
          <span className="ml-2">View Work</span>
        </VistaOrb>
      </div>
    </div>
  )
} 