'use client';

import React, { useLayoutEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { HeroGeometric, ElegantShape } from '@/components/ui/shape-landing-hero';
import RecommendationCard from '@/components/intelligence/RecommendationCard';
import { RecommendationSkeleton } from '@/components/ui/skeleton';
import { getIntelligenceData, type IntelligenceData } from '@/app/intelligence/actions';
import {
  loadIntelligenceFromSession,
  saveIntelligenceToSession,
} from '@/lib/intelligence-client-storage';
import { DashboardMainSurface } from '@/components/layout/DashboardMainSurface';

const cardGridClass =
  'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5 items-start w-full max-w-[min(96rem,calc(100vw-2rem))] mx-auto';

export default function IntelligenceProjectsPage() {
  const [data, setData] = useState<IntelligenceData | null>(null);
  const [loading, setLoading] = useState(true);

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
      } catch (e) {
        console.error(e);
        if (!cancelled) setData(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [applyPayload]);

  const projects = data?.recommendations ?? [];

  return (
    <DashboardMainSurface raysClassName="opacity-[0.65]">
      <div className="relative bg-transparent min-h-full text-white pb-24 overflow-hidden">
        <div className="relative z-[2]">
          <HeroGeometric
            badge="Personalized"
            title1="Project ideas"
            title2="for your career path"
          />

          <section className="relative z-10 -mt-24 pb-8">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="flex flex-col items-center"
              >
                <Link
                  href="/intelligence"
                  className="inline-flex items-center gap-2 text-sm font-bold text-white/50 hover:text-[#c7d2fe] transition-colors mb-10"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Intelligence
                </Link>
                <p className="text-base md:text-lg text-white/55 max-w-3xl leading-relaxed mb-12">
                  Same cached set as the main Intelligence hub when you open it there first. Use{' '}
                  <span className="text-white/85 font-semibold">Refresh</span> on Suggested Projects to regenerate everything.
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-8 relative overflow-hidden">
            <ElegantShape
              delay={0}
              width={480}
              height={110}
              rotate={-6}
              gradient="from-violet-500/[0.07]"
              className="right-[-6%] top-[10%]"
            />
            <ElegantShape
              delay={0.15}
              width={380}
              height={95}
              rotate={12}
              gradient="from-indigo-500/[0.07]"
              className="left-[-5%] bottom-[15%]"
            />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
              {loading ? (
                <div className={cardGridClass}>
                  {Array.from({ length: 9 }).map((_, i) => (
                    <RecommendationSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className={cardGridClass}>
                  {projects.map((rec, i) => (
                    <RecommendationCard key={`${rec.title}-${i}`} {...rec} />
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </DashboardMainSurface>
  );
}
