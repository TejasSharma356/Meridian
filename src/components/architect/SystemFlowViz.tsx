'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Database, 
  Globe, 
  Server, 
  Zap, 
  Layers, 
  Cloud, 
  GitBranch, 
  Cpu, 
  ShieldAlert,
  Activity,
  Box,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type NodeType = 'client' | 'api' | 'service' | 'db' | 'queue' | 'cache' | 'external' | 'agent' | 'orchestrator';
type LayerType = 'user' | 'api' | 'logic' | 'agent' | 'data' | 'external';

interface SystemNode {
  id: string;
  label: string;
  type: NodeType;
  layer?: LayerType;
  description?: string;
}

interface SystemEdge {
  from: string;
  to: string;
  label?: string;
}

interface SystemFlowVizProps {
  persistenceNodeName?: string;
  nodes?: SystemNode[];
  edges?: SystemEdge[];
  /** Toolbar / refine controls rendered between the tab bar and the diagram canvas */
  aboveCanvas?: React.ReactNode;
  /** Responsive diagram area; diagram scales inside this box */
  canvasClassName?: string;
}

const NODE_STYLE: Record<NodeType, { icon: React.ReactNode; color: string; glow: string }> = {
  client: { icon: <Globe className="h-4 w-4" />, color: '#60A5FA', glow: 'rgba(96,165,250,0.3)' },
  api: { icon: <GitBranch className="h-4 w-4" />, color: '#818CF8', glow: 'rgba(129,140,248,0.3)' },
  service: { icon: <Server className="h-4 w-4" />, color: '#6366f1', glow: 'rgba(99,102,241,0.35)' },
  db: { icon: <Database className="h-4 w-4" />, color: '#34D399', glow: 'rgba(52,211,153,0.3)' },
  queue: { icon: <Layers className="h-4 w-4" />, color: '#F472B6', glow: 'rgba(244,114,182,0.3)' },
  cache: { icon: <Zap className="h-4 w-4" />, color: '#FCD34D', glow: 'rgba(252,211,77,0.3)' },
  external: { icon: <Cloud className="h-4 w-4" />, color: '#94A3B8', glow: 'rgba(148,163,184,0.2)' },
  agent: { icon: <Cpu className="h-4 w-4" />, color: '#fb923c', glow: 'rgba(251,146,60,0.3)' },
  orchestrator: { icon: <Activity className="h-4 w-4" />, color: '#A855F7', glow: 'rgba(168,85,247,0.3)' },
};

const VIEW_TABS = [
  { id: 'full', label: 'Full System', icon: <Box size={14} /> },
  { id: 'pipeline', label: 'Agent Pipeline', icon: <Layers size={14} /> },
  { id: 'data', label: 'Data Flow', icon: <Share2 size={14} /> },
  { id: 'state', label: 'State Machine', icon: <Activity size={14} /> },
];

