"use client"

import React, { useState, useEffect } from "react"
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
  const items: NavItem[] = [
    { name: "Home", section: 1, icon: HomeIcon },
    { name: "OPEF", section: 2, icon: Target },
    { name: "Problem", section: 3, icon: AlertTriangle },
    { name: "Solution", section: 4, icon: Circle },
    { name: "Features", section: 5, icon: Zap },
    { name: "Contact", section: 6, icon: MessageSquare },
  ]
  const [activeTab, setActiveTab] = useState(items[0].name)

  // Update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      if (scrollY < windowHeight * 0.5) {
        setActiveTab("Home")
      } else if (scrollY < windowHeight * 3.0) {
        setActiveTab("OPEF")
      } else if (scrollY < windowHeight * 5.5) {
        setActiveTab("Problem")
      } else if (scrollY < windowHeight * 6.5) {
        setActiveTab("Solution")
      } else if (scrollY < windowHeight * 7.5) {
        setActiveTab("Features")
      } else {
        setActiveTab("Contact")
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionNumber: number) => {
    const windowHeight = window.innerHeight
    let targetScroll = 0
    
    switch(sectionNumber) {
      case 1: targetScroll = 0; break
      case 2: targetScroll = windowHeight * 0.5; break
      case 3: targetScroll = windowHeight * 3.0; break // Problem section
      case 4: targetScroll = windowHeight * 5.5; break // Solution section (Circular Reveal)
      case 5: targetScroll = windowHeight * 6.5; break // Features section (Horizontal Carousel)
      case 6: targetScroll = windowHeight * 7.5; break // Contact section (CTA)
      default: targetScroll = (sectionNumber - 1) * windowHeight
    }
    
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    })
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
