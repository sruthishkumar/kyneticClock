import React, { useState, type JSX } from "react";
import {
  useTimer,
  msToHMSms,
  formatHMS,
  formatMSms,
  type TimerMode,
} from "./usetimer";
import Timer from "./timer";

export default function TimerDemo(): JSX.Element {
  const [mode, setMode] = useState<TimerMode>("stopwatch");
  const [duration, setDuration] = useState<number>(5 * 60_000); // 5 min

  const t = useTimer({
    mode,
    initialMs: mode === "countdown" ? duration : 0,
    autostart: false,
    onFinish: () => alert("Time’s up!"),
  });

  const display = formatMSms(t.ms);

  return (
    <div className="max-w-md mx-auto p-4 border rounded-xl">
      {/* Mode */}
      <div className="mb-3 flex gap-2">
        {(["stopwatch", "countdown"] as const).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              t.reset(m === "countdown" ? duration : 0);
            }}
            className={`px-3 py-1.5 rounded-md border ${
              mode === m ? "bg-black text-white" : ""
            }`}
            aria-pressed={mode === m}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Countdown duration input */}
      {mode === "countdown" && (
        <div className="mb-3 flex items-center gap-2 text-sm">
          <span>Duration (min):</span>
          <input
            type="number"
            min={0}
            value={Math.floor(duration / 60_000)}
            onChange={(e) => {
              const next = Math.max(0, Number(e.target.value) || 0) * 60_000;
              setDuration(next);
              t.reset(next);
            }}
            className="w-20 border rounded px-2 py-1"
          />
          <span className="text-xs text-gray-500">
            ({formatHMS(msToHMSms(duration))})
          </span>
        </div>
      )}

      {/* Display */}
      <div className="text-center my-6">
        <div className="text-5xl font-mono tabular-nums">
          <Timer showHrs={false} tms={t.ms} />
          {display}
        </div>
        {mode === "countdown" && (
          <div className="mt-3 h-2 bg-gray-200 rounded">
            <div
              className="h-full bg-black rounded"
              style={{
                width: `${Math.min(100, Math.max(0, t.progress * 100))}%`,
              }}
            />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 justify-center">
        {!t.running ? (
          <button
            className="px-4 py-2 rounded-md bg-black text-white"
            onClick={t.start}
          >
            Start
          </button>
        ) : (
          <button className="px-4 py-2 rounded-md border" onClick={t.pause}>
            Pause
          </button>
        )}
        <button className="px-4 py-2 rounded-md border" onClick={t.resume}>
          Resume
        </button>
        <button
          className="px-4 py-2 rounded-md border"
          onClick={() => t.reset(mode === "countdown" ? duration : 0)}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
