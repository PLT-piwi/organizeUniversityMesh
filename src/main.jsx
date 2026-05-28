import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MallaCurricular from "./MallaCurricular.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MallaCurricular />
  </StrictMode>,
);
