# Lúdica — Experiencias inmersivas

Sitio web para Lúdica (ludicalab.com), estudio de experiencias inmersivas para museos, marcas, hoteles y espacios culturales: museografía inmersiva, instalaciones interactivas, narrativa digital y diseño audiovisual. Construido con HTML, CSS y JavaScript puros — sin dependencias ni proceso de build.

La página misma está diseñada para sentirse inmersiva: fondo de partículas que reacciona al cursor, cursor personalizado con estela de luz, botones magnéticos, tarjetas con efecto 3D y textura de ruido cinematográfica.

## Secciones

1. **Inicio** — Hero a pantalla completa con campo de partículas interactivo
2. **Experiencias** — VR/AR, video mapping, instalaciones interactivas y eventos
3. **El estudio** — Manifiesto y estadísticas con contadores animados
4. **Proyectos** — Casos seleccionados con tarjetas 3D
5. **Voces** — Testimonios de clientes
6. **Contacto** — Formulario con validación, datos y redes

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
