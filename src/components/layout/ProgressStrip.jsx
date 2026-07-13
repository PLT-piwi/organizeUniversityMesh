import { useMalla } from "../../context/MallaContext.jsx";

export function ProgressStrip() {
  const { approvedCreds, totalCredits, approved, courses, progress, theme } =
    useMalla();

  return (
    <div
            style={{
              background: theme.surface,
              borderBottom: `1px solid ${theme.border}`,
              padding: "6px 18px",
            }}
          >
            <div
              style={{
                maxWidth: 1500,
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{ fontSize: 11, color: theme.textSecondary, whiteSpace: "nowrap" }}
              >
                {approvedCreds}/{totalCredits} créditos · {approved.size}/
                {courses.length} ramos
              </span>
              <div
                style={{
                  flex: 1,
                  height: 5,
                  background: theme.subtle,
                  borderRadius: 99,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    height: "100%",
                    background: "linear-gradient(90deg,#6366F1,#FB923C)",
                    borderRadius: 99,
                    transition: "width .4s ease",
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#6366F1",
                  minWidth: 30,
                }}
              >
                {progress}%
              </span>
            </div>
          </div>
  );
}
