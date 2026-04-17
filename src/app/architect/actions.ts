'use server';

import { tavilySearch } from '@/lib/ai/tavily';
import { invokeClaude } from '@/lib/ai/bedrock';

export interface SystemFlowNode {
  id: string;
  label: string;
  type: 'client' | 'api' | 'service' | 'db' | 'queue' | 'cache' | 'external';
}

export interface SystemFlowEdge {
  from: string;
  to: string;
  label?: string;
}

export interface ArchitectureBlueprint {
  overview: string;
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
      `system architecture best practices and tech stack for "${title}" ${description} 2024`
    );

    const systemPrompt = `You are a Lead System Architect. Generate a production-ready technical blueprint for the given project. Output ONLY valid JSON, no markdown fences.
Schema:
{
  "overview": string (clear 2-sentence technical architecture summary, specific to this project),
  "techStack": string[] (exactly 6 specific technology names appropriate for this project),
  "requirements": [{ "id": string, "label": string, "checked": boolean }] (exactly 6 specific technical requirements, first 3 checked:true),
  "steps": [{ "step": "STEP 01", "title": string, "desc": string }] (exactly 4 deployment stages),
  "persistenceNodeName": string (primary database/storage, e.g. "PostgreSQL", "MongoDB", "Redis", "DynamoDB"),
  "nodes": [{ "id": string, "label": string, "type": "client"|"api"|"service"|"db"|"queue"|"cache"|"external" }] (5-7 system nodes representing the architecture),
  "edges": [{ "from": string, "to": string, "label": string }] (connections between node ids, 4-8 edges)
}
Rules:
- All content must be specific to the project title and description
- overview must sound like a real CTO wrote it
- techStack should reflect actual best-in-class tools for this exact use case
- requirements must be specific engineering tasks, not generic milestones
- nodes and edges must represent a real-world system diagram for this project
- Use industry-standard node types`;

    const userPrompt = `Project Title: ${title}
Project Description: ${description}
Research Context: ${searchContext}

Generate a complete architectural blueprint including system flow nodes and edges.`;

    const blueprint = await invokeClaude(userPrompt, systemPrompt);

    return blueprint as ArchitectureBlueprint;
  } catch (error) {
    console.error('Architecture generation failed:', error);
    return getFallbackBlueprint(title);
  }
}

function getFallbackBlueprint(title: string): ArchitectureBlueprint {
  return {
    overview: `${title} follows a modern microservices architecture with a React frontend communicating through a RESTful API gateway. Services are containerized using Docker and deployed on Kubernetes for horizontal scalability.`,
    techStack: ['Next.js', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
    requirements: [
      { id: '1', label: 'JWT authentication with refresh token rotation', checked: true },
      { id: '2', label: 'REST API with OpenAPI 3.0 spec', checked: true },
      { id: '3', label: 'PostgreSQL with connection pooling (PgBouncer)', checked: true },
      { id: '4', label: 'Redis caching layer for hot data', checked: false },
      { id: '5', label: 'CI/CD pipeline via GitHub Actions', checked: false },
      { id: '6', label: 'Multi-region deployment with health checks', checked: false },
    ],
    steps: [
      { step: 'STEP 01', title: 'Research & Spec', desc: 'Finalize API contracts, data schemas, and define core user journeys with wireframes.' },
      { step: 'STEP 02', title: 'Infra Setup', desc: 'Provision cloud resources, initialize Terraform configs and seed the database schema.' },
      { step: 'STEP 03', title: 'MVP Build', desc: 'Implement core features with API integration, auth flow, and primary UI screens.' },
      { step: 'STEP 04', title: 'Scale & Ship', desc: 'Add CI/CD, load testing, monitoring dashboards, and deploy to production.' },
    ],
    persistenceNodeName: 'PostgreSQL',
    nodes: [
      { id: 'client', label: 'Next.js Client', type: 'client' },
      { id: 'api', label: 'API Gateway', type: 'api' },
      { id: 'service', label: 'Core Service', type: 'service' },
      { id: 'db', label: 'PostgreSQL', type: 'db' },
      { id: 'cache', label: 'Redis Cache', type: 'cache' },
    ],
    edges: [
      { from: 'client', to: 'api', label: 'HTTPS' },
      { from: 'api', to: 'service', label: 'RPC' },
      { from: 'service', to: 'db', label: 'SQL' },
      { from: 'service', to: 'cache', label: 'GET/SET' },
    ],
  };
}
