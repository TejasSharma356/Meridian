'use server';

import dbConnect from '@/lib/mongodb';
import UserProfile from '@/models/UserProfile';
import { getSession } from '@/lib/auth';
import { tavilySearch } from '@/lib/ai/tavily';
import { invokeClaude } from '@/lib/ai/bedrock';

export interface IntelligenceData {
  trendingSkills: {
    name: string;
    growth: string;
    percentage: number;
    color: string;
  }[];
  recommendations: {
    title: string;
    demand: 'HIGH' | 'MEDIUM';
    description: string;
    tags: string[];
  }[];
  emergingRoles: string[];
}

export async function getIntelligenceData(category: string): Promise<IntelligenceData> {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      throw new Error("Unauthorized");
    }

    await dbConnect();
    const profile = await UserProfile.findOne({ userId: session.userId }).lean() as any;
    const userStack = profile?.techStack?.join(', ') || 'General development';

    // 1. Parallel Tavily research for richer, diverse context
    const [skillsContext, projectsContext] = await Promise.all([
      tavilySearch(`top in-demand tech skills for ${category} developers 2024 2025 salary job market`),
      tavilySearch(`best project ideas to build for ${category} developer portfolio 2024 high ROI open source saas`),
    ]);

    // 2. Synthesize with Claude — strict prompt for consistent JSON output
    const systemPrompt = `You are a senior market intelligence analyst for tech careers. Given web research data and a user's existing tech stack, produce a JSON intelligence report. Output ONLY valid JSON, no markdown fences, no extra keys.
Schema:
{
  "trendingSkills": [
    { "name": string (ALL CAPS, max 30 chars), "growth": string (e.g. "+42%"), "percentage": number (1-100), "color": string (vivid hex for dark bg) }
  ],
  "recommendations": [
    { "title": string, "demand": "HIGH" | "MEDIUM", "description": string (1 compelling sentence), "tags": string[] (2-4 uppercase tech names) }
  ],
  "emergingRoles": string[]
}
Rules:
- trendingSkills: exactly 6 items, ordered by percentage desc
- recommendations: exactly 6 items — diverse, concrete, market-validated project ideas
- emergingRoles: exactly 6 items
- Colors must be vivid but readable on #0a0a0f background (avoid very dark colors)
- Personalize recommendations around the user's existing stack when possible
- Be highly specific; no generic suggestions`;

    const userPrompt = `Skills Research: ${skillsContext}

Project Ideas Research: ${projectsContext}

User's Current Tech Stack: ${userStack}
Selected Category: ${category}

Generate 6 trending skills, 6 project recommendations, and 6 emerging roles for a ${category} developer with the above stack. Make each project recommendation unique, specific, and genuinely market-validated.`;

    const result = await invokeClaude(userPrompt, systemPrompt);

    return result as IntelligenceData;
  } catch (error) {
    console.error("Failed to fetch intelligence data:", error);
    return getFallbackData(category);
  }
}

function getFallbackData(category: string): IntelligenceData {
  return {
    trendingSkills: [
      { name: 'LLM ORCHESTRATION', growth: '+42%', percentage: 85, color: '#C7D2FE' },
      { name: 'RUST (WASM)', growth: '+34%', percentage: 72, color: '#4ADE80' },
      { name: 'VECTOR DATABASES', growth: '+29%', percentage: 65, color: '#818CF8' },
      { name: 'TYPESCRIPT 5.X', growth: '+22%', percentage: 55, color: '#FCD34D' },
      { name: 'KUBERNETES', growth: '+18%', percentage: 45, color: '#F472B6' },
      { name: 'EDGE FUNCTIONS', growth: '+15%', percentage: 38, color: '#34D399' },
    ],
    recommendations: [
      { title: 'AI Legal Assistant', demand: 'HIGH', description: 'RAG-based contract analyzer that detects risk clauses using vector similarity search over legal documents.', tags: ['NEXT.JS', 'OPENAI', 'PINECONE'] },
      { title: 'Dev Portfolio Analyzer', demand: 'HIGH', description: 'Scrapes GitHub and LinkedIn to generate a career gap analysis and personalized roadmap using LLMs.', tags: ['PYTHON', 'LANGCHAIN', 'REACT'] },
      { title: 'Realtime Code Reviewer', demand: 'MEDIUM', description: 'VS Code extension that streams AI code review suggestions inline as you type using Claude.', tags: ['TYPESCRIPT', 'ANTHROPIC', 'VSCODE'] },
      { title: 'Multi-tenant SaaS Starter', demand: 'HIGH', description: 'Production-ready Next.js boilerplate with Stripe billing, team workspaces, and RBAC out-of-the-box.', tags: ['NEXT.JS', 'STRIPE', 'PRISMA'] },
      { title: 'Edge Caching CDN Dashboard', demand: 'MEDIUM', description: 'Analytics platform that visualizes cache hit rates and latency across Cloudflare edge nodes in real time.', tags: ['REACT', 'CLOUDFLARE', 'D3.JS'] },
      { title: 'OSS Contribution Finder', demand: 'MEDIUM', description: 'Matches developers to open source issues based on their skill signatures and preferred languages using embeddings.', tags: ['PYTHON', 'FASTAPI', 'WEAVIATE'] },
    ],
    emergingRoles: ['AI Engineer', 'Platform Engineer', 'Developer Advocate', 'Site Reliability Engineer', 'DevEx Engineer', 'LLM Ops Specialist'],
  };
}
