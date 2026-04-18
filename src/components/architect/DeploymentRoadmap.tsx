'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

export interface RoadmapStep {
  step: string;
  title: string;
  desc: string;
}

interface DeploymentRoadmapProps {
  steps?: RoadmapStep[];
  /** Index 0–3 of the step the user is actively working on */
  currentStepIndex?: number;
  /** Mark the current step complete and advance highlight */
  onAdvanceStep?: () => void;
}

const defaultSteps: RoadmapStep[] = [
  { step: 'STEP 01', title: 'Research', desc: 'Analyze market competitors and define core data schemas.' },
  { step: 'STEP 02', title: 'Setup', desc: 'Provision cloud resources and initialize repository structures.' },
  { step: 'STEP 03', title: 'MVP', desc: 'Build core features: Ingestion, Authentication, Dashboard.' },
  { step: 'STEP 04', title: 'Deploy', desc: 'Automated CI/CD pipeline to staging and production.' },
];

export default function DeploymentRoadmap({
  steps,
  currentStepIndex = 0,
  onAdvanceStep,
}: DeploymentRoadmapProps) {
  const displaySteps = steps?.length ? steps : defaultSteps;
  const active = Math.min(Math.max(currentStepIndex, 0), displaySteps.length - 1);

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-bold text-white tracking-tight px-2">Deployment Roadmap</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {displaySteps.map((s, idx) => {
          const done = idx < active;
          const current = idx === active;

          return (
            <div
              key={`${s.step}-${idx}`}
              className={`p-6 rounded-2xl border transition-all flex flex-col ${
                current
                  ? 'bg-[#6366f1]/5 border-[#6366f1]/30 ring-1 ring-[#6366f1]/20'
                  : done
                    ? 'bg-emerald-500/[0.06] border-emerald-500/20'
                    : 'bg-white/[0.02] border-white/[0.05] hover:border-white/10'
              }`}
            >
              <span
                className={`text-[9px] font-black tracking-widest uppercase mb-4 block ${
                  current ? 'text-[#6366f1]' : done ? 'text-emerald-400/90' : 'text-white/20'
                }`}
              >
                {done ? 'DONE · ' : ''}
                {s.step}
              </span>
              <h4 className="text-lg font-bold text-white mb-2">{s.title}</h4>
              <p className="text-xs text-white/40 leading-relaxed font-medium flex-1">{s.desc}</p>
              {current && onAdvanceStep && active < displaySteps.length - 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4 w-full border-white/15 text-[10px] font-black uppercase tracking-widest h-9 hover:bg-white/[0.06]"
                  onClick={onAdvanceStep}
                >
                  Complete step
                </Button>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
