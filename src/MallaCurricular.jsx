import { MallaContext } from "./context/MallaContext.jsx";
import { useMallaCurricular } from "./hooks/useMallaCurricular.js";
import { Notification } from "./components/ui/Notification.jsx";
import { ConfirmDeleteCourseModal } from "./components/modals/ConfirmDeleteCourseModal.jsx";
import { ConfirmDeleteCategoryModal } from "./components/modals/ConfirmDeleteCategoryModal.jsx";
import { ConfirmClearAllCoursesModal } from "./components/modals/ConfirmClearAllCoursesModal.jsx";
import { CategoryManagerModal } from "./components/modals/CategoryManagerModal.jsx";
import { Header } from "./components/layout/Header.jsx";
import { ProgressStrip } from "./components/layout/ProgressStrip.jsx";
import { MallaTab } from "./components/tabs/MallaTab.jsx";
import { ProgresoTab } from "./components/tabs/ProgresoTab.jsx";
import { RamosTab } from "./components/tabs/RamosTab.jsx";
import "./styles/global.css";

export default function MallaCurricular() {
  const m = useMallaCurricular();

  return (
    <MallaContext.Provider value={m}>
      <div
        style={{
          minHeight: "100vh",
          background: "#F7F8FA",
          fontFamily: "'DM Sans','Segoe UI',sans-serif",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@500&display=swap"
          rel="stylesheet"
        />

        <Notification notification={m.notification} />
        <CategoryManagerModal />
        <ConfirmDeleteCourseModal />
        <ConfirmDeleteCategoryModal />
        <ConfirmClearAllCoursesModal />

        <Header />
        <ProgressStrip />

        <div style={{ flex: 1 }}>
          <div style={{ maxWidth: 1500, margin: "0 auto", padding: "18px" }}>
            {m.activeTab === "malla" && <MallaTab />}
            {m.activeTab === "progreso" && <ProgresoTab />}
            {m.activeTab === "ramos" && <RamosTab />}
          </div>
        </div>
        <footer
          style={{
            borderTop: "1px solid #E8ECF0",
            padding: "10px 18px",
            textAlign: "center",
            fontSize: 11,
            color: "#94A3B8",
            background: "#fff",
            marginTop: "auto",
            flexShrink: 0,
          }}
        >
          © {new Date().getFullYear()} Malla Curricular · Todos los derechos
          reservados Daniel Solano Godoy 🐥
        </footer>
      </div>
    </MallaContext.Provider>
  );
}
