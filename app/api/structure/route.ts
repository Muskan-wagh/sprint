import { NextRequest, NextResponse } from 'next/server';
import { callMinimax } from '@/lib/minimax';
import { DEFAULT_STRUCTURE_PROMPT } from '@/lib/prompts';

function parseJsonResponse(response: string) {
  const match = response.match(/```json\n([\s\S]*?)\n```/);
  if (match) {
    try {
      return JSON.parse(match[1]);
    } catch {}
  }
  try {
    return JSON.parse(response);
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { idea, domain, customPrompt, model } = body;

    if (!idea || !domain) {
      return NextResponse.json(
        { error: 'Idea and domain are required' },
        { status: 400 }
      );
    }

    const prompt = customPrompt || DEFAULT_STRUCTURE_PROMPT;
    const userMessage = prompt
      .replace('{domain}', domain)
      .replace('{title}', idea.title)
      .replace('{problem}', idea.problem)
      .replace('{usefulness}', idea.usefulness);

    const response = await callMinimax([
      { role: 'system', content: 'You are a helpful AI assistant.' },
      { role: 'user', content: userMessage },
    ], model);

    let structure = parseJsonResponse(response);
    if (!structure) {
      structure = {
        problem_statement: response.split('\n')[0] || 'Problem statement',
        features: ['Feature 1', 'Feature 2'],
        tech_stack: ['React', 'Node.js'],
        roadmap: ['Day 1', 'Day 2'],
      };
    }

    return NextResponse.json({ structure });
  } catch (error) {
    console.error('Error generating structure:', error);
    return NextResponse.json(
      { error: 'Failed to generate structure' },
      { status: 500 }
    );
  }
}