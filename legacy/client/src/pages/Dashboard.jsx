import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function Dashboard() {
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

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
          {isLoading ? (
            <div className="col-span-full py-12 text-center text-on-surface-variant/50 text-sm font-medium tracking-widest animate-pulse">
              SYNCHRONIZING WITH EDGE NODES...
            </div>
          ) : (
            stats.map(stat => (
              <div key={stat.label} className="p-6 bg-surface-container-low border border-outline-variant/20 rounded-lg hover:border-primary/30 hover:bg-surface-container transition-all group">
                <p className="text-[10px] uppercase font-bold tracking-[0.1em] text-on-surface-variant mb-4">{stat.label}</p>
                <h2 className="text-4xl font-bold tracking-tighter text-on-surface group-hover:text-primary transition-colors">{stat.val}</h2>
                <div className="mt-6 inline-flex items-center px-2.5 py-1 bg-surface-container-highest rounded text-[10px] text-tertiary-fixed font-bold tracking-wider">
                  {stat.status}
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
