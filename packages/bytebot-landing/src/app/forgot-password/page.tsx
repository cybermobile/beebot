'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  ArrowLeft,
  Mail,
  Loader2,
  CheckCircle,
  AlertCircle,
  KeyRound,
  Info
} from 'lucide-react'
import { useState, useEffect } from 'react'

export default function ForgotPasswordPage() {
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Basic validation
    if (!email) {
      setError('Please enter your email address')
      setIsLoading(false)
      return
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address')
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Show success state
      setIsSubmitted(true)
      setIsLoading(false)
    } catch (err) {
      setError('Failed to send reset email. Please try again.')
      setIsLoading(false)
    }
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
            <Link href="/signin">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign In
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Card className="shadow-xl">
            <CardHeader className="space-y-1 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-bytebot-bronze-light-3 rounded-full mb-4 mx-auto">
                <KeyRound className="w-6 h-6 text-bytebot-bronze-dark-7" />
              </div>
              <CardTitle className="text-2xl font-bold text-bytebot-bronze-light-12">
                Reset Your Password
              </CardTitle>
              <CardDescription className="text-bytebot-bronze-light-11">
                {isSubmitted
                  ? "Check your email for reset instructions"
                  : "Enter your email and we'll send you a reset link"
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isSubmitted ? (
                <>
                  {/* Reset Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-bytebot-bronze-light-12">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bytebot-bronze-light-10" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@company.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                            if (error) setError('')
                          }}
                          disabled={isLoading}
                          className="pl-10"
                          required
                        />
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
                          Sending reset link...
                        </>
                      ) : (
                        'Send Reset Link'
                      )}
                    </Button>
                  </form>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-bytebot-bronze-light-10">
                        Or
                      </span>
                    </div>
                  </div>

                  <div className="text-center space-y-2">
                    <Link
                      href="/signin"
                      className="text-sm text-bytebot-bronze-dark-7 hover:underline font-medium"
                    >
                      Return to Sign In
                    </Link>
                    <div className="text-sm text-bytebot-bronze-light-11">
                      Don't have an account?{' '}
                      <Link
                        href="/signup"
                        className="text-bytebot-bronze-dark-7 hover:underline font-medium"
                      >
                        Sign up free
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Success State */}
                  <div className="text-center py-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-bytebot-bronze-light-12 mb-2">
                      Reset Link Sent!
                    </h3>
                    <p className="text-sm text-bytebot-bronze-light-11 mb-6">
                      We've sent a password reset link to:
                    </p>
                    <div className="p-3 bg-bytebot-bronze-light-2 rounded-lg mb-6">
                      <p className="font-mono text-sm text-bytebot-bronze-light-12">
                        {email}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <Button asChild className="w-full">
                        <Link href="/signin">
                          Return to Sign In
                        </Link>
                      </Button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubmitted(false)
                          setEmail('')
                        }}
                        className="text-sm text-bytebot-bronze-dark-7 hover:underline"
                      >
                        Didn't receive the email? Try again
                      </button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Help Information */}
          <Card className="mt-6 bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-2 text-sm">
                  <p className="font-medium text-blue-900">
                    Password Reset Tips:
                  </p>
                  <ul className="space-y-1 text-blue-800">
                    <li>• Check your spam folder if you don't see the email</li>
                    <li>• The reset link expires in 1 hour</li>
                    <li>• You can request a new link if needed</li>
                    <li>• Contact support if you continue having issues</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-bytebot-bronze-light-10">
              Need help?{' '}
              <Link href="/contact" className="text-bytebot-bronze-dark-7 hover:underline font-medium">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
