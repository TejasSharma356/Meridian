export default function Build() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 128px)', gap: '1rem' }}>
      <header>
        <h1 style={{ fontSize: '1.5rem' }}>Agentic IDE</h1>
        <p className="font-mono text-label" style={{ color: 'var(--on-surface-variant)' }}>WORKSPACE ACTIVE</p>
      </header>

      <div style={{ display: 'flex', gap: '1rem', flex: 1, overflow: 'hidden' }}>
        <div className="command-card ghost-border" style={{ width: '20%', overflowY: 'auto' }}>
          <h3 className="font-mono text-label" style={{ marginBottom: '1rem' }}>FILE EXPLORER</h3>
          {['src', 'components', 'App.jsx', 'index.css'].map(file => (
            <div key={file} className="font-mono" style={{ padding: '0.5rem', color: 'var(--on-surface-variant)', cursor: 'pointer' }}>
              {file}
            </div>
          ))}
        </div>

        <div className="command-card ghost-border" style={{ flex: 1, backgroundColor: 'var(--surface-container-lowest)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p className="font-mono text-label" style={{ color: 'var(--on-surface-variant)' }}>EDITOR INSTANCE LOADING...</p>
        </div>

        <div className="command-card glass-panel ghost-border" style={{ width: '25%', display: 'flex', flexDirection: 'column' }}>
          <h3 className="font-mono text-label" style={{ marginBottom: '1rem' }}>AI ASSISTANT</h3>
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <p style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)', backgroundColor: 'var(--surface-container-low)', padding: '0.75rem', borderRadius: 'var(--radius)' }}>
               I'm your agentic pair programmer. What function are we building today?
             </p>
          </div>
          <input type="text" className="input-console" placeholder="Send a command..." style={{ marginTop: '1rem' }} />
        </div>
      </div>
    </div>
  );
}
