import { useState } from "react";
import { CourseCard } from "./CourseCard.jsx";
import { useMalla } from "../context/MallaContext.jsx";

export function SemesterColumn({
  sem,
  courses,
  approved,
  dragging,
  dragOver,
  onDragStart,
  onDrop,
  setDragOver,
  setHoveredCourse,
  onToggleApproved,
  onRemove,
  setSemesters,
  getHighlighted,
  getColor,
  onEdit,
  onDelete,
}) {
  const { theme } = useMalla();
  const [editName, setEditName] = useState(false);
  const isDragOver = dragOver === sem.id;
  const semCourses = sem.courses
    .map((id) => courses.find((c) => c.id === id))
    .filter(Boolean);
  const semCredits = semCourses.reduce((a, c) => a + c.credits, 0);
  const approvedCount = semCourses.filter((c) => approved.has(c.id)).length;
  const allDone = semCourses.length > 0 && approvedCount === semCourses.length;

  return (
    <div
      style={{ minWidth: 170, maxWidth: 170, flexShrink: 0 }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(sem.id);
      }}
      onDrop={(e) => onDrop(e, sem.id)}
      onDragLeave={() => setDragOver(null)}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 5,
          gap: 4,
        }}
      >
        {editName ? (
          <input
            value={sem.name}
            onChange={(e) =>
              setSemesters((prev) =>
                prev.map((s) =>
                  s.id === sem.id ? { ...s, name: e.target.value } : s,
                ),
              )
            }
            onBlur={() => setEditName(false)}
            onKeyDown={(e) => e.key === "Enter" && setEditName(false)}
            autoFocus
            style={{
              fontSize: 11,
              fontWeight: 600,
              border: "none",
              outline: "none",
              background: "transparent",
              width: 108,
              padding: 0,
              color: theme.textSecondary,
            }}
          />
        ) : (
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: allDone ? "#16A34A" : theme.textSecondary,
              cursor: "pointer",
              flex: 1,
            }}
            onClick={() => setEditName(true)}
          >
            {sem.name}
            {allDone ? " ✓" : ""}
          </span>
        )}
        <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
          <span style={{ fontSize: 9, color: theme.textMuted }}>{semCredits}c</span>
          <button
            className="bico"
            onClick={() => onRemove(sem.id)}
            style={{ fontSize: 13, color: theme.textMuted, padding: "1px 3px" }}
          >
            ×
          </button>
        </div>
      </div>
      {approvedCount > 0 && !allDone && (
        <div style={{ fontSize: 9, color: "#16A34A", marginBottom: 4 }}>
          ✓ {approvedCount}/{semCourses.length}
        </div>
      )}
      <div
        style={{
          background: isDragOver ? theme.dropHighlightBg : theme.subtle,
          borderRadius: 10,
          padding: 6,
          border: `2px ${isDragOver ? "solid #6366F1" : `dashed ${theme.borderStrong}`}`,
          minHeight: 68,
          transition: "all .15s",
        }}
      >
        {semCourses.map((c) => (
          <CourseCard
            key={c.id}
            course={c}
            col={getColor(c.category)}
            approved={approved.has(c.id)}
            highlighted={getHighlighted(c.id)}
            isDragging={dragging?.courseId === c.id}
            onDragStart={(e) => onDragStart(e, c.id, sem.id)}
            onHover={setHoveredCourse}
            onToggle={() => onToggleApproved(c.id)}
            onEdit={() => onEdit(c)}
            onDelete={() => onDelete(c.id)}
          />
        ))}
        {semCourses.length === 0 && (
          <div
            style={{
              textAlign: "center",
              color: theme.textMuted,
              fontSize: 10,
              padding: "10px 0",
            }}
          >
            Suelta aquí
          </div>
        )}
      </div>
    </div>
  );
}
