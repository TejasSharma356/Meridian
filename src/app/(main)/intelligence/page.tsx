'use client';

import React, { useState, useEffect, useCallback } from 'react';
import TrendingSkills from '@/components/intelligence/TrendingSkills';
import RecommendationCard from '@/components/intelligence/RecommendationCard';
import {
  RecommendationSkeleton,
  SkillBarSkeleton,
  RoleSkeleton,
} from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { getIntelligenceData, IntelligenceData } from '@/app/intelligence/actions';

const categories = ['FULL STACK', 'FRONTEND', 'BACKEND', 'ML', 'DEVOPS'];
const tabs = ['Trending Skills', 'Emerging Roles', 'Suggested Projects'];

export default function IntelligencePage() {
  const [activeCategory, setActiveCategory] = useState('FULL STACK');
  const [activeTab, setActiveTab] = useState('Trending Skills');
  const [data, setData] = useState<IntelligenceData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async (cat: string) => {
    setLoading(true);
    setData(null);
    try {
      const result = await getIntelligenceData(cat);
      setData(result);
    } catch (error) {
      console.error('Error fetching intelligence:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(activeCategory);
  }, [activeCategory, fetchData]);

  return (
    <div className="max-w-[1400px] mx-auto px-10 pb-20">
      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="text-8xl font-black tracking-tighter text-white leading-none mb-4 uppercase">
          What <br />
          should you <br />
          <span className="text-[#c7d2fe] italic">build</span> next?
        </h1>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mt-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); }}
              className={cn(
                'px-6 py-2 rounded-full text-[10px] font-bold tracking-widest transition-all border',
                activeCategory === cat
                  ? 'bg-[#c7d2fe] text-black border-[#c7d2fe] shadow-[0_0_20px_rgba(199,210,254,0.3)]'
                  : 'bg-white/[0.03] text-white/40 border-white/[0.05] hover:border-white/20'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8 mb-10 border-b border-white/[0.05]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'pb-4 text-sm font-bold tracking-tight transition-all relative',
              activeTab === tab ? 'text-white' : 'text-white/40 hover:text-white/60'
            )}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c7d2fe] shadow-[0_0_10px_rgba(199,210,254,0.5)]" />
            )}
          </button>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Analytics Column ─ left 7 cols */}
        <div className="lg:col-span-7">
          {/* ── TRENDING SKILLS ── */}
          {activeTab === 'Trending Skills' && (
            loading ? (
              <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.04] space-y-8">
                <div className="flex justify-between items-center mb-2">
                  <div className="space-y-2">
                    <div className="h-5 w-48 bg-white/[0.06] rounded relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
                    </div>
                    <div className="h-3 w-72 bg-white/[0.04] rounded relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
                    </div>
                  </div>
                </div>
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkillBarSkeleton key={i} />
                ))}
              </div>
            ) : (
              <TrendingSkills skills={data?.trendingSkills} />
            )
          )}

          {/* ── EMERGING ROLES ── */}
          {activeTab === 'Emerging Roles' && (
            <div className="p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex flex-col gap-6">
              <h3 className="text-2xl font-bold">Top Emerging Roles</h3>
              <div className="flex flex-col gap-4">
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => <RoleSkeleton key={i} />)
                  : data?.emergingRoles.map((role, idx) => (
                      <div
                        key={role}
                        className="flex items-center gap-4 p-6 bg-white/[0.03] rounded-2xl border border-white/5 group hover:border-[#c7d2fe]/20 transition-all"
                      >
                        <span className="text-4xl font-black text-white/5 group-hover:text-[#c7d2fe]/10 transition-colors">
                          0{idx + 1}
                        </span>
                        <span className="text-xl font-bold text-white/80">{role}</span>
                      </div>
                    ))}
              </div>
            </div>
          )}

          {/* ── SUGGESTED PROJECTS ── */}
          {activeTab === 'Suggested Projects' && (
            <div className="grid grid-cols-1 gap-4">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => <RecommendationSkeleton key={i} />)
                : data?.recommendations.map((rec) => (
                    <RecommendationCard key={rec.title} {...rec} />
                  ))}
            </div>
          )}
        </div>

        {/* Recommendations Column ─ right 5 cols */}
        <div className="lg:col-span-5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Project Recommendations
              <span className="text-[10px] font-bold text-white/40 bg-white/[0.05] px-2 py-0.5 rounded uppercase">
                Based on your stack
              </span>
            </h3>
            <button className="text-[10px] font-bold tracking-widest text-[#c7d2fe] hover:underline uppercase">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <RecommendationSkeleton key={i} />)
              : data?.recommendations.map((rec) => (
                  <RecommendationCard key={rec.title} {...rec} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
