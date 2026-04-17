'use client';

import { cn } from '@/lib/utils';
import { DashboardLightRaysBackdrop } from '@/components/visuals/intelligence-light-rays';

type DashboardMainSurfaceProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  /** Tailwind opacity utilities for the rays layer (default: more visible). */
  raysClassName?: string;
  /**
   * Top padding for the global floating navbar (root layout). Keeps headlines off the nav.
   * Rays render behind this region so the background reads as one continuous page.
   */
  navClearanceClassName?: string;
};

/**
 * Shared full-height backdrop + z-stacked content for all `(main)` dashboard pages.
 * Clearance for the floating navbar lives here (not on the scroll container) so LightRays
 * still fills the full main pane edge-to-edge.
 */
export function DashboardMainSurface({
  children,
  className,
  contentClassName,
  raysClassName = 'opacity-[0.62]',
  navClearanceClassName = 'pt-28 sm:pt-32',
}: DashboardMainSurfaceProps) {
  return (
    <div className={cn('relative w-full min-h-full isolate', className)}>
      <div
        className={cn(
          'pointer-events-none absolute inset-0 z-0 min-h-full w-full',
          raysClassName
        )}
        aria-hidden
      >
        <DashboardLightRaysBackdrop />
      </div>
      <div className={cn('relative z-10', navClearanceClassName, contentClassName)}>{children}</div>
    </div>
  );
}
