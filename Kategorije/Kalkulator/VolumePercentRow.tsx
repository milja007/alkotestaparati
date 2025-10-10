"use client";

interface VolumePercentRowProps {
  label: string;
  ml: number;
  setMl: (n: number) => void;
  percent: number;
  setPercent: (n: number) => void;
  quickMl?: number[];
}

export default function VolumePercentRow({
  label,
  ml,
  setMl,
  percent,
  setPercent,
  quickMl = [],
}: VolumePercentRowProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginBottom: "1.5rem",
      }}
    >
      <h4 style={{ fontWeight: "600", fontSize: "1.125rem" }}>{label}</h4>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}
        className="sm:grid-cols-2"
      >
        <div>
          <label
            htmlFor={`${label.toLowerCase().replace(/\s+/g, "-")}-volume`}
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "var(--color-muted-foreground)",
              marginBottom: "0.5rem",
            }}
          >
            Volumen (mL)
          </label>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <input
              id={`${label.toLowerCase().replace(/\s+/g, "-")}-volume`}
              name={`${label.toLowerCase().replace(/\s+/g, "-")}-volume`}
              type="text"
              inputMode="numeric"
              style={{
                width: "100%",
                borderRadius: "0.75rem",
                background: "rgba(255, 255, 255, 0.4)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(148, 163, 184, 0.3)",
                padding: "0.75rem",
                fontWeight: "600",
                outline: "none",
                transition: "all 0.3s ease",
              }}
              value={ml}
              onChange={(e) => setMl(Number(e.target.value))}
              autoComplete="off"
            />
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {quickMl.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setMl(q)}
                  style={{
                    padding: "0.25rem 0.75rem",
                    borderRadius: "0.5rem",
                    background: "rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(148, 163, 184, 0.2)",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor={`${label.toLowerCase().replace(/\s+/g, "-")}-percent`}
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "var(--color-muted-foreground)",
              marginBottom: "0.5rem",
            }}
          >
            Jačina (%)
          </label>
          <input
            id={`${label.toLowerCase().replace(/\s+/g, "-")}-percent`}
            name={`${label.toLowerCase().replace(/\s+/g, "-")}-percent`}
            type="text"
            inputMode="decimal"
            style={{
              width: "100%",
              borderRadius: "0.75rem",
              background: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(148, 163, 184, 0.3)",
              padding: "0.75rem",
              fontWeight: "600",
              outline: "none",
              transition: "all 0.3s ease",
            }}
            value={percent}
            onChange={(e) => setPercent(Number(e.target.value))}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}
