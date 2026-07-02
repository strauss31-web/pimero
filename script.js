// ============================================
// LÚDICA LAB — Interactividad
// ============================================

const LANG = window.PAGE_LANG || 'es';
const MSG = LANG === 'en' ? {
    fill: 'PLEASE FILL IN ALL FIELDS.',
    mail: 'PLEASE CHECK YOUR EMAIL ADDRESS.',
    sending: 'SENDING...',
    ok: n => `RECEIVED, ${n}. WE WILL BE IN TOUCH SOON.`,
    fail: 'COULD NOT SEND. WRITE US AT LAB@LUDICALAB.COM',
    egg: '<strong>YOU FOUND THE DOT<span>.</span></strong><small>STAY CURIOUS — THIS IS HOW WE DESIGN OUR EXPERIENCES</small><small>( CLICK TO GO BACK )</small>',
    tabAway: 'STAY CURIOUS. — LÚDICA LAB',
    tabBack: 'LÚDICA LAB — Immersive Experiences'
} : {
    fill: 'COMPLETA TODOS LOS CAMPOS.',
    mail: 'REVISA TU CORREO ELECTRÓNICO.',
    sending: 'ENVIANDO...',
    ok: n => `RECIBIDO, ${n}. TE CONTACTAREMOS PRONTO.`,
    fail: 'NO SE PUDO ENVIAR. ESCRÍBENOS A LAB@LUDICALAB.COM',
    egg: '<strong>ENCONTRASTE EL PUNTO<span>.</span></strong><small>STAY CURIOUS — ASÍ SE DISEÑAN NUESTRAS EXPERIENCIAS</small><small>( CLIC PARA VOLVER )</small>',
    tabAway: 'STAY CURIOUS. — LÚDICA LAB',
    tabBack: 'LÚDICA LAB — Experiencias Inmersivas'
};

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// ===== Constelación de puntos del hero =====
// Puntos negros conectados por líneas: el isotipo de Lúdica, vivo.
const canvas = document.getElementById('particleField');
const ctx = canvas.getContext('2d');
const mouse = { x: null, y: null };
let particles = [];

function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 20000), 90);
    particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 3.2 + 1.4
    }));
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of particles) {
        // Repulsión suave alrededor del cursor
        if (mouse.x !== null) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 150 && dist > 0.01) {
                const force = (150 - dist) / 150;
                p.vx += (dx / dist) * force * 0.35;
                p.vy += (dy / dist) * force * 0.35;
            }
        }

        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
    }

    // Líneas entre puntos cercanos (como el isotipo)
    ctx.strokeStyle = 'rgba(17, 17, 17, 0.35)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            if (dist < 130) {
                ctx.globalAlpha = 1 - dist / 130;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
        }
    }
    ctx.globalAlpha = 1;

    ctx.fillStyle = 'rgba(17, 17, 17, 0.9)';
    for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
    }

    requestAnimationFrame(drawParticles);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

if (!reduceMotion) {
    drawParticles();
} else {
    // Sin animación: un fotograma estático
    ctx.fillStyle = 'rgba(17, 17, 17, 0.9)';
    for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
    }
}

canvas.parentElement.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

canvas.parentElement.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

// ===== Cursor personalizado con halo =====
if (finePointer && !reduceMotion) {
    const cursor = document.getElementById('cursor');
    const glow = document.getElementById('cursorGlow');
    let cx = 0, cy = 0, gx = 0, gy = 0;

    window.addEventListener('mousemove', e => {
        cx = e.clientX;
        cy = e.clientY;
        cursor.style.left = cx + 'px';
        cursor.style.top = cy + 'px';
    });

    (function followGlow() {
        gx += (cx - gx) * 0.09;
        gy += (cy - gy) * 0.09;
        glow.style.left = gx + 'px';
        glow.style.top = gy + 'px';
        requestAnimationFrame(followGlow);
    })();

    document.querySelectorAll('a, button, .exp-item, .prop, .fundador, .terr-panel').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
}

// ===== Botones magnéticos =====
if (finePointer && !reduceMotion) {
    document.querySelectorAll('[data-magnetic]').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.16}px, ${y * 0.16}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

