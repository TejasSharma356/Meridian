'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
  useSandpack,
} from '@codesandbox/sandpack-react';
import { cobalt2 } from '@codesandbox/sandpack-themes';
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
      <p className={status === 'timeout' || status === 'initial' ? 'text-[#6366f1]/80' : 'text-white/60'}>
        [SANDPACK]:{' '}
        {status === 'initial'
          ? 'Initializing engine...'
          : status === 'idle'
            ? 'Awaiting instructions...'
            : status === 'running'
              ? 'Preview Active'
              : status === 'timeout'
                ? 'Build Timeout'
                : status === 'done'
                  ? 'Build Complete'
                  : 'System Ready'}
      </p>
    </div>
  );
}

const DEFAULT_FILES = {
  '/App.js': `import React from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="container">
      <h1>Meridian Workspace</h1>
      <p>Agentic execution environment active.</p>
    </div>
  );
}`,
  '/styles.css': `body {
  background: #0e0e0e;
  color: #e2e2e2;
  font-family: sans-serif;
}
.container {
  padding: 2rem;
  text-align: center;
}`,
};

const DEFAULT_AGENT_INTRO =
  "I'm your agentic pair programmer. What function are we building today?";

function handoffMessageFromPrompt(encoded: string | null) {
  if (!encoded?.trim()) {
    return [{ role: 'agent' as const, content: DEFAULT_AGENT_INTRO }];
  }
  let text = encoded;
  try {
    text = decodeURIComponent(encoded);
  } catch {
    /* keep raw */
  }
  return [
    {
      role: 'agent' as const,
      content: [
        'Handoff from System Architect — use this as your north star for the first implementation pass:',
        '',
        text,
      ].join('\n'),
    },
  ];
}

function BuildPageInner() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId');

  const [messages, setMessages] = useState<{ role: 'agent' | 'user'; content: string }[]>(() =>
    handoffMessageFromPrompt(searchParams.get('prompt'))
  );

  const [input, setInput] = useState('');

  const workspaceLabel = projectId
    ? `Project node: ${projectId.length > 14 ? `${projectId.slice(0, 10)}…` : projectId}`
    : 'Workspace: local_session';

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-black text-white">
      <header className="px-8 py-4 border-b border-white/5 flex justify-between items-center gap-4">
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight">Agentic IDE</h1>
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest truncate">{workspaceLabel}</p>
        </div>
        <div className="flex gap-4 shrink-0">
          <button
            type="button"
            className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/10 transition-all"
          >
            SYNC TO GITHUB
          </button>
          <button
            type="button"
            className="px-4 py-1.5 bg-[#6366f1] text-white rounded-lg text-xs font-bold shadow-lg shadow-[#6366f1]/20"
          >
            DEPLOY
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <SandpackProvider
          files={DEFAULT_FILES}
          theme={cobalt2}
          template="react"
          options={{
            recompileDelay: 300,
            classes: {
              'sp-layout': 'ghost-border rounded-none border-0',
            },
          }}
        >
          <div className="flex-1 flex overflow-hidden">
            <SandpackLayout className="flex-1 border-0">
              <div className="w-[200px] border-r border-white/5 h-full overflow-y-auto">
                <SandpackFileExplorer />
              </div>
              <div className="flex-1 flex flex-col min-w-0">
                <SandpackCodeEditor
                  className="flex-1 h-full"
                  showTabs={true}
                  showLineNumbers={true}
                  closableTabs={true}
                />
                <TerminalSync />
              </div>
              <div className="flex-1 border-l border-white/5 bg-[#050505]">
                <SandpackPreview className="h-full" />
              </div>
            </SandpackLayout>
          </div>
        </SandpackProvider>

        <div className="w-[350px] border-l border-white/5 flex flex-col bg-white/[0.01] backdrop-blur-3xl">
          <div className="p-6 border-b border-white/5">
            <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#6366f1]">Agent Sidebar</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            <AnimatePresence>
              {messages.map((m, i) => (
                <motion.div
                  key={`${i}-${m.content.slice(0, 24)}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
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
              <button type="button" className="absolute right-2 top-1.5 p-1.5 text-[#6366f1]">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BuildPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[calc(100vh-80px)] items-center justify-center bg-black text-white/40 text-sm">
          Loading build workspace…
        </div>
      }
    >
      <BuildPageInner />
    </Suspense>
  );
}
