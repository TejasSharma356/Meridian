'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Database, Globe, Server, Zap, Layers, Cloud, GitBranch } from 'lucide-react';

type NodeType = 'client' | 'api' | 'service' | 'db' | 'queue' | 'cache' | 'external';

interface SystemNode {
  id: string;
  label: string;
  type: NodeType;
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
}

const NODE_STYLE: Record<NodeType, { icon: React.ReactNode; color: string; glow: string }> = {
  client: { icon: <Globe className="h-4 w-4" />, color: '#60A5FA', glow: 'rgba(96,165,250,0.2)' },
  api: { icon: <GitBranch className="h-4 w-4" />, color: '#818CF8', glow: 'rgba(129,140,248,0.2)' },
  service: { icon: <Server className="h-4 w-4" />, color: '#6366f1', glow: 'rgba(99,102,241,0.25)' },
  db: { icon: <Database className="h-4 w-4" />, color: '#34D399', glow: 'rgba(52,211,153,0.2)' },
  queue: { icon: <Layers className="h-4 w-4" />, color: '#F472B6', glow: 'rgba(244,114,182,0.2)' },
  cache: { icon: <Zap className="h-4 w-4" />, color: '#FCD34D', glow: 'rgba(252,211,77,0.2)' },
  external: { icon: <Cloud className="h-4 w-4" />, color: '#94A3B8', glow: 'rgba(148,163,184,0.15)' },
};

// Positions for up to 7 nodes in a layered left-to-right layout
const NODE_POSITIONS = [
  { x: 5, y: 42 },
  { x: 25, y: 20 },
  { x: 25, y: 64 },
  { x: 50, y: 42 },
  { x: 70, y: 20 },
  { x: 70, y: 64 },
  { x: 88, y: 42 },
];

const DEFAULT_NODES: SystemNode[] = [
  { id: 'client', label: 'Web Client', type: 'client' },
  { id: 'api', label: 'API Gateway', type: 'api' },
  { id: 'service', label: 'Core Service', type: 'service' },
  { id: 'db', label: 'PostgreSQL', type: 'db' },
  { id: 'cache', label: 'Redis', type: 'cache' },
];
const DEFAULT_EDGES: SystemEdge[] = [
  { from: 'client', to: 'api', label: 'HTTPS' },
  { from: 'api', to: 'service', label: 'gRPC' },
  { from: 'service', to: 'db', label: 'SQL' },
  { from: 'service', to: 'cache', label: 'GET/SET' },
];

export default function SystemFlowViz({ persistenceNodeName, nodes, edges }: SystemFlowVizProps) {
  const displayNodes = (nodes && nodes.length > 0 ? nodes : DEFAULT_NODES).slice(0, 7);
  const displayEdges = edges && edges.length > 0 ? edges : DEFAULT_EDGES;

  // Map node id → position
  const posMap: Record<string, { x: number; y: number }> = {};
  displayNodes.forEach((n, i) => {
    posMap[n.id] = NODE_POSITIONS[i] || { x: 50, y: 50 };
  });

  return (
    <Card className="bg-[#0f0f14]/80 border-white/[0.05] backdrop-blur-xl mb-12">
      <CardContent className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-bold text-white tracking-tight">System Flow Architecture</h3>
          <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
            {persistenceNodeName ? `${persistenceNodeName} · AI Generated` : 'V1.0 Generated'}
          </span>
        </div>

        <div
          className="relative w-full rounded-3xl bg-[#050507] border border-white/[0.05] overflow-hidden"
          style={{ height: '320px' }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/5 via-transparent to-[#d856b8]/5" />
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />

          {/* SVG canvas for edges */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill="rgba(255,255,255,0.2)" />
              </marker>
            </defs>
            {displayEdges.map((edge, idx) => {
              const from = posMap[edge.from];
              const to = posMap[edge.to];
              if (!from || !to) return null;
              const midX = (from.x + to.x) / 2;
              const midY = (from.y + to.y) / 2 - 4;
              return (
                <g key={idx}>
                  <path
                    d={`M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="0.4"
                    fill="none"
                    strokeDasharray="2 1.5"
                    markerEnd="url(#arrow)"
                  />
                  {edge.label && (
                    <text
                      x={midX}
                      y={midY - 1.5}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.2)"
                      fontSize="2.2"
                      fontFamily="monospace"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Node cards */}
          {displayNodes.map((node, i) => {
            const pos = NODE_POSITIONS[i] || { x: 50, y: 50 };
            const style = NODE_STYLE[node.type] || NODE_STYLE.service;
            return (
              <div
                key={node.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                {/* Glow */}
                <div
                  className="absolute inset-0 rounded-xl blur-xl opacity-50 group-hover:opacity-90 transition-opacity"
                  style={{ background: style.glow }}
                />
                {/* Card */}
                <div
                  className="relative z-10 flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#0d0d12] border transition-all"
                  style={{
                    borderColor: `${style.color}30`,
                    boxShadow: `0 0 16px ${style.glow}`,
                    minWidth: '72px',
                  }}
                >
                  <div className="p-1.5 rounded-lg" style={{ background: `${style.color}15` }}>
                    <span style={{ color: style.color }}>{style.icon}</span>
                  </div>
                  <span
                    className="text-[8px] font-black tracking-wider text-center uppercase leading-tight whitespace-nowrap"
                    style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '72px' }}
                  >
                    {node.label}
                  </span>
                  <span className="text-[7px] uppercase tracking-widest" style={{ color: `${style.color}80` }}>
                    {node.type}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4">
          {Object.entries(NODE_STYLE).map(([type, s]) => (
            <div key={type} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
              <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>
                {type}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
