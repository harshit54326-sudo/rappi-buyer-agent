import { useState } from "react";

const METRICS = [
  { label: "Stock", value: "150 units", icon: "📦" },
  { label: "Incoming", value: "300 units", icon: "🚚" },
  { label: "Demand (7d)", value: "400 units", icon: "📈" },
  { label: "Budget", value: "₹50,000", icon: "💰" },
];

const getBadge = (decision) => {
  const approved = decision === "APPROVE";
  return (
    <span style={{
      display: "inline-block",
      padding: "4px 18px",
      borderRadius: "999px",
      fontSize: "13px",
      fontWeight: 700,
      letterSpacing: "1.5px",
      background: approved ? "#00ff9520" : "#ff4d4d20",
      color: approved ? "#00e676" : "#ff4d4d",
      border: `1px solid ${approved ? "#00e676" : "#ff4d4d"}`,
    }}>
      {approved ? "✅ APPROVED" : "❌ REJECTED"}
    </span>
  );
};

export default function App() {
  const [qty, setQty] = useState(150);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runAgent = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("http://localhost:8000/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qty: Number(qty) }),
      });
      if (!res.ok) throw new Error("Backend error");
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError("⚠️ Backend se connect nahi ho pa raha. FastAPI server chalu hai?");
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a0f 0%, #0d1117 50%, #0a0f1e 100%)",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      color: "#e2e8f0",
    }}>
      <div style={{
        borderBottom: "1px solid #ffffff10",
        padding: "20px 40px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        background: "#ffffff05",
      }}>
        <div style={{
          width: "36px", height: "36px",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          borderRadius: "10px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "18px",
        }}>🤖</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: "16px", color: "#fff" }}>Rappi Buyer Agent</div>
          <div style={{ fontSize: "12px", color: "#64748b" }}>AI-powered procurement decisions</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00e676", boxShadow: "0 0 8px #00e676" }}/>
          <span style={{ fontSize: "12px", color: "#00e676" }}>Live</span>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px", marginBottom: "40px",
        }}>
          {METRICS.map((m) => (
            <div key={m.label} style={{
              background: "#ffffff08", border: "1px solid #ffffff10",
              borderRadius: "16px", padding: "20px", textAlign: "center",
            }}>
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>{m.icon}</div>
              <div style={{ fontSize: "18px", fontWeight: 700, color: "#fff" }}>{m.value}</div>
              <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>{m.label}</div>
            </div>
          ))}
        </div>

        <div style={{
          background: "#ffffff08", border: "1px solid #ffffff15",
          borderRadius: "24px", padding: "40px", marginBottom: "32px",
        }}>
          <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
            Run Procurement Agent
          </h2>
          <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "32px" }}>
            Enter quantity → Agent decides: approve or reject based on stock, demand & budget.
          </p>

          <div style={{ display: "flex", gap: "16px", alignItems: "flex-end", marginBottom: "28px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "13px", color: "#94a3b8", display: "block", marginBottom: "8px", fontWeight: 500 }}>
                ORDER QUANTITY (units)
              </label>
              <input
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                min={1}
                style={{
                  width: "100%", padding: "14px 18px",
                  fontSize: "20px", fontWeight: 700,
                  background: "#0d1117", border: "1px solid #334155",
                  borderRadius: "12px", color: "#fff", outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <button
              onClick={runAgent}
              disabled={loading}
              style={{
                padding: "14px 36px", fontSize: "15px", fontWeight: 700,
                background: loading ? "#334155" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff", border: "none", borderRadius: "12px",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: loading ? "none" : "0 0 24px #6366f140",
                height: "54px", whiteSpace: "nowrap",
              }}
            >
              {loading ? "⏳ Thinking..." : "🚀 Run Agent"}
            </button>
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "12px", color: "#475569", lineHeight: "30px", marginRight: "4px" }}>Quick test:</span>
            {[50, 100, 150, 300, 800].map((v) => (
              <button key={v} onClick={() => setQty(v)} style={{
                padding: "5px 14px", fontSize: "13px",
                background: qty == v ? "#6366f130" : "#ffffff08",
                border: `1px solid ${qty == v ? "#6366f1" : "#ffffff15"}`,
                borderRadius: "8px",
                color: qty == v ? "#818cf8" : "#94a3b8",
                cursor: "pointer",
              }}>{v}</button>
            ))}
          </div>
        </div>

        {error && (
          <div style={{
            background: "#ff4d4d15", border: "1px solid #ff4d4d40",
            borderRadius: "16px", padding: "20px 24px",
            color: "#ff4d4d", fontSize: "14px", marginBottom: "24px",
          }}>{error}</div>
        )}

        {result && (
          <div style={{
            background: result.decision === "APPROVE" ? "#00e67608" : "#ff4d4d08",
            border: `1px solid ${result.decision === "APPROVE" ? "#00e67630" : "#ff4d4d30"}`,
            borderRadius: "24px", padding: "36px 40px",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
              <div>
                <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "8px", fontWeight: 500 }}>AGENT DECISION</div>
                {getBadge(result.decision)}
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "4px" }}>Confidence</div>
                <div style={{ fontSize: "28px", fontWeight: 800, color: result.confidence > 0.7 ? "#00e676" : "#f59e0b" }}>
                  {Math.round(result.confidence * 100)}%
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "28px" }}>
              {[
                { label: "Requested Qty", value: result.recommended_qty + " units" },
                { label: "Approved Qty", value: result.approved_qty + " units" },
                { label: "Validation", value: result.validation_passed ? "✅ Passed" : "❌ Failed" },
              ].map((s) => (
                <div key={s.label} style={{
                  background: "#ffffff05", border: "1px solid #ffffff10",
                  borderRadius: "12px", padding: "16px 20px",
                }}>
                  <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "6px" }}>{s.label}</div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#fff" }}>{s.value}</div>
                </div>
              ))}
            </div>

            <div style={{
              background: "#ffffff05", border: "1px solid #ffffff08",
              borderRadius: "12px", padding: "20px",
            }}>
              <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "8px", fontWeight: 500 }}>💡 AGENT REASONING</div>
              <div style={{ fontSize: "14px", color: "#cbd5e1", lineHeight: 1.7 }}>{result.reasoning}</div>
            </div>
          </div>
        )}
      </div>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; }`}</style>
    </div>
  );
}