"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { toPng, toJpeg, toBlob } from "html-to-image";
import {
  DEFAULT_TWEET,
  DEFAULT_STYLE,
  BACKGROUND_OPTIONS,
  type TweetData,
  type StyleOptions,
} from "@/lib/types";
import TweetCard from "./TweetCard";
import ControlPanel, { type SourceTab, type ImportState } from "./ControlPanel";
import { RegistrationMark } from "./icons";

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function subscribeNoop() {
  return () => {};
}
function getClipboardSupport() {
  return (
    typeof navigator !== "undefined" &&
    !!navigator.clipboard &&
    typeof window.ClipboardItem !== "undefined"
  );
}
function getClipboardSupportServer() {
  return false;
}

export default function Studio() {
  const [tweet, setTweet] = useState<TweetData>(DEFAULT_TWEET);
  const [styleOpts, setStyleOpts] = useState<StyleOptions>(DEFAULT_STYLE);

  const [sourceTab, setSourceTab] = useState<SourceTab>("manual");
  const [importUrl, setImportUrl] = useState("");
  const [importState, setImportState] = useState<ImportState>("idle");
  const [importMessage, setImportMessage] = useState("");

  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const copySupported = useSyncExternalStore(
    subscribeNoop,
    getClipboardSupport,
    getClipboardSupportServer,
  );
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const [measured, setMeasured] = useState({ w: 0, h: 0 });

  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = frameRef.current;
    if (!node || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setMeasured({
        w: Math.round(entry.contentRect.width),
        h: Math.round(entry.contentRect.height),
      });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const updateTweet = useCallback((patch: Partial<TweetData>) => {
    setTweet((prev) => ({ ...prev, ...patch }));
  }, []);

  const updateStyle = useCallback((patch: Partial<StyleOptions>) => {
    setStyleOpts((prev) => ({ ...prev, ...patch }));
  }, []);

  const handleImport = useCallback(async () => {
    if (!importUrl.trim()) return;
    setImportState("loading");
    setImportMessage("");
    try {
      const res = await fetch(`/api/tweet?url=${encodeURIComponent(importUrl.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        setImportState("error");
        setImportMessage(data.error ?? "Couldn't import that post.");
        return;
      }
      updateTweet({
        text: data.text || tweet.text,
        displayName: data.displayName || tweet.displayName,
        handle: data.handle || tweet.handle,
      });
      setImportState("success");
      setImportMessage(data.note ?? "Imported. Fill in anything still missing below.");
    } catch {
      setImportState("error");
      setImportMessage("Network error reaching the import endpoint.");
    }
  }, [importUrl, tweet.text, tweet.displayName, tweet.handle, updateTweet]);

  const onAvatarFile = useCallback(
    async (file: File) => updateTweet({ avatarUrl: await fileToDataUrl(file) }),
    [updateTweet],
  );
  const onMediaFile = useCallback(
    async (file: File) => updateTweet({ mediaUrl: await fileToDataUrl(file) }),
    [updateTweet],
  );

  const captureOptions = useCallback(() => {
    const isJpeg = styleOpts.fileFormat === "jpeg";
    const needsFallbackBg = isJpeg && styleOpts.backgroundId === "transparent";
    return {
      pixelRatio: styleOpts.pixelRatio,
      cacheBust: true,
      backgroundColor: needsFallbackBg ? "#ffffff" : undefined,
    };
  }, [styleOpts.fileFormat, styleOpts.pixelRatio, styleOpts.backgroundId]);

  const handleExport = useCallback(async () => {
    if (!frameRef.current) return;
    setExporting(true);
    setExportError(null);
    try {
      const isJpeg = styleOpts.fileFormat === "jpeg";
      const dataUrl = isJpeg
        ? await toJpeg(frameRef.current, { ...captureOptions(), quality: 0.95 })
        : await toPng(frameRef.current, captureOptions());
      const link = document.createElement("a");
      link.download = `tweetprint-${tweet.handle || "export"}-${Date.now()}.${
        isJpeg ? "jpg" : "png"
      }`;
      link.href = dataUrl;
      link.click();
    } catch {
      setExportError(
        "Export failed — this usually happens with a remote avatar/media URL blocking canvas access. Try the Upload button instead of a URL.",
      );
    } finally {
      setExporting(false);
    }
  }, [captureOptions, styleOpts.fileFormat, tweet.handle]);

  const handleCopy = useCallback(async () => {
    if (!frameRef.current) return;
    try {
      const blob = await toBlob(frameRef.current, captureOptions());
      if (!blob) throw new Error("no blob");
      await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      setCopyState("error");
      setTimeout(() => setCopyState("idle"), 3000);
    }
  }, [captureOptions]);

  const bgOption =
    BACKGROUND_OPTIONS.find((o) => o.id === styleOpts.backgroundId) ?? BACKGROUND_OPTIONS[0];

  const frameStyle: React.CSSProperties = {
    borderRadius: styleOpts.frameRadius,
    padding: styleOpts.padding,
    position: "relative",
    ...(bgOption.kind === "solid" ? { backgroundColor: bgOption.css } : {}),
    ...(bgOption.kind === "gradient" ? { backgroundImage: bgOption.css } : {}),
  };

  const outputW = Math.round(measured.w * styleOpts.pixelRatio);
  const outputH = Math.round(measured.h * styleOpts.pixelRatio);

  return (
    <div className="grid lg:grid-cols-[400px_1fr] gap-6 lg:gap-8 items-start">
      {/* Spec sheet panel */}
      <div className="bg-paper rounded-xl border border-paper-line px-5 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">
        <ControlPanel
          tweet={tweet}
          onTweetChange={updateTweet}
          styleOpts={styleOpts}
          onStyleChange={updateStyle}
          sourceTab={sourceTab}
          onSourceTabChange={setSourceTab}
          importUrl={importUrl}
          onImportUrlChange={setImportUrl}
          onImport={handleImport}
          importState={importState}
          importMessage={importMessage}
          onAvatarFile={onAvatarFile}
          onRemoveAvatar={() => updateTweet({ avatarUrl: "" })}
          onMediaFile={onMediaFile}
          onRemoveMedia={() => updateTweet({ mediaUrl: "" })}
          onExport={handleExport}
          exporting={exporting}
          exportError={exportError}
          copySupported={copySupported}
          onCopy={handleCopy}
          copyState={copyState}
        />
      </div>

      {/* Proofing table */}
      <div className="flex flex-col gap-3">
        <div className="relative rounded-xl border border-blueprint-line-strong bg-blueprint blueprint-grid overflow-hidden">
          <RegistrationMark className="absolute top-3 left-3 w-6 h-6 text-paper-on-blue-soft pointer-events-none" />
          <RegistrationMark className="absolute top-3 right-3 w-6 h-6 text-paper-on-blue-soft pointer-events-none" />
          <RegistrationMark className="absolute bottom-3 left-3 w-6 h-6 text-paper-on-blue-soft pointer-events-none" />
          <RegistrationMark className="absolute bottom-3 right-3 w-6 h-6 text-paper-on-blue-soft pointer-events-none" />

          <div className="min-h-[420px] flex items-center justify-center p-10 sm:p-16">
            <div
              className={
                bgOption.kind === "transparent"
                  ? "rounded-[inherit]"
                  : "rounded-[inherit] shadow-2xl"
              }
              style={
                bgOption.kind === "transparent"
                  ? {
                      backgroundImage:
                        "repeating-conic-gradient(#cfcabb 0% 25%, #f7f5ef 0% 50%)",
                      backgroundSize: "16px 16px",
                      borderRadius: styleOpts.frameRadius,
                    }
                  : undefined
              }
            >
              <div ref={frameRef} style={frameStyle}>
                <TweetCard data={tweet} style={styleOpts} />
                {styleOpts.showWatermark && (
                  <span className="absolute bottom-3 right-4 font-mono text-[10px] tracking-wide text-white/70 bg-black/25 px-2 py-1 rounded-full backdrop-blur-sm">
                    tweetprint.app
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between font-mono text-[11px] text-paper-on-blue-soft tracking-[0.08em] uppercase px-1">
          <span>
            {measured.w} × {measured.h} px rendered
          </span>
          <span>
            {outputW} × {outputH} px output · {styleOpts.pixelRatio}×{" "}
            {styleOpts.fileFormat.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
