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

/** Light stem: drop a trailing plural/possessive 's' so "demos" ~ "demo". */
function stem(word: string): string {
  return word.length > 4 && word.endsWith('s') ? word.slice(0, -1) : word;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP.has(w))
    .map(stem);
}

const MATCH_THRESHOLD = 2;

/**
 * Score how well a user message matches an intent. Combines exact phrase
 * matches (strongest), keyword token overlap, and fuzzy overlap against the
 * intent's example questions so natural-language phrasing still routes well.
 */
function scoreIntent(message: string, intent: ChatIntent): number {
  const lower = message.toLowerCase();
  let score = 0;

  for (const kw of intent.keywords) {
    if (lower.includes(kw)) score += kw.includes(' ') ? 4 : 2;
  }

  const tokens = tokenize(message);
  const keywordTokens = new Set(intent.keywords.flatMap((kw) => tokenize(kw)));
  for (const token of tokens) {
    for (const kt of keywordTokens) {
      if (kt === token) {
        score += 1;
        break;
      }
      // prefix overlap catches typos / variants ("automat" ~ "automation")
      if ((kt.length >= 4 && token.startsWith(kt)) || (token.length >= 4 && kt.startsWith(token))) {
        score += 0.5;
        break;
      }
    }
  }

  // Fuzzy overlap against example questions (Jaccard-style token similarity).
  if (intent.questions?.length && tokens.length) {
    const userSet = new Set(tokens);
    let bestSim = 0;
    for (const q of intent.questions) {
      const qTokens = tokenize(q);
      if (!qTokens.length) continue;
      let shared = 0;
      for (const qt of qTokens) if (userSet.has(qt)) shared += 1;
      const sim = shared / Math.max(qTokens.length, userSet.size);
      if (sim > bestSim) bestSim = sim;
    }
    score += bestSim * 4;
  }

  return score;
}

/** Rank all intents by score (highest first), regardless of threshold. */
function rankIntents(message: string, config: ChatbotConfig): { intent: ChatIntent; score: number }[] {
  return config.intents
    .map((intent) => ({ intent, score: scoreIntent(message, intent) }))
    .sort((a, b) => b.score - a.score);
}

export function matchIntent(message: string, config: ChatbotConfig): ChatIntent | null {
  const trimmed = message.trim();
  if (!trimmed) return null;

  const [top] = rankIntents(trimmed, config);
  return top && top.score >= MATCH_THRESHOLD ? top.intent : null;
}

/** Closest intents (as suggestion labels) for when nothing clears the threshold. */
export function suggestLabels(message: string, config: ChatbotConfig, n = 4): string[] {
  const trimmed = message.trim();
  const ranked = trimmed ? rankIntents(trimmed, config) : [];
  const labels = ranked
    .filter((r) => r.score > 0 && r.intent.label)
    .slice(0, n)
    .map((r) => r.intent.label as string);
  return labels.length ? labels : config.quickStart;
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
    quickReplies: suggestLabels(message, config),
  });
}

export function greetingMessage(config: ChatbotConfig): ChatMessage {
  return botReply(config.greeting, { quickReplies: config.quickStart });
}
