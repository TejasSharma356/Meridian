'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import {
  DashboardPageTitle,
  DASHBOARD_PAGE_SUBTITLE_CLASSES,
} from '@/components/dashboard/DashboardPageTitle';

export function ActiveProjectsEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="w-full p-16 sm:p-20 md:p-24 bg-white/[0.02] border border-white/5 border-dashed rounded-[2rem] flex flex-col items-center justify-center gap-8 text-center"
    >
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/[0.03] border border-white/5 flex items-center justify-center">
        <Plus className="text-white/25" size={40} strokeWidth={1.5} />
      </div>
      <div className="space-y-5 max-w-[min(100%,52rem)] mx-auto w-full">
        <DashboardPageTitle title="NO ACTIVE PROJECTS DETECTED" textAlign="center" tag="h3" />
        <p className={`${DASHBOARD_PAGE_SUBTITLE_CLASSES} max-w-xl mx-auto text-center`}>
          Start your first career-boosting project to begin tracking metrics and trajectory gains.
        </p>
      </div>
      <button
        type="button"
        className="px-10 py-4 bg-[#6366f1] text-white rounded-xl font-bold text-sm uppercase tracking-[0.2em] hover:scale-[1.03] transition-all active:scale-95 shadow-xl shadow-[#6366f1]/20"
      >
        Start a New Project
      </button>
    </motion.div>
  );
}
