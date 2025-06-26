"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Download, ExternalLink, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getSkillsList } from "@/lib/data"

const experience = [
  { year: "2024", title: "Data Analytics Bootcamp", company: "Arizona State University" },
  { year: "2023", title: "Product Management", company: "Cornell University" },
  { year: "2022", title: "Lean Six Sigma", company: "Professional Certification" },
  { year: "2021", title: "Communication (MA)", company: "Arizona State University" },
  { year: "2020", title: "English Literature (BA)", company: "Arizona State University" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-aero-blue-200/20 to-aero-cyan-200/20 blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
          style={{ left: "70%", top: "10%" }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-aero-green-200/20 to-aero-blue-200/20 blur-3xl"
          animate={{ scale: [1, 1.1, 1], rotate: [360, 180, 0] }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
          style={{ left: "10%", bottom: "10%" }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <nav className="max-w-7xl mx-auto">
          <Link href="/">
            <Button variant="ghost" className="mb-4 glass rounded-2xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </nav>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="relative w-48 h-48 mx-auto mb-8">
            <motion.div className="glass rounded-full p-2" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Image
                src="/placeholder-headshot.jpg"
                alt="Oliver von Mizener"
                width={192}
                height={192}
                className="rounded-full object-cover"
              />
            </motion.div>
            <motion.div
              className="absolute -top-2 -right-2 w-8 h-8 gradient-vista-cyan rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <Star className="w-4 h-4 text-white" />
            </motion.div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 vista-text-glow shine">About Oliver</h1>
          <div className="glass rounded-3xl p-8 max-w-3xl mx-auto">
            <p className="text-xl text-aero-blue-800 dark:text-aero-blue-200 leading-relaxed">
              Hey, I'm Oliver—part legal technologist, part data nerd, part boba-slinging entrepreneur.
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="glass rounded-3xl p-8 shadow-glass hover:shadow-xl transition-all duration-300 shine">
              <CardContent className="p-0">
                <h2 className="text-3xl font-bold mb-6 text-vista-blue">My Story</h2>
                <div className="space-y-4 text-aero-blue-700 dark:text-aero-blue-300 leading-relaxed">
                  <p>
                    I've spent the last few years helping organizations evolve, whether that's through smarter communication strategies, rethinking how knowledge flows, or finding ways to make change actually stick. I've got degrees in Communication (MA) and English Literature (BA) from Arizona State University, plus some extra firepower with Lean Six Sigma and a Product Management certificate from Cornell.
                  </p>
                  <p>
                    More recently, I dove headfirst into data analytics through ASU's boot camp, where I picked up Python, SQL, data viz, and machine learning chops. Now I blend analytics and empathy to make transformation not just efficient, but human. I have a distinct interest in machine learning and the rapidly developing AI space.
                  </p>
                  <p>
                    On the side? I run a milk tea and boba food truck and storefront, contribute auto features as a published writer for Performance Sound & Auto Magazine, and organize large-scale car shows and events—because spreadsheets are great, but there's something inspiring about an old imported car.
                  </p>
                  <p>
                    I love connecting with folks who are reimagining how things work—especially if they value tech-savvy, creative approaches that don't lose sight of the people involved.
                  </p>
                </div>

                <div className="mt-8">
                  <Button className="gradient-vista-blue text-white rounded-2xl px-6 py-3 shine hover:scale-105 transition-transform">
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills & Experience */}
          <div className="space-y-8">
            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="glass rounded-3xl p-8 shadow-glass hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold mb-6 text-vista-blue">Skills</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {getSkillsList().map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="glass rounded-xl px-4 py-3 text-sm font-medium text-aero-blue-800 dark:text-aero-blue-200 text-center hover:scale-105 transition-transform cursor-default bubble"
                        whileHover={{ y: -2 }}
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="glass rounded-3xl p-8 shadow-glass hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold mb-6 text-vista-blue">Experience</h3>
                  <div className="space-y-4">
                    {experience.map((item, index) => (
                      <motion.div
                        key={item.year}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="flex items-start space-x-4"
                      >
                        <motion.div
                          className="flex-shrink-0 w-16 h-16 gradient-vista-cyan rounded-full flex items-center justify-center text-white font-bold text-sm shine"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {item.year}
                        </motion.div>
                        <div className="flex-1 pt-2">
                          <h4 className="font-semibold text-aero-blue-800 dark:text-aero-blue-200">{item.title}</h4>
                          <p className="text-aero-blue-600 dark:text-aero-blue-400 text-sm">{item.company}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <Card className="gradient-vista-blue text-white rounded-3xl p-8 shadow-glass shine bubble overflow-hidden">
            <CardContent className="relative z-10 p-0">
              <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
              <p className="mb-6 opacity-90">
                Interested in data, technology, or just want to chat about cars? I'm always open to new connections and collaborations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="glass rounded-2xl hover:scale-105 transition-transform"
                  >
                    Get In Touch
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button
                    variant="outline"
                    size="lg"
                    className="glass border-white text-white hover:bg-white/20 rounded-2xl hover:scale-105 transition-transform"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View My Work
                  </Button>
                </Link>
              </div>
            </CardContent>
            {/* Glass reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl pointer-events-none" />
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
