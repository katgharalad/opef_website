"use client"

import Image from "next/image"
import { useState } from "react"
import { CheckCircle, AlertTriangle, Clock, Lock, ExternalLink, FileText, Download, Calendar, Bell, User } from "lucide-react"
import CircularProgress from "@/components/CircularProgress"
import ChecklistRow from "@/components/ChecklistRow"
import Drawer from "@/components/Drawer"

export default function AIDashboard() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [draftSections, setDraftSections] = useState<string[]>([])

  const handleScaffoldAction = (action: string) => {
    if (action === 'Add section from template') {
      setIsDrawerOpen(true)
    }
  }

  const handleAcceptScaffold = () => {
    setDraftSections(prev => [...prev, "Mitigation Summary"])
    setIsDrawerOpen(false)
  }

  const activeIssues = [
    "Mitigation measures incomplete.",
    "Public participation notice not scheduled."
  ]

  const timelineMilestones = [
    { phase: "Scoping", dueDate: "2025-02-15", status: "completed" },
    { phase: "Draft EA", dueDate: "2025-04-30", status: "current" },
    { phase: "Public Comment", dueDate: "2025-06-15", status: "upcoming" },
    { phase: "Final EA", dueDate: "2025-08-30", status: "upcoming" }
  ]

  const reviewers = [
    { name: "Sarah Chen", role: "Lead Reviewer", avatar: "SC" },
    { name: "Michael Torres", role: "Environmental Specialist", avatar: "MT" },
    { name: "Dr. Lisa Park", role: "Technical Advisor", avatar: "LP" }
  ]

  const notifications = [
    "EJ guidance updated — recheck required.",
    "Rulepack v2025.06 applied to this project."
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Project Banner */}
        <div className="border border-gray-300 bg-gray-50 p-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white border border-gray-200 overflow-hidden">
                <Image 
                  src="/opef-logo-final.svg" 
                  alt="OPEF Logo" 
                  width={64} 
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-lg font-medium text-gray-800">DOE Solar Project EA</h1>
                <p className="text-sm text-gray-600">v0.3 Draft • Analyzed 394 sections in 12s (DOE v2025.06 rulepack)</p>
              </div>
            </div>
            <button className="flex items-center gap-2 bg-gray-700 text-white px-3 py-2 hover:bg-gray-800 transition-colors border border-gray-800">
              <Download className="h-4 w-4" />
              Export Audit Report
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Compliance Checklist */}
          <div className="lg:col-span-2 space-y-3">
            <ChecklistRow
              title="Purpose & Need"
              status="compliant"
              citations={["§1502.13"]}
              lastAnalyzed="12 seconds ago"
              rulepackVersion="DOE v2025.06"
            >
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-800">
                  Section meets all requirements per CFR §1502.13. Purpose clearly stated with supporting documentation.
                </p>
                <div className="mt-2 flex gap-2">
                  <span className="inline-block px-2 py-1 bg-green-100 border border-green-200 rounded text-green-800 text-xs">
                    CFR §1502.13
                  </span>
                  <span className="inline-block px-2 py-1 bg-blue-100 border border-blue-200 rounded text-blue-800 text-xs">
                    4 sources attached
                  </span>
                </div>
              </div>
            </ChecklistRow>

            <ChecklistRow
              title="Alternatives"
              status="compliant"
              citations={["§1502.14"]}
              lastAnalyzed="12 seconds ago"
              rulepackVersion="DOE v2025.06"
            >
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-800">
                  Alternatives analysis comprehensive with no-action alternative included per CFR §1502.14.
                </p>
                <div className="mt-2 flex gap-2">
                  <span className="inline-block px-2 py-1 bg-green-100 border border-green-200 rounded text-green-800 text-xs">
                    CFR §1502.14
                  </span>
                  <span className="inline-block px-2 py-1 bg-blue-100 border border-blue-200 rounded text-blue-800 text-xs">
                    3 sources attached
                  </span>
                </div>
              </div>
            </ChecklistRow>

            <ChecklistRow
              title="Mitigation Summary"
              status="gap"
              citations={["§1502.16"]}
              lastAnalyzed="12 seconds ago"
              rulepackVersion="DOE v2025.06"
              onAction={handleScaffoldAction}
            >
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-md">
                <p className="text-sm text-orange-800">
                  Gap detected: template contains required mitigation summary per §1502.16.
                </p>
                <div className="mt-3 p-3 bg-white border border-orange-200 rounded-md">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Mitigation measures should include: monitoring protocols, enforcement mechanisms, and adaptive management strategies proportionate to identified impacts. Specify responsible entities, measurable performance standards, implementation timelines, and triggers for corrective action. Reference best-available data sources and describe how measures will be verified and reported.
                  </p>
                  <div className="mt-2">
                    <span className="inline-block px-2 py-1 bg-blue-100 border border-blue-200 rounded text-blue-800 text-xs">
                      CFR §1502.16
                    </span>
                  </div>
                </div>
              </div>
            </ChecklistRow>

            <ChecklistRow
              title="Citations"
              status="compliant"
              citations={["§1502.13", "§1502.14", "§1502.16"]}
              lastAnalyzed="12 seconds ago"
              rulepackVersion="DOE v2025.06"
            >
              <div className="p-3 bg-gray-50 border border-gray-300">
                <p className="text-xs text-gray-700">
                  All required citations properly formatted and linked to CFR sections.
                </p>
                <div className="mt-2 flex gap-2">
                  <span className="inline-block px-2 py-1 bg-gray-100 border border-gray-300 text-gray-700 text-xs">
                    CFR §1502.13
                  </span>
                  <span className="inline-block px-2 py-1 bg-gray-100 border border-gray-300 text-gray-700 text-xs">
                    CFR §1502.14
                  </span>
                  <span className="inline-block px-2 py-1 bg-gray-100 border border-gray-300 text-gray-700 text-xs">
                    CFR §1502.16
                  </span>
                </div>
              </div>
            </ChecklistRow>

            {/* Draft Sections */}
            {draftSections.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-md p-4 shadow-[0_1px_2px_rgba(0,0,0,.06),0_8px_24px_rgba(0,0,0,.04)]">
                <h3 className="text-gray-900 font-semibold mb-3">Draft Sections</h3>
                <div className="space-y-2">
                  {draftSections.map((section, index) => (
                    <div key={index} className="p-3 bg-gray-50 border border-gray-300">
                      <span className="text-gray-700 font-medium text-xs">{section}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Assigned Reviewers */}
            <div className="bg-white border border-gray-300 p-3 shadow-[0_1px_3px_rgba(0,0,0,.1)]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-4 bg-green-600"></div>
                <h3 className="text-sm font-medium text-gray-800">Assigned Reviewers</h3>
              </div>
              <div className="space-y-1">
                {reviewers.map((reviewer, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-100 border border-green-300 flex items-center justify-center">
                      <span className="text-green-700 text-xs font-medium">{reviewer.avatar}</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-800">{reviewer.name}</p>
                      <p className="text-xs text-gray-500">{reviewer.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white border border-gray-300 p-3 shadow-[0_1px_3px_rgba(0,0,0,.1)]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-4 bg-red-600"></div>
                <h3 className="text-sm font-medium text-gray-800">Notifications</h3>
              </div>
              <div className="space-y-1">
                {notifications.map((notification, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-red-50 border border-red-200">
                    <Bell className="h-3 w-3 text-red-600 mt-0.5" />
                    <span className="text-red-700 text-xs">{notification}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Evidence Panel */}
          <div className="lg:col-span-1 space-y-4">
            {/* Compliance Coverage */}
            <div className="bg-white border border-gray-300 p-3 shadow-[0_1px_3px_rgba(0,0,0,.1)] text-center">
              <CircularProgress percent={72} size={80} />
              <h3 className="text-sm font-medium text-gray-800 mt-2">Compliance Coverage</h3>
              <p className="text-gray-700 text-xs mt-1">72% (31/43 sections compliant)</p>
              <p className="text-gray-500 text-xs mt-1">2 gaps · 10 under review</p>
            </div>

            {/* Analysis Details */}
            <div className="bg-white border border-gray-300 p-3 shadow-[0_1px_3px_rgba(0,0,0,.1)] space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-xs font-medium text-gray-800">Draft analyzed: 12 seconds</p>
                  <p className="text-xs text-gray-500">394 sections processed</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-xs font-medium text-gray-800">DOE Rulepack v2025.06</p>
                  <p className="text-xs text-gray-500">Applied to this project</p>
                </div>
              </div>
            </div>

            {/* Active Issues */}
            <div className="bg-white border border-gray-300 p-3 shadow-[0_1px_3px_rgba(0,0,0,.1)]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-4 bg-red-600"></div>
                <h3 className="text-sm font-medium text-gray-800">Active Issues</h3>
              </div>
              <div className="space-y-1">
                {activeIssues.map((issue, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-red-50 border border-red-200">
                    <AlertTriangle className="h-3 w-3 text-red-600" />
                    <span className="text-red-700 text-xs">{issue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white border border-gray-300 p-3 shadow-[0_1px_3px_rgba(0,0,0,.1)]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-4 bg-gray-600"></div>
                <h3 className="text-sm font-medium text-gray-800">Project Timeline</h3>
              </div>
              <div className="space-y-1">
                {timelineMilestones.map((milestone, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 ${
                        milestone.status === 'completed' ? 'bg-gray-700' : 
                        milestone.status === 'current' ? 'bg-gray-600' : 'bg-gray-400'
                      }`} />
                      <span className="text-gray-800 text-xs font-medium">{milestone.phase}</span>
                    </div>
                    <span className="text-gray-600 text-xs">{milestone.dueDate}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scaffold Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Mitigation Summary — Scaffold"
        rulepackVersion="DOE Rulepack v2025.06"
        cfrCitation="§1502.16"
      >
        <div className="space-y-4">
          <div className="p-3 bg-gray-50 border border-gray-300">
            <p className="text-gray-700 text-xs leading-relaxed">
              Mitigation measures should include: monitoring protocols, enforcement mechanisms, and adaptive management strategies proportionate to identified impacts. Specify responsible entities, measurable performance standards, implementation timelines, and triggers for corrective action. Reference best-available data sources and describe how measures will be verified and reported.
            </p>
            <div className="mt-2">
              <span className="inline-block px-2 py-1 bg-blue-100 border border-blue-300 text-blue-800 text-xs">
                CFR §1502.16
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="px-3 py-1 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-xs"
            >
              Edit
            </button>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="px-3 py-1 bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200 transition-colors text-xs"
            >
              Reject
            </button>
            <button
              onClick={handleAcceptScaffold}
              className="px-3 py-1 bg-gray-700 text-white border border-gray-800 hover:bg-gray-800 transition-colors text-xs"
            >
              Accept and insert
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  )
}