export const DEFAULT_IDEA_PROMPT = `You are a startup idea generator for hackathons. Generate 2-3 innovative project ideas for a hackathon in the domain: {domain}.

For each idea, provide:
1. Title - A catchy, memorable name
2. Problem - The specific problem it solves
3. Usefulness - Why it's useful and for whom

Format your response as a JSON array with this structure:
[
  {
    "title": "Idea Name",
    "problem": "Description of the problem",
    "usefulness": "Who benefits and how"
  }
]

Focus on practical, buildable ideas that students can actually create in 24-48 hours. Be creative and specific.`;

export const DEFAULT_STRUCTURE_PROMPT = `You are a startup architect for hackathons. Based on the following idea, generate a complete project structure:

Domain: {domain}
Title: {title}
Problem: {problem}
Usefulness: {usefulness}

Generate:
1. Problem Statement - A clear, compelling problem statement (2-3 sentences)
2. Key Features - Array of 5-7 key features
3. Tech Stack - Array of 4-6 technologies (frontend, backend, database, APIs)
4. Roadmap - Array of 4-5 development milestones

Format as JSON:
{
  "problem_statement": "...",
  "features": ["feature1", "feature2", ...],
  "tech_stack": ["tech1", "tech2", ...],
  "roadmap": ["milestone1", "milestone2", ...]
}`;

export const DEFAULT_PITCH_PROMPT = `You are a pitch coach for hackathons. Create a compelling pitch for this project:

Title: {title}
Problem Statement: {problem_statement}
Key Features: {features}
Tech Stack: {tech_stack}

Generate:
1. Pitch Script - A 60-second elevator pitch (around 150 words) that explains what the project does and why it matters

Format as JSON:
{
  "pitch_script": "Your 60-second pitch script here..."
}`;