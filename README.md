# Lúdica Lab — Sitio web

Sitio oficial de **Lúdica Lab** (ludicalab.com), estudio de experiencias inmersivas para museos, marcas, hoteles y espacios culturales. HTML, CSS y JavaScript puros — sin dependencias ni build.

Identidad: rojo #FF0031, tipografía monoespaciada (Space Mono) en mayúsculas y el isotipo de puntos conectados, que inspira la constelación interactiva del hero.

## Secciones

1. **Hero** — Constelación de puntos interactiva (clic para sembrar nuevos puntos) y parallax con el mouse
2. **(01) Qué hacemos** — Museografía inmersiva, instalaciones interactivas, narrativa digital, diseño audiovisual
3. **(02) El estudio** — Manifiesto, colaboradores y estadísticas animadas
4. **(03) Territorios** — Galería expandible de 6 territorios (hover/tap)
5. **(04) Proyectos** — Paneles apilados con scroll: MIJ, Metro Bellas Artes, Celebrando la Eternidad, Santa Úrsula, Portal 360°, MUFU
6. **(05) Obras en escena** — Espectáculos con scroll horizontal
7. **(06) En movimiento** — Videoteca: reproductor grande + filmstrip (clips servidos desde Google Drive)
8. **(07) Zona de juego** — Lienzo generativo: pinta con luz, clic = explosión
9. **(08) Equipo** — Fundadores
10. **(09) Contacto** — Formulario conectado a lab@ludicalab.com vía FormSubmit

## Interacciones

Cursor personalizado con halo, botones magnéticos, texto descifrado en índices, spotlight en tarjetas, tilt 3D, marquees pausables, letras del footer que huyen del cursor. Todo respeta `prefers-reduced-motion` y se degrada en táctil.

## Notas de operación

- **Formulario**: la primera vez que alguien envíe, FormSubmit manda un correo de activación a lab@ludicalab.com — hay que confirmarlo una vez.
- **Videos e imagen del MIJ**: se sirven desde Google Drive; los archivos deben estar compartidos como "cualquiera con el enlace".
- **Imágenes**: las fotos reales viven en `assets/` (provienen del sales deck). Las imágenes conceptuales de Territorios están enlazadas desde CDN.

## Ver en local

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Personalización

Colores en las variables de `styles.css` (`--red`, `--black`, `--bone`). Textos en `index.html`. Juegos y efectos en `script.js`.
