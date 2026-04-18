'use client';

import { motion } from 'framer-motion';

interface Stat {
  label: string;
  val: string;
  status: string;
}

export default function DashboardStats({ stats }: { stats: Stat[] }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <motion.div 
          key={stat.label} 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="p-9 sm:p-10 bg-white/[0.02] border border-white/[0.08] rounded-2xl hover:border-[#d856b8]/40 hover:bg-white/[0.04] transition-all group flex flex-col shadow-xl"
        >
          <p className="text-[11px] uppercase font-bold tracking-[0.22em] text-white/40 mb-7">{stat.label}</p>
          <h2 className="text-5xl font-bold tracking-tighter text-white group-hover:text-[#d856b8] transition-colors">{stat.val}</h2>
          <div className="mt-8 inline-flex items-center px-3 py-1.5 bg-white/[0.05] rounded-md text-[10px] text-white/70 font-bold tracking-wider group-hover:bg-[#d856b8]/10 group-hover:text-[#d856b8] transition-all">
            {stat.status}
          </div>
        </motion.div>
      ))}
    </section>
  );
}
