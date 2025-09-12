'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, FileText, Scale, AlertCircle, CreditCard, Shield, Ban, Gavel, Globe } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function TermsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const sections = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: "1. Acceptance of Terms",
      content: `By accessing or using Bytebot's desktop automation platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.

These Terms apply to all visitors, users, and others who access or use the Service. By using our Service, you represent that you are at least 18 years old and have the legal capacity to enter into these Terms.`
    },
    {
      icon: <Scale className="w-5 h-5" />,
      title: "2. Use License & Restrictions",
      content: `Subject to your compliance with these Terms, Bytebot grants you a limited, non-exclusive, non-transferable, revocable license to use the Service for your internal business purposes.

You agree NOT to:
• Use the Service for any illegal or unauthorized purpose
• Attempt to reverse engineer or decompile the Service
• Use the Service to violate any third-party rights
• Resell, sublicense, or distribute the Service
• Use automation to access other services without authorization
• Circumvent any usage limits or security measures`
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: "3. Subscription & Payment",
      content: `Billing Cycles: Subscription fees are billed in advance on a monthly or annual basis and are non-refundable except as required by law.

Auto-Renewal: Your subscription will automatically renew unless you cancel it before the renewal date. You may cancel anytime through your account settings.

Price Changes: We reserve the right to modify prices with 30 days' notice. Your continued use after price changes constitutes acceptance of the new pricing.

Free Trial: Free trial periods, if offered, automatically convert to paid subscriptions unless cancelled before the trial ends.`
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "4. Data Security & Privacy",
      content: `Your Data: You retain all rights to your data. We claim no ownership over any content you process through the Service.

Security: We implement industry-standard security measures to protect your data. However, no method of transmission over the Internet is 100% secure.

Compliance: You are responsible for ensuring your use of the Service complies with applicable laws and regulations, including data protection laws.

For more details, please review our Privacy Policy.`
    },
    {
      icon: <AlertCircle className="w-5 h-5" />,
      title: "5. Service Availability & Support",
      content: `Uptime: We strive for 99.9% uptime but do not guarantee uninterrupted access to the Service.

Modifications: We may modify or discontinue features with reasonable notice. Material changes will be communicated via email or in-app notifications.

Support: Support levels vary by subscription tier:
• Free: Community forum access
• Pro: Email support with 24-48 hour response
• Enterprise: Priority support with SLA guarantees`
    },
    {
      icon: <Ban className="w-5 h-5" />,
      title: "6. Prohibited Uses",
      content: `You may not use Bytebot to:
• Violate any laws or regulations
• Infringe on intellectual property rights
• Transmit malware or malicious code
• Engage in cryptocurrency mining
• Perform unauthorized penetration testing
• Scrape or access websites in violation of their terms
• Harass, abuse, or harm others
• Create multiple accounts to circumvent restrictions
• Share account credentials with unauthorized users`
    },
    {
      icon: <Gavel className="w-5 h-5" />,
      title: "7. Limitation of Liability",
      content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, BYTEBOT SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES.

OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU'VE PAID US IN THE TWELVE MONTHS PRIOR TO THE CLAIM.

THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.`
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "8. Governing Law & Disputes",
      content: `These Terms are governed by the laws of California, United States, without regard to conflict of law principles.

Arbitration: Any disputes shall be resolved through binding arbitration in San Francisco, California, except where prohibited by law.

Class Action Waiver: You agree to resolve disputes individually and waive any right to participate in class actions.

Severability: If any provision of these Terms is found unenforceable, the remaining provisions will continue in effect.`
    }
  ]

  const additionalTerms = [
    {
      title: "Intellectual Property",
      content: "All Service content, features, and functionality are owned by Bytebot and protected by international copyright, trademark, and other intellectual property laws."
    },
    {
      title: "Indemnification",
      content: "You agree to defend, indemnify, and hold Bytebot harmless from claims arising from your use of the Service or violation of these Terms."
    },
    {
      title: "Termination",
      content: "We may terminate or suspend your account immediately, without prior notice, for any breach of these Terms."
    },
    {
      title: "Changes to Terms",
      content: "We reserve the right to modify these Terms at any time. Continued use after changes constitutes acceptance of the modified Terms."
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
              <Scale className="w-8 h-8 text-bytebot-bronze-dark-7" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-bytebot-bronze-light-12">
              Terms of Service
            </h1>
            <p className="text-xl text-bytebot-bronze-light-11">
              Please read these terms carefully before using Bytebot
            </p>
            <p className="text-sm text-bytebot-bronze-light-10 mt-4">
              Effective Date: January 1, 2024 | Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* Important Notice */}
          <Card className="mb-8 border-amber-200 bg-amber-50">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-900">
                  <p className="font-semibold mb-2">Important Legal Notice</p>
                  <p>
                    These Terms of Service constitute a legally binding agreement between you and Bytebot Inc.
                    By using our Service, you acknowledge that you have read, understood, and agree to be bound
                    by these Terms.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-bytebot-bronze-light-3 rounded-lg text-bytebot-bronze-dark-7 flex-shrink-0">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-semibold text-bytebot-bronze-light-12">
                      {section.title}
                    </h2>
                  </div>
                  <div className="text-bytebot-bronze-light-11 whitespace-pre-line leading-relaxed">
                    {section.content}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Additional Terms */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold text-bytebot-bronze-light-12 mb-6">
                  Additional Terms
                </h2>
                <div className="space-y-6">
                  {additionalTerms.map((term, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-bytebot-bronze-light-12 mb-2">
                        {term.title}
                      </h3>
                      <p className="text-bytebot-bronze-light-11">
                        {term.content}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* DMCA Notice */}
            <Card className="bg-bytebot-bronze-light-2">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold text-bytebot-bronze-light-12 mb-4">
                  DMCA Notice
                </h2>
                <div className="space-y-4 text-bytebot-bronze-light-11">
                  <p>
                    If you believe that content available through the Service infringes your copyright,
                    please notify our copyright agent with the following information:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li>• Identification of the copyrighted work</li>
                    <li>• Identification of the infringing material</li>
                    <li>• Your contact information</li>
                    <li>• A statement of good faith belief</li>
                    <li>• A statement of accuracy and authority</li>
                  </ul>
                  <p>
                    Send DMCA notices to:{' '}
                    <a href="mailto:dmca@bytebot.ai" className="text-bytebot-bronze-dark-7 hover:underline">
                      dmca@bytebot.ai
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact for Terms */}
            <Card className="border-bytebot-bronze-dark-7">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold text-bytebot-bronze-light-12 mb-4">
                  Questions About These Terms?
                </h2>
                <div className="space-y-4 text-bytebot-bronze-light-11">
                  <p>
                    If you have any questions about these Terms of Service, please contact our legal team:
                  </p>
                  <div className="flex flex-col gap-2">
                    <p>
                      <strong>Email:</strong>{' '}
                      <a href="mailto:legal@bytebot.ai" className="text-bytebot-bronze-dark-7 hover:underline">
                        legal@bytebot.ai
                      </a>
                    </p>
                    <p>
                      <strong>Address:</strong> Bytebot Inc., Legal Department, 123 Tech Street, San Francisco, CA 94105
                    </p>
                  </div>
                  <Badge variant="outline" className="mt-2">
                    Response time: 2-3 business days
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-12" />

          {/* Agreement Footer */}
          <div className="text-center">
            <Card className="bg-gradient-to-br from-bytebot-bronze-dark-7 to-bytebot-bronze-dark-8 text-white">
              <CardContent className="py-8">
                <h3 className="text-xl font-semibold mb-4">
                  By using Bytebot, you agree to these Terms
                </h3>
                <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                  If you're using Bytebot on behalf of an organization, you're agreeing to these Terms
                  for that organization and warrant that you have the authority to do so.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button asChild size="lg" className="bg-white text-bytebot-bronze-dark-8 hover:bg-gray-100">
                    <Link href="http://localhost:9992/signup">
                      I Agree - Sign Up
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Link href="/">
                      Return to Home
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
