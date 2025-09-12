'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Shield, Lock, Eye, Database, Globe, Users, FileText, Mail } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function PrivacyPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const sections = [
    {
      icon: <Database className="w-5 h-5" />,
      title: "Information We Collect",
      content: [
        "Account information (name, email, company)",
        "Usage data and analytics",
        "Task execution logs and screenshots",
        "Payment and billing information",
        "Communication preferences"
      ]
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "How We Protect Your Data",
      content: [
        "End-to-end encryption for all data transfers",
        "AES-256 encryption for data at rest",
        "SOC 2 Type II compliance",
        "Regular security audits and penetration testing",
        "Strict access controls and authentication"
      ]
    },
    {
      icon: <Eye className="w-5 h-5" />,
      title: "How We Use Your Information",
      content: [
        "Provide and improve our automation services",
        "Process payments and manage subscriptions",
        "Send service updates and notifications",
        "Analyze usage patterns to enhance features",
        "Comply with legal obligations"
      ]
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Data Sharing",
      content: [
        "We never sell your personal data",
        "Data shared only with essential service providers",
        "Strict data processing agreements in place",
        "Law enforcement only with valid legal requests",
        "Anonymized data may be used for research"
      ]
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
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-bytebot-bronze-light-3 rounded-full mb-6">
              <Lock className="w-8 h-8 text-bytebot-bronze-dark-7" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-bytebot-bronze-light-12">
              Privacy Policy
            </h1>
            <p className="text-xl text-bytebot-bronze-light-11">
              Your privacy is fundamental to how we build and operate Bytebot
            </p>
            <p className="text-sm text-bytebot-bronze-light-10 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <p className="text-bytebot-bronze-light-11 leading-relaxed">
                At Bytebot, we take your privacy seriously. This Privacy Policy explains how we collect,
                use, disclose, and safeguard your information when you use our desktop automation platform.
                We are committed to protecting your personal information and your right to privacy.
              </p>
            </CardContent>
          </Card>

          {/* Main Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-bytebot-bronze-light-3 rounded-lg text-bytebot-bronze-dark-7">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-semibold text-bytebot-bronze-light-12">
                      {section.title}
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-green-600 mt-1">✓</span>
                        <span className="text-bytebot-bronze-light-11">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            {/* Your Rights */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-bytebot-bronze-light-3 rounded-lg text-bytebot-bronze-dark-7">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-semibold text-bytebot-bronze-light-12">
                    Your Rights
                  </h2>
                </div>
                <div className="space-y-4 text-bytebot-bronze-light-11">
                  <p>Under privacy laws, you have the right to:</p>
                  <ul className="space-y-2 ml-4">
                    <li>• Access your personal data</li>
                    <li>• Correct inaccurate data</li>
                    <li>• Request deletion of your data</li>
                    <li>• Export your data in a portable format</li>
                    <li>• Opt-out of marketing communications</li>
                    <li>• Restrict processing of your data</li>
                  </ul>
                  <p>
                    To exercise any of these rights, please contact our privacy team at{' '}
                    <a href="mailto:privacy@bytebot.ai" className="text-bytebot-bronze-dark-7 hover:underline">
                      privacy@bytebot.ai
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Data Retention */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-bytebot-bronze-light-3 rounded-lg text-bytebot-bronze-dark-7">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-semibold text-bytebot-bronze-light-12">
                    Data Retention & International Transfers
                  </h2>
                </div>
                <div className="space-y-4 text-bytebot-bronze-light-11">
                  <p>
                    We retain your personal information only for as long as necessary to provide our services
                    and fulfill the purposes outlined in this policy. Task execution data is retained for 30 days
                    for debugging purposes, after which it is automatically deleted.
                  </p>
                  <p>
                    Your information may be transferred to and processed in countries other than your own.
                    We ensure appropriate safeguards are in place to protect your information in accordance
                    with this privacy policy.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-bytebot-bronze-light-3 rounded-lg text-bytebot-bronze-dark-7">
                    <Eye className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-semibold text-bytebot-bronze-light-12">
                    Cookies and Tracking
                  </h2>
                </div>
                <div className="space-y-4 text-bytebot-bronze-light-11">
                  <p>
                    We use cookies and similar tracking technologies to improve your experience on our platform.
                    These include:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li>• Essential cookies for platform functionality</li>
                    <li>• Analytics cookies to understand usage patterns</li>
                    <li>• Preference cookies to remember your settings</li>
                  </ul>
                  <p>
                    You can control cookie preferences through your browser settings. Note that disabling
                    certain cookies may limit platform functionality.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="bg-bytebot-bronze-light-2">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-bytebot-bronze-light-3 rounded-lg text-bytebot-bronze-dark-7">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-semibold text-bytebot-bronze-light-12">
                    Contact Us
                  </h2>
                </div>
                <div className="space-y-4 text-bytebot-bronze-light-11">
                  <p>
                    If you have any questions about this Privacy Policy or our data practices,
                    please contact us:
                  </p>
                  <div className="space-y-2">
                    <p>
                      <strong>Email:</strong>{' '}
                      <a href="mailto:privacy@bytebot.ai" className="text-bytebot-bronze-dark-7 hover:underline">
                        privacy@bytebot.ai
                      </a>
                    </p>
                    <p>
                      <strong>Data Protection Officer:</strong>{' '}
                      <a href="mailto:dpo@bytebot.ai" className="text-bytebot-bronze-dark-7 hover:underline">
                        dpo@bytebot.ai
                      </a>
                    </p>
                    <p>
                      <strong>Address:</strong> Bytebot Inc., 123 Tech Street, San Francisco, CA 94105
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-12" />

          {/* Footer Note */}
          <div className="text-center text-sm text-bytebot-bronze-light-10">
            <p>
              This privacy policy is effective as of January 1, 2024 and will remain in effect except
              with respect to any changes in its provisions in the future, which will be in effect
              immediately after being posted on this page.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
