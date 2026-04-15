import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { DottedSurface } from './ui/dotted-surface';

export default function Layout() {
  return (
    <div className="flex h-screen text-on-surface font-sans overflow-hidden relative" style={{ background: 'var(--color-surface-container-lowest, #0c0c0e)' }}>
      {/* Dotted wave grid — sits at z-0 inside this relative container */}
      <DottedSurface />

      {/* Sidebar and TopBar sit above the dots at z-10+ */}
      <div className="relative z-10 flex h-full w-full">
        <TopBar />
        <Sidebar />
        <main className="flex-1 overflow-y-auto pt-20 px-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
