'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  ArrowLeft,
  Mail,
  MessageSquare,
  Phone,
  MapPin,
  Clock,
  Headphones,
  FileQuestion,
  Users,
  Zap,
  Building,
  Globe,
  Send,
  Check
} from 'lucide-react'
import { useState, useEffect } from 'react'

export default function ContactPage() {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'general',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: 'general',
        message: ''
      })
    }, 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      description: "Get in touch with our team",
      value: "support@bytebot.ai",
      link: "mailto:support@bytebot.ai",
      color: "text-blue-600"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Live Chat",
      description: "Chat with our support team",
      value: "Available 9am-6pm PST",
      action: "Start Chat",
      color: "text-green-600"
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Support Center",
      description: "Browse our help articles",
      value: "docs.bytebot.ai",
      link: "https://docs.bytebot.ai",
      color: "text-purple-600"
    }
  ]

  const departments = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Technical Support",
      email: "support@bytebot.ai",
      responseTime: "24 hours"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Sales Inquiries",
      email: "sales@bytebot.ai",
      responseTime: "2 hours"
    },
    {
      icon: <Building className="w-5 h-5" />,
      title: "Enterprise Solutions",
      email: "enterprise@bytebot.ai",
      responseTime: "Same day"
    },
    {
      icon: <FileQuestion className="w-5 h-5" />,
      title: "General Questions",
      email: "hello@bytebot.ai",
      responseTime: "48 hours"
    }
  ]

  const offices = [
    {
      city: "San Francisco",
      address: "123 Tech Street, Suite 100",
      location: "San Francisco, CA 94105",
      country: "United States",
      phone: "+1 (415) 555-0100",
      isPrimary: true
    },
    {
      city: "London",
      address: "45 Innovation Lane",
      location: "London, EC2A 4BX",
      country: "United Kingdom",
      phone: "+44 20 1234 5678",
      isPrimary: false
    },
    {
      city: "Singapore",
      address: "88 Tech Park Road",
      location: "Singapore 118899",
      country: "Singapore",
      phone: "+65 1234 5678",
      isPrimary: false
    }
  ]

  return (
    <div className="min-h-screen bg-bytebot-bronze-light-1">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-bytebot-bronze-light-1/95 backdrop-blur-md border-b border-bytebot-bronze-light-6/20">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {mounted && (
              <Link href="/">
                <Image
                  src="/beebot_transparent_logo_dark.svg"
                  alt="Bytebot"
                  width={100}
                  height={30}
                  className="h-8 w-auto"
                />
              </Link>
            )}
          </div>
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-bytebot-bronze-light-3 rounded-full mb-6">
              <MessageSquare className="w-8 h-8 text-bytebot-bronze-dark-7" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-bytebot-bronze-light-12">
              Get in Touch
            </h1>
            <p className="text-xl text-bytebot-bronze-light-11 max-w-2xl mx-auto">
              Have questions about Bytebot? We're here to help you automate your workflow
              and answer any questions you might have.
            </p>
          </div>

          {/* Quick Contact Methods */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className={`${method.color} mb-4`}>
                    {method.icon}
                  </div>
                  <h3 className="font-semibold text-bytebot-bronze-light-12 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-sm text-bytebot-bronze-light-11 mb-3">
                    {method.description}
                  </p>
                  {method.link ? (
                    <a
                      href={method.link}
                      className="text-bytebot-bronze-dark-7 hover:underline font-medium"
                      target={method.link.startsWith('http') ? '_blank' : undefined}
                      rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {method.value}
                    </a>
                  ) : method.action ? (
                    <Button size="sm" className="mt-2">
                      {method.action}
                    </Button>
                  ) : (
                    <p className="font-medium text-bytebot-bronze-light-12">
                      {method.value}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-bytebot-bronze-light-12">
                    Send Us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-bytebot-bronze-light-11 mb-1">
                          Your Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-bytebot-bronze-light-11 mb-1">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-bytebot-bronze-light-11 mb-1">
                        Company
                      </label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Your Company Name"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-bytebot-bronze-light-11 mb-1">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bytebot-bronze-dark-7"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="sales">Sales Question</option>
                        <option value="enterprise">Enterprise Solutions</option>
                        <option value="partnership">Partnership Opportunity</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-bytebot-bronze-light-11 mb-1">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us how we can help you..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bytebot-bronze-dark-7"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting || isSubmitted}
                    >
                      {isSubmitted ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Message Sent!
                        </>
                      ) : isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>

                  {isSubmitted && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">
                        Thank you for contacting us! We'll get back to you within 24 hours.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Department Contacts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-bytebot-bronze-light-12">
                    Department Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {departments.map((dept, index) => (
                    <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                      <div className="p-2 bg-bytebot-bronze-light-3 rounded-lg text-bytebot-bronze-dark-7">
                        {dept.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-bytebot-bronze-light-12">
                          {dept.title}
                        </h4>
                        <a
                          href={`mailto:${dept.email}`}
                          className="text-sm text-bytebot-bronze-dark-7 hover:underline"
                        >
                          {dept.email}
                        </a>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3 text-bytebot-bronze-light-10" />
                          <span className="text-xs text-bytebot-bronze-light-10">
                            Response: {dept.responseTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Office Locations */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-bytebot-bronze-light-12">
                    Our Offices
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {offices.map((office, index) => (
                    <div key={index} className="pb-4 border-b last:border-0 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-bytebot-bronze-light-12">
                          {office.city}
                        </h4>
                        {office.isPrimary && (
                          <Badge variant="secondary" className="text-xs">
                            Headquarters
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-1 text-sm text-bytebot-bronze-light-11">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <div>
                            <p>{office.address}</p>
                            <p>{office.location}</p>
                            <p>{office.country}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{office.phone}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card className="bg-bytebot-bronze-light-2">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-6 h-6 text-bytebot-bronze-dark-7" />
                    <h3 className="text-lg font-semibold text-bytebot-bronze-light-12">
                      Business Hours
                    </h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-bytebot-bronze-light-11">Monday - Friday</span>
                      <span className="font-medium text-bytebot-bronze-light-12">9:00 AM - 6:00 PM PST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-bytebot-bronze-light-11">Saturday</span>
                      <span className="font-medium text-bytebot-bronze-light-12">10:00 AM - 4:00 PM PST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-bytebot-bronze-light-11">Sunday</span>
                      <span className="font-medium text-bytebot-bronze-light-12">Closed</span>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <p className="text-xs text-bytebot-bronze-light-10">
                    For urgent technical issues, our enterprise customers have access to 24/7 support.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Social Media & Community */}
          <Card className="mt-12">
            <CardContent className="py-8">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-bytebot-bronze-light-12 mb-4">
                  Join Our Community
                </h3>
                <p className="text-bytebot-bronze-light-11 mb-6 max-w-2xl mx-auto">
                  Connect with other Bytebot users, share automation tips, and get help from our community.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button variant="outline" asChild>
                    <a href="https://discord.com/bytebot" target="_blank" rel="noopener noreferrer">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Discord
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://twitter.com/bytebot" target="_blank" rel="noopener noreferrer">
                      <Globe className="w-4 h-4 mr-2" />
                      Twitter
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://github.com/bytebot" target="_blank" rel="noopener noreferrer">
                      <Globe className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://linkedin.com/company/bytebot" target="_blank" rel="noopener noreferrer">
                      <Globe className="w-4 h-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
