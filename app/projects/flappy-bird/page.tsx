"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function FlappyBirdPage() {
  const [isGameLoaded, setIsGameLoaded] = useState(false)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [highScore, setHighScore] = useState(0)

  const handleGameLoad = () => {
    setIsGameLoaded(true)
  }

  const handleStartGame = () => {
    setIsGameStarted(true)
    // Focus the iframe to capture keyboard events
    const iframe = document.getElementById('flappy-bird-iframe') as HTMLIFrameElement
    iframe?.focus()
  }

  const handleRestartGame = () => {
    setIsGameStarted(false)
    // Reload the iframe to restart the game
    const iframe = document.getElementById('flappy-bird-iframe') as HTMLIFrameElement
    if (iframe) {
      iframe.src = iframe.src
    }
  }

  const handleToggleMute = () => {
    setIsMuted(!isMuted)
    // You can add logic here to mute/unmute the game if it supports it
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500">
      {/* Header */}
      <header className="p-6">
        <nav className="max-w-7xl mx-auto">
          <Link href="/projects">
            <Button variant="ghost" className="mb-4 text-white hover:bg-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            🎮 Flappy Bird
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Classic Flappy Bird game - Click or press Space to make the bird flap and avoid the pipes!
          </p>
        </motion.div>

        {/* Game Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="overflow-hidden bg-white/10 backdrop-blur-sm border-0 shadow-2xl">
            {/* Game Controls */}
            <CardHeader className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-b border-white/20">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-xl">Game Controls</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={handleStartGame}
                    disabled={!isGameLoaded || isGameStarted}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Start Game
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleRestartGame}
                    disabled={!isGameLoaded}
                    className="border-white/30 text-white hover:bg-white/20"
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Restart
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleToggleMute}
                    className="border-white/30 text-white hover:bg-white/20"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {/* Game Status */}
              <div className="bg-black/20 p-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    Status: {!isGameLoaded ? 'Loading...' : isGameStarted ? 'Game Running' : 'Ready to Play'}
                  </div>
                  <div className="text-sm">
                    High Score: {highScore}
                  </div>
                </div>
                <div className="text-sm">
                  Controls: Click or Press Space
                </div>
              </div>

              {/* Game Frame */}
              <div className="relative bg-black p-4">
                {!isGameLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                    <div className="text-center text-white">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                      <p>Loading Flappy Bird...</p>
                    </div>
                  </div>
                )}
                
                <iframe
                  id="flappy-bird-iframe"
                  src="/games/flappy-bird/index.html"
                  className={`w-full h-96 border-0 rounded ${
                    isGameLoaded ? 'opacity-100' : 'opacity-0'
                  } transition-opacity duration-300`}
                  onLoad={handleGameLoad}
                  title="Flappy Bird Game"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Game Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 max-w-4xl mx-auto"
        >
          <Card className="bg-white/10 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">How to Play</CardTitle>
            </CardHeader>
            <CardContent className="text-white/90">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Objective</h3>
                  <p>Guide the bird through the pipes without hitting them. The goal is to survive as long as possible and achieve the highest score.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Controls</h3>
                  <ul className="space-y-1">
                    <li>• Click or Press Space: Make the bird flap</li>
                    <li>• Avoid hitting the pipes and the ground</li>
                    <li>• Each pipe you pass gives you 1 point</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
} 