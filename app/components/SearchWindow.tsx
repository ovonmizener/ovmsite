import React from 'react'

export interface SearchResult {
  id: string
  title: string
  type: 'project' | 'image' | 'window'
  description?: string
  icon?: string
}

interface SearchWindowProps {
  searchQuery: string
  onSearch: (query: string) => void
  searchResults: SearchResult[]
  onResultClick: (result: SearchResult) => void
}

export const SearchWindow: React.FC<SearchWindowProps> = ({
  searchQuery,
  onSearch,
  searchResults,
  onResultClick
}) => {
  return (
    <div className="p-4">
      <div className="relative mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search for projects, images, or content..."
          className="w-full bg-white/20 text-white placeholder-white/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {searchResults.length > 0 ? (
        <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
          {searchResults.map((result) => (
            <button
              key={result.id}
              onClick={() => onResultClick(result)}
              className="w-full text-left p-3 hover:bg-white/10 rounded-lg flex items-center gap-3 group"
            >
              {result.icon && (
                <img
                  src={result.icon}
                  alt=""
                  className="w-8 h-8 object-cover rounded"
                />
              )}
              <div>
                <div className="text-white font-medium">{result.title}</div>
                {result.description && (
                  <div className="text-white/50 text-sm">{result.description}</div>
                )}
              </div>
            </button>
          ))}
        </div>
      ) : searchQuery ? (
        <div className="text-white/50 text-center py-8">No results found</div>
      ) : (
        <div className="text-white/50 text-center py-8">Start typing to search...</div>
      )}
    </div>
  )
} 