"use client"

import { motion } from "framer-motion"

interface ProgressStepperProps {
  steps: { label: string; status: "pending" | "active" | "done" }[]
}

export default function ProgressStepper({ steps }: ProgressStepperProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-gray-600 text-sm">
        <span>Progress</span>
        <span>{Math.round((steps.filter(s => s.status === "done").length / steps.length) * 100)}%</span>
      </div>
      
      <div className="space-y-2">
        {steps.map((step, index) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0.3 }}
            animate={{ 
              opacity: step.status === "pending" ? 0.3 : 1,
              scale: step.status === "active" ? 1.05 : 1
            }}
            transition={{ duration: 0.3 }}
            className={`flex items-center gap-2 p-2 transition-all duration-300 min-h-[32px] ${
              step.status === "pending" 
                ? 'bg-gray-50 border border-gray-200' 
                : 'bg-white border border-gray-300'
            }`}
          >
            <div 
              className={`w-4 h-4 flex items-center justify-center ${
                step.status === "done" 
                  ? 'bg-gray-600' 
                  : step.status === "active" 
                    ? 'bg-gray-500' 
                    : 'bg-gray-300'
              }`}
              aria-current={step.status === "active" ? "step" : undefined}
            >
              {step.status === "done" ? (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <span className="text-white text-xs font-bold">{index + 1}</span>
              )}
            </div>
            <span className="text-gray-800 text-xs flex-1 truncate">{step.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
