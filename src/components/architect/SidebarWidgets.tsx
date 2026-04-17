'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Sparkles, Plus, ArrowRight, Loader2 } from 'lucide-react';
import { CardSkeleton } from '@/components/ui/skeleton';

interface SidebarWidgetsProps {
  techStack: string[];
  requirements: { id: string; label: string; checked: boolean }[];
  onGenerate: () => void;
  isGenerating: boolean;
  onStartBuilding?: () => void;
  isStartingBuild?: boolean;
  canStartBuild?: boolean;
}

export default function SidebarWidgets({
  techStack,
  requirements,
  onGenerate,
  isGenerating,
  onStartBuilding,
  isStartingBuild,
  canStartBuild,
}: SidebarWidgetsProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Initiate Architect */}
      <Card className="bg-[#1a1a24] border-[#6366f1]/20 shadow-[0_20px_40px_rgba(99,102,241,0.1)]">
        <CardContent className="p-8">
          <h3 className="text-xl font-bold text-white mb-3">Initiate Architect</h3>
          <p className="text-sm text-white/40 mb-8 leading-relaxed font-medium">
            Runs Bedrock on your project context to synthesize the workflow diagram, stack, requirements, and
            deployment roadmap.
          </p>
          <Button
            onClick={onGenerate}
            disabled={isGenerating}
            className="w-full bg-[#6366f1] hover:bg-[#5558e3] text-white font-bold h-12 gap-3 shadow-lg shadow-[#6366f1]/20 group"
          >
            {isGenerating ? (
              <>
                Synthesizing… <Loader2 className="h-4 w-4 animate-spin" />
              </>
            ) : (
              <>
                Initiate Architect <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <Card className="bg-[#0f0f14]/80 border-white/[0.05] backdrop-blur-xl">
        <CardContent className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white tracking-tight">Tech Stack</h3>
            <button
              type="button"
              className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors"
            >
              Edit
            </button>
          </div>
          {isGenerating ? (
            <CardSkeleton lines={4} />
          ) : (
            <div className="flex flex-wrap gap-2">
              {techStack.length > 0 ? (
                techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] text-[10px] font-bold text-white/60"
                  >
                    {tech}
                  </span>
                ))
              ) : (
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/10">
                  Initiate architect to see tech stack.
                </p>
              )}
              {techStack.length > 0 && (
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-full bg-white/[0.02] border border-dashed border-white/[0.1] text-[10px] font-bold text-white/20 flex items-center gap-1.5 hover:border-white/20 hover:text-white/40 transition-all"
                >
                  <Plus className="h-3 w-3" /> Add
                </button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Requirements */}
      <Card className="bg-[#0f0f14]/80 border-white/[0.05] backdrop-blur-xl">
        <CardContent className="p-8">
          <h3 className="text-lg font-bold text-white tracking-tight mb-8">Requirements</h3>
          {isGenerating ? (
            <CardSkeleton lines={6} />
          ) : (
            <div className="space-y-6">
              {requirements && requirements.length > 0 ? (
                requirements.map((req) => (
                  <div key={req.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={req.id}
                      checked={req.checked}
                      disabled
                      className="bg-white/5 border-white/10 data-[state=checked]:bg-[#6366f1] data-[state=checked]:border-[#6366f1]"
                    />
                    <label htmlFor={req.id} className="text-xs font-medium text-white/60 leading-none">
                      {req.label}
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/10">
                  Initiate architect to see requirements.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Start Building CTA */}
      <div className="mt-4">
        <Card className="bg-gradient-to-br from-[#6366f1]/10 to-transparent border-white/[0.05] relative overflow-hidden group">
          <div className="absolute inset-0 bg-grid-white/[0.02]" />
          <CardContent className="p-8 relative z-10">
            <p className="text-sm font-bold text-white mb-6 leading-relaxed">
              Ready to move from architecture to implementation? Creates an active project and opens the build
              workspace with an initial agent prompt.
            </p>
            <Button
              type="button"
              onClick={onStartBuilding}
              disabled={!canStartBuild || isStartingBuild}
              className="w-full bg-[#6366f1] hover:bg-[#5558e3] text-white font-bold h-12 gap-3 group/btn disabled:opacity-40"
            >
              {isStartingBuild ? (
                <>
                  Creating… <Loader2 className="h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  Start Building <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
