import { useMalla } from "../../context/MallaContext.jsx";
import { Modal } from "../ui/Modal.jsx";
import { btnStyle } from "../ui/btnStyle.js";

export function ConfirmDeleteCourseModal() {
  const { courses, confirmDelete, setConfirmDelete, getCourse, deleteCourse } =
    useMalla();

  if (!confirmDelete) return null;

  const course = getCourse(confirmDelete);
  const dependents = courses.filter(
    (c) =>
      (c.prereqs ?? []).includes(confirmDelete) ||
      (c.coreqs ?? []).includes(confirmDelete),
  );
  const blocked = dependents.length > 0;

  return (
    <Modal onClose={() => setConfirmDelete(null)}>
      <div
        style={{
          fontSize: 15,
          fontWeight: 600,
          marginBottom: 6,
          color: "#1A1A2E",
        }}
      >
        {blocked ? "No se puede eliminar" : "Eliminar ramo?"}
      </div>
      <div style={{ fontSize: 13, color: "#64748B", marginBottom: 12 }}>
        {blocked ? (
          <>
            "{course?.name}" es requisito de otros ramos. Eliminalos o quita el
            requisito antes de borrar este ramo.
          </>
        ) : (
          <> "{course?.name}" sera eliminado permanentemente.</>
        )}
      </div>
      {blocked && (
        <div
          style={{
            fontSize: 12,
            color: "#92400E",
            background: "#FFFBEB",
            padding: "8px 10px",
            borderRadius: 8,
            marginBottom: 16,
            border: "1px solid #FDE68A",
          }}
        >
          Requerido por: {dependents.map((d) => d.name).join(", ")}
        </div>
      )}
      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "flex-end",
          marginTop: 16,
        }}
      >
        <button
          onClick={() => setConfirmDelete(null)}
          style={btnStyle("ghost")}
        >
          {blocked ? "Entendido" : "Cancelar"}
        </button>
        {!blocked && (
          <button
            onClick={() => deleteCourse(confirmDelete)}
            style={btnStyle("danger")}
          >
            Eliminar
          </button>
        )}
      </div>
    </Modal>
  );
}
