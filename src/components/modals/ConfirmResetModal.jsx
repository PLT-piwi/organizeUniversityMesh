import { useMalla } from "../../context/MallaContext.jsx";
import { Modal } from "../ui/Modal.jsx";
import { btnStyle } from "../ui/btnStyle.js";

export function ConfirmResetModal() {
  const { confirmReset, setConfirmReset, resetAll, theme } = useMalla();

  if (!confirmReset) return null;

  return (
    <Modal onClose={() => setConfirmReset(false)}>
      <div
        style={{
          fontSize: 15,
          fontWeight: 600,
          marginBottom: 6,
          color: theme.textPrimary,
        }}
      >
        ¿Resetear la malla?
      </div>
      <div style={{ fontSize: 13, color: theme.textSecondary, marginBottom: 20 }}>
        Se restauraran los ramos, semestres, categorias y el nombre al estado
        inicial. Tambien se cerraran formularios y ediciones abiertas.
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button
          onClick={() => setConfirmReset(false)}
          style={btnStyle("ghost", "md", theme)}
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
