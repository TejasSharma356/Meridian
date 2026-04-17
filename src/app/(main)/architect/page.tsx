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
          <Card className="bg-[#0f0f14]/80 border-white/[0.05] backdrop-blur-xl mb-8 border-l-2 border-l-[#6366f1]/50">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-5 w-5 text-[#6366f1]" />
                <span className="text-[10px] font-black tracking-[0.2em] text-white/40 uppercase">
                  Blueprint Overview
                </span>
              </div>
              {isGenerating ? (
                <div className="space-y-3">
                  <CardSkeleton lines={3} />
                </div>
              ) : (
                <p className="text-base text-white/70 leading-relaxed font-medium">
                  {blueprint?.overview ||
                    "Input your project details and click 'Generate Plan' to synthesize your system architecture."}
                </p>
              )}
            </CardContent>
          </Card>

          {/* 3. System Flow Architecture */}
          {isGenerating ? (
            <Card className="bg-[#0f0f14]/80 border-white/[0.05] backdrop-blur-xl mb-12">
              <CardContent className="p-8 space-y-6">
                <div className="flex justify-between">
                  <div className="h-5 w-52 bg-white/[0.04] rounded relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
                  </div>
                </div>
                <div
                  className="w-full rounded-3xl bg-[#050507] border border-white/[0.05] relative overflow-hidden"
                  style={{ height: '320px' }}
                >
                  {/* Animate placeholder nodes */}
                  {[20, 45, 70].map((x) => (
                    <div
                      key={x}
                      className="absolute top-1/2 -translate-y-1/2 w-20 h-20 rounded-xl bg-white/[0.03] border border-white/[0.05] relative overflow-hidden"
                      style={{ left: `${x}%` }}
                    >
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
                    </div>
                  ))}
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
