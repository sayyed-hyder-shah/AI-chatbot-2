export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-fade-in px-4 py-2">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center ai-glow">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="white" />
        </svg>
      </div>
      <div className="glass rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}
