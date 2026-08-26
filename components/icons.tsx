import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function ReplyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v10a1.5 1.5 0 0 1-1.5 1.5H9.8L5 21v-4H5.5A1.5 1.5 0 0 1 4 15.5v-10Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RetweetIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6 7h10a2 2 0 0 1 2 2v3.5M6 7 9 4M6 7l3 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 17H8a2 2 0 0 1-2-2v-3.5M18 17l-3 3M18 17l-3-3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 20s-7.2-4.6-9.6-9.2C1 8 2.2 4.8 5.6 4.1c2-.4 3.9.5 5 2.2A5.9 5.9 0 0 1 15.6 4c3.2-.6 5.3 2 4.9 4.9C20.1 13.5 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ViewsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 18V10M10 18V6M16 18v-5M20 18V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 15V4m0 0L8.5 7.5M12 4l3.5 3.5M5 13v5.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function VerifiedIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 22 22" fill="none" {...props}>
      <path
        d="M11 1.5 13.3 3l3.1-.3.9 3 2.7 1.6-1.1 3 1.1 3-2.7 1.6-.9 3-3.1-.3L11 20.5 8.7 19l-3.1.3-.9-3-2.7-1.6 1.1-3-1.1-3 2.7-1.6.9-3 3.1.3L11 1.5Z"
        fill="#1D9BF0"
      />
      <path
        d="m7.8 11.2 2.1 2.1 4.3-4.6"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The blueprint corner-bracket / registration-mark: the app's recurring signature motif. */
export function CornerBracket(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M1 6V2a1 1 0 0 1 1-1h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function RegistrationMark(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <circle cx="16" cy="16" r="9" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M16 1v8M16 23v8M1 16h8M23 16h8" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

export function SpinnerIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="animate-spin" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
