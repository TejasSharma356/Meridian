'use server';

import dbConnect from '@/lib/mongodb';
import UserProfile from '@/models/UserProfile';
import { getSession } from '@/lib/auth';
import { tavilySearch } from '@/lib/ai/tavily';
import { invokeClaude } from '@/lib/ai/bedrock';

export interface LearnLink {
  label: string;
  url: string;
}

export interface EmergingRole {
  title: string;
  description: string;
  learnLinks: LearnLink[];
}

export interface ProjectRecommendation {
  title: string;
  demand: 'HIGH' | 'MEDIUM';
  description: string;
  tags: string[];
}

export interface IntelligenceData {
  trendingSkills: {
    name: string;
    growth: string;
    percentage: number;
    color: string;
  }[];
  recommendations: ProjectRecommendation[];
  emergingRoles: EmergingRole[];
}

function normalizeIntelligence(raw: unknown, dreamRole: string): IntelligenceData {
  const d = raw as Partial<IntelligenceData>;
  const roles = Array.isArray(d.emergingRoles)
    ? d.emergingRoles.map((r) => {
        if (typeof r === 'string') {
          return {
            title: r,
            description: '',
            learnLinks: [] as LearnLink[],
          };
        }
        const obj = r as Partial<EmergingRole>;
        return {
          title: String(obj.title || 'Role'),
          description: String(obj.description || ''),
          learnLinks: Array.isArray(obj.learnLinks)
            ? obj.learnLinks
                .filter((l): l is LearnLink => Boolean(l && typeof l === 'object' && 'url' in l))
                .map((l) => ({
                  label: String((l as LearnLink).label || 'Resource'),
                  url: String((l as LearnLink).url || 'https://developer.mozilla.org'),
                }))
            : [],
        };
      })
    : [];

  const recs: ProjectRecommendation[] = Array.isArray(d.recommendations)
    ? d.recommendations.map((rec) => {
        const x = rec as Partial<ProjectRecommendation>;
        const demand: 'HIGH' | 'MEDIUM' = x.demand === 'MEDIUM' ? 'MEDIUM' : 'HIGH';
        return {
          title: String(x.title || 'Project'),
          demand,
          description: String(x.description || ''),
          tags: Array.isArray(x.tags) ? x.tags.map((t) => String(t).toUpperCase()) : [],
        };
      })
    : [];

  const skills = Array.isArray(d.trendingSkills)
    ? d.trendingSkills.map((s) => {
        const x = s as Record<string, unknown>;
        return {
          name: String(x.name || 'SKILL'),
          growth: String(x.growth || '+0%'),
          percentage: typeof x.percentage === 'number' ? Math.min(100, Math.max(1, x.percentage)) : 50,
          color: String(x.color || '#C7D2FE'),
        };
      })
    : [];

  return {
    trendingSkills: skills.length ? skills : getFallbackData(dreamRole).trendingSkills,
    recommendations: recs.length ? recs : getFallbackData(dreamRole).recommendations,
    emergingRoles: roles.length ? roles : getFallbackData(dreamRole).emergingRoles,
  };
}

