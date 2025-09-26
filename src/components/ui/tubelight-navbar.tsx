"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon, Home as HomeIcon, Target, BarChart3, Circle, MessageSquare } from "lucide-react"
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
    { name: "Crisis", section: 3, icon: BarChart3 },
    { name: "Solution", section: 4, icon: Circle },
    { name: "Contact", section: 5, icon: MessageSquare },
  ]
  const [activeTab, setActiveTab] = useState(items[0].name)

  const scrollToSection = (sectionNumber: number) => {
    const windowHeight = window.innerHeight
    const targetScroll = (sectionNumber - 1) * windowHeight
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
