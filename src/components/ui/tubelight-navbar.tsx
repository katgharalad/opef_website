"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { LucideIcon, Home as HomeIcon, Target, AlertTriangle, Circle, Zap, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  section: number
  icon: LucideIcon
}

interface NavBarProps {
  className?: string
}

export function NavBar({ className }: NavBarProps) {
  const items: NavItem[] = React.useMemo(() => [
    { name: "Home", section: 1, icon: HomeIcon },
    { name: "OPEF", section: 2, icon: Target },
    { name: "Problem", section: 3, icon: AlertTriangle },
    { name: "Solution", section: 4, icon: Circle },
    { name: "Features", section: 5, icon: Zap },
    { name: "Contact", section: 6, icon: MessageSquare },
  ], [])
  const [activeTab, setActiveTab] = useState(items[0].name)
  const sectionsRef = useRef<HTMLElement[]>([])
  const targetsRef = useRef<number[]>([])

  // Build sections array and measure offsets
  const updateSections = () => {
    const sectionIds = ['section-1', 'section-2', 'section-3', 'section-4', 'section-5', 'section-6']
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    sectionsRef.current = sections
    targetsRef.current = sections.map(el => el.offsetTop)
  }

  useEffect(() => {
    // Initial setup
    updateSections()
    
    // Update on resize to handle dynamic content
    const handleResize = () => {
      updateSections()
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Use IntersectionObserver for accurate active section detection
  useEffect(() => {
    if (sectionsRef.current.length === 0) return

    const opts = { 
      root: null, 
      rootMargin: '0px 0px -40% 0px', 
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
    }
    
    const io = new IntersectionObserver(entries => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      
      if (visible) {
        const sectionId = visible.target.id
        const sectionNumber = parseInt(sectionId.split('-')[1])
        const item = items.find(item => item.section === sectionNumber)
        if (item) setActiveTab(item.name)
      }
    }, opts)

    sectionsRef.current.forEach(section => io.observe(section))
    return () => io.disconnect()
  }, [items])

  const scrollToSection = (sectionNumber: number) => {
    // Update sections before scrolling to ensure accurate positions
    updateSections()
    
    const sectionIndex = sectionNumber - 1
    const section = sectionsRef.current[sectionIndex]
    
    if (section) {
      // For OPEF (section 2), center it in viewport since it's fixed positioned
      if (sectionNumber === 2) {
        const y = section.offsetTop + section.offsetHeight / 2 - window.innerHeight / 2
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
      } else {
        // For other sections, scroll to their top
        window.scrollTo({ top: section.offsetTop, behavior: 'smooth' })
      }
    }
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 left-1/2 -translate-x-1/2 z-50 mb-6",
        className,
      )}
    >
      <div className="flex items-center gap-3 bg-white/10 border border-white/20 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <button
              key={item.name}
              onClick={() => {
                setActiveTab(item.name)
                scrollToSection(item.section)
              }}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-white/90 hover:text-white hover:bg-white/10",
                isActive && "bg-white/20 text-white",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-white/10 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-t-full">
                    <div className="absolute w-12 h-6 bg-white/30 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-white/30 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-white/30 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
