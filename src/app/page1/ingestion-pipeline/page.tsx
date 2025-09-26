"use client"

import Image from "next/image"
import { useState } from "react"
import { Upload, AlertTriangle, CheckCircle2, FileText, Zap, Shield, Database, Download, Clock, ExternalLink } from "lucide-react"
import ProgressStepper from "@/components/ProgressStepper"
import UploadDropzone from "@/components/UploadDropzone"

export default function IngestionPipeline() {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4 | 5>(5) // Start with all steps completed
  const [selectedAgency, setSelectedAgency] = useState("DOE")
  
  const steps: { label: string; status: "pending" | "active" | "done" }[] = [
    "Ingesting","Parsing","Structuring","Validating","Rulepack Ready",
  ].map((label, i) => ({
    label,
    status: (phase === i+1 ? "active" : phase > i+1 ? "done" : "pending") as "pending" | "active" | "done",
  }))

  const startMock = () => {
    setPhase(1)
    const timers = [900, 1200, 900, 1100, 800]
    timers.reduce((acc, ms, idx) => {
      return acc.then(() => new Promise<void>(res => {
        setTimeout(() => { setPhase((idx+1) as 0 | 1 | 2 | 3 | 4 | 5); res(); }, ms)
      }))
    }, Promise.resolve()).then(() => setPhase(5))
  }

  const agencies = [
    { code: "DOE", name: "Department of Energy" },
    { code: "DOT", name: "Department of Transportation" },
    { code: "DOI", name: "Department of Interior" },
    { code: "USACE", name: "Army Corps of Engineers" }
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
                  src="/logo.png" 
                  alt="OPEF Logo" 
                  width={64} 
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-lg font-medium text-gray-800">Configure NEPA Procedures</h1>
                <p className="text-sm text-gray-600">Transform unstructured documents into structured rulepacks with AI-powered precision</p>
              </div>
            </div>
            <button className="flex items-center gap-2 bg-gray-700 text-white px-3 py-2 hover:bg-gray-800 transition-colors border border-gray-800">
              <Download className="h-4 w-4" />
              Export Rulepack
            </button>
          </div>
        </div>

        {/* Processing Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-600" />
            <span className="text-gray-700 text-sm font-medium">Processing completed</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium">12.3s</span>
            <span>•</span>
            <span>Analyzed 394 sections • 4 sources attached</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* Agency Selection */}
            <div className="bg-white border border-gray-300 p-3 shadow-[0_1px_3px_rgba(0,0,0,.1)]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-100 border border-blue-300 flex items-center justify-center">
                  <Database className="h-3 w-3 text-blue-600" />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-800 font-medium text-xs mb-1">Agency Selection</label>
                  <select 
                    value={selectedAgency}
                    onChange={(e) => setSelectedAgency(e.target.value)}
                    className="w-full bg-white border border-gray-300 px-2 py-1 text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {agencies.map(agency => (
                      <option key={agency.code} value={agency.code}>
                        {agency.code} - {agency.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Rulepack version: {selectedAgency} v2025.06</p>
                </div>
              </div>
            </div>

            {/* Upload Zone */}
            <div className="bg-white border border-gray-300 p-3 shadow-[0_1px_3px_rgba(0,0,0,.1)]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-4 bg-green-600"></div>
                <h3 className="text-gray-800 font-medium text-xs">Upload NEPA Procedures</h3>
              </div>
              <div className="border-2 border-dashed border-green-200 bg-green-50 p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-green-600" />
                  <span className="text-green-800 text-xs font-medium">doe_nepa_procedures_2025.pdf</span>
                </div>
                <p className="text-green-700 text-xs">File uploaded successfully</p>
                <p className="text-green-600 text-xs mt-1">2.3 MB • Uploaded 2 minutes ago</p>
              </div>
            </div>

            {/* Progress Stepper */}
            <div className="bg-white border border-gray-300 p-3 shadow-[0_1px_3px_rgba(0,0,0,.1)]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-4 bg-green-600"></div>
                <h3 className="text-gray-800 font-medium text-xs">Processing Pipeline</h3>
              </div>
              <ProgressStepper steps={steps} />
              
              {/* Rulepack Ready Button - appears when all steps are complete */}
              {phase === 5 && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <button className="w-full bg-green-600 text-white px-3 py-2 hover:bg-green-700 transition-colors border border-green-700 text-xs font-medium">
                    Rulepack Ready
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Results Panel */}
          <div>
            <div className="bg-white border border-gray-300 p-3 shadow-[0_1px_3px_rgba(0,0,0,.1)] space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-4 bg-green-600"></div>
                <div className="w-6 h-6 bg-green-100 border border-green-300 flex items-center justify-center">
                  <CheckCircle2 className="h-3 w-3 text-green-600" />
                </div>
                <h3 className="text-gray-800 text-sm font-medium">Processing Results</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-green-600 font-semibold text-sm uppercase tracking-wide">Extracted Sections</h4>
                  <div className="space-y-2">
                    {["Purpose & Need", "Alternatives", "Affected Environment", "Mitigation", "Public Participation"].map((section, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-300">
                        <div className="w-2 h-2 bg-gray-600"></div>
                        <span className="text-gray-700 text-xs">{section}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-blue-600 font-semibold text-sm uppercase tracking-wide">CFR Citations</h4>
                  <div className="space-y-2">
                    {["§1502.13", "§1502.14", "§1502.15", "§1502.16", "§1506.6"].map((citation, index) => (
                      <a 
                        key={index} 
                        href={`/cfr/${citation}`}
                        className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-300 hover:bg-gray-100 transition-colors cursor-pointer"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <div className="w-2 h-2 bg-gray-600"></div>
                        <span className="text-gray-700 text-xs font-mono">{citation}</span>
                        <ExternalLink className="h-3 w-3 text-gray-600 ml-auto" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Warning Banner */}
              <div className="bg-red-50 border border-red-200 p-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-4 bg-red-600"></div>
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <div>
                    <span className="text-red-800 font-semibold text-xs">Environmental Justice Review Required</span>
                    <p className="text-red-700 text-xs mt-1">No EJ section detected in uploaded document</p>
                  </div>
                </div>
              </div>
              
              {/* Output Status */}
              <div className="bg-green-50 border border-green-200 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-4 bg-green-600"></div>
                    <div className="w-6 h-6 bg-green-100 border border-green-300 flex items-center justify-center">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <span className="text-green-800 font-semibold text-xs">{selectedAgency} Rulepack v2025.06</span>
                      <p className="text-green-700 text-xs">Generated successfully</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-green-600" />
                    <CheckCircle2 className="h-3 w-3 text-green-600" />
                    <CheckCircle2 className="h-3 w-3 text-green-600" />
                    <CheckCircle2 className="h-3 w-3 text-green-600" />
                    <AlertTriangle className="h-3 w-3 text-red-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}