// ===== Navbar y barra de progreso =====
const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    const total = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
}, { passive: true });

// ===== Menú móvil =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// ===== Aparición al hacer scroll =====
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== Contadores animados =====
function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    if (reduceMotion) {
        el.textContent = target.toLocaleString('en-US');
        return;
    }
    const duration = 1500;
    const start = performance.now();
    (function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased).toLocaleString('en-US');
        if (progress < 1) requestAnimationFrame(tick);
    })(start);
}

const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCount(entry.target);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => statObserver.observe(el));

// ===== Parallax del hero con el mouse =====
if (finePointer && !reduceMotion) {
    const heroBrand = document.querySelector('.hero-brand');
    const heroTag = document.querySelector('.hero-tag');
    document.querySelector('.hero').addEventListener('mousemove', e => {
        const x = (e.clientX / window.innerWidth - 0.5);
        const y = (e.clientY / window.innerHeight - 0.5);
        heroBrand.style.transform = `translate(${x * -22}px, ${y * -14}px)`;
        heroTag.style.transform = `translate(${x * -10}px, ${y * -6}px)`;
    });
}

// ===== Tilt 3D en tarjetas =====
if (finePointer && !reduceMotion) {
    document.querySelectorAll('.video-item, .obra, .fundador').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(700px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ===== Territorios: toque en pantallas táctiles =====
document.querySelectorAll('.terr-panel').forEach(panel => {
    panel.addEventListener('click', () => {
        const wasActive = panel.classList.contains('active');
        document.querySelectorAll('.terr-panel.active').forEach(o => o.classList.remove('active'));
        if (!wasActive) panel.classList.add('active');
    });
});

// ===== Foco de luz que sigue el cursor en tarjetas =====
if (finePointer && !reduceMotion) {
    document.querySelectorAll('.exp-item, .fundador').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
            card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
        });
    });
}

// ===== Texto descifrado (efecto terminal) en índices de sección =====
const GLYPHS = '█▓▒░<>/\\|=+*#';

function scramble(el) {
    const original = el.dataset.text;
    let frame = 0;
    const total = Math.max(14, original.length + 6);
    (function tick() {
        frame++;
        const settled = Math.floor((frame / total) * original.length);
        el.textContent = original.slice(0, settled) + original.slice(settled).split('').map(ch =>
            ch === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        ).join('');
        if (settled < original.length) {
            requestAnimationFrame(tick);
        } else {
            el.textContent = original;
        }
    })();
}

if (!reduceMotion) {
    const scrambleObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                scramble(entry.target);
                scrambleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    document.querySelectorAll('.section-index, .hero-kicker, .fi').forEach(el => {
        el.dataset.text = el.textContent;
        scrambleObserver.observe(el);
    });
}

// ===== Formulario de contacto =====
// Valida y confirma en pantalla. Para recibir los mensajes por correo,
// conecta un servicio como Formspree o un backend propio aquí.
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', event => {
    event.preventDefault();

    const nombre = contactForm.nombre.value.trim();
    const email = contactForm.email.value.trim();
    const mensaje = contactForm.mensaje.value.trim();

    if (!nombre || !email || !mensaje) {
        formStatus.textContent = MSG.fill;
        formStatus.className = 'form-status error';
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formStatus.textContent = MSG.mail;
        formStatus.className = 'form-status error';
        return;
    }

    formStatus.textContent = MSG.sending;
    formStatus.className = 'form-status';

    fetch('https://formsubmit.co/ajax/lab@ludicalab.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
            _subject: 'Nuevo mensaje desde ludicalab.com',
            nombre: nombre,
            email: email,
            mensaje: mensaje
        })
    }).then(r => {
        if (!r.ok) throw new Error('http ' + r.status);
        formStatus.textContent = MSG.ok(nombre.toUpperCase());
        formStatus.className = 'form-status ok';
        contactForm.reset();
    }).catch(() => {
        formStatus.textContent = MSG.fail;
        formStatus.className = 'form-status error';
    });
});

