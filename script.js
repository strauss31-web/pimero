// ============================================
// LÚDICA LAB — Interactividad
// ============================================

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

// ===== Cursor personalizado =====
if (finePointer && !reduceMotion) {
    const cursor = document.getElementById('cursor');

    window.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .exp-item, .obra').forEach(el => {
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
        el.textContent = target;
        return;
    }
    const duration = 1500;
    const start = performance.now();
    (function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);
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
        formStatus.textContent = 'COMPLETA TODOS LOS CAMPOS.';
        formStatus.className = 'form-status error';
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formStatus.textContent = 'REVISA TU CORREO ELECTRÓNICO.';
        formStatus.className = 'form-status error';
        return;
    }

    formStatus.textContent = `RECIBIDO, ${nombre.toUpperCase()}. TE CONTACTAREMOS PRONTO.`;
    formStatus.className = 'form-status ok';
    contactForm.reset();
});
