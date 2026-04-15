export default function Architect() {
  return (
    <div className="w-full h-full p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-tertiary-fixed font-bold">Phase 02 / Sequence</span>
          <h1 className="text-4xl font-bold tracking-tight text-on-surface">Architect Roadmap</h1>
          <p className="text-on-surface-variant max-w-xl">Mapping the structural integrity of your application. This blueprint defines the execution path from concept to code.</p>
        </div>

        <div className="bg-surface-container-low rounded-lg p-10 border border-outline-variant/10 relative">
          <div className="absolute left-14 top-16 bottom-16 w-px bg-outline-variant/30"></div>
          
          <div className="flex flex-col gap-12 relative z-10">
            {[
              { num: '01', title: 'Define Scope', desc: 'Establishing functional boundaries and identifying the core feature set for the initial release.' },
              { num: '02', title: 'Data Schema', desc: 'Designing the relational architecture and object models to ensure seamless data persistence.' },
              { num: '03', title: 'API Design', desc: 'Specifying the endpoint structure and authentication protocols for the communication layer.' },
              { num: '04', title: 'Frontend Mockup', desc: 'Developing low-fidelity visual structures to validate the user experience and interface flow.' },
              { num: '05', title: 'Test Plan', desc: 'Defining unit and integration testing parameters to maintain long-term codebase stability.' },
            ].map(item => (
              <div key={item.num} className="flex gap-8 group">
                <div className="flex-none h-8 w-8 rounded-full bg-surface-container-highest border border-outline-variant/40 flex items-center justify-center text-[10px] font-bold text-primary group-hover:border-primary transition-colors">
                  {item.num}
                </div>
                <div className="flex flex-col gap-1 pt-0.5">
                  <h3 className="text-lg font-semibold text-on-surface">{item.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-outline-variant/20 flex justify-end">
            <button className="px-6 py-2.5 bg-primary text-on-primary rounded-lg font-sans text-sm font-semibold tracking-tight hover:bg-primary-container transition-all active:scale-[0.98] flex items-center gap-2">
              Confirm &amp; Start Coding
              <span className="material-symbols-outlined text-sm">terminal</span>
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center px-4 py-8 border-t border-outline-variant/10">
          <div className="flex gap-4 items-center">
            <div className="h-10 w-10 bg-surface-container-high rounded border border-outline-variant/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-on-surface-variant">model_training</span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface">Obsidian Engine 4.0</p>
              <p className="text-[10px] text-tertiary-fixed">LATENCY: 12ms | STATE: STABLE</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full bg-primary/20 animate-pulse"></div>
            <div className="h-2 w-2 rounded-full bg-primary/40"></div>
            <div className="h-2 w-2 rounded-full bg-primary"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
