'use client'

export default function ArchitectureDiagram({ type = "journeysync" }: { type?: string }) {
  if (type === "journeysync") {
    // LAYOUT 1: FORK (1 -> 1 -> 2)
    return (
      <div className="w-full mt-6 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden p-6 relative group flex justify-center shadow-inner">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:15px_15px] opacity-40" />
        <div className="relative w-[300px] h-[200px] mx-auto z-10 transition-transform duration-700 group-hover:scale-[1.02]">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 200">
            <path id="j-p1" d="M 30 100 L 130 100" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="2" strokeDasharray="4,4" fill="none" />
            <path id="j-p2" d="M 130 100 L 230 40" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="2" strokeDasharray="4,4" fill="none" />
            <path id="j-p3" d="M 130 100 L 230 160" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="2" strokeDasharray="4,4" fill="none" />
            
            <circle r="3" fill="#fff"><animateMotion dur="1.2s" repeatCount="indefinite"><mpath href="#j-p1" /></animateMotion></circle>
            <circle r="3" fill="#fff"><animateMotion dur="1.5s" repeatCount="indefinite" begin="0.6s"><mpath href="#j-p2" /></animateMotion></circle>
            <circle r="3" fill="#fff"><animateMotion dur="1.5s" repeatCount="indefinite" begin="0.2s"><mpath href="#j-p3" /></animateMotion></circle>
          </svg>

          {/* Nodes */}
          <div className="absolute left-[10px] top-[80px] w-10 text-center"><div className="w-10 h-10 bg-[#1a1a1a] rounded flex items-center justify-center border border-white/20">📱</div><p className="text-[9px] text-gray-400 mt-1">APP</p></div>
          <div className="absolute left-[110px] top-[80px] w-10 text-center"><div className="w-10 h-10 bg-[#1a1a1a] rounded flex items-center justify-center border border-purple-500/50">⚡</div><p className="text-[9px] text-purple-300 mt-1">WS/API</p></div>
          <div className="absolute left-[210px] top-[20px] w-10 text-center"><div className="w-10 h-10 bg-[#1a1a1a] rounded flex items-center justify-center border border-purple-500/50">🗄️</div><p className="text-[9px] text-purple-300 mt-1">DB</p></div>
          <div className="absolute left-[210px] top-[140px] w-10 text-center"><div className="w-10 h-10 bg-[#1a1a1a] rounded flex items-center justify-center border border-sky-400/50">🗺️</div><p className="text-[9px] text-sky-400 mt-1">MAPS</p></div>
        </div>
      </div>
    )
  }

  if (type === "ai-resume") {
    // LAYOUT 2: LINEAR PIPELINE (1 -> 1 -> 1 -> 1)
    return (
      <div className="w-full mt-6 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden p-6 relative group flex justify-center shadow-inner">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:15px_15px] opacity-40" />
        <div className="relative w-[300px] h-[200px] mx-auto z-10 transition-transform duration-700 group-hover:scale-[1.02]">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 200">
            <path id="ai-p1" d="M 35 100 L 105 100" stroke="rgba(34, 197, 94, 0.3)" strokeWidth="2" strokeDasharray="4,4" fill="none" />
            <path id="ai-p2" d="M 115 100 L 185 100" stroke="rgba(249, 115, 22, 0.3)" strokeWidth="2" strokeDasharray="4,4" fill="none" />
            <path id="ai-p3" d="M 195 100 L 265 100" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" strokeDasharray="4,4" fill="none" />
            
            <circle r="3" fill="#fff"><animateMotion dur="1s" repeatCount="indefinite"><mpath href="#ai-p1" /></animateMotion></circle>
            <circle r="3" fill="#fff"><animateMotion dur="1s" repeatCount="indefinite" begin="0.3s"><mpath href="#ai-p2" /></animateMotion></circle>
            <circle r="3" fill="#fff"><animateMotion dur="1s" repeatCount="indefinite" begin="0.6s"><mpath href="#ai-p3" /></animateMotion></circle>
          </svg>

          {/* Nodes */}
          <div className="absolute left-[15px] top-[80px] w-10 text-center"><div className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center border border-white/20">⚛️</div><p className="text-[9px] text-gray-400 mt-2">REACT</p></div>
          <div className="absolute left-[95px] top-[80px] w-10 text-center"><div className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center border border-green-500/50">🟢</div><p className="text-[9px] text-green-300 mt-2">NODE</p></div>
          <div className="absolute left-[175px] top-[80px] w-10 text-center"><div className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center border border-orange-500/50">🧠</div><p className="text-[9px] text-orange-300 mt-2">NLP</p></div>
          <div className="absolute left-[255px] top-[80px] w-10 text-center"><div className="w-10 h-10 bg-[#1a1a1a] rounded flex items-center justify-center border border-blue-400/50">💾</div><p className="text-[9px] text-blue-400 mt-2">OUTPUT</p></div>
        </div>
      </div>
    )
  }

  if (type === "cardio-guard") {
    return (
      <div className="w-full mt-6 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden p-6 relative group flex justify-center shadow-inner">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:15px_15px] opacity-40" />
        <div className="relative w-[300px] h-[200px] mx-auto z-10 transition-transform duration-700 group-hover:scale-[1.02]">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 200">
            <path id="cg-p1" d="M 35 100 L 105 100" stroke="rgba(20, 184, 166, 0.35)" strokeWidth="2" strokeDasharray="4,4" fill="none" />
            <path id="cg-p2" d="M 115 100 L 185 100" stroke="rgba(34, 197, 94, 0.35)" strokeWidth="2" strokeDasharray="4,4" fill="none" />
            <path id="cg-p3" d="M 195 100 L 265 100" stroke="rgba(14, 165, 233, 0.35)" strokeWidth="2" strokeDasharray="4,4" fill="none" />

            <circle r="3" fill="#fff"><animateMotion dur="1s" repeatCount="indefinite"><mpath href="#cg-p1" /></animateMotion></circle>
            <circle r="3" fill="#fff"><animateMotion dur="1s" repeatCount="indefinite" begin="0.3s"><mpath href="#cg-p2" /></animateMotion></circle>
            <circle r="3" fill="#fff"><animateMotion dur="1s" repeatCount="indefinite" begin="0.6s"><mpath href="#cg-p3" /></animateMotion></circle>
          </svg>

          <div className="absolute left-[15px] top-[80px] w-10 text-center"><div className="w-10 h-10 bg-[#1a1a1a] rounded flex items-center justify-center border border-white/20 text-[10px] font-bold">AUDIO</div><p className="text-[9px] text-gray-400 mt-1">INPUT</p></div>
          <div className="absolute left-[95px] top-[80px] w-10 text-center"><div className="w-10 h-10 bg-[#1a1a1a] rounded flex items-center justify-center border border-teal-500/50 text-[10px] font-bold">MEL</div><p className="text-[9px] text-teal-300 mt-1">PREP</p></div>
          <div className="absolute left-[175px] top-[80px] w-10 text-center"><div className="w-10 h-10 bg-[#1a1a1a] rounded flex items-center justify-center border border-green-500/50 text-[10px] font-bold">TFL</div><p className="text-[9px] text-green-300 mt-1">MODEL</p></div>
          <div className="absolute left-[255px] top-[80px] w-10 text-center"><div className="w-10 h-10 bg-[#1a1a1a] rounded flex items-center justify-center border border-sky-400/50 text-[10px] font-bold">APP</div><p className="text-[9px] text-sky-400 mt-1">RESULT</p></div>
        </div>
      </div>
    )
  }

  if (type === "gridlock") {
    return (
      <div className="w-full mt-6 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden p-6 relative group flex justify-center shadow-inner">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:15px_15px] opacity-40" />
        <div className="relative w-[300px] h-[200px] mx-auto z-10 transition-transform duration-700 group-hover:scale-[1.02]">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 200">
            <path id="gl-p1" d="M 35 100 L 115 100" stroke="rgba(249, 115, 22, 0.35)" strokeWidth="2" strokeDasharray="4,4" fill="none" />
            <path id="gl-p2" d="M 125 100 L 205 55" stroke="rgba(239, 68, 68, 0.35)" strokeWidth="2" strokeDasharray="4,4" fill="none" />
            <path id="gl-p3" d="M 125 100 L 205 145" stroke="rgba(168, 85, 247, 0.35)" strokeWidth="2" strokeDasharray="4,4" fill="none" />
            <path id="gl-p4" d="M 215 55 L 265 100" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="2" strokeDasharray="4,4" fill="none" />
            <path id="gl-p5" d="M 215 145 L 265 100" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="2" strokeDasharray="4,4" fill="none" />

            <circle r="3" fill="#fff"><animateMotion dur="1s" repeatCount="indefinite"><mpath href="#gl-p1" /></animateMotion></circle>
            <circle r="3" fill="#fff"><animateMotion dur="1.2s" repeatCount="indefinite" begin="0.2s"><mpath href="#gl-p2" /></animateMotion></circle>
            <circle r="3" fill="#fff"><animateMotion dur="1.2s" repeatCount="indefinite" begin="0.5s"><mpath href="#gl-p3" /></animateMotion></circle>
            <circle r="3" fill="#fff"><animateMotion dur="1s" repeatCount="indefinite" begin="0.7s"><mpath href="#gl-p4" /></animateMotion></circle>
            <circle r="3" fill="#fff"><animateMotion dur="1s" repeatCount="indefinite" begin="0.9s"><mpath href="#gl-p5" /></animateMotion></circle>
          </svg>

          <div className="absolute left-[15px] top-[80px] w-10 text-center"><div className="w-10 h-10 bg-[#1a1a1a] rounded flex items-center justify-center border border-white/20 text-[10px] font-bold">CCTV</div><p className="text-[9px] text-gray-400 mt-1">FEED</p></div>
          <div className="absolute left-[105px] top-[80px] w-10 text-center"><div className="w-10 h-10 bg-[#1a1a1a] rounded flex items-center justify-center border border-orange-500/50 text-[10px] font-bold">SAM</div><p className="text-[9px] text-orange-300 mt-1">SEG</p></div>
          <div className="absolute left-[195px] top-[35px] w-10 text-center"><div className="w-10 h-10 bg-[#1a1a1a] rounded flex items-center justify-center border border-red-500/50 text-[10px] font-bold">AI</div><p className="text-[9px] text-red-300 mt-1">RESTORE</p></div>
          <div className="absolute left-[195px] top-[125px] w-10 text-center"><div className="w-10 h-10 bg-[#1a1a1a] rounded flex items-center justify-center border border-purple-500/50 text-[10px] font-bold">ETA</div><p className="text-[9px] text-purple-300 mt-1">ROUTE</p></div>
          <div className="absolute left-[255px] top-[80px] w-10 text-center"><div className="w-10 h-10 bg-[#1a1a1a] rounded flex items-center justify-center border border-sky-400/50 text-[10px] font-bold">GPS</div><p className="text-[9px] text-sky-400 mt-1">ALERT</p></div>
        </div>
      </div>
    )
  }

  if (type === "tc-summarizer") {
    // LAYOUT 3: DIAMOND CYCLE (Doc -> Flask -> n8n -> FAISS -> back to Flask)
    return (
      <div className="w-full mt-6 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden p-6 relative group flex justify-center shadow-inner">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:15px_15px] opacity-40" />
        <div className="relative w-[300px] h-[200px] mx-auto z-10 transition-transform duration-700 group-hover:scale-[1.02]">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 200">
            <path id="tc-p1" d="M 150 40 L 80 100" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="2" strokeDasharray="4,4" fill="none" />
            <path id="tc-p2" d="M 80 100 L 220 100" stroke="rgba(236, 72, 153, 0.3)" strokeWidth="2" strokeDasharray="4,4" fill="none" />
            <path id="tc-p3" d="M 220 100 L 150 170" stroke="rgba(20, 184, 166, 0.3)" strokeWidth="2" strokeDasharray="4,4" fill="none" />
            <path id="tc-p4" d="M 150 170 L 80 100" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="2" strokeDasharray="4,4" fill="none" />
            
            <circle r="3" fill="#fff"><animateMotion dur="1s" repeatCount="indefinite"><mpath href="#tc-p1" /></animateMotion></circle>
            <circle r="3" fill="#fff"><animateMotion dur="1.5s" repeatCount="indefinite" begin="0.5s"><mpath href="#tc-p2" /></animateMotion></circle>
            <circle r="3" fill="#fff"><animateMotion dur="1s" repeatCount="indefinite" begin="1s"><mpath href="#tc-p3" /></animateMotion></circle>
            <circle r="3" fill="#fff"><animateMotion dur="1s" repeatCount="indefinite" begin="0.2s"><mpath href="#tc-p4" /></animateMotion></circle>
          </svg>

          {/* Nodes */}
          <div className="absolute left-[130px] top-[10px] w-10 text-center"><div className="w-10 h-10 bg-[#1a1a1a] rounded-lg hexagon flex items-center justify-center border border-white/20">📄</div><p className="text-[9px] text-gray-400 mt-1">DOC</p></div>
          <div className="absolute left-[60px] top-[80px] w-10 text-center"><div className="w-10 h-10 bg-[#1a1a1a] rounded flex items-center justify-center border border-red-500/50">🌶️</div><p className="text-[9px] text-red-300 mt-1">FLASK</p></div>
          <div className="absolute left-[200px] top-[80px] w-10 text-center"><div className="w-10 h-10 bg-[#1a1a1a] rounded flex items-center justify-center border border-pink-500/50">⚙️</div><p className="text-[9px] text-pink-300 mt-1">N8N</p></div>
          <div className="absolute left-[130px] top-[150px] w-10 text-center"><div className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center border border-teal-400/50">🔍</div><p className="text-[9px] text-teal-400 mt-1">FAISS</p></div>
        </div>
      </div>
    )
  }

  // LAYOUT 4: CONVERGING PIPELINE (2 -> 1 -> 1)
  return (
    <div className="w-full mt-6 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden p-6 relative group flex justify-center shadow-inner">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:15px_15px] opacity-40" />
      <div className="relative w-[300px] h-[200px] mx-auto z-10 transition-transform duration-700 group-hover:scale-[1.02]">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 200">
          <path id="mh-p1" d="M 50 50 L 150 100" stroke="rgba(234, 179, 8, 0.3)" strokeWidth="2" strokeDasharray="4,4" fill="none" />
          <path id="mh-p2" d="M 50 150 L 150 100" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="2" strokeDasharray="4,4" fill="none" />
          <path id="mh-p3" d="M 150 100 L 250 100" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="2" strokeDasharray="4,4" fill="none" />
          
          <circle r="3" fill="#fff"><animateMotion dur="1s" repeatCount="indefinite"><mpath href="#mh-p1" /></animateMotion></circle>
          <circle r="3" fill="#fff"><animateMotion dur="1s" repeatCount="indefinite" begin="0.5s"><mpath href="#mh-p2" /></animateMotion></circle>
          <circle r="3" fill="#fff"><animateMotion dur="1.2s" repeatCount="indefinite" begin="0.2s"><mpath href="#mh-p3" /></animateMotion></circle>
        </svg>

        {/* Nodes */}
        <div className="absolute left-[30px] top-[30px] w-10 text-center"><div className="w-10 h-10 bg-[#1a1a1a] rounded flex items-center justify-center border border-white/20">📊</div><p className="text-[9px] text-gray-400 mt-1">DATA</p></div>
        <div className="absolute left-[30px] top-[130px] w-10 text-center"><div className="w-10 h-10 bg-[#1a1a1a] rounded flex items-center justify-center border border-yellow-500/50">🐼</div><p className="text-[9px] text-yellow-300 mt-1">PANDAS</p></div>
        <div className="absolute left-[130px] top-[80px] w-10 text-center"><div className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center border border-cyan-500/50">🐬</div><p className="text-[9px] text-cyan-300 mt-1">SQL</p></div>
        <div className="absolute left-[230px] top-[80px] w-10 text-center"><div className="w-10 h-10 bg-[#1a1a1a] rounded flex items-center justify-center border border-indigo-400/50">📉</div><p className="text-[9px] text-indigo-400 mt-1">DASH</p></div>
      </div>
    </div>
  )
}
