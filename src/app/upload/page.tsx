"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Upload, FileText, CheckCircle, Loader2, LinkIcon, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"

export default function UploadPage() {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [jobDescFile, setJobDescFile] = useState<File | null>(null)
  const [useTextInput, setUseTextInput] = useState(true)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const router = useRouter()

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleFileDrop = useCallback((e: React.DragEvent, type: "resume" | "job") => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.type === "application/pdf") {
        if (type === "resume") {
          setResumeFile(file)
        } else {
          setJobDescFile(file)
          setUseTextInput(false)
        }
      }
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: "resume" | "job") => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      if (type === "resume") {
        setResumeFile(file)
      } else {
        setJobDescFile(file)
        setUseTextInput(false)
      }
    }
  }

  const handleAnalyze = async () => {
    if (!resumeFile || (!jobDescription.trim() && !jobDescFile)) return

    setIsAnalyzing(true)
    // Simulate analysis
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsAnalyzing(false)
    router.push("/analysis")
  }

  const switchToFileUpload = () => {
    setUseTextInput(false)
    setJobDescription("")
  }

  const switchToTextInput = () => {
    setUseTextInput(true)
    setJobDescFile(null)
  }

  const ResumeDropZone = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative border-2 border-black rounded-2xl p-8 text-center transition-all duration-300 bg-white ${
        resumeFile
          ? "border-green-500 bg-green-50"
          : "hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:border-gray-400"
      }`}
      onDrop={(e) => handleFileDrop(e, "resume")}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => handleFileSelect(e, "resume")}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />

      <div className="space-y-4">
        {resumeFile ? (
          <>
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Resume Uploaded</h3>
              <div className="flex items-center justify-center space-x-2 text-green-600 mb-2">
                <FileText className="w-5 h-5" />
                <span className="font-medium">{resumeFile.name}</span>
              </div>
              <p className="text-sm text-gray-500">{formatFileSize(resumeFile.size)}</p>
            </div>
          </>
        ) : (
          <>
            <Upload className="w-12 h-12 text-gray-400 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Resume</h3>
              <p className="text-gray-600 mb-4">Your current resume in PDF format</p>
              <div className="text-sm text-gray-500">
                <span className="font-medium text-black">Click to upload</span> or drag and drop
                <br />
                PDF files only
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  )

  const JobDescriptionInput = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white border-2 border-black rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Description</h3>

      {useTextInput ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Paste Job Description</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here…"
              className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
            />
          </div>
          <button
            onClick={switchToFileUpload}
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-black transition-colors"
          >
            <LinkIcon className="w-4 h-4" />
            <span>or upload JD as PDF</span>
          </button>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all ${
            jobDescFile ? "border-green-300 bg-green-50" : "border-gray-300 hover:border-gray-400"
          }`}
          onDrop={(e) => handleFileDrop(e, "job")}
          onDragOver={(e) => e.preventDefault()}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileSelect(e, "job")}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          {jobDescFile ? (
            <div className="space-y-3">
              <CheckCircle className="w-10 h-10 text-green-500 mx-auto" />
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">{jobDescFile.name}</span>
              </div>
              <p className="text-xs text-gray-500">{formatFileSize(jobDescFile.size)}</p>
              <button onClick={switchToTextInput} className="text-sm text-gray-600 hover:text-black transition-colors">
                Switch to text input
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <Upload className="w-10 h-10 text-gray-400 mx-auto" />
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">Upload Job Description PDF</p>
                <p className="text-xs text-gray-500">
                  <span className="font-medium text-black">Click to upload</span> or drag and drop
                </p>
              </div>
              <button onClick={switchToTextInput} className="text-sm text-gray-600 hover:text-black transition-colors">
                Switch to text input
              </button>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )

  return (
    <div className="p-4 lg:p-8 pt-20 lg:pt-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Documents</h1>
          <p className="text-gray-600">
            Upload your resume and provide the job description to get AI-powered compatibility analysis.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <ResumeDropZone />
          <JobDescriptionInput />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <motion.button
            whileHover={{
              scale: 1.02,
              background: "linear-gradient(135deg, #1f2937 0%, #4c1d95 100%)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAnalyze}
            disabled={!resumeFile || (!jobDescription.trim() && !jobDescFile) || isAnalyzing}
            className={`px-12 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
              resumeFile && (jobDescription.trim() || jobDescFile) && !isAnalyzing
                ? "bg-gradient-to-r from-gray-900 to-gray-700 text-white hover:shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isAnalyzing ? (
              <div className="flex items-center space-x-3">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Analyzing Match...</span>
              </div>
            ) : (
              "Analyze Match"
            )}
          </motion.button>

          {isAnalyzing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-gray-600">
              <p className="mb-3">Our AI is analyzing your documents for compatibility...</p>
              <div className="w-80 bg-gray-200 rounded-full h-2 mx-auto">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3 }}
                  className="bg-gradient-to-r from-gray-900 to-gray-700 h-2 rounded-full"
                />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Or explore other features</h3>
            <p className="text-gray-600 text-sm">Access our AI tools to enhance your job search</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Link href="/chat">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 border border-gray-200 rounded-xl hover:border-emerald-300 hover:shadow-sm transition-all cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-gray-900">AI Career Chat</h4>
                    <p className="text-sm text-gray-600">Get personalized advice</p>
                  </div>
                </div>
              </motion.div>
            </Link>

            <Link href="/cover-letter">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-sm transition-all cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-gray-900">Cover Letter Generator</h4>
                    <p className="text-sm text-gray-600">Create tailored letters</p>
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
