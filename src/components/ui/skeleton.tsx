'use client';

import React from 'react';

// Single shimmer line
function SkeletonLine({ width = 'full', height = 4 }: { width?: string | number; height?: number }) {
  const widthClass = typeof width === 'string' ? `w-${width}` : '';
  const widthStyle = typeof width === 'number' ? { width: `${width}%` } : {};
  return (
    <div
      className={`bg-white/[0.06] rounded-sm relative overflow-hidden ${widthClass}`}
      style={{ height: `${height}px`, ...widthStyle }}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
    </div>
  );
}

// Card skeleton for project recommendations
export function RecommendationSkeleton() {
  return (
    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-4">
      <div className="flex justify-between items-start">
        <SkeletonLine width={55} height={18} />
        <SkeletonLine width={20} height={16} />
      </div>
      <div className="space-y-2">
        <SkeletonLine width={90} height={10} />
        <SkeletonLine width={75} height={10} />
      </div>
      <div className="flex gap-2">
        <SkeletonLine width={18} height={22} />
        <SkeletonLine width={14} height={22} />
        <SkeletonLine width={16} height={22} />
      </div>
      <SkeletonLine width={35} height={12} />
    </div>
  );
}

// Trending skills skeleton
export function SkillBarSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <SkeletonLine width={40} height={11} />
        <SkeletonLine width={10} height={11} />
      </div>
      <SkeletonLine width="full" height={16} />
    </div>
  );
}

// Emerging role skeleton
export function RoleSkeleton() {
  return (
    <div className="flex items-center gap-4 p-6 bg-white/[0.02] rounded-2xl border border-white/[0.04]">
      <SkeletonLine width={30} height={36} />
      <SkeletonLine width={55} height={20} />
    </div>
  );
}

// Architect card skeleton (for tech stack / requirements)
export function CardSkeleton({ lines = 4 }: { lines?: number }) {
  return (
    <div className="space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonLine key={i} width={60 + (i % 3) * 15} height={12} />
      ))}
    </div>
  );
}
