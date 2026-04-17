'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface ProjectIdentityProps {
  title: string;
  description: string;
  onTitleChange: (val: string) => void;
  onDescriptionChange: (val: string) => void;
}

export default function ProjectIdentity({ title, description, onTitleChange, onDescriptionChange }: ProjectIdentityProps) {
  return (
    <Card className="bg-[#0f0f14]/80 border-white/[0.05] backdrop-blur-xl mb-8">
      <CardContent className="p-8">
        <span className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase block mb-6">Project Identity</span>
        <div className="space-y-4">
          <Input 
            placeholder="Project Title (e.g., Nova Stream)" 
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="bg-black/40 border-white/[0.05] h-14 text-lg font-bold placeholder:text-white/10 focus:border-[#6366f1]/50 transition-all rounded-xl px-6"
          />
          <textarea 
            placeholder="Detailed project description, goals, and core user journeys..."
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="w-full min-h-[120px] bg-black/40 border border-white/[0.05] rounded-xl p-6 text-sm text-white/60 placeholder:text-white/10 focus:border-[#6366f1]/50 transition-all outline-none resize-none"
          />
        </div>
      </CardContent>
    </Card>
  );
}
