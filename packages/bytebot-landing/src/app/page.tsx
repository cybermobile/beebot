"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DesktopAutomationDemo } from "@/components/DesktopAutomationDemo";
import {
  ArrowUp,
  Check,
  Star,
  Users,
  Zap,
  Shield,
  Clock,
  Globe,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-bytebot-bronze-light-1">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-bytebot-bronze-light-1/95 backdrop-blur-md border-b border-bytebot-bronze-light-6/20">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {mounted && (
              <Image
                src="/beebot_transparent_logo_dark.svg"
                alt="Bytebot"
                width={100}
                height={30}
                className="h-8 w-auto"
              />
            )}
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-bytebot-bronze-light-11 hover:text-bytebot-bronze-light-12"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-bytebot-bronze-light-11 hover:text-bytebot-bronze-light-12"
            >
              Pricing
            </Link>
            <Button asChild>
              <Link href="/signin">Launch App</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-bytebot-bronze-light-12">
            Automate Your Desktop
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-bytebot-bronze-dark-9 to-bytebot-bronze-dark-7">
              with AI-Powered
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-bytebot-bronze-light-11 max-w-3xl mx-auto">
            Let AI handle your repetitive desktop tasks so you can focus on what
            matters most. From data entry to complex workflows, Bytebot
            automates it all.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#demo">Watch Demo</Link>
            </Button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-bytebot-bronze-dark-7 mb-2">
                10K+
              </div>
              <div className="text-bytebot-bronze-light-11">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-bytebot-bronze-dark-7 mb-2">
                2.5M
              </div>
              <div className="text-bytebot-bronze-light-11">
                Tasks Automated
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-bytebot-bronze-dark-7 mb-2">
                99.9%
              </div>
              <div className="text-bytebot-bronze-light-11">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why a Desktop Agent Section */}
      <section className="py-16 px-6 bg-bytebot-bronze-light-2">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-bytebot-bronze-light-12">
            Why a Desktop Agent?
          </h2>

          <Tabs defaultValue="efficiency" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
              <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
              <TabsTrigger value="scalability">Scalability</TabsTrigger>
              <TabsTrigger value="integration">Integration</TabsTrigger>
            </TabsList>

            <TabsContent value="efficiency" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-bytebot-bronze-light-12">
                    10x Faster Than Manual Work
                  </CardTitle>
                  <CardDescription>
                    Desktop agents can perform repetitive tasks in seconds that
                    would take humans hours. From data entry to complex
                    workflows, automation speeds up everything.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Process thousands of records in minutes</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Run tasks 24/7 without breaks</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Parallel processing of multiple tasks</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="accuracy" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-bytebot-bronze-light-12">
                    99.9% Accuracy Rate
                  </CardTitle>
                  <CardDescription>
                    Eliminate human error from your workflows. AI agents follow
                    exact instructions every time, ensuring consistent and
                    accurate results.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Zero typos or data entry mistakes</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Consistent execution every time</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Built-in validation and error checking</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scalability" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-bytebot-bronze-light-12">
                    Scale Without Hiring
                  </CardTitle>
                  <CardDescription>
                    Handle growing workloads without expanding your team. AI
                    agents scale instantly to meet demand, from 10 tasks to
                    10,000 instantly.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>No training or onboarding needed</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Instant capacity when you need it</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Cost-effective growth solution</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integration" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-bytebot-bronze-light-12">
                    Works With Any Software
                  </CardTitle>
                  <CardDescription>
                    Unlike APIs, desktop agents work with any application on
                    your computer, even legacy systems and proprietary software
                    without integrations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>No API or integration required</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Works with legacy and modern apps</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Cross-platform compatibility</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Desktop Automation Demo Section */}
      <section id="demo" className="py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-bytebot-bronze-light-12">
            See Desktop Automation in Action
          </h2>
          <p className="text-xl mb-12 text-bytebot-bronze-light-11 max-w-3xl mx-auto">
            Watch our AI agent demonstrates automated cursor movements and
            interactions, showcasing how Bytebot can handle complex desktop
            tasks seamlessly.
          </p>
          <DesktopAutomationDemo />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 bg-bytebot-bronze-light-2">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-bytebot-bronze-light-12">
            Powerful Features for Every Need
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="text-4xl mb-4">🤖</div>
                <CardTitle>AI-Powered Automation</CardTitle>
                <CardDescription>
                  Advanced AI models understand your tasks and execute them
                  flawlessly, learning from your patterns to improve over time.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="text-4xl mb-4">🖥️</div>
                <CardTitle>Desktop Control</CardTitle>
                <CardDescription>
                  Complete control over mouse, keyboard, and screen
                  interactions. Works with any application seamlessly.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="text-4xl mb-4">⚡</div>
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Execute tasks at superhuman speed with parallel processing and
                  optimized workflows that save hours every day.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="text-4xl mb-4">📅</div>
                <CardTitle>Smart Scheduling</CardTitle>
                <CardDescription>
                  Schedule tasks to run automatically at specific times or
                  trigger them based on events and conditions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="text-4xl mb-4">📊</div>
                <CardTitle>Real-time Monitoring</CardTitle>
                <CardDescription>
                  Watch your tasks execute in real-time with detailed logging
                  and performance metrics.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="text-4xl mb-4">🔒</div>
                <CardTitle>Enterprise Security</CardTitle>
                <CardDescription>
                  Bank-level encryption, SOC 2 compliance, and complete data
                  privacy to keep your automation secure.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-bytebot-bronze-light-12">
            Simple, Transparent Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <div className="text-4xl font-bold mb-2">
                  $0
                  <span className="text-lg font-normal opacity-90">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-bytebot-bronze-light-11">
                      5 tasks per month
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-bytebot-bronze-light-11">
                      Basic AI models
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-bytebot-bronze-light-11">
                      Community support
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-bytebot-bronze-light-11">
                      Basic automation features
                    </span>
                  </li>
                </ul>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-bytebot-bronze-dark-7 to-bytebot-bronze-dark-8 text-white relative">
              <Badge className="absolute top-4 right-4 bg-yellow-500 text-black">
                POPULAR
              </Badge>
              <CardHeader>
                <CardTitle className="text-white">Pro</CardTitle>
                <div className="text-4xl font-bold mb-2">
                  $29
                  <span className="text-lg font-normal opacity-90">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span className="opacity-90">Unlimited tasks</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span className="opacity-90">
                      Advanced AI models (GPT-4, Claude)
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span className="opacity-90">Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span className="opacity-90">Advanced scheduling</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span className="opacity-90">API access</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span className="opacity-90">Team collaboration</span>
                  </li>
                </ul>
                <Button
                  asChild
                  className="w-full bg-white text-bytebot-bronze-dark-8 hover:bg-gray-100"
                >
                  <Link href="/signup">Start Free Trial</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-bytebot-bronze-light-12">
            Trusted by Teams Worldwide
          </h2>
          <p className="text-center text-bytebot-bronze-light-11 mb-12 max-w-3xl mx-auto">
            See what our users are saying about how Bytebot transformed their
            workflows
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-bytebot-bronze-light-2">
              <CardHeader>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-bytebot-bronze-light-12">
                      John Doe
                    </p>
                    <p className="text-sm text-bytebot-bronze-light-11">
                      CEO at TechCorp
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-bytebot-bronze-light-11">
                  "Bytebot has revolutionized our data entry process. What used
                  to take hours now takes minutes. The ROI has been incredible."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-bytebot-bronze-light-2">
              <CardHeader>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-bytebot-bronze-light-12">
                      Sarah Miller
                    </p>
                    <p className="text-sm text-bytebot-bronze-light-11">
                      Operations Manager
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-bytebot-bronze-light-11">
                  "The ability to automate across different applications without
                  APIs is game-changing. We've automated workflows we thought
                  were impossible."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-bytebot-bronze-light-2">
              <CardHeader>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-bytebot-bronze-light-12">
                      Alex Chen
                    </p>
                    <p className="text-sm text-bytebot-bronze-light-11">
                      Data Analyst
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-bytebot-bronze-light-11">
                  "Bytebot's AI understands complex instructions perfectly. It's
                  like having a super-efficient assistant that never makes
                  mistakes."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-bytebot-bronze-light-2">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-bytebot-bronze-light-12">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-bytebot-bronze-light-12">
                How does Bytebot differ from traditional RPA tools?
              </AccordionTrigger>
              <AccordionContent className="text-bytebot-bronze-light-11">
                Unlike traditional RPA tools that require complex scripting and
                rigid workflows, Bytebot uses AI to understand natural language
                instructions. You simply describe what you want done, and our AI
                figures out how to do it. No coding required.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-bytebot-bronze-light-12">
                Is my data secure with Bytebot?
              </AccordionTrigger>
              <AccordionContent className="text-bytebot-bronze-light-11">
                Absolutely. We use bank-level encryption for all data transfers
                and storage. Bytebot runs in isolated environments, and we're
                SOC 2 Type II compliant. Your data never leaves your control,
                and you can self-host for complete privacy.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-bytebot-bronze-light-12">
                What applications can Bytebot automate?
              </AccordionTrigger>
              <AccordionContent className="text-bytebot-bronze-light-11">
                Bytebot can automate any desktop application - from web browsers
                and Microsoft Office to specialized software and legacy systems.
                If you can use it with a mouse and keyboard, Bytebot can
                automate it.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-bytebot-bronze-light-12">
                How long does it take to set up automation?
              </AccordionTrigger>
              <AccordionContent className="text-bytebot-bronze-light-11">
                You can start automating in minutes. Simply sign up, describe
                your task in plain English, and watch Bytebot get to work. No
                installation, configuration, or training required. Most users
                create their first automation within 5 minutes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-bytebot-bronze-light-12">
                Can I try Bytebot before committing to a paid plan?
              </AccordionTrigger>
              <AccordionContent className="text-bytebot-bronze-light-11">
                Yes! We offer a generous free plan with 5 tasks per month,
                perfect for testing our capabilities. Plus, our Pro plan comes
                with a 14-day free trial - no credit card required. You can
                cancel anytime.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-bytebot-bronze-light-12">
                What kind of support do you offer?
              </AccordionTrigger>
              <AccordionContent className="text-bytebot-bronze-light-11">
                Free users get access to our community forum and documentation.
                Pro users receive priority email support with 24-hour response
                times. Enterprise customers get dedicated support with SLAs and
                a customer success manager.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-bytebot-bronze-dark-7 to-bytebot-bronze-dark-8 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">
            Ready to Automate Your Workflow?
          </h2>
          <p className="text-xl mb-12 text-white/90 max-w-3xl mx-auto">
            Join thousands of users who are saving hours every day with
            AI-powered desktop automation. Start your free trial today - no
            credit card required.
          </p>
          <Button
            asChild
            size="lg"
            className="text-lg px-8 py-6 bg-white text-bytebot-bronze-dark-8 hover:bg-gray-100"
          >
            <Link href="/signup">Get Started Free</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bytebot-bronze-light-3 py-12 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              {mounted && (
                <Image
                  src="/beebot_transparent_logo_dark.svg"
                  alt="Bytebot"
                  width={100}
                  height={30}
                  className="h-8 w-auto"
                />
              )}
            </div>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-bytebot-bronze-light-11 hover:text-bytebot-bronze-light-12"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-bytebot-bronze-light-11 hover:text-bytebot-bronze-light-12"
              >
                Terms
              </Link>
              <Link
                href="/contact"
                className="text-bytebot-bronze-light-11 hover:text-bytebot-bronze-light-12"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="text-center text-bytebot-bronze-light-11 mt-8">
            © 2024 Bytebot. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && mounted && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-bytebot-bronze-dark-7 hover:bg-bytebot-bronze-dark-8 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-bytebot-bronze-dark-7 focus:ring-offset-2"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
