'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white p-12 flex flex-col items-center justify-center font-sans selection:bg-[#6366f1]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl text-center space-y-8"
      >
        <h1 className="text-4xl font-bold tracking-tighter" style={{ fontFamily: 'var(--font-press-start)', fontSize: '24px' }}>ABOUT MEREDIAN</h1>
        <p className="text-white/60 leading-relaxed text-lg">
          Meredian is a decentralized career acceleration platform designed for the AI-first age. It automates the journey from market gap identification to job-ready portfolio generation.
        </p>
        <Link href="/" className="inline-block px-8 py-4 border-2 border-[#6366f1] text-[#6366f1] font-bold uppercase tracking-widest hover:bg-[#6366f1] hover:text-white transition-all">
          Return to Hub
        </Link>
      </motion.div>
    </div>
  );
}
