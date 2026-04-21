export interface Idea {
  title: string;
  problem: string;
  usefulness: string;
}

export interface Project {
  id: string;
  created_at: string;
  domain: string;
  title: string;
  problem: string;
  usefulness: string;
  problem_statement: string;
  features: string[];
  tech_stack: string[];
  roadmap: string[];
  pitch_script: string;
}

export interface IdeaApiRequest {
  domain: string;
  customPrompt?: string;
}

export interface StructureApiRequest {
  idea: Idea;
  domain: string;
  customPrompt?: string;
}

export interface PitchApiRequest {
  project: {
    title: string;
    problem_statement: string;
    features: string[];
    tech_stack: string[];
  };
  customPrompt?: string;
}