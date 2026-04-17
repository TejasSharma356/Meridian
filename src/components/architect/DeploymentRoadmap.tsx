'use client';

import React from 'react';

interface Step {
  step: string;
  title: string;
  desc: string;
}

interface DeploymentRoadmapProps {
  steps?: Step[];
}

const defaultSteps: Step[] = [
  { step: 'STEP 01', title: 'Research', desc: 'Analyze market competitors and define core data schemas.' },
  { step: 'STEP 02', title: 'Setup', desc: 'Provision cloud resources and initialize repository structures.' },
  { step: 'STEP 03', title: 'MVP', desc: 'Build core features: Ingestion, Authentication, Dashboard.' },
  { step: 'STEP 04', title: 'Deploy', desc: 'Automated CI/CD pipeline to staging and production.' },
];

export default function DeploymentRoadmap({ steps }: DeploymentRoadmapProps) {
  const displaySteps = steps || defaultSteps;

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-bold text-white tracking-tight px-2">Deployment Roadmap</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {displaySteps.map((s, idx) => (
          <div 
            key={idx} 
            className={`p-6 rounded-2xl border transition-all ${
              idx === 0 
              ? 'bg-[#6366f1]/5 border-[#6366f1]/20' 
              : 'bg-white/[0.02] border-white/[0.05] hover:border-white/10'
            }`}
          >
            <span className={`text-[9px] font-black tracking-widest uppercase mb-4 block ${idx === 0 ? 'text-[#6366f1]' : 'text-white/20'}`}>
              {s.step}
            </span>
            <h4 className="text-lg font-bold text-white mb-2">{s.title}</h4>
            <p className="text-xs text-white/40 leading-relaxed font-medium">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
