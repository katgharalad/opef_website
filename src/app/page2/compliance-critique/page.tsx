"use client"

import Image from "next/image"
import { useState } from "react"
import { CheckCircle, AlertTriangle, XCircle, Download, Clock, ExternalLink, User, FileText } from "lucide-react"
import Drawer from "@/components/Drawer"
import ChecklistRow from "@/components/ChecklistRow"

export default function ComplianceCritique() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, label: "Purpose & Need", status: "compliant" as const },
    { id: 2, label: "Alternatives", status: "compliant" as const },
    { id: 3, label: "Mitigation Summary", status: "gap" as const },
    { id: 4, label: "Citations", status: "compliant" as const }
  ])
  const [draftSections, setDraftSections] = useState<string[]>([])
  const [activityLog, setActivityLog] = useState([
    "User uploaded document: DOE Solar EA v0.3",
    "AI parsed rulepack: DOE v2025.06",
    "AI flagged missing: Mitigation section"
  ])

  const handleInsertScaffold = () => {
    setIsDrawerOpen(true)
  }

  const handleAcceptScaffold = () => {
    const newSection = "Mitigation Summary"
    setDraftSections(prev => [...prev, newSection])
    
    // Update checklist
    setChecklistItems(prev => 
      prev.map(item => 
        item.label === "Mitigation Summary" 
          ? { ...item, status: "compliant" as const }
          : item
      )
    )
    
    // Add to activity log
    setActivityLog(prev => [
      "User accepted scaffold for Mitigation Summary · CFR §1502.16 · change logged",
      ...prev
    ])
    
    setIsDrawerOpen(false)
  }

  const handleEditScaffold = () => {
    setActivityLog(prev => [
      "User edited scaffold for Mitigation Summary",
      ...prev
    ])
    setIsDrawerOpen(false)
  }

  const handleRejectScaffold = () => {
    setActivityLog(prev => [
      "User rejected scaffold for Mitigation Summary",
      ...prev
    ])
    setIsDrawerOpen(false)
  }

  const handleAction = (action: string) => {
    if (action === 'Add section from template') {
      handleInsertScaffold()
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Project Banner */}
        <div className="border border-gray-300 bg-gray-50 p-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white border border-gray-200 overflow-hidden">
                <Image 
                  src="/logo.png" 
                  alt="OPEF Logo" 
                  width={64} 
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-lg font-medium text-gray-800">Compliance Critique Agent</h1>
                <p className="text-sm text-gray-600">Environmental Assessment: DOE Transmission Line Project</p>
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
              onAction={handleAction}
            >
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-md">
                <p className="text-sm text-orange-800">
                  Gap detected: template contains required mitigation summary per §1502.16.
                </p>
                <div className="mt-3 p-3 bg-white border border-orange-200 rounded-md">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Mitigation measures should include: monitoring protocols, enforcement mechanisms, and adaptive management strategies proportionate to identified impacts. Specify responsible entities, measurable performance standards, implementation timelines, and triggers for corrective action.
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
              <div className="bg-white border border-gray-200 rounded-md p-6 shadow-[0_1px_2px_rgba(0,0,0,.06),0_8px_24px_rgba(0,0,0,.04)]">
                <h3 className="text-gray-900 text-xl font-semibold mb-4">Draft Sections</h3>
                <div className="space-y-3">
                  {draftSections.map((section, index) => (
                    <div key={index} className="p-4 bg-green-50 border border-green-200 rounded-md">
                      <div className="flex items-center justify-between">
                        <span className="text-green-800 font-medium">{section}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-green-600">Added from template</span>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Activity Log */}
          <div className="lg:col-span-1 space-y-4">
            {/* Analysis Summary */}
            <div className="bg-white border border-gray-300 p-3 shadow-[0_1px_3px_rgba(0,0,0,.1)]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-4 bg-gray-600"></div>
                <h3 className="text-sm font-medium text-gray-800">Analysis Summary</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-gray-500" />
                  <div>
                    <p className="text-xs font-medium text-gray-800">Draft analyzed: 12 seconds</p>
                    <p className="text-xs text-gray-500">394 sections processed</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-3 w-3 text-gray-500" />
                  <div>
                    <p className="text-xs font-medium text-gray-800">DOE Rulepack v2025.06</p>
                    <p className="text-xs text-gray-500">Applied to this project</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-3 w-3 text-gray-500" />
                  <div>
                    <p className="text-xs font-medium text-gray-800">4 sources attached</p>
                    <p className="text-xs text-gray-500">CFR §1502.13, §1502.14, CEQ Guidance 2016...</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Log */}
            <div className="bg-white border border-gray-300 p-3 shadow-[0_1px_3px_rgba(0,0,0,.1)]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-4 bg-gray-400"></div>
                <h3 className="text-sm font-medium text-gray-800">Activity Log</h3>
              </div>
              <div className="space-y-1">
                {activityLog.map((activity, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-gray-50 border border-gray-200">
                    <div className="w-4 h-4 bg-gray-100 border border-gray-300 flex items-center justify-center mt-0.5">
                      <User className="h-2 w-2 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-600 text-xs">{activity}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {index === 0 ? "Just now" : `${index + 1} minutes ago`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance Status */}
            <div className="bg-white border border-gray-300 p-3 shadow-[0_1px_3px_rgba(0,0,0,.1)]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-4 bg-gray-600"></div>
                <h3 className="text-sm font-medium text-gray-800">Compliance Status</h3>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between p-2 bg-gray-50 border border-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-gray-600" />
                    <span className="text-gray-700 text-xs font-medium">Purpose & Need</span>
                  </div>
                  <span className="text-gray-600 text-xs">Compliant</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 border border-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-gray-600" />
                    <span className="text-gray-700 text-xs font-medium">Alternatives</span>
                  </div>
                  <span className="text-gray-600 text-xs">Compliant</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 border border-gray-300">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3 text-gray-600" />
                    <span className="text-gray-700 text-xs font-medium">Mitigation Summary</span>
                  </div>
                  <span className="text-gray-600 text-xs">Gap detected</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 border border-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-gray-600" />
                    <span className="text-gray-700 text-xs font-medium">Citations</span>
                  </div>
                  <span className="text-gray-600 text-xs">Attached</span>
                </div>
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
        <div className="space-y-6">
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
            <p className="text-gray-700 text-sm leading-relaxed">
              Mitigation measures should include: monitoring protocols, enforcement mechanisms, and adaptive management strategies proportionate to identified impacts. Specify responsible entities, measurable performance standards, implementation timelines, and triggers for corrective action. Reference best-available data sources and describe how measures will be verified and reported.
            </p>
            <div className="mt-3">
              <span className="inline-block px-2 py-1 bg-blue-100 border border-blue-200 rounded text-blue-800 text-xs">
                CFR §1502.16
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={handleEditScaffold}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={handleRejectScaffold}
              className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
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