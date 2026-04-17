'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProjectIdentity from '@/components/architect/ProjectIdentity';
import SystemFlowViz from '@/components/architect/SystemFlowViz';
import DeploymentRoadmap from '@/components/architect/DeploymentRoadmap';
import SidebarWidgets from '@/components/architect/SidebarWidgets';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { generateArchitectureBlueprint, ArchitectureBlueprint } from '@/app/architect/actions';
import { toast } from 'react-hot-toast';
import { CardSkeleton } from '@/components/ui/skeleton';

function ArchitectContent() {
  const searchParams = useSearchParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [blueprint, setBlueprint] = useState<ArchitectureBlueprint | null>(null);

  // Pre-fill from Intelligence "Send to Architect" link
  useEffect(() => {
    const urlTitle = searchParams.get('title');
    const urlDesc = searchParams.get('description');
    const urlStack = searchParams.get('techStack');

    if (urlTitle) setTitle(decodeURIComponent(urlTitle));
    if (urlDesc) setDescription(decodeURIComponent(urlDesc));
    if (urlStack && !blueprint) {
      setBlueprint({
        overview: '',
        techStack: decodeURIComponent(urlStack).split(', '),
        requirements: [],
        steps: [],
        persistenceNodeName: 'Database',
        nodes: [],
        edges: [],
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGeneratePlan = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error('Please provide both a project title and description.');
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateArchitectureBlueprint(title, description);
      setBlueprint(result);
      toast.success('Architecture synthesized!');
    } catch (error) {
      toast.error('Blueprint generation failed. Check your AWS credentials.');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-10 pb-20">
      {/* Header */}
      <div className="mb-12 pt-4">
        <h1 className="text-7xl font-black tracking-tighter text-white leading-none mb-6 uppercase">
          System{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
            Architect
          </span>
        </h1>
        <p className="text-lg text-white/40 max-w-2xl leading-relaxed font-medium">
          Define your vision and let Meridian's Intelligence Engine generate a production-ready blueprint
          including infrastructure, API schemas, and deployment paths.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* ── Primary Column ── */}
        <div className="lg:col-span-8 flex flex-col">
          {/* 1. Project Identity */}
          <ProjectIdentity
            title={title}
            description={description}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
          />

          {/* 2. Blueprint Overview */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-5 w-5 text-[#6366f1]" />
              <span className="text-[10px] font-black tracking-[0.2em] text-white/40 uppercase">
                Technical Blueprint Overview
              </span>
            </div>

            {isGenerating ? (
              <div className="space-y-4">
                 <CardSkeleton lines={3} />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                <Card className="bg-[#0f0f14]/80 border-white/[0.05] backdrop-blur-xl border-l-2 border-l-[#6366f1]/50 overflow-hidden">
                  <div className="p-8">
                    <p className="text-lg text-white/80 leading-relaxed font-semibold mb-8 italic">
                      "{blueprint?.overview || "Synthesizing your technical vision..."}"
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/5">
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-black text-[#6366f1] uppercase tracking-widest">System Architecture</h4>
                        <p className="text-xs text-white/40 leading-relaxed">
                          {blueprint?.detailedOverview?.architecture || "Designing core topology and network protocols..."}
                        </p>
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-black text-[#818CF8] uppercase tracking-widest">Execution Logic</h4>
                        <p className="text-xs text-white/40 leading-relaxed">
                          {blueprint?.detailedOverview?.logic || "Mapping state machine and data processing pipelines..."}
                        </p>
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-black text-[#34D399] uppercase tracking-widest">Scale & Performance</h4>
                        <p className="text-xs text-white/40 leading-relaxed">
                          {blueprint?.detailedOverview?.scalability || "Optimizing throughput and resource orchestration..."}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </section>

          {/* 3. System Flow Architecture */}
          {isGenerating ? (
            <Card className="bg-[#0f0f14]/80 border-white/[0.05] backdrop-blur-xl mb-12">
              <CardContent className="p-0 space-y-0">
                <div className="px-8 py-6 border-b border-white/[0.03] flex justify-between items-center">
                   <div className="h-6 w-48 bg-white/5 rounded animate-pulse" />
                   <div className="h-10 w-64 bg-white/5 rounded-xl animate-pulse" />
                </div>
                <div
                  className="w-full bg-[#050507] relative overflow-hidden"
                  style={{ height: '450px' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                     <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.3em] animate-pulse">Orchestrating Workflow Views...</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <SystemFlowViz
              persistenceNodeName={blueprint?.persistenceNodeName}
              nodes={blueprint?.nodes}
              edges={blueprint?.edges}
            />
          )}

          {/* 4. Deployment Roadmap */}
          {isGenerating ? (
            <div className="space-y-6">
              <div className="h-6 w-48 bg-white/[0.04] rounded relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-40 rounded-2xl bg-white/[0.02] border border-white/[0.04] relative overflow-hidden"
                  >
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <DeploymentRoadmap steps={blueprint?.steps} />
          )}
        </div>

        {/* ── Sidebar Column ── */}
        <div className="lg:col-span-4 sticky top-28">
          <SidebarWidgets
            techStack={blueprint?.techStack || []}
            requirements={blueprint?.requirements || []}
            onGenerate={handleGeneratePlan}
            isGenerating={isGenerating}
          />
        </div>
      </div>
    </div>
  );
}

export default function ArchitectPage() {
  return (
    <Suspense
      fallback={
        <div className="p-20 text-center text-white/20 font-black uppercase tracking-widest">
          Loading Architect Engine...
        </div>
      }
    >
      <ArchitectContent />
    </Suspense>
  );
}
