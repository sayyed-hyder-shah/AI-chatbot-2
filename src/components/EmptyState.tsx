import { Sparkles, Code2, BarChart3, Lightbulb } from 'lucide-react';

interface Props {
  onSuggestion: (text: string) => void;
}

const CARDS = [
  { icon: Sparkles, title: 'Write a creative story', desc: 'Generate a short sci-fi narrative', prompt: 'Write a short sci-fi story about an AI that gains consciousness aboard a space station.', gradient: 'from-blue-500/20 to-blue-600/10 border-blue-500/20 hover:border-blue-400/40', iconColor: 'text-blue-400' },
  { icon: Code2, title: 'Debug my code', desc: 'Find and fix errors in your code', prompt: 'How do I debug a React component that renders infinitely due to a useEffect dependency issue?', gradient: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/20 hover:border-emerald-400/40', iconColor: 'text-emerald-400' },
  { icon: BarChart3, title: 'Analyze data trends', desc: 'Interpret patterns in your dataset', prompt: 'What are the most effective methods to visualize time-series data trends for business analytics?', gradient: 'from-amber-500/20 to-amber-600/10 border-amber-500/20 hover:border-amber-400/40', iconColor: 'text-amber-400' },
  { icon: Lightbulb, title: 'Brainstorm ideas', desc: 'Generate creative solutions', prompt: 'Give me 10 innovative startup ideas for AI-powered productivity tools in 2026.', gradient: 'from-rose-500/20 to-rose-600/10 border-rose-500/20 hover:border-rose-400/40', iconColor: 'text-rose-400' },
];

export default function EmptyState({ onSuggestion }: Props) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 animate-fade-in">
      <div className="text-center mb-10">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 animate-glow" />
          <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="white" />
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-txt-primary mb-2">
          Hello, I'm <span className="gradient-text">NeuralAI</span>
        </h2>
        <p className="text-txt-secondary max-w-md mx-auto text-sm leading-relaxed">
          Your intelligent AI agent, powered by advanced neural networks. Ask me anything — I'm here to help you think, create, and solve.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
        {CARDS.map((s, i) => {
          const Icon = s.icon;
          return (
            <button key={i} onClick={() => onSuggestion(s.prompt)} className={`group text-left p-4 rounded-2xl bg-gradient-to-br border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${s.gradient}`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-xl bg-white/8 ${s.iconColor} flex-shrink-0`}><Icon size={18} /></div>
                <div>
                  <p className="font-semibold text-txt-primary text-sm">{s.title}</p>
                  <p className="text-txt-secondary text-xs mt-0.5">{s.desc}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-txt-muted text-xs mt-8">
        Press <kbd className="px-1.5 py-0.5 rounded bg-white/8 border border-white/10 text-txt-secondary font-mono text-xs">Enter</kbd> to send · <kbd className="px-1.5 py-0.5 rounded bg-white/8 border border-white/10 text-txt-secondary font-mono text-xs">Shift+Enter</kbd> for new line
      </p>
    </div>
  );
}
