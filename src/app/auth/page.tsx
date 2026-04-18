'use client';

import { useRouter } from 'next/navigation';
import Hyperspeed from '@/components/visuals/Hyperspeed';
import { Auth } from '@/components/ui/auth-form-1';
import { GoogleOAuthProvider } from '@react-oauth/google';

const HYPERSPEED_OPTIONS = {
  // ... hyperspeed options ...
  onSpeedUp: () => {},
  onSlowDown: () => {},
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 3,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [12, 80],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0xffffff,
    brokenLines: 0xffffff,
    leftCars: [0x6366f1, 0x818cf8, 0x4f46e5],
    rightCars: [0x06b6d4, 0x0ea5e9, 0x6366f1],
    sticks: 0x6366f1,
  }
};

export default function AuthPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black selection:bg-[#6366f1]">
      
      {/* Hyperspeed Full Background */}
      <div className="absolute inset-0 z-0">
        <Hyperspeed effectOptions={HYPERSPEED_OPTIONS} />
      </div>

      {/* Dark overlay to make the form readable with increased contrast */}
      <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-[2px]" />

      {/* Floating Back Button */}
      <div className="absolute top-8 left-8 z-30">
        <button
          onClick={() => {
            if (window.history.length > 1) {
              router.back();
              return;
            }
            router.push('/');
          }}
          className="flex items-center gap-2 text-white/55 hover:text-white/80 transition-colors text-sm font-semibold tracking-wide"
          aria-label="Go back"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <span className="text-[13px] uppercase">HUB</span>
        </button>
      </div>

      {/* Auth Card wrapper */}
      <main className="relative z-20 w-full flex justify-center items-center">
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "dummy-client-id.apps.googleusercontent.com"}>
          <Auth />
        </GoogleOAuthProvider>
      </main>
    </div>
  );
}
