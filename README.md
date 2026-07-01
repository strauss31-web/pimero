# Lúdica — Experiencias inmersivas

Sitio web para Lúdica (ludicalab.com), estudio de experiencias inmersivas para museos, marcas, hoteles y espacios culturales: museografía inmersiva, instalaciones interactivas, narrativa digital y diseño audiovisual. Construido con HTML, CSS y JavaScript puros — sin dependencias ni proceso de build.

La página misma está diseñada para sentirse inmersiva: fondo de partículas que reacciona al cursor, cursor personalizado con estela de luz, botones magnéticos, tarjetas con efecto 3D y textura de ruido cinematográfica.

## Secciones

1. **Inicio** — Hero con constelación de puntos interactiva (el isotipo, vivo)
2. **El reto** — Estadísticas de saturación publicitaria
3. **Filosofía** — "Las personas no recuerdan espacios. Recuerdan lo que sintieron en ellos."
4. **Qué hacemos** — Activaciones & lanzamientos, arte digital permanente, intervenciones urbanas
5. **Resultados** — Métricas reales (+6M personas, +40K/día, 3x permanencia)
6. **Casos** — 6 proyectos con fotos reales (Metro Bellas Artes, Celebrando la Eternidad, Museo Identidades Juárez, Friedeberg, Celebrity Xcel, Santa Úrsula Coapa)
7. **Equipo** — Fundadores: Alejandro Strauss y Mykaela Plotkin
8. **Alianza** — Modelo de trabajo conjunto
9. **Contacto** — Datos reales y formulario con validación

Las fotos y el logo (en `assets/`) provienen del sales deck oficial de Lúdica Lab.

## Estructura

```
pimero/
├── index.html      # Página principal
├── styles.css      # Estilos
├── script.js       # Partículas, cursor, animaciones y formulario
└── README.md       # Este archivo
```

## Cómo verla

Abre `index.html` en tu navegador, o sirve la carpeta con cualquier servidor estático:

```bash
python3 -m http.server 8000
# luego visita http://localhost:8000
```

## Personalización

### Colores
Edita las variables al inicio de `styles.css`:

```css
:root {
    --bg: #050508;        /* Fondo principal */
    --violet: #8b5cf6;    /* Acento principal */
    --cyan: #22d3ee;      /* Acento secundario */
    --magenta: #e879f9;   /* Acento terciario */
}
```

### Contenido
Todo el texto está en `index.html`: experiencias, proyectos, estadísticas (atributo `data-count`), testimonios y datos de contacto. Reemplaza los ejemplos por tus casos reales.

### Formulario de contacto
El formulario valida y confirma en pantalla, pero no envía correos por sí solo. Para recibir mensajes, conecta un servicio como [Formspree](https://formspree.io) o un backend propio en el handler de `script.js`.

## Características

- ✅ Campo de partículas en canvas que reacciona al movimiento del cursor
- ✅ Cursor personalizado con halo de luz (solo escritorio)
- ✅ Botones magnéticos y tarjetas con tilt 3D
- ✅ Cintas marquee animadas y contadores de estadísticas
- ✅ Responsive con menú hamburguesa
- ✅ Respeta `prefers-reduced-motion` (desactiva animaciones si el usuario lo pide)
- ✅ Sin dependencias externas (solo las fuentes Syne e Inter de Google Fonts)
