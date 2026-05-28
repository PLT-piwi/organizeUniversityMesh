import { useEffect, useRef } from "react";
import { useMalla } from "../../context/MallaContext.jsx";
import { Modal } from "../ui/Modal.jsx";
import { btnStyle } from "../ui/btnStyle.js";
import { COLOR_PRESETS } from "../../constants/colors.js";
import { isDefaultCategory } from "../../constants/categories.js";

export function CategoryManagerModal() {
  const {
    courses,
    categories,
    showCatManager,
    setShowCatManager,
    editingCat,
    setEditingCat,
    catForm,
    setCatForm,
    openEditCat,
    saveCat,
    setConfirmDeleteCat,
  } = useMalla();

  const formRef = useRef(null);

  useEffect(() => {
    if (editingCat && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [editingCat]);

  if (!showCatManager) return null;

  return (
    <Modal
              onClose={() => {
                setShowCatManager(false);
                setEditingCat(null);
                setCatForm({ label: "", colorId: "teal" });
              }}
              wide
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 600, color: "#1A1A2E" }}>
                  Gestionar categorías
                </div>
                <button
                  onClick={() => {
                    setShowCatManager(false);
                    setEditingCat(null);
                  }}
                  style={btnStyle("ghost", "sm")}
                >
                  ✕
                </button>
              </div>
    
              {/* List */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  marginBottom: 20,
                  maxHeight: 260,
                  overflowY: "auto",
                }}
              >
                {categories.map((cat) => {
                  const col =
                    COLOR_PRESETS.find((p) => p.id === cat.colorId) ||
                    COLOR_PRESETS[0];
                  const count = courses.filter((c) => c.category === cat.id).length;
                  return (
                    <div
                      key={cat.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "9px 12px",
                        paddingRight: 56,
                        background:
                          editingCat === cat.id ? "#EEF2FF" : "#F8F9FA",
                        borderRadius: 9,
                        border:
                          editingCat === cat.id
                            ? "1px solid #C7D2FE"
                            : "1px solid #E8ECF0",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: "50%",
                          background: col.border,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: "#1A1A2E",
                          flex: 1,
                          minWidth: 0,
                        }}
                      >
                        {cat.label}
                        {isDefaultCategory(cat.id) && (
                          <span
                            style={{
                              marginLeft: 6,
                              fontSize: 9,
                              color: "#94A3B8",
                              fontWeight: 600,
                            }}
                          >
                            base
                          </span>
                        )}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: "#94A3B8",
                          flexShrink: 0,
                        }}
                      >
                        {count} ramo{count !== 1 ? "s" : ""}
                      </span>
                      <div
                        style={{
                          position: "absolute",
                          right: 8,
                          top: "50%",
                          transform: "translateY(-50%)",
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <button
                          className="bico"
                          type="button"
                          onClick={() => openEditCat(cat)}
                          style={{ fontSize: 13, color: "#94A3B8" }}
                          title="Editar categoría"
                        >
                          ✎
                        </button>
                        {count > 0 ? (
                          <span
                            title="Reasigna o elimina los ramos primero"
                            style={{
                              width: 22,
                              fontSize: 9,
                              color: "#CBD5E1",
                              textAlign: "center",
                              flexShrink: 0,
                              cursor: "help",
                            }}
                          >
                            en uso
                          </span>
                        ) : (
                          <button
                            className="bico"
                            type="button"
                            onClick={() => setConfirmDeleteCat(cat.id)}
                            style={{ fontSize: 14, color: "#FDA4AF" }}
                            title="Eliminar categoría"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
    
              {/* Add / Edit form */}
              <div
                ref={formRef}
                style={{
                  background: "#F0F4FF",
                  borderRadius: 10,
                  padding: 16,
                  border: "1px solid #E0E7FF",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#4338CA",
                    marginBottom: 12,
                  }}
                >
                  {editingCat
                    ? `Editar: ${categories.find((c) => c.id === editingCat)?.label}`
                    : "Nueva categoría"}
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label
                    style={{
                      fontSize: 11,
                      color: "#64748B",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    Nombre *
                  </label>
                  <input
                    value={catForm.label}
                    onChange={(e) =>
                      setCatForm({ ...catForm, label: e.target.value })
                    }
                    placeholder="Ej: Minor, Major, Optativo…"
                    style={{ maxWidth: 260 }}
                  />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label
                    style={{
                      fontSize: 11,
                      color: "#64748B",
                      display: "block",
                      marginBottom: 8,
                    }}
                  >
                    Color
                  </label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {COLOR_PRESETS.map((p) => (
                      <div
                        key={p.id}
                        className={`color-dot${catForm.colorId === p.id ? " sel" : ""}`}
                        style={{ background: p.border }}
                        title={p.id}
                        onClick={() => setCatForm({ ...catForm, colorId: p.id })}
                      />
                    ))}
                  </div>
                  {/* preview */}
                  {catForm.label && (
                    <div
                      style={{
                        marginTop: 10,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "4px 10px",
                        borderRadius: 99,
                        background: (
                          COLOR_PRESETS.find((p) => p.id === catForm.colorId) ||
                          COLOR_PRESETS[0]
                        ).badge,
                        color: (
                          COLOR_PRESETS.find((p) => p.id === catForm.colorId) ||
                          COLOR_PRESETS[0]
                        ).text,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: (
                            COLOR_PRESETS.find((p) => p.id === catForm.colorId) ||
                            COLOR_PRESETS[0]
                          ).border,
                        }}
                      />
                      {catForm.label}
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={saveCat} style={btnStyle("primary", "sm")}>
                    {editingCat ? "Guardar cambios" : "Crear categoría"}
                  </button>
                  {editingCat && (
                    <button
                      onClick={() => {
                        setEditingCat(null);
                        setCatForm({ label: "", colorId: "teal" });
                      }}
                      style={btnStyle("ghost", "sm")}
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
    </Modal>
  );
}
