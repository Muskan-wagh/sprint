import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Lightbulb, Layers, Mic2, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Connect Sources",
    description: "Integrate your existing workflow, notes, and datasets with a single click. We play nice with everything.",
  },
  {
    number: "02",
    title: "Define Goals",
    description: "Tell Sanctuary what you want to achieve. Our AI analyzes your context to provide perfect assistance.",
  },
  {
    number: "03",
    title: "Execute Smoothly",
    description: "Draft, automate, and create at the speed of thought. The noise vanishes, the work flows.",
  },
];

export function HowItWorks() {
  return (
    <section className="section bg-white overflow-hidden">
      <div className="container">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            The Path to Serenity
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto uppercase tracking-[0.2em] text-xs font-semibold">
            simple steps to revolutionary productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative group animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
              <div className="absolute -top-12 -left-6 text-[8rem] font-bold text-gray-50 pointer-events-none select-none z-0 group-hover:text-emerald-50 transition-colors duration-500">
                {step.number}
              </div>
              <div className="relative z-10 space-y-4">
                <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm lg:text-base">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}