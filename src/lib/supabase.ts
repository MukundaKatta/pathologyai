import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export type PathCase = { id: string; case_number: string; patient_name: string; specimen_type: string; stain: string; status: 'pending' | 'in_review' | 'ai_analyzed' | 'finalized'; pathologist: string; created_at: string }
export type Annotation = { id: string; case_id: string; type: 'detection' | 'measurement' | 'region' | 'comment'; label: string; x: number; y: number; width: number; height: number; confidence: number; color: string; author: string; created_at: string }
export type Measurement = { id: string; case_id: string; type: 'distance' | 'area' | 'count'; value: number; unit: string; region: string; created_at: string }
export type ReviewComment = { id: string; case_id: string; author: string; text: string; status: 'open' | 'resolved'; created_at: string }
