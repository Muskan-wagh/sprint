'use client';

import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Lightbulb, GitBranch, MessageSquare, Sparkles, ArrowRight, Clock, Target, Trophy, Users, Code, Presentation, TrendingUp, Zap, ChevronRight } from 'lucide-react';

const hackathonPhases = [
  {
    phase: "Phase 1",
    title: "Ideation",
    duration: "Days 1-2",
    icon: Lightbulb,
    color: "bg-yellow-100 text-yellow-600",
    description: "Generate winning startup ideas tailored to your domain",
    tools: ["AI Idea Generator", "Market Analysis", "Problem Discovery"],
    outcome: "3-5 validated startup concepts",
  },
  {
    phase: "Phase 2",
    title: "Structure",
    duration: "Days 2-3",
    icon: GitBranch,
    color: "bg-blue-100 text-blue-600",
    description: "Build your project architecture and define features",
    tools: ["Tech Stack Selector", "Feature Planner", "Roadmap Builder"],
    outcome: "Complete project architecture",
  },
  {
    phase: "Phase 3",
    title: "Pitch",
    duration: "Days 3-5",
    icon: MessageSquare,
    color: "bg-purple-100 text-purple-600",
    description: "Create a compelling 60-second pitch for judges",
    tools: ["Pitch Generator", "Script Writer", "Demo Prep"],
    outcome: "Investor-ready pitch deck",
  },
];

const benefits = [
  {
    icon: Clock,
    title: "Save 80% Time",
    description: "Generate ideas, structures, and pitches in minutes instead of hours",
  },
  {
    icon: Target,
    title: "Laser Focus",
    description: "AI-powered suggestions tailored to your domain and target audience",
  },
  {
    icon: Trophy,
    title: "Judges' Favorite",
    description: "Create professional pitches that stand out from the competition",
  },
  {
    icon: Users,
    title: "Team Ready",
    description: "Share saved projects with your team for collaborative building",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="container">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <div className="badge-emerald mb-4">Hackathon Workflow</div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your Hackathon Journey
            </h1>
            <p className="text-xl text-gray-500">
              From idea to pitch in 3 simple steps. Transform your hackathon experience with AI-powered guidance.
            </p>
          </div>

          {/* Main Flow Chart */}
          <div className="mb-20">
            <div className="flex items-center justify-center mb-12">
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
                  Start
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300" />
                {hackathonPhases.map((phase, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`px-4 py-2 ${phase.color} rounded-full text-sm font-medium`}>
                      {phase.title}
                    </div>
                    {index < hackathonPhases.length - 1 && (
                      <ArrowRight className="w-5 h-5 text-gray-300" />
                    )}
                  </div>
                ))}
                <ArrowRight className="w-5 h-5 text-gray-300" />
                <div className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium">
                  Win! 🏆
                </div>
              </div>
            </div>
          </div>

          {/* Phase Details */}
          <div className="space-y-8 mb-20">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Three Phases to Victory
            </h2>
            
            {hackathonPhases.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <div key={index} className="card overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {/* Left: Phase Info */}
                    <div className="md:w-1/3 p-8 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-100">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-xl ${phase.color} flex items-center justify-center`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            {phase.phase}
                          </p>
                          <p className="text-sm text-gray-500">{phase.duration}</p>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{phase.title}</h3>
                      <p className="text-gray-500">{phase.description}</p>
                    </div>
                    
                    {/* Middle: Flow Arrow */}
                    <div className="hidden md:flex md:w-16 items-center justify-center">
                      <ChevronRight className="w-8 h-8 text-gray-200" />
                    </div>
                    
                    {/* Right: Details */}
                    <div className="flex-1 p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Tools Used</p>
                          <ul className="space-y-2">
                            {phase.tools.map((tool, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                <Zap className="w-4 h-4 text-primary" />
                                {tool}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Outcome</p>
                          <div className="p-4 bg-emerald-50 rounded-xl">
                            <p className="font-semibold text-emerald-700">{phase.outcome}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Why It Works */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Why This Transform Your Hackathon
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="card p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-sm text-gray-500">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Comparison */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Without vs With Sanctuary AI
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Without AI */}
              <div className="card p-8 border-2 border-red-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <span className="text-xl">😰</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Without AI</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500">✕</span>
                    <span className="text-gray-600">Hours spent on idea validation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500">✕</span>
                    <span className="text-gray-600">Unfocused project scope</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500">✕</span>
                    <span className="text-gray-600">Last-minute pitch panic</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500">✕</span>
                    <span className="text-gray-600">Generic, forgettable pitch</span>
                  </li>
                </ul>
              </div>
              
              {/* With AI */}
              <div className="card p-8 border-2 border-primary">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-xl">🚀</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">With Sanctuary AI</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-primary">✓</span>
                    <span className="text-gray-600">AI-generated validated ideas in minutes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary">✓</span>
                    <span className="text-gray-600">Clear tech stack & feature roadmap</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary">✓</span>
                    <span className="text-gray-600">Ready-to-use pitch script</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary">✓</span>
                    <span className="text-gray-600">Professional, standout presentation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link href="/idea" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
              <Sparkles className="w-5 h-5" />
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-gray-500 mt-4 text-sm">
              No account required • Completely free
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}