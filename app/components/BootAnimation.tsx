"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Orbit } from "lucide-react"

// This component is now purely visual. Its lifecycle is managed by the parent.
export default function BootAnimation() {
  const bootSoundRef = useRef<HTMLAudioElement | null>(null)

  // Load and play sound effect
  useEffect(() => {
    bootSoundRef.current = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT")
    bootSoundRef.current.volume = 0.3
    bootSoundRef.current?.play().catch(e => console.log("Boot sound not available or user hasn't interacted yet."))
  }, [])

  const LightBeam = ({ delay }: { delay: number }) => (
    <motion.div
      className="absolute top-0 w-16 h-full bg-white/20"
      style={{
        left: "-4rem", // Start off-screen
        filter: 'blur(5px)',
      }}
      animate={{
        x: [0, 800], // Moves across a ~600px wide bar
      }}
      transition={{
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
        delay,
      }}
    />
  )

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full flex flex-col items-center justify-center bg-black text-white font-sans"
    >
      <div className="flex-grow flex flex-col items-center justify-center">
        {/* Animated Glowing Orbit Icon */}
        <motion.div
          className="relative w-24 h-24 mb-8 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear"}}
          >
            <Orbit className="w-20 h-20 text-cyan-200" strokeWidth={0.5} />
          </motion.div>
          <motion.div
            className="absolute w-full h-full"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5]}}
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut"}}
          >
            <Orbit className="w-full h-full text-cyan-400" strokeWidth={0.5} style={{ filter: 'blur(10px)'}}/>
          </motion.div>
        </motion.div>

        <motion.p
          className="text-lg text-gray-300 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Loading Portfolio System...
        </motion.p>
      </div>

      <div className="w-full max-w-sm flex flex-col items-center mb-12">
        {/* Vista-style Loading Bar */}
        <div className="w-full h-2.5 bg-gray-800/50 rounded-full overflow-hidden border border-gray-600/50 relative">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-green-400"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 4, ease: "linear" }}
          />
          {/* Scrolling light beam effect */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <LightBeam delay={0} />
            <LightBeam delay={0.75} />
          </div>
        </div>

        <p className="text-gray-500 text-sm mt-8">
          © Oliver von Mizener 2024
        </p>
      </div>
    </motion.div>
  )
} 