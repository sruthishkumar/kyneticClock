import { useCallback, useEffect, useRef, useState } from "react";

export type TimerMode = "stopwatch" | "countdown";

export interface UseTimerOptions {
  /** "stopwatch" counts up, "countdown" counts down to 0. */
  mode?: TimerMode;
  /** Initial milliseconds (0 for stopwatch; duration for countdown). */
  initialMs?: number;
  /** Start running on mount. */
  autostart?: boolean;
  /** Called once when countdown reaches 0. */
  onFinish?: () => void;
}

export interface UseTimerReturn {
  /** Current time value in milliseconds. */
  ms: number;
  /** Whether the loop is running. */
  running: boolean;
  /** Start from current value (or initial for first start). */
  start: () => void;
  /** Pause the loop (keeps current value). */
  pause: () => void;
  /** Alias for start (resumes from current value). */
  resume: () => void;
  /** Reset to a specific value (defaults to initialMs). */
  reset: (nextInitialMs?: number) => void;
  /** Set ms manually (escape hatch). */
  setMs: (v: number) => void;
  /** For countdown only: normalized 0..1 progress (0 when full, 1 at finish). */
  progress: number;
}

/**
 * High-accuracy timer using requestAnimationFrame.
 * - Stopwatch increases `ms`
 * - Countdown decreases to 0, then pauses and calls `onFinish`
 */
export function useTimer({
  mode = "stopwatch",
  initialMs = 0,
  autostart = false,
  onFinish,
}: UseTimerOptions = {}): UseTimerReturn {
  // displayed ms
  const [ms, setMs] = useState<number>(initialMs);
  const [running, setRunning] = useState<boolean>(autostart);

  // base used for progress math (can be changed on reset)
  const [baseMs, setBaseMs] = useState<number>(initialMs);

  // refs to avoid stale closures inside RAF loop
  const modeRef = useRef<TimerMode>(mode);
  const runningRef = useRef<boolean>(running);
  const msRef = useRef<number>(ms);
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);
  const finishedRef = useRef<boolean>(false);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);
  useEffect(() => {
    runningRef.current = running;
  }, [running]);
  useEffect(() => {
    msRef.current = ms;
  }, [ms]);

  const loop = useCallback(
    (t: number) => {
      if (!runningRef.current) return;
      if (!lastRef.current) lastRef.current = t;

      const dt = t - lastRef.current; // ms since last frame
      lastRef.current = t;

      setMs((prev) => {
        const m = modeRef.current;
        if (m === "stopwatch") {
          return prev + dt;
        }
        // countdown
        const next = Math.max(0, prev - dt);
        if (prev > 0 && next === 0 && !finishedRef.current) {
          finishedRef.current = true;
          setRunning(false);
          onFinish?.();
        }
        return next;
      });

      rafRef.current = requestAnimationFrame(loop);
    },
    [onFinish]
  );

  const start = useCallback(() => {
    if (runningRef.current) return;
    setRunning(true);
    lastRef.current = 0;
    rafRef.current = requestAnimationFrame(loop);
  }, [loop]);

  const pause = useCallback(() => {
    setRunning(false);
    cancelAnimationFrame(rafRef.current);
    lastRef.current = 0;
  }, []);

  const resume = start;

  const reset = useCallback(
    (nextInitialMs?: number) => {
      pause();
      const target = typeof nextInitialMs === "number" ? nextInitialMs : baseMs;
      finishedRef.current = false;
      setMs(target);
      setBaseMs(target);
    },
    [baseMs, pause]
  );

  // autostart on mount
  useEffect(() => {
    if (autostart) start();
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // progress for countdown
  const progress = mode === "countdown" && baseMs > 0 ? 1 - ms / baseMs : 0;

  return { ms, running, start, pause, resume, reset, setMs, progress };
}

/** ---------- Formatting helpers (exported) ---------- */
export interface HMSms {
  h: number;
  m: number;
  s: number;
  cs: number;
}

export function msToHMSms(totalMs: number): HMSms {
  const clamped = Math.max(0, Math.floor(totalMs));
  const h = Math.floor(clamped / 3_600_000);
  const m = Math.floor((clamped % 3_600_000) / 60_000);
  const s = Math.floor((clamped % 60_000) / 1_000);
  const cs = Math.floor((clamped % 1_000) / 10); // 00..99
  return { h, m, s, cs };
}

export function formatHMS({ h, m, s }: Pick<HMSms, "h" | "m" | "s">): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export function formatMSms(totalMs: number): string {
  const { m, s, cs } = msToHMSms(totalMs);
  const pad = (n: number, len = 2) => String(n).padStart(len, "0");
  return `${pad(m)}:${pad(s)}.${pad(cs)}`;
}
