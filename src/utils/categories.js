import { COLOR_PRESETS } from "../constants/colors.js";

export function getCatColor(cat, categories) {
  const c = categories.find((x) => x.id === cat);
  if (!c) return COLOR_PRESETS[11]; // slate fallback
  return COLOR_PRESETS.find((p) => p.id === c.colorId) || COLOR_PRESETS[11];
}
