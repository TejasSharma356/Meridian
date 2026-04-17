'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  const [width, setWidth] = useState(260);
  const isResizing = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;
      let newWidth = e.clientX;
      if (newWidth < 220) newWidth = 220;
      if (newWidth > 500) newWidth = 500;
      setWidth(newWidth);
    };
    
    const handleMouseUp = () => {
      if (isResizing.current) {
        isResizing.current = false;
        document.body.style.cursor = 'default';
        document.body.style.userSelect = 'auto';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const items = [
    { name: 'Intelligence', path: '/intelligence', icon: 'psychology' },
    { name: 'Architect', path: '/architect', icon: 'architecture' },
    { name: 'Build', path: '/build', icon: 'construction' },
    { name: 'Portfolio', path: '/portfolio', icon: 'folder_managed' },
    { name: 'Apply', path: '/apply', icon: 'send' },
  ];

  const NavItem = ({ item }: { item: typeof items[0] }) => {
    const isActive = pathname === item.path;
    return (
      <Link 
        key={item.name} 
        href={item.path}
        className={cn(
          "flex items-center gap-3 px-4 py-2.5 rounded-lg font-sans tracking-tight text-sm transition-all duration-200",
          isActive 
            ? "text-[#6366f1] bg-white/[0.05] font-semibold"
            : "text-white/50 hover:text-white hover:bg-white/[0.03] font-medium"
        )}
      >
        <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
        {item.name}
      </Link>
    );
  };

  return (
    <aside 
      style={{ width: `${width}px` }}
      className="flex-shrink-0 flex flex-col p-6 gap-y-6 overflow-y-auto overflow-x-hidden bg-black/40 backdrop-blur-xl border-r border-white/[0.05] relative group no-scrollbar"
    >
      <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity mb-2 pr-4">
        <div className="h-6 w-6 bg-[#6366f1] rounded shadow-[0_0_15px_rgba(99,102,241,0.5)] flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-white text-[14px]">model_training</span>
        </div>
        <h1 className="text-xl font-bold tracking-tighter text-white whitespace-nowrap">Meredian</h1>
      </Link>

      <div className="flex flex-col gap-4">
        <Link 
          href="/dashboard"
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl font-sans tracking-tight text-sm transition-all duration-200",
            pathname === '/dashboard'
              ? "text-[#6366f1] bg-white/[0.05] font-semibold shadow-[inset_0_0_20px_rgba(99,102,241,0.05)]"
              : "text-white/50 hover:text-white hover:bg-white/[0.03] font-medium"
          )}
        >
          <span className="material-symbols-outlined text-[18px]">dashboard</span>
          Dashboard
        </Link>
      </div>

      <nav className="flex-1 flex flex-col gap-y-1 mt-2">
        {items.map(item => <NavItem key={item.name} item={item} />)}
        
        <div className="mt-4 px-2">
          <button className="w-full py-3 px-4 bg-[#6366f1] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-[#6366f1]/20 uppercase tracking-widest">
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Project
          </button>
        </div>
      </nav>

      <div className="mt-auto flex flex-col gap-y-1 border-t border-white/[0.05] pt-4 pb-2">
        <Link 
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-4 py-2.5 rounded-lg font-sans tracking-tight text-sm transition-all duration-200",
            pathname === '/settings' ? "text-[#6366f1]" : "text-white/40 hover:text-white"
          )}
        >
          <span className="material-symbols-outlined text-[18px]">settings</span>
          Settings
        </Link>
        <Link 
          href="/support"
          className={cn(
            "flex items-center gap-3 px-4 py-2.5 rounded-lg font-sans tracking-tight text-sm transition-all duration-200",
            pathname === '/support' ? "text-[#6366f1]" : "text-white/40 hover:text-white"
          )}
        >
          <span className="material-symbols-outlined text-[18px]">help</span>
          Support
        </Link>
      </div>

      {/* Resize Handle */}
      <div 
        onMouseDown={(e) => {
          e.preventDefault();
          isResizing.current = true;
          document.body.style.cursor = 'col-resize';
          document.body.style.userSelect = 'none';
        }}
        className="absolute top-0 right-0 w-1.5 h-full cursor-col-resize hover:bg-[#6366f1]/20 active:bg-[#6366f1]/40 transition-colors z-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100"
      >
        <div className="w-0.5 h-16 bg-white/10 rounded-full pointer-events-none"></div>
      </div>
    </aside>
  );
}
