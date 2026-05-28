import { useMalla } from "../../context/MallaContext.jsx";
import { Modal } from "../ui/Modal.jsx";
import { btnStyle } from "../ui/btnStyle.js";

export function ConfirmClearAllCoursesModal() {
  const {
    confirmClearAll,
    setConfirmClearAll,
    courses,
    clearAllCourses,
  } = useMalla();

  if (!confirmClearAll) return null;

  return (
    <Modal onClose={() => setConfirmClearAll(false)}>
      <div
        style={{
          fontSize: 15,
          fontWeight: 600,
          marginBottom: 6,
          color: "#1A1A2E",
        }}
      >
        ¿Eliminar todos los ramos?
      </div>
      <div style={{ fontSize: 13, color: "#64748B", marginBottom: 20 }}>
        Se borrarán los {courses.length} ramos de la malla. Los semestres se
        mantienen vacíos. Las categorías base no se modifican.
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button
          onClick={() => setConfirmClearAll(false)}
          style={btnStyle("ghost")}
        >
          Cancelar
        </button>
        <button onClick={clearAllCourses} style={btnStyle("danger")}>
          Eliminar todos
        </button>
      </div>
    </Modal>
  );
}
