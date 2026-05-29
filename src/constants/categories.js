export const DEFAULT_CATEGORIES = [
  {
    "id": "diseno",
    "label": "Major",
    "colorId": "pink"
  },
  {
    "id": "ciencias",
    "label": "Plan común",
    "colorId": "purple"
  },
  {
    "id": "gestion",
    "label": "Minor",
    "colorId": "amber"
  },
  {
    "id": "cat_1780018257707",
    "label": "Formación general",
    "colorId": "blue"
  }
];

export function isDefaultCategory(catId) {
  return DEFAULT_CATEGORIES.some((d) => d.id === catId);
}
