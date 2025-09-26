"use client"

import Image from "next/image"
import { useState } from "react"
import { MessageSquare, CheckCircle, Edit, X, Download, Clock, ExternalLink, Users, TrendingUp } from "lucide-react"

export default function PublicCommentAnalyzer() {
  const [selectedCluster, setSelectedCluster] = useState("Air Quality")
  
  const clusters = [
    { name: "Air Quality", count: 2847, percentage: 27.3 },
    { name: "Wildlife", count: 1923, percentage: 18.4 },
    { name: "Water Resources", count: 1654, percentage: 15.9 },
    { name: "Traffic", count: 1432, percentage: 13.7 },
    { name: "Noise", count: 1209, percentage: 11.6 },
    { name: "Cultural Resources", count: 987, percentage: 9.5 },
    { name: "Visual Impacts", count: 765, percentage: 7.3 },
    { name: "Socioeconomics", count: 606, percentage: 5.8 }
  ]

  const clusterData = {
    "Air Quality": {
      representativeComment: "Concern about increased particulate matter from construction activities affecting local air quality standards.",
      draftResponse: "We acknowledge concerns about air quality impacts. Our air quality modeling indicates that construction activities will comply with all applicable standards, with dust suppression measures implemented throughout the project duration.",
      themes: ["PM2.5", "Construction dust", "Air quality standards"],
      sentiment: "Negative",
      priority: "High"
    },
    "Wildlife": {
      representativeComment: "Worried about disruption to migratory bird patterns and local wildlife habitats during construction.",
      draftResponse: "Wildlife protection is a priority. We will implement seasonal construction restrictions during critical migration periods and maintain buffer zones around sensitive habitats as identified in our wildlife survey.",
      themes: ["Migratory birds", "Habitat disruption", "Seasonal restrictions"],
      sentiment: "Negative",
      priority: "High"
    },
    "Water Resources": {
      representativeComment: "Concerned about potential groundwater contamination and impacts on local water supplies.",
      draftResponse: "Water resource protection measures include comprehensive groundwater monitoring and the use of best management practices to prevent contamination. All activities will comply with state and federal water quality standards.",
      themes: ["Groundwater", "Water quality", "Monitoring"],
      sentiment: "Negative",
      priority: "Medium"
    },
    "Traffic": {
      representativeComment: "Construction traffic will significantly impact local roads and create safety hazards for residents.",
      draftResponse: "Traffic management plans include designated haul routes, construction timing restrictions during peak hours, and coordination with local authorities to minimize impacts on community safety and mobility.",
      themes: ["Traffic safety", "Haul routes", "Peak hours"],
      sentiment: "Negative",
      priority: "Medium"
    },
    "Noise": {
      representativeComment: "Construction noise will be excessive and disrupt the peaceful character of our neighborhood.",
      draftResponse: "Noise mitigation measures include equipment sound barriers, restricted construction hours, and real-time noise monitoring to ensure compliance with local noise ordinances.",
      themes: ["Noise levels", "Sound barriers", "Construction hours"],
      sentiment: "Negative",
      priority: "Low"
    },
    "Cultural Resources": {
      representativeComment: "Concerned about impacts to nearby archaeological sites and cultural significance of the area.",
      draftResponse: "Cultural resource surveys have been completed in consultation with tribal representatives. No impacts to identified cultural resources are anticipated, and monitoring protocols will be implemented.",
      themes: ["Archaeological sites", "Tribal consultation", "Cultural significance"],
      sentiment: "Negative",
      priority: "High"
    },
    "Visual Impacts": {
      representativeComment: "The project will create visual blight and negatively impact scenic viewsheds in the area.",
      draftResponse: "Visual impact assessments have been conducted, and mitigation measures include landscape screening, color coordination with surroundings, and consideration of community aesthetic preferences.",
      themes: ["Visual blight", "Scenic viewsheds", "Landscape screening"],
      sentiment: "Negative",
      priority: "Low"
    },
    "Socioeconomics": {
      representativeComment: "Local economic benefits are overstated, and the project may not provide promised job opportunities for residents.",
      draftResponse: "Economic impact analyses demonstrate significant local benefits including job creation, tax revenue, and community investment. Local hiring preferences and workforce development programs will be implemented.",
      themes: ["Economic benefits", "Job creation", "Local hiring"],
      sentiment: "Negative",
      priority: "Medium"
    }
  }

  const currentData = clusterData[selectedCluster as keyof typeof clusterData]

  const handleApprove = () => {
    console.log(`Approved response for ${selectedCluster}`)
  }

  const handleEdit = () => {
    console.log(`Edit response for ${selectedCluster}`)
  }

  const handleReject = () => {
    console.log(`Rejected response for ${selectedCluster}`)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-6">
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
                <h1 className="text-2xl font-bold text-gray-900 font-clash">Public Comment Analyzer</h1>
                <p className="text-gray-600">10,423 Comments Uploaded • Analyzed 42 themes in 8.2s (DOE v2025.06 rulepack)</p>
              </div>
            </div>
            <button className="flex items-center gap-2 bg-gray-700 text-white px-3 py-2 hover:bg-gray-800 transition-colors border border-gray-800">
              <Download className="h-4 w-4" />
              Export Analysis
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Cluster Grid */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-md p-4 shadow-[0_1px_2px_rgba(0,0,0,.06),0_8px_24px_rgba(0,0,0,.04)]">
              <h3 className="text-gray-900 text-lg font-semibold mb-3">Topic Clusters</h3>
              <div className="grid grid-cols-1 gap-2">
                {clusters.map((cluster) => (
                  <button
                    key={cluster.name}
                    onClick={() => setSelectedCluster(cluster.name)}
                    className={`p-3 rounded-md text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      selectedCluster === cluster.name
                        ? 'bg-gray-50 border border-gray-300'
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-gray-900 font-semibold text-xs">{cluster.name}</div>
                      <div className="text-gray-600 text-xs">{cluster.percentage}%</div>
                    </div>
                    <div className="text-gray-600 text-xs">{cluster.count.toLocaleString()} comments</div>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-1">
                      <div 
                        className="bg-gray-600 h-1 transition-all duration-300"
                        style={{ width: `${cluster.percentage}%` }}
                      ></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Analysis Summary */}
            <div className="bg-white border border-gray-200 rounded-md p-4 shadow-[0_1px_2px_rgba(0,0,0,.06),0_8px_24px_rgba(0,0,0,.04)] mt-4">
              <h3 className="text-gray-900 text-lg font-semibold mb-3">Analysis Summary</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Comments analyzed: 8.2s</p>
                    <p className="text-xs text-gray-500">10,423 comments processed</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">42 themes identified</p>
                    <p className="text-xs text-gray-500">Sentiment analysis complete</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">1,247 unique commenters</p>
                    <p className="text-xs text-gray-500">Geographic distribution mapped</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panels */}
          <div className="lg:col-span-2 space-y-4">
            {/* Representative Comment Card */}
            <div className="bg-white border border-gray-200 rounded-md p-4 shadow-[0_1px_2px_rgba(0,0,0,.06),0_8px_24px_rgba(0,0,0,.04)]">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="h-4 w-4 text-blue-600" />
                <h3 className="text-gray-900 text-lg font-semibold">Representative Comment</h3>
                <div className="ml-auto flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    currentData.sentiment === 'Negative' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {currentData.sentiment}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    currentData.priority === 'High' ? 'bg-orange-100 text-orange-800' : 
                    currentData.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {currentData.priority} Priority
                  </span>
                </div>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                <p className="text-gray-700 text-sm leading-relaxed">
                  &ldquo;{currentData.representativeComment}&rdquo;
                </p>
              </div>
              <div className="mt-2 flex gap-1">
                {currentData.themes.map((theme, index) => (
                  <span key={index} className="inline-block px-2 py-1 bg-blue-100 border border-blue-200 rounded text-blue-800 text-xs">
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            {/* Draft Response Card */}
            <div className="bg-white border border-gray-200 rounded-md p-4 shadow-[0_1px_2px_rgba(0,0,0,.06),0_8px_24px_rgba(0,0,0,.04)]">
              <h3 className="text-gray-900 text-lg font-semibold mb-3">Draft Response</h3>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-md mb-3">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {currentData.draftResponse}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleApprove}
                  className="flex-1 bg-gray-700 text-white border border-gray-800 px-3 py-2 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <CheckCircle className="h-3 w-3" />
                  Approve
                </button>
                <button
                  onClick={handleEdit}
                  className="flex-1 bg-gray-700 text-white border border-gray-800 px-3 py-2 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Edit className="h-3 w-3" />
                  Edit
                </button>
                <button
                  onClick={handleReject}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 rounded-md px-3 py-2 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <X className="h-3 w-3" />
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats Footer */}
        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-[0_1px_2px_rgba(0,0,0,.06),0_8px_24px_rgba(0,0,0,.04)] mt-6">
          <div className="grid grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-gray-900 text-2xl font-bold">42</div>
              <div className="text-gray-600 text-sm">Themes identified</div>
            </div>
            <div>
              <div className="text-gray-900 text-2xl font-bold">100%</div>
              <div className="text-gray-600 text-sm">Draft responses generated</div>
            </div>
            <div>
              <div className="text-gray-900 text-2xl font-bold">12%</div>
              <div className="text-gray-600 text-sm">Human review required</div>
            </div>
            <div>
              <div className="text-gray-900 text-2xl font-bold">8.2s</div>
              <div className="text-gray-600 text-sm">Processing time</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}