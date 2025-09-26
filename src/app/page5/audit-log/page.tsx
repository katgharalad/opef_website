"use client"

import Image from "next/image"
import { useState } from "react"
import { Download, FileText, Code, CheckCircle, Clock, ExternalLink, User, Bot, Hash } from "lucide-react"

export default function AuditLog() {
  const [isExporting, setIsExporting] = useState(false)
  const [exportComplete, setExportComplete] = useState(false)
  const [exportFormat, setExportFormat] = useState<'pdf' | 'json' | null>(null)

  const auditEntries = [
    {
      time: "10:35 AM",
      actor: "User",
      action: "accepted scaffold",
      reference: "Mitigation Summary",
      citation: "CFR §1502.16",
      hash: "a1b2c3d4",
      details: "User accepted AI-generated mitigation summary scaffold"
    },
    {
      time: "10:34 AM", 
      actor: "AI",
      action: "inserted scaffold",
      reference: "Mitigation Summary",
      citation: "CFR §1502.16",
      hash: "e5f6g7h8",
      details: "AI generated mitigation summary based on DOE Rulepack v2025.06"
    },
    {
      time: "10:32 AM",
      actor: "AI", 
      action: "flagged missing",
      reference: "Mitigation section",
      citation: "CFR §1502.16",
      hash: "i9j0k1l2",
      details: "AI detected missing mitigation summary per compliance requirements"
    },
    {
      time: "10:30 AM",
      actor: "User",
      action: "uploaded document",
      reference: "DOE Solar EA v0.3",
      citation: "N/A",
      hash: "m3n4o5p6",
      details: "User uploaded DOE Solar Project Environmental Assessment draft"
    },
    {
      time: "10:28 AM",
      actor: "AI",
      action: "parsed rulepack",
      reference: "DOE v2025.06",
      citation: "CFR §1502.13",
      hash: "q7r8s9t0",
      details: "AI parsed and applied DOE Rulepack v2025.06 to document analysis"
    }
  ]

  const handleExport = async (format: 'pdf' | 'json') => {
    setIsExporting(true)
    setExportFormat(format)
    setExportComplete(false)

    // Simulate export process
    setTimeout(() => {
      setIsExporting(false)
      setExportComplete(true)
      
      // Generate mock file download
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
      const filename = `OPEF_AuditLog_${timestamp}.${format}`
      
      const mockContent = format === 'pdf' 
        ? 'Mock PDF content for audit log'
        : JSON.stringify(auditEntries, null, 2)
      
      const blob = new Blob([mockContent], { 
        type: format === 'pdf' ? 'application/pdf' : 'application/json' 
      })
      
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      // Reset completion state after 3 seconds
      setTimeout(() => {
        setExportComplete(false)
        setExportFormat(null)
      }, 3000)
    }, 2000)
  }

  const getActorIcon = (actor: string) => {
    return actor === 'User' ? User : Bot
  }

  const getActorColor = (actor: string) => {
    return actor === 'User' ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-purple-100 text-purple-800 border-purple-200'
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* Project Banner */}
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
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
                <h1 className="text-2xl font-bold text-gray-900 font-clash">Audit Log & Export</h1>
                <p className="text-gray-600">Complete audit trail and compliance-ready exports • Immutable per NARA standards</p>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Log Timeline */}
        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-[0_1px_2px_rgba(0,0,0,.06),0_8px_24px_rgba(0,0,0,.04)] mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900 text-lg font-semibold">Audit Timeline</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>Last updated: {auditEntries[0].time}</span>
            </div>
          </div>
          <div className="space-y-3">
            {auditEntries.map((entry, index) => {
              const ActorIcon = getActorIcon(entry.actor)
              return (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
                  <div className="text-gray-600 text-sm font-mono min-w-[70px] mt-1">
                    {entry.time}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getActorColor(entry.actor)}`}>
                        <ActorIcon className="h-3 w-3 inline mr-1" />
                        {entry.actor}
                      </span>
                      <span className="text-gray-900 font-medium text-sm">
                        {entry.action}
                      </span>
                      <span className="text-gray-600 text-sm">
                        {entry.reference}
                      </span>
                    </div>
                    <p className="text-gray-700 text-xs mb-1">{entry.details}</p>
                    <div className="flex items-center gap-2">
                      {entry.citation !== "N/A" && (
                        <a 
                          href={`/cfr/${entry.citation}`}
                          className="inline-block px-2 py-1 bg-gray-100 border border-gray-200 rounded text-gray-700 text-xs hover:bg-gray-200 transition-colors"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {entry.citation}
                          <ExternalLink className="h-3 w-3 inline ml-1" />
                        </a>
                      )}
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Hash className="h-3 w-3" />
                        <span className="font-mono">{entry.hash}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Export Block */}
        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-[0_1px_2px_rgba(0,0,0,.06),0_8px_24px_rgba(0,0,0,.04)]">
          <h3 className="text-gray-900 text-lg font-semibold mb-4">Export Audit Log</h3>
          
          <div className="grid md:grid-cols-2 gap-3 mb-4">
            <button
              onClick={() => handleExport('pdf')}
              disabled={isExporting}
              className="flex items-center justify-center gap-2 p-3 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileText className="h-4 w-4 text-gray-600" />
              <div className="text-left">
                <div className="text-gray-900 font-semibold text-sm">Export PDF/A (compliance-ready)</div>
                <div className="text-gray-600 text-xs">NARA-compliant format</div>
              </div>
            </button>
            
            <button
              onClick={() => handleExport('json')}
              disabled={isExporting}
              className="flex items-center justify-center gap-2 p-3 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Code className="h-4 w-4 text-gray-600" />
              <div className="text-left">
                <div className="text-gray-900 font-semibold text-sm">Export JSON (machine-readable)</div>
                <div className="text-gray-600 text-xs">API-compatible format</div>
              </div>
            </button>
          </div>

          {/* Export Status */}
          {isExporting && (
            <div className="flex items-center justify-center gap-3 p-4 bg-gray-50 border border-gray-300">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
              <span className="text-gray-700 text-sm">Export started...</span>
            </div>
          )}

          {exportComplete && (
            <div className="flex items-center justify-center gap-3 p-4 bg-gray-50 border border-gray-300">
              <CheckCircle className="h-4 w-4 text-gray-600" />
              <span className="text-gray-700 text-sm">
                Export complete • {exportFormat?.toUpperCase()} file downloaded
              </span>
            </div>
          )}

          {/* Compliance Notice */}
          <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-gray-700 text-sm font-medium">
                  All AI outputs include source citations. Log immutable per NARA standards.
                </p>
                <p className="text-gray-600 text-xs mt-1">
                  This audit trail meets federal record-keeping requirements and provides complete transparency for compliance reviews. 
                  Each entry includes cryptographic hash for integrity verification.
                </p>
                <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                  <span>SHA256: a1b2c3d4e5f6...</span>
                  <span>Last verified: {auditEntries[0].time}</span>
                  <span>Entries: {auditEntries.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}