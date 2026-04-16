'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function TopBar() {
  const router = useRouter();

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <header className="pointer-events-auto h-12 flex justify-center items-center gap-6 px-6 bg-[#0f0f0f]/30 hover:bg-[#0f0f0f]/60 backdrop-blur-md shadow-sm rounded-full border border-white/10 transition-colors text-sm">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-white/50 hover:text-[#d856b8] transition-colors font-medium group pr-4 border-r border-white/10"
        >
          <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
          Back
        </button>

        <nav className="hidden md:flex items-center gap-6 px-4">
          <Link href="/about" className="text-white/50 hover:text-white hover:text-[#d856b8] transition-colors font-medium tracking-tight">About Us</Link>
          <Link href="/features" className="text-white/50 hover:text-white hover:text-[#d856b8] transition-colors font-medium tracking-tight">Features</Link>
          <Link href="/pricing" className="text-white/50 hover:text-white hover:text-[#d856b8] transition-colors font-medium tracking-tight">Pricing</Link>
        </nav>
        
        <div className="flex items-center gap-4 pl-4 border-l border-white/10">
          <div className="relative group flex items-center cursor-pointer">
            <span className="material-symbols-outlined text-[20px] text-white/50 hover:text-[#d856b8] transition-colors">notifications</span>
            <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#d856b8] rounded-full"></span>
          </div>
        </div>
      </header>
    </div>
  );
}
