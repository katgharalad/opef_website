"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ReactNode, useEffect } from "react"
import { X, ExternalLink } from "lucide-react"

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  rulepackVersion?: string
  cfrCitation?: string
}

export default function Drawer({ isOpen, onClose, title, children, rulepackVersion, cfrCitation }: DrawerProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-[500px] bg-white border-l border-gray-300 z-50 shadow-[0_4px_6px_rgba(0,0,0,.1)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-3 border-b border-gray-300 bg-gray-50">
                <div>
                  <h2 id="drawer-title" className="text-gray-800 text-sm font-medium">
                    {title}
                  </h2>
                  {rulepackVersion && (
                    <p className="text-xs text-gray-600 mt-1">
                      Derived from {rulepackVersion} • {cfrCitation && (
                        <a 
                          href={`/cfr/${cfrCitation}`} 
                          className="text-blue-600 hover:underline font-mono"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          CFR {cfrCitation}
                        </a>
                      )}
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus:ring-1 focus:ring-gray-400 p-1"
                  aria-label="Close drawer"
                >
                  <X size={16} />
                </button>
              </div>
              
              {/* Content */}
              <div className="flex-1 overflow-y-auto p-3">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}