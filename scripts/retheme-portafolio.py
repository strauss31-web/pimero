#!/usr/bin/env python3
"""Adapta el portafolio de Alejandro (archivo único HTML) a la identidad Lúdica Lab.

Uso:  python3 scripts/retheme-portafolio.py <archivo-nuevo.html>
Deja el resultado en portafolio/index.html listo para commit.

Cambios que aplica (solo en el <style> del head, nunca toca los medios base64):
  - Paleta:   fondo #111111, tinta #F3EFE7, acentos #FF0031, sin azules
  - Fuentes:  Unbounded / Instrument Sans / IBM Plex Mono → Space Mono
              autoalojada (../assets/fonts/), se eliminan los links a Google Fonts
"""
import re
import sys
import pathlib

SRC = pathlib.Path(sys.argv[1])
DST = pathlib.Path(__file__).resolve().parent.parent / 'portafolio' / 'index.html'

s = SRC.read_text(encoding='utf-8')
cut = s.find('</style>') + len('</style>')
head, body = s[:cut], s[cut:]

# 1. Google Fonts → Space Mono autoalojada
head = head.replace('<link rel="preconnect" href="https://fonts.googleapis.com">\n', '')
head = re.sub(r'<link href="https://fonts\.googleapis\.com/css2\?[^"]*" rel="stylesheet">\n?', '', head)
fontface = (
    "@font-face{font-family:'Space Mono';src:url('../assets/fonts/space-mono-latin-400-normal.woff2') "
    "format('woff2');font-weight:400;font-style:normal;font-display:swap}\n"
    "@font-face{font-family:'Space Mono';src:url('../assets/fonts/space-mono-latin-700-normal.woff2') "
    "format('woff2');font-weight:700;font-style:normal;font-display:swap}\n"
)
head = head.replace('<style>', '<style>\n' + fontface, 1)

# 2. Paleta Lúdica (variables :root del portafolio v6; ajustar si cambian)
head = head.replace(
    ':root{--bg:#08080A;--ink:#F4F1EA;--acc:#3140FF;--hot:#FF3D00;--dim:#8B8B93;--line:#1D1D22}',
    ':root{--bg:#111111;--ink:#F3EFE7;--acc:#FF0031;--hot:#FF0031;--dim:#98938A;--line:#2A2724}',
)
head = head.replace('.hero-roles .cob{color:#7c86ff}', '.hero-roles .cob{color:#F3EFE7}')

# 3. Tipografías
for old in ("'Unbounded'", "'Instrument Sans'", "'IBM Plex Mono'"):
    head = head.replace(old, "'Space Mono'")

DST.write_text(head + body, encoding='utf-8')
restantes = [p for p in ('#3140FF', '#FF3D00', '#7c86ff', 'fonts.googleapis') if p in head]
print(f'OK → {DST} ({DST.stat().st_size / 1e6:.1f} MB)')
print('pendientes de revisar a mano:', restantes if restantes else 'ninguno')
