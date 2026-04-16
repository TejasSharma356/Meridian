'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const MOCK_JOBS = [
  { company: 'Vercel', role: 'Senior Frontend Engineer', loc: 'San Francisco, CA', match: 98, desc: 'You recently built 3 projects using React & Next.js, and your Edge Functions implementation aligns with their core requirements.' },
  { company: 'Linear', role: 'Founding Architect', loc: 'Remote', match: 94, desc: 'Your expertise in high-performance sync engines and desktop-first UI architecture matches their current roadmap.' },
  { company: 'Scale AI', role: 'UX Logic Specialist', loc: 'San Francisco, CA', match: 89, desc: 'The data visualization patterns you implemented in your recent portfolio show high synergy with their ML Ops dashboard.' }
];

export default function ApplyPage() {
  const [selectedJob, setSelectedJob] = useState(MOCK_JOBS[0]);

  return (
    <div className="w-full h-full p-12 bg-black text-white selection:bg-[#d856b8]">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <header className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#6366f1]/20 bg-[#6366f1]/5 w-fit">
            <span className="w-2 h-2 rounded-full bg-[#6366f1] animate-pulse"></span>
            <span className="text-[#6366f1] text-[10px] font-bold uppercase tracking-[0.2em]">Outreach Generation: Active</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white mt-2">Job Matching</h1>
        </header>

        <div className="flex flex-col lg:flex-row gap-12 overflow-hidden items-stretch">
          {/* Job List */}
          <section className="flex-1 flex flex-col gap-6 overflow-y-auto no-scrollbar max-h-[70vh] pb-12">
            <div className="flex items-center justify-between mb-2">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Targeted_Openings.json</h3>
                 <span className="text-[10px] font-bold text-[#6366f1]">{MOCK_JOBS.length} MATCHES</span>
            </div>
            {MOCK_JOBS.map((job, idx) => (
               <motion.div 
                 key={job.company} 
                 onClick={() => setSelectedJob(job)}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: idx * 0.1 }}
                 className={`p-8 rounded-3xl border transition-all cursor-pointer group flex flex-col shadow-xl ${
                   selectedJob.company === job.company 
                     ? 'bg-[#6366f1]/10 border-[#6366f1] shadow-[#6366f1]/10' 
                     : 'bg-white/[0.02] border-white/[0.08] hover:border-white/20'
                 }`}
               >
                 <div className="flex justify-between items-start mb-4">
                   <div>
                     <h3 className="text-xl font-bold tracking-tight group-hover:text-[#d856b8] transition-colors">{job.role}</h3>
                     <p className="font-mono text-xs text-white/40 mt-1 uppercase tracking-widest">{job.company} • {job.loc}</p>
                   </div>
                   <div className="text-right">
                     <span className={`text-lg font-black tracking-tighter ${selectedJob.company === job.company ? 'text-[#6366f1]' : 'text-white/40'}`}>{job.match}%</span>
                     <p className="text-[8px] uppercase tracking-widest text-white/20 font-bold">SYNERGY</p>
                   </div>
                 </div>
                 <div className="mt-4 flex justify-between items-center pt-6 border-t border-white/5">
                    <button className="text-[10px] font-bold uppercase tracking-widest text-[#6366f1] hover:text-[#818cf8] transition-colors">Analyze Match →</button>
                    <span className="material-symbols-outlined text-white/20 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                 </div>
               </motion.div>
            ))}
          </section>

          {/* Analysis & Outreach */}
          <section className="flex-1 flex flex-col gap-6 bg-white/[0.02] border border-white/[0.08] rounded-3xl p-10 backdrop-blur-3xl shadow-2xl h-fit">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Match Analysis: {selectedJob.company}</h2>
            
            <div className="p-6 bg-[#6366f1]/10 border border-[#6366f1]/20 text-white rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                 <span className="material-symbols-outlined text-[#6366f1] text-sm font-bold">verified</span>
                 <strong className="text-xs uppercase tracking-widest text-[#6366f1]">Why you match:</strong>
              </div>
              <p className="text-sm leading-loose text-white/80 font-medium">
                {selectedJob.desc}
              </p>
            </div>

            <h3 className="text-[10px] uppercase font-black tracking-[0.2em] text-white/20 mt-6">Generated Outreach Email</h3>
            
            <div className="relative group/field focus-within:z-10">
              <textarea 
                className="w-full bg-black border border-white/10 rounded-2xl p-6 text-[13px] leading-relaxed text-white/60 font-mono focus:outline-none focus:border-[#6366f1]/40 transition-all custom-scrollbar" 
                rows={10} 
                defaultValue={`Hi Recruitment Node at ${selectedJob.company},\n\nI've been monitoring your work on Edge Intelligence and recently synthesized a portfolio at Meridian OS that matches your architectural stack. My latest build protocols for React/WASM sync engines align with your current founding roadmap.\n\nUplink to my manifest: v0.meridian.io/profile/arch-node-714\n\nNominal Regards,\nCandidate Node 01`}
              ></textarea>
              <div className="absolute top-4 right-4 text-[9px] uppercase tracking-widest text-white/20 font-black">Edit Mode</div>
            </div>

            <button className="w-full bg-[#6366f1] text-white py-4 rounded-xl font-bold text-[11px] tracking-[0.3em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-[#6366f1]/20 mt-4">
              Copy to Clipboard
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
