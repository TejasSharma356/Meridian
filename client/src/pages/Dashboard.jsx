export default function Dashboard() {
  return (
    <div className="w-full h-full p-12">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <header className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="text-primary text-[10px] font-bold uppercase tracking-widest">System Status: All Systems Nominal</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-on-surface mt-2">Dashboard Overview</h1>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'PROJECTS DEPLOYED', val: '4', status: '+1 THIS WEEK' },
            { label: 'MARKET MATCH SCORE', val: '86%', status: 'HIGH PROBABILITY' },
            { label: 'APPLICATIONS SENT', val: '12', status: '3 INTERVIEWS PENDING' },
            { label: 'SKILL COMPREHENSION', val: '92%', status: 'ADVANCING' }
          ].map(stat => (
            <div key={stat.label} className="p-6 bg-surface-container-low border border-outline-variant/20 rounded-lg hover:border-primary/30 hover:bg-surface-container transition-all group">
              <p className="text-[10px] uppercase font-bold tracking-[0.1em] text-on-surface-variant mb-4">{stat.label}</p>
              <h2 className="text-4xl font-bold tracking-tighter text-on-surface group-hover:text-primary transition-colors">{stat.val}</h2>
              <div className="mt-6 inline-flex items-center px-2.5 py-1 bg-surface-container-highest rounded text-[10px] text-tertiary-fixed font-bold tracking-wider">
                {stat.status}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
