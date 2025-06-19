"use client"

import React, { useState, useEffect, useRef } from "react"
import { Terminal, HelpCircle, User, Coffee, Heart, Zap, Star } from "lucide-react"
import { userInfo, getSkillsList, getRandomFortune, fileStructure } from "@/lib/data"

interface TerminalCommand {
  name: string
  description: string
  execute: (args: string[]) => string | void
}

interface TerminalLine {
  id: string
  type: 'input' | 'output' | 'error'
  content: string
  timestamp: Date
}

export default function TerminalWindow() {
  const [inputValue, setInputValue] = useState("")
  const [history, setHistory] = useState<TerminalLine[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [cursorPosition, setCursorPosition] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  // Get skills from centralized data
  const skills = getSkillsList()

  // Command definitions
  const commands: Record<string, TerminalCommand> = {
    help: {
      name: "help",
      description: "Display available commands",
      execute: () => {
        return `Available commands:
  help          - Display this help message
  echo skills   - Display my technical skills
  whoami        - Display user information
  fortune       - Display a random fortune
  clear         - Clear the terminal
  date          - Show current date and time
  ls            - List files (simulated)
  pwd           - Print working directory
  exit          - Close terminal (use window controls instead)

Type 'help <command>' for more information about a specific command.`
      }
    },
    echo: {
      name: "echo",
      description: "Echo arguments or display skills",
      execute: (args) => {
        if (args[0] === "skills") {
          return `My Technical Skills:
${skills.map(skill => `  • ${skill}`).join('\n')}

Total: ${skills.length} skills mastered`
        }
        return args.join(" ")
      }
    },
    whoami: {
      name: "whoami",
      description: "Display user information",
      execute: () => {
        return `User Information:
  Name: ${userInfo.name}
  Role: ${userInfo.role}
  Location: ${userInfo.location}
  Interests: ${userInfo.interests.join(', ')}
  Current Project: ${userInfo.currentProject}

"${userInfo.tagline}" - ${userInfo.name}`
      }
    },
    fortune: {
      name: "fortune",
      description: "Display a random fortune",
      execute: () => {
        const randomFortune = getRandomFortune()
        return `"${randomFortune}"`
      }
    },
    clear: {
      name: "clear",
      description: "Clear the terminal",
      execute: () => {
        setHistory([])
        return
      }
    },
    date: {
      name: "date",
      description: "Show current date and time",
      execute: () => {
        return new Date().toLocaleString()
      }
    },
    ls: {
      name: "ls",
      description: "List files (simulated)",
      execute: () => {
        return fileStructure
      }
    },
    pwd: {
      name: "pwd",
      description: "Print working directory",
      execute: () => {
        return "/home/oliver/portfolio"
      }
    }
  }

  const addToHistory = (line: Omit<TerminalLine, 'id' | 'timestamp'>) => {
    const newLine: TerminalLine = {
      ...line,
      id: Date.now().toString(),
      timestamp: new Date()
    }
    setHistory(prev => [...prev, newLine])
  }

  const executeCommand = (input: string) => {
    const trimmedInput = input.trim()
    if (!trimmedInput) return

    // Add command to history
    addToHistory({ type: 'input', content: `$ ${trimmedInput}` })
    setCommandHistory(prev => [...prev, trimmedInput])
    setHistoryIndex(-1)

    // Parse command and arguments
    const parts = trimmedInput.split(' ')
    const commandName = parts[0].toLowerCase()
    const args = parts.slice(1)

    // Execute command
    const command = commands[commandName]
    if (command) {
      try {
        const result = command.execute(args)
        if (result !== undefined) {
          addToHistory({ type: 'output', content: result })
        }
      } catch (error) {
        addToHistory({ type: 'error', content: `Error: ${error}` })
      }
    } else {
      addToHistory({ 
        type: 'error', 
        content: `Command not found: ${commandName}. Type 'help' for available commands.` 
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      executeCommand(inputValue)
      setInputValue("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1)
        setHistoryIndex(newIndex)
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex])
        setCursorPosition(commandHistory[commandHistory.length - 1 - newIndex].length)
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex])
        setCursorPosition(commandHistory[commandHistory.length - 1 - newIndex].length)
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInputValue("")
        setCursorPosition(0)
      }
    } else if (e.key === 'ArrowLeft') {
      setCursorPosition(prev => Math.max(0, prev - 1))
    } else if (e.key === 'ArrowRight') {
      setCursorPosition(prev => Math.min(inputValue.length, prev + 1))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setCursorPosition(e.target.value.length)
  }

  // Auto-scroll to bottom when new content is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div className="w-full h-full flex flex-col bg-white/10 backdrop-blur-sm text-white/90 font-mono text-sm overflow-hidden aero-glass">
      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto bg-transparent p-2"
        style={{ fontFamily: 'Consolas, Monaco, monospace' }}
      >
        {/* Welcome Message */}
        {history.length === 0 && (
          <div className="mb-2">
            <div className="text-white/90">
              Welcome to Oliver's Portfolio Terminal v1.0.0
            </div>
            <div className="text-white/60 text-xs mt-1">
              Type 'help' for available commands
            </div>
            <div className="text-white/60 text-xs">
              Last login: {new Date().toLocaleString()}
            </div>
          </div>
        )}

        {/* Command History */}
        {history.map((line) => (
          <div key={line.id} className="mb-0.5">
            <div 
              className={`${
                line.type === 'input' ? 'text-blue-300' : 
                line.type === 'error' ? 'text-red-300' : 'text-white/80'
              } whitespace-pre-wrap`}
            >
              {line.content}
            </div>
          </div>
        ))}

        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center mt-1">
          <span className="text-blue-300 mr-2">$</span>
          <div className="flex-1 flex items-center relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white/90 outline-none border-none relative z-10"
              placeholder="Type a command..."
              autoComplete="off"
              spellCheck="false"
            />
            {/* Blinking cursor positioned at the end of input */}
            <div 
              ref={cursorRef}
              className="w-2.5 h-4 bg-blue-300 absolute pointer-events-none"
              style={{ 
                left: `${cursorPosition * 0.6}em`,
                animation: 'blink 1s infinite',
                zIndex: 5
              }}
            ></div>
          </div>
        </form>
      </div>
    </div>
  )
} 