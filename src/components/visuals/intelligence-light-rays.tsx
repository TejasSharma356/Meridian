'use client';

import LightRays, { type LightRaysProps } from '@/components/visuals/LightRays';

/** Stronger preset for full main-panel coverage (dashboard routes). */
export const DASHBOARD_LIGHT_RAYS_PROPS: LightRaysProps = {
  raysOrigin: 'top-center',
  raysColor: '#00ffff',
  raysSpeed: 1.65,
  lightSpread: 1.05,
  rayLength: 2.25,
  followMouse: true,
  mouseInfluence: 0.14,
  noiseAmount: 0.12,
  distortion: 0.06,
};

export function DashboardLightRaysBackdrop({ className = '' }: { className?: string }) {
  return <LightRays {...DASHBOARD_LIGHT_RAYS_PROPS} className={className} />;
}

/** @deprecated Use DashboardLightRaysBackdrop — kept as alias */
export const INTELLIGENCE_LIGHT_RAYS_PROPS = DASHBOARD_LIGHT_RAYS_PROPS;

export function IntelligenceLightRaysBackdrop({ className = '' }: { className?: string }) {
  return <DashboardLightRaysBackdrop className={className} />;
}
