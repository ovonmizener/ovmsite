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
  switch (windowId) {
    case "about":
      return <AboutContent />
    case "projects":
      return <ProjectsContent onOpenWindow={onOpenWindow} />
    case "contact":
      return <ContactContent />
    case "social":
      return <SocialContent />
    case "wallpapers":
      return <WallpapersContent onWallpaperChange={onWallpaperChange} wallpapers={wallpapers} />
    default:
      return <div>Window content not found</div>
  }
} 