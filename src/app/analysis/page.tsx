"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  RefreshCw,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Target,
  FileText,
  MessageSquare,
} from "lucide-react";
// import Sidebar from "@/components/sidebar"

export default function AnalysisPage() {
  const matchScore = 78;
  const matchedSkills = [
    "JavaScript",
    "React",
    "Node.js",
    "TypeScript",
    "Git",
    "Agile",
  ];
  const missingSkills = ["Docker", "Kubernetes", "AWS", "GraphQL"];

  const suggestions = [
    "Add Docker containerization experience to your resume - it's mentioned 3 times in the job description",
    "Highlight your React experience more prominently in the summary section",
    "Include specific examples of Agile methodology implementation",
    "Consider adding AWS certifications to strengthen your cloud computing profile",
    "Quantify your JavaScript projects with metrics and impact numbers",
  ];

  return (
    <div className="p-4 lg:p-8 pt-20 lg:pt-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Analysis Results
              </h1>
              <p className="text-gray-600">
                AI-powered compatibility analysis for your resume and job
                description
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Regenerate</span>
            </motion.button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Match Score Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Match Score
              </h3>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg
                  className="w-32 h-32 transform -rotate-90"
                  viewBox="0 0 120 120"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "0 314" }}
                    animate={{
                      strokeDasharray: `${(matchScore / 100) * 314} 314`,
                    }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900">
                    {matchScore}%
                  </span>
                </div>
              </div>
              <p className="text-gray-600">
                Strong match with room for improvement
              </p>
            </div>
          </motion.div>

          {/* Skills Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Matched Skills */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Skills Matched
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {matchedSkills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Skills to Add
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* AI Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="w-6 h-6" />
              <h3 className="text-xl font-semibold">AI Recommendations</h3>
            </div>
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <Target className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-100">{suggestion}</p>
                </motion.div>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              Regenerate Suggestions
            </motion.button>
          </div>
        </motion.div>

        {/* Next Steps Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              What&aposs Next?
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/cover-letter">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      Generate Cover Letter
                    </h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Create a tailored cover letter based on this analysis and
                    job requirements.
                  </p>
                </motion.div>
              </Link>

              <Link href="/chat">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-emerald-300 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      Chat with AI Assistant
                    </h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Get personalized advice on improving your resume and
                    interview preparation.
                  </p>
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
