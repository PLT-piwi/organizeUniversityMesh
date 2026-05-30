import { useRef } from "react";
import { useMalla } from "../../context/MallaContext.jsx";
import { btnStyle } from "../ui/btnStyle.js";
import { COLOR_PRESETS } from "../../constants/colors.js";

export function RamosTab() {
  const editSectionRef = useRef(null);
  const m = useMalla();
  const {
    courses,
    setCourses,
    semesters,
    setSemesters,
    approved,
    setApproved,
    categories,
    setCategories,
    careerName,
    setCareerName,
    editingName,
    setEditingName,
    dragging,
    setDragging,
    dragOver,
    setDragOver,
    hoveredCourse,
    setHoveredCourse,
    activeTab,
    setActiveTab,
    notification,
    showAddCourse,
    setShowAddCourse,
    editingCourse,
    setEditingCourse,
    newCourse,
    setNewCourse,
    filterCat,
    setFilterCat,
    confirmDelete,
    setConfirmDelete,
    showCatManager,
    setShowCatManager,
    editingCat,
    setEditingCat,
    catForm,
    setCatForm,
    confirmDeleteCat,
    setConfirmDeleteCat,
    setConfirmClearAll,
    notify,
    getCourse,
    getColor,
    unassignedIds,
    handleDragStart,
    handleDrop,
    handleDropUnassigned,
    toggleApproved,
    getHighlighted,
    saveCourse,
    startEdit,
    deleteCourse,
    openNewCat,
    openEditCat,
    saveCat,
    deleteCat,
    addSemester,
    removeSemester,
    totalCredits,
    approvedCreds,
    progress,
    catStats,
    exportJSON,
    importJSON,
    resetAll,
    filteredCourses,
  } = m;

  return (
    <div style={{ animation: "fadeIn .2s ease" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          <button
            onClick={() => setFilterCat("all")}
            className="tab"
            style={{
              padding: "4px 11px",
              borderRadius: 7,
              fontSize: 11,
              background: filterCat === "all" ? "#1A1A2E" : "#F1F5F9",
              color: filterCat === "all" ? "#fff" : "#64748B",
              fontWeight: 500,
            }}
          >
            Todos ({courses.length})
          </button>
          {categories
            .filter((cat) => courses.some((c) => c.category === cat.id))
            .map((cat) => {
              const col = getColor(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => setFilterCat(cat.id)}
                  className="tab"
                  style={{
                    padding: "4px 11px",
                    borderRadius: 7,
                    fontSize: 11,
                    fontWeight: 500,
                    background: filterCat === cat.id ? col.border : "#F1F5F9",
                    color: filterCat === cat.id ? "#fff" : col.text,
                  }}
                >
                  {cat.label} (
                  {courses.filter((c) => c.category === cat.id).length})
                </button>
              );
            })}
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <button
            onClick={() => {
              setShowAddCourse(!showAddCourse);
              setEditingCourse(null);
              setNewCourse({
                name: "",
                code: "",
                credits: 5,
                category: categories[0]?.id || "diseno",
                prereqs: [],
              });
            }}
            style={btnStyle(
              showAddCourse && !editingCourse ? "ghost" : "primary",
            )}
          >
            {showAddCourse && !editingCourse ? "✕ Cancelar" : "+ Agregar ramo"}
          </button>
          {courses.length > 0 && (
            <button
              type="button"
              onClick={() => setConfirmClearAll(true)}
              style={{
                fontSize: 12,
                padding: "6px 14px",
                borderRadius: 8,
                border: "1px solid #FECACA",
                color: "#DC2626",
                background: "#FFF5F5",
                cursor: "pointer",
                fontWeight: 500,
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              Vaciar todos los ramos
            </button>
          )}
        </div>
      </div>

      {showAddCourse && (
        <div
          ref={editSectionRef}
          style={{
            background: "#fff",
            borderRadius: 11,
            padding: 18,
            border: "1px solid #E8ECF0",
            marginBottom: 16,
            animation: "fadeIn .15s ease",
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 12,
              color: "#1A1A2E",
            }}
          >
            {editingCourse ? "Editar ramo" : "Nuevo ramo"}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <div>
              <label
                style={{
                  fontSize: 11,
                  color: "#64748B",
                  display: "block",
                  marginBottom: 3,
                }}
              >
                Nombre *
              </label>
              <input
                value={newCourse.name}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, name: e.target.value })
                }
                placeholder="Ej: Diseño de Productos III"
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: 11,
                  color: "#64748B",
                  display: "block",
                  marginBottom: 3,
                }}
              >
                Sigla *
              </label>
              <input
                value={newCourse.code}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, code: e.target.value })
                }
                placeholder="Ej: DIS301"
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: 11,
                  color: "#64748B",
                  display: "block",
                  marginBottom: 3,
                }}
              >
                Créditos
              </label>
              <input
                type="number"
                value={newCourse.credits}
                onChange={(e) => {
                  const value = e.target.value;
                  // Solo acepta dígitos
                  if (/^\d*$/.test(value)) {
                    setNewCourse({
                      ...newCourse,
                      credits: value === "" ? "" : parseInt(value, 10),
                    });
                  }
                }}
                onKeyDown={(e) => {
                  // Bloquea cualquier tecla que no sea número
                  if (
                    !/[0-9]/.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== "Delete" &&
                    e.key !== "ArrowLeft" &&
                    e.key !== "ArrowRight" &&
                    e.key !== "Tab"
                  ) {
                    e.preventDefault();
                  }
                  if (
                    newCourse.credits?.toString().length >= 2 &&
                    /[0-9]/.test(e.key)
                  ) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: 11,
                  color: "#64748B",
                  display: "block",
                  marginBottom: 3,
                }}
              >
                Categoría
              </label>
              <select
                value={newCourse.category}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, category: e.target.value })
                }
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label
              style={{
                fontSize: 11,
                color: "#64748B",
                display: "block",
                marginBottom: 5,
              }}
            >
              Prerequisitos
            </label>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 5,
                background: "#F8F9FA",
                borderRadius: 8,
                padding: 9,
                border: "1px solid #E2E8F0",
                maxHeight: 120,
                overflowY: "auto",
              }}
            >
              {courses
                .filter((c) => !editingCourse || c.id !== editingCourse)
                .map((c) => {
                  const sel = newCourse.prereqs.includes(c.id);
                  const col = getColor(c.category);
                  return (
                    <button
                      key={c.id}
                      onClick={() =>
                        setNewCourse((prev) => ({
                          ...prev,
                          prereqs: sel
                            ? prev.prereqs.filter((p) => p !== c.id)
                            : [...prev.prereqs, c.id],
                        }))
                      }
                      style={{
                        fontSize: 11,
                        padding: "3px 8px",
                        borderRadius: 6,
                        cursor: "pointer",
                        fontFamily: "'DM Mono',monospace",
                        fontWeight: 500,
                        border: `1.5px solid ${sel ? col.border : "#E2E8F0"}`,
                        background: sel ? col.badge : "#fff",
                        color: sel ? col.text : "#94A3B8",
                        transition: "all .12s",
                      }}
                    >
                      {c.code}
                    </button>
                  );
                })}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={saveCourse} style={btnStyle("primary", "sm")}>
              {editingCourse ? "Guardar cambios" : "Agregar ramo"}
            </button>
            <button
              onClick={() => {
                setShowAddCourse(false);
                setEditingCourse(null);
              }}
              style={btnStyle("ghost", "sm")}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(248px,1fr))",
          gap: 9,
        }}
      >
        {filteredCourses.map((c) => {
          const col = getColor(c.category);
          const isApp = approved.has(c.id);
          const semName =
            semesters.find((s) => s.courses.includes(c.id))?.name ||
            "Sin asignar";
          const catLabel =
            categories.find((cat) => cat.id === c.category)?.label ||
            c.category;
          return (
            <div
              key={c.id}
              style={{
                background: "#fff",
                borderRadius: 10,
                padding: 13,
                border: `1px solid ${isApp ? "#BBF7D0" : "#E8ECF0"}`,
                transition: "border-color .15s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 8,
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      gap: 5,
                      alignItems: "center",
                      marginBottom: 5,
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        fontFamily: "'DM Mono',monospace",
                        color: col.text,
                        background: col.badge,
                        padding: "2px 6px",
                        borderRadius: 4,
                        fontWeight: 600,
                      }}
                    >
                      {c.code}
                    </span>
                    <span
                      style={{
                        fontSize: 9,
                        padding: "1px 6px",
                        borderRadius: 99,
                        background: col.badge,
                        color: col.text,
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: col.border,
                          display: "inline-block",
                        }}
                      />
                      {catLabel}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#1A1A2E",
                      lineHeight: 1.35,
                      marginBottom: 3,
                    }}
                  >
                    {c.name}
                  </div>
                  <div style={{ fontSize: 11, color: "#94A3B8" }}>
                    {semName} · {c.credits} cr.
                  </div>
                  {c.prereqs.length > 0 && (
                    <div
                      style={{
                        marginTop: 5,
                        display: "flex",
                        gap: 4,
                        flexWrap: "wrap",
                      }}
                    >
                      {c.prereqs.map((pid) => {
                        const pc = getCourse(pid);
                        return pc ? (
                          <span
                            key={pid}
                            style={{
                              fontSize: 9,
                              padding: "1px 5px",
                              borderRadius: 4,
                              background: "#F1F5F9",
                              color: "#64748B",
                              fontFamily: "'DM Mono',monospace",
                            }}
                          >
                            → {pc.code}
                          </span>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    flexShrink: 0,
                  }}
                >
                  <button
                    onClick={() => toggleApproved(c.id)}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 99,
                      border: `2px solid ${isApp ? "#22C55E" : "#E2E8F0"}`,
                      background: isApp ? "#22C55E" : "transparent",
                      cursor: "pointer",
                      fontSize: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      transition: "all .15s",
                    }}
                  >
                    {isApp ? "✓" : ""}
                  </button>
                  <button
                    className="bico"
                    onClick={() => {
                      startEdit(c);

                      setTimeout(() => {
                        if (editSectionRef.current) {
                          const targetPosition =
                            editSectionRef.current.getBoundingClientRect().top;

                          const startPosition = window.pageYOffset;
                          const distance = targetPosition - startPosition;
                          const duration = 1200; // más alto = más lenta

                          let start = null;

                          function animation(currentTime) {
                            if (!start) start = currentTime;

                            const timeElapsed = currentTime - start;
                            const progress = Math.min(
                              timeElapsed / duration,
                              1,
                            );

                            // easing suave
                            const ease =
                              progress < 0.5
                                ? 2 * progress * progress
                                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

                            window.scrollTo(0, startPosition + distance * ease);

                            if (timeElapsed < duration) {
                              requestAnimationFrame(animation);
                            }
                          }

                          requestAnimationFrame(animation);
                        }
                      }, 150);
                    }}
                    style={{ fontSize: 12, color: "#94A3B8" }}
                  >
                    ✎
                  </button>
                  <button
                    className="bico"
                    onClick={() => setConfirmDelete(c.id)}
                    style={{ fontSize: 14, color: "#FDA4AF" }}
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
