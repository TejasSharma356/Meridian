'use client';

import React, { useState, useLayoutEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import SplitText from '@/components/ui/SplitText';
import TrendingSkills from '@/components/intelligence/TrendingSkills';
import RecommendationCard from '@/components/intelligence/RecommendationCard';
import EmergingRoleCard from '@/components/intelligence/EmergingRoleCard';
import {
  RecommendationSkeleton,
  SkillBarSkeleton,
  RoleSkeleton,
} from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import {
  getIntelligenceData,
  refreshIntelligenceData,
  type IntelligenceData,
} from '@/app/intelligence/actions';
import {
  loadIntelligenceFromSession,
  saveIntelligenceToSession,
} from '@/lib/intelligence-client-storage';
import { DashboardMainSurface } from '@/components/layout/DashboardMainSurface';

const tabs = ['Trending Skills', 'Emerging Roles', 'Suggested Projects'] as const;

const PREVIEW_PROJECT_COUNT = 6;

const cardGridClass =
  'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5 items-start w-full text-left';

const subtext = 'text-base md:text-lg text-white/55 leading-relaxed';

export default function IntelligencePage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('Trending Skills');
  const [data, setData] = useState<IntelligenceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const applyPayload = useCallback((payload: IntelligenceData) => {
    setData(payload);
    saveIntelligenceToSession(payload);
  }, []);

  useLayoutEffect(() => {
    const cached = loadIntelligenceFromSession();
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const result = await getIntelligenceData();
        if (!cancelled) applyPayload(result);
      } catch (error) {
        console.error('Error fetching intelligence:', error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [applyPayload]);

  const handleRefreshProjects = useCallback(async () => {
    setRefreshing(true);
    try {
      const result = await refreshIntelligenceData();
      applyPayload(result);
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setRefreshing(false);
    }
  }, [applyPayload]);

  const previewProjects = data?.recommendations?.slice(0, PREVIEW_PROJECT_COUNT) ?? [];

  return (
    <DashboardMainSurface raysClassName="opacity-[0.68]">
      <div className="flex w-full max-w-[min(96rem,calc(100vw-2rem))] mx-auto flex-col items-center px-4 sm:px-6 pb-24">
        <header className="w-full max-w-[1200px] text-center space-y-6 mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <h1 className="flex w-full max-w-[1200px] mx-auto flex-nowrap justify-center items-baseline gap-x-[0.18em] px-0.5 leading-[1.05] uppercase font-black tracking-tighter text-[clamp(0.7rem,2.85vw+0.2rem,5rem)] sm:text-[clamp(1rem,3.2vw+0.35rem,5.5rem)]">
              <SplitText
                text="WHAT SHOULD YOU"
                tag="span"
                className="text-white shrink-0"
                delay={80}
                duration={0.8}
                textAlign="left"
                splitType="chars"
                nowrap
              />
              <SplitText
                text="BUILD"
                tag="span"
                className="text-[#c7d2fe] shrink-0"
                delay={80}
                duration={0.8}
                textAlign="left"
                splitType="chars"
                nowrap
              />
              <SplitText
                text="NEXT?"
                tag="span"
                className="text-white shrink-0"
                delay={80}
                duration={0.8}
                textAlign="left"
                splitType="chars"
                nowrap
              />
            </h1>
            <p className="text-zinc-500 text-base md:text-xl max-w-[800px] mx-auto leading-relaxed uppercase font-black tracking-[0.35em]">
              One continuous page — session cache for every tab until you hit refresh under suggested projects
            </p>
          </motion.div>
        </header>

        {/* Single surface: tabs + content share one panel (no gap between) */}
        <div className="w-full rounded-[2rem] border border-white/[0.1] bg-black/45 backdrop-blur-md overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]">
          <nav
            className="flex flex-wrap items-center justify-center gap-1 sm:gap-6 border-b border-white/[0.1] px-3 py-3 sm:px-6 bg-black/30"
            aria-label="Intelligence sections"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'pb-2.5 pt-1 px-3 text-sm sm:text-base font-bold tracking-tight transition-all relative rounded-xl',
                  activeTab === tab
                    ? 'text-white bg-white/[0.06]'
                    : 'text-white/45 hover:text-white/75 hover:bg-white/[0.03]'
                )}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#c7d2fe] shadow-[0_0_14px_rgba(199,210,254,0.5)]" />
                )}
              </button>
            ))}
          </nav>

          <div className="px-5 py-6 sm:px-12 sm:py-10">
            {activeTab === 'Trending Skills' &&
              (loading ? (
                <div className="space-y-8 w-full max-w-5xl mx-auto">
                  <div className="space-y-2 mx-auto max-w-xs">
                    <div className="h-5 w-full bg-white/[0.06] rounded relative overflow-hidden mx-auto">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
                    </div>
                    <div className="h-3 w-full bg-white/[0.04] rounded relative overflow-hidden mx-auto">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
                    </div>
                  </div>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SkillBarSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <TrendingSkills skills={data?.trendingSkills} />
              ))}

            {activeTab === 'Emerging Roles' && (
              <div className="w-full space-y-6">
                <div className="text-center max-w-4xl mx-auto space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">Top emerging roles</h3>
                  <p className={cn(subtext)}>
                    Grounded in your onboarding target role — descriptions and links update when you refresh intelligence.
                  </p>
                </div>
                {loading ? (
                  <div className={cardGridClass}>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <RoleSkeleton key={i} />
                    ))}
                  </div>
                ) : (
                  <div className={cardGridClass}>
                    {data?.emergingRoles.map((role, idx) => (
                      <EmergingRoleCard key={`${role.title}-${idx}`} role={role} index={idx} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'Suggested Projects' && (
              <div className="w-full space-y-6">
                <div className="flex flex-col items-center text-center gap-4 sm:flex-row sm:justify-between sm:items-center sm:text-left max-w-5xl mx-auto w-full">
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Project recommendations</h3>
                    <p className={cn(subtext, 'max-w-3xl mx-auto sm:mx-0')}>
                      Cached in this browser session for instant loads. Refresh to regenerate ideas from live research and the model.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={handleRefreshProjects}
                      disabled={refreshing || loading}
                      className={cn(
                        'inline-flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-xs font-bold uppercase tracking-widest transition-all',
                        'border-[#c7d2fe]/45 bg-[#c7d2fe]/12 text-[#c7d2fe] hover:bg-[#c7d2fe]/18 disabled:opacity-45 disabled:pointer-events-none'
                      )}
                    >
                      <RefreshCw className={cn('h-3.5 w-3.5', refreshing && 'animate-spin')} />
                      Refresh
                    </button>
                    <Link
                      href="/intelligence/projects"
                      className="text-xs font-bold tracking-widest text-white/55 hover:text-[#c7d2fe] uppercase transition-colors"
                    >
                      View all →
                    </Link>
                  </div>
                </div>

                {loading ? (
                  <div className={cardGridClass}>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <RecommendationSkeleton key={i} />
                    ))}
                  </div>
                ) : refreshing ? (
                  <div className={cardGridClass}>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <RecommendationSkeleton key={i} />
                    ))}
                  </div>
                ) : (
                  <div className={cardGridClass}>
                    {previewProjects.map((rec, i) => (
                      <RecommendationCard key={`${rec.title}-${i}`} {...rec} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardMainSurface>
  );
}
