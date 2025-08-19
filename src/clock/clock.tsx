import React, { useEffect, useMemo, useState } from "react";
import Digit from "./digit";
import { CLOCKDIGITS } from "./digits";

/**
 * Notes:
 * - Four digits (HH:MM), each digit is a 4×6 grid = 24 mini clocks.
 * - Each mini clock has two hands (pseudo-elements). We drive their angles with CSS variables.
 * - This file avoids Sass/Pug by computing the 24 angle pairs in JS and inlining them per cell.
 */

export default function Clock({
  size = "2rem", // size of each mini-clock (CSS length)
  gap = "0.25rem", // gap between mini-clocks
  color = "#000", // hand color (with glow)
  bg = "#f3f3f3", // background behind the widget
  twelveHour = true, // 12h like the pen
  tickMs = 1000, // update interval
  hrs = 0,
  min = 0,
  sec = 0,
  tms = 0,
  showHrs = true,
  showMin = true,
  showSec = true,
  value = 90,
}: {
  size?: string;
  gap?: string;
  color?: string;
  bg?: string;
  twelveHour?: boolean;
  tickMs?: number;
  hrs?: number;
  min?: number;
  sec?: number;
  tms?: number;
  showHrs?: boolean;
  showMin?: boolean;
  showSec?: boolean;
  value?: number;
}) {
  const [dTime, setNow] = useState(new Date());

  const DIGITS: Record<string, [number, number][]> = useMemo(
    () => CLOCKDIGITS,
    []
  );

  useEffect(() => {
    const id = setInterval(
      () => setNow(tms ? new Date(tms) : new Date()),
      tickMs
    );
    return () => clearInterval(id);
  }, [tickMs]);

  // -------------- helpers --------------
  function twoDigits(n: number) {
    return n < 10 ? [0, n] : [Math.floor(n / 10), n % 10];
  }

  const hours = hrs ? new Date().setHours(hrs) : dTime.getHours();
  const minutes = min ? new Date().setMinutes(min) : dTime.getMinutes();
  const seconds = sec ? new Date().setSeconds(sec) : dTime.getSeconds();
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
          scale: value / 100,
        } as React.CSSProperties
      }
    >
      <div className="container">
        {showHrs && (
          <div className="timebox hour">
            {hourList.map((d, di) => (
              <Digit key={di} pattern={DIGITS[d]} />
            ))}
          </div>
        )}
        {/* <div className="timebox colonbox">
          {colenList.map((d, di) => (
            <Colon key={di} pattern={COLON[d]} />
          ))}
        </div> */}
        {showMin && (
          <div className="timebox minute">
            {minuteList.map((d, di) => (
              <Digit key={di} pattern={DIGITS[d]} />
            ))}
            {/* <span className="ampmt">{ampm}</span> */}
          </div>
        )}
        {/* <div className="timebox colonbox">
          {colenList.map((d, di) => (
            <Colon key={di} pattern={COLON[d]} />
          ))}
        </div>*/}
        {showSec && (
          <div className="timebox seconds">
            {secondList.map((d, di) => (
              <Digit key={di} pattern={DIGITS[d]} />
            ))}
          </div>
        )}
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
