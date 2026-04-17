'use server';

import { tavilySearch } from '@/lib/ai/tavily';
import { invokeClaude } from '@/lib/ai/bedrock';

export interface SystemFlowNode {
  id: string;
  label: string;
  type: 'client' | 'api' | 'service' | 'db' | 'queue' | 'cache' | 'external' | 'agent' | 'orchestrator';
  layer?: 'user' | 'api' | 'logic' | 'agent' | 'data' | 'external';
  description?: string;
}

export interface SystemFlowEdge {
  from: string;
  to: string;
  label?: string;
}

export interface ArchitectureBlueprint {
  overview: string;
  detailedOverview: {
    architecture: string;
    logic: string;
    scalability: string;
  };
  techStack: string[];
  requirements: { id: string; label: string; checked: boolean }[];
  steps: { step: string; title: string; desc: string }[];
  persistenceNodeName: string;
  nodes: SystemFlowNode[];
  edges: SystemFlowEdge[];
}

export async function generateArchitectureBlueprint(
  title: string,
  description: string
): Promise<ArchitectureBlueprint> {
  try {
    // Research best practices for this type of project
    const searchContext = await tavilySearch(
      `modern system architecture workflow and agentic pipeline for "${title}" ${description} 2024`
    );

    const systemPrompt = `You are a Lead System Architect. Generate a production-ready "Workflow Architecture" blueprint for the given project. Output ONLY valid JSON, no markdown fences.

Schema:
{
  "overview": string (concise punchy summary),
  "detailedOverview": {
    "architecture": string (2-3 sentences on the core system design),
    "logic": string (2-3 sentences on how data flows and functions),
    "scalability": string (2-3 sentences on how it handles growth)
  },
  "techStack": string[] (6 specific modern technologies),
  "requirements": [{ "id": string, "label": string, "checked": boolean }] (6 tech requirements),
  "steps": [{ "step": "STEP 01", "title": string, "desc": string }] (4 stage roadmap),
  "persistenceNodeName": string (e.g. "MongoDB"),
  "nodes": [{ 
    "id": string, 
    "label": string, 
    "type": "client"|"api"|"service"|"db"|"queue"|"cache"|"external"|"agent"|"orchestrator",
    "layer": "user"|"api"|"logic"|"agent"|"data"|"external",
    "description": string
  }] (8-12 nodes encompassing a full system + agent pipeline),
  "edges": [{ "from": string, "to": string, "label": string }] (8-12 internal connections)
}

Rules:
- PROMPT: "Generate the workflow architecture of the project" including an agentic pipeline if applicable.
- overview sections must sound like a real CTO/Architect wrote them for a board meeting.
- The 'layer' property is CRITICAL for the stratified Workflow view.
- nodes must be specialized (e.g., 'Auth Service', 'State Engine', 'Vector DB') not generic.`;

    const userPrompt = `Project Title: ${title}
Project Description: ${description}
Research Context: ${searchContext}

Generate a complete Workflow Architecture blueprint. Use the detailedOverview to explain the specific engineering choices. Ensure nodes have proper layers for a stratified pipeline view.`;

    const blueprint = await invokeClaude(userPrompt, systemPrompt);

    return blueprint as ArchitectureBlueprint;
  } catch (error) {
    console.error('Architecture generation failed:', error);
    return getFallbackBlueprint(title);
  }
}

