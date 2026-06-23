import React, { useEffect, useRef, useState } from "react";

/**
 * HeroAnimation — floating, distinct UI windows with humanlike cursors
 * moving WITHIN each window. Windows gently bob in place and fade in
 * AFTER the hero text has loaded. Pure React + CSS, no deps.
 *
 * Props:
 *   visible — whether windows should be shown (gated by Hero after text loads)
 *   skip    — true only when ?skipAnimations=1 (static final state, no cursor loops)
 */

type Pt = { x: number; y: number };

type WinType = "browser" | "sheet" | "email" | "kanban";

type Win = {
  id: string;
  type: WinType;
  pos: { top?: string; bottom?: string; left?: string; right?: string };
  width: string;
  rotate: number;
  floatAmp: number;
  floatDuration: number;
  floatDelay: number;
  rotateAmp: number;
  cursorTargets: Pt[];
  cursorDelay: number;
};

const WINDOWS: Win[] = [
  {
    id: "w1",
    type: "browser",
    pos: { top: "10%", left: "5%" },
    width: "240px",
    rotate: -4,
    floatAmp: 8,
    floatDuration: 6.5,
    floatDelay: 0,
    rotateAmp: 1.2,
    cursorTargets: [
      { x: 55, y: 82 },
      { x: 30, y: 55 },
      { x: 65, y: 38 },
    ],
    cursorDelay: 0,
  },
  {
    id: "w2",
    type: "sheet",
    pos: { top: "12%", right: "6%" },
    width: "220px",
    rotate: 5,
    floatAmp: 10,
    floatDuration: 7.2,
    floatDelay: 1.1,
    rotateAmp: 1.5,
    cursorTargets: [
      { x: 60, y: 65 },
      { x: 40, y: 82 },
      { x: 70, y: 45 },
    ],
    cursorDelay: 600,
  },
  {
    id: "w3",
    type: "email",
    pos: { bottom: "24%", left: "9%" },
    width: "210px",
    rotate: 3,
    floatAmp: 7,
    floatDuration: 6.8,
    floatDelay: 0.6,
    rotateAmp: 1.0,
    cursorTargets: [
      { x: 70, y: 70 },
      { x: 35, y: 50 },
      { x: 60, y: 85 },
    ],
    cursorDelay: 1200,
  },
  {
    id: "w4",
    type: "kanban",
    pos: { bottom: "22%", right: "8%" },
    width: "215px",
    rotate: -3,
    floatAmp: 9,
    floatDuration: 7.5,
    floatDelay: 1.8,
    rotateAmp: 1.3,
    cursorTargets: [
      { x: 40, y: 55 },
      { x: 65, y: 75 },
      { x: 30, y: 82 },
    ],
    cursorDelay: 1800,
  },
];

/* ---------- Window chrome ---------- */

const Chrome = ({ showUrl = false }: { showUrl?: boolean }) => (
  <div className="flex items-center gap-1 px-2.5 py-1.5 border-b border-charcoal/12">
    <span className="w-1.5 h-1.5 rounded-full bg-charcoal/25" />
    <span className="w-1.5 h-1.5 rounded-full bg-charcoal/25" />
    <span className="w-1.5 h-1.5 rounded-full bg-charcoal/25" />
    {showUrl && <div className="ml-2 flex-1 h-3 rounded-sm bg-charcoal/[0.07]" />}
  </div>
);

/* ---------- Abstract bodies (no real text) ---------- */

const BrowserBody = () => (
  <div className="p-3 space-y-2">
    {/* Nav row */}
    <div className="flex items-center gap-1.5">
      <div className="h-2 w-2 rounded-full bg-charcoal/20" />
      <div className="h-2 w-2 rounded-full bg-charcoal/20" />
      <div className="flex-1 h-3 rounded-sm bg-charcoal/[0.07]" />
    </div>
    {/* Hero block */}
    <div className="h-14 w-full rounded bg-charcoal/12 relative overflow-hidden">
      <div className="absolute inset-0 flex flex-col justify-center px-3 gap-1.5">
        <div className="h-2 w-2/3 rounded-sm bg-charcoal/35" />
        <div className="h-2 w-1/2 rounded-sm bg-charcoal/20" />
      </div>
    </div>
    {/* Feature row: 3 mini cards */}
    <div className="grid grid-cols-3 gap-1.5">
      {[0, 1, 2].map((i) => (
        <div key={i} className="space-y-1 p-1.5 rounded bg-charcoal/[0.05]">
          <div className="h-5 w-full rounded bg-charcoal/15" />
          <div className="h-1.5 w-full rounded-sm bg-charcoal/15" />
          <div className="h-1.5 w-2/3 rounded-sm bg-charcoal/10" />
        </div>
      ))}
    </div>
    {/* CTA bar */}
    <div className="h-4 w-24 rounded bg-charcoal/70" />
  </div>
);

const SheetBody = () => (
  <div className="p-2">
    <div className="grid grid-cols-[20px_1fr_1fr] gap-px bg-charcoal/10 border border-charcoal/10 rounded overflow-hidden">
      <div className="bg-charcoal/[0.08] h-4" />
      <div className="bg-charcoal/[0.08] h-4" />
      <div className="bg-charcoal/[0.08] h-4" />
      {[0, 1, 2, 3].map((r) => (
        <React.Fragment key={r}>
          <div className="bg-offwhite h-4" />
          <div className="bg-offwhite h-4 flex items-center px-1">
            <div className="h-1.5 bg-charcoal/25 rounded-sm" style={{ width: `${60 + r * 8}%` }} />
          </div>
          <div className="bg-offwhite h-4 flex items-center px-1">
            <div className="h-1.5 bg-charcoal/15 rounded-sm" style={{ width: `${45 + r * 6}%` }} />
          </div>
        </React.Fragment>
      ))}
    </div>
  </div>
);

