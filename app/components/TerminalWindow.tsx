"use client"

import React, { useState, useEffect, useRef } from "react"
import { Terminal, Gamepad2, HelpCircle, User, Coffee, Heart, Zap, Star } from "lucide-react"

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
  const [isGameOpen, setIsGameOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Static skills data (read-only)
  const skills = [
    "Python", "SQL", "JavaScript", "APIs", "Data Analysis", "Tableau", 
    "CSS", "Matplotlib", "JavaScript Libraries", "Contentful", "Data Analytics", 
    "SharePoint", "Project Management", "Documentation", "Communication", 
    "Training & Development", "Presentations", "Editing", "Voice Over / Public Speaking"
  ]

  // Fortune quotes
  const fortunes = [
    "A bug in the hand is better than one as yet undetected.",
    "The best code is no code at all.",
    "There are 10 types of people: those who understand binary and those who don't.",
    "It's not a bug, it's an undocumented feature.",
    "The only way to learn a new programming language is by writing programs in it.",
    "Talk is cheap. Show me the code.",
    "First, solve the problem. Then, write the code.",
    "Code is like humor. When you have to explain it, it's bad.",
    "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.",
    "The most damaging phrase in the language is 'We've always done it this way!'"
  ]

  // Command definitions
  const commands: Record<string, TerminalCommand> = {
    help: {
      name: "help",
      description: "Display available commands",
      execute: () => {
        return `Available commands:
  help          - Display this help message
  echo skills   - Display my technical skills
  play game     - Launch a mini game
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
    play: {
      name: "play",
      description: "Launch a mini game",
      execute: (args) => {
        if (args[0] === "game") {
          setIsGameOpen(true)
          return "Launching Snake game... Use arrow keys to control the snake. Press ESC to return."
        }
        return "Usage: play game"
      }
    },
    whoami: {
      name: "whoami",
      description: "Display user information",
      execute: () => {
        return `User Information:
  Name: Oliver von Mizener
  Role: Full-Stack Developer & Data Analyst
  Location: Mesa, Arizona
  Interests: Machine Learning, AI, Boba Tea, Classic Cars
  Current Project: This Vista-inspired portfolio

"Part legal technologist, part data nerd, part boba-slinging entrepreneur" - Oliver`
      }
    },
    fortune: {
      name: "fortune",
      description: "Display a random fortune",
      execute: () => {
        const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
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
        return `Desktop/
├── about.txt
├── projects/
├── contact.txt
├── social/
├── businesses/
├── writing-samples/
└── gallery/

Total: 7 items`
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
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInputValue("")
      }
    }
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

  // Snake game component
  const SnakeGame = () => {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }])
    const [food, setFood] = useState({ x: 15, y: 15 })
    const [direction, setDirection] = useState('RIGHT')
    const [gameOver, setGameOver] = useState(false)
    const [score, setScore] = useState(0)
    const gameRef = useRef<HTMLDivElement>(null)

    const generateFood = () => {
      return {
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20)
      }
    }

    const resetGame = () => {
      setSnake([{ x: 10, y: 10 }])
      setFood(generateFood())
      setDirection('RIGHT')
      setGameOver(false)
      setScore(0)
    }

    useEffect(() => {
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsGameOpen(false)
          return
        }

        if (gameOver) {
          if (e.key === 'Enter') {
            resetGame()
          }
          return
        }

        switch (e.key) {
          case 'ArrowUp':
            setDirection(prev => prev !== 'DOWN' ? 'UP' : prev)
            break
          case 'ArrowDown':
            setDirection(prev => prev !== 'UP' ? 'DOWN' : prev)
            break
          case 'ArrowLeft':
            setDirection(prev => prev !== 'RIGHT' ? 'LEFT' : prev)
            break
          case 'ArrowRight':
            setDirection(prev => prev !== 'LEFT' ? 'RIGHT' : prev)
            break
        }
      }

      window.addEventListener('keydown', handleKeyPress)
      return () => window.removeEventListener('keydown', handleKeyPress)
    }, [gameOver])

    useEffect(() => {
      if (gameOver) return

      const gameLoop = setInterval(() => {
        setSnake(prevSnake => {
          const newSnake = [...prevSnake]
          const head = { ...newSnake[0] }

          switch (direction) {
            case 'UP':
              head.y -= 1
              break
            case 'DOWN':
              head.y += 1
              break
            case 'LEFT':
              head.x -= 1
              break
            case 'RIGHT':
              head.x += 1
              break
          }

          // Check boundaries
          if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
            setGameOver(true)
            return prevSnake
          }

          // Check self collision
          if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
            setGameOver(true)
            return prevSnake
          }

          newSnake.unshift(head)

          // Check food collision
          if (head.x === food.x && head.y === food.y) {
            setFood(generateFood())
            setScore(prev => prev + 1)
          } else {
            newSnake.pop()
          }

          return newSnake
        })
      }, 150)

      return () => clearInterval(gameLoop)
    }, [direction, food, gameOver])

    if (!isGameOpen) return null

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-gray-900 border border-gray-600 rounded-lg p-6 max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-green-400 font-mono text-lg">Snake Game</h3>
            <button
              onClick={() => setIsGameOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          
          <div className="text-center mb-4">
            <div className="text-green-400 font-mono">Score: {score}</div>
          </div>

          <div 
            ref={gameRef}
            className="bg-black border border-gray-600 mx-auto mb-4"
            style={{ width: '400px', height: '400px', position: 'relative' }}
          >
            {snake.map((segment, index) => (
              <div
                key={index}
                className="absolute bg-green-400"
                style={{
                  width: '20px',
                  height: '20px',
                  left: `${segment.x * 20}px`,
                  top: `${segment.y * 20}px`
                }}
              />
            ))}
            <div
              className="absolute bg-red-400"
              style={{
                width: '20px',
                height: '20px',
                left: `${food.x * 20}px`,
                top: `${food.y * 20}px`
              }}
            />
          </div>

          {gameOver ? (
            <div className="text-center">
              <div className="text-red-400 font-mono text-lg mb-2">Game Over!</div>
              <div className="text-gray-400 mb-4">Final Score: {score}</div>
              <button
                onClick={resetGame}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-mono"
              >
                Play Again
              </button>
            </div>
          ) : (
            <div className="text-center text-gray-400 text-sm">
              <div>Use arrow keys to control the snake</div>
              <div>Press ESC to exit</div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col bg-black text-green-400 font-mono text-sm overflow-hidden">
      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto bg-black"
        style={{ fontFamily: 'Consolas, Monaco, monospace' }}
      >
        {/* Welcome Message */}
        {history.length === 0 && (
          <div className="mb-4">
            <div className="text-green-400">
              Welcome to Oliver's Portfolio Terminal v1.0.0
            </div>
            <div className="text-gray-500 text-xs mt-1">
              Type 'help' for available commands
            </div>
            <div className="text-gray-500 text-xs">
              Last login: {new Date().toLocaleString()}
            </div>
          </div>
        )}

        {/* Command History */}
        {history.map((line) => (
          <div key={line.id} className="mb-1">
            <div 
              className={`${
                line.type === 'input' ? 'text-green-400' : 
                line.type === 'error' ? 'text-red-400' : 'text-gray-300'
              } whitespace-pre-wrap`}
            >
              {line.content}
            </div>
          </div>
        ))}

        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-green-400 mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-green-400 outline-none border-none"
            placeholder="Type a command..."
            autoComplete="off"
            spellCheck="false"
          />
          {/* Blinking cursor */}
          <div className="w-2 h-4 bg-green-400 animate-pulse ml-1"></div>
        </form>
      </div>

      {/* Snake Game Modal */}
      <SnakeGame />
    </div>
  )
} 