// ===== Videoteca: showcase + filmstrip =====
const videoStage = document.getElementById('videoStage');
const videoStrip = document.getElementById('videoStrip');

if (videoStage && videoStrip) {
    let playing = false;

    function coverHTML(id, label) {
        return `
        <button class="video-cover" aria-label="Reproducir video"
                style="background-image: url('https://drive.google.com/thumbnail?id=${id}&sz=w1280')">
            <span class="video-play">▶</span>
            <span class="video-now">${label}</span>
        </button>`;
    }

    function playVideo(id) {
        playing = true;
        videoStage.innerHTML = `<iframe src="https://drive.google.com/file/d/${id}/preview" allow="autoplay; fullscreen" allowfullscreen title="Video Lúdica Lab"></iframe>`;
    }

    function chipLabel(chip) {
        return chip.querySelector('.chip-num').textContent + ' — ' + chip.dataset.title;
    }

    videoStage.addEventListener('click', e => {
        const cover = e.target.closest('.video-cover');
        if (cover) {
            const active = videoStrip.querySelector('.video-chip.active');
            playVideo(active.dataset.id);
        }
    });

    videoStrip.querySelectorAll('.video-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            videoStrip.querySelectorAll('.video-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            if (playing) {
                playVideo(chip.dataset.id);
            } else {
                videoStage.innerHTML = coverHTML(chip.dataset.id, chipLabel(chip));
            }
        });
    });
}

// ===== Hero jugable: clic siembra constelación =====
canvas.parentElement.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    for (let i = 0; i < 7; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.4 + 0.6;
        particles.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            r: Math.random() * 3.2 + 1.4
        });
    }
    while (particles.length > 150) particles.shift();
});

// ===== Zona de juego: jardín de luz multicolor (flow field) =====
const playCanvas = document.getElementById('playCanvas');

