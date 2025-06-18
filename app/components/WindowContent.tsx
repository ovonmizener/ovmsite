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
    case "secret-dev-log":
      return (
        <div className="text-white">
          <h2 className="text-2xl font-bold mb-4">Secret Dev Log</h2>
          <p className="mb-4">Fun Facts About Oliver:</p>
          <ul className="list-disc pl-5">
            <li>Oliver loves coding and building interactive websites.</li>
            <li>He enjoys playing video games and exploring new technologies.</li>
            <li>Oliver is passionate about creating user-friendly and visually appealing applications.</li>
            <li>He has a knack for solving complex problems and thinking outside the box.</li>
            <li>Oliver is always eager to learn and adapt to new challenges.</li>
          </ul>
        </div>
      )
    default:
      return <div>Window content not found</div>
  }
} 