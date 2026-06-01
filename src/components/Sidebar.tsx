import { Plus, MessageSquare, Settings, ChevronRight, Trash2, Search, Zap, X } from 'lucide-react';
import { useState } from 'react';
import type { Chat } from '../types';

interface Props {
  chats: Chat[];
  activeChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

function relTime(d: Date): string {
  const mins = Math.floor((Date.now() - d.getTime()) / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const h = Math.floor(mins / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function Sidebar({ chats, activeChatId, onNewChat, onSelectChat, onDeleteChat, isOpen, onClose }: Props) {
  const [search, setSearch] = useState('');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = chats.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.lastMessage.toLowerCase().includes(search.toLowerCase()));
  const now = Date.now();
  const today = filtered.filter(c => now - c.timestamp.getTime() < 86400000);
  const older = filtered.filter(c => now - c.timestamp.getTime() >= 86400000);

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 lg:hidden" onClick={onClose} />}

      <aside className={`fixed top-0 left-0 h-full w-72 z-30 flex flex-col bg-bg-secondary border-r border-white/6 sidebar-transition ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 lg:flex`}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center" style={{ boxShadow: '0 0 15px rgba(59,130,246,0.3)' }}>
              <Zap size={16} className="text-white" />
            </div>
            <div>
              <span className="font-bold text-txt-primary text-sm tracking-wide">NeuralAI</span>
              <div className="text-xs text-txt-muted">Pro · GPT-4 Turbo</div>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg text-txt-secondary hover:text-txt-primary hover:bg-white/10 transition-all"><X size={16} /></button>
        </div>

        {/* New Chat */}
        <div className="px-3 py-3">
          <button onClick={() => { onNewChat(); onClose(); }} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 gradient-btn text-white text-sm font-semibold rounded-xl">
            <Plus size={16} /> New Chat
          </button>
        </div>

        {/* Search */}
        <div className="px-3 pb-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/6">
            <Search size={14} className="text-txt-muted flex-shrink-0" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search chats..." className="flex-1 bg-transparent text-sm text-txt-primary placeholder-txt-muted focus:outline-none" />
          </div>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-3 pb-4">
          {filtered.length === 0 && <div className="text-center py-8 text-txt-muted text-sm">{search ? 'No chats found' : 'No conversations yet'}</div>}
          {today.length > 0 && <ChatGroup label="Today" chats={today} activeChatId={activeChatId} hoveredId={hoveredId} setHoveredId={setHoveredId} onSelectChat={id => { onSelectChat(id); onClose(); }} onDeleteChat={onDeleteChat} />}
          {older.length > 0 && <ChatGroup label="Earlier" chats={older} activeChatId={activeChatId} hoveredId={hoveredId} setHoveredId={setHoveredId} onSelectChat={id => { onSelectChat(id); onClose(); }} onDeleteChat={onDeleteChat} />}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/6 px-3 py-3 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-txt-secondary hover:text-txt-primary hover:bg-white/8 transition-all text-sm group">
            <Settings size={16} /><span>Settings</span><ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/8 transition-all cursor-pointer group">
            <div className="relative flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 border border-white/10 flex items-center justify-center text-sm font-semibold text-white/90">U</div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-bg-secondary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-txt-primary leading-none truncate">User</p>
              <p className="text-xs text-txt-muted mt-0.5 truncate">Pro Plan</p>
            </div>
            <ChevronRight size={14} className="text-txt-muted opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </aside>
    </>
  );
}

interface GroupProps {
  label: string;
  chats: Chat[];
  activeChatId: string | null;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
}

function ChatGroup({ label, chats, activeChatId, hoveredId, setHoveredId, onSelectChat, onDeleteChat }: GroupProps) {
  return (
    <div className="mb-4">
      <p className="text-xs font-semibold text-txt-muted uppercase tracking-wider px-3 mb-2 mt-2">{label}</p>
      <div className="space-y-0.5">
        {chats.map(chat => (
          <div key={chat.id} className={`relative flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 group ${activeChatId === chat.id ? 'bg-blue-500/15 border border-blue-500/25' : 'hover:bg-white/6 border border-transparent'}`} onClick={() => onSelectChat(chat.id)} onMouseEnter={() => setHoveredId(chat.id)} onMouseLeave={() => setHoveredId(null)}>
            <div className={`flex-shrink-0 p-1.5 rounded-lg ${activeChatId === chat.id ? 'bg-blue-500/20 text-blue-400' : 'bg-white/6 text-txt-muted'}`}><MessageSquare size={13} /></div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate leading-none ${activeChatId === chat.id ? 'text-txt-primary' : 'text-txt-secondary'}`}>{chat.title}</p>
              <p className="text-xs text-txt-muted truncate mt-0.5">{relTime(chat.timestamp)}</p>
            </div>
            {hoveredId === chat.id && (
              <button onClick={e => { e.stopPropagation(); onDeleteChat(chat.id); }} className="flex-shrink-0 p-1 rounded-lg text-txt-muted hover:text-red-400 hover:bg-red-400/10 transition-all"><Trash2 size={13} /></button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
