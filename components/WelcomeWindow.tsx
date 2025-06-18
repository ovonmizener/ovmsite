import { VistaWindow } from "./vista-window"

export function WelcomeWindow({ onClose }: { onClose: () => void }) {
  return (
    <VistaWindow
      title="Welcome"
      onClose={onClose}
      initialPosition={{ x: 100, y: 100 }}
      initialSize={{ width: 600, height: 400 }}
    >
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">Welcome to My Portfolio!</h1>
        <p className="text-gray-700 dark:text-gray-300">
          This is an interactive portfolio website inspired by Windows Vista. Feel free to explore the different sections:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>About Me - Learn more about my background and skills</li>
          <li>Projects - View my portfolio of work</li>
          <li>Contact - Get in touch with me</li>
          <li>Gallery - Browse through my work</li>
          <li>Social Media - Connect with me on various platforms</li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300">
          You can drag windows around, minimize them, and interact with them just like in Windows Vista!
        </p>
      </div>
    </VistaWindow>
  )
} 