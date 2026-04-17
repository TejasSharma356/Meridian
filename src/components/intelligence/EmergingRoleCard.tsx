'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import type { EmergingRole } from '@/app/intelligence/actions';
import { cn } from '@/lib/utils';

export default function EmergingRoleCard({
  role,
  index,
  className,
}: {
  role: EmergingRole;
  index: number;
  className?: string;
}) {
  const n = String(index + 1).padStart(2, '0');

  return (
    <Card
      className={cn(
        'bg-[#0f0f14]/80 border-white/[0.05] backdrop-blur-xl hover:border-[#c7d2fe]/20 transition-all h-auto',
        className
      )}
    >
      <CardContent className="p-6 sm:p-7 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
        <span className="text-4xl font-black text-white/[0.07] shrink-0 leading-none select-none">
          {n}
        </span>
        <div className="min-w-0 flex-1 space-y-3">
          <h4 className="text-xl font-bold text-white/90 tracking-tight">{role.title}</h4>
          <p className="text-base text-white/55 leading-relaxed max-w-prose">{role.description}</p>
          {role.learnLinks.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {role.learnLinks.map((link) => (
                <a
                  key={link.url + link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#c7d2fe]/90 hover:text-[#c7d2fe] border border-[#c7d2fe]/20 hover:border-[#c7d2fe]/40 rounded-lg px-3 py-1.5 transition-colors"
                >
                  {link.label}
                  <ExternalLink className="h-3 w-3 opacity-70" />
                </a>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
