import { useState } from "react";

export function CourseCard({
  course,
  col,
  approved,
  highlighted,
  isDragging,
  onDragStart,
  onHover,
  onToggle,
  onEdit,
  onDelete,
}) {
  const [hover, setHover] = useState(false);
  const borderColor =
    highlighted === "self"
      ? "#6366F1"
      : highlighted === "prereq"
        ? "#F59E0B"
        : highlighted === "coreq"
          ? "#06B6D4"
          : highlighted === "dependent"
            ? "#22C55E"
            : approved
              ? "#86EFAC"
              : col.border + "55";

  return (
    <div
      className="cc"
      draggable
      onDragStart={onDragStart}
      onMouseEnter={() => {
        onHover(course.id);
        setHover(true);
      }}
      onMouseLeave={() => {
        onHover(null);
        setHover(false);
      }}
      style={{
        background: approved ? "#F0FDF4" : col.bg,
        border: `1.5px solid ${borderColor}`,
        borderRadius: 8,
        padding: "6px 8px",
        marginBottom: 5,
        opacity: isDragging ? 0.4 : 1,
        position: "relative",
        boxShadow: highlighted ? "0 2px 10px rgba(99,102,241,.13)" : "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 3,
          right: 3,
          display: "flex",
          gap: 2,
          zIndex: 10,
          opacity: hover ? 1 : 0,
          pointerEvents: hover ? "auto" : "none",
          transition: "opacity .12s",
        }}
      >
          <button
            className="bico"
            onMouseDown={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            style={{
              fontSize: 11,
              color: "#94A3B8",
              background: "rgba(255,255,255,.95)",
              borderRadius: 4,
              padding: "1px 4px",
            }}
          >
            ✎
          </button>
          <button
            className="bico"
            onMouseDown={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            style={{
              fontSize: 12,
              color: "#F87171",
              background: "rgba(255,255,255,.95)",
              borderRadius: 4,
              padding: "1px 4px",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 4,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }} onClick={onToggle}>
          <div
            style={{
              fontSize: 9,
              fontFamily: "'DM Mono',monospace",
              color: col.text,
              fontWeight: 600,
              marginBottom: 2,
            }}
          >
            {course.code}
          </div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: "#1A1A2E",
              lineHeight: 1.3,
              wordBreak: "break-word",
              paddingRight: 26,
            }}
          >
            {course.name}
          </div>
          <div style={{ fontSize: 9, color: "#94A3B8", marginTop: 1 }}>
            {course.credits} cr.
          </div>
        </div>
        <div
          onClick={onToggle}
          style={{
            width: 15,
            height: 15,
            borderRadius: 99,
            border: `1.5px solid ${approved ? "#22C55E" : "#E2E8F0"}`,
            background: approved ? "#22C55E" : "transparent",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 8,
            color: "#fff",
            cursor: "pointer",
            marginTop: 1,
          }}
        >
          {approved ? "✓" : ""}
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";

export function CourseCard({
  course,
  col,
  approved,
  highlighted,
  isDragging,
  onDragStart,
  onHover,
  onToggle,
  onEdit,
  onDelete,
}) {
  const [hover, setHover] = useState(false);
  const borderColor =
    highlighted === "self"
      ? "#6366F1"
      : highlighted === "prereq"
        ? "#F59E0B"
        : highlighted === "dependent"
          ? "#22C55E"
          : approved
            ? "#86EFAC"
            : col.border + "55";

  return (
    <div
      className="cc"
      draggable
      onDragStart={onDragStart}
      onMouseEnter={() => {
        onHover(course.id);
        setHover(true);
      }}
      onMouseLeave={() => {
        onHover(null);
        setHover(false);
      }}
      style={{
        background: approved ? "#F0FDF4" : col.bg,
        border: `1.5px solid ${borderColor}`,
        borderRadius: 8,
        padding: "6px 8px",
        marginBottom: 5,
        opacity: isDragging ? 0.4 : 1,
        position: "relative",
        boxShadow: highlighted ? "0 2px 10px rgba(99,102,241,.13)" : "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 3,
          right: 3,
          display: "flex",
          gap: 2,
          zIndex: 10,
          opacity: hover ? 1 : 0,
          pointerEvents: hover ? "auto" : "none",
          transition: "opacity .12s",
        }}
      >
          <button
            className="bico"
            onMouseDown={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            style={{
              fontSize: 11,
              color: "#94A3B8",
              background: "rgba(255,255,255,.95)",
              borderRadius: 4,
              padding: "1px 4px",
            }}
          >
            ✎
          </button>
          <button
            className="bico"
            onMouseDown={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            style={{
              fontSize: 12,
              color: "#F87171",
              background: "rgba(255,255,255,.95)",
              borderRadius: 4,
              padding: "1px 4px",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 4,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }} onClick={onToggle}>
          <div
            style={{
              fontSize: 9,
              fontFamily: "'DM Mono',monospace",
              color: col.text,
              fontWeight: 600,
              marginBottom: 2,
            }}
          >
            {course.code}
          </div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: "#1A1A2E",
              lineHeight: 1.3,
              wordBreak: "break-word",
              paddingRight: 26,
            }}
          >
            {course.name}
          </div>
          <div style={{ fontSize: 9, color: "#94A3B8", marginTop: 1 }}>
            {course.credits} cr.
          </div>
        </div>
        <div
          onClick={onToggle}
          style={{
            width: 15,
            height: 15,
            borderRadius: 99,
            border: `1.5px solid ${approved ? "#22C55E" : "#E2E8F0"}`,
            background: approved ? "#22C55E" : "transparent",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 8,
            color: "#fff",
            cursor: "pointer",
            marginTop: 1,
          }}
        >
          {approved ? "✓" : ""}
        </div>
      </div>
    </div>
  );
}
