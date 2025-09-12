'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Play,
  Pause,
  RotateCcw,
  Monitor,
  MousePointer,
  Keyboard,
  FileText,
  Download,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react'

interface AutomationStep {
  id: number
  action: 'screenshot' | 'click' | 'type' | 'scroll' | 'wait' | 'extract' | 'download'
  description: string
  target?: string
  value?: string
  duration: number
  x?: number
  y?: number
}

const automationScenarios = {
  dataEntry: {
    name: "Invoice Data Entry",
    description: "Extract data from PDF and enter into web form",
    steps: [
      { id: 1, action: 'screenshot', description: 'Taking screenshot of desktop', duration: 1000 },
      { id: 2, action: 'click', description: 'Opening invoice PDF', target: 'invoice.pdf', x: 120, y: 200, duration: 1500 },
      { id: 3, action: 'extract', description: 'Extracting invoice data using AI', duration: 2000 },
      { id: 4, action: 'click', description: 'Opening browser', target: 'Chrome', x: 50, y: 400, duration: 1000 },
      { id: 5, action: 'type', description: 'Navigating to ERP system', value: 'erp.company.com', duration: 2000 },
      { id: 6, action: 'click', description: 'Clicking invoice form', x: 300, y: 250, duration: 1000 },
      { id: 7, action: 'type', description: 'Entering invoice number', value: 'INV-2024-001', duration: 1500 },
      { id: 8, action: 'type', description: 'Entering amount', value: '$12,450.00', duration: 1500 },
      { id: 9, action: 'click', description: 'Submitting form', target: 'Submit', x: 400, y: 450, duration: 1000 },
      { id: 10, action: 'wait', description: 'Processing complete', duration: 1000 }
    ] as AutomationStep[]
  },
  webScraping: {
    name: "Competitor Price Monitoring",
    description: "Scrape prices from multiple websites and compile report",
    steps: [
      { id: 1, action: 'screenshot', description: 'Starting automation', duration: 1000 },
      { id: 2, action: 'click', description: 'Opening browser', target: 'Browser', x: 50, y: 400, duration: 1000 },
      { id: 3, action: 'type', description: 'Navigating to competitor site', value: 'competitor1.com', duration: 2000 },
      { id: 4, action: 'scroll', description: 'Scrolling to products', duration: 1500 },
      { id: 5, action: 'extract', description: 'Extracting product prices', duration: 2000 },
      { id: 6, action: 'type', description: 'Navigating to next competitor', value: 'competitor2.com', duration: 2000 },
      { id: 7, action: 'extract', description: 'Extracting more prices', duration: 2000 },
      { id: 8, action: 'click', description: 'Opening Excel', target: 'Excel', x: 120, y: 400, duration: 1000 },
      { id: 9, action: 'type', description: 'Creating price comparison report', duration: 2500 },
      { id: 10, action: 'download', description: 'Saving report', target: 'price_report.xlsx', duration: 1000 }
    ] as AutomationStep[]
  },
  emailProcessing: {
    name: "Email Attachment Processing",
    description: "Download attachments and organize into folders",
    steps: [
      { id: 1, action: 'screenshot', description: 'Starting email automation', duration: 1000 },
      { id: 2, action: 'click', description: 'Opening Outlook', target: 'Outlook', x: 80, y: 400, duration: 1500 },
      { id: 3, action: 'click', description: 'Selecting unread emails', x: 200, y: 180, duration: 1000 },
      { id: 4, action: 'extract', description: 'Reading email content', duration: 1500 },
      { id: 5, action: 'click', description: 'Downloading attachment', target: 'Download', x: 450, y: 220, duration: 1500 },
      { id: 6, action: 'download', description: 'Saving contract.pdf', target: 'contract.pdf', duration: 2000 },
      { id: 7, action: 'click', description: 'Opening file explorer', x: 160, y: 400, duration: 1000 },
      { id: 8, action: 'type', description: 'Creating organized folders', value: '2024/Contracts/', duration: 1500 },
      { id: 9, action: 'click', description: 'Moving files to folders', duration: 1500 },
      { id: 10, action: 'wait', description: 'Organization complete', duration: 1000 }
    ] as AutomationStep[]
  }
}

