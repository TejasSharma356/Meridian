export default function Portfolio() {
  return (
    <div className="w-full h-full flex flex-col relative">
      <div className="px-12 pt-12 pb-6">
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-on-surface-variant/40">Phase 04 &amp; 05</span>
        <h2 className="text-4xl font-semibold tracking-tight mt-2">Portfolio Strategy</h2>
      </div>

      <div className="flex-1 flex overflow-hidden px-12 pb-24 gap-12">
        <section className="w-1/2 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Project_Manifest.md</h3>
            <div className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-outline-variant/40"></span>
              <span className="w-2 h-2 rounded-full bg-outline-variant/40"></span>
              <span className="w-2 h-2 rounded-full bg-outline-variant/40"></span>
            </div>
          </div>
          <div className="flex-1 bg-surface-container-lowest border border-outline-variant/20 rounded-lg p-8 overflow-y-auto no-scrollbar font-sans text-sm leading-relaxed">
            <div className="prose prose-invert max-w-none">
              <h1 className="text-2xl font-bold mb-4 border-b border-outline-variant/20 pb-2">Obsidian Flow Engine</h1>
              <p className="text-on-surface-variant mb-6">A high-performance reactive architecture for localized intelligence processing. Built for the modern obsidian-tier architect.</p>

              <h3 className="text-lg font-semibold mt-8 mb-3">Core Features</h3>
              <ul className="list-disc list-inside text-on-surface-variant space-y-2 mb-6">
                <li>Zero-latency event propagation</li>
                <li>Tonal stacking UI components</li>
                <li>Asymmetric data visualization</li>
                <li>Automated documentation synthesis</li>
              </ul>

              <h3 className="text-lg font-semibold mt-8 mb-3">Architecture</h3>
              <div className="bg-surface-container-low p-4 rounded border border-outline-variant/10 font-mono text-[13px] text-on-surface-variant mb-6 whitespace-pre-wrap">
                {`graph TD;\n  A[Input Layer] --> B[Processing Hub];\n  B --> C[Vector Memory];\n  B --> D[Visual Output];`}
              </div>

              <h3 className="text-lg font-semibold mt-8 mb-3">Deployment</h3>
              <p className="text-on-surface-variant">Deploy to edge nodes with a single command. The engine handles horizontal scaling across distributed obsidian clusters automatically.</p>
            </div>
          </div>
        </section>

        <section className="w-1/2 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Matched_Ecosystems</h3>
            <div className="px-2 py-0.5 bg-primary/5 border border-primary/20 rounded text-[10px] text-primary">3 Active Matches</div>
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto no-scrollbar pb-6">
            <div className="p-6 bg-surface-container-low border border-outline-variant/10 rounded-lg group hover:border-primary/20 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-on-surface group-hover:text-primary transition-colors">Vercel Inc.</h4>
                  <p className="text-sm text-on-surface-variant">Lead Design Engineer</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-primary">98%</div>
                  <div className="text-[10px] uppercase tracking-tighter text-on-surface-variant">Technical Fit</div>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] text-on-surface-variant">React</span>
                <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] text-on-surface-variant">Next.js</span>
                <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] text-on-surface-variant">WASM</span>
              </div>
            </div>

            <div className="p-6 bg-surface-container-low border border-outline-variant/10 rounded-lg group hover:border-primary/20 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-on-surface group-hover:text-primary transition-colors">Linear</h4>
                  <p className="text-sm text-on-surface-variant">Founding Architect</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-primary">94%</div>
                  <div className="text-[10px] uppercase tracking-tighter text-on-surface-variant">Product Fit</div>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] text-on-surface-variant">Rust</span>
                <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] text-on-surface-variant">Desktop-First</span>
                <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] text-on-surface-variant">Sync Engines</span>
              </div>
            </div>

            <div className="p-6 bg-surface-container-low border border-outline-variant/10 rounded-lg group hover:border-primary/20 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-on-surface group-hover:text-primary transition-colors">Scale AI</h4>
                  <p className="text-sm text-on-surface-variant">UX Logic Specialist</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-primary">89%</div>
                  <div className="text-[10px] uppercase tracking-tighter text-on-surface-variant">Domain Match</div>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] text-on-surface-variant">Data Viz</span>
                <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] text-on-surface-variant">ML Ops</span>
                <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] text-on-surface-variant">Python</span>
              </div>
            </div>
          </div>

          <div className="mt-auto p-4 bg-primary/5 rounded border border-primary/10 flex items-start gap-4 flex-shrink-0">
            <span className="material-symbols-outlined text-primary text-sm mt-0.5">info</span>
            <p className="text-[11px] text-on-surface-variant leading-snug">
              AI matches are calculated based on your architectural patterns in the Build phase and the metadata exported from your local repositories.
            </p>
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 right-0 w-[80%] h-24 bg-surface/80 backdrop-blur-md flex items-center justify-center border-t border-outline-variant/10">
        <button className="px-12 py-4 bg-primary text-on-primary rounded-lg font-bold text-sm tracking-widest uppercase hover:bg-primary-container transition-all active:scale-[0.98]">
          Finalize &amp; Export Portfolio
        </button>
      </div>
    </div>
  );
}
