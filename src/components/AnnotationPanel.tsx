'use client'

import { useStore } from '@/lib/store'
import { PenTool, Cpu, User } from 'lucide-react'

export default function AnnotationPanel() {
  const { annotations, cases, selectedCase, setSelectedCase } = useStore()
  const activeCase = selectedCase || cases[0]
  const caseAnns = activeCase ? annotations.filter(a => a.case_id === activeCase.id) : []

  return (
    <div className="grid grid-cols-3 gap-6 h-[calc(100vh-120px)]">
      <div className="glass p-4 overflow-auto">
        <h3 className="text-sm font-semibold text-white/70 mb-3">SELECT CASE</h3>
        {cases.map(c => (
          <button key={c.id} onClick={() => setSelectedCase(c)}
            className={`w-full text-left p-3 rounded-xl mb-2 ${activeCase?.id === c.id ? 'bg-rose-500/20 border border-rose-500/30' : 'hover:bg-white/5'}`}>
            <p className="font-medium text-sm">{c.case_number}</p>
            <p className="text-xs text-white/40">{annotations.filter(a => a.case_id === c.id).length} annotations</p>
          </button>
        ))}
      </div>

      <div className="col-span-2 space-y-4 overflow-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Annotations - {activeCase?.case_number}</h2>
          <div className="flex gap-2">
            <span className="flex items-center gap-1 text-xs text-blue-300"><Cpu className="w-3 h-3" /> AI: {caseAnns.filter(a => a.author === 'AI').length}</span>
            <span className="flex items-center gap-1 text-xs text-rose-300"><User className="w-3 h-3" /> Manual: {caseAnns.filter(a => a.author !== 'AI').length}</span>
          </div>
        </div>

        <div className="space-y-3">
          {caseAnns.map(ann => (
            <div key={ann.id} className="glass p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: ann.color }} />
                  <p className="font-medium">{ann.label}</p>
                </div>
                <div className="flex items-center gap-2">
                  {ann.author === 'AI' ? <Cpu className="w-4 h-4 text-blue-400" /> : <User className="w-4 h-4 text-rose-400" />}
                  <span className="text-xs text-white/50">{ann.author}</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div className="p-2 rounded-lg bg-white/5"><p className="text-[10px] text-white/40">Type</p><p className="text-xs font-medium">{ann.type}</p></div>
                <div className="p-2 rounded-lg bg-white/5"><p className="text-[10px] text-white/40">Position</p><p className="text-xs font-mono">({ann.x}, {ann.y})</p></div>
                <div className="p-2 rounded-lg bg-white/5"><p className="text-[10px] text-white/40">Size</p><p className="text-xs font-mono">{ann.width}x{ann.height}</p></div>
                <div className="p-2 rounded-lg bg-white/5"><p className="text-[10px] text-white/40">Confidence</p><p className="text-xs font-bold text-emerald-300">{(ann.confidence * 100).toFixed(0)}%</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
