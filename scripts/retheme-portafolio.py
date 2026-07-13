#!/usr/bin/env python3
"""Adapta el portafolio de Alejandro (archivo único HTML) al sitio Lúdica Lab.

Uso:  python3 scripts/retheme-portafolio.py <archivo-nuevo.html>
Deja el resultado en portafolio/index.html listo para commit.

Fase 1 — Tema (solo toca el <style> del head, nunca los medios base64):
  - Paleta:   fondo #111111, tinta #F3EFE7, acentos #FF0031, sin azules
  - Fuentes:  Unbounded / Instrument Sans / IBM Plex Mono → Space Mono
              autoalojada (../assets/fonts/), sin Google Fonts

Fase 2 — Mejoras (móvil + bilingüe):
  - Lightbox con botón ✕, candado de scroll y el gesto "atrás" cierra
    la foto en lugar de salir de la página
  - Botón ES/EN en el nav; textos y datos bilingües (traducciones en
    scripts/portafolio-tail.js, que reemplaza el JS final del archivo)

Fase 3 — Imágenes extra por proyecto:
  - Incrusta scripts/portafolio-extra/*.jpg en los proyectos indicados
    en PLACEMENTS (fotos reales que no venían en el archivo original);
    los archivos ausentes simplemente se omiten
"""
import base64
import re
import sys
import pathlib

from PIL import Image

HERE = pathlib.Path(__file__).resolve().parent
SRC = pathlib.Path(sys.argv[1])
DST = HERE.parent / 'portafolio' / 'index.html'
TAIL = (HERE / 'portafolio-tail.js').read_text(encoding='utf-8')

s = SRC.read_text(encoding='utf-8')

# ---------- Fase 1: tema ----------
cut = s.find('</style>') + len('</style>')
head, body = s[:cut], s[cut:]

head = head.replace('<link rel="preconnect" href="https://fonts.googleapis.com">\n', '')
head = re.sub(r'<link href="https://fonts\.googleapis\.com/css2\?[^"]*" rel="stylesheet">\n?', '', head)
fontface = (
    "@font-face{font-family:'Space Mono';src:url('../assets/fonts/space-mono-latin-400-normal.woff2') "
    "format('woff2');font-weight:400;font-style:normal;font-display:swap}\n"
    "@font-face{font-family:'Space Mono';src:url('../assets/fonts/space-mono-latin-700-normal.woff2') "
    "format('woff2');font-weight:700;font-style:normal;font-display:swap}\n"
)
if "font-family:'Space Mono';src:url" not in head:
    head = head.replace('<style>', '<style>\n' + fontface, 1)
head = head.replace(
    ':root{--bg:#08080A;--ink:#F4F1EA;--acc:#3140FF;--hot:#FF3D00;--dim:#8B8B93;--line:#1D1D22}',
    ':root{--bg:#111111;--ink:#F3EFE7;--acc:#FF0031;--hot:#FF0031;--dim:#98938A;--line:#2A2724}',
)
head = head.replace('.hero-roles .cob{color:#7c86ff}', '.hero-roles .cob{color:#F3EFE7}')
for old in ("'Unbounded'", "'Instrument Sans'", "'IBM Plex Mono'"):
    head = head.replace(old, "'Space Mono'")

# ---------- Fase 2: mejoras móvil + bilingüe ----------
extra_css = (
    "/* CIERRE DE LIGHTBOX + IDIOMA (mejoras Lúdica) */\n"
    "#lb-x{position:fixed;top:14px;right:14px;z-index:100;width:46px;height:46px;background:#111;"
    "border:2px solid var(--ink);color:var(--ink);font-family:'Space Mono';font-size:1.1rem;font-weight:700;"
    "cursor:pointer;display:grid;place-items:center}\n"
    "#lb-x:hover{border-color:var(--hot);color:var(--hot)}\n"
    "#langbtn{border:1px solid var(--line);padding:5px 12px}\n"
    "@media(max-width:600px){nav{padding:12px 14px}nav .links{gap:9px}"
    "nav .links a{font-size:.55rem;letter-spacing:.05em}#langbtn{padding:3px 8px}"
    "header{padding-top:78px}h1{font-size:clamp(2.2rem,10.5vw,4rem)}"
    ".metrics{grid-template-columns:repeat(2,1fr)}.metric{padding:12px 12px 14px}"
    ".metric b{font-size:1.25rem}.hero-sub{font-size:.92rem;margin-bottom:24px}}\n"
)
if '#lb-x{' not in head:
    head = head.replace('/* REVEAL */', extra_css + '/* REVEAL */', 1)

