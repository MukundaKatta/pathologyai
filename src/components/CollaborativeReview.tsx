'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { MessageSquare, Send, CheckCircle, Circle } from 'lucide-react'

export default function CollaborativeReview() {
  const { comments, cases, selectedCase, setSelectedCase } = useStore()
  const [newComment, setNewComment] = useState('')
  const activeCase = selectedCase || cases[0]
  const caseComments = activeCase ? comments.filter(c => c.case_id === activeCase.id) : []

  return (
    <div className="grid grid-cols-3 gap-6 h-[calc(100vh-120px)]">
      <div className="glass p-4 overflow-auto">
        <h3 className="text-sm font-semibold text-white/70 mb-3">CASE REVIEW QUEUE</h3>
        {cases.map(c => {
          const commentCount = comments.filter(cm => cm.case_id === c.id).length
          const openCount = comments.filter(cm => cm.case_id === c.id && cm.status === 'open').length
          return (
            <button key={c.id} onClick={() => setSelectedCase(c)}
              className={`w-full text-left p-3 rounded-xl mb-2 ${activeCase?.id === c.id ? 'bg-rose-500/20 border border-rose-500/30' : 'hover:bg-white/5'}`}>
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm">{c.case_number}</p>
                {openCount > 0 && <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-300">{openCount} open</span>}
              </div>
              <p className="text-xs text-white/40">{c.pathologist} | {commentCount} comments</p>
            </button>
          )
        })}
      </div>

      <div className="col-span-2 flex flex-col gap-4 h-full">
        <h2 className="text-lg font-bold">Review Discussion - {activeCase?.case_number}</h2>

        <div className="flex-1 glass p-4 overflow-auto space-y-4">
          {caseComments.map(c => (
            <div key={c.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-rose-300">{c.author.split(' ').pop()?.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{c.author}</p>
                  <span className="text-[10px] text-white/30">{new Date(c.created_at).toLocaleDateString()}</span>
                  {c.status === 'resolved' ? <CheckCircle className="w-3 h-3 text-emerald-400" /> : <Circle className="w-3 h-3 text-amber-400" />}
                </div>
                <p className="text-sm text-white/70 mt-1">{c.text}</p>
              </div>
            </div>
          ))}
          {caseComments.length === 0 && <p className="text-white/30 text-center py-8">No comments yet</p>}
        </div>

        <div className="glass p-3 flex gap-2">
          <input value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Add review comment..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none" />
          <button className="px-4 py-2 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 flex items-center gap-1">
            <Send className="w-4 h-4" /> Send
          </button>
        </div>
      </div>
    </div>
  )
}