async function computeIntelligenceForUser(userId: string): Promise<IntelligenceData> {
  await dbConnect();
  const profile = (await UserProfile.findOne({ userId }).lean()) as {
    dreamRole?: string;
    techStack?: string[];
  } | null;

  const dreamRole = profile?.dreamRole?.trim() || 'Software Engineer';
  const userStack = profile?.techStack?.join(', ') || 'General development';

  const [skillsContext, rolesContext, projectsContext] = await Promise.all([
    tavilySearch(
      `April 2026 real-time tech hiring trends in-demand skills job postings recruiter demand salary "${dreamRole}" developer stack GitHub ecosystem momentum`
    ),
    tavilySearch(
      `emerging job titles career paths adjacent roles "${dreamRole}" tech industry 2026 hiring`
    ),
    tavilySearch(
      `portfolio project ideas capstone builds interview portfolio "${dreamRole}" 2026 high impact`
    ),
  ]);

  const systemPrompt = `You are a senior market intelligence analyst for tech careers. Given web research and the user's target role from onboarding, produce a JSON intelligence report. Output ONLY valid JSON, no markdown fences, no extra keys.

Schema:
{
  "trendingSkills": [
    { "name": string (ALL CAPS, max 32 chars), "growth": string (e.g. "+42%"), "percentage": number (1-100), "color": string (vivid hex for dark bg) }
  ],
  "recommendations": [
    { "title": string, "demand": "HIGH" | "MEDIUM", "description": string (1-2 sentences, concrete), "tags": string[] (2-4 uppercase tech names) }
  ],
  "emergingRoles": [
    {
      "title": string,
      "description": string (2-4 sentences explaining what the role does day-to-day and why it matters for someone pursuing the user's target career),
      "learnLinks": [ { "label": string, "url": string (https) } ]
    }
  ]
}

Rules:
- trendingSkills: exactly 6 items, ordered by percentage descending. Each skill MUST be justified by the "Skills / market research" text above — reflect what hiring data and news in that research actually emphasize (job titles, tools named in postings, stack demand). Do not output generic 2023 placeholder skills if the research specifies different technologies. If research is thin, infer carefully from the user's stack + role but still sound like current market language.
- recommendations: exactly 12 distinct, portfolio-worthy project ideas tailored to their target career "${dreamRole}" — not generic tutorials
- emergingRoles: exactly 6 items; each must be a realistic next-step or adjacent role for someone whose stated objective is "${dreamRole}". Include 3-4 learnLinks per role pointing to reputable free resources (courses, docs, or official guides). URLs must be https.
- Colors must be vivid but readable on #0a0a0f background
- Personalize everything using: Target role: ${dreamRole}. Current stack: ${userStack}.`;

  const userPrompt = `Skills / market research:\n${skillsContext}\n\nEmerging roles research:\n${rolesContext}\n\nProject ideas research:\n${projectsContext}\n\nUser target role (from onboarding): ${dreamRole}\nUser tech stack: ${userStack}\n\nGenerate the JSON report.`;

  const result = await invokeClaude(userPrompt, systemPrompt, 8192);

  if (typeof result === 'string') {
    console.error('Intelligence: model returned non-JSON text');
    return getFallbackData(dreamRole);
  }

  return normalizeIntelligence(result, dreamRole);
}

export async function getIntelligenceData(): Promise<IntelligenceData> {
  const session = await getSession();
  if (!session || !session.userId) {
    throw new Error('Unauthorized');
  }
  try {
    return await computeIntelligenceForUser(session.userId);
  } catch (error) {
    console.error('Failed to fetch intelligence data:', error);
    return getFallbackData('Software Engineer');
  }
}

/** Full recompute (Tavily + Bedrock). Use only when the user explicitly refreshes. */
export async function refreshIntelligenceData(): Promise<IntelligenceData> {
  const session = await getSession();
  if (!session || !session.userId) {
    throw new Error('Unauthorized');
  }
  try {
    return await computeIntelligenceForUser(session.userId);
  } catch (error) {
    console.error('Failed to refresh intelligence data:', error);
    return getFallbackData('Software Engineer');
  }
}

