import { NextRequest, NextResponse } from "next/server";
import { htmlToPlainText } from "@/lib/format";

export const dynamic = "force-dynamic";

const TWEET_URL_PATTERN =
  /^https?:\/\/(www\.)?(twitter|x)\.com\/([A-Za-z0-9_]{1,15})\/status(es)?\/(\d+)/i;

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")?.trim();

  if (!url) {
    return NextResponse.json({ error: "Missing ?url= parameter." }, { status: 400 });
  }

  const match = url.match(TWEET_URL_PATTERN);
  if (!match) {
    return NextResponse.json(
      { error: "That doesn't look like a twitter.com or x.com status URL." },
      { status: 400 },
    );
  }
  const urlHandle = match[3];

  const oembedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(
    url,
  )}&omit_script=true&dnt=true`;

  let upstream: Response;
  try {
    upstream = await fetch(oembedUrl, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { error: "Couldn't reach X's oEmbed service. Check the URL and try again." },
      { status: 502 },
    );
  }

  if (upstream.status === 404) {
    return NextResponse.json(
      { error: "X couldn't find that post — it may be deleted, private, or age-restricted." },
      { status: 404 },
    );
  }
  if (!upstream.ok) {
    return NextResponse.json(
      { error: `X's oEmbed service returned an error (${upstream.status}).` },
      { status: 502 },
    );
  }

  const payload = (await upstream.json()) as {
    html?: string;
    author_name?: string;
    author_url?: string;
  };

  if (!payload.html) {
    return NextResponse.json(
      { error: "X returned an unexpected response for that post." },
      { status: 502 },
    );
  }

  // The oEmbed HTML looks like:
  // <blockquote><p ...>TEXT</p>&mdash; Author Name (@handle) <a href="...">Date</a></blockquote>
  const paragraphMatch = payload.html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  const text = paragraphMatch ? htmlToPlainText(paragraphMatch[1]) : "";

  const handleMatch = payload.html.match(/\(@([A-Za-z0-9_]+)\)/);
  const handle = handleMatch ? handleMatch[1] : urlHandle;

  return NextResponse.json({
    text,
    displayName: payload.author_name ?? handle,
    handle,
    sourceUrl: url,
    note: "Avatar, media, date, and engagement counts aren't exposed by X's public oEmbed feed — fill those in below.",
  });
}
