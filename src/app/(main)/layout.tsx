import Sidebar from '@/components/layout/Sidebar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-black selection:bg-[#d856b8] selection:text-white">
      {/* Sidebar - Left Side */}
      <Sidebar />

      {/* Main Content Area - Right Side */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* Stage Area */}
        {/* pt-0: nav offset + rays alignment live in DashboardMainSurface so the canvas is one page */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden pt-0 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
