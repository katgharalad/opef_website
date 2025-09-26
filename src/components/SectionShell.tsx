"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface SectionShellProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export default function SectionShell({ title, subtitle, children }: SectionShellProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-clash mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl text-white/80 font-clash">
              {subtitle}
            </p>
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}