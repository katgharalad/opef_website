"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { Upload } from "lucide-react"

interface UploadDropzoneProps {
  onFiles: (files: FileList) => void
}

export default function UploadDropzone({ onFiles }: UploadDropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      onFiles(files)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      fileInputRef.current?.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onFiles(files)
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Upload NEPA procedures"
      aria-describedby="upload-description"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <Upload size={48} className="mx-auto mb-4 text-gray-400" />
      <p className="text-gray-700 mb-2">Drop files here or click to select</p>
      <p id="upload-description" className="text-gray-500 text-sm">
        Accepts .pdf, .doc, .docx, .xml
      </p>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.xml"
        onChange={handleFileChange}
        className="hidden"
        multiple
      />
    </div>
  )
}
