'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface CursorStep {
  x: number
  y: number
  action?: 'click' | 'type' | 'hover'
  delay?: number
  text?: string
}

const demoSteps: CursorStep[] = [
  { x: 50, y: 80, action: 'hover', delay: 1 },
  { x: 150, y: 120, action: 'click', delay: 2 },
  { x: 200, y: 160, action: 'type', text: 'AI automation', delay: 2.5 },
  { x: 320, y: 200, action: 'click', delay: 1.5 },
  { x: 100, y: 240, action: 'hover', delay: 2 },
  { x: 250, y: 100, action: 'click', delay: 1.5 },
]

export function AnimatedCursorDemo() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [typedText, setTypedText] = useState('')

  const startDemo = () => {
    setIsPlaying(true)
    setCurrentStep(0)
    setTypedText('')
  }

  const resetDemo = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    setTypedText('')
  }

  useEffect(() => {
    if (!isPlaying || currentStep >= demoSteps.length) {
      if (currentStep >= demoSteps.length) {
        setTimeout(() => resetDemo(), 2000)
      }
      return
    }

    const step = demoSteps[currentStep]
    const timer = setTimeout(() => {
      if (step.action === 'type' && step.text) {
        // Simulate typing effect
        let i = 0
        const typeTimer = setInterval(() => {
          if (i <= step.text!.length) {
            setTypedText(step.text!.slice(0, i))
            i++
          } else {
            clearInterval(typeTimer)
            setTimeout(() => setCurrentStep(prev => prev + 1), 500)
          }
        }, 100)
      } else {
        setCurrentStep(prev => prev + 1)
      }
    }, (step.delay || 1) * 1000)

    return () => clearTimeout(timer)
  }, [currentStep, isPlaying])

  const currentStepData = demoSteps[Math.min(currentStep, demoSteps.length - 1)]

  return (
    <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 overflow-hidden min-h-[400px] border">
      {/* Mock Desktop Interface */}
      <div className="absolute inset-4 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Mock Window Header */}
        <div className="h-8 bg-gray-100 border-b flex items-center px-4 gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <span className="ml-4 text-sm text-gray-600">Desktop Automation Demo</span>
        </div>

        {/* Mock Interface Elements */}
        <div className="p-6 space-y-4">
          <div className="flex gap-4">
            <div className="w-20 h-8 bg-blue-100 rounded border flex items-center justify-center text-xs">
              Button 1
            </div>
            <div className="w-20 h-8 bg-green-100 rounded border flex items-center justify-center text-xs">
              Button 2
            </div>
          </div>
          
          <div className="w-48 h-8 border rounded px-3 flex items-center text-sm text-gray-700">
            {typedText || 'Input field...'}
            {currentStepData?.action === 'type' && isPlaying && (
              <span className="ml-1 animate-pulse">|</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="h-16 bg-gray-50 border rounded flex items-center justify-center text-sm text-gray-500">
              Element A
            </div>
            <div className="h-16 bg-gray-50 border rounded flex items-center justify-center text-sm text-gray-500">
              Element B
            </div>
          </div>
        </div>
      </div>

      {/* Animated Cursor */}
      {isPlaying && (
        <motion.div
          className="absolute w-6 h-6 pointer-events-none z-10"
          animate={{
            x: currentStepData.x,
            y: currentStepData.y,
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut"
          }}
        >
          {/* Cursor Icon */}
          <motion.div
            className="relative"
            animate={{
              scale: currentStepData.action === 'click' ? [1, 0.8, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-bytebot-bronze-dark-7"
            >
              <path
                d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"
                fill="currentColor"
                stroke="white"
                strokeWidth="1"
              />
            </svg>
          </motion.div>

          {/* Click Effect */}
          {currentStepData.action === 'click' && isPlaying && (
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-8 h-8 border-2 border-blue-400 rounded-full"></div>
            </motion.div>
          )}

          {/* Hover Effect */}
          {currentStepData.action === 'hover' && isPlaying && (
            <motion.div
              className="absolute -top-2 -left-2 w-8 h-8 bg-blue-400/20 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.div>
      )}

      {/* Controls */}
      <div className="absolute bottom-4 left-4 flex gap-2">
        {!isPlaying ? (
          <motion.button
            onClick={startDemo}
            className="px-4 py-2 bg-bytebot-bronze-dark-7 text-white rounded-lg text-sm hover:bg-bytebot-bronze-dark-8 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ▶ Start Demo
          </motion.button>
        ) : (
          <motion.button
            onClick={resetDemo}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ⏹ Reset
          </motion.button>
        )}
      </div>

      {/* Status Indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2 text-sm text-gray-600">
        <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
        {isPlaying ? 'Automating...' : 'Ready'}
      </div>
    </div>
  )
}