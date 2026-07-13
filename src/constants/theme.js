export const LIGHT_THEME = {
  name: "light",
  pageBg: "#F7F8FA",
  surface: "#FFFFFF",
  surfaceAlt: "#F8F9FA",
  subtle: "#F1F5F9",
  border: "#E8ECF0",
  borderStrong: "#E2E8F0",
  textPrimary: "#1A1A2E",
  textSecondary: "#64748B",
  textMuted: "#94A3B8",
  inputBg: "#FFFFFF",
  approvedBg: "#F0FDF4",
  approvedBorder: "#BBF7D0",
  dashedBorder: "#CBD5E1",
  dropHighlightBg: "#EEF2FF",
  accentSoftBg: "#F0F4FF",
  accentSoftBorder: "#E0E7FF",
  accentText: "#4338CA",
};

export const DARK_THEME = {
  name: "dark",
  pageBg: "#12141A",
  surface: "#1B1F27",
  surfaceAlt: "#20242D",
  subtle: "#242933",
  border: "#2B303B",
  borderStrong: "#333844",
  textPrimary: "#E7E9EE",
  textSecondary: "#A3ADC2",
  textMuted: "#748099",
  inputBg: "#20242D",
  approvedBg: "#152A1C",
  approvedBorder: "#1F6B3B",
  dashedBorder: "#3A4150",
  dropHighlightBg: "#1E2340",
  accentSoftBg: "#1E2340",
  accentSoftBorder: "#333B5C",
  accentText: "#A5B4FC",
};

export function getTheme(darkMode) {
  return darkMode ? DARK_THEME : LIGHT_THEME;
}
