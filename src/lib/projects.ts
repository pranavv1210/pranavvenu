export type ArchitectureNode = {
  id: string
  label: string
  sublabel?: string
}

export type ArchitectureFlow = {
  label: string
  nodes: ArchitectureNode[]
}

export type Project = {
  id: string
  slug: string
  name: string
  shortName: string
  category: string
  year: string
  status: string
  role: string
  description: string
  problem: string
  solution: string
  outcome: string
  stack: string[]
  highlights: string[]
  github?: string
  liveUrl?: string
  featured: boolean
  visual: 'route' | 'water' | 'editor' | 'frame' | 'document' | 'signal'
  architecture: ArchitectureFlow
}

export const projects: Project[] = [
  {
    id: 'PROJECT 01',
    slug: 'journeysync',
    name: 'JourneySync',
    shortName: 'Ride Coordination System',
    category: 'Mobile / Real-time Product',
    year: '2026',
    status: 'Live build',
    role: 'Product engineering, Flutter app, Supabase backend',
    description:
      'A Flutter-based ride coordination app for bikers to create, discover, and join rides in real time.',
    problem:
      'Group rides break down when planning, safety, location updates, and join approvals live across scattered chats.',
    solution:
      'A mobile-first coordination system with ride discovery, lobbies, live tracking, SOS sharing, profile management, and Supabase-backed auth/data/storage.',
    outcome:
      'A product-shaped build that turns a messy travel workflow into a coordinated rider operating layer.',
    stack: ['Flutter', 'Supabase', 'Maps', 'Auth', 'Realtime data'],
    highlights: ['Phone/Gmail auth flows', 'Ride lobbies', 'Nearby ride alerts', 'Live ride tracking', 'SOS sharing'],
    github: 'https://github.com/pranavv1210/journeysync-app',
    liveUrl: 'https://journeysync-app.vercel.app/',
    featured: true,
    visual: 'route',
    architecture: {
      label: 'Ride signal path',
      nodes: [
        { id: '01', label: 'RIDER', sublabel: 'identity' },
        { id: '02', label: 'RIDE', sublabel: 'intent' },
        { id: '03', label: 'ROUTE', sublabel: 'map' },
        { id: '04', label: 'GROUP', sublabel: 'lobby' },
        { id: '05', label: 'LIVE', sublabel: 'coordination' },
      ],
    },
  },
  {
    id: 'PROJECT 02',
    slug: 'ai-resume-screening',
    name: 'AI Resume Screening System',
    shortName: 'Recruitment Intelligence',
    category: 'AI / NLP / Full-stack',
    year: '2026',
    status: 'Ongoing',
    role: 'AI workflow, full-stack web app, candidate chatbot',
    description:
      'A recruitment web app for resume parsing, semantic job matching, explainable scoring, and candidate feedback.',
    problem:
      'Recruiters need structured candidate comparison, while applicants rarely get useful feedback before submission.',
    solution:
      'A React and Node system using Hugging Face, spaCy, Supabase, Auth.js, and Rasa Open Source to parse resumes, match jobs, and power a feedback chatbot.',
    outcome:
      'A practical AI product surface that connects NLP scoring with HR collaboration and candidate-facing guidance.',
    stack: ['React', 'Node.js', 'Express', 'Hugging Face', 'spaCy', 'Supabase', 'Auth.js', 'Rasa'],
    highlights: ['Resume parsing', 'Semantic matching', 'Explainable scores', 'Candidate chatbot', 'HR review tools'],
    github: 'https://github.com/pranavv1210/AI-Driven-Resume-Screening',
    featured: true,
    visual: 'document',
    architecture: {
      label: 'Candidate evaluation pipeline',
      nodes: [
        { id: '01', label: 'RESUME', sublabel: 'input' },
        { id: '02', label: 'PARSER', sublabel: 'NLP' },
        { id: '03', label: 'MATCH', sublabel: 'score' },
        { id: '04', label: 'CHATBOT', sublabel: 'feedback' },
        { id: '05', label: 'HR', sublabel: 'decision' },
      ],
    },
  },
  {
    id: 'PROJECT 03',
    slug: 'cardioguard',
    name: 'CardioGuard',
    shortName: 'Mobile Heart Sound Classifier',
    category: 'Mobile AI / Deep Learning',
    year: '2026',
    status: 'Prototype',
    role: 'Signal preprocessing, model integration, mobile-first inference',
    description:
      'A mobile-first heart sound classifier for normal versus abnormal phonocardiogram recordings.',
    problem:
      'Cardiac screening requires careful audio preprocessing before a model can make reliable, explainable predictions.',
    solution:
      'A pipeline that loads mono audio, filters and denoises the signal, converts windows into mel spectrograms, and runs an EfficientNet-B0 classifier.',
    outcome:
      'A compact applied-AI build focused on offline-friendly medical signal classification workflows.',
    stack: ['Python', 'TensorFlow Lite', 'EfficientNet-B0', 'Audio DSP', 'Mel spectrograms'],
    highlights: ['Bandpass filtering', 'Wavelet denoising', 'Amplitude normalization', 'Silence trimming', 'Thresholded inference'],
    github: 'https://github.com/pranavv1210/cardio-guard',
    featured: true,
    visual: 'signal',
    architecture: {
      label: 'Inference pipeline',
      nodes: [
        { id: '01', label: 'AUDIO', sublabel: '2kHz mono' },
        { id: '02', label: 'CLEAN', sublabel: 'DSP' },
        { id: '03', label: 'MEL', sublabel: '128x128' },
        { id: '04', label: 'MODEL', sublabel: 'EfficientNet' },
        { id: '05', label: 'RESULT', sublabel: 'threshold' },
      ],
    },
  },
  {
    id: 'PROJECT 04',
    slug: 'terms-summarizer',
    name: 'Terms & Conditions Summarizer',
    shortName: 'Readable Legal Automation',
    category: 'Automation / GenAI',
    year: '2026',
    status: 'Prototype',
    role: 'Workflow design, scraping, retrieval, summarization',
    description:
      'An n8n and Flask workflow that turns long legal documents into plain-language summaries from a URL.',
    problem:
      'Most users skip dense terms and policies because the important clauses are buried in long legal text.',
    solution:
      'A modular workflow extracts, cleans, indexes, and summarizes terms content with Hugging Face Transformers, FAISS, and BeautifulSoup.',
    outcome:
      'A focused automation experiment that improves transparency for legal and long-form document reading.',
    stack: ['Python', 'n8n', 'Flask', 'Hugging Face', 'FAISS', 'BeautifulSoup'],
    highlights: ['URL ingestion', 'Content cleaning', 'Vector retrieval', 'Plain-language summaries', 'Reusable workflow'],
    featured: true,
    visual: 'document',
    architecture: {
      label: 'Document compression route',
      nodes: [
        { id: '01', label: 'URL', sublabel: 'source' },
        { id: '02', label: 'EXTRACT', sublabel: 'clean' },
        { id: '03', label: 'INDEX', sublabel: 'FAISS' },
        { id: '04', label: 'MODEL', sublabel: 'summary' },
        { id: '05', label: 'USER', sublabel: 'readable' },
      ],
    },
  },
  {
    id: 'PROJECT 05',
    slug: 'student-mental-health-sql',
    name: 'Student Mental Health SQL Analysis',
    shortName: 'Analytical Data Pipeline',
    category: 'Data / SQL / Python',
    year: '2025',
    status: 'Completed',
    role: 'Schema design, SQL analysis, Python ETL, visualization',
    description:
      'A data analysis pipeline for student demographics and self-reported mental health scores.',
    problem:
      'Survey data needs structure before trends across gender, treatment-seeking status, and year of study become visible.',
    solution:
      'A normalized MySQL schema, complex SQL queries with CTEs and conditional aggregation, and Python/Pandas visual analysis.',
    outcome:
      'A clear analytical workflow moving from raw survey data into explainable charts and comparisons.',
    stack: ['Python', 'MySQL', 'Pandas', 'Matplotlib', 'Seaborn'],
    highlights: ['Normalized schema', 'CTEs', 'Conditional aggregation', 'ETL script', 'Data visualization'],
    featured: false,
    visual: 'signal',
    architecture: {
      label: 'Analysis pipeline',
      nodes: [
        { id: '01', label: 'SURVEY', sublabel: 'raw' },
        { id: '02', label: 'SCHEMA', sublabel: 'SQL' },
        { id: '03', label: 'QUERY', sublabel: 'CTE' },
        { id: '04', label: 'ETL', sublabel: 'Pandas' },
        { id: '05', label: 'CHARTS', sublabel: 'insight' },
      ],
    },
  },
  {
    id: 'PROJECT 06',
    slug: 'revivemotion',
    name: 'ReviveMotion',
    shortName: 'Cancer Rehab Monitoring',
    category: 'Computer Vision / Hackathon',
    year: '2026',
    status: 'Hackathon build',
    role: 'AI and computer vision web platform contributor',
    description:
      'A markerless cancer rehabilitation monitoring platform built during VYUHATECH 2.0.',
    problem:
      'Rehabilitation exercises need accessible movement monitoring without requiring specialized markers or hardware.',
    solution:
      'A web platform concept using AI and computer vision for real-time markerless rehab movement analysis.',
    outcome:
      'A competition build demonstrating applied computer vision for healthcare-adjacent workflows.',
    stack: ['Computer Vision', 'AI', 'Web platform', 'Real-time analysis'],
    highlights: ['Markerless tracking', 'Rehab workflow', 'Hackathon execution', 'AI-assisted monitoring'],
    featured: false,
    visual: 'signal',
    architecture: {
      label: 'Motion analysis flow',
      nodes: [
        { id: '01', label: 'CAMERA', sublabel: 'input' },
        { id: '02', label: 'POSE', sublabel: 'vision' },
        { id: '03', label: 'MOTION', sublabel: 'track' },
        { id: '04', label: 'ANALYZE', sublabel: 'AI' },
        { id: '05', label: 'FEEDBACK', sublabel: 'rehab' },
      ],
    },
  },
]

export const featuredProjects = projects.filter((project) => project.featured)
export const labProjects = projects.filter((project) => !project.featured)

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
