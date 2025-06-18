"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@olivervonmizener.com",
    href: "mailto:hello@olivervonmizener.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    href: "#",
  },
]

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com", color: "hover:text-gray-800" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com", color: "hover:text-blue-600" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com", color: "hover:text-blue-400" },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: data.message,
        })
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to send message. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mcm-cream-50 to-mcm-orange-50 dark:from-mcm-charcoal-900 dark:to-mcm-brown-900">
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-mcm-orange-600 to-mcm-green-600 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind or just want to say hello? I'd love to hear from you. Let's start a conversation
            about how we can work together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl text-gray-800">Send a Message</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border-gray-200 focus:border-mcm-orange-400 dark:border-gray-600 dark:focus:border-mcm-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-gray-200 focus:border-mcm-orange-400 dark:border-gray-600 dark:focus:border-mcm-orange-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="border-gray-200 focus:border-mcm-orange-400 dark:border-gray-600 dark:focus:border-mcm-orange-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="border-gray-200 focus:border-mcm-orange-400 dark:border-gray-600 dark:focus:border-mcm-orange-500 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-mcm-orange-500 to-mcm-green-500 hover:from-mcm-orange-600 hover:to-mcm-green-600 text-white"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info & Social */}
          <div className="space-y-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl text-gray-800">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-6">
                    {contactInfo.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex items-center space-x-4"
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-mcm-orange-400 to-mcm-green-400 rounded-full flex items-center justify-center text-white">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{item.label}</p>
                          <Link
                            href={item.href}
                            className="text-gray-600 hover:text-orange-600 transition-colors duration-200"
                          >
                            {item.value}
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl text-gray-800">Connect With Me</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <motion.div
                        key={social.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        <Link
                          href={social.href}
                          className={`flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full text-gray-600 transition-all duration-200 hover:scale-110 ${social.color}`}
                        >
                          <social.icon className="w-5 h-5" />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-gray-600 mt-4 text-sm">
                    Follow me on social media for updates on my latest projects and tech insights.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Response */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Card className="p-6 bg-gradient-to-r from-orange-500 to-teal-500 text-white border-0 shadow-lg">
                <CardContent className="p-0">
                  <h3 className="text-lg font-semibold mb-2">Quick Response Guarantee</h3>
                  <p className="text-sm opacity-90">
                    I typically respond to all inquiries within 24 hours. For urgent matters, feel free to reach out via
                    phone or connect with me on social media.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16"
        >
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-2xl text-gray-800 text-center">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">What's your typical response time?</h4>
                  <p className="text-gray-600 text-sm">
                    I aim to respond to all inquiries within 24 hours, often much sooner.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Do you work on small projects?</h4>
                  <p className="text-gray-600 text-sm">I enjoy projects of all sizes and complexity levels.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">What's your preferred communication method?</h4>
                  <p className="text-gray-600 text-sm">
                    Email is great for detailed discussions, but I'm flexible based on your preference.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Do you offer consultations?</h4>
                  <p className="text-gray-600 text-sm">
                    Yes! I offer free initial consultations to discuss your project needs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
