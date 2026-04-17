'use client';

import { motion } from 'framer-motion';

interface HealthScoreGaugeProps {
  score: number;
}

export function HealthScoreGauge({ score }: HealthScoreGaugeProps) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-48 h-48 transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-white/[0.03]"
        />
        {/* Progress Circle */}
        <motion.circle
          cx="96"
          cy="96"
          r={radius}
          stroke="#6366f1"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
          className="drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-5xl font-black text-white tracking-tighter"
        >
          {score}
        </motion.span>
        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/30 mt-1">Health Score</span>
      </div>
      
      {/* Percentage Indicator */}
      <div className="absolute -top-2 -right-2 bg-[#d856b8]/10 border border-[#d856b8]/40 px-3 py-1 rounded-full">
        <span className="text-[#d856b8] text-[10px] font-bold">+4%</span>
      </div>
    </div>
  );
}
