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
