import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import UserProfile from '@/models/UserProfile';
import User from '@/models/User';
import Project from '@/models/Project';
import DashboardStats from '@/components/DashboardStats';
import { BackButton } from '@/components/ui/back-button';
import { HealthScoreGauge } from '@/components/HealthScoreGauge';
import { Plus, LayoutGrid, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const session = await getSession();
  
  if (!session || !session.userId) {
    redirect('/auth');
  }

  let profile: any;
  let user: any;
  let projects: any[] = [];

  if (session.isDev) {
    user = { name: "Alex Mercer (DEV)" };
    profile = { 
      dreamRole: "Technical Architect", 
      techStack: ["React", "Next.js", "MongoDB"],
      healthScore: 82,
      resumeText: "Dev Bypass Resume",
      linkedinUrl: "https://linkedin.com/in/devbypass"
    };
    projects = []; // User requested 0 project state
  } else {
    // Only connect to DB if not in dev mode
    await dbConnect();
    
    const profileDoc = await UserProfile.findOne({ userId: session.userId }).lean() as any;
    const userDoc = await User.findOne({ _id: session.userId }).lean() as any;
    const projectDocs = await Project.find({ userId: session.userId }).sort({ updatedAt: -1 }).lean() as any[];

    if (!profileDoc) {
      redirect('/initialize');
    }

    // Convert to plain objects to avoid serialization errors with ObjectIds
    profile = JSON.parse(JSON.stringify(profileDoc));
    user = JSON.parse(JSON.stringify(userDoc));
    projects = JSON.parse(JSON.stringify(projectDocs));
  }

  // Time of day logic
  const hour = new Date().getHours();
  let greeting = 'Good morning';
  if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
  if (hour >= 17) greeting = 'Good evening';

  const stats = [
    { 
      label: 'PROJECTS BUILT', 
      val: projects.length.toString(), 
      status: '+2 THIS MO' 
    },
    { 
      label: 'JOBS APPLIED', 
      val: '45', 
      status: '+12%' 
    },
    { 
      label: 'PORTFOLIO VIEWS', 
      val: '1.2k', 
      status: 'TOP MATCH' 
    },
    { 
      label: 'SKILLS MATCHED', 
      val: profile.techStack?.length?.toString() || '0', 
      status: 'TOP 5%' 
    }
  ];

  return (
    <div className="w-full h-full p-12 bg-black text-white selection:bg-[#d856b8]">
      <div className="max-w-6xl mx-auto flex flex-col items-start gap-12 pt-16">
        <BackButton className="mb-2" label="Home" />
        
        {/* Main Header Section */}
        <section className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-6xl font-black tracking-tighter text-white">
              {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">{user?.name?.split(' ')[0] || 'Agent'}</span>
            </h1>
            <p className="text-white/40 text-lg max-w-xl leading-relaxed">
              Your career trajectory is currently outperforming <span className="text-white font-bold">85%</span> of your peer group. AI recommends focusing on the <span className="text-[#6366f1] font-bold">"{profile.dreamRole}"</span> logic today.
            </p>
          </div>
          <HealthScoreGauge score={profile.healthScore || 75} />
        </section>

        {/* Stats Grid */}
        <DashboardStats stats={stats} />

        {/* Active Projects */}
        <section className="w-full space-y-8 mt-4">
          <div className="flex justify-between items-end border-b border-white/10 pb-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold tracking-tight">Active Projects</h2>
              <p className="text-[10px] uppercase font-black tracking-[0.3em] text-white/20">Operational Roadmap</p>
            </div>
            <button className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-[#6366f1] transition-colors">View All Projects</button>
          </div>

          {projects.length === 0 ? (
            <div className="w-full p-16 bg-white/[0.02] border border-white/5 border-dashed rounded-[2rem] flex flex-col items-center justify-center gap-6 text-center">
              <div className="w-16 h-16 rounded-3xl bg-white/[0.03] border border-white/5 flex items-center justify-center">
                <Plus className="text-white/20" size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">No active projects detected</h3>
                <p className="text-white/40 text-sm max-w-sm mx-auto">Start your first career-boosting project to begin tracking metrics and trajectory gains.</p>
              </div>
              <button className="px-8 py-3 bg-[#6366f1] text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-[1.05] transition-all active:scale-95 shadow-xl shadow-[#6366f1]/20">
                Start a New Project
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {projects.map((proj, idx) => (
                <div key={proj._id} className="p-10 bg-white/[0.03] border border-white/10 rounded-[2.5rem] hover:border-[#6366f1]/40 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6">
                     <span className="px-3 py-1 bg-white/[0.05] border border-white/10 rounded-full text-[8px] font-black uppercase tracking-widest text-white/60">
                       {proj.status}
                     </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{proj.title}</h3>
                  <p className="text-white/40 text-sm mb-8 leading-relaxed">{proj.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {proj.techStack?.map((tag: string) => (
                      <span key={tag} className="px-3 py-1 bg-white/[0.02] border border-white/5 rounded-lg text-[10px] text-white/30 font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                      <span>Development</span>
                      <span className="text-[#6366f1]">{proj.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#6366f1] to-[#d856b8] transition-all duration-1000" 
                        style={{ width: `${proj.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
