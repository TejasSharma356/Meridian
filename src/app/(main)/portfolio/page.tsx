'use client';

import { motion } from 'framer-motion';
import { BackButton } from "@/components/ui/back-button";

export default function Portfolio() {
  return (
    <div className="w-full h-full flex flex-col relative bg-black text-white selection:bg-[#d856b8]">
      <div className="px-12 pt-12 pb-6 flex flex-col gap-4">
        <BackButton />
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6366f1] opacity-60">Phase 04 & 05</span>
          <h2 className="text-4xl font-bold tracking-tight mt-2">Portfolio Strategy</h2>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden px-12 pb-32 gap-12">
        {/* Left Side: Documentation Preview */}
        <section className="w-1/2 flex flex-col gap-6 h-full">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Project_Manifest.md</h3>
            <div className="flex gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/10"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/10"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/10"></span>
            </div>
          </div>
          <div className="flex-1 bg-white/[0.02] border border-white/[0.08] rounded-3xl p-10 overflow-y-auto no-scrollbar font-sans text-sm leading-relaxed backdrop-blur-3xl shadow-2xl">
            <div className="prose prose-invert max-w-none">
              <h1 className="text-3xl font-black mb-6 border-b border-white/10 pb-4 tracking-tighter">Obsidian Flow Engine</h1>
              <p className="text-white/60 mb-8 leading-loose">A high-performance reactive architecture for localized intelligence processing. Built for the modern obsidian-tier architect utilizing vector memory propagation.</p>

              <h3 className="text-lg font-bold mt-10 mb-4 text-[#6366f1] tracking-tight uppercase text-[12px]">Core Features</h3>
              <ul className="space-y-3 mb-8">
                {['Zero-latency event propagation', 'Tonal stacking UI components', 'Asymmetric data visualization', 'Automated documentation synthesis'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-white/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1]"></span>
                    {f}
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-bold mt-10 mb-4 text-[#6366f1] tracking-tight uppercase text-[12px]">Architecture</h3>
              <div className="bg-black p-6 rounded-2xl border border-white/5 font-mono text-[12px] text-white/50 mb-8 whitespace-pre-wrap leading-relaxed">
                {`graph TD;\n  A[Input Layer] --> B[Processing Hub];\n  B --> C[Vector Memory];\n  B --> D[Visual Output];`}
              </div>

              <h3 className="text-lg font-bold mt-10 mb-4 text-[#6366f1] tracking-tight uppercase text-[12px]">Deployment</h3>
              <p className="text-white/40 leading-loose">Deploy to edge nodes with a single command. The engine handles horizontal scaling across distributed obsidian clusters automatically.</p>
            </div>
          </div>
        </section>

        {/* Right Side: Market Matches */}
        <section className="w-1/2 flex flex-col gap-6 h-full">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Matched_Ecosystems</h3>
            <div className="px-3 py-1 bg-[#6366f1]/10 border border-[#6366f1]/30 rounded-lg text-[9px] font-black text-[#6366f1] tracking-widest uppercase">3 Active Matches</div>
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar pb-10">
            {[
              { company: 'Vercel Inc.', role: 'Lead Design Engineer', fit: 98, tags: ['React', 'Next.js', 'WASM'], type: 'Technical Fit' },
              { company: 'Linear', role: 'Founding Architect', fit: 94, tags: ['Rust', 'Desktop-First', 'Sync Engines'], type: 'Product Fit' },
              { company: 'Scale AI', role: 'UX Logic Specialist', fit: 89, tags: ['Data Viz', 'ML Ops', 'Python'], type: 'Domain Match' }
            ].map((match, idx) => (
              <motion.div 
                key={match.company}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-white/[0.02] border border-white/[0.08] rounded-3xl group hover:border-[#6366f1]/30 hover:bg-white/[0.04] transition-all cursor-pointer shadow-xl"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-[#6366f1] transition-colors tracking-tight">{match.company}</h4>
                    <p className="text-sm text-white/40 font-medium mt-1">{match.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-[#6366f1] tracking-tighter">{match.fit}%</div>
                    <div className="text-[9px] uppercase tracking-widest text-white/20 font-bold mt-1">{match.type}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {match.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-white/[0.05] rounded-md text-[9px] text-white/40 font-bold tracking-tight border border-white/5 uppercase">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-auto p-6 bg-[#6366f1]/5 rounded-3xl border border-[#6366f1]/10 flex items-start gap-5 flex-shrink-0 backdrop-blur-3xl shadow-2xl shadow-[#6366f1]/5">
            <span className="material-symbols-outlined text-[#6366f1] text-lg mt-0.5">info</span>
            <p className="text-[11px] text-white/60 leading-relaxed font-medium">
              AI matches are calculated based on your architectural patterns in the Build phase and the metadata exported from your local repositories. These targets have the highest synergy with your current node status.
            </p>
          </div>
        </section>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 right-0 w-full md:w-[calc(100%-260px)] h-28 bg-black/60 backdrop-blur-2xl flex items-center justify-center border-t border-white/5 z-50">
        <button className="px-16 py-4 bg-[#6366f1] text-white rounded-xl font-bold text-[12px] tracking-[0.3em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-[#6366f1]/30">
          Finalize & Export Portfolio
        </button>
      </div>
    </div>
  );
}