function getFallbackData(dreamRole: string): IntelligenceData {
  const roleNote = dreamRole ? ` (${dreamRole})` : '';
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
      {
        title: `AI Career Copilot${roleNote}`,
        demand: 'HIGH',
        description:
          'RAG assistant that ingests job descriptions and your resume to generate tailored study plans and mock interview questions.',
        tags: ['NEXT.JS', 'OPENAI', 'PINECONE'],
      },
      {
        title: 'Skills Gap Dashboard',
        demand: 'HIGH',
        description:
          'Visualize missing skills vs. target role requirements using public job posting data and your GitHub activity.',
        tags: ['PYTHON', 'FASTAPI', 'REACT'],
      },
      {
        title: 'Realtime Code Reviewer',
        demand: 'MEDIUM',
        description:
          'IDE extension that streams AI code review suggestions inline using Claude or similar.',
        tags: ['TYPESCRIPT', 'ANTHROPIC', 'VSCODE'],
      },
      {
        title: 'Multi-tenant SaaS Starter',
        demand: 'HIGH',
        description:
          'Production-ready Next.js boilerplate with Stripe billing, team workspaces, and RBAC.',
        tags: ['NEXT.JS', 'STRIPE', 'PRISMA'],
      },
      {
        title: 'OSS Good First Issue Matcher',
        demand: 'MEDIUM',
        description:
          'Matches developers to open issues by skill embeddings and preferred stack.',
        tags: ['PYTHON', 'WEAVIATE', 'GITHUB API'],
      },
      {
        title: 'Contract Test Harness',
        demand: 'MEDIUM',
        description:
          'Consumer-driven contract testing toolkit for microservices with CI reports.',
        tags: ['NODE.JS', 'PACT', 'DOCKER'],
      },
      {
        title: 'Latency SLO Monitor',
        demand: 'MEDIUM',
        description:
          'Small service that tracks p95 latency vs. SLO with Slack alerts.',
        tags: ['GO', 'PROMETHEUS', 'GRAFANA'],
      },
      {
        title: 'Feature Flag Admin',
        demand: 'MEDIUM',
        description:
          'Internal UI to manage flags, rollouts, and audience rules with audit log.',
        tags: ['REACT', 'POSTGRES', 'REDIS'],
      },
      {
        title: 'API Design Linter',
        demand: 'MEDIUM',
        description:
          'CLI that scores OpenAPI specs for consistency, security headers, and breaking changes.',
        tags: ['TYPESCRIPT', 'OPENAPI', 'AST'],
      },
      {
        title: 'Data Pipeline Debugger',
        demand: 'MEDIUM',
        description:
          'Trace UI for Airflow or Dagster runs with lineage and failure replay.',
        tags: ['PYTHON', 'SQL', 'REACT'],
      },
      {
        title: 'On-call Runbook Bot',
        demand: 'HIGH',
        description:
          'Slack bot that surfaces runbooks and metrics links when alerts fire.',
        tags: ['NODE.JS', 'SLACK API', 'KUBERNETES'],
      },
      {
        title: 'Portfolio Story Generator',
        demand: 'HIGH',
        description:
          'Turns bullet projects into STAR-format case studies with metrics placeholders.',
        tags: ['NEXT.JS', 'LLM', 'MDX'],
      },
    ],
    emergingRoles: [
      {
        title: 'AI Engineer',
        description:
          'Builds and ships machine learning features in production: data pipelines, model evaluation, and integration with product code. For your path, this role bridges software engineering with ML lifecycle ownership.',
        learnLinks: [
          { label: 'Google ML crash course', url: 'https://developers.google.com/machine-learning/crash-course' },
          { label: 'Fast.ai', url: 'https://www.fast.ai' },
          { label: 'Hugging Face NLP course', url: 'https://huggingface.co/learn' },
        ],
      },
      {
        title: 'Platform Engineer',
        description:
          'Designs internal developer platforms, CI/CD, and golden paths so teams ship faster with less toil.',
        learnLinks: [
          { label: 'CNCF landscape', url: 'https://landscape.cncf.io' },
          { label: 'Kubernetes docs', url: 'https://kubernetes.io/docs/home/' },
        ],
      },
      {
        title: 'Developer Advocate',
        description:
          'Connects product and community through talks, content, and sample apps—strong communication plus deep technical credibility.',
        learnLinks: [
          { label: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
          { label: 'Write the Docs', url: 'https://www.writethedocs.org' },
        ],
      },
      {
        title: 'Site Reliability Engineer',
        description:
          'Owns reliability, incident response, and error budgets; balances feature velocity with system health.',
        learnLinks: [
          { label: 'Google SRE book', url: 'https://sre.google/sre-book/table-of-contents/' },
          { label: 'Prometheus basics', url: 'https://prometheus.io/docs/introduction/overview/' },
        ],
      },
      {
        title: 'DevEx Engineer',
        description:
          'Improves developer experience: tooling, docs, local dev environments, and workflow automation.',
        learnLinks: [
          { label: 'Backstage', url: 'https://backstage.io' },
          { label: 'DX research (GitHub)', url: 'https://github.blog/developer-skills' },
        ],
      },
      {
        title: 'LLM Ops Specialist',
        description:
          'Operates LLM systems in production: evals, guardrails, cost/latency tradeoffs, and safe rollout.',
        learnLinks: [
          { label: 'OpenAI API docs', url: 'https://platform.openai.com/docs' },
          { label: 'Anthropic docs', url: 'https://docs.anthropic.com' },
        ],
      },
    ],
  };
}
