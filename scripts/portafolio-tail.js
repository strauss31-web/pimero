const $=(s,c=document)=>c.querySelector(s);
const $$=(s,c=document)=>[...c.querySelectorAll(s)];

/* ==================== ES / EN ==================== */
const ES = {
 ailab: {
  "F.L.A.U.X — Vía Crucis": {tag:"Moda IA · Dirección de Arte", note:"Una casa de moda barroco-mexicana que nunca existió. Casting, vestuario, iluminación y pasarela — todo dirigido, nada fotografiado."},
  "F.L.A.U.X — La Bota": {tag:"Narrativa de Producto IA", note:"Una bota de glitter, toda una mitología: noches de paparazzi, lowriders, altares y mariscos."},
  "F.L.A.U.X — Silverio": {tag:"Personaje y Mundo IA", note:"Un antihéroe retro-tropical con biblia de personaje completa: autos en llamas, delfines, surf, ofrendas y teléfonos públicos."},
  "La Mesa": {tag:"Serie Conceptual IA", note:"Estudios en blanco y negro sobre el poder y la distancia. Una mesa, un hombre, tensión infinita."},
  "Casa de Playa": {tag:"Key Art y Campaña de Cine IA", note:"No solo pósters: una campaña completa de exteriores — espectaculares, autobuses, muros y redes — para una película que solo existe en IA."},
  "Exportações Impossíveis": {tag:"Design Fiction IA · Proyecto Final", note:"Muebles imposibles de un Brasil imposible — Poltrona Carnaval, Culto ao Corpo, Cadeira Amazonas. Diseño de producto que no se puede fabricar, solo imaginar."},
  "Azul Mirlo": {tag:"Campaña de Color y Marca IA", note:"Una marca entera construida sobre un color — el azul al que no le importa incomodarte. Identidad, glifos, producto, interiores y una campaña completa de estrategia de color."},
  "Boca Abajo Lux": {tag:"Fotografía de Producto IA", note:"Dueto de producto de lujo — el mismo objeto, dos cielos."},
  "Estudios": {tag:"Exploraciones de Retrato IA", note:"Experimentos de retrato en curso, entre el surrealismo y el documento."},
  "Museografía Generativa": {tag:"Previz IA · Espacios para Clientes", note:"Así vendo una sala antes de que exista: previsualización con IA de galerías interactivas, salas 360°, túneles de luz y pisos reactivos — conceptos en los que tu visitante ya camina, listos para construirse. ¿Tienes un espacio? Te lo enseño terminado."},
  "Los Abuelos": {tag:"Personajes Stop-motion IA · Museografía", note:"Personajes hechos para conmover al público de un museo: una abuela, un abuelo y un xolo bajo la luna. Pipeline de producción completo — hojas de personaje, estudios de expresión y cuadros finales — listo para proyectarse en sala, como se entrega en museografía inmersiva real."},
 },
 films: {
  muerte:"Western IA — película final del máster · corte completo con sonido en Vimeo",
  xolo:"Corto IA — un xoloitzcuintle bajo la luna",
  museoagua:"Contenido museográfico — secuencia de pirámide maya",
  portal360:"Pieza 360° — el mundo viene a jugar",
  volcan:"Santuarios — contenido de proyección en 4K",
  nocturno:"Corto IA — adobe, búhos y noche de desierto",
  bosque:"Corto IA — secuencia de cacería en 4K",
  catrina:"Escena IA — catrina y venado, B/N",
  sastre:"Fashion Film IA",
  limones:"Producto en Movimiento IA"
 },
 projects: {
  juarez:{title:"Museo de las Identidades Juárez", role:"Dirección Creativa y Producción", desc:"Un recorrido museográfico inmersivo que replantea la narrativa de Ciudad Juárez — de su génesis en el desierto a sus años dorados de neón y los rostros de su gente hoy. Salas sonoras, hologramas, proyección stop-motion y un muro de memoria migrante."},
  pakal:{title:"Pakal: Viaje al Inframundo", role:"Dirección Creativa y Producción", desc:"Una cena-show 5D de 90 minutos que desciende a la mitología maya — interacciones con IA, escenografía UV y una degustación de más de 30 sabores sobre maíz nativo."},
  eternidad:{role:"Creativo", client:"Secretaría de Cultura · CDMX", desc:"Una peregrinación nocturna de Día de Muertos por el Bosque de Chapultepec — instalaciones, performance, flores y proyección. 534,000 visitantes en nueve noches."},
  metro:{title:"Galería Metro · Bellas Artes", role:"Dirección", client:"Metro CDMX", desc:"La primera galería de arte inmersivo dentro del Metro de la CDMX: el universo de Pedro Friedeberg reaccionando al movimiento de 300,000 pasajeros diarios."},
  barroco:{role:"Dirección General de Contenidos · Fresno", desc:"Reinvención digital completa del museo del Barroco: salas inmersivas, Las Cuatro Estaciones de Vivaldi, Hipnerotomagia de Friedeberg y Sentidos — una pieza interactiva que responde al movimiento, al ruido y a la proximidad."},
  delirio:{role:"Dirección de Contenidos · Fresno", desc:"906 m² de inmersión corpórea — los visitantes se funden con la música, la imagen y la danza más allá de los límites conocidos de la proyección."},
  sinaloa:{title:"Bacubirito · Centro de Ciencias de Sinaloa", role:"Concepto y Dirección de Video Mapping", desc:"La fachada del museo convertida en teatro inmersivo permanente sobre la creación del universo. Instalación permanente desde enero de 2020."},
  voices:{title:"Voces del Centro de la Tierra", role:"Dirección de Contenidos y Show", client:"Show Navideño · CDMX", desc:"Un coro de más de 1,500 niños de la Ciudad de México, puesto en escena con luz y proyección a escala monumental."},
  ciudad:{role:"Creatividad · Dirección · Contenidos", desc:"El festival navideño de la CDMX: la Plaza de la Constitución llena de luz, color y experiencias públicas gratuitas."},
  santuarios:{role:"Dirección Creativa y Desarrollo", client:"Experiencia Inmersiva", desc:"Un viaje multisensorial por santuarios culturales y espacios personales de reflexión — volcanes, lunas y fuego a escala panorámica."}
 },
 ui: {
  "nav .links a[href='#films']":"Cine",
  "nav .links a[href='#works']":"Obra",
  "nav .links a[href='#about']":"Sobre mí",
  "nav .links a[href='#contact']":"Contacto",
  ".hero-roles span:nth-child(1)":"Director de Arte × IA",
  ".hero-roles span:nth-child(2)":"Experiencias Inmersivas",
  ".hero-roles span:nth-child(3)":"Museografía · Mapping · Cine",
  ".hero-roles span:nth-child(4)":"CDMX → El Mundo",
  ".hero-sub":"Dirijo lo que el público siente. Veinte años construyendo mundos en museos, metros y plazas públicas — hoy dirijo a la IA como a un crew de cine.",
  ".metrics .metric:nth-child(1) span":"años dirigiendo",
  ".metrics .metric:nth-child(2) span":"visitantes · un show, 9 noches",
  ".metrics .metric:nth-child(3) span":"niños de coro en escena",
  ".metrics .metric:nth-child(4) span":"de inmersión corpórea",
  ".metrics .metric:nth-child(5) span":"galería inmersiva en un metro",
  "#ailab .sec-head .mono":"LABASAD · Máster en IA para la Creación Visual · Barcelona",
  "#ailab .sec-intro":"Aquí dirijo sin set: <b>casting, vestuario, luz y mundo — todo dirigido por prompt, calificado y editado como cine</b>. Siete series producidas de inicio a fin con pipelines generativos.",
  "#films .sec-head h2":"En <em>Movimiento</em>",
  "#films .sec-head a.mono":"Películas completas → vimeo/alejandrostrauss",
  "#films .sec-intro":"<b>Diez películas integradas en este mismo archivo</b> — corren sin internet, sin links ni permisos. Toca cualquiera para verla en grande.",
  "#works .sec-head h2":"Construido <em>y abierto</em> al público",
  "#works .sec-head .mono":"2019 — 2026 · Espacios reales, público real",
  "#about .sec-head h2":"Lo que me hace <em class=\"hot\">distinto</em>",
  "#about .lead":"Vivo en la intersección entre creatividad y tecnología — el público no solo ve mi trabajo, <em>camina dentro de él</em>.",
  "#about .about-col p:nth-child(1)":"<b>Más de 20 años en cine y televisión</b> — documental, comerciales, videos musicales y reality shows, nacional e internacionalmente. Ciencias de la Comunicación, Universidad Iberoamericana.",
  "#about .about-col p:nth-child(2)":"<b>El documental afinó mi ojo</b> para la narrativa cultural y la profundidad emocional — la investigación es el corazón de mi proceso creativo.",
  "#about .about-col p:nth-child(3)":"<b>Lidero equipos multidisciplinarios</b> del primer concepto a la noche de estreno, donde creatividad, producción y tecnología deben aterrizar sin costuras.",
  "#contact > .wrap > .mono":"Creemos juntos",
  "#contact h2":"¿Tienes un espacio?<br>Lo haré <em class=\"hot\">inolvidable</em>.",
  "footer span:nth-child(2)":"Dirección de Arte · IA · Inmersivo · Museografía"
 },
 ticker:['Dirección de Arte','×','IA','—','Inmersivo','—','Museografía','—','Video Mapping','—','Cine','—']
};
const EN = { ui:{}, ticker:['Art Direction','×','AI','—','Immersive','—','Museography','—','Video Mapping','—','Film','—'], metric1:'1st' };
Object.keys(ES.ui).forEach(sel=>{ const el=$(sel); if(el) EN.ui[sel]=el.innerHTML; });

