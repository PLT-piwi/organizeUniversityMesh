import { useMalla } from "../../context/MallaContext.jsx";

export function Modal({ children, onClose, wide = false }) {
  const { theme } = useMalla();
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        zIndex: 9000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: theme.surface,
          borderRadius: 14,
          padding: 24,
          width: "100%",
          maxWidth: wide ? 520 : 380,
          boxShadow: "0 8px 40px rgba(0,0,0,.35)",
          animation: "fadeIn .18s ease",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}
