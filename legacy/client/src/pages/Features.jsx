import { Link } from 'react-router-dom';

export default function Features() {
  const capabilities = [
    {
      icon: "architecture",
      title: "Automated System Architecture",
      desc: "Meridian's intelligence engine analyzes your requirements and generates production-ready structural diagrams, dependencies, and CI/CD pipelines in seconds."
    },
    {
      icon: "memory",
      title: "Contextual Neural Memory",
      desc: "Unlike standard agents, Meridian retains absolute context across your entire workspace, ensuring seamless continuity between design iterations and code execution."
    },
    {
      icon: "bolt",
      title: "Real-time Synthesis",
      desc: "Watch as logic, styling, and database schemas are synthesized live. You hold the architectural control; Meridian handles the heavy lifting."
    },
    {
      icon: "security",
      title: "Zero-Trust Security Protocols",
      desc: "All source architectures operate entirely on local-first processing environments with encrypted telemetry, maintaining absolute data sovereignty."
    },
    {
      icon: "deployed_code",
      title: "Seamless Universal Deployment",
      desc: "Push your completed environments directly to AWS, Vercel, or custom Docker nodes with one-click staging workflows."
    },
    {
      icon: "monitoring",
      title: "Live Trajectory Analytics",
      desc: "Monitor your system's performance metrics natively within the dashboard. See load velocities, memory leaks, and CPU overhead instantly."
    }
  ];

  return (
    <div className="w-full min-h-full p-12">
      <div className="max-w-6xl mx-auto py-12">
        <header className="flex flex-col items-center text-center mb-20 relative">
          <div className="absolute top-0 w-full h-full bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-primary mb-4 shrink-0 px-3 py-1 border border-primary/20 rounded-full bg-primary/5 backdrop-blur-sm z-10">System Capabilities</span>
          <h1 className="text-5xl font-bold tracking-tighter text-on-surface mb-6 z-10">Engineered for Complexity.</h1>
          <p className="text-xl text-on-surface-variant max-w-2xl font-medium tracking-tight z-10">
            A comprehensive suite of neural tools designed to accelerate your development baseline and scale your infrastructure intuitively.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => (
            <div key={idx} className="group p-8 rounded-2xl bg-surface-container-low border border-outline-variant/10 hover:border-primary/40 hover:bg-surface-container transition-all duration-500 cursor-default">
              <div className="w-12 h-12 rounded-xl bg-surface-container-highest border border-outline-variant/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">{cap.icon}</span>
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-on-surface mb-3">{cap.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {cap.desc}
              </p>
            </div>
          ))}
        </section>

        <div className="mt-24 p-12 rounded-3xl bg-surface-container border border-outline-variant/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 group">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="z-10 max-w-xl">
            <h3 className="text-3xl font-bold tracking-tighter text-on-surface mb-4">Ready to architect the future?</h3>
            <p className="text-on-surface-variant">Synchronize your first project environment using Meridian's automated intelligence routing.</p>
          </div>
          <button className="z-10 px-8 py-4 bg-primary text-on-primary rounded-xl font-bold tracking-tight shadow-lg shadow-primary/20 hover:-translate-y-1 transition-transform">
            Initialize Workspace
          </button>
        </div>
      </div>
    </div>
  );
}
