'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface RecommendationProps {
  title: string;
  demand: 'HIGH' | 'MEDIUM';
  description: string;
  tags: string[];
}

export default function RecommendationCard({ title, demand, description, tags }: RecommendationProps) {
  const router = useRouter();
  const demandColor = demand === 'HIGH' ? 'text-green-400 border-green-400/30 bg-green-400/5' : 'text-orange-400 border-orange-400/30 bg-orange-400/5';

  const handleSendToArchitect = () => {
    const params = new URLSearchParams();
    params.set('title', title);
    params.set('description', description);
    params.set('techStack', tags.join(', '));
    router.push(`/architect?${params.toString()}`);
  };

  return (
    <Card className="bg-[#0f0f14]/80 border-white/[0.05] backdrop-blur-xl group hover:border-white/[0.1] transition-all overflow-hidden mb-4">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h4 className="text-lg font-bold text-white leading-tight">{title}</h4>
          <span className={`text-[10px] font-bold px-2 py-1 rounded border ${demandColor}`}>
            {demand} DEMAND
          </span>
        </div>
        
        <p className="text-sm text-white/50 mb-6 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span key={tag} className="text-[10px] font-bold tracking-wider text-white/40 bg-white/[0.03] px-2 py-1 rounded-sm border border-white/[0.05] uppercase">
              {tag}
            </span>
          ))}
        </div>

        <button 
          onClick={handleSendToArchitect}
          className="flex items-center gap-2 text-xs font-bold text-white/80 hover:text-white transition-colors group/btn"
        >
          Send to Architect
          <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </CardContent>
    </Card>
  );
}
