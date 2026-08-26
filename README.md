# Tweetprint

Turn a tweet into a picture — write one from scratch or paste a URL, style the
frame, and export a crisp PNG or JPEG. Built with Next.js (App Router),
TypeScript, and Tailwind CSS v4.

No API keys, no login, no server-side account needed. Everything renders in
your browser; the only network call is an optional server-side lookup when
you paste a tweet URL.

## Features

- **Write manually** — display name, handle, verified badge, avatar (upload
  or URL), tweet text, an optional attached image, date/time label, and
  reply/retweet/like/view counts.
- **Paste a tweet URL** — a route handler (`app/api/tweet/route.ts`) calls
  X's public oEmbed endpoint server-side (avoids CORS, needs no API key) and
  pre-fills the tweet text and author. X's public oEmbed feed doesn't expose
  avatars, media, or engagement counts, so those stay editable by hand.
- **Frame styling** — light/dark card theme, 8 background presets (solid,
  gradient, or transparent), adjustable padding, card corner radius, frame
  corner radius, drop shadow, and an optional watermark.
- **Export** — PNG or JPEG at 1×/2×/3× scale, downloaded straight from the
  browser via [`html-to-image`](https://github.com/bubkoo/html-to-image). A
  "Copy to clipboard" button appears in browsers that support the Clipboard
  Images API.
- A live dimension readout shows the exact output pixel size before you
  export.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Building for production

```bash
npm run build
npm run start
```

## Project structure

```
app/
  page.tsx              — header + the Studio workspace
  layout.tsx             — fonts (Space Grotesk / Inter / IBM Plex Mono) & metadata
  api/tweet/route.ts      — server-side oEmbed lookup for "Paste URL"
components/
  Studio.tsx              — state, the proofing-table canvas, export/copy pipeline
  ControlPanel.tsx        — the spec-sheet form (source, author, message, frame, export)
  TweetCard.tsx           — the tweet visual itself (light/dark, faithful to X's layout)
  ui.tsx                  — shared form primitives (Section, Field, Slider, Toggle, …)
  icons.tsx               — hand-drawn SVG icon set
lib/
  types.ts                — TweetData / StyleOptions / background presets
  format.ts                — count formatting (1.2K), initials avatar, text segmenting
```

## Notes on the tweet-URL import

X's public `publish.twitter.com/oembed` endpoint is unauthenticated and
intentionally limited — it returns an embeddable HTML snippet with the tweet
text and author name, not a full API response. This app parses that snippet
server-side to best-effort prefill the text and author fields. It cannot
retrieve avatars, attached media, exact counts, or the original date/time,
since X does not expose those without an authenticated API. If you need
that data, editing it by hand after import is expected, not a bug.

## Deploying

The app is a standard Next.js project and deploys to any Next.js-compatible
host (Vercel, Netlify, a Node server, etc.) with no environment variables
required.

## License

MIT — do whatever you'd like with this.
