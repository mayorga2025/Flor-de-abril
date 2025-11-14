# Flor de Abril (Versión Estática)

Proyecto estático en HTML/CSS/JavaScript que replica el catálogo de trajes típicos.

## Estructura
```
flor-de-vida/
  index.html
  styles.css
  app.js
  README.md
```

Usa las mismas imágenes y logo que el proyecto original.

## Cómo probar localmente
En PowerShell:
```powershell
cd flor-de-vida
python -m http.server 5050
# Abrir http://localhost:5050
```
(Si no tienes Python, abre `index.html` directamente o usa la extensión Live Server.)

## Despliegue en GitHub Pages
Opción 1: Copia la carpeta `flor-de-vida` a `docs/` (o su contenido) para servirla.
```powershell
# Desde la raíz del repo
Remove-Item docs -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item flor-de-vida docs -Recurse
git add docs -A
git commit -m "deploy: flor de abril static version"
git push origin main
```
Luego en Settings > Pages: seleccionar branch `main` y carpeta `/docs`.

Opción 2: Mantener ambos (build de Vite y esta versión) en subcarpetas y hacer deploy manual del que quieras.

## Características
- Filtro por región (Catálogo).
- Modal con selección de talla, color, cantidad y fecha.
- Mensaje de reserva vía WhatsApp.
- Galería con bloque de historia ampliada.
- Animaciones CSS (fade, scale, slide).
- Diseño responsive.

## Personalización rápida
- Cambiar colores en `:root` dentro de `styles.css`.
- Ajustar datos en arrays dentro de `app.js`.

## Licencia
Uso interno/educativo. Mantén crédito al emprendimiento original.
