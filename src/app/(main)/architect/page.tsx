'use client';

import { motion } from 'framer-motion';

const ROADMAP_STEPS = [
  { num: '01', title: 'Define Scope', desc: 'Establishing functional boundaries and identifying the core feature set for the initial release.' },
  { num: '02', title: 'Data Schema', desc: 'Designing the relational architecture and object models to ensure seamless data persistence.' },
  { num: '03', title: 'API Design', desc: 'Specifying the endpoint structure and authentication protocols for the communication layer.' },
  { num: '04', title: 'Frontend Mockup', desc: 'Developing low-fidelity visual structures to validate the user experience and interface flow.' },
  { num: '05', title: 'Test Plan', desc: 'Defining unit and integration testing parameters to maintain long-term codebase stability.' },
];

export default function Architect() {
  return (
    <div className="w-full h-full p-12 bg-black text-white selection:bg-[#d856b8]">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#6366f1] font-bold">Phase 02 / Sequence</span>
          <h1 className="text-4xl font-bold tracking-tight text-white">Architect Roadmap</h1>
          <p className="text-white/50 max-w-xl">Mapping the structural integrity of your application. This blueprint defines the execution path from concept to code.</p>
        </div>

        <div className="bg-white/[0.02] rounded-3xl p-10 border border-white/[0.08] relative backdrop-blur-3xl shadow-2xl">
          <div className="absolute left-14 top-16 bottom-16 w-px bg-white/[0.05]"></div>
          
          <div className="flex flex-col gap-12 relative z-10">
            {ROADMAP_STEPS.map((item, idx) => (
              <motion.div 
                key={item.num} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-8 group"
              >
                <div className="flex-none h-10 w-10 rounded-full bg-black border border-white/10 flex items-center justify-center text-[10px] font-bold text-[#6366f1] group-hover:border-[#6366f1]/50 transition-all shadow-[0_0_15px_rgba(99,102,241,0.1)]">
                  {item.num}
                </div>
                <div className="flex flex-col gap-1 pt-1.5 min-w-0">
                  <h3 className="text-lg font-semibold text-white tracking-tight">{item.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed font-normal">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex justify-end">
            <button className="px-8 py-3 bg-[#6366f1] text-white rounded-xl font-sans text-sm font-bold tracking-tight hover:scale-[1.02] transition-all active:scale-[0.98] flex items-center gap-2 shadow-lg shadow-[#6366f1]/20">
              Confirm & Start Coding
              <span className="material-symbols-outlined text-sm">terminal</span>
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center px-8 py-8 border-t border-white/5 bg-white/[0.01] rounded-b-3xl">
          <div className="flex gap-4 items-center">
            <div className="h-10 w-10 bg-white/[0.05] rounded-xl border border-white/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#6366f1]">model_training</span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">Obsidian Engine 4.0</p>
              <p className="text-[10px] text-white/40 font-mono">LATENCY: 12ms | STATE: STABLE</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full bg-[#6366f1]/20 animate-pulse"></div>
            <div className="h-2 w-2 rounded-full bg-[#6366f1]/40"></div>
            <div className="h-2 w-2 rounded-full bg-[#6366f1]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
