import React from 'react'
import { Search, Power } from 'lucide-react'

interface VistaTaskbarProps {
  openWindows: string[]
  minimizedWindows: string[]
  activeWindow: string | null
  onWindowClick: (windowId: string) => void
  currentTime: Date
  onSearch: () => void
  onPowerMenu: () => void
  showSearch: boolean
  showPowerMenu: boolean
  onPowerAction: (action: string) => void
}

export const VistaTaskbar: React.FC<VistaTaskbarProps> = ({
  openWindows,
  minimizedWindows,
  activeWindow,
  onWindowClick,
  currentTime,
  onSearch,
  onPowerMenu,
  showSearch,
  showPowerMenu,
  onPowerAction
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-12 bg-gradient-to-r from-blue-500/50 to-blue-600/50 backdrop-blur-md flex items-center justify-between px-4 z-50">
      {/* Start Button */}
      <button
        onClick={onSearch}
        className="flex items-center gap-2 px-3 py-1 rounded hover:bg-white/20"
      >
        <Search className="w-5 h-5 text-white" />
        <span className="text-white">Search</span>
      </button>

      {/* Window Buttons */}
      <div className="flex items-center gap-2">
        {openWindows.map((windowId) => (
          <button
            key={windowId}
            onClick={() => onWindowClick(windowId)}
            className={`px-3 py-1 rounded ${
              activeWindow === windowId
                ? 'bg-white/30'
                : minimizedWindows.includes(windowId)
                ? 'bg-white/10'
                : 'bg-white/20'
            }`}
          >
            <span className="text-white">{windowId}</span>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-4">
        {/* Time */}
        <div className="text-white">
          {currentTime.toLocaleTimeString()}
        </div>

        {/* Power Button */}
        <div className="relative">
          <button
            onClick={onPowerMenu}
            className="p-1 rounded hover:bg-white/20"
          >
            <Power className="w-5 h-5 text-white" />
          </button>

          {/* Power Menu */}
          {showPowerMenu && (
            <div className="absolute bottom-full right-0 mb-2 bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-2">
              <button
                onClick={() => onPowerAction('logoff')}
                className="w-full text-left px-4 py-2 text-white hover:bg-white/20 rounded"
              >
                Log Off
              </button>
              <button
                onClick={() => onPowerAction('shutdown')}
                className="w-full text-left px-4 py-2 text-white hover:bg-white/20 rounded"
              >
                Shut Down
              </button>
              <button
                onClick={() => onPowerAction('restart')}
                className="w-full text-left px-4 py-2 text-white hover:bg-white/20 rounded"
              >
                Restart
              </button>
              <button
                onClick={() => onPowerAction('sleep')}
                className="w-full text-left px-4 py-2 text-white hover:bg-white/20 rounded"
              >
                Sleep
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 