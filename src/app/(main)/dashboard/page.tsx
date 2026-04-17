import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import UserProfile from '@/models/UserProfile';
import User from '@/models/User';
import Project from '@/models/Project';
import DashboardStats from '@/components/DashboardStats';
import { BackButton } from '@/components/ui/back-button';
import { HealthScoreGauge } from '@/components/HealthScoreGauge';
import { DashboardGreeting } from '@/components/dashboard/DashboardGreeting';
import { ActiveProjectsEmptyState } from '@/components/dashboard/ActiveProjectsEmptyState';
import { DashboardMainSurface } from '@/components/layout/DashboardMainSurface';

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
      linkedinUrl: "https://linkedin.com/in/devbypass",
      jobsAppliedCount: 0,
      portfolioViewsCount: 0,
    };
    projects = [];
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

  const firstName = user?.name?.split(' ')[0] || 'Agent';

  const jobsApplied = Number(profile.jobsAppliedCount ?? 0);
  const portfolioViews = Number(profile.portfolioViewsCount ?? 0);
  const skillsCount = profile.techStack?.length ?? 0;

  const fmtViews = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : String(n);

  const stats = [
    {
      label: 'PROJECTS BUILT',
      val: String(projects.length),
      status: projects.length === 0 ? 'START BUILDING' : 'ACTIVE',
    },
    {
      label: 'JOBS APPLIED',
      val: String(jobsApplied),
      status: jobsApplied === 0 ? 'NO OUTREACH YET' : 'TOTAL SENT',
    },
    {
      label: 'PORTFOLIO VIEWS',
      val: fmtViews(portfolioViews),
      status: portfolioViews === 0 ? 'NO VIEWS YET' : 'ALL TIME',
    },
    {
      label: 'SKILLS MATCHED',
      val: String(skillsCount),
      status: skillsCount === 0 ? 'ADD STACK' : 'FROM PROFILE',
    },
  ];

  return (
    <DashboardMainSurface raysClassName="opacity-[0.6]">
    <div className="w-full h-full px-6 sm:px-10 pb-16 pt-2 text-white selection:bg-[#d856b8]">
      <div className="max-w-7xl mx-auto w-full flex flex-col items-start gap-10 sm:gap-12">
        <BackButton className="mb-2" label="Home" />
        
        {/* Main Header Section */}
        <section className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 lg:gap-12">
          <DashboardGreeting
            greeting={greeting}
            firstName={firstName}
            dreamRole={profile.dreamRole ?? 'Software Developer'}
          />
          <HealthScoreGauge score={profile.healthScore || 75} />
        </section>

        {/* Stats Grid */}
        <DashboardStats stats={stats} />

        {/* Active Projects */}
        <section className="w-full space-y-10 mt-6">
          <div className="flex justify-between items-end border-b border-white/10 pb-6 gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">Active Projects</h2>
              <p className="text-[11px] sm:text-xs uppercase font-black tracking-[0.35em] text-white/25">
                Operational Roadmap
              </p>
            </div>
            <button
              type="button"
              className="text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] text-white/40 hover:text-[#6366f1] transition-colors shrink-0"
            >
              View All Projects
            </button>
          </div>

          {projects.length === 0 ? (
            <ActiveProjectsEmptyState />
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
    </DashboardMainSurface>
  );
}
