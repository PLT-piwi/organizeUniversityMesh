import { useMalla } from "../../context/MallaContext.jsx";
import { Modal } from "../ui/Modal.jsx";
import { btnStyle } from "../ui/btnStyle.js";

export function ConfirmDeleteCategoryModal() {
  const { categories, courses, confirmDeleteCat, setConfirmDeleteCat, deleteCat } =
    useMalla();

  if (!confirmDeleteCat) return null;

  const cat = categories.find((c) => c.id === confirmDeleteCat);
  const affected = courses.filter((c) => c.category === confirmDeleteCat);
  const blocked = affected.length > 0;

  return (
    <Modal onClose={() => setConfirmDeleteCat(null)}>
      <div
        style={{
          fontSize: 15,
          fontWeight: 600,
          marginBottom: 6,
          color: "#1A1A2E",
        }}
      >
        {blocked ? "No se puede eliminar" : "¿Eliminar categoría?"}
      </div>
      <div style={{ fontSize: 13, color: "#64748B", marginBottom: 12 }}>
        {blocked ? (
          <>
            «{cat?.label}» tiene ramos asignados. Cámbialos de categoría o
            elimínalos antes de borrarla.
          </>
        ) : (
          <>«{cat?.label}» será eliminada permanentemente.</>
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
          {affected.length} ramo{affected.length !== 1 ? "s" : ""} en esta
          categoría
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
          onClick={() => setConfirmDeleteCat(null)}
          style={btnStyle("ghost")}
        >
          {blocked ? "Entendido" : "Cancelar"}
        </button>
        {!blocked && (
          <button
            onClick={() => deleteCat(confirmDeleteCat)}
            style={btnStyle("danger")}
          >
            Eliminar
          </button>
        )}
      </div>
    </Modal>
  );
}
