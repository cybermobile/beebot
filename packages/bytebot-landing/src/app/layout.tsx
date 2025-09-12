import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bytebot - AI Desktop Automation',
  description: 'Automate your desktop tasks with AI-powered agents',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-bytebot-bronze-light-1`}>{children}</body>
    </html>
  )
}