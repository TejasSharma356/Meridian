'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProjectIdentity from '@/components/architect/ProjectIdentity';
import SystemFlowViz from '@/components/architect/SystemFlowViz';
import DeploymentRoadmap from '@/components/architect/DeploymentRoadmap';
import SidebarWidgets from '@/components/architect/SidebarWidgets';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, RefreshCw, Wand2 } from 'lucide-react';
import {
  generateArchitectureBlueprint,
  generateArchitectProjectSummary,
  regenerateWorkflowDiagram,
  type ArchitectureBlueprint,
  type ArchitectProjectSummary,
} from '@/app/architect/actions';
import { createProjectFromArchitect } from '@/app/projects/actions';
import { toast } from 'react-hot-toast';
import { CardSkeleton } from '@/components/ui/skeleton';
import { DashboardMainSurface } from '@/components/layout/DashboardMainSurface';
import {
  DashboardPageTitle,
  DASHBOARD_PAGE_SUBTITLE_CLASSES,
} from '@/components/dashboard/DashboardPageTitle';

function ArchitectContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const summaryRequested = useRef(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [preface, setPreface] = useState<ArchitectProjectSummary | null>(null);
  const [blueprint, setBlueprint] = useState<ArchitectureBlueprint | null>(null);

  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isWorkflowRegen, setIsWorkflowRegen] = useState(false);
  const [isStartingBuild, setIsStartingBuild] = useState(false);
  const [refineNotes, setRefineNotes] = useState('');
  const [roadmapStepIndex, setRoadmapStepIndex] = useState(0);

  // Pre-fill from Intelligence "Send to Architect" link + auto summary
  useEffect(() => {
    const urlTitle = searchParams.get('title');
    const urlDesc = searchParams.get('description');
    const urlStack = searchParams.get('techStack');

    if (urlTitle) setTitle(decodeURIComponent(urlTitle));
    if (urlDesc) setDescription(decodeURIComponent(urlDesc));
    if (urlStack && !blueprint) {
      setBlueprint({
        overview: '',
        detailedOverview: { architecture: '', logic: '', scalability: '' },
        techStack: decodeURIComponent(urlStack).split(', ').filter(Boolean),
        requirements: [],
        steps: [],
        persistenceNodeName: 'Database',
        nodes: [],
        edges: [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const t = title.trim();
    const d = description.trim();
    if (!t || !d) return;
    if (summaryRequested.current) return;
    summaryRequested.current = true;

    const stack = searchParams.get('techStack');
    const techCsv = stack ? decodeURIComponent(stack) : undefined;

    void (async () => {
      setIsSummarizing(true);
      try {
        const summary = await generateArchitectProjectSummary(t, d, techCsv);
        setPreface(summary);
      } catch (e) {
        console.error(e);
        summaryRequested.current = false;
        toast.error('Could not generate project brief.');
      } finally {
        setIsSummarizing(false);
      }
    })();
  }, [title, description, searchParams]);

  const overview = blueprint?.overview || preface?.overview || 'Synthesizing your technical vision...';
  const detailed =
    blueprint?.detailedOverview ||
    preface?.detailedOverview || {
      architecture: 'Designing core topology and network protocols...',
      logic: 'Mapping state machine and data processing pipelines...',
      scalability: 'Optimizing throughput and resource orchestration...',
    };

  const handleGeneratePlan = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error('Please provide both a project title and description.');
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateArchitectureBlueprint(title.trim(), description.trim());
      setBlueprint(result);
      setRoadmapStepIndex(0);
      toast.success('Architecture synthesized — workflow diagram is ready.');
    } catch (error) {
      toast.error('Blueprint generation failed. Check your AWS credentials.');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const mergeWorkflow = (
    next: { nodes: ArchitectureBlueprint['nodes']; edges: ArchitectureBlueprint['edges']; persistenceNodeName?: string }
  ) => {
    setBlueprint((prev) => {
      const base = prev || ({} as ArchitectureBlueprint);
      return {
        ...base,
        nodes: next.nodes,
        edges: next.edges,
        persistenceNodeName: next.persistenceNodeName || base.persistenceNodeName || 'Database',
      };
    });
  };

  const runWorkflowRegen = async (instruction: string | null) => {
    if (!title.trim() || !description.trim()) {
      toast.error('Title and description are required.');
      return;
    }
    setIsWorkflowRegen(true);
    try {
      const stack = blueprint?.techStack?.join(', ');
      const wf = await regenerateWorkflowDiagram({
        title: title.trim(),
        description: description.trim(),
        techStackCsv: stack,
        persistenceNodeName: blueprint?.persistenceNodeName,
        previousNodes: blueprint?.nodes,
        previousEdges: blueprint?.edges,
        refineInstruction: instruction || undefined,
      });
      mergeWorkflow(wf);
      toast.success(instruction ? 'Workflow updated from your notes.' : 'Workflow diagram regenerated.');
    } catch (e) {
      console.error(e);
      toast.error('Workflow regeneration failed.');
    } finally {
      setIsWorkflowRegen(false);
    }
  };

  const handleExportWorkflowJson = () => {
    if (!blueprint?.nodes?.length) {
      toast.error('Generate a workflow first.');
      return;
    }
    const payload = {
      exportedAt: new Date().toISOString(),
      projectTitle: title.trim(),
      projectDescription: description.trim(),
      persistenceNodeName: blueprint.persistenceNodeName,
      nodes: blueprint.nodes,
      edges: blueprint.edges,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meridian-workflow-${title.trim().replace(/\s+/g, '-').slice(0, 40) || 'export'}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Workflow JSON downloaded.');
  };

  const handleStartBuilding = async () => {
    if (!blueprint?.nodes?.length) {
      toast.error('Initiate architect and wait for the workflow before starting the build.');
      return;
    }
    setIsStartingBuild(true);
    try {
      const { id, buildPrompt } = await createProjectFromArchitect({
        title: title.trim(),
        description: description.trim(),
        blueprint,
        roadmapStepIndex,
      });
      const q = new URLSearchParams();
      q.set('projectId', id);
      q.set('prompt', buildPrompt);
      router.push(`/build?${q.toString()}`);
    } catch (e) {
      console.error(e);
      toast.error(e instanceof Error ? e.message : 'Could not create project.');
    } finally {
      setIsStartingBuild(false);
    }
  };

  const workflowBusy = isGenerating || isWorkflowRegen;
  const hasWorkflow = Boolean(blueprint?.nodes && blueprint.nodes.length > 0);

  const workflowControls = hasWorkflow ? (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-white/15 text-[10px] font-black uppercase tracking-widest h-9 gap-2"
          onClick={handleExportWorkflowJson}
        >
          <Download className="h-3.5 w-3.5" />
          Export JSON
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-white/15 text-[10px] font-black uppercase tracking-widest h-9 gap-2"
          disabled={workflowBusy}
          onClick={() => runWorkflowRegen(null)}
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isWorkflowRegen ? 'animate-spin' : ''}`} />
          Regenerate
        </Button>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/35">
          Refine workflow (optional)
        </label>
        <textarea
          value={refineNotes}
          onChange={(e) => setRefineNotes(e.target.value)}
          rows={3}
          placeholder="e.g. Add a dedicated observability node between the API gateway and orchestrator…"
          className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/85 placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-[#6366f1]/50 resize-y min-h-[72px]"
        />
        <Button
          type="button"
          size="sm"
          className="bg-[#6366f1] hover:bg-[#5558e3] text-[10px] font-black uppercase tracking-widest h-9 gap-2"
          disabled={workflowBusy || !refineNotes.trim()}
          onClick={() => {
            runWorkflowRegen(refineNotes.trim());
            setRefineNotes('');
          }}
        >
          <Wand2 className="h-3.5 w-3.5" />
          Apply refinements
        </Button>
      </div>
    </div>
  ) : null;

  return (
    <DashboardMainSurface raysClassName="opacity-[0.62]">
      <div className="max-w-[min(96rem,calc(100vw-2rem))] w-full mx-auto px-6 sm:px-10 pb-24">
        <div className="mb-10 space-y-5">
          <DashboardPageTitle title="SYSTEM ARCHITECT" />
          <p className={`${DASHBOARD_PAGE_SUBTITLE_CLASSES} max-w-4xl font-medium`}>
            Define your vision and let Meridian&apos;s Intelligence Engine generate a production-ready blueprint
            including infrastructure, API schemas, and deployment paths.
          </p>
          {isSummarizing ? (
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6366f1]/80 animate-pulse">
              Generating detailed project brief from your forwarded context…
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 flex flex-col">
            <ProjectIdentity
              title={title}
              description={description}
              onTitleChange={setTitle}
              onDescriptionChange={setDescription}
            />

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
                        &quot;{overview}&quot;
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/5">
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-black text-[#6366f1] uppercase tracking-widest">
                            System Architecture
                          </h4>
                          <p className="text-xs text-white/40 leading-relaxed">{detailed.architecture}</p>
                        </div>
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-black text-[#818cf8] uppercase tracking-widest">
                            Execution Logic
                          </h4>
                          <p className="text-xs text-white/40 leading-relaxed">{detailed.logic}</p>
                        </div>
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-black text-[#34d399] uppercase tracking-widest">
                            Scale &amp; Performance
                          </h4>
                          <p className="text-xs text-white/40 leading-relaxed">{detailed.scalability}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </section>

            {workflowBusy ? (
              <Card className="bg-[#0f0f14]/80 border-white/[0.05] backdrop-blur-xl mb-12">
                <CardContent className="p-0 space-y-0">
                  <div className="px-8 py-6 border-b border-white/[0.03] flex justify-between items-center">
                    <div className="h-6 w-48 bg-white/5 rounded animate-pulse" />
                    <div className="h-10 w-64 bg-white/5 rounded-xl animate-pulse" />
                  </div>
                  <div className="relative w-full bg-[#050507] overflow-hidden min-h-[min(72vh,44rem)] h-[min(72vh,44rem)]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.3em] animate-pulse">
                        {isGenerating ? 'Synthesizing full blueprint…' : 'Updating workflow diagram…'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <SystemFlowViz
                persistenceNodeName={blueprint?.persistenceNodeName}
                nodes={blueprint?.nodes}
                edges={blueprint?.edges}
                aboveCanvas={workflowControls}
              />
            )}

            {isGenerating ? (
              <div className="space-y-6">
                <div className="h-6 w-48 bg-white/[0.04] rounded relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <DeploymentRoadmap
                steps={blueprint?.steps}
                currentStepIndex={roadmapStepIndex}
                onAdvanceStep={() => setRoadmapStepIndex((s) => Math.min(3, s + 1))}
              />
            )}
          </div>

          <div className="lg:col-span-4 sticky top-24">
            <SidebarWidgets
              techStack={blueprint?.techStack || []}
              requirements={blueprint?.requirements || []}
              onGenerate={handleGeneratePlan}
              isGenerating={isGenerating}
              onStartBuilding={handleStartBuilding}
              isStartingBuild={isStartingBuild}
              canStartBuild={hasWorkflow && !!title.trim() && !!description.trim()}
            />
          </div>
        </div>
      </div>
    </DashboardMainSurface>
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
