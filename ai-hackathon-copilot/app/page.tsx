import { Hero } from '@/components/custom/hero';
import { HowItWorks } from '@/components/custom/steps';
import { DemoPreview } from '@/components/custom/demo';
import { Navigation } from '@/components/Navigation';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <HowItWorks />
      <DemoPreview />
      <footer className="py-12 border-t border-gray-100 text-center">
        <p className="text-gray-400 text-sm">
          © 2026 Sanctuary AI. Crafted for serenity.
        </p>
      </footer>
    </main>
  );
}