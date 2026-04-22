'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sparkles, ArrowRight, Check, GitBranch, Home, Settings } from 'lucide-react';
import { AI_MODELS } from '@/lib/minimax';
import { DashboardLayout } from '@/components/DashboardLayout';
import Link from 'next/link';

function StructureContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const domain = searchParams.get('domain') || '';
  const title = searchParams.get('title') || '';
  const problem = searchParams.get('problem') || '';
  const usefulness = searchParams.get('usefulness') || '';

  const [customPrompt, setCustomPrompt] = useState('');
  const [model, setModel] = useState('nvidia/nemotron-3-nano-30b-a3b:free');
  const [structure, setStructure] = useState<{
    problem_statement: string;
    features: string[];
    tech_stack: string[];
    roadmap: string[];
  } | null>(null);
  const [loading, setLoading] = useState(false);

  async function generateStructure() {
    setLoading(true);
    try {
      const res = await fetch('/api/structure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea: { title, problem, usefulness },
          domain,
          customPrompt: customPrompt || undefined,
          model,
        }),
      });
      const data = await res.json();
      if (data.structure) {
        setStructure(data.structure);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  function proceedToPitch() {
    if (!structure) return;
    const params = new URLSearchParams({
      domain,
      title,
      problem,
      usefulness,
      problem_statement: structure.problem_statement,
      features: JSON.stringify(structure.features),
      tech_stack: JSON.stringify(structure.tech_stack),
      roadmap: JSON.stringify(structure.roadmap),
    });
    router.push(`/pitch?${params.toString()}`);
  }

  return (
    <div className="p-8">
      <header className="mb-8 animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
          <Link href="/dashboard" className="text-sm text-gray-500 hover:text-primary flex items-center gap-1">
            <Home className="w-4 h-4" />
            Dashboard
          </Link>
          <span className="text-gray-300">/</span>
          <Link href="/idea" className="text-sm text-gray-500 hover:text-primary">Ideas</Link>
          <span className="text-gray-300">/</span>
          <span className="text-sm font-medium text-gray-900">Structure</span>
        </div>
        <div className="badge-emerald mb-4">Structure Builder</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Build your project architecture.</h1>
        <p className="text-gray-500 text-lg">Define features, tech stack, and roadmap for your startup.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar: Selected Idea */}
        <aside className="lg:col-span-1 space-y-6 animate-fade-in stagger-1">
          <div className="card !p-0 overflow-hidden sticky top-28">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-primary" />
                Selected Idea
              </h2>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Title</span>
                <p className="text-sm font-semibold text-gray-900">{title}</p>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Domain</span>
                <div className="badge-emerald inline-block mt-1">{domain}</div>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Problem</span>
                <p className="text-sm text-gray-600">{problem}</p>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Solution</span>
                <p className="text-sm text-gray-600">{usefulness}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-2 space-y-8 animate-fade-in stagger-2">
          {/* Configuration */}
          <div className="card">
            <div className="p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Configuration
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">AI Model</label>
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-emerald-50 outline-none transition-all appearance-none bg-white"
                  >
                    {AI_MODELS.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Custom Prompt (Optional)</label>
                <textarea
                  placeholder="Add specific requirements or modify the generation prompt..."
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  className="w-full h-32 px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-emerald-50 outline-none transition-all resize-none"
                />
              </div>

              <button
                onClick={generateStructure}
                disabled={loading}
                className="btn-primary w-full py-4 text-lg shadow-emerald-200/50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 animate-spin" />
                    Building Architecture...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Generate Structure
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          {structure && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2 px-1">
                <GitBranch className="w-6 h-6 text-primary" />
                Project Structure
              </h2>
              
              <div className="card">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Problem Statement</h3>
                  <p className="text-gray-600">{structure.problem_statement}</p>
                </div>
              </div>

              <div className="card">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {structure.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {structure.tech_stack.map((tech, i) => (
                      <span key={i} className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Roadmap</h3>
                  <ol className="space-y-4">
                    {structure.roadmap.map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold">
                          {i + 1}
                        </div>
                        <span className="text-gray-600 mt-1.5">{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <button
                onClick={proceedToPitch}
                className="btn-primary w-full py-5 text-xl animate-fade-in"
              >
                Next: Create Your Pitch
                <ArrowRight className="w-6 h-6 ml-2" />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <DashboardLayout>
      <div className="p-8 flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function StructurePage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<LoadingFallback />}>
        <StructureContent />
      </Suspense>
    </DashboardLayout>
  );
}