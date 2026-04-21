'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select } from '@/components/ui/input';
import { AI_MODELS } from '@/lib/minimax';

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
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Project Structure</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Selected Idea</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Title:</strong> {title}</p>
          <p><strong>Problem:</strong> {problem}</p>
          <p><strong>Usefulness:</strong> {usefulness}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Custom Prompt (Optional)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={model} onChange={(e) => setModel(e.target.value)}>
            {AI_MODELS.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </Select>
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Edit the prompt if needed..."
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
          />
          <Button onClick={generateStructure} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Structure'}
          </Button>
        </CardContent>
      </Card>

      {structure && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Problem Statement</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{structure.problem_statement}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-4">
                {structure.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tech Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {structure.tech_stack.map((t, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 rounded">{t}</span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-4">
                {structure.roadmap.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Button onClick={proceedToPitch}>Next: Pitch</Button>
        </div>
      )}
    </div>
  );
}

function LoadingFallback() {
  return <p>Loading...</p>;
}

export default function StructurePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <StructureContent />
    </Suspense>
  );
}