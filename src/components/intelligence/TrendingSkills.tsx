'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

interface Skill {
  name: string;
  growth: string;
  percentage: number;
  color: string;
}

interface TrendingSkillsProps {
  skills?: Skill[];
}

export default function TrendingSkills({ skills }: TrendingSkillsProps) {
  const displaySkills = skills || [
    { name: 'LLM ORCHESTRATION', growth: '+42% Growth', percentage: 85, color: '#C7D2FE' },
    { name: 'RUST (WASM FOCUS)', growth: '+28% Growth', percentage: 65, color: '#4ADE80' },
    { name: 'TYPESCRIPT (ADVANCED TYPES)', growth: '+15% Growth', percentage: 40, color: '#334155' },
    { name: 'VECTOR DATABASES', growth: '+35% Growth', percentage: 75, color: '#818CF8' },
  ];
  return (
    <Card className="w-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-none">
      <CardContent className="p-6 sm:p-10 text-center">
        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="h-10 w-10 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-[#6366f1]" />
          </div>
          <div className="w-full max-w-4xl mx-auto space-y-3">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Top trending skills</h3>
            <p className="text-base md:text-lg text-white/55 leading-relaxed">
              Pulled from live hiring and market research on your last refresh. Open{' '}
              <span className="text-white/80 font-semibold">Suggested Projects</span> and use{' '}
              <span className="text-[#c7d2fe] font-semibold">Refresh</span> to run a new analysis.
            </p>
          </div>
        </div>

        <div className="space-y-8 mb-10 w-full max-w-none mx-auto text-left">
          {displaySkills.map((skill) => (
            <div key={skill.name} className="space-y-3">
              <div className="flex justify-between items-end gap-4">
                <span className="text-xs font-bold tracking-widest text-white/80 uppercase">{skill.name}</span>
                <span
                  className={`text-xs font-bold shrink-0 ${skill.growth.startsWith('+') ? 'text-green-400' : 'text-blue-400'}`}
                >
                  {skill.growth}
                </span>
              </div>
              <div className="h-4 w-full bg-white/[0.06] rounded-sm overflow-hidden border border-white/[0.04]">
                <div
                  className="h-full transition-all duration-1000 ease-out rounded-sm"
                  style={{
                    width: `${skill.percentage}%`,
                    backgroundColor: skill.color,
                    boxShadow: `0 0 20px ${skill.color}33`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl mx-auto">
          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.06] text-center sm:text-left">
            <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase block mb-1">
              Market velocity
            </span>
            <span className="text-lg font-bold text-white">Accelerated</span>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.06] text-center sm:text-left">
            <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase block mb-1">
              Avg. salary lift
            </span>
            <span className="text-lg font-bold text-green-400">+$24k USD</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
