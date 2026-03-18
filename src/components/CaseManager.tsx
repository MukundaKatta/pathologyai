'use client'

import { useStore } from '@/lib/store'
import { FolderOpen, Search, Plus } from 'lucide-react'
import { useState } from 'react'

const statusColors: Record<string, string> = {
  pending: 'bg-gray-500/20 text-gray-300', in_review: 'bg-amber-500/20 text-amber-300',
  ai_analyzed: 'bg-blue-500/20 text-blue-300', finalized: 'bg-emerald-500/20 text-emerald-300',
}

export default function CaseManager() {
  const { cases, annotations } = useStore()
  const [search, setSearch] = useState('')

  const filtered = cases.filter(c => c.case_number.toLowerCase().includes(search.toLowerCase()) || c.specimen_type.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6 h-[calc(100vh-120px)] overflow-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Case Management</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search cases..." className="pl-9 pr-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm outline-none w-64" />
          </div>
          <button className="px-4 py-2 rounded-lg bg-rose-500/20 text-rose-300 text-sm flex items-center gap-1"><Plus className="w-4 h-4" />New Case</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {Object.entries(statusColors).map(([status, color]) => (
          <div key={status} className="glass p-4">
            <p className="text-xs text-white/50 capitalize">{status.replace('_', ' ')}</p>
            <p className="text-2xl font-bold text-rose-400">{cases.filter(c => c.status === status).length}</p>
          </div>
        ))}
      </div>

      <div className="glass p-4">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/10">
            <th className="text-left py-2 px-3 text-white/50 text-xs">Case #</th>
            <th className="text-left py-2 px-3 text-white/50 text-xs">Patient</th>
            <th className="text-left py-2 px-3 text-white/50 text-xs">Specimen</th>
            <th className="text-left py-2 px-3 text-white/50 text-xs">Stain</th>
            <th className="text-center py-2 px-3 text-white/50 text-xs">Status</th>
            <th className="text-center py-2 px-3 text-white/50 text-xs">Annotations</th>
            <th className="text-left py-2 px-3 text-white/50 text-xs">Pathologist</th>
          </tr></thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="border-b border-white/5 hover:bg-white/5 cursor-pointer">
                <td className="py-2 px-3 font-medium text-rose-300">{c.case_number}</td>
                <td className="py-2 px-3">{c.patient_name}</td>
                <td className="py-2 px-3 text-xs text-white/60">{c.specimen_type}</td>
                <td className="py-2 px-3 text-xs">{c.stain}</td>
                <td className="py-2 px-3 text-center"><span className={`px-2 py-0.5 rounded-full text-[10px] ${statusColors[c.status]}`}>{c.status.replace('_', ' ')}</span></td>
                <td className="py-2 px-3 text-center">{annotations.filter(a => a.case_id === c.id).length}</td>
                <td className="py-2 px-3 text-xs text-white/50">{c.pathologist}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
