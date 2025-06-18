"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Coffee, Heart, Star, Gift, CreditCard } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const coffeeOptions = [
  {
    name: "Espresso",
    price: 3,
    description: "A quick shot of appreciation",
    icon: "☕",
    popular: false,
  },
  {
    name: "Cappuccino",
    price: 5,
    description: "The perfect balance of support",
    icon: "🥛",
    popular: true,
  },
  {
    name: "Premium Blend",
    price: 10,
    description: "For the generous supporters",
    icon: "🌟",
    popular: false,
  },
  {
    name: "Coffee & Pastry",
    price: 15,
    description: "The full experience package",
    icon: "🥐",
    popular: false,
  },
]

const supporters = [
  { name: "Sarah M.", message: "Love your work on the e-commerce project!", amount: 5 },
  { name: "Alex K.", message: "Thanks for the open source contributions!", amount: 10 },
  { name: "Jamie L.", message: "Your tutorials helped me land my first job!", amount: 15 },
  { name: "Chris P.", message: "Keep up the amazing work!", amount: 5 },
]

export default function CoffeePage() {
  const [selectedOption, setSelectedOption] = useState(coffeeOptions[1])
  const [customAmount, setCustomAmount] = useState("")
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-mcm-yellow-50 to-mcm-orange-50 dark:from-mcm-charcoal-900 dark:to-mcm-brown-900">
      {/* Header */}
      <header className="p-6">
        <nav className="max-w-7xl mx-auto">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="text-6xl mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
          >
            ☕
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-mcm-yellow-600 to-mcm-orange-600 bg-clip-text text-transparent">
            Buy Me a Coffee
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Enjoying my work? Support my caffeine addiction and help fuel more creative projects! Every cup of coffee
            helps me stay energized and motivated to create better content.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Coffee Selection */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl text-gray-800 flex items-center">
                  <Coffee className="w-6 h-6 mr-2 text-amber-600" />
                  Choose Your Support
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid gap-4 mb-6">
                  {coffeeOptions.map((option, index) => (
                    <motion.div
                      key={option.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        selectedOption.name === option.name
                          ? "border-mcm-yellow-400 bg-mcm-yellow-50 dark:border-mcm-yellow-500 dark:bg-mcm-yellow-900/20"
                          : "border-gray-200 hover:border-mcm-yellow-300 dark:border-gray-600 dark:hover:border-mcm-yellow-600"
                      }`}
                      onClick={() => setSelectedOption(option)}
                    >
                      {option.popular && (
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs px-2 py-1 rounded-full flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          Popular
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{option.icon}</span>
                          <div>
                            <h3 className="font-semibold text-gray-800">{option.name}</h3>
                            <p className="text-sm text-gray-600">{option.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-amber-600">${option.price}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="mb-6">
                  <Label htmlFor="custom-amount" className="text-sm font-medium text-gray-700 mb-2 block">
                    Or enter a custom amount
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      id="custom-amount"
                      type="number"
                      placeholder="0.00"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="pl-8 border-gray-200 focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2 block">
                    Leave a message (optional)
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Say something nice... ☺️"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="border-gray-200 focus:border-amber-400 resize-none"
                  />
                </div>

                {/* Name */}
                <div className="mb-6">
                  <Label htmlFor="supporter-name" className="text-sm font-medium text-gray-700 mb-2 block">
                    Your name (optional)
                  </Label>
                  <Input
                    id="supporter-name"
                    placeholder="Anonymous Supporter"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-gray-200 focus:border-amber-400"
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-mcm-yellow-500 to-mcm-orange-500 hover:from-mcm-yellow-600 hover:to-mcm-orange-600 text-white text-lg py-3">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Support with ${customAmount || selectedOption.price}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Secure payment powered by Stripe. Your support means the world to me! 💙
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Supporters & Info */}
          <div className="space-y-8">
            {/* Why Support */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl text-gray-800 flex items-center">
                    <Heart className="w-6 h-6 mr-2 text-red-500" />
                    Why Support?
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-700">Keep my open-source projects alive and thriving</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-700">Fund new tutorials and educational content</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-700">Support my late-night coding sessions ☕</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-700">Help me dedicate more time to community projects</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Supporters */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl text-gray-800 flex items-center">
                    <Gift className="w-6 h-6 mr-2 text-purple-500" />
                    Recent Supporters
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-4">
                    {supporters.map((supporter, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="flex items-start space-x-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg"
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-mcm-yellow-400 to-mcm-orange-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {supporter.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-800">{supporter.name}</span>
                            <span className="text-amber-600 font-semibold">${supporter.amount}</span>
                          </div>
                          <p className="text-sm text-gray-600">{supporter.message}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="text-center mt-6">
                    <p className="text-sm text-gray-500">
                      Join {supporters.length}+ amazing supporters who believe in my work! 🙏
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Fun Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Card className="p-6 bg-gradient-to-r from-mcm-yellow-500 to-mcm-orange-500 text-white border-0 shadow-lg">
                <CardContent className="p-0">
                  <h3 className="text-lg font-semibold mb-4 text-center">Coffee Stats ☕</h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">127</div>
                      <div className="text-sm opacity-90">Cups This Month</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">2.3k</div>
                      <div className="text-sm opacity-90">Lines of Code</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">15</div>
                      <div className="text-sm opacity-90">Projects Completed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">∞</div>
                      <div className="text-sm opacity-90">Gratitude Level</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