function getFallbackBlueprint(title: string): ArchitectureBlueprint {
  return {
    overview: `${title} utilizes a high-performance agentic architecture.`,
    detailedOverview: {
      architecture: "A distributed micro-agent system with a centralized event-driven orchestrator.",
      logic: "State is managed via a shared memory bank, with task execution handled by specialized worker nodes.",
      scalability: "Horizontal scaling is achieved through stateless API layers and partitioned data shards."
    },
    techStack: ['Next.js', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
    requirements: [
      { id: '1', label: 'Event-driven orchestration layer', checked: true },
      { id: '2', label: 'Distributed task queuing with BullMQ', checked: true },
      { id: '3', label: 'Vector storage for semantic agent memory', checked: true },
      { id: '4', label: 'Multi-agent consensus protocols', checked: false },
      { id: '5', label: 'Real-time telemetry and state tracing', checked: false },
      { id: '6', label: 'Automated CI/CD with failure rollbacks', checked: false },
    ],
    steps: [
      { step: 'STEP 01', title: 'Logic Mapping', desc: 'Define state transitions and agent roles.' },
      { step: 'STEP 02', title: 'Backend Foundation', desc: 'Settle on schemas and orchestration protocols.' },
      { step: 'STEP 03', title: 'Agent Integration', desc: 'Train or prompt models for specialized tasks.' },
      { step: 'STEP 04', title: 'Global Deployment', desc: 'Edge runtime deployment with monitoring.' },
    ],
    persistenceNodeName: 'MongoDB',
    nodes: [
      { id: 'ui', label: 'Next.js UI', type: 'client', layer: 'user' },
      { id: 'api', label: 'API Gateway', type: 'api', layer: 'api' },
      { id: 'orch', label: 'Orchestrator', type: 'service', layer: 'logic' },
      { id: 'agent-1', label: 'Research Agent', type: 'agent', layer: 'agent' },
      { id: 'agent-2', label: 'Execution Agent', type: 'agent', layer: 'agent' },
      { id: 'db', label: 'MongoDB', type: 'db', layer: 'data' },
    ],
    edges: [
      { from: 'ui', to: 'api', label: 'HTTPS' },
      { from: 'api', to: 'orch', label: 'JSON' },
      { from: 'orch', to: 'agent-1', label: 'Invoke' },
      { from: 'orch', to: 'agent-2', label: 'Task' },
      { from: 'agent-1', to: 'db', label: 'IO' },
      { from: 'agent-2', to: 'db', label: 'IO' },
    ],
  };
}

export type ArchitectProjectSummary = Pick<
  ArchitectureBlueprint,
  'overview' | 'detailedOverview'
>;

/** Called when a project is sent to System Architect (e.g. from Intelligence) — fills the overview before Initiate. */
export async function generateArchitectProjectSummary(
  title: string,
  description: string,
  techStackCsv?: string
): Promise<ArchitectProjectSummary> {
  try {
    const searchContext = await tavilySearch(
      `technical product brief and architecture context for "${title}" ${description} ${techStackCsv || ''}`
    );

    const systemPrompt = `You are a Principal Engineer writing a board-ready project brief. Output ONLY valid JSON, no markdown.

Schema:
{
  "overview": string (2 sentences, specific to this product),
  "detailedOverview": {
    "architecture": string (3-4 sentences),
    "logic": string (3-4 sentences),
    "scalability": string (2-3 sentences)
  }
}`;

    const userPrompt = `Title: ${title}
Description: ${description}
Suggested stack: ${techStackCsv || 'not specified'}
Research: ${searchContext}

Write the JSON brief.`;

    const data = await invokeClaude(userPrompt, systemPrompt, 2048);
    return data as ArchitectProjectSummary;
  } catch (e) {
    console.error('Architect summary failed:', e);
    const fb = getFallbackBlueprint(title);
    return {
      overview: fb.overview,
      detailedOverview: fb.detailedOverview,
    };
  }
}

/** Regenerate or refine only the workflow graph (nodes + edges) for the current project context. */
export async function regenerateWorkflowDiagram(input: {
  title: string;
  description: string;
  techStackCsv?: string;
  persistenceNodeName?: string;
  previousNodes?: SystemFlowNode[];
  previousEdges?: SystemFlowEdge[];
  /** Empty string = pure regenerate with varied layout */
  refineInstruction?: string;
}): Promise<{ nodes: SystemFlowNode[]; edges: SystemFlowEdge[]; persistenceNodeName?: string }> {
  const {
    title,
    description,
    techStackCsv,
    persistenceNodeName,
    previousNodes,
    previousEdges,
    refineInstruction,
  } = input;

  try {
    const searchContext = await tavilySearch(
      `software workflow nodes and integrations for "${title}" ${description}`
    );

    const systemPrompt = `You are a Lead Systems Architect. Output ONLY valid JSON, no markdown.

Schema:
{
  "persistenceNodeName": string,
  "nodes": [{ "id": string, "label": string, "type": "client"|"api"|"service"|"db"|"queue"|"cache"|"external"|"agent"|"orchestrator", "layer": "user"|"api"|"logic"|"agent"|"data"|"external", "description": string }],
  "edges": [{ "from": string, "to": string, "label": string }]
}

Rules:
- 8–14 nodes, 10–16 directed edges forming a coherent DAG-style workflow (no orphan nodes).
- IDs must be stable kebab-case (e.g. "api-gateway", "vector-store").
- Every edge "from" and "to" must match node ids.
- Include an agentic path if the product benefits from it.`;

    const prev = JSON.stringify({
      persistenceNodeName,
      nodes: previousNodes || [],
      edges: previousEdges || [],
    });

    const userPrompt = `Project Title: ${title}
Project Description: ${description}
Tech context: ${techStackCsv || 'unspecified'}
Research: ${searchContext}

Current workflow JSON (revise from this baseline):
${prev}

${refineInstruction?.trim()
  ? `User change request — apply strictly: ${refineInstruction.trim()}`
  : 'Regenerate the workflow with a fresh topology while keeping the same product intent.'}

Return revised nodes and edges only in the JSON schema.`;

    const data = await invokeClaude(userPrompt, systemPrompt, 4096);
    const out = data as {
      nodes?: SystemFlowNode[];
      edges?: SystemFlowEdge[];
      persistenceNodeName?: string;
    };
    if (!out?.nodes?.length || !out?.edges?.length) {
      const fb = getFallbackBlueprint(title);
      return {
        nodes: fb.nodes,
        edges: fb.edges,
        persistenceNodeName: fb.persistenceNodeName,
      };
    }
    return {
      nodes: out.nodes,
      edges: out.edges,
      persistenceNodeName: out.persistenceNodeName || persistenceNodeName || 'Database',
    };
  } catch (e) {
    console.error('Workflow regeneration failed:', e);
    const fb = getFallbackBlueprint(title);
    return { nodes: fb.nodes, edges: fb.edges, persistenceNodeName: fb.persistenceNodeName };
  }
}
