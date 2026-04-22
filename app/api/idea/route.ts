import { NextRequest, NextResponse } from 'next/server';
import { callMinimax } from '@/lib/minimax';
import { DEFAULT_IDEA_PROMPT } from '@/lib/prompts';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { domain, customPrompt, model } = body;

    if (!domain) {
      return NextResponse.json(
        { error: 'Domain is required' },
        { status: 400 }
      );
    }

    const prompt = customPrompt || DEFAULT_IDEA_PROMPT;
    const userMessage = prompt.replace('{domain}', domain);

    const response = await callMinimax([
      { role: 'system', content: 'You are a helpful AI assistant.' },
      { role: 'user', content: userMessage },
    ], model);

    let ideas;
    try {
      ideas = JSON.parse(response);
    } catch {
      const match = response.match(/\[[\s\S]*\]/);
      if (match) {
        ideas = JSON.parse(match[0]);
      } else {
        ideas = [
          {
            title: 'Parsed Idea',
            problem: response.split('\n')[0] || 'Problem description',
            usefulness: 'Usefulness description',
          },
        ];
      }
    }

    if (!Array.isArray(ideas)) {
      ideas = [ideas];
    }

    return NextResponse.json({ ideas: ideas.slice(0, 3) });
  } catch (error) {
    console.error('Error generating ideas:', error);
    return NextResponse.json(
      { error: 'Failed to generate ideas' },
      { status: 500 }
    );
  }
}