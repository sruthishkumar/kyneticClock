import React, { useEffect, useMemo, useState } from "react";
import Digit from "./digit";
import Colon from "./colon";

/**
 * Notes:
 * - Four digits (HH:MM), each digit is a 4×6 grid = 24 mini clocks.
 * - Each mini clock has two hands (pseudo-elements). We drive their angles with CSS variables.
 * - This file avoids Sass/Pug by computing the 24 angle pairs in JS and inlining them per cell.
 */

export default function Clock({
  size = "2rem", // size of each mini-clock (CSS length)
  gap = "0.25rem", // gap between mini-clocks
  color = "#f3f3f3", // hand color (with glow)
  bg = "#f3f3f3", // background behind the widget
  twelveHour = true, // 12h like the pen
  tickMs = 1000, // update interval
}: {
  size?: string;
  gap?: string;
  color?: string;
  bg?: string;
  twelveHour?: boolean;
  tickMs?: number;
}) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), tickMs);
    return () => clearInterval(id);
  }, [tickMs]);

  // ---------------- Digit patterns ----------------
  // Each entry is 24 [a,b] pairs. Angles are multiples of 90° (the pen used numbers like 0,1,2,3 and a few 4.6 etc.)
  // a = rotation for :after; b = rotation for :before; both multiplied by 90deg in CSS.
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
        [4.6, 4.6],
        [4.6, 4.6],
        [0, 2],
        [0, 2],
        [4.6, 4.6],
        [4.6, 4.6],
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
        [4.6, 4.6],
        [4.6, 4.6],
        [0, 2],
        [0, 2],
        [4.6, 4.6],
        [4.6, 4.6],
        [0, 2],
        [0, 2],
        [4.6, 4.6],
        [4.6, 4.6],
        [0, 2],
        [2, 0],
        [4.6, 4.6],
        [4.6, 4.6],
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
  const COLON: Record<string, [number, number][]> = useMemo(
    () => ({
      ":": [
        [2, 1],
        [2, 3],
        [0, 1],
        [0, 3],
        [1, 2],
        [2, 3],
        [1, 0],
        [0, 3],
      ],
    }),
    []
  );

  // -------------- helpers --------------
  function twoDigits(n: number) {
    return n < 10 ? [0, n] : [Math.floor(n / 10), n % 10];
  }

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  const hh = twelveHour ? (hours <= 12 ? hours : hours - 12) : hours;
  const [h1, h2] =
    hh >= 10 && hh < 13 && twelveHour ? [1, hh - 10] : twoDigits(hh);
  const [m1, m2] = twoDigits(minutes);
  const [s1, s2] = twoDigits(seconds);
  const [c1] = ":";

  const hourList = [h1, h2].map(String);
  const minuteList = [m1, m2].map(String);
  const secondList = [s1, s2].map(String);
  const colenList = [c1].map(String);
  const digitList = [h1, h2, m1, m2, s1, s2].map(String);

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
        <div className="timebox hour">
          {hourList.map((d, di) => (
            <Digit key={di} pattern={DIGITS[d]} />
          ))}
        </div>
        <div className="timebox colonbox">
          {colenList.map((d, di) => (
            <Colon key={di} pattern={COLON[d]} />
          ))}
        </div>
        <div className="timebox minute">
          {minuteList.map((d, di) => (
            <Digit key={di} pattern={DIGITS[d]} />
          ))}
        </div>
        <div className="timebox seconds">
          {secondList.map((d, di) => (
            <Digit key={di} pattern={DIGITS[d]} />
          ))}
        </div>
        {/* <div className="ampm-container">
        <span>{seconds}</span>
        <span>{ampm}</span>
      </div> */}
        {/* {digitList.map((d, di) => (
        <Digit key={di} pattern={DIGITS[d]} />
      ))} */}
      </div>
    </div>
  );
}
