import { useState, useRef, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import ChatHeader from './components/ChatHeader';
import MessageBubble from './components/MessageBubble';
import TypingIndicator from './components/TypingIndicator';
import ChatInput from './components/ChatInput';
import EmptyState from './components/EmptyState';
import ParticlesBackground from './components/ParticlesBackground';
import type { Chat, Message } from './types';
import { getRandomResponse, generateChatTitle } from './data/responses';

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function App() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeIdRef = useRef<string | null>(null);

  const activeChat = chats.find(c => c.id === activeChatId) ?? null;

  useEffect(() => { activeIdRef.current = activeChatId; }, [activeChatId]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages.length, isTyping, scrollToBottom]);

  const handleSend = useCallback((content: string) => {
    const userMsg: Message = { id: uid(), role: 'user', content, timestamp: new Date() };
    let newChatId: string | null = null;

    setChats(prev => {
      const curId = activeIdRef.current;
      if (!curId) {
        const chat: Chat = {
          id: uid(),
          title: generateChatTitle(content),
          lastMessage: content,
          timestamp: new Date(),
          messages: [userMsg],
        };
        newChatId = chat.id;
        return [chat, ...prev];
      }
      return prev.map(c => c.id === curId ? { ...c, messages: [...c.messages, userMsg], lastMessage: content, timestamp: new Date() } : c);
    });

    if (newChatId) {
      setActiveChatId(newChatId);
      activeIdRef.current = newChatId;
    }

    setIsTyping(true);
    const delay = 1200 + Math.random() * 1200;

    setTimeout(() => {
      const aiMsg: Message = { id: uid(), role: 'assistant', content: getRandomResponse(), timestamp: new Date() };
      setChats(prev => prev.map(c => c.id === activeIdRef.current ? { ...c, messages: [...c.messages, aiMsg], lastMessage: aiMsg.content, timestamp: new Date() } : c));
      setIsTyping(false);
    }, delay);
  }, []);

  const handleNewChat = useCallback(() => {
    setActiveChatId(null);
    setSidebarOpen(false);
  }, []);

  const handleDeleteChat = useCallback((id: string) => {
    setChats(prev => prev.filter(c => c.id !== id));
    if (activeChatId === id) setActiveChatId(null);
  }, [activeChatId]);

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-bg-primary">
      <ParticlesBackground />

      {/* Gradient orbs */}
      <div className="fixed pointer-events-none z-0" style={{ width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', top: -200, right: -100 }} />
      <div className="fixed pointer-events-none z-0" style={{ width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)', bottom: -150, left: -100 }} />

      <Sidebar chats={chats} activeChatId={activeChatId} onNewChat={handleNewChat} onSelectChat={setActiveChatId} onDeleteChat={handleDeleteChat} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="relative flex flex-col flex-1 min-w-0 h-full z-10">
        <ChatHeader onToggleSidebar={() => setSidebarOpen(o => !o)} currentChatTitle={activeChat?.title ?? null} />

        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {!activeChat || activeChat.messages.length === 0 ? (
            <EmptyState onSuggestion={handleSend} />
          ) : (
            <div className="max-w-3xl mx-auto py-4 space-y-1">
              {activeChat.messages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          )}
        </div>

        <ChatInput onSend={handleSend} disabled={isTyping} />
      </main>
    </div>
  );
}
