export function btnStyle(variant = "primary", size = "md") {
  const base = {
    cursor: "pointer",
    border: "none",
    borderRadius: 8,
    fontFamily: "'DM Sans',sans-serif",
    fontWeight: 500,
    transition: "opacity .15s",
  };
  const sizes = {
    sm: { fontSize: 12, padding: "6px 14px" },
    md: { fontSize: 13, padding: "8px 18px" },
  };
  const variants = {
    primary: { background: "#6366F1", color: "#fff", border: "none" },
    ghost: {
      background: "#F1F5F9",
      color: "#64748B",
      border: "1px solid #E2E8F0",
    },
    danger: { background: "#EF4444", color: "#fff", border: "none" },
  };
  return { ...base, ...sizes[size], ...variants[variant] };
}
