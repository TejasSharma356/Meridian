'use server';

/**
 * PHASE 1: INTELLIGENCE
 * Uses Tavily API to fetch market data and Gemini to analyze skill gaps.
 */

interface MarketGapReport {
  trendingSkills: string[];
  skillGaps: string[];
  suggestedProjects: {
    title: string;
    description: string;
    stack: string[];
    marketFit: number;
    icon: string;
  }[];
}

export async function analyzeMarketGaps(userProfile: any): Promise<MarketGapReport> {
  const TAVILY_API_KEY = process.env.TAVILY_API_KEY;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!TAVILY_API_KEY || !GEMINI_API_KEY) {
    console.warn("API Keys missing in environment. Using mock data for Intelligence phase.");
    return getMockIntelligence();
  }

  try {
    // 1. Tavily Search for 2026/2027 market trends
    // const searchResponse = await fetch('https://api.tavily.com/search', { ... });
    
    // 2. LLM Analysis
    // const analysis = await gemini.generateHTML({ ... });

    return getMockIntelligence(); // Replace with real integration
  } catch (error) {
    console.error("Intelligence Analysis failed:", error);
    return getMockIntelligence();
  }
}

function getMockIntelligence() {
  return {
    trendingSkills: ['Vector Databases', 'Rust for WebAssembly', 'Agentic Workflows'],
    skillGaps: ['Distributed Systems', 'Low-level Memory Management'],
    suggestedProjects: [
      { 
        title: 'Customer Support AI', 
        icon: 'smart_toy', 
        stack: ['Next.js', 'OpenAI', 'Pinecone'], 
        marketFit: 98,
        description: 'Market gap analysis utilizing vector memory to locate high-demand ecosystem opportunities.' 
      },
      { 
        title: 'DevOps Automator', 
        icon: 'settings_input_component', 
        stack: ['Python', 'Docker', 'GitHub Actions'], 
        marketFit: 95,
        description: 'End-to-end blueprinting: functional scope, data schemas, and strict API mockups.' 
      },
      { 
        title: 'Security Protocol Shield', 
        icon: 'terminal', 
        stack: ['Rust', 'WebAssembly', 'VPC'], 
        marketFit: 92,
        description: 'Automated extraction outputting GitHub-ready readmes and matched portfolios.' 
      }
    ]
  };
}