export function DesktopAutomationDemo() {
  const [selectedScenario, setSelectedScenario] = useState<keyof typeof automationScenarios>('dataEntry')
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [cursorPosition, setCursorPosition] = useState({ x: 200, y: 200 })

  const scenario = automationScenarios[selectedScenario]
  const currentStepData = scenario.steps[currentStep] || scenario.steps[0]

  useEffect(() => {
    if (!isPlaying || currentStep >= scenario.steps.length) {
      if (currentStep >= scenario.steps.length) {
        setTimeout(() => {
          setIsPlaying(false)
          setCurrentStep(0)
          setCompletedSteps([])
        }, 2000)
      }
      return
    }

    const step = scenario.steps[currentStep]

    // Update cursor position if step has coordinates
    if (step.x && step.y) {
      setCursorPosition({ x: step.x, y: step.y })
    }

    const timer = setTimeout(() => {
      setCompletedSteps(prev => [...prev, step.id])
      setCurrentStep(prev => prev + 1)
    }, step.duration)

    return () => clearTimeout(timer)
  }, [currentStep, isPlaying, scenario.steps])

  const startDemo = () => {
    setIsPlaying(true)
    setCurrentStep(0)
    setCompletedSteps([])
  }

  const pauseDemo = () => {
    setIsPlaying(false)
  }

  const resetDemo = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    setCompletedSteps([])
    setCursorPosition({ x: 200, y: 200 })
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'click': return <MousePointer className="w-4 h-4" />
      case 'type': return <Keyboard className="w-4 h-4" />
      case 'extract': return <FileText className="w-4 h-4" />
      case 'download': return <Download className="w-4 h-4" />
      case 'screenshot': return <Monitor className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="w-full space-y-6">
      {/* Scenario Selector */}
      <div className="flex flex-wrap gap-2 justify-center">
        {Object.entries(automationScenarios).map(([key, value]) => (
          <Button
            key={key}
            variant={selectedScenario === key ? "default" : "outline"}
            onClick={() => {
              resetDemo()
              setSelectedScenario(key as keyof typeof automationScenarios)
            }}
            className="text-sm"
          >
            {value.name}
          </Button>
        ))}
      </div>

      {/* Main Demo Area */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Desktop Preview */}
        <div className="lg:col-span-2">
          <Card className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="aspect-video relative">
              {/* Mock Desktop */}
              <div className="absolute inset-0 bg-white m-4 rounded-lg shadow-inner">
                {/* Window Header */}
                <div className="h-8 bg-gray-100 border-b rounded-t-lg flex items-center px-3 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <span className="text-xs text-gray-600 ml-2">Bytebot Desktop - {scenario.name}</span>
                </div>

                {/* Desktop Content */}
                <div className="p-4 h-[calc(100%-2rem)]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex items-center justify-center"
                    >
                      {/* Dynamic content based on current action */}
                      {currentStepData.action === 'extract' && (
                        <div className="text-center space-y-4">
                          <FileText className="w-16 h-16 mx-auto text-blue-500" />
                          <div className="text-sm text-gray-600">Extracting data with AI...</div>
                          <div className="w-48 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
                            <motion.div
                              className="h-full bg-blue-500"
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ duration: currentStepData.duration / 1000 }}
                            />
                          </div>
                        </div>
                      )}

                      {currentStepData.action === 'type' && (
                        <div className="w-full max-w-md">
                          <div className="border rounded px-3 py-2 bg-white">
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5 }}
                              className="text-sm font-mono"
                            >
                              {currentStepData.value}
                            </motion.span>
                            <span className="animate-pulse">|</span>
                          </div>
                        </div>
                      )}

                      {currentStepData.action === 'click' && (
                        <div className="relative w-full h-full">
                          <div className="absolute top-1/4 left-1/4 p-2 bg-blue-100 rounded">
                            <span className="text-xs">{currentStepData.target}</span>
                          </div>
                        </div>
                      )}

                      {currentStepData.action === 'download' && (
                        <div className="text-center space-y-4">
                          <Download className="w-16 h-16 mx-auto text-green-500" />
                          <div className="text-sm text-gray-600">Downloading {currentStepData.target}...</div>
                        </div>
                      )}

                      {currentStepData.action === 'screenshot' && (
                        <div className="text-center space-y-4">
                          <Monitor className="w-16 h-16 mx-auto text-purple-500" />
                          <div className="text-sm text-gray-600">Capturing screen...</div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Animated Cursor */}
              {isPlaying && (
                <motion.div
                  className="absolute z-20 pointer-events-none"
                  animate={{
                    x: cursorPosition.x,
                    y: cursorPosition.y,
                  }}
                  transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 300
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <path
                      d="M3 3l6 14 2-6 6-2L3 3z"
                      fill="currentColor"
                      className="text-bytebot-bronze-dark-7"
                      stroke="white"
                      strokeWidth="1"
                    />
                  </svg>
                  {currentStepData.action === 'click' && isPlaying && (
                    <motion.div
                      className="absolute top-2 left-2"
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-4 h-4 border-2 border-blue-500 rounded-full"></div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <Badge variant={isPlaying ? "default" : "secondary"} className="gap-1">
                  {isPlaying ? (
                    <>
                      <Zap className="w-3 h-3" />
                      Automating
                    </>
                  ) : (
                    <>
                      <Clock className="w-3 h-3" />
                      Ready
                    </>
                  )}
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Timeline */}
        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-2 text-sm">{scenario.description}</h3>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {scenario.steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-2 p-2 rounded text-xs ${
                    completedSteps.includes(step.id)
                      ? 'bg-green-50 text-green-700'
                      : currentStep === index
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-gray-50 text-gray-600'
                  }`}
                >
                  <div className="flex-shrink-0">
                    {completedSteps.includes(step.id) ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : currentStep === index && isPlaying ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Clock className="w-4 h-4 text-blue-600" />
                      </motion.div>
                    ) : (
                      getActionIcon(step.action)
                    )}
                  </div>
                  <span className="flex-1">{step.description}</span>
                  {step.value && (
                    <code className="text-xs bg-gray-100 px-1 rounded">{step.value}</code>
                  )}
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Controls */}
          <Card className="p-4">
            <div className="flex gap-2">
              {!isPlaying ? (
                <Button onClick={startDemo} className="flex-1" size="sm">
                  <Play className="w-4 h-4 mr-1" />
                  Start
                </Button>
              ) : (
                <Button onClick={pauseDemo} variant="secondary" className="flex-1" size="sm">
                  <Pause className="w-4 h-4 mr-1" />
                  Pause
                </Button>
              )}
              <Button onClick={resetDemo} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Step {currentStep + 1} of {scenario.steps.length}</span>
                <span>{Math.round((completedSteps.length / scenario.steps.length) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-bytebot-bronze-dark-7 to-bytebot-bronze-dark-9"
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedSteps.length / scenario.steps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
