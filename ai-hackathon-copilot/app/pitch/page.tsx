'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

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
        router.push('/');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Pitch Generator</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Project: {title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Problem Statement:</strong> {problem_statement}</p>
          <p><strong>Features:</strong> {features.join(', ')}</p>
          <p><strong>Tech Stack:</strong> {tech_stack.join(', ')}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Custom Prompt (Optional)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Edit the prompt if needed..."
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
          />
          <Button onClick={generatePitch} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Pitch'}
          </Button>
        </CardContent>
      </Card>

      {pitchScript && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>60-Second Pitch</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{pitchScript}</p>
            </CardContent>
          </Card>

          <Button onClick={saveProject} disabled={saving}>
            {saving ? 'Saving...' : 'Save Project'}
          </Button>
        </div>
      )}
    </div>
  );
}

function LoadingFallback() {
  return <p>Loading...</p>;
}

export default function PitchPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PitchContent />
    </Suspense>
  );
}