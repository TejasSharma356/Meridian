'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function BackButton({ className, label = "Back" }: { className?: string; label?: string }) {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => router.back()}
      className={cn(
        "flex items-center gap-2 text-zinc-500 hover:text-white transition-colors p-0 h-auto hover:bg-transparent w-fit",
        className
      )}
    >
      <ArrowLeft size={16} />
      <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
    </Button>
  );
}
