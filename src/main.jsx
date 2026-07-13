import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MallaCurricular from "./MallaCurricular.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MallaCurricular />
  </StrictMode>,
);

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .catch((err) => console.warn("No se pudo registrar el service worker", err));
  });
}
