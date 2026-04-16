import { useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import Hyperspeed from '../components/ui/Hyperspeed';
import api from '../utils/api';
import { useAuthStore } from '../store/store';
import { toast } from 'react-hot-toast';

const HYPERSPEED_OPTIONS = {
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

export default function Auth() {
  const navigate = useNavigate();
  const [accessCode, setAccessCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', { accessCode });
      setUser(response.data.user);
      toast.success('Access granted');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Access denied');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      
      {/* Hyperspeed Full Background */}
      <div className="absolute inset-0 z-0">
        <Hyperspeed effectOptions={HYPERSPEED_OPTIONS} />
      </div>

      {/* Dark overlay to make the form readable */}
      <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[1px]" />

      {/* Floating Back Button */}
      <div className="absolute top-8 left-8 z-30">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium group"
        >
          <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform mb-[1px]">arrow_back</span>
          Back
        </button>
      </div>

      {/* Auth Card */}
      <main className="relative z-20 w-full max-w-[420px] mx-4 flex flex-col items-center">
        
        {/* Logo */}
        <div className="mb-8 flex items-center gap-3">
          <div className="h-8 w-8 bg-[#6366f1] rounded-lg shadow-[0_0_20px_rgba(99,102,241,0.6)] flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-[18px]">model_training</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tighter text-white">MEREDIAN</h1>
        </div>

        {/* Glass Card */}
        <div className="w-full bg-white/[0.04] backdrop-blur-xl border border-white/[0.10] rounded-2xl p-8 shadow-[0_0_60px_rgba(0,0,0,0.5)]">
          <div className="space-y-7">
            <header className="space-y-1.5">
              <h2 className="text-white text-xl font-bold tracking-tight">Welcome back</h2>
              <p className="text-white/50 text-sm">Enter your obsidian key to continue.</p>
            </header>

            {/* OAuth Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => navigate('/dashboard')}
                type="button"
                className="w-full flex items-center justify-center gap-3 bg-white/[0.06] py-3 px-4 rounded-xl border border-white/[0.1] hover:bg-white/[0.12] hover:border-white/20 transition-all duration-200 active:scale-[0.98] group"
              >
                <span className="material-symbols-outlined text-lg text-white/70 group-hover:text-white transition-colors">terminal</span>
                <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">Continue with GitHub</span>
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                type="button"
                className="w-full flex items-center justify-center gap-3 bg-white/[0.06] py-3 px-4 rounded-xl border border-white/[0.1] hover:bg-white/[0.12] hover:border-white/20 transition-all duration-200 active:scale-[0.98] group"
              >
                <span className="material-symbols-outlined text-lg text-white/70 group-hover:text-white transition-colors">database</span>
                <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">Continue with Google</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center py-1">
              <div className="flex-grow border-t border-white/[0.08]"></div>
              <span className="flex-shrink mx-4 text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">OR</span>
              <div className="flex-grow border-t border-white/[0.08]"></div>
            </div>

            {/* Email Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.1em] font-bold text-white/40" htmlFor="access-code">
                  Access Code
                </label>
                <input
                  className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#6366f1]/60 focus:bg-white/[0.08] transition-all duration-200"
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
                className="w-full bg-[#6366f1] text-white text-sm font-bold py-3.5 rounded-xl hover:bg-[#818cf8] active:scale-[0.97] transition-all shadow-lg shadow-[#6366f1]/20 disabled:opacity-50"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Verifying...' : 'Enter Workspace'}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 flex flex-col items-center gap-3">
          <div className="flex gap-6">
            <a className="text-[10px] uppercase tracking-[0.1em] text-white/30 hover:text-white/60 transition-colors" href="#">Privacy</a>
            <a className="text-[10px] uppercase tracking-[0.1em] text-white/30 hover:text-white/60 transition-colors" href="#">Terms</a>
            <a className="text-[10px] uppercase tracking-[0.1em] text-white/30 hover:text-white/60 transition-colors" href="#">System Status</a>
          </div>
          <p className="text-[10px] uppercase tracking-[0.05em] text-white/20 font-medium">© 2024 Meredian Intelligence Corp</p>
        </footer>
      </main>
    </div>
  );
}
