"use client";

export default function GlobalError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en">
      <head>
        <title>Error — SellQuickest</title>
      </head>
      <body>
        <div style={{ padding: "40px", textAlign: "center", fontFamily: "sans-serif" }}>
          <h2>Something went wrong!</h2>
          <button
            onClick={() => retry()}
            style={{
              padding: "10px 20px",
              backgroundColor: "#10b981",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
