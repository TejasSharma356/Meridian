'use server';

/**
 * PHASE 2: ARCHITECT
 * Converts a project title/description into a technical blueprint (Directoy structure + Roadmap).
 */

interface Blueprint {
  roadmap: { step: string; status: 'pending' | 'completed' | 'current'; description: string }[];
  stack: string[];
  directoryStructure: Record<string, string>; // { 'src/App.js': 'content' }
}

export async function architectProject(projectId: string, description: string): Promise<Blueprint> {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    console.warn("API Key missing. Using mock blueprint.");
    return getMockBlueprint();
  }

  try {
    // LLM Prompting logic to generate the JSON blueprint
    // const blueprint = await gemini.generateJSON({ ... });
    return getMockBlueprint();
  } catch (error) {
    console.error("Architecting failed:", error);
    return getMockBlueprint();
  }
}

function getMockBlueprint(): Blueprint {
  return {
    roadmap: [
      { step: 'Scaffold Environment', status: 'completed', description: 'Initialize repository and install core dependencies.' },
      { step: 'Base UI Infrastructure', status: 'current', description: 'Set up the obsidian architect layout and glassmorphic panels.' },
      { step: 'Core AI Logic', status: 'pending', description: 'Implement the vector memory and LLM orchestration layer.' }
    ],
    stack: ['Next.js', 'Tailwind CSS', 'Supabase', 'Gemini AI'],
    directoryStructure: {
      'src/app/page.tsx': '// Root component',
      'src/lib/ai.ts': '// AI Utilities',
      'package.json': '{ "name": "project" }'
    }
  };
}
