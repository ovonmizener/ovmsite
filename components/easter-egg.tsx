"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"

const KONAMI_CODE = ["r", "a", "d", "i", "o"]

export default function EasterEgg() {
  const [inputSequence, setInputSequence] = useState<string[]>([])
  const [isActivated, setIsActivated] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()

      setInputSequence((prev) => {
        const newSequence = [...prev, key].slice(-KONAMI_CODE.length)

        if (newSequence.join("") === KONAMI_CODE.join("")) {
          setIsActivated(true)
          setTimeout(() => setIsActivated(false), 5000)
        }

        return newSequence
      })
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [])

  const toggleRadio = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <AnimatePresence>
      {isActivated && (
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 180 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <div className="relative">
            {/* Radio Body */}
            <motion.div
              className="w-24 h-32 bg-gradient-to-b from-mcm-brown-800 to-mcm-brown-900 rounded-lg shadow-2xl cursor-pointer"
              onClick={toggleRadio}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Speaker Grille */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-mcm-brown-700 rounded-md">
                <div className="grid grid-cols-4 gap-1 p-2 h-full">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="bg-mcm-brown-600 rounded-full" />
                  ))}
                </div>
              </div>

              {/* Display */}
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-14 h-4 bg-mcm-green-400 rounded-sm flex items-center justify-center">
                <motion.div
                  className="text-xs font-mono text-mcm-green-900"
                  animate={isPlaying ? { opacity: [1, 0.3, 1] } : {}}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  {isPlaying ? "♪ ON" : "OFF"}
                </motion.div>
              </div>

              {/* Volume Button */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
                {isPlaying ? (
                  <Volume2 className="w-4 h-4 text-mcm-yellow-300" />
                ) : (
                  <VolumeX className="w-4 h-4 text-mcm-yellow-300" />
                )}
              </div>

              {/* Antenna */}
              <motion.div
                className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-1 bg-mcm-brown-600 origin-bottom"
                style={{ height: "24px" }}
                animate={isPlaying ? { rotate: [-5, 5, -5] } : {}}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>

            {/* Sound Waves */}
            <AnimatePresence>
              {isPlaying && (
                <>
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-mcm-yellow-400 rounded-full"
                      initial={{ width: 0, height: 0, opacity: 0.8 }}
                      animate={{
                        width: [0, 60 + i * 20, 80 + i * 20],
                        height: [0, 60 + i * 20, 80 + i * 20],
                        opacity: [0.8, 0.4, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.3,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Floating Notes */}
            <AnimatePresence>
              {isPlaying && (
                <>
                  {["♪", "♫", "♬"].map((note, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-mcm-yellow-500 text-lg font-bold pointer-events-none"
                      initial={{
                        x: Math.random() * 40 - 20,
                        y: 0,
                        opacity: 0,
                        scale: 0.5,
                      }}
                      animate={{
                        y: -60,
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5],
                        x: Math.random() * 60 - 30,
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.8,
                        ease: "easeOut",
                      }}
                      style={{
                        left: "50%",
                        top: "20%",
                      }}
                    >
                      {note}
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap"
          >
            🎉 You found the radio! Click to toggle music
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