if (playCanvas) {
    const pctx = playCanvas.getContext('2d');
    const playHint = document.getElementById('playHint');
    const streams = [];
    const blossoms = [];
    const pointer = { x: null, y: null, still: 0 };
    let played = false;
    let tt = 0;
    let hueBase = 348; // arranca en el rojo Lúdica y recorre el espectro

    function resizePlay() {
        playCanvas.width = playCanvas.clientWidth;
        playCanvas.height = playCanvas.clientHeight;
        pctx.fillStyle = '#0d0d0d';
        pctx.fillRect(0, 0, playCanvas.width, playCanvas.height);
        seedAmbient();
    }

    function flowAngle(x, y, t) {
        return (Math.sin(x * 0.004 + t * 0.4) + Math.cos(y * 0.0036 - t * 0.27)
             + Math.sin((x + y) * 0.0021 + t * 0.16)) * 1.7;
    }

    function makeStream(x, y, boost) {
        return {
            x, y,
            px: x, py: y,
            speed: (boost ? 1.7 : 0.85) + Math.random() * 1.0,
            life: 1,
            decay: 0.0035 + Math.random() * 0.004,
            w: Math.random() * 2.0 + 0.8,
            hue: hueBase + Math.random() * 70 - 15,
            sat: 85 + Math.random() * 15
        };
    }

    function seedAmbient() {
        streams.length = 0;
        const n = Math.min(Math.floor(playCanvas.width / 24), 64);
        for (let i = 0; i < n; i++) {
            streams.push(makeStream(Math.random() * playCanvas.width, Math.random() * playCanvas.height, false));
        }
    }

    function blossom(x, y) {
        const h = hueBase + Math.random() * 50;
        blossoms.push({ x, y, r: 4, max: 95 + Math.random() * 75, life: 1, hue: h });
        blossoms.push({ x, y, r: 2, max: 55 + Math.random() * 40, life: 1, hue: h + 45 });
        for (let i = 0; i < 30; i++) {
            const s = makeStream(x, y, true);
            const a = (i / 30) * Math.PI * 2;
            s.px = x - Math.cos(a) * 2;
            s.py = y - Math.sin(a) * 2;
            s.hue = h + Math.random() * 60 - 30;
            streams.push(s);
        }
        markPlayed();
    }

    function markPlayed() {
        if (!played) {
            played = true;
            playHint.classList.add('hidden');
        }
    }

    function pos(e) {
        const rect = playCanvas.getBoundingClientRect();
        const pt = e.touches ? e.touches[0] : e;
        return { x: pt.clientX - rect.left, y: pt.clientY - rect.top };
    }

    playCanvas.addEventListener('mousemove', e => {
        const { x, y } = pos(e);
        pointer.x = x; pointer.y = y; pointer.still = 0;
        for (let i = 0; i < 2; i++) {
            streams.push(makeStream(x + (Math.random() - 0.5) * 34, y + (Math.random() - 0.5) * 34, false));
        }
        markPlayed();
    });

    playCanvas.addEventListener('mouseleave', () => { pointer.x = null; });
    playCanvas.addEventListener('click', e => { const { x, y } = pos(e); blossom(x, y); });
    playCanvas.addEventListener('touchstart', e => {
        const { x, y } = pos(e);
        pointer.x = x; pointer.y = y;
        blossom(x, y);
    }, { passive: true });

    playCanvas.addEventListener('touchmove', e => {
        e.preventDefault();
        const { x, y } = pos(e);
        pointer.x = x; pointer.y = y;
        streams.push(makeStream(x, y, false));
        markPlayed();
    }, { passive: false });
    playCanvas.addEventListener('touchend', () => { pointer.x = null; });

    document.getElementById('playClear').addEventListener('click', () => {
        blossoms.length = 0;
        pctx.fillStyle = '#0d0d0d';
        pctx.fillRect(0, 0, playCanvas.width, playCanvas.height);
        seedAmbient();
    });

    resizePlay();
    window.addEventListener('resize', resizePlay);

    (function drawGarden() {
        tt += 0.008;
        hueBase = (hueBase + 0.22) % 360; // el color del jardín gira lentamente

        pctx.globalCompositeOperation = 'source-over';
        pctx.fillStyle = 'rgba(13, 13, 13, 0.03)';
        pctx.fillRect(0, 0, playCanvas.width, playCanvas.height);

        if (pointer.x !== null) {
            pointer.still++;
            if (pointer.still === 55) blossom(pointer.x, pointer.y);
        }

        pctx.globalCompositeOperation = 'lighter';
        pctx.lineCap = 'round';

        for (let i = streams.length - 1; i >= 0; i--) {
            const s = streams[i];
            const a = flowAngle(s.x, s.y, tt);
            s.px = s.x; s.py = s.y;
            s.x += Math.cos(a) * s.speed;
            s.y += Math.sin(a) * s.speed;

            if (pointer.x !== null) {
                s.x += (pointer.x - s.x) * 0.0016;
                s.y += (pointer.y - s.y) * 0.0016;
            }

            s.life -= s.decay;
            if (s.life <= 0 || s.x < -30 || s.x > playCanvas.width + 30 || s.y < -30 || s.y > playCanvas.height + 30) {
                streams.splice(i, 1);
                continue;
            }

            // Doble trazo: halo ancho + núcleo brillante (efecto neón)
            const al = s.life;
            pctx.strokeStyle = `hsla(${s.hue}, ${s.sat}%, 55%, ${0.22 * al})`;
            pctx.lineWidth = s.w * 4.2 * al + 1;
            pctx.beginPath();
            pctx.moveTo(s.px, s.py);
            pctx.lineTo(s.x, s.y);
            pctx.stroke();

            pctx.strokeStyle = `hsla(${s.hue}, ${s.sat}%, 72%, ${0.85 * al})`;
            pctx.lineWidth = s.w * 1.4 * al + 0.4;
            pctx.beginPath();
            pctx.moveTo(s.px, s.py);
            pctx.lineTo(s.x, s.y);
            pctx.stroke();
        }

        if (streams.length < 44 && Math.random() < 0.35) {
            streams.push(makeStream(Math.random() * playCanvas.width, Math.random() * playCanvas.height, false));
        }
        while (streams.length > 260) streams.shift();

        for (let i = blossoms.length - 1; i >= 0; i--) {
            const b = blossoms[i];
            b.r += (b.max - b.r) * 0.06;
            b.life -= 0.011;
            if (b.life <= 0) { blossoms.splice(i, 1); continue; }
            const petals = 14;
            for (let k = 0; k < petals; k++) {
                const ang = (k / petals) * Math.PI * 2 + b.r * 0.012;
                const px = b.x + Math.cos(ang) * b.r;
                const py = b.y + Math.sin(ang) * b.r;
                const ph = b.hue + k * 4;
                pctx.beginPath();
                pctx.arc(px, py, 3.2 * b.life + 0.5, 0, Math.PI * 2);
                pctx.fillStyle = `hsla(${ph}, 92%, 66%, ${0.7 * b.life})`;
                pctx.fill();
                pctx.beginPath();
                pctx.arc(px, py, 7 * b.life + 1, 0, Math.PI * 2);
                pctx.fillStyle = `hsla(${ph}, 92%, 60%, ${0.16 * b.life})`;
                pctx.fill();
            }
            pctx.beginPath();
            pctx.arc(b.x, b.y, b.r * 0.55, 0, Math.PI * 2);
            pctx.strokeStyle = `hsla(${b.hue + 20}, 90%, 65%, ${0.2 * b.life})`;
            pctx.lineWidth = 1.2;
            pctx.stroke();
        }

        pctx.globalCompositeOperation = 'source-over';
        requestAnimationFrame(drawGarden);
    })();
}

