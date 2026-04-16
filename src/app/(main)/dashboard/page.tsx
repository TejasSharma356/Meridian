'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MOCK_STATS = [
  { label: 'PROJECTS DEPLOYED', val: '4', status: '+1 THIS WEEK' },
  { label: 'MARKET MATCH SCORE', val: '86%', status: 'HIGH PROBABILITY' },
  { label: 'APPLICATIONS SENT', val: '12', status: '3 INTERVIEWS PENDING' },
  { label: 'SKILL COMPREHENSION', val: '92%', status: 'ADVANCING' }
];

export default function Dashboard() {
  const [stats, setStats] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulated fetch
    const timer = setTimeout(() => {
      setStats(MOCK_STATS);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full p-12 bg-black text-white selection:bg-[#d856b8]">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <header className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d856b8]/20 bg-[#d856b8]/5 w-fit">
            <span className="w-2 h-2 rounded-full bg-[#d856b8] animate-pulse"></span>
            <span className="text-[#d856b8] text-[10px] font-bold uppercase tracking-[0.2em]">System Status: All Systems Nominal</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white mt-2">Dashboard Overview</h1>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            <div className="col-span-full py-20 text-center text-white/30 text-[10px] font-bold tracking-[0.3em] animate-pulse uppercase">
              Synchronizing with edge nodes...
            </div>
          ) : (
            stats.map((stat, idx) => (
              <motion.div 
                key={stat.label} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-white/[0.02] border border-white/[0.08] rounded-2xl hover:border-[#d856b8]/40 hover:bg-white/[0.04] transition-all group flex flex-col shadow-xl"
              >
                <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 mb-6">{stat.label}</p>
                <h2 className="text-4xl font-bold tracking-tighter text-white group-hover:text-[#d856b8] transition-colors">{stat.val}</h2>
                <div className="mt-8 inline-flex items-center px-3 py-1 bg-white/[0.05] rounded-md text-[9px] text-white/70 font-bold tracking-wider group-hover:bg-[#d856b8]/10 group-hover:text-[#d856b8] transition-all">
                  {stat.status}
                </div>
              </motion.div>
            ))
          )}
        </section>

        {/* Activity Feed placeholder */}
        <section className="mt-4 p-8 bg-white/[0.01] border border-white/5 rounded-3xl">
           <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/20 mb-6">Recent Intelligence Logs</h3>
           <div className="space-y-4">
              {[
                { time: '14:22', event: 'Market Gap analysis completed for "Vector Memory"', type: 'success' },
                { time: '12:05', event: 'Blueprint "CS-AI" successfully synthesized', type: 'info' },
                { time: '09:40', event: 'Uplink established with Supabase edge', type: 'info' }
              ].map((log, i) => (
                <div key={i} className="flex gap-4 font-mono text-[11px] items-center">
                  <span className="text-white/20">{log.time}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20"></span>
                  <span className="text-white/60">{log.event}</span>
                </div>
              ))}
           </div>
        </section>
      </div>
    </div>
  );
}
