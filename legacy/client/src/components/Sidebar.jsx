import { NavLink, Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

export default function Sidebar() {
  const [width, setWidth] = useState(260);
  const isResizing = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
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

  return (
    <aside 
      style={{ width: `${width}px` }}
      className="flex-shrink-0 flex flex-col p-6 gap-y-6 overflow-y-auto overflow-x-hidden bg-transparent border-r border-outline-variant/10 relative custom-scrollbar group"
    >
      <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity mb-2 pr-4">
        <div className="h-6 w-6 bg-primary rounded shadow-[0_0_15px_rgba(99,102,241,0.5)] flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-on-primary text-[14px]">model_training</span>
        </div>
        <h1 className="text-xl font-bold tracking-tighter text-on-surface whitespace-nowrap">Meredian</h1>
      </Link>

      <div className="flex flex-col gap-4">
        <NavLink 
          to="/dashboard"
          className={({ isActive }) => 
            isActive 
              ? "text-primary bg-surface-container flex items-center gap-3 px-4 py-3 rounded-xl font-sans tracking-tight text-sm font-semibold"
              : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low/50 transition-colors flex items-center gap-3 px-4 py-3 rounded-xl font-sans tracking-tight text-sm font-medium cursor-pointer"
          }
        >
          <span className="material-symbols-outlined text-[18px]">dashboard</span>
          Dashboard
        </NavLink>
        <button className="w-full py-3 px-4 bg-primary text-on-primary rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Session
        </button>
      </div>

      <nav className="flex-1 flex flex-col gap-y-1 mt-2">
        {items.map(item => (
          <NavLink 
            key={item.name} 
            to={item.path}
            className={({ isActive }) => 
              isActive 
                ? "text-primary bg-surface-container flex items-center gap-3 px-4 py-2.5 rounded-lg font-sans tracking-tight text-sm font-semibold"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low/50 transition-colors flex items-center gap-3 px-4 py-2.5 rounded-lg font-sans tracking-tight text-sm font-medium cursor-pointer"
            }
          >
            <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-y-1 border-t border-outline-variant/10 pt-4 pb-2">
        <NavLink 
          to="/settings"
          className={({ isActive }) => 
              isActive 
                ? "text-primary bg-surface-container flex items-center gap-3 px-4 py-2.5 rounded-lg font-sans tracking-tight text-sm font-semibold"
                : "text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-3 px-4 py-2.5 rounded-lg font-sans tracking-tight text-sm font-medium cursor-pointer"
          }
        >
          <span className="material-symbols-outlined text-[18px]">settings</span>
          Settings
        </NavLink>
        <NavLink 
          to="/support"
          className={({ isActive }) => 
              isActive 
                ? "text-primary bg-surface-container flex items-center gap-3 px-4 py-2.5 rounded-lg font-sans tracking-tight text-sm font-semibold"
                : "text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-3 px-4 py-2.5 rounded-lg font-sans tracking-tight text-sm font-medium cursor-pointer"
          }
        >
          <span className="material-symbols-outlined text-[18px]">help</span>
          Support
        </NavLink>
      </div>

      {/* Full-height custom drag handle */}
      <div 
        onMouseDown={(e) => {
          e.preventDefault();
          isResizing.current = true;
          document.body.style.cursor = 'col-resize';
          document.body.style.userSelect = 'none';
        }}
        className="absolute top-0 right-0 w-2 h-full cursor-col-resize hover:bg-primary/20 active:bg-primary/40 transition-colors z-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100"
      >
        <div className="w-0.5 h-16 bg-on-surface-variant/40 rounded-full pointer-events-none"></div>
      </div>
    </aside>
  );
}
