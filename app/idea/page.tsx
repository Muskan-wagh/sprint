'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Lightbulb, ArrowRight, Check, Command, Home } from 'lucide-react';
import { AI_MODELS } from '@/lib/minimax';
import type { Idea } from '@/types';
import { DashboardLayout } from '@/components/DashboardLayout';
import Link from 'next/link';

const PROMPT_TEMPLATES = [
  "Startup idea for college students",
  "AI tool for productivity",
  "Hackathon winning project idea",
  "SaaS idea solving real-world problem",
  "Beginner-friendly project idea",
  "Fintech solution for Gen Z",
  "Eco-friendly lifestyle app"
];

export default function IdeaGenerator() {
  const router = useRouter();
  const [domain, setDomain] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [model, setModel] = useState('nvidia/nemotron-3-nano-30b-a3b:free');
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [loading, setLoading] = useState(false);

  function handleTemplateClick(template: string) {
    setSelectedTemplate(template);
    setCustomPrompt(template);
  }

  async function generateIdeas() {
    if (!domain.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain, customPrompt: customPrompt || undefined, model }),
      });
      const data = await res.json();
      if (data.ideas) {
        setIdeas(data.ideas);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  function proceedToStructure() {
    if (!selectedIdea) return;
    const params = new URLSearchParams({
      domain,
      title: selectedIdea.title,
      problem: selectedIdea.problem,
      usefulness: selectedIdea.usefulness,
    });
    router.push(`/structure?${params.toString()}`);
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <header className="mb-8 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/dashboard" className="text-sm text-gray-500 hover:text-primary flex items-center gap-1">
              <Home className="w-4 h-4" />
              Dashboard
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-medium text-gray-900">Ideas</span>
          </div>
          <div className="badge-emerald mb-4">Idea Engine v2.0</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your next breakthrough.</h1>
          <p className="text-gray-500 text-lg">Generate innovative startup concepts tailored to your chosen domain.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar: Custom Prompts */}
          <aside className="lg:col-span-1 space-y-6 animate-fade-in stagger-1">
            <div className="card !p-0 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Command className="w-4 h-4 text-primary" />
                  Custom Prompts
                </h2>
              </div>
              <div className="p-3 space-y-1 max-h-[60vh] overflow-y-auto">
                {PROMPT_TEMPLATES.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => handleTemplateClick(template)}
                    className={`prompt-card w-full text-left text-sm font-medium ${selectedTemplate === template ? 'active' : ''
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${selectedTemplate === template ? 'bg-primary' : 'bg-gray-300'}`} />
                      {template}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-8 animate-fade-in stagger-2">
            {/* Input Section */}
            <div className="card">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Explore Domain</label>
                  <input
                    type="text"
                    placeholder="e.g., EdTech, Web3, Climate AI"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-emerald-50 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">AI Model</label>
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none appearance-none bg-white"
                  >
                    {AI_MODELS.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2 mb-8">
                <label className="text-sm font-semibold text-gray-700">Refine Your Prompt</label>
                <textarea
                  placeholder="Describe your vision or select a prompt from the sidebar..."
                  value={customPrompt}
                  onChange={(e) => {
                    setCustomPrompt(e.target.value);
                    setSelectedTemplate(null);
                  }}
                  className="w-full h-32 px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-emerald-50 outline-none transition-all resize-none"
                />
              </div>

              <button
                onClick={generateIdeas}
                disabled={!domain.trim() || loading}
                className="btn-primary w-full py-4 text-lg shadow-emerald-200/50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 animate-spin" />
                    Analyzing Market...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Generate Concepts
                  </span>
                )}
              </button>
            </div>

            {/* Results Section */}
            {ideas.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2 px-1">
                  <Lightbulb className="w-6 h-6 text-yellow-500" />
                  Generated Potential
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {ideas.map((idea, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedIdea(idea)}
                      className={`card text-left p-8 transition-all relative ${selectedIdea?.title === idea.title
                          ? 'border-primary ring-4 ring-emerald-50'
                          : 'hover:border-gray-300'
                        }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-4 max-w-2xl">
                          <h3 className="text-xl font-bold text-gray-900">{idea.title}</h3>
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-primary mb-1 block">The Problem</span>
                            <p className="text-gray-600">{idea.problem}</p>
                          </div>
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-primary mb-1 block">The Solution</span>
                            <p className="text-gray-600">{idea.usefulness}</p>
                          </div>
                        </div>
                        {selectedIdea?.title === idea.title && (
                          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                            <Check className="w-6 h-6 text-white" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {selectedIdea && (
                  <button
                    onClick={proceedToStructure}
                    className="btn-primary w-full py-5 text-xl animate-fade-in"
                  >
                    Next: Build Project Architecture
                    <ArrowRight className="w-6 h-6 ml-2" />
                  </button>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </DashboardLayout>
  );
}