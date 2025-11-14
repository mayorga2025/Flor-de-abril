# Flor de Abril (Versión Estática)

Proyecto estático en HTML/CSS/JavaScript que replica el catálogo de trajes típicos.

## Estructura
```
flor-de-abril/
  index.html
  styles.css
  app.js
  README.md
```

Usa las mismas imágenes y logo que el proyecto original.

## Cómo probar localmente
En PowerShell:
```powershell
cd flor-de-abril
python -m http.server
# Abrir http://localhost:8000 o simplemente abrir `index.html` directamente
```
(Si no tienes Python, abre `index.html` directamente o usa la extensión Live Server.)

## Despliegue en GitHub Pages
Opción 1: Copia la carpeta `flor-de-abril` a `docs/` (o su contenido) para servirla.
```powershell
# Desde la raíz del repo
Remove-Item docs -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item flor-de-abril docs -Recurse
git add docs -A
git commit -m "deploy: flor de abril static version"
git push origin main
```
Luego en Settings > Pages: seleccionar branch `main` y carpeta `/docs`.

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
