import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="section flex flex-col items-center text-center animate-fade-in pt-32 pb-24">
      <div className="container flex flex-col items-center">
        <div className="badge-emerald mb-8 uppercase tracking-wider text-xs">
          AI-Powered Serenity
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 max-w-4xl leading-[1.1] tracking-tight">
          <span className="text-primary">Natural Intelligence.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mb-12 leading-relaxed">
          Experience a digital sanctuary designed to amplify your creativity and simplify your complexity. No noise, just pure execution.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Link href="/idea" className="btn-primary px-8 py-4 text-lg">
            Get Started for Free
          </Link>
          <button className="inline-flex items-center gap-2 text-gray-700 font-semibold hover:text-primary transition-colors group">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 group-hover:bg-emerald-50 transition-colors">
              <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-gray-900 border-b-[6px] border-b-transparent ml-1" />
            </div>
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
}