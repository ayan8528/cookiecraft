import React, { useEffect, useState } from "react";

export default function Footer(){
  const [s, setS] = useState(null);

  // Fetch settings from your public/data/settings.json file
  useEffect(() => {
    fetch("/data/settings.json")
      .then((r) => r.json())
      .then(setS);
  }, []);

  return (
    <footer style={{ marginTop: 40, borderTop: "1px solid var(--border)", background: "#fff" }}>
      <div className="container" style={{ display: "grid", gap: 16 }}>
        <div>
          <b>{s?.brandName || "CookieCraft"}</b>
          <div>{s?.tagline}</div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            fontSize: 14,
            color: "var(--muted)",
          }}
        >
          {s?.phone && <div>📞 {s.phone}</div>}
          {s?.email && <div>✉️ {s.email}</div>}
          {s?.address && <div>📍 {s.address}</div>}
          <span style={{ marginLeft: "auto" }}>
            © {new Date().getFullYear()} {s?.brandName || "CookieCraft"}
          </span>
        </div>
      </div>
    </footer>
  );
}
