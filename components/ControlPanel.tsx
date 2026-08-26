"use client";

import { useRef } from "react";
import type { TweetData, StyleOptions, CardTheme } from "@/lib/types";
import { BACKGROUND_OPTIONS } from "@/lib/types";
import {
  Section,
  Field,
  TextInput,
  TextArea,
  NumberField,
  Slider,
  Toggle,
  SegmentedControl,
  StampButton,
} from "./ui";
import { SpinnerIcon } from "./icons";

export type SourceTab = "url" | "manual";
export type ImportState = "idle" | "loading" | "error" | "success";

interface ControlPanelProps {
  tweet: TweetData;
  onTweetChange: (patch: Partial<TweetData>) => void;
  styleOpts: StyleOptions;
  onStyleChange: (patch: Partial<StyleOptions>) => void;

  sourceTab: SourceTab;
  onSourceTabChange: (t: SourceTab) => void;
  importUrl: string;
  onImportUrlChange: (v: string) => void;
  onImport: () => void;
  importState: ImportState;
  importMessage: string;

  onAvatarFile: (file: File) => void;
  onRemoveAvatar: () => void;
  onMediaFile: (file: File) => void;
  onRemoveMedia: () => void;

  onExport: () => void;
  exporting: boolean;
  exportError: string | null;

  copySupported: boolean;
  onCopy: () => void;
  copyState: "idle" | "copied" | "error";
}

