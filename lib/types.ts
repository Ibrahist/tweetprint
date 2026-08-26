export type CardTheme = "light" | "dark";

export type BackgroundKind = "solid" | "gradient" | "transparent";

export interface BackgroundOption {
  id: string;
  label: string;
  kind: BackgroundKind;
  /** CSS `background` value for solid/gradient kinds. Unused for transparent. */
  css?: string;
  /** Small swatch shown in the picker; falls back to `css`. */
  swatch?: string;
}

export interface TweetData {
  displayName: string;
  handle: string;
  verified: boolean;
  avatarUrl: string; // data URL, remote URL, or "" for initials fallback
  text: string;
  mediaUrl: string; // optional attached image, "" for none
  dateLabel: string; // e.g. "Aug 26, 2026"
  timeLabel: string; // e.g. "10:14 AM"
  replies: number;
  retweets: number;
  likes: number;
  views: number;
}

export interface StyleOptions {
  cardTheme: CardTheme;
  backgroundId: string;
  padding: number; // px, applied around the card inside the frame
  cardRadius: number; // px
  frameRadius: number; // px
  shadow: boolean;
  showStats: boolean;
  showWatermark: boolean;
  pixelRatio: 1 | 2 | 3;
  fileFormat: "png" | "jpeg";
}

export const DEFAULT_TWEET: TweetData = {
  displayName: "Ada Lovelace",
  handle: "adalovelace",
  verified: true,
  avatarUrl: "",
  text: "The Analytical Engine has no pretensions whatever to originate anything. It can do whatever we know how to order it to perform.",
  mediaUrl: "",
  dateLabel: "Aug 26, 2026",
  timeLabel: "10:14 AM",
  replies: 412,
  retweets: 2300,
  likes: 18900,
  views: 482000,
};

export const DEFAULT_STYLE: StyleOptions = {
  cardTheme: "light",
  backgroundId: "blueprint",
  padding: 64,
  cardRadius: 20,
  frameRadius: 0,
  shadow: true,
  showStats: true,
  showWatermark: false,
  pixelRatio: 2,
  fileFormat: "png",
};

export const BACKGROUND_OPTIONS: BackgroundOption[] = [
  { id: "transparent", label: "Transparent", kind: "transparent" },
  { id: "blueprint", label: "Blueprint", kind: "solid", css: "#123157" },
  { id: "paper", label: "Paper", kind: "solid", css: "#eae7db" },
  { id: "ink", label: "Ink", kind: "solid", css: "#101522" },
  {
    id: "dusk",
    label: "Dusk",
    kind: "gradient",
    css: "linear-gradient(135deg, #2a1a4a 0%, #6b3a6f 55%, #e2531f 100%)",
    swatch: "linear-gradient(135deg, #2a1a4a, #e2531f)",
  },
  {
    id: "cyanotype",
    label: "Cyanotype",
    kind: "gradient",
    css: "linear-gradient(135deg, #0a2340 0%, #2f6fa6 100%)",
    swatch: "linear-gradient(135deg, #0a2340, #2f6fa6)",
  },
  {
    id: "meadow",
    label: "Meadow",
    kind: "gradient",
    css: "linear-gradient(135deg, #1f4d3a 0%, #7fa650 100%)",
    swatch: "linear-gradient(135deg, #1f4d3a, #7fa650)",
  },
  {
    id: "brass",
    label: "Brass",
    kind: "gradient",
    css: "linear-gradient(135deg, #4a3418 0%, #b6935f 100%)",
    swatch: "linear-gradient(135deg, #4a3418, #b6935f)",
  },
];