// ===== Juego del footer: letras que huyen del cursor =====
if (finePointer && !reduceMotion) {
    const giant = document.querySelector('.footer-giant');
    if (giant) {
        const text = giant.textContent;
        giant.textContent = '';
        text.split('').forEach(ch => {
            const span = document.createElement('span');
            span.className = 'giant-letter';
            span.textContent = ch === ' ' ? '\u00A0' : ch;
            giant.appendChild(span);
        });
        const letters = giant.querySelectorAll('.giant-letter');

        giant.addEventListener('mousemove', e => {
            letters.forEach(letter => {
                const rect = letter.getBoundingClientRect();
                const lx = rect.left + rect.width / 2;
                const ly = rect.top + rect.height / 2;
                const dx = lx - e.clientX;
                const dy = ly - e.clientY;
                const dist = Math.hypot(dx, dy);
                if (dist < 180 && dist > 0.01) {
                    const force = (180 - dist) / 180;
                    letter.style.transform = `translate(${(dx / dist) * force * 46}px, ${(dy / dist) * force * 46}px) rotate(${(dx / dist) * force * 9}deg)`;
                    letter.style.color = 'rgba(255, 0, 49, 0.95)';
                    letter.style.webkitTextStroke = '0px';
                } else {
                    letter.style.transform = '';
                    letter.style.color = '';
                    letter.style.webkitTextStroke = '';
                }
            });
        });

        giant.addEventListener('mouseleave', () => {
            letters.forEach(letter => {
                letter.style.transform = '';
                letter.style.color = '';
                letter.style.webkitTextStroke = '';
            });
        });
    }
}

// ===== Linterna: revela el color en los paneles de proyecto =====
if (finePointer && !reduceMotion) {
    document.querySelectorAll('.panel').forEach(panel => {
        const media = panel.querySelector('.panel-media');
        if (!media) return;
        const lens = document.createElement('div');
        lens.className = 'panel-lens';
        const cs = getComputedStyle(media);
        lens.style.backgroundImage = cs.backgroundImage;
        lens.style.backgroundSize = cs.backgroundSize;
        lens.style.backgroundPosition = cs.backgroundPosition;
        media.after(lens);

        panel.addEventListener('mousemove', e => {
            const rect = panel.getBoundingClientRect();
            lens.style.clipPath = `circle(150px at ${e.clientX - rect.left}px ${e.clientY - rect.top}px)`;
        });
        panel.addEventListener('mouseleave', () => {
            lens.style.clipPath = 'circle(0px at 50% 50%)';
        });
    });
}

