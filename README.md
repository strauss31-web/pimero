# Pimero — Página web corporativa

Sitio web moderno y responsivo para Pimero, agencia digital. Construido con HTML, CSS y JavaScript puros — sin dependencias ni proceso de build.

## Secciones

1. **Inicio (Hero)** — Presentación con llamada a la acción y estadísticas
2. **Quiénes somos** — Descripción de la empresa, misión, visión y valores
3. **Servicios** — Diseño web, desarrollo, optimización/SEO y mantenimiento
4. **Portafolio** — Muestra de proyectos realizados
5. **Testimonios** — Opiniones de clientes
6. **Contacto** — Formulario con validación, datos de contacto y redes sociales

## Estructura

```
pimero/
├── index.html      # Página principal
├── styles.css      # Estilos
├── script.js       # Interactividad
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
Edita las variables CSS al inicio de `styles.css`:

```css
:root {
    --primary: #0f172a;   /* Color principal (fondos oscuros) */
    --accent: #06b6d4;    /* Color de acento (botones, enlaces) */
    --accent-2: #ec4899;  /* Acento secundario (degradados) */
}
```

### Contenido
Todo el texto está en `index.html`: nombre de la empresa, servicios, proyectos, testimonios y datos de contacto (correo, teléfono, redes sociales). Reemplaza los datos de ejemplo por los reales.

### Formulario de contacto
El formulario valida y confirma en pantalla, pero no envía correos por sí solo. Para recibir mensajes, conecta un servicio como [Formspree](https://formspree.io) o un backend propio en el handler de `script.js`.

## Características

- ✅ Diseño responsive (móvil, tablet y escritorio) con menú hamburguesa
- ✅ Navegación con scroll suave y navbar fija
- ✅ Animaciones de aparición al hacer scroll (respeta `prefers-reduced-motion`)
- ✅ Formulario de contacto con validación
- ✅ Sin dependencias externas (solo la fuente Inter de Google Fonts)
