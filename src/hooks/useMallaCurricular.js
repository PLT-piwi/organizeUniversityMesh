import { useState, useEffect } from "react";
import { DEFAULT_CATEGORIES } from "../constants/categories.js";
import { UNASSIGNED_ID } from "../constants/config.js";
import { INITIAL_COURSES } from "../data/initialCourses.js";
import { INITIAL_SEMESTERS } from "../data/initialSemesters.js";
import { getCatColor } from "../utils/categories.js";
import { loadState, saveState } from "../utils/storage.js";

export function useMallaCurricular() {
  const saved = loadState();
  const [courses, setCourses] = useState(saved?.courses || INITIAL_COURSES);
  const [semesters, setSemesters] = useState(
    saved?.semesters || INITIAL_SEMESTERS,
  );
  const [approved, setApproved] = useState(new Set(saved?.approved || []));
  const [categories, setCategories] = useState(
    saved?.categories || DEFAULT_CATEGORIES,
  );
  const [careerName, setCareerName] = useState(
    saved?.careerName || "Nombre de Malla",
  );
  const [editingName, setEditingName] = useState(false);
  const [dragging, setDragging] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("malla");
  const [notification, setNotification] = useState(null);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({
    name: "",
    code: "",
    credits: 5,
    category: categories[0]?.id || "diseno",
    prereqs: [],
  });
  const [filterCat, setFilterCat] = useState("all");
  const [confirmDelete, setConfirmDelete] = useState(null);
  // Category manager
  const [showCatManager, setShowCatManager] = useState(false);
  const [editingCat, setEditingCat] = useState(null); // null = new
  const [catForm, setCatForm] = useState({ label: "", colorId: "teal" });
  const [confirmDeleteCat, setConfirmDeleteCat] = useState(null);
  const [confirmClearAll, setConfirmClearAll] = useState(false);

  useEffect(() => {
    saveState({
      courses,
      semesters,
      approved: [...approved],
      categories,
      careerName,
    });
  }, [courses, semesters, approved, categories, careerName]);

  const notify = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 2800);
  };

  const getCourse = (id) => courses.find((c) => c.id === id);
  const getColor = (cat) => getCatColor(cat, categories);

  const unassignedIds = courses
    .filter((c) => !semesters.some((s) => s.courses.includes(c.id)))
    .map((c) => c.id);

  // ── Drag & Drop ──────────────────────────────────────────────────────────
  const handleDragStart = (e, courseId, fromSemId) => {
    setDragging({ courseId, fromSemId });
    e.dataTransfer.effectAllowed = "move";
  };
  const handleDrop = (e, toSemId) => {
    e.preventDefault();
    if (!dragging) return;
    const { courseId, fromSemId } = dragging;
    if (fromSemId === toSemId) {
      setDragging(null);
      setDragOver(null);
      return;
    }
    setSemesters((prev) => {
      const next = prev.map((s) => ({ ...s, courses: [...s.courses] }));
      const from = next.find((s) => s.id === fromSemId);
      const to = next.find((s) => s.id === toSemId);
      if (from) from.courses = from.courses.filter((id) => id !== courseId);
      if (to) to.courses = [...to.courses, courseId];
      return next;
    });
    setDragging(null);
    setDragOver(null);
  };
  const handleDropUnassigned = (e) => {
    e.preventDefault();
    if (!dragging) return;
    const { courseId, fromSemId } = dragging;
    if (fromSemId === UNASSIGNED_ID) {
      setDragging(null);
      setDragOver(null);
      return;
    }
    setSemesters((prev) =>
      prev.map((s) =>
        s.id === fromSemId
          ? { ...s, courses: s.courses.filter((id) => id !== courseId) }
          : s,
      ),
    );
    setDragging(null);
    setDragOver(null);
  };

  // ── Approve ──────────────────────────────────────────────────────────────
  const toggleApproved = (courseId) => {
    const c = getCourse(courseId);
    if (!c) return;
    const next = new Set(approved);
    if (next.has(courseId)) {
      const dep = courses.find(
        (x) => x.prereqs.includes(courseId) && next.has(x.id),
      );
      if (dep) {
        notify(`"${dep.name}" depende de este ramo`, "warning");
        return;
      }
      next.delete(courseId);
    } else {
      const missing = c.prereqs.filter((p) => !next.has(p));
      if (missing.length) {
        notify(
          `Prerequisitos pendientes: ${missing.map((p) => getCourse(p)?.name).join(", ")}`,
          "warning",
        );
        return;
      }
      next.add(courseId);
    }
    setApproved(next);
  };

  // ── Highlight ─────────────────────────────────────────────────────────────
  const getHighlighted = (courseId) => {
    if (!hoveredCourse) return null;
    if (hoveredCourse === courseId) return "self";
    const hc = getCourse(hoveredCourse);
    if (!hc) return null;
    if (hc.prereqs.includes(courseId)) return "prereq";
    const tc = getCourse(courseId);
    if (tc?.prereqs.includes(hoveredCourse)) return "dependent";
    return null;
  };

  // ── CRUD courses ─────────────────────────────────────────────────────────
  const saveCourse = () => {
    if (!newCourse.name.trim() || !newCourse.code.trim()) {
      notify("Nombre y código son requeridos", "warning");
      return;
    }
    if (editingCourse) {
      setCourses((prev) =>
        prev.map((c) => (c.id === editingCourse ? { ...c, ...newCourse } : c)),
      );
      setEditingCourse(null);
      notify("Ramo actualizado");
    } else {
      const id = `c${Date.now()}`;
      setCourses((prev) => [
        ...prev,
        { id, ...newCourse, prereqs: newCourse.prereqs || [] },
      ]);
      notify("Ramo agregado");
    }
    setNewCourse({
      name: "",
      code: "",
      credits: 5,
      category: categories[0]?.id || "diseno",
      prereqs: [],
    });
    setShowAddCourse(false);
  };
  const startEdit = (c) => {
    setEditingCourse(c.id);
    setNewCourse({
      name: c.name,
      code: c.code,
      credits: c.credits,
      category: c.category,
      prereqs: [...c.prereqs],
    });
    setShowAddCourse(true);
    setActiveTab("ramos");
  };
  const deleteCourse = (courseId) => {
    const dependents = courses.filter((c) => c.prereqs.includes(courseId));
    if (dependents.length) {
      notify(
        `No se puede eliminar: ${dependents.map((d) => `"${d.name}"`).join(", ")} lo requiere como prerequisito`,
        "warning",
      );
      setConfirmDelete(null);
      return;
    }
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
    setSemesters((prev) =>
      prev.map((s) => ({
        ...s,
        courses: s.courses.filter((id) => id !== courseId),
      })),
    );
    setApproved((prev) => {
      const n = new Set(prev);
      n.delete(courseId);
      return n;
    });
    setConfirmDelete(null);
    notify("Ramo eliminado");
  };

  const clearAllCourses = () => {
    setCourses([]);
    setSemesters((prev) => prev.map((s) => ({ ...s, courses: [] })));
    setApproved(new Set());
    setConfirmDelete(null);
    setConfirmClearAll(false);
    setShowAddCourse(false);
    setEditingCourse(null);
    notify("Todos los ramos fueron eliminados");
  };

  // ── CRUD categories ───────────────────────────────────────────────────────
  const openNewCat = () => {
    setEditingCat(null);
    setCatForm({ label: "", colorId: "teal" });
  };
  const openEditCat = (cat) => {
    setEditingCat(cat.id);
    setCatForm({ label: cat.label, colorId: cat.colorId });
  };
  const saveCat = () => {
    if (!catForm.label.trim()) {
      notify("El nombre de categoría es requerido", "warning");
      return;
    }
    if (editingCat) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCat
            ? { ...c, label: catForm.label, colorId: catForm.colorId }
            : c,
        ),
      );
      notify("Categoría actualizada");
    } else {
      const id = `cat_${Date.now()}`;
      setCategories((prev) => [
        ...prev,
        { id, label: catForm.label, colorId: catForm.colorId },
      ]);
      notify("Categoría creada");
    }
    setEditingCat(null);
    setCatForm({ label: "", colorId: "teal" });
  };
  const deleteCat = (catId) => {
    const inUse = courses.some((c) => c.category === catId);
    if (inUse) {
      const n = courses.filter((c) => c.category === catId).length;
      notify(
        `Hay ${n} ramo${n !== 1 ? "s" : ""} con esta categoría. Reasígnalos o elimínalos primero.`,
        "warning",
      );
      setConfirmDeleteCat(null);
      return;
    }
    setCategories((prev) => prev.filter((c) => c.id !== catId));
    setConfirmDeleteCat(null);
    notify("Categoría eliminada");
  };

  // ── Semesters ─────────────────────────────────────────────────────────────
  const addSemester = () => {
    const n = semesters.length + 1;
    setSemesters((prev) => [
      ...prev,
      { id: `s${Date.now()}`, name: `Semestre ${n}`, courses: [] },
    ]);
  };
  const removeSemester = (semId) => {
    const sem = semesters.find((s) => s.id === semId);
    const count = sem?.courses.length ?? 0;
    setSemesters((prev) => prev.filter((s) => s.id !== semId));
    notify(
      count > 0
        ? `Semestre eliminado (${count} ramo(s) quedaron sin asignar)`
        : "Semestre eliminado",
    );
  };

  // ── Stats ─────────────────────────────────────────────────────────────────
  const totalCredits = courses.reduce((a, c) => a + c.credits, 0);
  const approvedCreds = [...approved].reduce(
    (a, id) => a + (getCourse(id)?.credits || 0),
    0,
  );
  const progress =
    totalCredits > 0 ? Math.round((approvedCreds / totalCredits) * 100) : 0;
  const catStats = categories
    .map((cat) => ({
      cat: cat.id,
      label: cat.label,
      colorId: cat.colorId,
      total: courses.filter((c) => c.category === cat.id).length,
      done: courses.filter((c) => c.category === cat.id && approved.has(c.id))
        .length,
    }))
    .filter((x) => x.total > 0);

  // ── Import / Export ───────────────────────────────────────────────────────
  const exportJSON = () => {
    const blob = new Blob(
      [
        JSON.stringify(
          {
            careerName,
            semesters,
            courses,
            approved: [...approved],
            categories,
          },
          null,
          2,
        ),
      ],
      { type: "application/json" },
    );
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `malla-idi.json`;
    a.click();
    notify("Malla exportada");
  };
  const importJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const d = JSON.parse(ev.target.result);
        if (d.courses) setCourses(d.courses);
        if (d.semesters) setSemesters(d.semesters);
        if (d.approved) setApproved(new Set(d.approved));
        if (d.careerName) setCareerName(d.careerName);
        if (d.categories) setCategories(d.categories);
        notify("Malla importada");
      } catch {
        notify("Error al importar", "error");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };
  const resetAll = () => {
    if (!confirm("¿Resetear toda la malla al estado inicial?")) return;
    setCourses(INITIAL_COURSES);
    setSemesters(INITIAL_SEMESTERS);
    setApproved(new Set());
    setCategories(DEFAULT_CATEGORIES);
    setCareerName("Nombre de Malla");
    notify("Malla reseteada");
  };

  const filteredCourses =
    filterCat === "all"
      ? courses
      : courses.filter((c) => c.category === filterCat);
  return {
    courses, setCourses,
    semesters, setSemesters,
    approved, setApproved,
    categories, setCategories,
    careerName, setCareerName,
    editingName, setEditingName,
    dragging, setDragging,
    dragOver, setDragOver,
    hoveredCourse, setHoveredCourse,
    activeTab, setActiveTab,
    notification,
    showAddCourse, setShowAddCourse,
    editingCourse, setEditingCourse,
    newCourse, setNewCourse,
    filterCat, setFilterCat,
    confirmDelete, setConfirmDelete,
    showCatManager, setShowCatManager,
    editingCat, setEditingCat,
    catForm, setCatForm,
    confirmDeleteCat, setConfirmDeleteCat,
    confirmClearAll, setConfirmClearAll,
    notify,
    getCourse,
    getColor,
    unassignedIds,
    handleDragStart,
    handleDrop,
    handleDropUnassigned,
    toggleApproved,
    getHighlighted,
    saveCourse,
    startEdit,
    deleteCourse,
    clearAllCourses,
    openNewCat,
    openEditCat,
    saveCat,
    deleteCat,
    addSemester,
    removeSemester,
    totalCredits,
    approvedCreds,
    progress,
    catStats,
    exportJSON,
    importJSON,
    resetAll,
    filteredCourses,
  };
}
