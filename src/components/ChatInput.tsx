import { useRef, useState, useEffect } from 'react';
import { Send, Paperclip, Mic, StopCircle } from 'lucide-react';

interface Props {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled = false }: Props) {
  const [value, setValue] = useState('');
  const [recording, setRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [value]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-4 pb-4 pt-2">
      <div className="max-w-3xl mx-auto">
        <div className="glass-strong rounded-2xl flex items-end gap-2 p-3 transition-all duration-200" style={{ boxShadow: value ? '0 0 0 1.5px rgba(59,130,246,0.4), 0 4px 24px rgba(0,0,0,0.4)' : '0 4px 24px rgba(0,0,0,0.4)' }}>
          <button className="flex-shrink-0 p-2 rounded-xl text-txt-secondary hover:text-txt-primary hover:bg-white/10 transition-all mb-0.5" title="Attach file">
            <Paperclip size={18} />
          </button>

          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Message NeuralAI..."
            rows={1}
            className="flex-1 bg-transparent resize-none text-txt-primary placeholder-txt-muted text-sm leading-relaxed focus:outline-none scrollbar-thin min-h-[36px] max-h-[160px]"
            style={{ paddingTop: '6px', paddingBottom: '6px' }}
          />

          <button onClick={() => setRecording(r => !r)} className={`flex-shrink-0 p-2 rounded-xl transition-all mb-0.5 ${recording ? 'text-red-400 bg-red-400/10' : 'text-txt-secondary hover:text-txt-primary hover:bg-white/10'}`}>
            {recording ? <StopCircle size={18} /> : <Mic size={18} />}
          </button>

          <button onClick={handleSend} disabled={!value.trim() || disabled} className={`flex-shrink-0 p-2 rounded-xl mb-0.5 transition-all duration-200 ${value.trim() && !disabled ? 'gradient-btn text-white' : 'bg-white/5 text-txt-muted cursor-not-allowed'}`}>
            <Send size={16} />
          </button>
        </div>
        <p className="text-center text-xs text-txt-muted mt-2">NeuralAI can make mistakes. Consider verifying important information.</p>
      </div>
    </div>
  );
}
