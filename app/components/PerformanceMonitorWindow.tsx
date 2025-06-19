import React, { useState } from "react"
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts' // Uncomment if using Recharts
// import Chart from 'chart.js/auto' // Uncomment if using Chart.js
import { Monitor, Github, Twitter, BookOpen, Activity } from "lucide-react"

const METRICS = [
  {
    id: "github",
    label: "GitHub Contributions",
    icon: Github,
    color: "text-blue-300",
    lineColor: "bg-blue-400",
    value: 42,
    unit: "contributions",
  },
  {
    id: "twitter",
    label: "Twitter Posts",
    icon: Twitter,
    color: "text-sky-300",
    lineColor: "bg-sky-400",
    value: 17,
    unit: "tweets",
  },
  {
    id: "medium",
    label: "Medium Articles",
    icon: BookOpen,
    color: "text-purple-300",
    lineColor: "bg-purple-400",
    value: 5,
    unit: "articles",
  },
  {
    id: "steps",
    label: "Steps Walked",
    icon: Activity,
    color: "text-green-300",
    lineColor: "bg-green-400",
    value: 12000,
    unit: "steps",
  },
]

export default function PerformanceMonitorWindow() {
  const [selected, setSelected] = useState("github")
  const selectedMetric = METRICS.find(m => m.id === selected)

  return (
    <div className="w-full h-full flex flex-col bg-white/10 rounded-lg shadow-xl p-0 aero-glass overflow-hidden">
      <div className="px-6 pt-6 pb-2">
        <h2 className="text-2xl font-bold vista-text-gradient flex items-center">
          <Monitor className="w-6 h-6 mr-2" /> Performance Monitor
        </h2>
      </div>
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-56 bg-white/5 border-r border-white/10 flex flex-col py-4 gap-2">
          {METRICS.map(metric => (
            <button
              key={metric.id}
              className={`flex items-center px-4 py-2 gap-3 rounded-lg transition-colors text-left ${selected === metric.id ? 'bg-white/10 ring-2 ring-blue-400/40' : 'hover:bg-white/5'} `}
              onClick={() => setSelected(metric.id)}
            >
              <metric.icon className={`w-5 h-5 ${metric.color}`} />
              <div className="flex-1">
                <div className="text-sm font-medium text-white/90">{metric.label}</div>
                {/* Mini line graph placeholder */}
                <div className="w-full h-2 mt-1 bg-gradient-to-r from-white/10 to-white/0 rounded-full relative">
                  <div className={`absolute left-0 top-0 h-2 ${metric.lineColor} rounded-full`} style={{ width: '60%' }} />
                </div>
              </div>
              <div className="ml-2 text-xs text-white/70 font-mono">{metric.value}</div>
            </button>
          ))}
        </div>
        {/* Main panel */}
        <div className="flex-1 flex flex-col p-8 min-w-0">
          <div className="flex items-center mb-4">
            {selectedMetric && <selectedMetric.icon className={`w-7 h-7 mr-3 ${selectedMetric.color}`} />}
            <span className="text-xl font-semibold text-white/90">{selectedMetric?.label}</span>
          </div>
          {/* Large line graph placeholder */}
          <div className="w-full h-56 bg-gradient-to-br from-white/10 to-white/0 rounded-lg flex items-center justify-center mb-6 relative overflow-hidden">
            <div className={`absolute left-0 top-1/2 h-3 ${selectedMetric?.lineColor} rounded-full`} style={{ width: '80%', transform: 'translateY(-50%)' }} />
            <span className="text-white/30 text-lg">[Line Graph Placeholder]</span>
          </div>
          <div className="flex items-end gap-6">
            <div>
              <div className={`text-4xl font-bold mb-1 ${selectedMetric?.color}`}>{selectedMetric?.value.toLocaleString()}</div>
              <div className="text-xs text-white/60">{selectedMetric?.unit} today</div>
            </div>
            {/* Add more details here if desired */}
          </div>
        </div>
      </div>
    </div>
  )
} 