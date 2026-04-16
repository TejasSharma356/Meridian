'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white p-12 flex flex-col items-center justify-center font-sans selection:bg-[#6366f1]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl text-center space-y-8"
      >
        <h1 className="text-4xl font-bold tracking-tighter" style={{ fontFamily: 'var(--font-press-start)', fontSize: '24px' }}>ACCESS PRICING</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-8 border-2 border-white/10 rounded-xl">
             <h3 className="text-[#6366f1] font-bold">NODE LITE</h3>
             <p className="text-3xl font-bold mt-2">$0</p>
             <p className="text-xs text-white/40 mt-4">For solo architects exploring the engine.</p>
          </div>
          <div className="p-8 border-2 border-[#6366f1] rounded-xl bg-[#6366f1]/5">
             <h3 className="text-[#6366f1] font-bold">CORE NODE</h3>
             <p className="text-3xl font-bold mt-2">$49/mo</p>
             <p className="text-xs text-white/40 mt-4">Full agentic pipeline access + Supabase sync.</p>
          </div>
        </div>
        <Link href="/" className="inline-block px-8 py-4 border-2 border-[#6366f1] text-[#6366f1] font-bold uppercase tracking-widest hover:bg-[#6366f1] hover:text-white transition-all">
          Return to Hub
        </Link>
      </motion.div>
    </div>
  );
}
