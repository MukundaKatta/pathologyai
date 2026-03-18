'use client'

import { useStore } from '@/lib/store'
import { Ruler } from 'lucide-react'

export default function MeasurementTools() {
  const { measurements, cases, selectedCase, setSelectedCase } = useStore()
  const activeCase = selectedCase || cases[0]
  const caseMeasurements = activeCase ? measurements.filter(m => m.case_id === activeCase.id) : []

  return (
    <div className="grid grid-cols-3 gap-6 h-[calc(100vh-120px)]">
      <div className="glass p-4 overflow-auto">
        <h3 className="text-sm font-semibold text-white/70 mb-3">SELECT CASE</h3>
        {cases.map(c => (
          <button key={c.id} onClick={() => setSelectedCase(c)}
            className={`w-full text-left p-3 rounded-xl mb-2 ${activeCase?.id === c.id ? 'bg-rose-500/20 border border-rose-500/30' : 'hover:bg-white/5'}`}>
            <p className="font-medium text-sm">{c.case_number}</p>
          </button>
        ))}
      </div>

      <div className="col-span-2 space-y-4 overflow-auto">
        <h2 className="text-lg font-bold">Measurements - {activeCase?.case_number}</h2>
        <div className="grid grid-cols-3 gap-4">
          {caseMeasurements.map(m => (
            <div key={m.id} className="glass p-4">
              <div className="flex items-center gap-2 mb-2"><Ruler className="w-4 h-4 text-rose-400" /><p className="font-medium text-sm">{m.region}</p></div>
              <p className="text-2xl font-bold text-rose-300">{m.value} {m.unit}</p>
              <p className="text-xs text-white/40 capitalize">{m.type}</p>
            </div>
          ))}
        </div>
        {caseMeasurements.length === 0 && <div className="glass p-8 text-center text-white/30"><Ruler className="w-12 h-12 mx-auto mb-2 opacity-50" /><p>No measurements for this case</p></div>}
      </div>
    </div>
  )
}
