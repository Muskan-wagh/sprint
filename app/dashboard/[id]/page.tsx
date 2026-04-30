import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ArrowLeft, Check, Calendar, GitBranch, Lightbulb, MessageSquare, User, ExternalLink } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Project } from '@/types';

async function getProject(id: string): Promise<Project | null> {
  // Try as string first (Supabase handles bigint as string)
  let { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  // If not found, try as number
  if (error || !project) {
    const numericId = parseInt(id, 10);
    const result = await supabase
      .from('projects')
      .select('*')
      .eq('id', numericId)
      .single();
    project = result.data;
    error = result.error;
  }

  if (error || !project) {
    console.log('Project not found, error:', error);
    return null;
  }

  return {
    ...project,
    problem: project.idea || '',
    usefulness: project.problem_statement || '',
    problem_statement: project.problem_statement || '',
    features: project.features ? JSON.parse(project.features) : [],
    tech_stack: project.tech_stack ? JSON.parse(project.tech_stack) : [],
    roadmap: project.roadmap ? JSON.parse(project.roadmap) : [],
    pitch_script: project.pitch || '',
  };
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-primary mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="card p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Project not found</h2>
            <p className="text-gray-500 mb-6">This project may have been deleted or doesn&apos;t exist.</p>
            <Link href="/dashboard" className="btn-primary inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-primary mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="badge-emerald">{project.domain}</span>
              <span className="text-sm text-gray-400 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Created {formatDate(project.created_at)}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
            <p className="text-lg text-gray-500">{project.problem_statement || project.problem}</p>
          </div>
          <Link href="/idea" className="btn-primary flex items-center gap-2 shrink-0">
            <ExternalLink className="w-4 h-4" />
            Start New Project
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="card">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Problem & Solution
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">The Problem</h3>
                  <p className="text-gray-700">{project.problem}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">The Solution</h3>
                  <p className="text-gray-700">{project.problem_statement || project.usefulness}</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  Key Features
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {project.features?.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                  {(!project.features || project.features.length === 0) && (
                    <p className="text-gray-400 italic">No features defined</p>
                  )}
                </ul>
              </div>
            </div>

            <div className="card">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-primary" />
                  Tech Stack
                </h2>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack?.map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                      {tech}
                    </span>
                  ))}
                  {(!project.tech_stack || project.tech_stack.length === 0) && (
                    <p className="text-gray-400 italic">No tech stack defined</p>
                  )}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-primary" />
                  Roadmap
                </h2>
              </div>
              <div className="p-6">
                <ol className="space-y-4">
                  {project.roadmap?.map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold">
                        {i + 1}
                      </div>
                      <span className="text-gray-700 mt-1.5">{item}</span>
                    </li>
                  ))}
                  {(!project.roadmap || project.roadmap.length === 0) && (
                    <p className="text-gray-400 italic">No roadmap defined</p>
                  )}
                </ol>
              </div>
            </div>

            <div className="card">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Pitch Script
                </h2>
              </div>
              <div className="p-6">
                {project.pitch_script ? (
                  <div className="p-6 bg-emerald-50 rounded-xl">
                    <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                      {project.pitch_script}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-400 italic">No pitch script saved</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card !p-0 overflow-hidden sticky top-28">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h2 className="font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-3 space-y-2">
                <Link 
                  href={`/pitch?title=${encodeURIComponent(project.title)}&problem=${encodeURIComponent(project.problem)}&usefulness=${encodeURIComponent(project.problem_statement || '')}&domain=${encodeURIComponent(project.domain || '')}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
                >
                  <MessageSquare className="w-4 h-4 text-primary" />
                  Regenerate Pitch
                </Link>
                <Link 
                  href={`/structure?title=${encodeURIComponent(project.title)}&problem=${encodeURIComponent(project.problem)}&usefulness=${encodeURIComponent(project.problem_statement || '')}&domain=${encodeURIComponent(project.domain || '')}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
                >
                  <GitBranch className="w-4 h-4 text-primary" />
                  Regenerate Structure
                </Link>
              </div>
            </div>

            <div className="card !p-0 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h2 className="font-semibold text-gray-900">Project Summary</h2>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Domain</h3>
                  <div className="badge-emerald mt-1">{project.domain}</div>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Created</h3>
                  <p className="text-sm text-gray-700">{formatDate(project.created_at)}</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Features</h3>
                  <p className="text-sm text-gray-700">{project.features?.length || 0} defined</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Tech Stack</h3>
                  <p className="text-sm text-gray-700">{project.tech_stack?.length || 0} technologies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}