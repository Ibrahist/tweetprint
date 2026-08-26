"use client";

import type { ReactNode } from "react";
import { CornerBracket } from "./icons";

export function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="py-5 first:pt-0 border-b border-paper-line last:border-b-0">
      <div className="flex items-center gap-1.5 mb-3.5">
        <CornerBracket className="w-3.5 h-3.5 text-marker" />
        <h2 className="font-mono text-[11px] font-medium tracking-[0.14em] text-ink-soft uppercase">
          {title}
        </h2>
      </div>
      <div className="flex flex-col gap-3.5">{children}</div>
    </section>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] tracking-[0.1em] text-ink-faint uppercase">
        {label}
        {hint && <span className="ml-1.5 normal-case tracking-normal text-ink-faint/70">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", ...rest } = props;
  return (
    <input
      {...rest}
      className={`w-full rounded-md border border-paper-line bg-paper-dim px-3 py-2 text-[14px] text-ink placeholder:text-ink-faint outline-none focus-visible:ring-2 focus-visible:ring-marker focus-visible:border-marker transition-colors ${className}`}
    />
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className = "", ...rest } = props;
  return (
    <textarea
      {...rest}
      className={`w-full rounded-md border border-paper-line bg-paper-dim px-3 py-2 text-[14px] text-ink placeholder:text-ink-faint outline-none focus-visible:ring-2 focus-visible:ring-marker focus-visible:border-marker resize-y transition-colors ${className}`}
    />
  );
}

export function NumberField({
  value,
  onChange,
  min = 0,
  ...rest
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type">) {
  return (
    <TextInput
      type="number"
      inputMode="numeric"
      min={min}
      value={Number.isFinite(value) ? value : 0}
      onChange={(e) => onChange(Math.max(min, Number(e.target.value) || 0))}
      className="font-mono"
      {...rest}
    />
  );
}

export function Slider({
  value,
  onChange,
  min,
  max,
  step = 1,
  displaySuffix = "",
}: {
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step?: number;
  displaySuffix?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[color:var(--marker)] motion-reduce:transition-none"
      />
      <span className="font-mono text-[12px] text-ink-soft w-12 text-right shrink-0">
        {value}
        {displaySuffix}
      </span>
    </div>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (b: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between gap-3 group"
    >
      <span className="font-mono text-[10px] tracking-[0.1em] text-ink-faint uppercase">
        {label}
      </span>
      <span
        className={`relative w-9 h-5 rounded-full transition-colors motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-marker ${
          checked ? "bg-marker" : "bg-paper-line"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-paper shadow-sm transition-transform motion-reduce:transition-none ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  );
}

export function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="inline-flex rounded-md border border-paper-line bg-paper-dim p-0.5 gap-0.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          aria-pressed={value === opt.value}
          className={`px-3 py-1.5 rounded text-[12px] font-medium font-mono transition-colors motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-marker ${
            value === opt.value
              ? "bg-marker text-paper"
              : "text-ink-soft hover:text-ink"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function StampButton({
  children,
  onClick,
  disabled,
  variant = "primary",
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-[13px] font-mono font-semibold uppercase tracking-[0.08em] transition-all motion-reduce:transition-none active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const styles =
    variant === "primary"
      ? "bg-marker text-paper shadow-[0_4px_14px_-4px_rgba(226,83,31,0.6)] hover:bg-marker-dim focus-visible:ring-marker focus-visible:ring-offset-paper"
      : "bg-transparent text-ink border border-paper-line hover:border-ink-soft focus-visible:ring-marker focus-visible:ring-offset-paper";
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}
