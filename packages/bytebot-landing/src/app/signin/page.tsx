'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Chrome,
  Github,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { useState, useEffect } from 'react'

export default function SignInPage() {
  const [mounted, setMounted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      setIsLoading(false)
      return
    }

    // In a real app, this would integrate with Clerk or your auth system
    // For now, we'll redirect to the main app after a delay
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Redirect to the main bytebot-ui app
      // In production, this would pass auth tokens or trigger Clerk signin
      window.location.href = 'http://localhost:9992'
    } catch (err) {
      setError('Invalid email or password')
      setIsLoading(false)
    }
  }

  const handleSocialSignIn = (provider: string) => {
    setIsLoading(true)
    // In production, this would trigger OAuth flow
    // For now, redirect to main app
    setTimeout(() => {
      window.location.href = 'http://localhost:9992'
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bytebot-bronze-light-1 to-bytebot-bronze-light-2 flex flex-col">
      {/* Simple Header */}
      <header className="p-6">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            {mounted && (
              <Image
                src="/beebot_transparent_logo_dark.svg"
                alt="Bytebot"
                width={100}
                height={30}
                className="h-8 w-auto"
              />
            )}
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Card className="shadow-xl">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-bytebot-bronze-light-12">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-bytebot-bronze-light-11">
                Sign in to your account to continue automating
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Social Sign In Options */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleSocialSignIn('google')}
                  disabled={isLoading}
                  className="relative"
                >
                  <Chrome className="w-4 h-4 mr-2" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSocialSignIn('github')}
                  disabled={isLoading}
                  className="relative"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-bytebot-bronze-light-10">
                    Or continue with email
                  </span>
                </div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-bytebot-bronze-light-12">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bytebot-bronze-light-10" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium text-bytebot-bronze-light-12">
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-bytebot-bronze-dark-7 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bytebot-bronze-light-10" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-bytebot-bronze-light-10 hover:text-bytebot-bronze-light-12"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              <div className="text-center text-sm">
                <span className="text-bytebot-bronze-light-11">
                  Don't have an account?{' '}
                </span>
                <Link
                  href="/signup"
                  className="text-bytebot-bronze-dark-7 hover:underline font-medium"
                >
                  Sign up free
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <p className="text-xs text-bytebot-bronze-light-10">
              By signing in, you agree to our{' '}
              <Link href="/terms" className="hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            </p>
          </div>

          {/* Features Reminder */}
          <Card className="mt-6 bg-bytebot-bronze-light-2 border-bytebot-bronze-light-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-bytebot-bronze-light-3 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-bytebot-bronze-light-12">
                  Your workspace is ready
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-bytebot-bronze-light-11">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Persistent desktop environment
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  All your automations saved
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Pick up where you left off
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
