export default function About() {
  return (
    <div className="w-full min-h-full p-12 flex flex-col items-center">
      <div className="max-w-4xl w-full pt-16 pb-24 relative">
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-primary mb-6 block">Our Manifesto</span>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-on-surface mb-8 leading-[1.1]">
          Building the nervous system<br/> for modern software.
        </h1>
        
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-transparent mb-12"></div>

        <div className="prose prose-invert max-w-none prose-p:text-on-surface-variant prose-p:text-lg prose-p:leading-relaxed prose-headings:text-on-surface">
          <p>
            The fundamental bottleneck in software engineering is no longer raw compute logic—it is the architectural synthesis required to stitch disparate systems into a cohesive, scalable environment. 
          </p>
          <p className="mb-12">
            Meredian was born from a singular vision: to obliterate infrastructural friction by creating a continuous-intelligence layer that operates seamlessly alongside human engineers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
            <div className="p-8 rounded-2xl bg-surface-container-low border border-outline-variant/10">
               <span className="material-symbols-outlined text-3xl text-primary mb-4">public</span>
               <h3 className="text-xl font-semibold tracking-tight text-on-surface mb-2">Global Scale</h3>
               <p className="text-sm text-on-surface-variant">We believe infrastructure should seamlessly scale from a local developer's machine to planetary deployments without requiring entire platform engineering teardowns.</p>
            </div>
            <div className="p-8 rounded-2xl bg-surface-container-low border border-outline-variant/10">
               <span className="material-symbols-outlined text-3xl text-primary mb-4">neurology</span>
               <h3 className="text-xl font-semibold tracking-tight text-on-surface mb-2">Neural Parity</h3>
               <p className="text-sm text-on-surface-variant">The AI agent should not be an external chatbot; it must be deeply embedded into the exact lifecycle and memory context of the application architecture.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold tracking-tight mb-6">The Collective</h2>
          <p>
             We are a collective of systems engineers, machine learning researchers, and design architects dedicated to shifting the paradigm of how software is conceived, drafted, and scaled. 
          </p>
          
          <div className="mt-16 p-8 bg-surface-container border border-outline-variant/20 rounded-2xl flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold tracking-tight text-on-surface mb-4">Join our mission</h3>
            <p className="text-on-surface-variant mb-6 max-w-md">We are actively searching for frontier engineers to help build the next generation of autonomous architecture.</p>
            <button className="px-6 py-3 bg-on-surface text-surface rounded-xl font-bold tracking-tight hover:bg-on-surface/90 transition-colors">
              View Open Positions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
