export default function Settings() {
  return (
    <div className="w-full h-full p-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-on-surface mb-2">Architect Settings</h2>
          <div className="h-px w-12 bg-primary/40"></div>
        </header>

        <section className="flex flex-col gap-y-6">
          <div className="p-8 bg-surface-container-low border border-outline-variant/20 rounded-lg">
            <h3 className="text-xl font-medium text-on-surface tracking-tight mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">account_circle</span>
              User Profile
            </h3>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-full bg-surface-container-highest overflow-hidden border-2 border-outline-variant/30 flex-shrink-0">
                <img 
                  alt="developer portrait" 
                  className="w-full h-full object-cover grayscale" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXIY_gJc1P9Fklqp00EzzO3f1lUEZSE_91O6hb17tPhWihFxrFD6irHybLuM1Gmc1EDmXqgO3IWSo6Hl9ENLuaNcojsVPYSHJWWBJtMrXSXw8Kyu2Eok4YHExfdXwoNDfUSez6U_iHfZK8xK0auY48Bzl6KFPpxOwn0towzV6BD4Vf3NbbC7pOAmbeDyWzyJf_qm-m5Thsv8KMzmPBcFVHCbnelA9NxqDh5aspMEg5IIYagIJnIs3EC9VPPtflspq2ZOE6FUc-GVs"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-label uppercase tracking-widest text-on-surface-variant mb-1">Obsidian Key</p>
                <div className="flex items-center gap-3">
                  <code className="text-base font-mono text-on-surface bg-surface-container-highest px-3 py-1 rounded">user_8f92a4bc_x9</code>
                  <button className="text-primary hover:bg-primary/10 p-1.5 rounded transition-colors"><span className="material-symbols-outlined text-[18px]">content_copy</span></button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">Display Name</label>
                <input type="text" defaultValue="Architect Nova" className="w-full bg-surface-container px-4 py-2.5 rounded-lg border border-outline-variant/20 focus:border-primary/50 text-sm text-on-surface transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">Contact Email</label>
                <input type="email" defaultValue="nova@meredian.local" className="w-full bg-surface-container px-4 py-2.5 rounded-lg border border-outline-variant/20 focus:border-primary/50 text-sm text-on-surface transition-colors" />
              </div>
            </div>
          </div>

          <div className="p-8 bg-surface-container-low border border-outline-variant/20 rounded-lg">
            <h3 className="text-xl font-medium text-on-surface tracking-tight mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">terminal</span>
              System Preferences
            </h3>
            
            <div className="flex items-center justify-between py-4 border-b border-outline-variant/10">
              <div>
                <p className="font-semibold text-on-surface text-sm">Hardware Acceleration</p>
                <p className="text-xs text-on-surface-variant mt-1">Utilize local GPU compute for vector indexing when available.</p>
              </div>
              <div className="w-10 h-5 bg-primary/20 rounded-full relative cursor-pointer border border-primary/30">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-primary shadow-sm hover:scale-110 transition-transform"></div>
              </div>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-outline-variant/10">
              <div>
                <p className="font-semibold text-on-surface text-sm">Telemetry Diagnostics</p>
                <p className="text-xs text-on-surface-variant mt-1">Send anonymous error states to improve model execution.</p>
              </div>
              <div className="w-10 h-5 bg-surface-container-highest rounded-full relative cursor-pointer border border-outline-variant/30">
                <div className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-on-surface-variant shadow-sm hover:scale-110 transition-transform"></div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
             <button className="px-6 py-2.5 bg-primary text-on-primary rounded-lg font-sans text-sm font-semibold tracking-tight hover:bg-primary-container transition-all active:scale-[0.98]">
              Save Configuration
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
