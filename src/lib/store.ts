import { create } from 'zustand'
import type { PathCase, Annotation, Measurement, ReviewComment } from './supabase'

type Tab = 'viewer' | 'cases' | 'annotations' | 'measurements' | 'review'

interface PathologyState {
  activeTab: Tab; setActiveTab: (t: Tab) => void
  cases: PathCase[]; setCases: (c: PathCase[]) => void
  selectedCase: PathCase | null; setSelectedCase: (c: PathCase | null) => void
  annotations: Annotation[]; setAnnotations: (a: Annotation[]) => void
  measurements: Measurement[]; setMeasurements: (m: Measurement[]) => void
  comments: ReviewComment[]; setComments: (c: ReviewComment[]) => void
  activeTool: 'pan' | 'annotate' | 'measure' | 'comment'; setActiveTool: (t: 'pan' | 'annotate' | 'measure' | 'comment') => void
}

export const useStore = create<PathologyState>((set) => ({
  activeTab: 'viewer', setActiveTab: (activeTab) => set({ activeTab }),
  cases: [], setCases: (cases) => set({ cases }),
  selectedCase: null, setSelectedCase: (selectedCase) => set({ selectedCase }),
  annotations: [], setAnnotations: (annotations) => set({ annotations }),
  measurements: [], setMeasurements: (measurements) => set({ measurements }),
  comments: [], setComments: (comments) => set({ comments }),
  activeTool: 'pan', setActiveTool: (activeTool) => set({ activeTool }),
}))
