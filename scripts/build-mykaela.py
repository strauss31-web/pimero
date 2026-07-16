#!/usr/bin/env python3
"""Integra el portafolio de Mykaela (archivo único HTML) al sitio Lúdica Lab.

Uso:  python3 scripts/build-mykaela.py <archivo-nuevo.html>
Deja el resultado en portafolio-mykaela/ (index.html + img/ + vid/).

Tratamiento (mismo que el portafolio de Alejandro):
  1. Tema Lúdica: paleta roja/negro/hueso y Space Mono autoalojada
  2. Lightbox móvil: botón ✕, candado de scroll y el gesto "atrás"
     cierra la foto/video en lugar de salir de la página
  3. Nav y hero compactos en pantallas chicas
  4. Carga progresiva: imágenes y videos como archivos aparte
"""
import base64
import re
import shutil
import sys
import pathlib

HERE = pathlib.Path(__file__).resolve().parent
SRC = pathlib.Path(sys.argv[1])
OUT = HERE.parent / 'portafolio-mykaela'
DST = OUT / 'index.html'
OUT.mkdir(exist_ok=True)

s = SRC.read_text(encoding='utf-8')

# ---------- 1. Tema ----------
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
head = head.replace('<style>', '<style>\n' + fontface, 1)
head = head.replace(
    ':root{--bg:#08080A;--ink:#F4F1EA;--acc:#3140FF;--hot:#FF3D00;--dim:#8B8B93;--line:#1D1D22}',
    ':root{--bg:#111111;--ink:#F3EFE7;--acc:#FF0031;--hot:#FF0031;--dim:#98938A;--line:#2A2724}',
)
head = re.sub(r'\.hero-roles \.cob\{color:#[0-9A-Fa-f]+\}', '.hero-roles .cob{color:#F3EFE7}', head)
for old in ("'Unbounded'", "'Instrument Sans'", "'IBM Plex Mono'"):
    head = head.replace(old, "'Space Mono'")

# CSS de mejoras (✕ del lightbox + móvil compacto)
extra_css = (
    "/* CIERRE DE LIGHTBOX + MÓVIL (mejoras Lúdica) */\n"
    "#lb-x{position:fixed;top:14px;right:14px;z-index:100;width:46px;height:46px;background:#111;"
    "border:2px solid var(--ink);color:var(--ink);font-family:'Space Mono';font-size:1.1rem;font-weight:700;"
    "cursor:pointer;display:grid;place-items:center}\n"
    "#lb-x:hover{border-color:var(--hot);color:var(--hot)}\n"
    "@media(max-width:600px){nav{padding:12px 14px}nav .links{gap:9px}"
    "nav .links a{font-size:.55rem;letter-spacing:.05em}"
    "header{padding-top:78px}h1{font-size:clamp(2.2rem,10.5vw,4rem)}"
    ".metrics{grid-template-columns:repeat(3,1fr)}.metric{padding:12px 8px 14px}"
    ".metric b{font-size:1.15rem}.metric span{font-size:.56rem}"
    ".hero-sub{font-size:.92rem;margin-bottom:24px}}\n"
)
head = head.replace('/* REVEAL */', extra_css + '/* REVEAL */', 1)
s = head + body

# ---------- 2. Lightbox móvil ----------
s = s.replace(
    '<div id="lb" onclick="closeLB()"><span id="lb-slot"></span></div>',
    '<div id="lb"><button id="lb-x" aria-label="Cerrar">✕</button><span id="lb-slot"></span></div>',
)
viejo_lb = s[s.index('function openLB(v){'):s.index("document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLB()});")]
nuevo_lb = """let lbOpen=false;
function abreLB(){
  $('#lb').classList.add('open');
  document.body.style.overflow='hidden';
  lbOpen=true;
  history.pushState({lb:1},'');
}
function openLB(v){
  const k=kind(v);
  $('#lb-slot').innerHTML =
    k==='mp4'   ? `<video src="${v}" autoplay loop playsinline controls></video>` :
    k==='drive' ? `<iframe src="${durl(v)}" allow="autoplay; fullscreen" allowfullscreen></iframe>` :
                  `<iframe src="${vurl(v,false)}" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
  abreLB();
}
function reallyCloseLB(){
  lbOpen=false;
  $('#lb').classList.remove('open');
  $('#lb-slot').innerHTML='';
  document.body.style.overflow='';
}
function closeLB(){
  if(!lbOpen)return;
  if(history.state&&history.state.lb){history.back();return;}
  reallyCloseLB();
}
window.addEventListener('popstate',()=>{if(lbOpen)reallyCloseLB();});
$('#lb').addEventListener('click',e=>{if(e.target.id==='lb'||e.target.closest('#lb-x'))closeLB();});
document.addEventListener('click',e=>{
  if(e.target.closest('#lb'))return;
  const f=e.target.closest('.pic');
  if(f){$('#lb-slot').innerHTML=`<img src="${IMG[f.dataset.k]}">`;abreLB();return;}
  const v=e.target.closest('.film');
  if(v)openLB(VID[v.dataset.v]);
});
"""
s = s.replace(viejo_lb, nuevo_lb, 1)
# el manejador de click viejo quedaba después del keydown; elimínalo si sigue
s = re.sub(
    r"document\.addEventListener\('click',e=>\{\n  const f=e\.target\.closest\('\.pic'\);.*?\n\}\);\n",
    '', s, count=1, flags=re.S)

# ---------- 3. Medios externos (carga progresiva) ----------
img_dir = OUT / 'img'
vid_dir = OUT / 'vid'
for d in (img_dir, vid_dir):
    if d.exists():
        shutil.rmtree(d)
    d.mkdir(parents=True)

def _img(m):
    key, mime, b64 = m.group(1), m.group(2), m.group(3)
    ext = 'jpg' if mime == 'jpeg' else mime
    (img_dir / f'{key}.{ext}').write_bytes(base64.b64decode(b64))
    return f'"{key}": "img/{key}.{ext}"'

def _vid(m):
    key, b64 = m.group(1), m.group(2)
    (vid_dir / f'{key}.mp4').write_bytes(base64.b64decode(b64))
    return f'"{key}": "vid/{key}.mp4"'

s = re.sub(r'"([A-Za-z0-9_]+)": "data:image/(jpeg|png);base64,([A-Za-z0-9+/=]+)"', _img, s)
s = re.sub(r'"([A-Za-z0-9_]+)": "data:video/mp4;base64,([A-Za-z0-9+/=]+)"', _vid, s)

DST.write_text(s, encoding='utf-8')
n_img = len(list(img_dir.glob('*')))
n_vid = len(list(vid_dir.glob('*')))
print(f'OK → {DST} ({DST.stat().st_size / 1024:.0f} KB) · {n_img} imágenes, {n_vid} videos externos')
for pend in ('#3140FF', '#FF3D00', 'fonts.googleapis', 'onclick="closeLB()"', 'data:image', 'data:video'):
    if pend in s:
        print('PENDIENTE:', pend)
