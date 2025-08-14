function Colon({ pattern }: { pattern: [number, number][] }) {
  // Fall back to zeros if pattern is missing
  const pairs = pattern ?? new Array(24).fill([0, 0]);
  return (
    <>
      <div className="colon">
        {pairs.map(([a, b], i) => (
          <div
            key={i}
            className="clock"
            style={
              { "--ai": String(a), "--bi": String(b) } as React.CSSProperties
            }
          />
        ))}
      </div>
    </>
  );
}

export default Colon;
