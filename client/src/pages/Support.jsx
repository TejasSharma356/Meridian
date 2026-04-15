export default function Support() {
  return (
    <div className="w-full h-full p-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-on-surface mb-2">Technical Support</h2>
          <div className="h-px w-12 bg-primary/40"></div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-8 bg-surface-container-low border border-outline-variant/20 rounded-lg hover:border-primary/50 transition-colors group cursor-pointer">
            <span className="material-symbols-outlined text-4xl text-tertiary-fixed mb-4 group-hover:scale-110 transition-transform">article</span>
            <h3 className="text-xl font-medium tracking-tight mb-2">Knowledge Base</h3>
            <p className="text-sm text-on-surface-variant">Browse comprehensive documentation on system architecture and configuration.</p>
          </div>
          
          <div className="p-8 bg-surface-container-low border border-outline-variant/20 rounded-lg hover:border-primary/50 transition-colors group cursor-pointer">
            <span className="material-symbols-outlined text-4xl text-primary mb-4 group-hover:scale-110 transition-transform">chat</span>
            <h3 className="text-xl font-medium tracking-tight mb-2">Live Support Pipeline</h3>
            <p className="text-sm text-on-surface-variant">Connect directly with an engineer for critical integration issues.</p>
          </div>
        </section>

        <section className="p-8 bg-surface-container-low border border-outline-variant/20 rounded-lg">
          <h3 className="text-xl font-medium tracking-tight mb-6">Open a Support Ticket</h3>
          <form className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">Ticket Category</label>
                <select className="bg-surface-container px-4 py-2.5 rounded-lg border border-outline-variant/20 focus:border-primary/50 text-sm text-on-surface w-full appearance-none">
                  <option>Bug Report</option>
                  <option>Feature Request</option>
                  <option>Vector DB Issue</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">Severity level</label>
                <select className="bg-surface-container px-4 py-2.5 rounded-lg border border-outline-variant/20 focus:border-primary/50 text-sm text-on-surface w-full appearance-none">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>Critical / System Outage</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 mt-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">Description</label>
              <textarea 
                className="w-full h-32 bg-surface-container px-4 py-3 rounded-lg border border-outline-variant/20 focus:border-primary/50 text-sm text-on-surface resize-none"
                placeholder="Detail the issue or request here..."
              ></textarea>
            </div>
            
            <button type="button" className="mt-4 px-6 py-2.5 bg-on-surface text-surface rounded-lg font-sans text-sm font-semibold tracking-tight hover:bg-on-surface/90 transition-all active:scale-[0.98] w-fit">
              Submit Ticket
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
