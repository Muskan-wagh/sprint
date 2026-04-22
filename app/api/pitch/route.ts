import { NextRequest, NextResponse } from 'next/server';
import { callMinimax } from '@/lib/minimax';
import { DEFAULT_PITCH_PROMPT } from '@/lib/prompts';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { project, customPrompt, model } = body;

    if (!project) {
      return NextResponse.json(
        { error: 'Project data is required' },
        { status: 400 }
      );
    }

    const prompt = customPrompt || DEFAULT_PITCH_PROMPT;
    const userMessage = prompt
      .replace('{title}', project.title)
      .replace('{problem_statement}', project.problem_statement)
      .replace('{features}', project.features.join(', '))
      .replace('{tech_stack}', project.tech_stack.join(', '));

    const response = await callMinimax([
      { role: 'system', content: 'You are a helpful AI assistant.' },
      { role: 'user', content: userMessage },
    ], model);

    let pitch;
    try {
      pitch = JSON.parse(response);
    } catch {
      pitch = {
        pitch_script: response || 'Pitch script content',
      };
    }

    return NextResponse.json({ pitch });
  } catch (error) {
    console.error('Error generating pitch:', error);
    return NextResponse.json(
      { error: 'Failed to generate pitch' },
      { status: 500 }
    );
  }
}