# Organizador de Mallas

Aplicación React para gestionar una malla curricular (ramos, semestres, categorías, progreso).

## Cómo ejecutar

```bash
pnpm install
pnpm run dev
```

Abre la URL que muestra Vite (normalmente `http://localhost:5173`).

## Estructura del proyecto

```
src/
├── main.jsx                 # Punto de entrada
├── MallaCurricular.jsx      # Componente raíz
├── context/MallaContext.jsx
├── hooks/useMallaCurricular.js
├── constants/               # Colores, categorías, config
├── data/                    # Ramos y semestres iniciales
├── utils/                   # storage, colores por categoría
├── styles/global.css
└── components/              # UI, tabs, modales
```

## Dónde modificar cada cosa

| Quieres cambiar… | Archivo |
|------------------|---------|
| Nombre de la malla (encabezado) | Clic en el título → o `useMallaCurricular.js` (`careerName`) |
| Datos iniciales de ramos | `src/data/initialCourses.js` |
| Semestres iniciales | `src/data/initialSemesters.js` |
| Colores / categorías base | `src/constants/colors.js`, `categories.js` |
| Lógica (aprobar, drag & drop, guardar) | `src/hooks/useMallaCurricular.js` |
| Vista malla / progreso / ramos | `src/components/tabs/` |
| Estilos globales | `src/styles/global.css` |

## Scripts

| Comando | Uso |
|---------|-----|
| `pnpm run dev` | Desarrollo con recarga |
| `pnpm run build` | Genera `dist/` para publicar o empaquetar |
| `pnpm run preview` | Prueba el build en local |

## .exe descargable (Windows + GitHub)

```bash
pnpm install
pnpm run dist:win          # .exe local en carpeta release/
```

En GitHub: sube el repo, crea tag `v1.0.0` y en **Releases** aparece el instalador.

## Instalable en celular (PWA)

La app tiene manifest (`public/manifest.webmanifest`) y service worker (`public/sw.js`), así que el navegador del celular puede "instalarla" como app (ícono en el home, pantalla completa, funciona sin conexión tras la primera carga).

Esto requiere que `dist/` esté publicado en un hosting con **HTTPS** (GitHub Pages, Netlify, Vercel, etc.) — `localhost` durante `pnpm run dev` también cuenta como origen seguro para probarlo. Abriendo esa URL desde Chrome/Safari en el celular, aparece la opción "Agregar a pantalla de inicio" / "Instalar app".

Los íconos de la PWA (`public/icons/`) se generaron a partir de `build/icon.png`.
