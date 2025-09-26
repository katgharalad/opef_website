"use client"

import { Upload, ListChecks, Gauge, MessageSquare, ScrollText } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const buttons = [
  {
    label: "Ingestion",
    href: "/page1/ingestion-pipeline",
    icon: Upload
  },
  {
    label: "Critique Agent",
    href: "/page2/compliance-critique",
    icon: ListChecks
  },
  {
    label: "Dashboard",
    href: "/page3/ai-dashboard",
    icon: Gauge
  },
  {
    label: "Comments",
    href: "/page4/public-comments",
    icon: MessageSquare
  },
  {
    label: "Audit Log",
    href: "/page5/audit-log",
    icon: ScrollText
  }
]

export default function TopRightButtons() {
  return (
    <div className="fixed top-6 right-6 z-40 flex flex-col gap-3">
      {buttons.map((button, index) => {
        const Icon = button.icon
        return (
          <motion.div
            key={button.href}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              href={button.href}
              className="group flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-lg rounded-full px-4 py-2 text-sm text-white hover:bg-white/15 hover:-translate-y-[1px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label={`Navigate to ${button.label}`}
            >
              <Icon size={16} className="group-hover:scale-110 transition-transform duration-300" />
              <span className="font-clash">{button.label}</span>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
