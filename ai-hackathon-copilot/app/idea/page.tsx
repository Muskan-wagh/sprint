'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Idea } from '@/types';

export default function IdeaGenerator() {
  const router = useRouter();
  const [domain, setDomain] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [loading, setLoading] = useState(false);

  async function generateIdeas() {
    if (!domain.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain, customPrompt: customPrompt || undefined }),
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
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Idea Generator</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Enter Domain</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="e.g., AI, Web, FinTech, HealthTech"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
          <Textarea
            placeholder="Custom prompt (optional)"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
          />
          <Button onClick={generateIdeas} disabled={!domain.trim() || loading}>
            {loading ? 'Generating...' : 'Generate Ideas'}
          </Button>
        </CardContent>
      </Card>

      {ideas.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Select an Idea</h2>
          <div className="grid gap-4">
            {ideas.map((idea, index) => (
              <Card
                key={index}
                className={`cursor-pointer ${
                  selectedIdea?.title === idea.title ? 'border-2 border-blue-500' : ''
                }`}
                onClick={() => setSelectedIdea(idea)}
              >
                <CardHeader>
                  <CardTitle>{idea.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p><strong>Problem:</strong> {idea.problem}</p>
                  <p><strong>Usefulness:</strong> {idea.usefulness}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          {selectedIdea && (
            <Button onClick={proceedToStructure}>Next: Structure</Button>
          )}
        </div>
      )}
    </div>
  );
}