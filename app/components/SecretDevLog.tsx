"use client";
import { useEffect, useState } from "react";
import ModelViewer from "./ModelViewer";

export default function SecretDevLog() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);
  return (
    <div className="text-white h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-bold vista-text-glow mb-2">🎮 Secret 3D Model Viewer</h2>
        <p className="text-white/70 text-sm">You found the hidden 3D model! Drag to rotate, scroll to zoom.</p>
      </div>
      <div className="flex-1 bg-white/5 rounded-lg overflow-hidden">
        {isClient && (
          <ModelViewer 
            modelUrl="/models/model_Animation_Walking_withSkin.glb" 
            className="w-full h-full"
          />
        )}
      </div>
      <div className="mt-4 text-center text-white/60 text-xs">
        <p>💡 Tip: Use your mouse to interact with the 3D model</p>
      </div>
    </div>
  );
} 