s = head + body

# Botón de idioma en el nav
s = s.replace(
    '<a href="#contact">Contact</a>\n',
    '<a href="#contact">Contact</a><a href="#" id="langbtn" aria-label="Cambiar idioma / Switch language">ES</a>\n',
)

# Lightbox con botón de cierre (sin onclick inline)
s = s.replace(
    '<div id="lb" onclick="closeLB()"><span id="lb-slot"></span></div>',
    '<div id="lb"><button id="lb-x" aria-label="Cerrar / Close">✕</button><span id="lb-slot"></span></div>',
)

# JS final → motor bilingüe con lightbox mejorado
i0 = s.find('const $=(s,c=document)')
i1 = s.rfind('</script>')
assert i0 > 0 and i1 > i0, 'no se encontró el bloque JS final'
s = s[:i0] + TAIL + s[i1:]

# ---------- Fase 3: imágenes extra por proyecto ----------
EXTRA_DIR = HERE / 'portafolio-extra'
# Por proyecto: (lista original de DATA, lista deseada). Las claves nuevas
# que no tengan .jpg en portafolio-extra se omiten sin romper nada.
PLACEMENTS = {
    'juarez': (
        ['juarez_desierto', 'juarez_bartender', 'juarez_fachada', 'juarez_rostros'],
        ['juarez_cantina', 'juarez_desierto', 'juarez_muro', 'juarez_corredor',
         'juarez_mapping', 'juarez_proyeccion', 'juarez_algodon', 'juarez_casita',
         'juarez_vitrinas', 'juarez_collage', 'juarez_bartender', 'juarez_fachada',
         'juarez_rostros'],
    ),
    'metro': (
        ['metro_friedeberg', 'metro_corredor'],
        ['metro_liquido', 'metro_friedeberg', 'metro_tunel', 'metro_corredor'],
    ),
    'pakal': (
        ['pakal_disco'],
        ['pakal_craneos', 'pakal_disco', 'pakal_alebrijes', 'pakal_maya'],
    ),
    'voices': (
        ['voices_escenario'],
        ['voices_escenario', 'voices_zocalo'],
    ),
    'santuarios': (
        ['santuarios_volcan'],
        ['santuarios_volcan', 'santuarios_luna'],
    ),
    'delirio': (
        ['delirio_sala'],
        ['delirio_sala', 'delirio_bosque'],
    ),
    'barroco': (
        ['barroco_flores', 'barroco_sala', 'barroco_vestidos', 'barroco_museo'],
        ['barroco_flores', 'barroco_sala', 'barroco_columnas', 'barroco_vestidos',
         'barroco_petalos', 'barroco_museo'],
    ),
}
extras = {p.stem: p for p in sorted(EXTRA_DIR.glob('*.jpg'))} if EXTRA_DIR.is_dir() else {}
if extras:
    img_entries, ar_entries = [], []
    for key, p in extras.items():
        b64 = base64.b64encode(p.read_bytes()).decode()
        img_entries.append(f'"{key}": "data:image/jpeg;base64,{b64}"')
        w, h = Image.open(p).size
        ar_entries.append(f'"{key}": {w / h:.3f}')
    s = s.replace('const IMG = {', 'const IMG = {' + ', '.join(img_entries) + ', ', 1)
    s = s.replace('const AR = {', 'const AR = {' + ', '.join(ar_entries) + ', ', 1)
    for proj, (orig, wanted) in PLACEMENTS.items():
        old_list = '"imgs": [' + ', '.join(f'"{k}"' for k in orig) + ']'
        keep = [k for k in wanted if k in extras or k in orig]
        new_list = '"imgs": [' + ', '.join(f'"{k}"' for k in keep) + ']'
        assert old_list in s, f'no se encontró la lista de imágenes de {proj}'
        s = s.replace(old_list, new_list, 1)

DST.write_text(s, encoding='utf-8')
pend = [p for p in ('#3140FF', '#FF3D00', '#7c86ff', 'fonts.googleapis', 'onclick="closeLB()"') if p in s]
ok = [p for p in ('#lb-x', 'langbtn', 'applyLang', 'popstate') if p not in s]
print(f'OK → {DST} ({DST.stat().st_size / 1e6:.1f} MB)')
print('pendientes de revisar a mano:', pend if pend else 'ninguno')
print('faltantes esperados:', ok if ok else 'ninguno')
