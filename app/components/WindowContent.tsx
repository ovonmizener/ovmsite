import React from 'react'

interface WindowContentProps {
  windowId: string
  onWallpaperChange?: (wallpaper: any) => void
  wallpapers?: any[]
  onOpenWindow?: (windowId: string) => void
  selectedImage?: { src: string; alt: string } | null
  setSelectedImage?: (image: { src: string; alt: string } | null) => void
}

export const WindowContent: React.FC<WindowContentProps> = ({
  windowId,
  onWallpaperChange,
  wallpapers,
  onOpenWindow,
  selectedImage,
  setSelectedImage
}) => {
  return (
    <div className="p-4">
      {/* Content will be added based on windowId */}
      <p>Window content for {windowId}</p>
    </div>
  )
} 