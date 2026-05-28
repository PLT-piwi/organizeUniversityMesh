export const DEFAULT_CATEGORIES = [
  { id: "diseno", label: "Diseño", colorId: "orange" },
  { id: "ciencias", label: "Ciencias", colorId: "blue" },
  { id: "ingenieria", label: "Ingeniería", colorId: "green" },
  { id: "humanidades", label: "Humanidades", colorId: "purple" },
  { id: "gestion", label: "Gestión", colorId: "amber" },
  { id: "especialidad", label: "Especialidad", colorId: "rose" },
];

export function isDefaultCategory(catId) {
  return DEFAULT_CATEGORIES.some((d) => d.id === catId);
}
