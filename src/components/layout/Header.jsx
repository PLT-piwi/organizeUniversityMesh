import { useState, useEffect } from "react";
import { useMalla } from "../../context/MallaContext.jsx";
import { btnStyle } from "../ui/btnStyle.js";

export function Header() {
  const {
    careerName,
    setCareerName,
    editingName,
    setEditingName,
    activeTab,
    setActiveTab,
    setShowCatManager,
    setEditingCat,
    setCatForm,
    setConfirmReset,
    importJSON,
    exportJSON,
  } = useMalla();

  const [zoom, setZoom] = useState(() => {
    return Number(localStorage.getItem("appZoom")) || 100;
  });

  useEffect(() => {
    document.body.style.zoom = `${zoom}%`;
    localStorage.setItem("appZoom", zoom);
  }, [zoom]);

  return (
    <div
      style={{
        background: "#fff",
        borderBottom: "1px solid #E8ECF0",
        padding: "0 18px",
      }}
    >
      <div
        style={{
          maxWidth: 1500,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: 10,
          height: 54,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            background: "linear-gradient(135deg,#6366F1,#FB923C)",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span style={{ color: "#fff", fontSize: 14 }}>⬡</span>
        </div>
        {editingName ? (
          <input
            value={careerName}
            onChange={(e) => setCareerName(e.target.value)}
            onBlur={() => setEditingName(false)}
            onKeyDown={(e) => e.key === "Enter" && setEditingName(false)}
            autoFocus
            style={{
              fontSize: 15,
              fontWeight: 600,
              border: "none",
              outline: "none",
              background: "transparent",
              width: 360,
              padding: 0,
            }}
          />
        ) : (
          <span
            style={{
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              color: "#1A1A2E",
            }}
            onClick={() => setEditingName(true)}
            title="Editar nombre"
          >
            {careerName}{" "}
            <span style={{ fontSize: 11, color: "#CBD5E1" }}>✎</span>
          </span>
        )}
        <div style={{ display: "flex", gap: 2, marginLeft: "auto" }}>
          {[
            ["malla", "🗺 Malla"],
            ["progreso", "📊 Progreso"],
            ["ramos", "📚 Ramos"],
          ].map(([t, l]) => (
            <button
              key={t}
              className="tab"
              onClick={() => setActiveTab(t)}
              style={{
                padding: "4px 13px",
                borderRadius: 7,
                fontSize: 12,
                fontWeight: 500,
                background: activeTab === t ? "#6366F1" : "transparent",
                color: activeTab === t ? "#fff" : "#64748B",
              }}
            >
              {l}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            marginRight: 5,
            padding: "2px 4px",
            background: "#F8FAFC",
            border: "1px solid #E2E8F0",
            borderRadius: 7,
            height: 28,
          }}
        >
          <button
            onClick={() => setZoom((z) => Math.max(z - 10, 60))}
            style={{
              width: 20,
              height: 20,
              border: "none",
              borderRadius: 5,
              background: "transparent",
              cursor: "pointer",
              color: "#64748B",
              fontSize: 12,
              fontWeight: 600,
              padding: 0,
              lineHeight: 1,
            }}
            title="Achicar"
          >
            −
          </button>

          <span
            style={{
              fontSize: 10,
              minWidth: 32,
              textAlign: "center",
              color: "#475569",
              fontWeight: 600,
              userSelect: "none",
            }}
          >
            {zoom}%
          </span>

          <button
            onClick={() => setZoom((z) => Math.min(z + 10, 200))}
            style={{
              width: 20,
              height: 20,
              border: "none",
              borderRadius: 5,
              background: "transparent",
              cursor: "pointer",
              color: "#64748B",
              fontSize: 12,
              fontWeight: 600,
              padding: 0,
              lineHeight: 1,
            }}
            title="Agrandar"
          >
            +
          </button>
        </div>

        <div style={{ display: "flex", gap: 5, marginLeft: 8 }}>
          <button
            onClick={() => {
              setShowCatManager(true);
              setEditingCat(null);
              setCatForm({ label: "", colorId: "teal" });
            }}
            style={{
              fontSize: 12,
              padding: "4px 10px",
              borderRadius: 7,
              border: "1px solid #E0E7FF",
              color: "#4338CA",
              background: "#EEF2FF",
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontWeight: 500,
            }}
          >
            🏷 Categorías
          </button>
          <label
            style={{
              cursor: "pointer",
              fontSize: 12,
              padding: "4px 10px",
              borderRadius: 7,
              border: "1px solid #E2E8F0",
              color: "#64748B",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              gap: 4,
              whiteSpace: "nowrap",
            }}
          >
            ↑ Importar{" "}
            <input
              type="file"
              accept=".json"
              onChange={importJSON}
              style={{ display: "none" }}
            />
          </label>
          <button
            onClick={exportJSON}
            style={{
              fontSize: 12,
              padding: "4px 10px",
              borderRadius: 7,
              border: "1px solid #E2E8F0",
              color: "#64748B",
              cursor: "pointer",
              background: "#fff",
              whiteSpace: "nowrap",
            }}
          >
            ↓ Exportar
          </button>
          <button
            onClick={() => setConfirmReset(true)}
            style={{
              fontSize: 12,
              padding: "4px 10px",
              borderRadius: 7,
              border: "1px solid #FECACA",
              color: "#EF4444",
              cursor: "pointer",
              background: "#FFF5F5",
              whiteSpace: "nowrap",
            }}
          >
            ↺ Reset
          </button>
        </div>
      </div>
    </div>
  );
}
