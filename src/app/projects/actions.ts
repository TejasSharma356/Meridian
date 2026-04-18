'use server';

import { getSession } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import type { ArchitectureBlueprint } from '@/app/architect/actions';

function composeBuildPrompt(
  title: string,
  description: string,
  blueprint: ArchitectureBlueprint
): string {
  const stack = (blueprint.techStack || []).join(', ');
  const nodes = (blueprint.nodes || [])
    .map((n) => `${n.label} (${n.type}${n.layer ? ` / ${n.layer}` : ''})`)
    .join('; ');
  return [
    `You are the implementation agent for Meridian.`,
    `Project: ${title}`,
    `Summary: ${blueprint.overview || description.slice(0, 400)}`,
    `Description: ${description}`,
    stack ? `Preferred stack: ${stack}.` : '',
    nodes ? `Architecture nodes to respect: ${nodes}.` : '',
    `Deliver an MVP that matches this architecture. Start by scaffolding the core services and wiring the main data path end-to-end.`,
  ]
    .filter(Boolean)
    .join('\n');
}

export async function createProjectFromArchitect(input: {
  title: string;
  description: string;
  blueprint: ArchitectureBlueprint;
  roadmapStepIndex: number;
}) {
  const session = await getSession();
  if (!session?.userId) {
    throw new Error('Unauthorized');
  }

  const { title, description, blueprint, roadmapStepIndex } = input;
  if (!title.trim() || !description.trim()) {
    throw new Error('Title and description are required');
  }

  const buildPrompt = composeBuildPrompt(title, description, blueprint);

  if (session.isDev) {
    return {
      id: 'dev-bypass-project',
      buildPrompt,
    };
  }

  await dbConnect();

  const doc = await Project.create({
    userId: session.userId,
    title: title.trim(),
    description: description.trim(),
    techStack: blueprint.techStack?.length ? blueprint.techStack : [],
    status: 'IN PROGRESS',
    progress: Math.min(100, 15 + roadmapStepIndex * 20),
    roadmapStepIndex: Math.min(3, Math.max(0, roadmapStepIndex)),
    initialBuildPrompt: buildPrompt,
  });

  return {
    id: String(doc._id),
    buildPrompt,
  };
}

export async function advanceProjectRoadmapStep(projectId: string) {
  const session = await getSession();
  if (!session?.userId) throw new Error('Unauthorized');
  if (session.isDev) return { roadmapStepIndex: 1 };

  await dbConnect();
  const proj = await Project.findOne({ _id: projectId, userId: session.userId });
  if (!proj) throw new Error('Project not found');

  const next = Math.min(3, (proj.roadmapStepIndex ?? 0) + 1);
  proj.roadmapStepIndex = next;
  proj.progress = Math.min(100, 20 + next * 20);
  await proj.save();

  return { roadmapStepIndex: next };
}
