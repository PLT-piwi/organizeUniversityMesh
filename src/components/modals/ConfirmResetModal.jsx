import { useMalla } from "../../context/MallaContext.jsx";
import { Modal } from "../ui/Modal.jsx";
import { btnStyle } from "../ui/btnStyle.js";

export function ConfirmResetModal() {
  const { confirmReset, setConfirmReset, resetAll } = useMalla();

  if (!confirmReset) return null;

  return (
    <Modal onClose={() => setConfirmReset(false)}>
      <div
        style={{
          fontSize: 15,
          fontWeight: 600,
          marginBottom: 6,
          color: "#1A1A2E",
        }}
      >
        ¿Resetear la malla?
      </div>
      <div style={{ fontSize: 13, color: "#64748B", marginBottom: 20 }}>
        Se restauraran los ramos, semestres, categorias y el nombre al estado
        inicial. Tambien se cerraran formularios y ediciones abiertas.
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button
          onClick={() => setConfirmReset(false)}
          style={btnStyle("ghost")}
        >
          Cancelar
        </button>
        <button onClick={resetAll} style={btnStyle("danger")}>
          Resetear
        </button>
      </div>
    </Modal>
  );
}
