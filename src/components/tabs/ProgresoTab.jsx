import { useMalla } from "../../context/MallaContext.jsx";
import { COLOR_PRESETS } from "../../constants/colors.js";

export function ProgresoTab() {
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
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(145px,1fr))",
                    gap: 10,
                    marginBottom: 24,
                  }}
                >
                  {[
                    { label: "Ramos totales", value: courses.length, icon: "📚" },
                    { label: "Aprobados", value: approved.size, icon: "✅" },
                    {
                      label: "Pendientes",
                      value: courses.length - approved.size,
                      icon: "⏳",
                    },
                    { label: "Créditos aprob.", value: approvedCreds, icon: "⭐" },
                    { label: "Avance general", value: `${progress}%`, icon: "📈" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      style={{
                        background: "#fff",
                        borderRadius: 11,
                        padding: "13px 16px",
                        border: "1px solid #E8ECF0",
                      }}
                    >
                      <div style={{ fontSize: 18 }}>{s.icon}</div>
                      <div
                        style={{
                          fontSize: 24,
                          fontWeight: 600,
                          color: "#1A1A2E",
                          marginTop: 2,
                        }}
                      >
                        {s.value}
                      </div>
                      <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 1 }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      background: "#fff",
                      borderRadius: 11,
                      padding: 18,
                      border: "1px solid #E8ECF0",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        marginBottom: 14,
                        color: "#1A1A2E",
                      }}
                    >
                      Por categoría
                    </div>
                    {catStats.map(({ cat, label, colorId, total, done }) => {
                      const col =
                        COLOR_PRESETS.find((p) => p.id === colorId) ||
                        COLOR_PRESETS[0];
                      return (
                        <div key={cat} style={{ marginBottom: 11 }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: 3,
                            }}
                          >
                            <span
                              style={{
                                fontSize: 12,
                                fontWeight: 500,
                                color: col.text,
                                display: "flex",
                                alignItems: "center",
                                gap: 5,
                              }}
                            >
                              <span
                                style={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: "50%",
                                  background: col.border,
                                  display: "inline-block",
                                }}
                              />
                              {label}
                            </span>
                            <span style={{ fontSize: 11, color: "#94A3B8" }}>
                              {done}/{total}
                            </span>
                          </div>
                          <div
                            style={{
                              height: 6,
                              background: "#F1F5F9",
                              borderRadius: 99,
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                width: `${total > 0 ? (done / total) * 100 : 0}%`,
                                height: "100%",
                                background: col.border,
                                borderRadius: 99,
                                transition: "width .4s",
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    style={{
                      background: "#fff",
                      borderRadius: 11,
                      padding: 18,
                      border: "1px solid #E8ECF0",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        marginBottom: 14,
                        color: "#1A1A2E",
                      }}
                    >
                      Por semestre
                    </div>
                    {semesters.map((sem) => {
                      const total = sem.courses.length;
                      const done = sem.courses.filter((id) =>
                        approved.has(id),
                      ).length;
                      const pct = total > 0 ? Math.round((done / total) * 100) : 0;
                      return (
                        <div
                          key={sem.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 8,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 11,
                              color: "#64748B",
                              minWidth: 82,
                              flexShrink: 0,
                            }}
                          >
                            {sem.name}
                          </span>
                          <div
                            style={{
                              flex: 1,
                              height: 6,
                              background: "#F1F5F9",
                              borderRadius: 99,
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                width: `${pct}%`,
                                height: "100%",
                                background: pct === 100 ? "#22C55E" : "#6366F1",
                                borderRadius: 99,
                                transition: "width .4s",
                              }}
                            />
                          </div>
                          <span
                            style={{
                              fontSize: 11,
                              color: "#94A3B8",
                              minWidth: 32,
                              textAlign: "right",
                            }}
                          >
                            {done}/{total}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
  );
}
