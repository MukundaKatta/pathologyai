# PathologyAI

**AI-Powered Digital Pathology Platform**

PathologyAI is a digital pathology platform for viewing, annotating, and analyzing whole-slide images. Use the high-resolution slide viewer powered by OpenSeadragon, create precise annotations, take measurements, and collaborate with colleagues through a built-in review workflow.

## Features

- **Whole-Slide Viewer** -- High-resolution slide viewing with OpenSeadragon deep-zoom support
- **Case Management** -- Organize and track pathology cases with status and metadata
- **Annotation Tools** -- Draw, label, and categorize regions of interest on slides
- **Measurement Tools** -- Precise distance, area, and perimeter measurements on specimens
- **Collaborative Review** -- Multi-pathologist review workflow with comments and consensus tracking
- **AI-Assisted Analysis** -- Automated detection and classification suggestions

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Slide Viewer:** OpenSeadragon
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Backend:** Supabase
- **Charts:** Recharts
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone <repository-url>
cd pathologyai
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   └── page.tsx                # Main application (tabbed interface)
├── components/
│   ├── SlideViewer.tsx         # OpenSeadragon deep-zoom viewer
│   ├── CaseManager.tsx         # Case organization & tracking
│   ├── AnnotationPanel.tsx     # Drawing & labeling tools
│   ├── MeasurementTools.tsx    # Measurement instruments
│   └── CollaborativeReview.tsx # Peer review & comments
└── lib/
    ├── store.ts                # Zustand state management
    └── mock-data.ts            # Sample pathology data
```