let L = localStorage.getItem('pf_lang') || (((navigator.language||'en').toLowerCase().indexOf('es')===0) ? 'es' : 'en');

// HERO video
const hv=$('#herovid'); hv.src=VID['volcan'];
const tryPlay=()=>{hv.muted=true;hv.play().catch(()=>{})};tryPlay();
hv.addEventListener('canplay',tryPlay,{once:true});
['click','touchstart','scroll','keydown'].forEach(ev=>document.addEventListener(ev,tryPlay,{once:true,passive:true}));

// OBSERVERS (reveal + play/pausa de films según visibilidad)
const iov=new IntersectionObserver(es=>es.forEach(x=>{const vd=x.target.querySelector('video');if(!vd)return;x.isIntersecting?vd.play().catch(()=>{}):vd.pause();}),{threshold:.15});
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.06});

// RENDER (bilingüe: usa ES.* cuando L==='es', si no el texto original de DATA)
function renderLab(){
  $('#lab-list').innerHTML = DATA.ailab.map((s,i)=>{
    const p = (L==='es' && ES.ailab[s.title]) || {};
    return `
  <div class="series rv">
    <div class="series-head"><h3>${s.title}</h3><span class="mono">${p.tag||s.tag}</span></div>
    <p class="series-note">${p.note||s.note}</p>
    <div class="gal">${s.imgs.map(k=>`<figure class="pic" style="--ar:${AR[k]||1.5}" data-k="${k}"><img loading="lazy" src="${IMG[k]}" alt="${s.title}"></figure>`).join('')}</div>
  </div>`;
  }).join('');
}
function renderFilms(){
  $('#films-list').innerHTML = DATA.films.map((f,i)=>`
  <div class="film ${i===0||i===3?'big':''} rv" data-v="${f.key}">
    <video muted loop playsinline preload="metadata" src="${VID[f.key]}"></video>
    <div class="lbl"><h4>${f.title}</h4><span>${(L==='es'&&ES.films[f.key])||f.tag}</span></div>
  </div>`).join('');
  $$('.film').forEach(f=>iov.observe(f));
}
function renderWorks(){
  $('#works-list').innerHTML = DATA.projects.map((p,i)=>{
    const t = (L==='es' && ES.projects[p.id]) || {};
    return `
  <article class="project ${p.wide?'wide':''} rv">
    <div class="meta"><div>
        <span class="num">${String(i+1).padStart(2,'0')}</span>
        <h3>${t.title||p.title}</h3><p class="desc">${t.desc||p.desc}</p></div>
      <div class="tags"><span class="mono">${t.role||p.role}</span><span class="mono">${t.client||p.client} · ${p.year}</span></div>
    </div>
    <div class="pics n${p.imgs.length}">${p.imgs.map(k=>`<figure class="pic" data-k="${k}"><img loading="lazy" src="${IMG[k]}" alt="${t.title||p.title}"></figure>`).join('')}</div>
  </article>`;
  }).join('');
}
function applyLang(){
  document.documentElement.lang = L;
  Object.keys(ES.ui).forEach(sel=>{ const el=$(sel); if(el) el.innerHTML = (L==='es') ? ES.ui[sel] : EN.ui[sel]; });
  const m1=$('.metrics .metric:nth-child(5) b'); if(m1) m1.textContent = (L==='es') ? '1ª' : '1st';
  const tk = (L==='es') ? ES.ticker : EN.ticker;
  $('#tick').innerHTML = (tk.map((w,i)=>`<span class="${(w==='AI'||w==='IA')?'h':(i%3===0?'':'o')}">${w}</span>`).join('')).repeat(2);
  renderLab(); renderFilms(); renderWorks();
  $$('.rv:not(.in)').forEach(el=>io.observe(el));
  const lb=$('#langbtn'); if(lb) lb.textContent = (L==='es') ? 'EN' : 'ES';
  localStorage.setItem('pf_lang', L);
}
const langBtn=$('#langbtn');
if(langBtn) langBtn.addEventListener('click',e=>{ e.preventDefault(); L = (L==='es') ? 'en' : 'es'; applyLang(); });
applyLang();

