export type ArchitectureNode = {
  id: string
  label: string
  sublabel?: string
  x?: number
  y?: number
}

export type ArchitectureFlow = {
  label: string
  nodes: ArchitectureNode[]
  links?: Array<[string, string]>
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
  visual: 'route' | 'water' | 'editor' | 'frame' | 'signal' | 'city' | 'fitness'
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
    github: 'https://github.com/pranavv1210/JourneySync-App',
    liveUrl: 'https://journeysyncrideapp.in/',
    featured: true,
    visual: 'route',
    architecture: {
      label: 'Ride signal path',
      nodes: [
        { id: '01', label: 'RIDER', sublabel: 'identity', x: 12, y: 52 },
        { id: '02', label: 'RIDE', sublabel: 'intent', x: 33, y: 30 },
        { id: '03', label: 'ROUTE', sublabel: 'map', x: 54, y: 52 },
        { id: '04', label: 'GROUP', sublabel: 'lobby', x: 74, y: 30 },
        { id: '05', label: 'LIVE', sublabel: 'coordination', x: 88, y: 52 },
      ],
      links: [['01', '02'], ['02', '03'], ['03', '04'], ['04', '05'], ['03', '05']],
    },
  },
  {
    id: 'PROJECT 02',
    slug: 'cardioguard',
    name: 'CardioGuard',
    shortName: 'Mobile Heart Sound Classifier',
    category: 'Mobile AI / Deep Learning',
    year: '2026',
    status: 'Working demo',
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
    liveUrl: 'https://cardioguardai.streamlit.app/',
    featured: true,
    visual: 'signal',
    architecture: {
      label: 'Inference pipeline',
      nodes: [
        { id: '01', label: 'AUDIO', sublabel: '2kHz mono', x: 10, y: 52 },
        { id: '02', label: 'FILTER', sublabel: 'DSP', x: 30, y: 30 },
        { id: '03', label: 'MEL', sublabel: '128x128', x: 50, y: 52 },
        { id: '04', label: 'CNN', sublabel: 'EfficientNet', x: 70, y: 30 },
        { id: '05', label: 'RISK', sublabel: 'threshold', x: 88, y: 52 },
      ],
      links: [['01', '02'], ['02', '03'], ['03', '04'], ['04', '05']],
    },
  },
  {
    id: 'PROJECT 03',
    slug: 'operation-gridlock',
    name: 'Operation Gridlock',
    shortName: 'Vehicle Tracking Intelligence',
    category: 'Computer Vision / Geospatial AI',
    year: '2026',
    status: 'Working live build',
    role: 'Computer vision pipeline, geospatial prediction, AI product interface',
    description:
      'An AI-powered urban security intelligence platform for real-time suspect vehicle tracking using computer vision and geospatial prediction.',
    problem:
      'Citywide CCTV investigations need a faster way to isolate a target vehicle, restore poor footage, forecast likely movement, and generate actionable alerts.',
    solution:
      'A vehicle intelligence workflow that combines CCTV ingestion, detection/segmentation, restoration, route forecasting, and geo-coordinate alerting.',
    outcome:
      'A cinematic AI systems project that demonstrates computer vision, real-time tracking, prediction, and public-safety product thinking.',
    stack: ['Python', 'Computer Vision', 'Geospatial prediction', 'Segmentation', 'Real-time tracking'],
    highlights: ['Vehicle detection', 'CCTV intelligence', 'Visual restoration', 'Route prediction', 'Geo-coordinate alerts'],
    github: 'https://github.com/pranavv1210/gridlock-vehicle-tracking',
    liveUrl: 'https://gridlock-vehicle-tracking.vercel.app/',
    featured: true,
    visual: 'city',
    architecture: {
      label: 'Vehicle pursuit flow',
      nodes: [
        { id: '01', label: 'CCTV', sublabel: 'feed', x: 10, y: 50 },
        { id: '02', label: 'DETECT', sublabel: 'vehicle', x: 30, y: 28 },
        { id: '03', label: 'RESTORE', sublabel: 'clarity', x: 50, y: 50 },
        { id: '04', label: 'FORECAST', sublabel: 'route', x: 70, y: 28 },
        { id: '05', label: 'ALERT', sublabel: 'GPS', x: 88, y: 50 },
      ],
      links: [['01', '02'], ['02', '03'], ['03', '04'], ['04', '05'], ['02', '04']],
    },
  },
  {
    id: 'PROJECT 05',
    slug: 'workstate',
    name: 'WorkState',
    shortName: 'VS Code Context Bridge',
    category: 'Developer Tooling / AI Workflow',
    year: '2026',
    status: 'Working extension',
    role: 'VS Code extension design, local-first workflow, AI context systems',
    description:
      'A local-first engineering context layer for AI coding sessions in VS Code.',
    problem:
      'AI coding sessions lose useful project context, decisions, tasks, and local workflow state across edits.',
    solution:
      'A VS Code extension that captures local engineering context and exposes it as a clearer bridge between the editor, state, and AI-assisted work.',
    outcome:
      'A practical devtool build that shows product thinking around how engineers actually work with AI inside an editor.',
    stack: ['TypeScript', 'VS Code Extension API', 'Local-first state', 'Developer tooling'],
    highlights: ['Editor-native workflow', 'Local project context', 'AI session bridge', 'Marketplace distribution'],
    github: 'https://github.com/pranavv1210/workstate',
    liveUrl: 'https://marketplace.visualstudio.com/items?itemName=pranavv1210.workstate',
    featured: false,
    visual: 'editor',
    architecture: {
      label: 'Editor context bridge',
      nodes: [
        { id: '01', label: 'EDITOR', sublabel: 'VS Code', x: 12, y: 50 },
        { id: '02', label: 'STATE', sublabel: 'local', x: 32, y: 28 },
        { id: '03', label: 'CONTEXT', sublabel: 'project', x: 52, y: 50 },
        { id: '04', label: 'AI', sublabel: 'session', x: 72, y: 28 },
        { id: '05', label: 'ACTION', sublabel: 'ship', x: 88, y: 50 },
      ],
      links: [['01', '02'], ['02', '03'], ['03', '04'], ['04', '05'], ['03', '05']],
    },
  },
  {
    id: 'PROJECT 04',
    slug: 'frame-your-goa',
    name: 'Frame Your Goa',
    shortName: 'Generative Event Graphics',
    category: 'Creative Technology / Graphics',
    year: '2026',
    status: 'Working live build',
    role: 'Frontend, graphics workflow, interaction and export experience',
    description:
      'A creative technology web experience that turns photos into shareable HH Goa 2026 event frames.',
    problem:
      'Event communities need a fast, polished way to create branded visual artifacts without design tooling.',
    solution:
      'A browser-based graphics flow that takes a photo, applies a selected frame mode, renders the final artifact, and prepares it for sharing.',
    outcome:
      'A strong proof of visual systems, canvas-style rendering, interaction design, and product polish.',
    stack: ['Next.js', 'TypeScript', 'Graphics rendering', 'Vercel'],
    highlights: ['Photo upload', 'Frame modes', 'Generated artifact', 'Share/export flow'],
    github: 'https://github.com/pranavv1210/frame-your-goa',
    liveUrl: 'https://frame-your-goa-iota.vercel.app',
    featured: false,
    visual: 'frame',
    architecture: {
      label: 'Graphics render pipeline',
      nodes: [
        { id: '01', label: 'PHOTO', sublabel: 'input', x: 12, y: 50 },
        { id: '02', label: 'MODE', sublabel: 'select', x: 32, y: 28 },
        { id: '03', label: 'FRAME', sublabel: 'compose', x: 52, y: 50 },
        { id: '04', label: 'RENDER', sublabel: 'PNG', x: 72, y: 28 },
        { id: '05', label: 'SHARE', sublabel: 'artifact', x: 88, y: 50 },
      ],
      links: [['01', '02'], ['02', '03'], ['03', '04'], ['04', '05']],
    },
  },
  {
    id: 'PROJECT 06',
    slug: 'aquaflow',
    name: 'AquaFlow',
    shortName: 'Water Tanker OS',
    category: 'Mobile / Operations',
    year: '2026',
    status: 'Working app',
    role: 'Flutter app architecture, Supabase backend, product workflows',
    description:
      'A production-ready Flutter app for managing a water tanker supply business with Supabase, Riverpod, and Material 3.',
    problem:
      'Water tanker operations need cleaner handling for orders, dispatch, customers, drivers, delivery state, and payments.',
    solution:
      'A mobile operating system for water delivery workflows, connecting customer demand to dispatch and delivery tracking.',
    outcome:
      'A mobile product build that makes an offline-heavy logistics workflow feel structured and manageable.',
    stack: ['Flutter', 'Supabase', 'Riverpod', 'Material 3', 'Operations'],
    highlights: ['Order management', 'Dispatch flow', 'Customer records', 'Delivery status', 'Mobile-first UI'],
    github: 'https://github.com/pranavv1210/aquaflow',
    featured: false,
    visual: 'water',
    architecture: {
      label: 'Delivery operations flow',
      nodes: [
        { id: '01', label: 'CUSTOMER', sublabel: 'order', x: 12, y: 50 },
        { id: '02', label: 'DISPATCH', sublabel: 'assign', x: 32, y: 28 },
        { id: '03', label: 'TANKER', sublabel: 'driver', x: 52, y: 50 },
        { id: '04', label: 'DELIVERY', sublabel: 'status', x: 72, y: 28 },
        { id: '05', label: 'PAYMENT', sublabel: 'close', x: 88, y: 50 },
      ],
      links: [['01', '02'], ['02', '03'], ['03', '04'], ['04', '05']],
    },
  },
]

export const featuredProjects = projects.filter((project) => project.featured)
export const labProjects = projects.filter((project) => !project.featured)

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
