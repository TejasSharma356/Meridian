'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-black text-white p-12 flex flex-col items-center justify-center font-sans selection:bg-[#6366f1]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl text-center space-y-8"
      >
        <h1 className="text-4xl font-bold tracking-tighter" style={{ fontFamily: 'var(--font-press-start)', fontSize: '24px' }}>CORE PROTOCOLS</h1>
        <ul className="text-left space-y-4 text-white/60">
          <li className="flex items-center gap-3"><span className="text-[#6366f1]">01</span> Real-time Market Gap Synthesis</li>
          <li className="flex items-center gap-3"><span className="text-[#6366f1]">02</span> Interactive Agentic IDE</li>
          <li className="flex items-center gap-3"><span className="text-[#6366f1]">03</span> Automated Portfolio Distillation</li>
          <li className="flex items-center gap-3"><span className="text-[#6366f1]">04</span> Outcome-based Job Matching</li>
        </ul>
        <Link href="/" className="inline-block px-8 py-4 border-2 border-[#6366f1] text-[#6366f1] font-bold uppercase tracking-widest hover:bg-[#6366f1] hover:text-white transition-all">
          Return to Hub
        </Link>
      </motion.div>
    </div>
  );
}
