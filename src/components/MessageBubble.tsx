import { Copy, ThumbsUp, ThumbsDown, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import type { Message } from '../types';

interface Props {
  message: Message;
}

function fmtTime(d: Date): string {
  return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).format(d);
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState<'up' | 'down' | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex items-start gap-3 px-4 py-2 message-enter group ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {isUser ? (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 border border-white/10 flex items-center justify-center text-sm font-semibold text-white/90">
          U
        </div>
      ) : (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center ai-glow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="white" />
          </svg>
        </div>
      )}

      <div className={`flex flex-col gap-1 max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`px-4 py-3 text-sm leading-relaxed ${isUser ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl rounded-tr-sm' : 'glass text-txt-primary rounded-2xl rounded-tl-sm'}`}>
          {message.content}
        </div>
        <span className="text-xs text-txt-muted px-1">{fmtTime(message.timestamp)}</span>

        {!isUser && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
            <button onClick={handleCopy} className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs text-txt-secondary hover:text-txt-primary hover:bg-white/10 transition-all">
              <Copy size={12} />{copied ? 'Copied!' : 'Copy'}
            </button>
            <button onClick={() => setLiked(liked === 'up' ? null : 'up')} className={`p-1.5 rounded-lg transition-all ${liked === 'up' ? 'text-green-400 bg-green-400/10' : 'text-txt-secondary hover:text-txt-primary hover:bg-white/10'}`}>
              <ThumbsUp size={12} />
            </button>
            <button onClick={() => setLiked(liked === 'down' ? null : 'down')} className={`p-1.5 rounded-lg transition-all ${liked === 'down' ? 'text-red-400 bg-red-400/10' : 'text-txt-secondary hover:text-txt-primary hover:bg-white/10'}`}>
              <ThumbsDown size={12} />
            </button>
            <button className="p-1.5 rounded-lg text-txt-secondary hover:text-txt-primary hover:bg-white/10 transition-all">
              <RotateCcw size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
