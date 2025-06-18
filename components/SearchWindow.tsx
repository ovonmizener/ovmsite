import { useState } from "react"
import VistaWindow from "./vista-window"
import { Search } from "lucide-react"

export interface SearchResult {
  title: string
  content: string
  type: string
  id: string
}

interface SearchWindowProps {
  onClose: () => void
  onResultClick: (id: string) => void
}

export function SearchWindow({ onClose, onResultClick }: SearchWindowProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const searchableContent = [
    { title: "About Me", content: "full-stack developer passionate creative", type: "page", id: "about" },
    {
      title: "Projects",
      content: "e-commerce platform task manager weather app portfolio",
      type: "page",
      id: "projects",
    },
    { title: "Contact", content: "get in touch send message email", type: "page", id: "contact" },
    { title: "Social Media", content: "linkedin twitter instagram youtube github discord", type: "page", id: "social" },
    { title: "Gallery", content: "images photos portfolio work", type: "page", id: "gallery" },
    { title: "Skills", content: "react nextjs typescript tailwind nodejs python", type: "content", id: "about" },
    { title: "Experience", content: "6 years technology frameworks databases", type: "content", id: "about" },
  ]

  const filteredResults = searchQuery
    ? searchableContent.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.content.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : []

  return (
    <VistaWindow
      title="Search"
      onClose={onClose}
      onMinimize={() => {}}
      onFullScreen={() => {}}
      width={600}
      height={400}
    >
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full px-4 py-2 pl-10 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>

        <div className="mt-4 space-y-2">
          {filteredResults.map((result) => (
            <button
              key={result.id}
              onClick={() => onResultClick(result.id)}
              className="w-full p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <h3 className="font-medium">{result.title}</h3>
              <p className="text-sm text-gray-500">{result.content}</p>
            </button>
          ))}
        </div>
      </div>
    </VistaWindow>
  )
} 