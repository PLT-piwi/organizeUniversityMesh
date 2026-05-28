export function Notification({ notification }) {
  if (!notification) return null;
  return (
    
            <div
              style={{
                position: "fixed",
                top: 16,
                right: 16,
                zIndex: 9999,
                background:
                  notification.type === "warning"
                    ? "#FEF3C7"
                    : notification.type === "error"
                      ? "#FEE2E2"
                      : "#DCFCE7",
                border: `1px solid ${notification.type === "warning" ? "#F59E0B" : notification.type === "error" ? "#F87171" : "#22C55E"}`,
                color:
                  notification.type === "warning"
                    ? "#92400E"
                    : notification.type === "error"
                      ? "#991B1B"
                      : "#15803D",
                padding: "9px 16px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 500,
                boxShadow: "0 4px 20px rgba(0,0,0,.1)",
                animation: "pop .2s ease",
                maxWidth: 320,
              }}
            >
              {notification.msg}
            </div>
          
  );
}
