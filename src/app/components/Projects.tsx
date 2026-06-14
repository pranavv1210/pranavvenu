'use client'

import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

import ArchitectureDiagram from './ArchitectureDiagram'

const projects = [
  {
    title: 'JourneySync App (Startup Idea)',
    category: 'Full-Stack - Real-time',
    desc: 'A comprehensive platform for live ride coordination and journey management. Features real-time maps, sophisticated user lobbies, ride radar, and a join-request approval flow designed to streamline shared travel.',
    color: 'from-pink-500/30 to-rose-500/30',
    repoUrl: 'https://github.com/pranavv1210/JourneySync-App',
    liveUrl: 'https://journeysync-app.vercel.app/',
    diagram: 'journeysync'
  },
  {
    title: 'AI Resume Screener & Chatbot',
    category: 'React - Node.js - NLP',
    desc: 'Automates resume screening and candidate engagement. Uses Hugging Face and spaCy NLP to semantically match candidates, providing explainable scores and real-time chatbot feedback.',
    color: 'from-purple-500/30 to-blue-500/30',
    repoUrl: 'https://github.com/pranavv1210/AI-Driven-Resume-Screening',
    diagram: 'ai-resume'
  },
  {
    title: 'CardioGuard: AI Heart Analyzer',
    category: 'Python - TensorFlow Lite - Mobile AI',
    desc: 'Transforms smartphones into AI-powered cardiac screening tools using mel-spectrogram preprocessing and deep learning. Optimized with TensorFlow Lite for real-time, offline heart-sound analysis.',
    color: 'from-emerald-500/30 to-teal-500/30',
    repoUrl: 'https://github.com/pranavv1210/cardio-guard',
    diagram: 'cardio-guard'
  },
  {
    title: 'Operation Gridlock',
    category: 'GenAI - Computer Vision - Real-time Tracking',
    desc: 'A vehicle detection and pursuit system for citywide CCTV networks. Combines segmentation, visual restoration, and route forecasting to isolate target vehicles and generate geo-coordinate alerts.',
    color: 'from-orange-500/30 to-red-500/30',
    repoUrl: 'https://github.com/pranavv1210/gridlock-vehicle-tracking',
    diagram: 'gridlock'
  }
]

export default function Projects() {
  return (
    <section className="relative bg-transparent py-20 px-4 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 md:mb-16 tracking-tight drop-shadow-sm">
            Selected Work
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="group relative rounded-2xl md:rounded-3xl p-[1px] overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${proj.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out`}
              />

              <div className="relative h-full w-full bg-[#1a1a1a]/40 backdrop-blur-2xl rounded-2xl md:rounded-3xl p-5 sm:p-8 lg:p-12 border border-white/10 hover:border-white/20 transition-colors flex flex-col justify-between min-h-[360px] md:min-h-[400px]">
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-3 uppercase tracking-[0.08em] sm:tracking-[0.1em] leading-relaxed">{proj.category}</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 tracking-tight leading-snug break-words">{proj.title}</h3>
                  <p className="text-gray-400 text-base sm:text-lg leading-relaxed">{proj.desc}</p>
                  <ArchitectureDiagram type={proj.diagram} />
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-4 mt-8 sm:mt-12">
                  <a
                    href={proj.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium tracking-wide z-10"
                  >
                    <FiGithub size={20} />
                    <span>View Repository</span>
                  </a>
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium tracking-wide z-10"
                    >
                      <FiExternalLink size={20} />
                      <span>View Website</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="https://github.com/pranavv1210"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-6 sm:px-8 py-4 rounded-full bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 hover:border-purple-500/50 text-white transition-all shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] group max-w-full"
          >
            <FiGithub className="scale-110 group-hover:scale-125 transition-transform" />
            <span className="font-semibold tracking-wide">View More on GitHub</span>
            <span className="text-purple-400 group-hover:translate-x-1 transition-transform">-&gt;</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
