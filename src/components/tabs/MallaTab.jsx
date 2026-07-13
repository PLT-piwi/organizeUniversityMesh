import { useRef, useEffect } from "react";
import { useMalla } from "../../context/MallaContext.jsx";
import { SemesterColumn } from "../SemesterColumn.jsx";
import { CourseCard } from "../CourseCard.jsx";
import { UNASSIGNED_ID } from "../../constants/config.js";

export function MallaTab() {
  const mallaScrollRef = useRef(null);
  const m = useMalla();
  const {
    courses,
    semesters,
    setSemesters,
    approved,
    categories,
    dragging,
    dragOver,
    setDragOver,
    setHoveredCourse,
    getCourse,
    getColor,
    unassignedIds,
    handleDragStart,
    handleDrop,
    handleDropUnassigned,
    toggleApproved,
    getHighlighted,
    startEdit,
    setConfirmDelete,
    addSemester,
    removeSemester,
    theme,
  } = m;

  useEffect(() => {
    const handleDragOver = (e) => {
      if (!dragging || !mallaScrollRef.current) return;

      const container = mallaScrollRef.current;
      const rect = container.getBoundingClientRect();

      const edgeSize = 150; // distancia al borde
      const speed = 18; // velocidad scroll

      // scroll horizontal
      if (e.clientX > rect.right - edgeSize) {
        container.scrollLeft += speed;
      } else if (e.clientX < rect.left + edgeSize) {
        container.scrollLeft -= speed;
      }

      // scroll vertical página
      if (e.clientY > window.innerHeight - edgeSize) {
        window.scrollBy(0, speed);
      } else if (e.clientY < edgeSize) {
        window.scrollBy(0, -speed);
      }
    };

    window.addEventListener("dragover", handleDragOver);

    return () => {
      window.removeEventListener("dragover", handleDragOver);
    };
  }, [dragging]);

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
        <span style={{ fontSize: 11, color: theme.textMuted }}>
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
          color: theme.textSecondary,
          background: theme.surfaceAlt,
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
        ref={mallaScrollRef}
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
        <button
          onClick={addSemester}
          style={{
            minWidth: 42,
            height: 42,
            borderRadius: 10,
            border: `2px dashed ${theme.dashedBorder}`,
            background: "none",
            cursor: "pointer",
            color: theme.textMuted,
            fontSize: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 24,
            flexShrink: 0,
            transition: "all .15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#6366F1")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.borderColor = theme.dashedBorder)
          }
        >
          +
        </button>
      </div>
      {unassignedIds.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: theme.textMuted,
              marginBottom: 6,
              textTransform: "uppercase",
              letterSpacing: 0.8,
            }}
          >
            Sin asignar
          </div>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(UNASSIGNED_ID);
            }}
            onDrop={handleDropUnassigned}
            onDragLeave={() => setDragOver(null)}
            style={{
              background:
                dragOver === UNASSIGNED_ID
                  ? theme.dropHighlightBg
                  : theme.subtle,
              borderRadius: 10,
              padding: 10,
              border: `2px dashed ${dragOver === UNASSIGNED_ID ? "#6366F1" : theme.dashedBorder}`,
              minHeight: 60,
              transition: "all .15s",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(172px, 1fr))",
              gap: 8,
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
                  onDragStart={(e) => handleDragStart(e, cid, UNASSIGNED_ID)}
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
    </div>
  );
}