// LIGHTBOX — con botón de cierre, candado de scroll y soporte del gesto/botón "atrás"
let lbOpen=false;
function openLB(html){
  $('#lb-slot').innerHTML=html;
  $('#lb').classList.add('open');
  document.body.style.overflow='hidden';
  lbOpen=true;
  history.pushState({lb:1},'');
}
function reallyCloseLB(){
  lbOpen=false;
  $('#lb').classList.remove('open');
  $('#lb-slot').innerHTML='';
  document.body.style.overflow='';
}
function closeLB(){
  if(!lbOpen) return;
  if(history.state && history.state.lb){ history.back(); return; } // popstate cierra
  reallyCloseLB();
}
window.addEventListener('popstate',()=>{ if(lbOpen) reallyCloseLB(); });
$('#lb').addEventListener('click',e=>{ if(e.target.id==='lb' || e.target.closest('#lb-x')) closeLB(); });
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeLB(); });
document.addEventListener('click',e=>{
  if(e.target.closest('#lb')) return;
  const f=e.target.closest('.pic');
  if(f){ openLB(`<img src="${IMG[f.dataset.k]}">`); return; }
  const v=e.target.closest('.film');
  if(v){ openLB(`<video src="${VID[v.dataset.v]}" autoplay loop muted playsinline controls></video>`); }
});