// ===== Números de servicio se descifran al pasar el cursor =====
if (!reduceMotion) {
    document.querySelectorAll('.exp-num, .terr-num, .obra-num').forEach(el => {
        el.dataset.text = el.textContent;
        el.parentElement.addEventListener('mouseenter', () => scramble(el));
    });
}

// ===== Palabras del texto de colaboración reaccionan al cursor =====
const colab = document.getElementById('colabTexto');
if (colab) {
    colab.innerHTML = colab.textContent.split(' ').map(w => `<span class="palabra">${w}</span>`).join(' ');
}

// ===== Tags de fundadores: arrástralas y regresan =====
if (finePointer) {
    document.querySelectorAll('.fundador-tags li').forEach(tag => {
        let sx = 0, sy = 0, dragging = false;
        tag.addEventListener('pointerdown', e => {
            dragging = true;
            sx = e.clientX; sy = e.clientY;
            tag.classList.add('dragging');
            tag.setPointerCapture(e.pointerId);
        });
        tag.addEventListener('pointermove', e => {
            if (!dragging) return;
            tag.style.transform = `translate(${e.clientX - sx}px, ${e.clientY - sy}px) rotate(${(e.clientX - sx) * 0.06}deg)`;
        });
        function drop() {
            if (!dragging) return;
            dragging = false;
            tag.classList.remove('dragging');
            tag.style.transform = '';
        }
        tag.addEventListener('pointerup', drop);
        tag.addEventListener('pointercancel', drop);
    });
}

// ===== Casos de estudio (modal) =====
const CASES = [
    { img: 'https://drive.google.com/thumbnail?id=1PuqDrJ-brJzuAMRraxIRa25a0S8JLocO&sz=w1600', video: '1egLOpbLTUqWmM3r0wORu764sRLgxSxMV' },
    { img: 'assets/metro.jpg', video: '1wtI5ySIGjAqFdkV1LRULcKTN1oY6Dlrc' },
    { img: 'assets/eternidad.jpg', video: null },
    { img: 'assets/santaursula.jpg', video: null },
    { img: 'https://d8j0ntlcm91z4.cloudfront.net/user_2waRpaIT1cb9YFARiS69iyJ9eGH/hf_20260701_224508_984fa0ca-79fa-42e0-bbc1-81e6c04218e1.png', video: '1rAEiKP5NdPb3zq8iVY1zOqLGcnowdw4g' }
];

const caseModal = document.getElementById('caseModal');
if (caseModal) {
    const caseMedia = document.getElementById('caseMedia');
    const caseTitle = document.getElementById('caseTitle');
    const caseMeta = document.getElementById('caseMeta');
    const caseText = document.getElementById('caseText');
    const caseStats = document.getElementById('caseStats');
    const caseVideoBtn = document.getElementById('caseVideoBtn');
    let currentVideo = null;

    document.querySelectorAll('.ver-caso').forEach(btn => {
        btn.addEventListener('click', () => {
            const i = parseInt(btn.dataset.case, 10);
            const card = btn.closest('.panel-card');
            const data = CASES[i] || {};
            caseMeta.textContent = Array.from(card.querySelectorAll('.panel-meta span')).map(s => s.textContent.trim()).join(' · ');
            caseTitle.textContent = card.querySelector('h3').textContent;
            caseText.textContent = card.querySelector('p').textContent;
            caseStats.innerHTML = card.querySelector('.panel-stats').innerHTML;
            caseMedia.innerHTML = '';
            caseMedia.style.backgroundImage = `url('${data.img || ''}')`;
            currentVideo = data.video;
            caseVideoBtn.hidden = !currentVideo;
            caseModal.hidden = false;
            document.body.style.overflow = 'hidden';
        });
    });

    caseVideoBtn.addEventListener('click', () => {
        caseMedia.style.backgroundImage = 'none';
        caseMedia.innerHTML = `<iframe src="https://drive.google.com/file/d/${currentVideo}/preview" allow="autoplay; fullscreen" allowfullscreen title="Video del caso"></iframe>`;
        caseVideoBtn.hidden = true;
    });

    function closeCase() {
        caseModal.hidden = true;
        caseMedia.innerHTML = '';
        document.body.style.overflow = '';
    }

    caseModal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeCase));
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !caseModal.hidden) closeCase();
    });
}

