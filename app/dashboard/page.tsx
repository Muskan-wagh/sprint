'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { LayoutDashboard, Plus, ArrowRight, Calendar, Tag } from 'lucide-react';
import type { Project } from '@/types';

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.projects) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  return (
    <DashboardLayout>
      <div className="p-3 md:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-8 gap-3 md:gap-4">
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-2 md:gap-3">
              <LayoutDashboard className="w-5 h-5 md:w-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-primary" />
              <span className="hidden sm:inline">Dashboard</span>
              <span className="sm:hidden">Dashboard</span>
            </h1>
            <p className="text-xs md:text-sm text-gray-500 mt-0.5 md:mt-1">Manage your projects and ideas</p>
          </div>
          <Link href="/idea" className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center text-sm md:text-base py-2 md:py-3">
            <Plus className="w-4 h-4 md:w-5 md:h-5" />
            <span className="sm:hidden">New</span>
            <span className="hidden sm:inline">New Project</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-8">
          <div className="card p-3 md:p-6">
            <div className="flex items-center gap-2 md:gap-4">
              <div className="w-8 h-8 md:w-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center">
                <LayoutDashboard className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-primary" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-500 font-medium">Total Projects</p>
                <p className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">{projects.length}</p>
              </div>
            </div>
          </div>
          <div className="card p-3 md:p-6">
            <div className="flex items-center gap-2 md:gap-4">
              <div className="w-8 h-8 md:w-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-emerald-100 flex items-center justify-center">
                <Tag className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-500 font-medium">Unique Domains</p>
                <p className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                  {new Set(projects.map(p => p.domain)).size}
                </p>
              </div>
            </div>
          </div>
          <div className="card p-3 md:p-6 sm:col-span-2 md:col-auto">
            <div className="flex items-center gap-2 md:gap-4">
              <div className="w-8 h-8 md:w-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-blue-100 flex items-center justify-center">
                <Calendar className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-500 font-medium">This Month</p>
                <p className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                  {projects.filter(p => {
                    const created = new Date(p.created_at);
                    const now = new Date();
                    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-3 md:space-y-4">
          <h2 className="text-base md:text-xl font-bold text-gray-900">Your Projects</h2>

          {loading ? (
            <div className="card p-8 md:p-12 text-center">
              <div className="w-6 h-6 md:w-8 md:h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-500 text-sm md:text-base">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="card p-8 md:p-12 text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <LayoutDashboard className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-500 mb-6 text-sm md:text-base">Start by creating your first project idea</p>
              <Link href="/idea" className="btn-primary inline-flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create First Project
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {projects.map((project) => (
                <div key={project.id} className="card hover:border-primary/50 transition-all group">
                  <div className="p-4 md:p-6">
                    <div className="flex items-start justify-between mb-3 md:mb-4">
                      <div className="badge-emerald text-xs">{project.domain}</div>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(project.created_at)}
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 line-clamp-1">{project.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3 md:mb-4">{project.problem}</p>

                    <div className="flex items-center gap-2 flex-wrap mb-3 md:mb-4">
                      {(project.tech_stack || []).slice(0, 3).map((tech, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-600">
                          {tech}
                        </span>
                      ))}
                      {(project.tech_stack || []).length > 3 && (
                        <span className="text-xs text-gray-400">+{project.tech_stack.length - 3}</span>
                      )}
                    </div>

                    <Link href={`/dashboard/${project.id}`} className="w-full py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2">
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}