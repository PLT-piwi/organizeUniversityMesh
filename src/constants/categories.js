export const DEFAULT_CATEGORIES = [
  {
    "id": "diseno",
    "label": "Major",
    "colorId": "pink"
  },
  {
    "id": "ciencias",
    "label": "Matemáticas y Ciencias Básicas",
    "colorId": "amber"
  },
  {
    "id": "gestion",
    "label": "Minor",
    "colorId": "lime"
  },
  {
    "id": "cat_1780018257707",
    "label": "Formación general",
    "colorId": "indigo"
  },
  {
    "id": "cat_1780268634615",
    "label": "Fundamentos de Ingenería",
    "colorId": "cyan"
  }
];

export function isDefaultCategory(catId) {
  return DEFAULT_CATEGORIES.some((d) => d.id === catId);
}
