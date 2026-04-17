export default function Apply() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 128px)', gap: '2rem' }}>
      <header>
        <h1 style={{ fontSize: '2rem' }}>Job Matching</h1>
        <p className="font-mono text-label" style={{ color: 'var(--on-surface-variant)', marginTop: '0.5rem' }}>OUTREACH GENERATION ACTIVE</p>
      </header>

      <div style={{ display: 'flex', gap: '2rem', flex: 1, overflow: 'hidden' }}>
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[1,2,3].map(i => (
             <div key={i} className="command-card ghost-border">
               <h3 style={{ fontSize: '1.25rem' }}>Senior Frontend Engineer</h3>
               <p className="font-mono text-label" style={{ color: 'var(--on-surface-variant)' }}>Vercel • San Francisco, CA</p>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', alignItems: 'center' }}>
                 <span style={{ color: 'var(--secondary)' }}>9{i}% MATCH</span>
                 <button className="btn-secondary">Analyze Match →</button>
               </div>
             </div>
          ))}
        </div>

        <div className="command-card glass-panel ghost-border" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem' }}>Match Analysis: Vercel</h2>
          <div style={{ padding: '1rem', backgroundColor: 'var(--primary-fixed)', color: 'var(--on-primary-fixed)', borderRadius: 'var(--radius)' }}>
            <strong>Why you match:</strong> You recently built 3 projects using React & Next.js, and your Edge Functions implementation aligns with their core requirements.
          </div>
          <h3 className="font-mono text-label" style={{ marginTop: '1rem' }}>GENERATED OUTREACH EMAIL</h3>
          <textarea className="input-console" rows="10" placeholder="AI generating email..." readOnly></textarea>
          <button className="btn-primary" style={{ marginTop: 'auto' }}>Copy to Clipboard</button>
        </div>
      </div>
    </div>
  );
}
