import { Menu, MoreHorizontal, Share2, Bookmark } from 'lucide-react';

interface Props {
  onToggleSidebar: () => void;
  currentChatTitle: string | null;
}

export default function ChatHeader({ onToggleSidebar, currentChatTitle }: Props) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-white/6 bg-bg-primary/80 backdrop-blur-sm flex-shrink-0 z-10">
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="lg:hidden p-2 rounded-xl text-txt-secondary hover:text-txt-primary hover:bg-white/10 transition-all">
          <Menu size={18} />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center ai-glow">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="white" />
              </svg>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-bg-primary online-pulse" />
          </div>
          <div>
            <h1 className="font-semibold text-txt-primary text-sm leading-none">{currentChatTitle ?? 'NeuralAI Agent'}</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs text-green-400 font-medium">Online</span>
              <span className="text-xs text-txt-muted">· GPT-4 Turbo</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button className="p-2 rounded-xl text-txt-secondary hover:text-txt-primary hover:bg-white/10 transition-all"><Bookmark size={16} /></button>
        <button className="p-2 rounded-xl text-txt-secondary hover:text-txt-primary hover:bg-white/10 transition-all"><Share2 size={16} /></button>
        <button className="p-2 rounded-xl text-txt-secondary hover:text-txt-primary hover:bg-white/10 transition-all"><MoreHorizontal size={16} /></button>
      </div>
    </header>
  );
}