export default function ControlPanel({
  tweet,
  onTweetChange,
  styleOpts,
  onStyleChange,
  sourceTab,
  onSourceTabChange,
  importUrl,
  onImportUrlChange,
  onImport,
  importState,
  importMessage,
  onAvatarFile,
  onRemoveAvatar,
  onMediaFile,
  onRemoveMedia,
  onExport,
  exporting,
  exportError,
  copySupported,
  onCopy,
  copyState,
}: ControlPanelProps) {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const mediaInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col">
      {/* SOURCE */}
      <Section title="Source">
        <SegmentedControl
          options={[
            { value: "manual" as SourceTab, label: "Write manually" },
            { value: "url" as SourceTab, label: "Paste URL" },
          ]}
          value={sourceTab}
          onChange={onSourceTabChange}
        />

        {sourceTab === "url" ? (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <TextInput
                placeholder="https://x.com/username/status/…"
                value={importUrl}
                onChange={(e) => onImportUrlChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onImport()}
              />
              <StampButton
                variant="secondary"
                onClick={onImport}
                disabled={importState === "loading" || !importUrl.trim()}
              >
                {importState === "loading" ? (
                  <SpinnerIcon className="w-4 h-4" />
                ) : (
                  "Fetch"
                )}
              </StampButton>
            </div>
            {importMessage && (
              <p
                className={`text-[12px] leading-snug ${
                  importState === "error" ? "text-marker" : "text-ink-soft"
                }`}
              >
                {importMessage}
              </p>
            )}
          </div>
        ) : (
          <p className="text-[12px] text-ink-faint leading-snug">
            No account or API key needed — fill in the fields below and the
            preview updates live.
          </p>
        )}
      </Section>

      {/* AUTHOR */}
      <Section title="Author">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Display name">
            <TextInput
              value={tweet.displayName}
              onChange={(e) => onTweetChange({ displayName: e.target.value })}
            />
          </Field>
          <Field label="Handle">
            <TextInput
              value={tweet.handle}
              onChange={(e) =>
                onTweetChange({ handle: e.target.value.replace(/^@/, "") })
              }
            />
          </Field>
        </div>

        <div className="flex items-center justify-between gap-4">
          <Toggle
            checked={tweet.verified}
            onChange={(v) => onTweetChange({ verified: v })}
            label="Verified badge"
          />
        </div>

        <Field label="Avatar" hint="optional — initials shown otherwise">
          <div className="flex items-center gap-2">
            <TextInput
              placeholder="Image URL, or upload →"
              value={tweet.avatarUrl.startsWith("data:") ? "" : tweet.avatarUrl}
              onChange={(e) => onTweetChange({ avatarUrl: e.target.value })}
            />
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onAvatarFile(f);
                e.target.value = "";
              }}
            />
            <StampButton
              variant="secondary"
              onClick={() => avatarInputRef.current?.click()}
            >
              Upload
            </StampButton>
            {tweet.avatarUrl && (
              <StampButton variant="secondary" onClick={onRemoveAvatar}>
                ✕
              </StampButton>
            )}
          </div>
        </Field>
      </Section>

      {/* MESSAGE */}
      <Section title="Message">
        <Field label="Tweet text">
          <TextArea
            rows={4}
            value={tweet.text}
            onChange={(e) => onTweetChange({ text: e.target.value })}
            placeholder="What's happening?"
          />
        </Field>

        <Field label="Attached image" hint="optional">
          <div className="flex items-center gap-2">
            <input
              ref={mediaInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onMediaFile(f);
                e.target.value = "";
              }}
            />
            <StampButton
              variant="secondary"
              onClick={() => mediaInputRef.current?.click()}
            >
              Upload image
            </StampButton>
            {tweet.mediaUrl && (
              <StampButton variant="secondary" onClick={onRemoveMedia}>
                Remove
              </StampButton>
            )}
          </div>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Time">
            <TextInput
              value={tweet.timeLabel}
              onChange={(e) => onTweetChange({ timeLabel: e.target.value })}
              placeholder="10:14 AM"
            />
          </Field>
          <Field label="Date">
            <TextInput
              value={tweet.dateLabel}
              onChange={(e) => onTweetChange({ dateLabel: e.target.value })}
              placeholder="Aug 26, 2026"
            />
          </Field>
        </div>
      </Section>

      {/* ENGAGEMENT */}
      <Section title="Engagement">
        <Toggle
          checked={styleOpts.showStats}
          onChange={(v) => onStyleChange({ showStats: v })}
          label="Show stats row"
        />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Replies">
            <NumberField
              value={tweet.replies}
              onChange={(n) => onTweetChange({ replies: n })}
            />
          </Field>
          <Field label="Retweets">
            <NumberField
              value={tweet.retweets}
              onChange={(n) => onTweetChange({ retweets: n })}
            />
          </Field>
          <Field label="Likes">
            <NumberField
              value={tweet.likes}
              onChange={(n) => onTweetChange({ likes: n })}
            />
          </Field>
          <Field label="Views">
            <NumberField
              value={tweet.views}
              onChange={(n) => onTweetChange({ views: n })}
            />
          </Field>
        </div>
      </Section>

      {/* FRAME */}
      <Section title="Frame">
        <Field label="Card theme">
          <SegmentedControl
            options={[
              { value: "light" as CardTheme, label: "Light" },
              { value: "dark" as CardTheme, label: "Dark" },
            ]}
            value={styleOpts.cardTheme}
            onChange={(v) => onStyleChange({ cardTheme: v })}
          />
        </Field>

        <Field label="Background">
          <div className="flex flex-wrap gap-2">
            {BACKGROUND_OPTIONS.map((opt) => {
              const active = styleOpts.backgroundId === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  title={opt.label}
                  onClick={() => onStyleChange({ backgroundId: opt.id })}
                  className={`w-8 h-8 rounded-full border-2 transition-transform motion-reduce:transition-none hover:scale-105 focus-visible:ring-2 focus-visible:ring-marker ${
                    active ? "border-marker" : "border-paper-line"
                  }`}
                  style={{
                    background:
                      opt.kind === "transparent"
                        ? "repeating-conic-gradient(#cfcabb 0% 25%, #eae7db 0% 50%) 50% / 10px 10px"
                        : (opt.swatch ?? opt.css),
                  }}
                />
              );
            })}
          </div>
        </Field>

        <Field label="Padding">
          <Slider
            value={styleOpts.padding}
            onChange={(n) => onStyleChange({ padding: n })}
            min={0}
            max={160}
            displaySuffix="px"
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Card radius">
            <Slider
              value={styleOpts.cardRadius}
              onChange={(n) => onStyleChange({ cardRadius: n })}
              min={0}
              max={40}
              displaySuffix="px"
            />
          </Field>
          <Field label="Frame radius">
            <Slider
              value={styleOpts.frameRadius}
              onChange={(n) => onStyleChange({ frameRadius: n })}
              min={0}
              max={64}
              displaySuffix="px"
            />
          </Field>
        </div>

        <div className="flex items-center gap-6">
          <Toggle
            checked={styleOpts.shadow}
            onChange={(v) => onStyleChange({ shadow: v })}
            label="Card shadow"
          />
          <Toggle
            checked={styleOpts.showWatermark}
            onChange={(v) => onStyleChange({ showWatermark: v })}
            label="Watermark"
          />
        </div>
      </Section>

      {/* EXPORT */}
      <Section title="Export">
        <div className="flex flex-wrap items-center gap-4">
          <Field label="Scale">
            <SegmentedControl<1 | 2 | 3>
              options={[
                { value: 1, label: "1×" },
                { value: 2, label: "2×" },
                { value: 3, label: "3×" },
              ]}
              value={styleOpts.pixelRatio}
              onChange={(v) => onStyleChange({ pixelRatio: v })}
            />
          </Field>
          <Field label="Format">
            <SegmentedControl<StyleOptions["fileFormat"]>
              options={[
                { value: "png", label: "PNG" },
                { value: "jpeg", label: "JPEG" },
              ]}
              value={styleOpts.fileFormat}
              onChange={(v) => onStyleChange({ fileFormat: v })}
            />
          </Field>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <StampButton onClick={onExport} disabled={exporting}>
            {exporting ? <SpinnerIcon className="w-4 h-4" /> : "Export image"}
          </StampButton>
          {copySupported && (
            <StampButton
              variant="secondary"
              onClick={onCopy}
              disabled={exporting}
            >
              {copyState === "copied" ? "Copied ✓" : "Copy to clipboard"}
            </StampButton>
          )}
        </div>
        {exportError && (
          <p className="text-[12px] text-marker leading-snug">{exportError}</p>
        )}
        {copyState === "error" && (
          <p className="text-[12px] text-marker leading-snug">
            Your browser blocked the clipboard write — try Export instead.
          </p>
        )}
      </Section>
    </div>
  );
}
