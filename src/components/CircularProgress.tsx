"use client"

import { motion } from "framer-motion"

interface CircularProgressProps {
  percent: number
  size?: number
  strokeWidth?: number
  totalSections?: number
  completedSections?: number
  gaps?: number
  underReview?: number
}

export default function CircularProgress({ 
  percent, 
  size = 120, 
  strokeWidth = 8,
  totalSections,
  completedSections,
  gaps = 0,
  underReview = 0
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (percent / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        aria-label={`${percent}% complete`}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#16A34A"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="square"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </svg>
      
      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-green-600 font-medium text-lg">
          {percent}%
        </span>
      </div>
    </div>
  )
}