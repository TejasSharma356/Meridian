'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const MOCK_PROJECTS = [
  { 
    id: 'cs-ai',
    title: 'Customer Support AI', 
    icon: 'smart_toy', 
    tags: ['Next.js', 'OpenAI', 'Pinecone'], 
    fit: 98,
    desc: 'Market gap analysis utilizing vector memory to locate high-demand ecosystem opportunities.' 
  },
  { 
    id: 'devops',
    title: 'DevOps Automator', 
    icon: 'settings_input_component', 
    tags: ['Python', 'Docker', 'GitHub Actions'], 
    fit: 95,
    desc: 'End-to-end blueprinting: functional scope, data schemas, and strict API mockups.' 
  },
  { 
    id: 'security',
    title: 'Security Protocol Shield', 
    icon: 'terminal', 
    tags: ['Rust', 'WebAssembly', 'VPC'], 
    fit: 92,
    desc: 'Automated extraction outputting GitHub-ready readmes and matched portfolios.' 
  }
];

export default function Intelligence() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  return (
    <div className="w-full h-full p-12 bg-black text-white selection:bg-[#d856b8] selection:text-white">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-white mb-2" style={{ fontFamily: 'var(--font-inter)' }}>High-Demand Opportunities</h2>
          <div className="h-px w-12 bg-[#6366f1]/40"></div>
        </header>

        <section className="flex flex-col gap-y-6">
          {MOCK_PROJECTS.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative flex flex-col md:flex-row justify-between items-start md:items-center p-8 bg-white/[0.02] border border-white/[0.08] rounded-2xl hover:bg-white/[0.04] hover:border-[#6366f1]/30 transition-all duration-300"
            >
              <div className="flex-1">
                <div className="flex items-center gap-x-3 mb-2">
                  <span className="material-symbols-outlined text-[#6366f1]/60 text-lg">{project.icon}</span>
                  <h3 className="text-xl font-medium text-white tracking-tight">{project.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-white/[0.05] text-white/50 rounded-md border border-white/[0.05]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-x-12 w-full md:w-auto mt-6 md:mt-0 pt-6 md:pt-0 border-t md:border-t-0 border-white/[0.05]">
                <div className="text-right">
                  <p className="text-[9px] uppercase tracking-widest text-white/30 mb-1">Market Fit</p>
                  <p className="text-2xl font-bold text-[#6366f1] tracking-tighter">{project.fit}%</p>
                </div>
                <button className="px-6 py-2.5 bg-[#6366f1] text-white text-[11px] font-bold uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-[#6366f1]/20">
                  Select Project
                </button>
              </div>
            </motion.div>
          ))}
        </section>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 bg-white/[0.02] border border-white/[0.08] rounded-2xl group hover:border-[#6366f1]/20 transition-all">
            <p className="text-[10px] uppercase tracking-widest text-white/30 mb-4 font-bold">Market Velocity</p>
            <div className="flex items-baseline gap-x-2">
              <span className="text-3xl font-light tracking-tighter text-white">+12.4%</span>
              <span className="text-[#6366f1] text-[10px] font-bold">UPWARD</span>
            </div>
            <p className="text-xs text-white/40 mt-3 leading-relaxed">AI-integration services are trending higher in Q4 forecasts based on live market analysis.</p>
          </div>
          <div className="p-8 bg-white/[0.02] border border-white/[0.08] rounded-2xl group hover:border-[#6366f1]/20 transition-all">
            <p className="text-[10px] uppercase tracking-widest text-white/30 mb-4 font-bold">Suggested Priority</p>
            <div className="flex items-center gap-x-2">
              <span className="material-symbols-outlined text-[#6366f1] text-sm">bolt</span>
              <span className="text-sm font-medium text-white">Customer Support AI</span>
            </div>
            <p className="text-xs text-white/40 mt-3 leading-relaxed">Highest ROI based on your current architectural stack proficiency and skill acquisition speed.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
