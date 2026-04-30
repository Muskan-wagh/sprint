import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return NextResponse.json(
        { error: 'Failed to fetch projects' },
        { status: 500 }
      );
    }

    const formattedProjects = (projects || []).map((p: any) => ({
      ...p,
      problem: p.idea || p.problem_statement || '',
      usefulness: p.usefulness || '',
      features: p.features ? JSON.parse(p.features) : [],
      tech_stack: p.tech_stack ? JSON.parse(p.tech_stack) : [],
      roadmap: p.roadmap ? JSON.parse(p.roadmap) : [],
      pitch_script: p.pitch || '',
    }));

    return NextResponse.json({ projects: formattedProjects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const project = {
      domain: body.domain,
      title: body.title,
      idea: body.problem,
      problem_statement: body.problem_statement,
      features: body.features ? JSON.stringify(body.features) : null,
      tech_stack: body.tech_stack ? JSON.stringify(body.tech_stack) : null,
      roadmap: body.roadmap ? JSON.stringify(body.roadmap) : null,
      pitch: body.pitch_script,
    };

    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();

    if (error) {
      console.error('Error saving project:', error);
      return NextResponse.json(
        { error: 'Failed to save project' },
        { status: 500 }
      );
    }

    return NextResponse.json({ project: data });
  } catch (error) {
    console.error('Error saving project:', error);
    return NextResponse.json(
      { error: 'Failed to save project' },
      { status: 500 }
    );
  }
}