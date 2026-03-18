'use client'

import { useEffect } from 'react'
import { useStore } from '@/lib/store'
import { mockCases, mockAnnotations, mockMeasurements, mockComments } from '@/lib/mock-data'
import SlideViewer from '@/components/SlideViewer'
import CaseManager from '@/components/CaseManager'
import AnnotationPanel from '@/components/AnnotationPanel'
import MeasurementTools from '@/components/MeasurementTools'
import CollaborativeReview from '@/components/CollaborativeReview'
import { Microscope, Image, FolderOpen, PenTool, Ruler, MessageSquare } from 'lucide-react'

const tabs = [
  { id: 'viewer' as const, label: 'Slide Viewer', icon: Image },
  { id: 'cases' as const, label: 'Cases', icon: FolderOpen },
  { id: 'annotations' as const, label: 'Annotations', icon: PenTool },
  { id: 'measurements' as const, label: 'Measurements', icon: Ruler },
  { id: 'review' as const, label: 'Review', icon: MessageSquare },
]

export default function Home() {
  const { activeTab, setActiveTab, setCases, setAnnotations, setMeasurements, setComments } = useStore()

  useEffect(() => {
    setCases(mockCases); setAnnotations(mockAnnotations); setMeasurements(mockMeasurements); setComments(mockComments)
  }, [setCases, setAnnotations, setMeasurements, setComments])

  const renderTab = () => {
    switch (activeTab) {
      case 'viewer': return <SlideViewer />
      case 'cases': return <CaseManager />
      case 'annotations': return <AnnotationPanel />
      case 'measurements': return <MeasurementTools />
      case 'review': return <CollaborativeReview />
    }
  }

  return (
    <div className="min-h-screen">
      <header className="glass border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
            <Microscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">PathologyAI</h1>
            <p className="text-[10px] text-white/40">Digital Pathology Platform</p>
          </div>
        </div>
        <nav className="flex gap-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === id ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'text-white/50 hover:bg-white/5'
              }`}>
              <Icon className="w-4 h-4" />{label}
            </button>
          ))}
        </nav>
      </header>
      <main className="p-6">{renderTab()}</main>
    </div>
  )
}
