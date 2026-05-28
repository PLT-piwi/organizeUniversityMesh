import { createContext, useContext } from "react";

export const MallaContext = createContext(null);

export function useMalla() {
  const ctx = useContext(MallaContext);
  if (!ctx) {
    throw new Error("useMalla debe usarse dentro de MallaCurricular");
  }
  return ctx;
}
