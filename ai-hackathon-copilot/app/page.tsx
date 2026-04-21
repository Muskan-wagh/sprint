'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Project } from '@/types';

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link href="/idea">
          <Button>New Project</Button>
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : projects.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-gray-500">
            No projects yet. Click &quot;New Project&quot; to get started.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => setSelectedProject(selectedProject?.id === project.id ? null : project)}
            >
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Domain: {project.domain}</p>
                <p className="text-sm text-gray-600">Problem: {project.problem}</p>
                {selectedProject?.id === project.id && (
                  <div className="mt-4 space-y-2">
                    <p><strong>Problem Statement:</strong> {project.problem_statement}</p>
                    <p><strong>Features:</strong> {project.features?.join(', ')}</p>
                    <p><strong>Tech Stack:</strong> {project.tech_stack?.join(', ')}</p>
                    <p><strong>Pitch:</strong> {project.pitch_script}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}