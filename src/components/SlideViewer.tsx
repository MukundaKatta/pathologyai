'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { ZoomIn, ZoomOut, Move, PenTool, Ruler, RotateCcw, Maximize } from 'lucide-react'

export default function SlideViewer() {
  const { selectedCase, cases, setSelectedCase, annotations, activeTool, setActiveTool } = useStore()
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 })
  const viewerRef = useRef<HTMLDivElement>(null)

  const activeCase = selectedCase || cases[0]
  const caseAnnotations = activeCase ? annotations.filter(a => a.case_id === activeCase.id) : []

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (activeTool !== 'pan') return
    setDragging(true); setLastPos({ x: e.clientX, y: e.clientY })
  }, [activeTool])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging) return
    setOffset(prev => ({ x: prev.x + e.clientX - lastPos.x, y: prev.y + e.clientY - lastPos.y }))
    setLastPos({ x: e.clientX, y: e.clientY })
  }, [dragging, lastPos])

  const handleMouseUp = useCallback(() => setDragging(false), [])

  const tools = [
    { id: 'pan' as const, icon: Move, label: 'Pan' },
    { id: 'annotate' as const, icon: PenTool, label: 'Annotate' },
    { id: 'measure' as const, icon: Ruler, label: 'Measure' },
  ]

  return (
    <div className="grid grid-cols-4 gap-6 h-[calc(100vh-120px)]">
      <div className="glass p-4 overflow-auto">
        <h3 className="text-sm font-semibold text-white/70 mb-3">SLIDES</h3>
        <div className="space-y-2">
          {cases.map(c => (
            <button key={c.id} onClick={() => setSelectedCase(c)}
              className={`w-full text-left p-3 rounded-xl transition-all ${activeCase?.id === c.id ? 'bg-rose-500/20 border border-rose-500/30' : 'hover:bg-white/5 border border-transparent'}`}>
              <p className="font-medium text-sm">{c.case_number}</p>
              <p className="text-xs text-white/40">{c.specimen_type} | {c.stain}</p>
              <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] ${
                c.status === 'finalized' ? 'bg-emerald-500/20 text-emerald-300' :
                c.status === 'ai_analyzed' ? 'bg-blue-500/20 text-blue-300' :
                c.status === 'in_review' ? 'bg-amber-500/20 text-amber-300' : 'bg-gray-500/20 text-gray-300'
              }`}>{c.status.replace('_', ' ')}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="col-span-3 flex flex-col gap-4">
        {/* Toolbar */}
        <div className="glass px-4 py-2 flex items-center justify-between">
          <div className="flex gap-1">
            {tools.map(({ id, icon: Icon, label }) => (
              <button key={id} onClick={() => setActiveTool(id)}
                className={`p-2 rounded-lg flex items-center gap-1 text-xs ${activeTool === id ? 'bg-rose-500/20 text-rose-300' : 'text-white/50 hover:bg-white/5'}`}>
                <Icon className="w-4 h-4" />{label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setZoom(Math.max(0.25, zoom - 0.25))} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10"><ZoomOut className="w-4 h-4" /></button>
            <span className="text-xs text-white/50 min-w-[48px] text-center">{(zoom * 100).toFixed(0)}%</span>
            <button onClick={() => setZoom(Math.min(10, zoom + 0.25))} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10"><ZoomIn className="w-4 h-4" /></button>
            <button onClick={() => { setZoom(1); setOffset({ x: 0, y: 0 }) }} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10"><RotateCcw className="w-4 h-4" /></button>
            <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10"><Maximize className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Viewer Area - simulated large pathology image */}
        <div
          ref={viewerRef}
          className="flex-1 glass overflow-hidden relative cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`, transformOrigin: 'center', transition: dragging ? 'none' : 'transform 0.2s' }}
            className="absolute inset-0">
            {/* Simulated tissue background */}
            <div className="absolute inset-0" style={{
              background: 'repeating-conic-gradient(rgba(244,63,94,0.05) 0% 25%, rgba(251,191,36,0.03) 0% 50%) 0 0 / 30px 30px',
            }}>
              {/* Simulated tissue structures */}
              {Array.from({ length: 40 }, (_, i) => (
                <div key={i} className="absolute rounded-full" style={{
                  width: `${15 + Math.random() * 25}px`,
                  height: `${15 + Math.random() * 25}px`,
                  left: `${5 + Math.random() * 90}%`,
                  top: `${5 + Math.random() * 90}%`,
                  background: `radial-gradient(circle, rgba(${180 + Math.random() * 75}, ${80 + Math.random() * 120}, ${120 + Math.random() * 80}, 0.3), transparent)`,
                }} />
              ))}
            </div>

            {/* AI Annotations Overlay */}
            {caseAnnotations.map(ann => (
              <div key={ann.id}
                className="absolute border-2 rounded"
                style={{
                  left: ann.x, top: ann.y, width: ann.width, height: ann.height,
                  borderColor: ann.color,
                  backgroundColor: `${ann.color}15`,
                }}>
                <span className="absolute -top-5 left-0 px-1 py-0.5 rounded text-[9px] font-medium whitespace-nowrap"
                  style={{ backgroundColor: ann.color, color: 'white' }}>
                  {ann.label} ({(ann.confidence * 100).toFixed(0)}%)
                </span>
              </div>
            ))}
          </div>

          {/* Minimap */}
          <div className="absolute bottom-3 right-3 w-32 h-24 bg-black/50 rounded-lg border border-white/20 overflow-hidden">
            <div className="absolute inset-0 opacity-50" style={{
              background: 'repeating-conic-gradient(rgba(244,63,94,0.1) 0% 25%, rgba(251,191,36,0.05) 0% 50%) 0 0 / 5px 5px',
            }} />
            <div className="absolute border border-rose-400/50 rounded"
              style={{ left: `${50 - 50/zoom}%`, top: `${50 - 50/zoom}%`, width: `${100/zoom}%`, height: `${100/zoom}%` }} />
          </div>
        </div>

        {/* Status Bar */}
        {activeCase && (
          <div className="glass px-4 py-2 flex items-center justify-between text-xs">
            <span className="text-white/50">{activeCase.case_number} | {activeCase.specimen_type} | {activeCase.stain}</span>
            <span className="text-rose-300">{caseAnnotations.length} annotations</span>
            <span className="text-white/50">Pathologist: {activeCase.pathologist}</span>
          </div>
        )}
      </div>
    </div>
  )
}