export default function SystemFlowViz({
  persistenceNodeName,
  nodes,
  edges,
  aboveCanvas,
  canvasClassName = 'min-h-[min(72vh,44rem)] h-[min(72vh,44rem)] w-full',
}: SystemFlowVizProps) {
  const [activeTab, setActiveTab] = useState('full');

  const displayNodes = useMemo(() => {
    return (nodes && nodes.length > 0 ? nodes : []).slice(0, 15);
  }, [nodes]);

  const displayEdges = useMemo(() => {
    return edges && edges.length > 0 ? edges : [];
  }, [edges]);

  // ── Layout Calculations ──

  const nodePositions = useMemo(() => {
    const pos: Record<string, { x: number; y: number }> = {};
    if (!displayNodes.length) return pos;

    if (activeTab === 'pipeline') {
      // Stratified layers: User -> API -> Logic -> Agent -> Data
      const layerOrder: LayerType[] = ['user', 'api', 'logic', 'agent', 'data', 'external'];
      const layerNodes = layerOrder.map(l => displayNodes.filter(n => (n.layer || 'logic') === l));
      
      const nonEmptyLayers = layerNodes.filter(ln => ln.length > 0);
      nonEmptyLayers.forEach((ln, layerIdx) => {
        ln.forEach((node, nodeIdx) => {
          const x = 15 + (layerIdx * (70 / (nonEmptyLayers.length - 1 || 1)));
          const y = 20 + (nodeIdx * (60 / (ln.length || 1))) + (30 / ln.length);
          pos[node.id] = { x, y };
        });
      });
    } else if (activeTab === 'data') {
      // Hub and Spoke around the most central node (database or service)
      const centerNode = displayNodes.find(n => n.type === 'db' || n.type === 'orchestrator') || displayNodes[0];
      pos[centerNode.id] = { x: 50, y: 50 };
      
      const others = displayNodes.filter(n => n.id !== centerNode.id);
      others.forEach((node, i) => {
        const angle = (i / others.length) * 2 * Math.PI;
        const radius = 35;
        pos[node.id] = {
          x: 50 + radius * Math.cos(angle),
          y: 50 + radius * Math.sin(angle)
        };
      });
    } else {
      // Standard Nodal Layout (N-shaped or custom grid)
      displayNodes.forEach((node, i) => {
        const cols = Math.ceil(Math.sqrt(displayNodes.length));
        const row = Math.floor(i / cols);
        const col = i % cols;
        pos[node.id] = {
          x: 10 + (col * (80 / (cols - 1 || 1))),
          y: 15 + (row * (70 / (Math.ceil(displayNodes.length / cols) || 1)))
        };
      });
    }
    return pos;
  }, [activeTab, displayNodes]);

  const renderVisualizer = () => {
    if (!displayNodes.length) {
      return (
        <div className="h-full flex items-center justify-center text-white/20 font-black uppercase tracking-widest animate-pulse">
           Synthesis in progress...
        </div>
      );
    }

    return (
      <div className="relative w-full h-full">
        {/* SVG Connections */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="rgba(255,255,255,0.15)" />
            </marker>
          </defs>
          {displayEdges.map((edge, idx) => {
            const from = nodePositions[edge.from];
            const to = nodePositions[edge.to];
            if (!from || !to) return null;

            return (
              <motion.g 
                key={`${edge.from}-${edge.to}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
              >
                <path
                  d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="0.3"
                  fill="none"
                  strokeDasharray="2 2"
                  markerEnd="url(#arrow)"
                />
                {edge.label && (
                  <text
                    x={(from.x + to.x) / 2}
                    y={(from.y + to.y) / 2 - 2}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.15)"
                    fontSize="1.8"
                    fontFamily="monospace"
                    className="font-bold tracking-widest uppercase"
                  >
                    {edge.label}
                  </text>
                )}
              </motion.g>
            );
          })}
        </svg>

        {/* Nodes */}
        <AnimatePresence mode="popLayout">
          {displayNodes.map((node) => {
            const p = nodePositions[node.id];
            if (!p) return null;
            const style = NODE_STYLE[node.type] || NODE_STYLE.service;

            return (
              <motion.div
                key={node.id}
                layoutId={node.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, left: `${p.x}%`, top: `${p.y}%` }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-help z-10"
              >
                {/* Glow */}
                <div
                  className="absolute inset-0 rounded-xl blur-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: style.glow }}
                />
                
                {/* Card */}
                <div
                  className="relative z-10 flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#0d0d12]/90 border backdrop-blur-md transition-all duration-300 group-hover:scale-110"
                  style={{
                    borderColor: `${style.color}40`,
                    boxShadow: `0 0 20px -5px ${style.glow}`,
                    minWidth: '85px',
                  }}
                >
                  <div className="p-1.5 rounded-lg" style={{ background: `${style.color}15` }}>
                    <span style={{ color: style.color }}>{style.icon}</span>
                  </div>
                  <span className="text-[9px] font-black tracking-wider text-center uppercase leading-tight text-white/90">
                    {node.label}
                  </span>
                  <div className="flex items-center gap-1 opacity-60">
                     <span className="w-1 h-1 rounded-full" style={{ background: style.color }} />
                     <span className="text-[7px] uppercase tracking-tighter" style={{ color: 'white' }}>
                        {node.type}
                     </span>
                  </div>
                </div>

                {/* Tooltip on hover */}
                {node.description && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 w-48 bg-zinc-900 border border-white/10 p-3 rounded-xl shadow-2xl">
                    <p className="text-[10px] text-zinc-400 leading-relaxed italic">{node.description}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <Card className="bg-[#0f0f14]/80 border-white/[0.05] backdrop-blur-xl mb-12 shadow-2xl overflow-hidden">
      <CardContent className="p-0">
        {/* Custom Tab Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center px-8 py-6 border-b border-white/[0.03] gap-6">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-white tracking-tighter uppercase italic">Workflow Architecture</h3>
            <div className="px-2 py-0.5 rounded bg-[#6366f1]/20 border border-[#6366f1]/30 text-[8px] font-black text-[#6366f1] uppercase tracking-widest">
              AI Powered
            </div>
          </div>
          
          <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/[0.05] backdrop-blur-md">
            {VIEW_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab.id 
                  ? "bg-white/10 text-white shadow-lg border border-white/10" 
                  : "text-white/30 hover:text-white/60"
                }`}
              >
                {tab.icon}
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {aboveCanvas ? (
          <div className="px-6 sm:px-8 py-4 border-b border-white/[0.04] bg-black/25">{aboveCanvas}</div>
        ) : null}

        {/* Visualizer Canvas */}
        <div
          className={`relative w-full bg-[#050507] overflow-hidden ${canvasClassName}`}
        >
          {/* Background FX */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/10 via-transparent to-[#d856b8]/10" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

          <div className="p-8 h-full">
            {renderVisualizer()}
          </div>
        </div>

        {/* Detailed Legend & Status */}
        <div className="px-8 py-6 bg-black/20 flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-wrap gap-4">
            {Object.entries(NODE_STYLE).slice(0, 6).map(([type, s]) => (
              <div key={type} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
                <span className="text-[9px] font-black uppercase tracking-[0.15em] text-white/30">
                  {type}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 text-[10px] font-bold text-white/20 uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><Activity size={12} className="text-[#34D399]" /> Optimal Health</span>
            <span className="flex items-center gap-1.5"><ShieldAlert size={12} className="text-[#818CF8]" /> Secure Uplink</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