// ===== Stay Curious: constelación al hacer clic en el punto =====
const curiousCanvas = document.getElementById('curiousCanvas');
const curiousDot = document.getElementById('curiousDot');

if (curiousCanvas && curiousDot) {
    const cctx = curiousCanvas.getContext('2d');
    const dots = [];

    function resizeCurious() {
        curiousCanvas.width = curiousCanvas.clientWidth;
        curiousCanvas.height = curiousCanvas.clientHeight;
    }
    resizeCurious();
    window.addEventListener('resize', resizeCurious);

    curiousDot.addEventListener('click', () => {
        const rect = curiousCanvas.getBoundingClientRect();
        const dr = curiousDot.getBoundingClientRect();
        const x = dr.left + dr.width / 2 - rect.left;
        const y = dr.top + dr.height / 2 - rect.top;
        for (let i = 0; i < 26; i++) {
            const a = Math.random() * Math.PI * 2;
            const sp = Math.random() * 3.4 + 0.8;
            dots.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, r: Math.random() * 3.4 + 1.6 });
        }
    });

    (function drawCurious() {
        cctx.clearRect(0, 0, curiousCanvas.width, curiousCanvas.height);
        cctx.strokeStyle = 'rgba(255, 0, 49, 0.28)';
        cctx.lineWidth = 1.4;
        for (let i = 0; i < dots.length; i++) {
            for (let j = i + 1; j < dots.length; j++) {
                const a = dots[i], b = dots[j];
                const d = Math.hypot(a.x - b.x, a.y - b.y);
                if (d < 130) {
                    cctx.globalAlpha = Math.min(a.life, b.life) * (1 - d / 130);
                    cctx.beginPath();
                    cctx.moveTo(a.x, a.y);
                    cctx.lineTo(b.x, b.y);
                    cctx.stroke();
                }
            }
        }
        cctx.globalAlpha = 1;
        for (let i = dots.length - 1; i >= 0; i--) {
            const d = dots[i];
            d.x += d.vx; d.y += d.vy;
            d.vx *= 0.992; d.vy *= 0.992;
            d.life -= 0.006;
            if (d.life <= 0) { dots.splice(i, 1); continue; }
            cctx.beginPath();
            cctx.arc(d.x, d.y, d.r * d.life, 0, Math.PI * 2);
            cctx.fillStyle = `rgba(255, 0, 49, ${0.9 * d.life})`;
            cctx.fill();
        }
        requestAnimationFrame(drawCurious);
    })();
}

// ===== Punto escondido: premio a la curiosidad =====
const hiddenDot = document.getElementById('hiddenDot');
if (hiddenDot) {
    hiddenDot.addEventListener('click', () => {
        const flash = document.createElement('div');
        flash.className = 'egg-flash';
        flash.innerHTML = MSG.egg;
        document.body.appendChild(flash);
        flash.addEventListener('click', () => flash.remove());
        setTimeout(() => flash.remove(), 6000);
    });
}

// ===== La pestaña también es curiosa =====
document.addEventListener('visibilitychange', () => {
    document.title = document.hidden ? MSG.tabAway : MSG.tabBack;
});

// ===== Estadísticas jugables: clic para recontarlas =====
document.querySelectorAll('.stat').forEach(stat => {
    const num = stat.querySelector('[data-count]');
    if (!num) return;
    stat.addEventListener('click', () => {
        stat.classList.remove('stat-pop');
        void stat.offsetWidth;
        stat.classList.add('stat-pop');
        num.textContent = '0';
        animateCount(num);
    });
});

// ===== Videoteca desplegable =====
const videosToggle = document.getElementById('videosToggle');
const videosGallery = document.getElementById('videosGallery');
if (videosToggle && videosGallery) {
    videosToggle.addEventListener('click', () => {
        const open = videosGallery.hidden;
        videosGallery.hidden = !open;
        videosToggle.textContent = open ? videosToggle.dataset.hide : videosToggle.dataset.show;
        if (open) videosGallery.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}
