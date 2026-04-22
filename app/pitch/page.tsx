'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sparkles, ArrowRight, Check, MessageSquare, Home, Save } from 'lucide-react';
import { AI_MODELS } from '@/lib/minimax';
import { DashboardLayout } from '@/components/DashboardLayout';
import Link from 'next/link';

function PitchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const domain = searchParams.get('domain') || '';
  const title = searchParams.get('title') || '';
  const problem = searchParams.get('problem') || '';
  const usefulness = searchParams.get('usefulness') || '';
  const problem_statement = searchParams.get('problem_statement') || '';
  const features = JSON.parse(searchParams.get('features') || '[]');
  const tech_stack = JSON.parse(searchParams.get('tech_stack') || '[]');
  const roadmap = JSON.parse(searchParams.get('roadmap') || '[]');

  const [customPrompt, setCustomPrompt] = useState('');
  const [model, setModel] = useState('nvidia/nemotron-3-nano-30b-a3b:free');
  const [pitchScript, setPitchScript] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function generatePitch() {
    setLoading(true);
    try {
      const res = await fetch('/api/pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project: {
            title,
            problem_statement,
            features,
            tech_stack,
          },
          customPrompt: customPrompt || undefined,
          model,
        }),
      });
      const data = await res.json();
      if (data.pitch) {
        setPitchScript(data.pitch.pitch_script);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function saveProject() {
    setSaving(true);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain,
          title,
          problem,
          usefulness,
          problem_statement,
          features,
          tech_stack,
          roadmap,
          pitch_script: pitchScript,
        }),
      });
      if (res.ok) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSaving(false);
    }
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
          <Link href="/structure" className="text-sm text-gray-500 hover:text-primary">Structure</Link>
          <span className="text-gray-300">/</span>
          <span className="text-sm font-medium text-gray-900">Pitch</span>
        </div>
        <div className="badge-emerald mb-4">Pitch Generator</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your pitch script.</h1>
        <p className="text-gray-500 text-lg">Generate a compelling 60-second pitch for investors.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar: Project Summary */}
        <aside className="lg:col-span-1 space-y-6 animate-fade-in stagger-1">
          <div className="card !p-0 overflow-hidden sticky top-28">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                Project Summary
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
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Tech Stack</span>
                <div className="flex flex-wrap gap-1 mt-2">
                  {(tech_stack || []).map((tech: string, i: number) => (
                    <span key={i} className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-600">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Features</span>
                <ul className="mt-2 space-y-1">
                  {(features || []).slice(0, 3).map((feature: string, i: number) => (
                    <li key={i} className="text-xs text-gray-600 flex items-center gap-1">
                      <Check className="w-3 h-3 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-2 space-y-8 animate-fade-in stagger-2">
          {/* Configuration */}
          <div className="card">
            <div className="p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Configuration</h2>
              
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
                  placeholder="Add specific requirements or tone for your pitch..."
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  className="w-full h-32 px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-emerald-50 outline-none transition-all resize-none"
                />
              </div>

              <button
                onClick={generatePitch}
                disabled={loading}
                className="btn-primary w-full py-4 text-lg shadow-emerald-200/50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 animate-spin" />
                    Generating Pitch...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Generate Pitch
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          {pitchScript && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2 px-1">
                <MessageSquare className="w-6 h-6 text-primary" />
                Your 60-Second Pitch
              </h2>
              
              <div className="card">
                <div className="p-8">
                  <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {pitchScript}
                  </p>
                </div>
              </div>

              <button
                onClick={saveProject}
                disabled={saving}
                className="btn-primary w-full py-5 text-xl animate-fade-in"
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 animate-spin" />
                    Saving Project...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="w-5 h-5" />
                    Save Project
                  </span>
                )}
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

export default function PitchPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<LoadingFallback />}>
        <PitchContent />
      </Suspense>
    </DashboardLayout>
  );
}