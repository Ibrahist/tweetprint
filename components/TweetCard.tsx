import type { TweetData, StyleOptions } from "@/lib/types";
import { formatCount, initialsFor, colorFor, segmentTweetText } from "@/lib/format";
import { ReplyIcon, RetweetIcon, HeartIcon, ViewsIcon, ShareIcon, VerifiedIcon } from "./icons";

interface TweetCardProps {
  data: TweetData;
  style: Pick<StyleOptions, "cardTheme" | "cardRadius" | "shadow" | "showStats">;
}

export default function TweetCard({ data, style }: TweetCardProps) {
  const dark = style.cardTheme === "dark";

  const bg = dark ? "#000000" : "#ffffff";
  const text = dark ? "#e7e9ea" : "#0f1419";
  const subtext = dark ? "#71767b" : "#536471";
  const divider = dark ? "#2f3336" : "#eff3f4";
  const entityColor = "#1d9bf0";

  const segments = segmentTweetText(data.text || "");

  return (
    <div
      className="w-full max-w-[560px] mx-auto"
      style={{
        background: bg,
        color: text,
        borderRadius: style.cardRadius,
        boxShadow: style.shadow ? "0 24px 48px -12px rgba(10, 20, 40, 0.45)" : "none",
        padding: "22px 24px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      {/* Header: avatar, name, handle */}
      <div className="flex items-start gap-3">
        {data.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.avatarUrl}
            alt=""
            className="w-12 h-12 rounded-full object-cover shrink-0"
            crossOrigin="anonymous"
          />
        ) : (
          <div
            className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center text-white font-semibold text-[15px]"
            style={{ background: colorFor(data.handle || data.displayName || "x") }}
          >
            {initialsFor(data.displayName || "?")}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 flex-wrap leading-tight">
            <span className="font-bold text-[15px] truncate" style={{ color: text }}>
              {data.displayName || "Display Name"}
            </span>
            {data.verified && <VerifiedIcon className="w-[18px] h-[18px] shrink-0" />}
          </div>
          <div className="text-[15px] leading-tight truncate" style={{ color: subtext }}>
            @{data.handle || "handle"}
          </div>
        </div>
      </div>

      {/* Tweet text */}
      {data.text && (
        <div
          className="mt-3 text-[17px] leading-[1.4] whitespace-pre-wrap break-words"
          style={{ color: text }}
        >
          {segments.map((seg, i) =>
            seg.kind === "entity" ? (
              <span key={i} style={{ color: entityColor }}>
                {seg.text}
              </span>
            ) : (
              <span key={i}>{seg.text}</span>
            ),
          )}
        </div>
      )}

      {/* Attached media */}
      {data.mediaUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={data.mediaUrl}
          alt=""
          className="mt-3 w-full max-h-[420px] object-cover rounded-2xl border"
          style={{ borderColor: divider }}
          crossOrigin="anonymous"
        />
      )}

      {/* Meta line */}
      <div className="mt-3 text-[15px] flex flex-wrap items-center gap-1" style={{ color: subtext }}>
        <span>{data.timeLabel}</span>
        <span>·</span>
        <span>{data.dateLabel}</span>
        {data.views > 0 && (
          <>
            <span>·</span>
            <span>
              <span className="font-semibold" style={{ color: text }}>
                {formatCount(data.views)}
              </span>{" "}
              Views
            </span>
          </>
        )}
      </div>

      {style.showStats && (
        <>
          <div className="mt-3 border-t" style={{ borderColor: divider }} />
          <div
            className="mt-3 flex items-center justify-between max-w-[420px]"
            style={{ color: subtext }}
          >
            <div className="flex items-center gap-1.5">
              <ReplyIcon className="w-[18px] h-[18px]" />
              <span className="text-[13px]">{formatCount(data.replies)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RetweetIcon className="w-[18px] h-[18px]" />
              <span className="text-[13px]">{formatCount(data.retweets)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HeartIcon className="w-[18px] h-[18px]" />
              <span className="text-[13px]">{formatCount(data.likes)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ViewsIcon className="w-[18px] h-[18px]" />
              <span className="text-[13px]">{formatCount(data.views)}</span>
            </div>
            <ShareIcon className="w-[18px] h-[18px]" />
          </div>
        </>
      )}
    </div>
  );
}
