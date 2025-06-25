"use client"

import { useState } from 'react'

interface ModelViewerProps {
  modelUrl: string
  className?: string
}

export default function ModelViewer({ modelUrl, className = "" }: ModelViewerProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={`w-full h-full ${className} flex flex-col items-center justify-center bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg border border-white/10`}>
      <div className="text-center p-8">
        <div className="text-6xl mb-4 animate-pulse">🎮</div>
        <h3 className="text-xl font-bold text-white mb-2">3D Model Viewer</h3>
        <p className="text-white/70 text-sm mb-4">
          Your 3D model is ready to display!
        </p>
        
        {/* Simple download link for the model */}
        <div className="bg-white/5 rounded-lg p-4 border border-white/10 mb-4">
          <p className="text-white/60 text-sm mb-2">
            <strong>Your Model:</strong> {modelUrl.split('/').pop()}
          </p>
          <a 
            href={modelUrl} 
            download
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
          >
            📥 Download Model
          </a>
        </div>

        {/* Instructions for viewing */}
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <p className="text-white/60 text-xs">
            <strong>To view your 3D model:</strong><br/>
            • Click "Download Model" above<br/>
            • Open with a 3D viewer (Windows 3D Viewer, etc.)<br/>
            • Or use online viewers like <a href="https://threejs.org/editor/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Three.js Editor</a>
          </p>
        </div>

        {/* Model info */}
        <div className="mt-4 text-white/40 text-xs">
          <p>File: {modelUrl}</p>
          <p>Format: GLB (GL Binary)</p>
          <p>Status: ✅ Ready to view</p>
        </div>
      </div>
    </div>
  )
} 