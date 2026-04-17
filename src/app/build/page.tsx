'use client';

import { useState } from 'react';
import { 
  SandpackProvider, 
  SandpackLayout, 
  SandpackCodeEditor, 
  SandpackPreview, 
  SandpackFileExplorer,
  useSandpack
} from "@codesandbox/sandpack-react";
import { cobalt2 } from "@codesandbox/sandpack-themes";
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PHASE 3: BUILD (Agentic IDE)
 */

function TerminalSync() {
  const { sandpack } = useSandpack();
  const { status } = sandpack;
  
  return (
    <div className="h-40 border-t border-white/5 bg-[#0a0a0a] p-4 font-mono text-[10px] overflow-y-auto custom-scrollbar">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] animate-pulse"></span>
        <span className="text-white/40 uppercase tracking-widest font-bold">System Logs</span>
      </div>
      <p className={(status === 'timeout' || status === 'initial') ? 'text-[#6366f1]/80' : 'text-white/60'}>
        [SANDPACK]: {status === 'initial' ? 'Initializing engine...' : 
                      status === 'idle' ? 'Awaiting instructions...' : 
                      status === 'running' ? 'Preview Active' : 
                      status === 'timeout' ? 'Build Timeout' : 
                      status === 'done' ? 'Build Complete' : 'System Ready'}
      </p>
    </div>
  );
}

const DEFAULT_FILES = {
  "/App.js": `import React from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="container">
      <h1>Meridian Workspace</h1>
      <p>Agentic execution environment active.</p>
    </div>
  );
}`,
  "/styles.css": `body {
  background: #0e0e0e;
  color: #e2e2e2;
  font-family: sans-serif;
}
.container {
  padding: 2rem;
  text-align: center;
}`
};

export default function BuildPage() {
  const [messages, setMessages] = useState([
    { role: 'agent', content: "I'm your agentic pair programmer. What function are we building today?" }
  ]);
  const [input, setInput] = useState('');

  return (
    <div className="flex flex-col h-screen pt-24 pb-4 px-4 bg-black text-white relative z-10 w-full overflow-hidden">
      {/* Top Header */}
      <header className="px-6 py-4 mb-4 border border-white/10 bg-white/[0.02] rounded-xl flex items-center justify-between shadow-lg">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Agentic IDE</h1>
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Workspace: project_meridian_alpha</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/10 transition-all">
            SYNC TO GITHUB
          </button>
          <button className="px-4 py-1.5 bg-[#6366f1] text-white rounded-lg text-xs font-bold shadow-lg shadow-[#6366f1]/20">
            DEPLOY
          </button>
        </div>
      </header>

      {/* Main IDE area */}
      <div className="flex-1 flex gap-4 overflow-hidden min-h-0">
        <div className="flex-1 flex overflow-hidden border border-white/10 rounded-xl bg-white/[0.02]">
          <SandpackProvider 
            files={DEFAULT_FILES} 
            theme={cobalt2}
            template="react"
            options={{
              recompileDelay: 300,
              classes: {
                "sp-layout": "!h-full !rounded-none !border-0",
                "sp-wrapper": "!h-full !w-full",
              }
            }}
          >
            <div className="flex-1 flex overflow-hidden w-full h-full">
              {/* Split Screen Stage */}
              <SandpackLayout className="flex-1 flex w-full h-full border-0 !bg-transparent">
                <div className="w-[200px] border-r border-white/5 h-full overflow-y-auto">
                   <SandpackFileExplorer />
                </div>
                <div className="flex-1 flex flex-col min-w-0 h-full">
                  <SandpackCodeEditor className="flex-1 h-full" showTabs={true} showLineNumbers={true} closableTabs={true} />
                  <TerminalSync />
                </div>
                <div className="flex-1 border-l border-white/5 bg-[#050505] h-full">
                  <SandpackPreview className="h-full w-full" />
                </div>
              </SandpackLayout>
            </div>
          </SandpackProvider>
        </div>

        {/* AI Sidebar - Right Side */}
        <div className="w-[350px] flex flex-col border border-white/10 rounded-xl bg-white/[0.02] backdrop-blur-3xl overflow-hidden shrink-0">
          <div className="p-6 border-b border-white/5">
             <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#6366f1]">Agent Sidebar</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            <AnimatePresence>
              {messages.map((m, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'agent' 
                      ? 'bg-white/[0.04] border border-white/10 text-white/80' 
                      : 'bg-[#6366f1]/10 border border-[#6366f1]/20 text-white'
                  }`}
                >
                  {m.content}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="p-6 border-t border-white/5">
            <div className="relative">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Instruct the agent..."
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6366f1]/50 transition-all"
              />
              <button className="absolute right-2 top-1.5 p-1.5 text-[#6366f1]">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
