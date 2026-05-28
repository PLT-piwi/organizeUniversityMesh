import { useMalla } from "../../context/MallaContext.jsx";
import { SemesterColumn } from "../SemesterColumn.jsx";
import { CourseCard } from "../CourseCard.jsx";
import { UNASSIGNED_ID } from "../../constants/config.js";

export function MallaTab() {
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
              <div>
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    marginBottom: 14,
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ fontSize: 11, color: "#94A3B8" }}>
                    Arrastra para mover · Click para aprobar · Hover para ver
                    prerequisitos
                  </span>
                  <div
                    style={{
                      marginLeft: "auto",
                      display: "flex",
                      gap: 4,
                      flexWrap: "wrap",
                    }}
                  >
                    {categories.map((cat) => {
                      const col = getColor(cat.id);
                      return (
                        <span
                          key={cat.id}
                          style={{
                            fontSize: 10,
                            padding: "2px 8px",
                            borderRadius: 99,
                            background: col.badge,
                            color: col.text,
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: col.border,
                              display: "inline-block",
                            }}
                          />
                          {cat.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    marginBottom: 10,
                    fontSize: 11,
                    color: "#64748B",
                    background: "#F8F9FA",
                    padding: "5px 12px",
                    borderRadius: 8,
                    width: "fit-content",
                  }}
                >
                  <span style={{ color: "#6366F1", fontWeight: 600 }}>
                    ● seleccionado
                  </span>
                  <span style={{ color: "#F59E0B", fontWeight: 600 }}>
                    ● prerequisito
                  </span>
                  <span style={{ color: "#22C55E", fontWeight: 600 }}>
                    ● depende de él
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    overflowX: "auto",
                    paddingBottom: 8,
                    alignItems: "flex-start",
                  }}
                >
                  {semesters.map((sem) => (
                    <SemesterColumn
                      key={sem.id}
                      sem={sem}
                      courses={courses}
                      approved={approved}
                      dragging={dragging}
                      dragOver={dragOver}
                      onDragStart={handleDragStart}
                      onDrop={handleDrop}
                      setDragOver={setDragOver}
                      setHoveredCourse={setHoveredCourse}
                      onToggleApproved={toggleApproved}
                      onRemove={removeSemester}
                      setSemesters={setSemesters}
                      getHighlighted={getHighlighted}
                      getColor={getColor}
                      onEdit={startEdit}
                      onDelete={(id) => setConfirmDelete(id)}
                    />
                  ))}
                  {unassignedIds.length > 0 && (
                    <div
                      style={{ minWidth: 172, maxWidth: 172 }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(UNASSIGNED_ID);
                      }}
                      onDrop={handleDropUnassigned}
                      onDragLeave={() => setDragOver(null)}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: "#94A3B8",
                          marginBottom: 6,
                          textTransform: "uppercase",
                          letterSpacing: 0.8,
                        }}
                      >
                        Sin asignar
                      </div>
                      <div
                        style={{
                          background:
                            dragOver === UNASSIGNED_ID ? "#EEF2FF" : "#F1F5F9",
                          borderRadius: 10,
                          padding: 6,
                          border: `2px dashed ${dragOver === UNASSIGNED_ID ? "#6366F1" : "#CBD5E1"}`,
                          minHeight: 60,
                          transition: "all .15s",
                        }}
                      >
                        {unassignedIds.map((cid) => {
                          const c = getCourse(cid);
                          if (!c) return null;
                          return (
                            <CourseCard
                              key={cid}
                              course={c}
                              col={getColor(c.category)}
                              approved={approved.has(cid)}
                              highlighted={getHighlighted(cid)}
                              isDragging={dragging?.courseId === cid}
                              onDragStart={(e) =>
                                handleDragStart(e, cid, UNASSIGNED_ID)
                              }
                              onHover={setHoveredCourse}
                              onToggle={() => toggleApproved(cid)}
                              onEdit={() => startEdit(c)}
                              onDelete={() => setConfirmDelete(cid)}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}
                  <button
                    onClick={addSemester}
                    style={{
                      minWidth: 42,
                      height: 42,
                      borderRadius: 10,
                      border: "2px dashed #CBD5E1",
                      background: "none",
                      cursor: "pointer",
                      color: "#94A3B8",
                      fontSize: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 24,
                      flexShrink: 0,
                      transition: "all .15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = "#6366F1")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = "#CBD5E1")
                    }
                  >
                    +
                  </button>
                </div>
              </div>
  );
}
