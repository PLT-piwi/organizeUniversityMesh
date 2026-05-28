# Cómo convertir Organizador de Mallas en una app

Tu proyecto ya es una **aplicación web** (React + Vite). Para usarla “como app” tienes tres caminos, de más fácil a más complejo.

| Opción | Resultado | Dificultad | Ideal si… |
|--------|-----------|------------|-----------|
| **A. PWA** | Icono en el celular/PC, abre como app | Baja | Quieres algo rápido sin tiendas |
| **B. Capacitor** | APK (Android) / IPA (iOS) | Media | Quieres publicar en Play Store o App Store |
| **C. Escritorio** | Programa `.exe` en Windows | Media | Solo la usas en PC |

---

## Antes de todo: compilar el proyecto

En la carpeta del proyecto:

```bash
npm install
npm run build
```

Eso genera la carpeta `dist/` con la versión lista para publicar o empaquetar.

Para probarla en local:

```bash
npm run preview
```

---

## Opción A — PWA (recomendada para empezar)

Una **PWA** es la misma web, pero el navegador permite **“Instalar aplicación”** (icono en inicio, pantalla casi a pantalla completa).

### A.1 Publicar la web (gratis)

Necesitas una URL pública (en el celular no basta con `localhost`).

**Netlify (ejemplo):**

1. Sube el proyecto a GitHub.
2. Entra en [netlify.com](https://www.netlify.com) → *Add new site* → *Import from Git*.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy.

**Vercel:** igual idea — build `npm run build`, output `dist`.

### A.2 Añadir soporte PWA al proyecto

En la raíz del proyecto:

```bash
npm install -D vite-plugin-pwa
```

Edita `vite.config.js`:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Organizador de Mallas",
        short_name: "Mallas",
        description: "Gestiona tu malla curricular",
        theme_color: "#6366F1",
        background_color: "#F7F8FA",
        display: "standalone",
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
```

Crea dos iconos PNG en la carpeta `public/`:

- `public/icon-192.png` (192×192)
- `public/icon-512.png` (512×512)

Vuelve a compilar y desplegar:

```bash
npm run build
```

### A.3 Instalar en el celular

1. Abre la URL de Netlify/Vercel en **Chrome** (Android) o **Safari** (iPhone).
2. **Android:** menú ⋮ → *Instalar aplicación* / *Añadir a pantalla de inicio*.
3. **iPhone:** botón compartir → *Añadir a pantalla de inicio*.

Los datos siguen guardándose en el navegador (`localStorage`), como en la versión de escritorio.

---

## Opción B — App móvil con Capacitor (Android / iOS)

Envuelve tu carpeta `dist/` en un contenedor nativo.

### B.1 Requisitos

- Node.js instalado
- **Android:** [Android Studio](https://developer.android.com/studio)
- **iOS (solo Mac):** Xcode

### B.2 Pasos

```bash
npm run build

npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "Organizador Mallas" com.tuusuario.mallas --web-dir dist

npx cap add android
npx cap sync
npx cap open android
```

En Android Studio: *Build* → *Build Bundle(s) / APK(s)* → *Build APK(s)*.

Para iOS (Mac):

```bash
npx cap add ios
npx cap sync
npx cap open ios
```

Cada vez que cambies el código web:

```bash
npm run build
npx cap sync
```

---

## Opción C — App de escritorio (Windows)

### C.1 Tauri (ligera, recomendada)

1. Instala [Rust](https://www.rust-lang.org/tools/install) y dependencias de [Tauri](https://v2.tauri.app/start/prerequisites/).
2. En la carpeta del proyecto:

```bash
npm run build
npm create tauri-app@latest
```

Sigue el asistente y apunta el `frontendDist` a `../dist` (o la ruta de tu `dist`).

3. Genera el instalador:

```bash
npm run tauri build
```

### C.2 Electron (alternativa)

Más pesada; útil si ya conoces Electron. Requiere un `main.js` que abra una ventana cargando `dist/index.html`. Documentación: [electronjs.org](https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app).

---

## Resumen rápido

1. Desarrollo diario: `npm run dev`
2. Versión final: `npm run build` → carpeta `dist`
3. App en el teléfono sin tiendas: **PWA** + hosting (Opción A)
4. APK para Android: **Capacitor** (Opción B)
5. `.exe` en Windows: **Tauri** (Opción C)

## Archivos que no necesitas en el día a día

| Carpeta / archivo | Qué es |
|-------------------|--------|
| `node_modules/` | Dependencias (se regenera con `npm install`) |
| `dist/` | Build de producción (se regenera con `npm run build`) |
| `package-lock.json` | Versiones fijas de paquetes (no borrar si usas npm) |

Todo lo importante para editar la app está en `src/`.
