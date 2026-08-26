/** Formats a count the way X does: 999, 1.2K, 3.4M, 1.1B */
export function formatCount(n: number): string {
  if (!Number.isFinite(n) || n < 0) return "0";
  if (n < 1000) return String(Math.round(n));

  const units: [number, string][] = [
    [1_000_000_000, "B"],
    [1_000_000, "M"],
    [1_000, "K"],
  ];

  for (const [value, suffix] of units) {
    if (n >= value) {
      const num = n / value;
      // one decimal place, but drop trailing ".0"
      const rounded = Math.round(num * 10) / 10;
      return `${rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1)}${suffix}`;
    }
  }
  return String(n);
}

/** Derives two-letter initials from a display name for the fallback avatar. */
export function initialsFor(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Deterministic accent color for the initials avatar, derived from the handle/name. */
export function colorFor(seed: string): string {
  const palette = [
    "#123157",
    "#e2531f",
    "#1f4d3a",
    "#6b3a6f",
    "#b6935f",
    "#2f6fa6",
    "#8b2e2e",
    "#3f5c3f",
  ];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return palette[hash % palette.length];
}

/** Splits tweet text into plain / mention / hashtag / link segments for lightweight styling. */
export interface TextSegment {
  text: string;
  kind: "plain" | "entity";
}

export function segmentTweetText(text: string): TextSegment[] {
  const pattern = /((https?:\/\/\S+)|(@\w+)|(#\w+))/g;
  const segments: TextSegment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index), kind: "plain" });
    }
    segments.push({ text: match[0], kind: "entity" });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), kind: "plain" });
  }
  return segments;
}

/** Strips HTML tags from the oEmbed snippet, keeping line breaks as \n. */
export function htmlToPlainText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, "—")
    .replace(/[ \t]+\n/g, "\n")
    .trim();
}
