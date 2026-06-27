import type { ChatbotConfig, ChatIntent } from './knowledge';

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  text: string;
  links?: { label: string; href: string }[];
  quickReplies?: string[];
  showLeadForm?: boolean;
  time: number;
}

const STOP = new Set([
  'a',
  'an',
  'the',
  'is',
  'are',
  'was',
  'were',
  'be',
  'to',
  'of',
  'in',
  'on',
  'for',
  'and',
  'or',
  'do',
  'does',
  'did',
  'can',
  'you',
  'me',
  'my',
  'i',
  'we',
  'it',
  'this',
  'that',
  'what',
  'how',
  'about',
  'with',
  'from',
  'at',
  'by',
  'your',
  'raymond',
  'king',
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP.has(w));
}

/** Score how well a user message matches an intent's keywords. */
function scoreIntent(message: string, intent: ChatIntent): number {
  const lower = message.toLowerCase();
  let score = 0;

  for (const kw of intent.keywords) {
    if (lower.includes(kw)) score += kw.includes(' ') ? 4 : 2;
  }

  const tokens = tokenize(message);
  for (const token of tokens) {
    if (intent.keywords.some((kw) => kw === token || kw.includes(token))) score += 1;
  }

  return score;
}

export function matchIntent(message: string, config: ChatbotConfig): ChatIntent | null {
  const trimmed = message.trim();
  if (!trimmed) return null;

  let best: ChatIntent | null = null;
  let bestScore = 0;

  for (const intent of config.intents) {
    const s = scoreIntent(trimmed, intent);
    if (s > bestScore) {
      bestScore = s;
      best = intent;
    }
  }

  return bestScore >= 2 ? best : null;
}

export function intentToMessage(intent: ChatIntent): ChatMessage {
  return {
    id: `bot-${Date.now()}`,
    role: 'bot',
    text: intent.response,
    links: intent.links,
    quickReplies: intent.quickReplies,
    showLeadForm: intent.leadCapture,
    time: Date.now(),
  };
}

export function userMessage(text: string): ChatMessage {
  return {
    id: `user-${Date.now()}`,
    role: 'user',
    text: text.trim(),
    time: Date.now(),
  };
}

export function botReply(text: string, extras?: Partial<ChatMessage>): ChatMessage {
  return {
    id: `bot-${Date.now()}`,
    role: 'bot',
    text,
    time: Date.now(),
    ...extras,
  };
}

export function respond(message: string, config: ChatbotConfig): ChatMessage {
  const quick = config.quickStart.find(
    (q) => q.toLowerCase() === message.trim().toLowerCase(),
  );
  if (quick) {
    const intent = matchIntent(quick, config);
    if (intent) return intentToMessage(intent);
  }

  if (/^share my project/i.test(message)) {
    return botReply(
      `Great — fill in a few details below and I'll open an email draft to Raymond with everything included. Or email him directly at ${config.email}.`,
      { showLeadForm: true },
    );
  }

  const intent = matchIntent(message, config);
  if (intent) return intentToMessage(intent);

  return botReply(config.fallback, {
    quickReplies: config.quickStart,
  });
}

export function greetingMessage(config: ChatbotConfig): ChatMessage {
  return botReply(config.greeting, { quickReplies: config.quickStart });
}
