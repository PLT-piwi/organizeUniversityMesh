# Generar el .exe y publicarlo en GitHub

El proyecto usa **Electron** para empaquetar la web en un instalador Windows (`.exe`) y **GitHub Actions** para construirlo en la nube sin instalar nada extra en tu PC (solo para publicar).

---

## Paso 1 — Probar en tu PC (opcional)

```bash
npm install
npm run dist:win
```

Al terminar, abre la carpeta `release/` y ejecuta el archivo  
`Organizador de Mallas Setup 1.0.0.exe` (el nombre puede variar según la versión).

Si en tu PC falla por “privilegio de enlace simbólico”, usa **GitHub Actions** (paso 3): allí suele compilar sin ese problema. También puedes abrir PowerShell **como administrador** y repetir `npm run dist:win`.

Para desarrollo con ventana de escritorio:

```bash
npm run electron:dev
```

---

## Paso 2 — Subir el proyecto a GitHub

1. Crea un repositorio en [github.com/new](https://github.com/new) (por ejemplo `organizadorMallas`).
2. En la carpeta del proyecto:

```bash
git init
git add .
git commit -m "App organizador de mallas con build Windows"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/organizadorMallas.git
git push -u origin main
```

(Sustituye `TU_USUARIO` y el nombre del repo.)

---

## Paso 3 — Generar el .exe en GitHub (automático)

Tienes **dos formas**:

### A) Con etiqueta de versión (recomendado → Release descargable)

1. Actualiza la versión en `package.json` si quieres (campo `"version"`).
2. Crea y sube una etiqueta:

```bash
git add .
git commit -m "Preparar release v1.0.0"
git tag v1.0.0
git push origin main
git push origin v1.0.0
```

3. En GitHub: pestaña **Actions** → verás el workflow *Build Windows EXE*.
4. Cuando termine (✓ verde): **Releases** → aparece **v1.0.0** con el `.exe` para descargar.

### B) Manual (sin etiqueta)

1. GitHub → tu repo → **Actions** → *Build Windows EXE* → **Run workflow** → **Run workflow**.
2. Al finalizar, entra en esa ejecución → sección **Artifacts** → descarga `Organizador-Mallas-Windows`.

---

## Paso 4 — Compartir el instalador

- **Release (etiqueta):** enlace tipo  
  `https://github.com/TU_USUARIO/organizadorMallas/releases`  
  Cualquiera puede bajar el `.exe` desde *Assets*.
- **Artifact:** solo quien tenga acceso al repo (o tú con el zip del workflow).

---

## Actualizar la app

1. Cambia el código.
2. Sube versión en `package.json` (ej. `1.0.1`).
3. Commit, tag y push:

```bash
git add .
git commit -m "Versión 1.0.1"
git tag v1.0.1
git push origin main
git push origin v1.0.1
```

GitHub generará un release nuevo con el `.exe` actualizado.

---

## Notas

| Tema | Detalle |
|------|---------|
| Datos guardados | En el .exe se usa el mismo `localStorage` del usuario de Windows (por perfil). |
| Antivirus | A veces marcan instaladores nuevos sin firma; es normal en apps sin certificado de código. |
| Firma comercial | Para evitar avisos de SmartScreen hace falta certificado de desarrollador (de pago). |
| Solo Windows | Este workflow genera instalador para Windows. Mac/Linux requieren otros jobs. |

## Archivos relacionados

- `electron/main.cjs` — ventana de escritorio
- `package.json` → script `dist:win` y config `build`
- `.github/workflows/build-windows.yml` — CI en GitHub