const EmailBody = () => (
  <div className="p-3 space-y-2.5">
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 rounded-full bg-charcoal/30" />
      <div className="flex-1 space-y-1">
        <div className="h-1.5 w-2/3 rounded-sm bg-charcoal/30" />
        <div className="h-1.5 w-1/3 rounded-sm bg-charcoal/15" />
      </div>
    </div>
    <div className="space-y-1.5 pt-1">
      <div className="h-3 w-3/4 rounded-md rounded-bl-sm bg-charcoal/12" />
      <div className="h-3 w-1/2 rounded-md rounded-bl-sm bg-charcoal/12" />
      <div className="h-3 w-2/3 rounded-md rounded-br-sm bg-charcoal/25 ml-auto" />
    </div>
  </div>
);

const KanbanBody = () => (
  <div className="p-2 flex gap-1.5">
    {["to", "do", "done"].map((_, col) => (
      <div key={col} className="flex-1 space-y-1.5">
        <div className="h-2 rounded-sm bg-charcoal/20" />
        {[0, 1].map((row) => (
          <div
            key={row}
            className="rounded bg-charcoal/[0.07] p-1.5 space-y-1"
            style={{ opacity: col === 2 && row === 1 ? 0.5 : 1 }}
          >
            <div className="h-1.5 w-3/4 rounded-sm bg-charcoal/30" />
            <div className="h-1.5 w-1/2 rounded-sm bg-charcoal/15" />
          </div>
        ))}
      </div>
    ))}
  </div>
);

const WindowBody = ({ type }: { type: WinType }) => {
  switch (type) {
    case "browser":
      return <BrowserBody />;
    case "sheet":
      return <SheetBody />;
    case "email":
      return <EmailBody />;
    case "kanban":
      return <KanbanBody />;
  }
};

/* ---------- Floating + cursor ---------- */

const FloatKeyframes = () => (
  <style>{`
    @keyframes floatBob {
      0%, 100% { transform: translateY(0px) rotate(var(--rot)); }
      50% { transform: translateY(var(--amp)) rotate(calc(var(--rot) + var(--rotAmp))); }
    }
  `}</style>
);

const CursorSvg = ({ pressing }: { pressing: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5 drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]"
    style={{
      transition: "transform 0.12s ease-out",
      transform: pressing ? "scale(0.8)" : "scale(1)",
      transformOrigin: "5px 5px",
    }}
  >
    <path
      d="M5 2 L5 18 L9 14 L12 21 L15 20 L12 13 L18 13 Z"
      fill="#333533"
      stroke="#f3f3f3"
      strokeWidth="1.2"
    />
  </svg>
);

const Cursor = ({
  targets,
  active,
  delay,
}: {
  targets: Pt[];
  active: boolean;
  delay: number;
}) => {
  const [step, setStep] = useState(0);
  const [pressing, setPressing] = useState(false);
  const timers = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (!active) return;
    const all: NodeJS.Timeout[] = [];
    const moveDuration = 1100;
    const holdDuration = 700;

    const run = () => {
      setStep((s) => (s + 1) % targets.length);
      const t1 = setTimeout(() => {
        setPressing(true);
        const t2 = setTimeout(() => setPressing(false), 150);
        all.push(t2);
      }, moveDuration);
      all.push(t1);
    };

    const start = setTimeout(() => {
      run();
      const loop = setInterval(run, moveDuration + holdDuration);
      all.push(loop);
    }, delay);
    all.push(start);

    timers.current = all;
    return () => all.forEach((t) => clearTimeout(t));
  }, [active, delay, targets.length]);

  const pos = targets[step];

  return (
    <div
      className="absolute z-30"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transition:
          "left 1.1s cubic-bezier(0.32, 1.15, 0.42, 1), top 1.1s cubic-bezier(0.32, 1.15, 0.42, 1)",
      }}
    >
      <CursorSvg pressing={pressing} />
      <span
        className="absolute w-6 h-6 rounded-full border-2 border-charcoal/50 pointer-events-none"
        style={{
          left: "2px",
          top: "2px",
          transform: pressing ? "translate(-50%, -50%) scale(2.4)" : "translate(-50%, -50%)",
          opacity: pressing ? 0.6 : 0,
          transition: "transform 0.45s ease-out, opacity 0.45s ease-out",
        }}
      />
    </div>
  );
};

const HeroAnimation = ({
  visible = false,
  skip = false,
}: {
  visible?: boolean;
  skip?: boolean;
}) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
      <FloatKeyframes />

      {WINDOWS.map((w) => (
        <div
          key={w.id}
          className="absolute"
          style={{
            ...w.pos,
            width: w.width,
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease",
          }}
        >
          <div
            className="relative rounded-lg border border-charcoal/25 bg-offwhite shadow-[0_18px_40px_-20px_rgba(51,53,51,0.45)] overflow-hidden"
            style={
              {
                ["--rot"]: `${w.rotate}deg`,
                ["--amp"]: `${w.floatAmp}px`,
                ["--rotAmp"]: `${w.rotateAmp}deg`,
                animation: visible
                  ? `floatBob ${w.floatDuration}s ease-in-out ${w.floatDelay}s infinite`
                  : "none",
              } as React.CSSProperties
            }
          >
            <Chrome showUrl={w.type === "browser"} />
            <WindowBody type={w.type} />
          </div>

          {visible && !skip && (
            <Cursor targets={w.cursorTargets} active={visible} delay={w.cursorDelay} />
          )}
        </div>
      ))}
    </div>
  );
};

export default HeroAnimation;
