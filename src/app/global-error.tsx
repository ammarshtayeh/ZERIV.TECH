"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#07080a",
          color: "#e8e2d2",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <main style={{ padding: "2rem", maxWidth: "36rem" }}>
          <p style={{ margin: 0, letterSpacing: "0.2em", fontSize: 11, opacity: 0.55 }}>ZERIV / ERROR</p>
          <h1 style={{ margin: "0.4em 0 0.3em", fontSize: "clamp(3rem, 12vw, 6rem)", letterSpacing: "-0.05em" }}>
            SIGNAL INTERRUPTED
          </h1>
          <button
            type="button"
            onClick={reset}
            style={{
              background: "none",
              color: "#e8e2d2",
              border: "none",
              borderBottom: "1px solid rgba(232,226,210,0.2)",
              padding: "0.4rem 0",
              letterSpacing: "0.18em",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            RETRY SYSTEM →
          </button>
        </main>
      </body>
    </html>
  );
}
