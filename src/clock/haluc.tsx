import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Million Times Clock (React + animated patterns + time pulses)
 * – Builds on the earlier React port of https://codepen.io/vineethtrv/pen/azoXMYO
 * – Adds:
 *   1) Smooth "swing" animation for both hands that forms hypnotic patterns
 *   2) Actual time overlay every 5s for 2s (with soft cross‑fade)
 */

export default function MillionTimesClock({
  size = "1rem", // size of each mini-clock
  gap = "0.28rem", // gap between mini-clocks
  color = "#f00", // hand color
  bg = "#111827", // backdrop
  twelveHour = true,
  swingAmpMinDeg = 10, // swing amplitude for minute hand (deg)
  swingAmpHourDeg = 7, // swing amplitude for hour hand (deg)
  swingHz = 0.16, // swing frequency (Hz)
  pulseEvery = 5, // seconds between real-time pulses
  pulseDuration = 2, // seconds to show time
}: {
  size?: string;
  gap?: string;
  color?: string;
  bg?: string;
  twelveHour?: boolean;
  swingAmpMinDeg?: number;
  swingAmpHourDeg?: number;
  swingHz?: number;
  pulseEvery?: number;
  pulseDuration?: number;
}) {
  const [now, setNow] = useState(new Date());
  const tRef = useRef(0); // running time in seconds (for smooth animation)
  const lastRef = useRef<number | null>(null);
  const [, setTick] = useState(0); // lightweight heartbeat

  // rAF loop for smooth patterns + Date updates (~4 fps is fine for clock time)
  useEffect(() => {
    let raf: number;
    let acc = 0;
    const loop = (ts: number) => {
      if (lastRef.current == null) lastRef.current = ts;
      const dt = Math.min(0.05, (ts - lastRef.current) / 1000);
      lastRef.current = ts;
      tRef.current += dt;
      // Update Date object ~4fps to keep minutes/seconds fresh without extra work
      acc += dt;
      if (acc > 0.25) {
        setNow(new Date());
        acc = 0;
      }
      setTick((v) => (v + 1) % 1_000_000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ---------------- Digit patterns from the CodePen ----------------
  // 24 pair entries per digit; numbers are multiples of 90deg (some fractional for diagonals)
  const DIGITS: Record<string, [number, number][]> = useMemo(
    () => ({
      "0": [
        [1, 2],
        [1, 3],
        [1, 3],
        [2, 3],
        [0, 2],
        [2, 1],
        [2, 3],
        [0, 2],
        [0, 2],
        [0, 2],
        [0, 2],
        [0, 2],
        [0, 2],
        [0, 2],
        [0, 2],
        [0, 2],
        [0, 2],
        [0, 1],
        [0, 3],
        [0, 2],
        [0, 1],
        [1, 3],
        [1, 3],
        [0, 3],
      ],
      "1": [
        [1, 2],
        [1, 3],
        [2, 3],
        [2.6, 2.6],
        [0, 1],
        [3, 2],
        [2, 0],
        [2.6, 2.6],
        [2.6, 2.6],
        [0, 2],
        [0, 2],
        [2.6, 2.6],
        [2.6, 2.6],
        [0, 2],
        [0, 2],
        [2.6, 2.6],
        [1, 2],
        [0, 3],
        [0, 1],
        [3, 2],
        [0, 1],
        [1, 3],
        [1, 3],
        [0, 3],
      ],
      "2": [
        [1, 2],
        [1, 3],
        [1, 3],
        [3, 2],
        [0, 1],
        [3, 1],
        [2, 3],
        [0, 2],
        [1, 2],
        [1, 3],
        [0, 3],
        [0, 2],
        [0, 2],
        [1, 2],
        [1, 3],
        [0, 3],
        [0, 2],
        [1, 0],
        [1, 3],
        [2, 3],
        [0, 1],
        [1, 3],
        [1, 3],
        [0, 3],
      ],
      "3": [
        [1, 2],
        [1, 3],
        [1, 3],
        [3, 2],
        [0, 1],
        [3, 1],
        [2, 3],
        [0, 2],
        [1, 2],
        [1, 3],
        [0, 3],
        [0, 2],
        [0, 1],
        [1, 3],
        [2, 3],
        [0, 2],
        [1, 2],
        [1, 3],
        [0, 3],
        [0, 2],
        [0, 1],
        [1, 3],
        [1, 3],
        [0, 3],
      ],
      "4": [
        [1, 2],
        [2, 3],
        [1, 2],
        [3, 2],
        [0, 2],
        [0, 2],
        [0, 2],
        [0, 2],
        [0, 2],
        [0, 1],
        [0, 3],
        [0, 2],
        [0, 1],
        [1, 3],
        [2, 3],
        [0, 2],
        [2.6, 2.6],
        [2.6, 2.6],
        [0, 2],
        [0, 2],
        [2.6, 2.6],
        [2.6, 2.6],
        [0, 1],
        [0, 3],
      ],
      "5": [
        [1, 2],
        [1, 3],
        [1, 3],
        [3, 2],
        [0, 2],
        [2, 1],
        [1, 3],
        [0, 3],
        [0, 2],
        [0, 1],
        [1, 3],
        [2, 3],
        [0, 1],
        [1, 3],
        [2, 3],
        [0, 2],
        [1, 2],
        [1, 3],
        [0, 3],
        [2, 0],
        [0, 1],
        [1, 3],
        [1, 3],
        [0, 3],
      ],
      "6": [
        [1, 2],
        [1, 3],
        [1, 3],
        [3, 2],
        [0, 2],
        [2, 1],
        [1, 3],
        [0, 3],
        [0, 2],
        [0, 1],
        [1, 3],
        [2, 3],
        [0, 2],
        [1, 2],
        [2, 3],
        [0, 2],
        [0, 2],
        [1, 0],
        [0, 3],
        [2, 0],
        [0, 1],
        [1, 3],
        [1, 3],
        [0, 3],
      ],
      "7": [
        [1, 2],
        [1, 3],
        [1, 3],
        [3, 2],
        [0, 1],
        [3, 1],
        [2, 3],
        [0, 2],
        [2.6, 2.6],
        [2.6, 2.6],
        [0, 2],
        [0, 2],
        [2.6, 2.6],
        [2.6, 2.6],
        [0, 2],
        [0, 2],
        [2.6, 2.6],
        [2.6, 2.6],
        [0, 2],
        [2, 0],
        [2.6, 2.6],
        [2.6, 2.6],
        [0, 1],
        [0, 3],
      ],
      "8": [
        [1, 2],
        [1, 3],
        [1, 3],
        [3, 2],
        [0, 2],
        [2, 1],
        [2, 3],
        [0, 2],
        [0, 1.5],
        [0, 1],
        [0, 3],
        [2.5, 0],
        [0.6, 2],
        [1, 2],
        [2, 3],
        [3.5, 2],
        [0, 2],
        [1, 0],
        [0, 3],
        [2, 0],
        [0, 1],
        [1, 3],
        [1, 3],
        [0, 3],
      ],
      "9": [
        [1, 2],
        [1, 3],
        [1, 3],
        [3, 2],
        [0, 2],
        [2, 1],
        [2, 3],
        [0, 2],
        [0, 2],
        [0, 1],
        [0, 3],
        [2, 0],
        [0, 1],
        [1, 3],
        [2, 3],
        [0, 2],
        [1, 2],
        [1, 3],
        [0, 3],
        [2, 0],
        [0, 1],
        [1, 3],
        [1, 3],
        [0, 3],
      ],
    }),
    []
  );

  // ---------- Utility ----------
  const TAU = Math.PI * 2;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;
  const lerpDeg = (a: number, b: number, t: number) =>
    a + shortestDegDelta(a, b) * t;
  function shortestDegDelta(a: number, b: number) {
    let d = ((b - a + 540) % 360) - 180; // (-180..180]
    return d;
  }

  function twoDigits(n: number) {
    return n < 10 ? [0, n] : [Math.floor(n / 10), n % 10];
  }

  // Current time digits (HH:MM)
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const hh = twelveHour ? hours % 12 || 12 : hours;
  const [h1, h2] = twoDigits(hh);
  const [m1, m2] = twoDigits(minutes);
  const digits = [h1, h2, m1, m2].map(String);

  // Pulse alpha: 0 → patterns; 1 → show time. Fades in/out around boundaries
  function timePulseAlpha(d: Date) {
    const C = Math.max(2, Math.round(pulseEvery));
    const D = Math.min(Math.max(0.4, pulseDuration), C - 0.2);
    const s = d.getSeconds() + d.getMilliseconds() / 1000;
    const phase = s % C;
    const ramp = 0.3;
    if (phase < ramp) return easeInOut(phase / ramp);
    if (phase < D) return 1;
    if (phase < D + ramp) return easeInOut(1 - (phase - D) / ramp);
    return 0;
  }
  function easeInOut(t: number) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  // -------- Pattern field (base orientation in radians) --------
  // We'll compute a smooth base angle for each cell, then add small "swing".
  type FieldFn = (u: number, v: number, t: number, i: number) => number; // returns radians

  const fieldSwirl: FieldFn = (u, v, t) => {
    const dx = u - 0.5,
      dy = v - 0.5;
    return Math.atan2(dy, dx) + t * 0.7 + Math.hypot(dx, dy) * 3.0;
  };
  const fieldWave: FieldFn = (u, v, t) => {
    return Math.sin(u * 10 + t * 2) + Math.sin(v * 8 - t * 1.6);
  };
  const fieldCheckerSpin: FieldFn = (u, v, t, i) => {
    const dir = (Math.floor(u * 16) + Math.floor(v * 12)) % 2 === 0 ? 1 : -1;
    return t * 1.8 * dir + (i % 7) * 0.12;
  };
  const FIELDS: FieldFn[] = [fieldSwirl, fieldWave, fieldCheckerSpin];

  // Cycle patterns every ~10s softly (purely aesthetic)
  function fieldAngle(u: number, v: number, i: number): number {
    const t = tRef.current;
    const A = FIELDS.length;
    const cycle = 10; // seconds per field
    const idx = Math.floor(t / cycle) % A;
    const next = (idx + 1) % A;
    const a = Math.min(1, Math.max(0, ((t % cycle) - (cycle - 1)) / 1)); // 1s crossfade
    const f1 = FIELDS[idx](u, v, t, i);
    const f2 = FIELDS[next](u, v, t, i);
    // simple linear blend in radians (OK for small deltas)
    return f1 + (f2 - f1) * a;
  }

  // For each of the 4 digits, produce 24 angle pairs in degrees based on blend of pattern/time
  function buildAngles(): [number, number][][] {
    const t = tRef.current;
    const alpha = timePulseAlpha(now); // 0..1
    const swingW = TAU * swingHz;
    const ampM = swingAmpMinDeg;
    const ampH = swingAmpHourDeg;

    const out: [number, number][][] = [];
    for (let di = 0; di < 4; di++) {
      const dKey = digits[di];
      const table = DIGITS[dKey];
      const arr: [number, number][] = [];
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 4; c++) {
          const i = r * 4 + c; // index inside digit
          const gi = di * 24 + i; // global index across the wall
          // normalized coordinates across entire 4‑digit area (ignoring pixel gap)
          const u = (di * 4 + c + 0.5) / (4 * 4);
          const v = (r + 0.5) / 6;

          // Base pattern orientation (minute follows the field; hour is 90° offset)
          const baseRad = fieldAngle(u, v, gi);
          let baseMinute = toDeg(baseRad);
          let baseHour = baseMinute + 90;

          // Target time orientation from digit map (values are in quarter‑turns)
          const [aQ, bQ] = table[i];
          const targetMinute = aQ * 90; // deg
          const targetHour = bQ * 90; // deg

          // Blend pattern → time based on pulse alpha
          let minuteDeg = lerpDeg(baseMinute, targetMinute, alpha);
          let hourDeg = lerpDeg(baseHour, targetHour, alpha);

          // Small swing around the current target to feel alive
          const phi = gi * 0.37; // deterministic phase per cell
          minuteDeg += Math.sin(swingW * t + phi) * ampM;
          hourDeg += Math.sin(swingW * t + phi * 1.3 + 0.6) * ampH;

          arr.push([wrapDeg(minuteDeg), wrapDeg(hourDeg)]);
        }
      }
      out.push(arr);
    }
    return out;
  }

  function wrapDeg(d: number) {
    d = ((d % 360) + 360) % 360;
    return d;
  }

  const anglePairsByDigit = buildAngles();

  return (
    <div
      className="mtc-root"
      style={
        {
          "--bg": bg,
          "--clock-size": size,
          "--clock-gap": gap,
          "--hand-color": color,
        } as React.CSSProperties
      }
    >
      <div className="container">
        {anglePairsByDigit.map((pairs, di) => (
          <Digit key={di} pairs={pairs} />
        ))}
      </div>

      <style>{`
        .mtc-root { display:grid; place-items:center; min-height:60vh; background: var(--bg); }
        .container { display:flex; gap: var(--clock-gap); }
        .digit { display:flex; flex-wrap:wrap; width: calc(var(--clock-size) * 4); }
        .clock { width: var(--clock-size); position: relative; aspect-ratio: 1/1; }

        .clock::before, .clock::after {
          content: "";
          position: absolute;
          left: calc(50% - (var(--hand-width)/2));
          top: var(--hand-width);
          width: var(--hand-width);
          height: var(--hand-height);
          background: var(--hand-color);
          box-shadow: 0 0 8px var(--hand-color);
          transform-origin: center bottom;
          /* No fixed CSS transition; we update every frame for smooth swings */
          transition: transform 2s linear;
          /* transform: rotate(calc(var(--deg, 0) * 1deg));*/
        }
        .clock::before { --deg: var(--bDeg, 0); }
        .clock::after  { --deg: var(--aDeg, 0); }

        /* Sizing vars derived from clock-size */
        .mtc-root { --hand-width: calc(var(--clock-size) * 0.08); --hand-height: calc(var(--clock-size) / 2); }
      `}</style>
    </div>
  );
}

function Digit({ pairs }: { pairs: [number, number][] }) {
  const arr = pairs ?? new Array(24).fill([0, 0]);
  return (
    <div className="digit">
      {arr.map(([aDeg, bDeg], i) => (
        <div
          key={i}
          className="clock"
          style={
            {
              "--aDeg": String(aDeg),
              "--bDeg": String(bDeg),
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
