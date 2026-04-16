export default function Intelligence() {
  return (
    <div className="w-full h-full p-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-on-surface mb-2">High-Demand Opportunities for You</h2>
          <div className="h-px w-12 bg-primary/40"></div>
        </header>

        <section className="flex flex-col gap-y-6">
          <div className="group relative flex flex-col md:flex-row justify-between items-start md:items-center p-8 bg-surface-container-low border border-outline-variant/20 rounded-lg hover:bg-surface-container transition-all duration-300">
            <div className="flex-1">
              <div className="flex items-center gap-x-3 mb-2">
                <span className="material-symbols-outlined text-primary/60 text-lg">smart_toy</span>
                <h3 className="text-xl font-medium text-on-surface tracking-tight">Customer Support AI</h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                <span className="text-[10px] font-label uppercase tracking-wider px-2 py-1 bg-surface-container-highest/40 text-on-surface-variant rounded-sm border border-outline-variant/10">Next.js</span>
                <span className="text-[10px] font-label uppercase tracking-wider px-2 py-1 bg-surface-container-highest/40 text-on-surface-variant rounded-sm border border-outline-variant/10">OpenAI</span>
                <span className="text-[10px] font-label uppercase tracking-wider px-2 py-1 bg-surface-container-highest/40 text-on-surface-variant rounded-sm border border-outline-variant/10">Pinecone</span>
              </div>
            </div>
            <div className="flex items-center gap-x-12 w-full md:w-auto mt-6 md:mt-0 pt-6 md:pt-0 border-t md:border-t-0 border-outline-variant/10">
              <div className="text-right">
                <p className="text-[9px] uppercase tracking-widest text-on-surface-variant/60 mb-1">Market Fit</p>
                <p className="text-2xl font-bold text-primary tracking-tighter">98%</p>
              </div>
              <button className="px-6 py-2 bg-primary text-on-primary text-[11px] font-bold uppercase tracking-widest rounded-sm hover:scale-[1.02] active:scale-[0.98] transition-all">
                Select Project
              </button>
            </div>
          </div>

          <div className="group relative flex flex-col md:flex-row justify-between items-start md:items-center p-8 bg-surface-container-low border border-outline-variant/20 rounded-lg hover:bg-surface-container transition-all duration-300">
            <div className="flex-1">
              <div className="flex items-center gap-x-3 mb-2">
                <span className="material-symbols-outlined text-primary/60 text-lg">settings_input_component</span>
                <h3 className="text-xl font-medium text-on-surface tracking-tight">DevOps Automator</h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                <span className="text-[10px] font-label uppercase tracking-wider px-2 py-1 bg-surface-container-highest/40 text-on-surface-variant rounded-sm border border-outline-variant/10">Python</span>
                <span className="text-[10px] font-label uppercase tracking-wider px-2 py-1 bg-surface-container-highest/40 text-on-surface-variant rounded-sm border border-outline-variant/10">Docker</span>
                <span className="text-[10px] font-label uppercase tracking-wider px-2 py-1 bg-surface-container-highest/40 text-on-surface-variant rounded-sm border border-outline-variant/10">GitHub Actions</span>
              </div>
            </div>
            <div className="flex items-center gap-x-12 w-full md:w-auto mt-6 md:mt-0 pt-6 md:pt-0 border-t md:border-t-0 border-outline-variant/10">
              <div className="text-right">
                <p className="text-[9px] uppercase tracking-widest text-on-surface-variant/60 mb-1">Market Fit</p>
                <p className="text-2xl font-bold text-primary tracking-tighter">95%</p>
              </div>
              <button className="px-6 py-2 bg-primary text-on-primary text-[11px] font-bold uppercase tracking-widest rounded-sm hover:scale-[1.02] active:scale-[0.98] transition-all">
                Select Project
              </button>
            </div>
          </div>

          <div className="group relative flex flex-col md:flex-row justify-between items-start md:items-center p-8 bg-surface-container-low border border-outline-variant/20 rounded-lg hover:bg-surface-container transition-all duration-300">
            <div className="flex-1">
              <div className="flex items-center gap-x-3 mb-2">
                <span className="material-symbols-outlined text-primary/60 text-lg">terminal</span>
                <h3 className="text-xl font-medium text-on-surface tracking-tight">Security Protocol Shield</h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                <span className="text-[10px] font-label uppercase tracking-wider px-2 py-1 bg-surface-container-highest/40 text-on-surface-variant rounded-sm border border-outline-variant/10">Rust</span>
                <span className="text-[10px] font-label uppercase tracking-wider px-2 py-1 bg-surface-container-highest/40 text-on-surface-variant rounded-sm border border-outline-variant/10">WebAssembly</span>
                <span className="text-[10px] font-label uppercase tracking-wider px-2 py-1 bg-surface-container-highest/40 text-on-surface-variant rounded-sm border border-outline-variant/10">VPC</span>
              </div>
            </div>
            <div className="flex items-center gap-x-12 w-full md:w-auto mt-6 md:mt-0 pt-6 md:pt-0 border-t md:border-t-0 border-outline-variant/10">
              <div className="text-right">
                <p className="text-[9px] uppercase tracking-widest text-on-surface-variant/60 mb-1">Market Fit</p>
                <p className="text-2xl font-bold text-primary tracking-tighter">92%</p>
              </div>
              <button className="px-6 py-2 bg-primary text-on-primary text-[11px] font-bold uppercase tracking-widest rounded-sm hover:scale-[1.02] active:scale-[0.98] transition-all">
                Select Project
              </button>
            </div>
          </div>
        </section>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-surface-container-lowest border border-outline-variant/10 rounded-lg">
            <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant/40 mb-4">Market Velocity</p>
            <div className="flex items-baseline gap-x-2">
              <span className="text-3xl font-light tracking-tighter text-on-surface">+12.4%</span>
              <span className="text-primary text-[10px] font-bold">UPWARD</span>
            </div>
            <p className="text-xs text-on-surface-variant/60 mt-2">AI-integration services are trending higher in Q4 forecasts.</p>
          </div>
          <div className="p-6 bg-surface-container-lowest border border-outline-variant/10 rounded-lg">
            <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant/40 mb-4">Suggested Priority</p>
            <div className="flex items-center gap-x-2">
              <span className="material-symbols-outlined text-primary text-sm">bolt</span>
              <span className="text-sm font-medium text-on-surface">Customer Support AI</span>
            </div>
            <p className="text-xs text-on-surface-variant/60 mt-2">Highest ROI based on your current architectural stack proficiency.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
