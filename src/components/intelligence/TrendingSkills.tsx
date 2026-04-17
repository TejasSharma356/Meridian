'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, BarChart3 } from 'lucide-react';

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
    <Card className="bg-[#0f0f14]/80 border-white/[0.05] backdrop-blur-xl group hover:border-white/[0.1] transition-all">
      <CardContent className="p-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-white mb-1">Top Trending Skills</h3>
            <p className="text-sm text-white/40">Real-time market demand based on job openings and GitHub velocity.</p>
          </div>
          <div className="h-10 w-10 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-[#6366f1]" />
          </div>
        </div>

        <div className="space-y-8 mb-10">
          {displaySkills.map((skill) => (
            <div key={skill.name} className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold tracking-widest text-white/80 uppercase">{skill.name}</span>
                <span className={`text-xs font-bold ${skill.growth.startsWith('+') ? 'text-green-400' : 'text-blue-400'}`}>
                  {skill.growth}
                </span>
              </div>
              <div className="h-4 w-full bg-white/[0.05] rounded-sm overflow-hidden border border-white/[0.02]">
                <div 
                  className="h-full transition-all duration-1000 ease-out rounded-sm"
                  style={{ 
                    width: `${skill.percentage}%`, 
                    backgroundColor: skill.color,
                    boxShadow: `0 0 20px ${skill.color}33`
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase block mb-1">Market Velocity</span>
            <span className="text-lg font-bold text-white">Accelerated</span>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase block mb-1">Average Salary Lift</span>
            <span className="text-lg font-bold text-green-400">+$24k USD</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
