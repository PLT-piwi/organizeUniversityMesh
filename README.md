# Organizador de Mallas

Aplicación React para gestionar una malla curricular (ramos, semestres, categorías, progreso).

## Cómo ejecutar

```bash
npm install
npm run dev
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
| `npm run dev` | Desarrollo con recarga |
| `npm run build` | Genera `dist/` para publicar o empaquetar |
| `npm run preview` | Prueba el build en local |

## .exe descargable (Windows + GitHub)

Guía completa: **[docs/EXE-GITHUB.md](docs/EXE-GITHUB.md)**

```bash
npm install
npm run dist:win          # .exe local en carpeta release/
```

En GitHub: sube el repo, crea tag `v1.0.0` y en **Releases** aparece el instalador.

## Otras formas de app

**[docs/COMO-HACER-APP.md](docs/COMO-HACER-APP.md)** — PWA, Android (Capacitor), etc.
