"use client"

import React, { useState } from 'react'
import { ChevronDown, ChevronRight, ExternalLink, CheckCircle, AlertTriangle, Clock, Lock, CheckCircle2, AlertCircle } from 'lucide-react'

type Status = 'compliant' | 'gap' | 'review' | 'locked'

interface ChecklistRowProps {
  title: string
  status: Status
  citations: string[]
  children?: React.ReactNode
  onAction?: (action: string) => void
  lastAnalyzed?: string
  rulepackVersion?: string
}

export default function ChecklistRow({ 
  title, 
  status, 
  citations, 
  children, 
  onAction,
  lastAnalyzed,
  rulepackVersion 
}: ChecklistRowProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const statusConfig = {
    compliant: {
      color: 'text-green-700 bg-green-100 border-green-300',
      icon: CheckCircle2,
      label: 'Compliant',
      actionText: 'View evidence',
      indicator: 'success'
    },
    gap: {
      color: 'text-red-700 bg-red-100 border-red-300',
      icon: AlertCircle,
      label: 'Gap detected',
      actionText: 'Add section from template',
      indicator: 'alarm'
    },
    review: {
      color: 'text-gray-700 bg-gray-100 border-gray-300',
      icon: Clock,
      label: 'Under review',
      actionText: 'Request review',
      indicator: 'pending'
    },
    locked: {
      color: 'text-gray-500 bg-gray-50 border-gray-200',
      icon: Lock,
      label: 'Locked',
      actionText: 'Mark as compliant',
      indicator: 'locked'
    }
  }

  const config = statusConfig[status]
  const Icon = config.icon

  const handleAction = () => {
    if (onAction) {
      onAction(config.actionText)
    }
  }

  return (
    <section className="border border-gray-300 bg-white shadow-[0_1px_3px_rgba(0,0,0,.1)]">
      <header className="flex items-center justify-between p-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          {/* Professional UI Indicator */}
          <div className={`w-2 h-6 ${
            config.indicator === 'success' ? 'bg-green-600' :
            config.indicator === 'alarm' ? 'bg-red-600' :
            config.indicator === 'pending' ? 'bg-gray-400' :
            'bg-gray-300'
          }`}></div>
          <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium border ${config.color}`}>
            <Icon className="h-3 w-3" />
            {config.label}
          </span>
          <h3 className="text-sm font-medium text-gray-800">{title}</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {citations.map(citation => (
              <a 
                key={citation} 
                href={`/cfr/${citation}`} 
                className="text-blue-600 text-xs hover:underline font-mono"
                rel="noopener noreferrer"
                target="_blank"
              >
                CFR {citation}
              </a>
            ))}
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          </button>
        </div>
      </header>
      
      {isExpanded && (
        <div className="border-t border-gray-200 p-3 space-y-3">
          {children}
          
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-500">
              {lastAnalyzed && `Analyzed ${lastAnalyzed}`}
              {rulepackVersion && ` • ${rulepackVersion} rulepack`}
            </div>
            
            <button
              onClick={handleAction}
              className="px-2 py-1 text-xs font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-300 transition-colors"
            >
              {config.actionText}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
