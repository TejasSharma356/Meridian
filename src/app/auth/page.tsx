'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Hyperspeed from '@/components/visuals/Hyperspeed';
import { toast } from 'react-hot-toast';

const HYPERSPEED_OPTIONS = {
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
  const [accessCode, setAccessCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate auth logic
    setTimeout(() => {
      // Allow any non-empty code for easier development access
      if (accessCode.length >= 1) {
        toast.success('Access granted. Booting system...');
        router.push('/initialize');
      } else {
        toast.error('Please enter an access key');
      }
      setIsLoading(false);
    }, 1200);
  };

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
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs font-bold group"
          style={{ fontFamily: 'var(--font-press-start)' }}
        >
          <span className="material-symbols-outlined text-[14px]">arrow_back</span>
          HUB
        </button>
      </div>

      {/* Auth Card */}
      <main className="relative z-20 w-full max-w-[420px] mx-4 flex flex-col items-center">
        
        {/* Logo */}
        <div className="mb-8 flex items-center gap-3">
          <div className="h-8 w-8 bg-[#6366f1] rounded-lg shadow-[0_0_20px_rgba(99,102,241,0.6)] flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-[18px]">model_training</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tighter text-white" style={{ fontFamily: 'var(--font-press-start)', fontSize: '14px' }}>MEREDIAN</h1>
        </div>

        {/* Glass Card */}
        <div className="w-full bg-white/[0.04] backdrop-blur-3xl border border-white/[0.08] rounded-3xl p-10 shadow-[0_0_80px_rgba(0,0,0,0.8)]">
          <div className="space-y-8">
            <header className="space-y-2">
              <h2 className="text-white text-xl font-bold tracking-tight">Access Console</h2>
              <p className="text-white/40 text-[10px] font-medium uppercase tracking-widest">Enter any key to synthesize session.</p>
            </header>

            {/* OAuth Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 bg-white/[0.04] py-3.5 px-4 rounded-xl border border-white/[0.05] hover:bg-white/[0.08] hover:border-white/10 transition-all duration-300 group"
              >
                <span className="text-sm font-bold text-white/50 group-hover:text-white transition-colors" style={{ fontFamily: 'var(--font-press-start)', fontSize: '8px' }}>Continue with GitHub</span>
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 bg-white/[0.04] py-3.5 px-4 rounded-xl border border-white/[0.05] hover:bg-white/[0.08] hover:border-white/10 transition-all duration-300 group"
              >
                <span className="text-sm font-bold text-white/50 group-hover:text-white transition-colors" style={{ fontFamily: 'var(--font-press-start)', fontSize: '8px' }}>Continue with Google</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center py-1">
              <div className="flex-grow border-t border-white/[0.05]"></div>
              <span className="flex-shrink mx-4 text-[9px] uppercase tracking-[0.3em] text-white/20 font-black">OR</span>
              <div className="flex-grow border-t border-white/[0.05]"></div>
            </div>

            {/* Email Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="block text-[9px] uppercase tracking-[0.2em] font-black text-white/30" htmlFor="access-code">
                  Obsidian Key
                </label>
                <input
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-[#6366f1]/40 focus:bg-white/[0.06] transition-all duration-300"
                  id="access-code"
                  placeholder="••••••••••••"
                  type="password"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <button
                className="w-full bg-[#6366f1] text-white text-sm font-bold py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-[#6366f1]/20 disabled:opacity-50"
                type="submit"
                disabled={isLoading}
                style={{ fontFamily: 'var(--font-press-start)', fontSize: '10px' }}
              >
                {isLoading ? 'Booting...' : 'Enter Console'}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 flex flex-col items-center gap-4">
          <div className="flex gap-8">
            <a className="text-[9px] uppercase tracking-[0.2em] text-white/20 hover:text-white/50 transition-colors font-bold" href="#">Privacy</a>
            <a className="text-[9px] uppercase tracking-[0.2em] text-white/20 hover:text-white/50 transition-colors font-bold" href="#">Security</a>
            <a className="text-[9px] uppercase tracking-[0.2em] text-white/20 hover:text-white/50 transition-colors font-bold" href="#">Status</a>
          </div>
          <p className="text-[8px] uppercase tracking-[0.15em] text-white/10 font-bold">© 2024 Meredian Intelligence Corp</p>
        </footer>
      </main>
    </div>
  );
}
