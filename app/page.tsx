import Studio from "@/components/Studio";
import { RegistrationMark } from "@/components/icons";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <header className="border-b border-blueprint-line-strong">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <RegistrationMark className="w-8 h-8 text-paper-on-blue-soft shrink-0" />
            <div>
              <h1 className="font-display font-bold text-[20px] tracking-tight text-paper-on-blue">
                Tweetprint
              </h1>
              <p className="font-mono text-[11px] tracking-[0.08em] text-paper-on-blue-soft uppercase">
                Post in, picture out
              </p>
            </div>
          </div>
          <p className="hidden sm:block max-w-[300px] text-right text-[12px] leading-snug text-paper-on-blue-soft">
            Everything renders in your browser. Nothing is uploaded except an
            optional lookup when you paste a tweet URL.
          </p>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <Studio />
        </div>
      </main>

      <footer className="border-t border-blueprint-line-strong">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-5 text-[11px] font-mono text-paper-on-blue-soft/80 tracking-wide">
          Not affiliated with X Corp. Tweet content you enter is your own responsibility to source and share.
        </div>
      </footer>
    </div>
  );
}
