import type { PathCase, Annotation, Measurement, ReviewComment } from './supabase'

export const mockCases: PathCase[] = [
  { id: '1', case_number: 'PATH-2026-001', patient_name: 'Patient A', specimen_type: 'Breast Core Biopsy', stain: 'H&E', status: 'ai_analyzed', pathologist: 'Dr. Smith', created_at: '2026-02-01T10:00:00Z' },
  { id: '2', case_number: 'PATH-2026-002', patient_name: 'Patient B', specimen_type: 'Lung Resection', stain: 'H&E', status: 'in_review', pathologist: 'Dr. Johnson', created_at: '2026-02-05T10:00:00Z' },
  { id: '3', case_number: 'PATH-2026-003', patient_name: 'Patient C', specimen_type: 'Colon Biopsy', stain: 'H&E', status: 'pending', pathologist: 'Dr. Lee', created_at: '2026-02-10T10:00:00Z' },
  { id: '4', case_number: 'PATH-2026-004', patient_name: 'Patient D', specimen_type: 'Skin Excision', stain: 'IHC - Ki67', status: 'finalized', pathologist: 'Dr. Smith', created_at: '2026-02-12T10:00:00Z' },
  { id: '5', case_number: 'PATH-2026-005', patient_name: 'Patient E', specimen_type: 'Prostate Biopsy', stain: 'H&E', status: 'ai_analyzed', pathologist: 'Dr. Chen', created_at: '2026-02-15T10:00:00Z' },
]

export const mockAnnotations: Annotation[] = [
  { id: '1', case_id: '1', type: 'detection', label: 'Invasive Carcinoma', x: 120, y: 80, width: 200, height: 150, confidence: 0.95, color: '#ef4444', author: 'AI', created_at: '2026-02-01T10:00:00Z' },
  { id: '2', case_id: '1', type: 'detection', label: 'DCIS', x: 400, y: 200, width: 120, height: 100, confidence: 0.88, color: '#f59e0b', author: 'AI', created_at: '2026-02-01T10:00:00Z' },
  { id: '3', case_id: '1', type: 'region', label: 'Tumor Bed', x: 50, y: 50, width: 350, height: 300, confidence: 0.92, color: '#8b5cf6', author: 'Dr. Smith', created_at: '2026-02-02T10:00:00Z' },
  { id: '4', case_id: '1', type: 'detection', label: 'Mitotic Figure', x: 180, y: 140, width: 30, height: 30, confidence: 0.82, color: '#10b981', author: 'AI', created_at: '2026-02-01T10:00:00Z' },
  { id: '5', case_id: '2', type: 'detection', label: 'Adenocarcinoma', x: 200, y: 150, width: 250, height: 180, confidence: 0.91, color: '#ef4444', author: 'AI', created_at: '2026-02-05T10:00:00Z' },
  { id: '6', case_id: '5', type: 'detection', label: 'Gleason 4+3', x: 100, y: 100, width: 300, height: 200, confidence: 0.87, color: '#ef4444', author: 'AI', created_at: '2026-02-15T10:00:00Z' },
]

export const mockMeasurements: Measurement[] = [
  { id: '1', case_id: '1', type: 'distance', value: 2.4, unit: 'mm', region: 'Tumor diameter', created_at: '2026-02-01T10:00:00Z' },
  { id: '2', case_id: '1', type: 'area', value: 4.52, unit: 'mm^2', region: 'Tumor area', created_at: '2026-02-01T10:00:00Z' },
  { id: '3', case_id: '1', type: 'count', value: 8, unit: 'per 10 HPF', region: 'Mitotic count', created_at: '2026-02-01T10:00:00Z' },
  { id: '4', case_id: '5', type: 'distance', value: 1.8, unit: 'mm', region: 'Largest focus', created_at: '2026-02-15T10:00:00Z' },
]

export const mockComments: ReviewComment[] = [
  { id: '1', case_id: '1', author: 'Dr. Smith', text: 'AI detection confirmed. Grade 2 invasive ductal carcinoma with associated DCIS.', status: 'resolved', created_at: '2026-02-02T10:00:00Z' },
  { id: '2', case_id: '1', author: 'Dr. Johnson', text: 'Agree with grading. Recommend ER/PR/HER2 staining.', status: 'open', created_at: '2026-02-03T10:00:00Z' },
  { id: '3', case_id: '2', author: 'Dr. Johnson', text: 'Need to evaluate margins more carefully in this section.', status: 'open', created_at: '2026-02-06T10:00:00Z' },
]
