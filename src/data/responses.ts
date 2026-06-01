const AI_RESPONSES = [
  "I've analyzed your query thoroughly. Based on advanced neural processing, here's what I found: The patterns in your data suggest a multi-layered approach would yield the best results. I can elaborate on any specific aspect you'd like to explore further.",
  "Great question! My reasoning engine has evaluated multiple pathways. The optimal solution involves three key components: first, establishing a solid foundation; second, implementing iterative refinements; and third, continuously monitoring outcomes for adjustment.",
  "I understand what you're asking. Let me break this down systematically. The core issue here relates to how we frame the problem — once we reframe it correctly, the solution space becomes much clearer and actionable.",
  "Fascinating! This touches on some deeply interconnected concepts. My knowledge synthesis indicates that the answer lies at the intersection of several domains. Would you like me to dive deeper into any particular area?",
  "Absolutely. I've cross-referenced this across multiple knowledge domains. The evidence strongly suggests a nuanced approach is warranted here. Let me walk you through my reasoning step by step.",
  "That's a thought-provoking question. From my analysis, there are at least four distinct perspectives worth considering. Each reveals a different facet of the problem, and together they paint a comprehensive picture.",
  "I've processed your input carefully. The most effective strategy here would be to tackle this incrementally — starting with the highest-impact elements and working systematically toward the more complex aspects.",
  "Interesting point! My contextual understanding suggests this is more nuanced than it appears on the surface. There are several underlying assumptions worth examining before we arrive at a confident conclusion.",
];

export function getRandomResponse(): string {
  return AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
}

export function generateChatTitle(msg: string): string {
  const words = msg.split(' ').slice(0, 5).join(' ');
  return words.length < msg.length ? `${words}...` : words;
}
