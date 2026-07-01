// ===== Menú móvil =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Cerrar el menú al hacer clic en un enlace
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// ===== Sombra del navbar al hacer scroll =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ===== Animación de aparición al hacer scroll =====
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== Formulario de contacto =====
// Nota: el formulario valida y confirma en pantalla. Para recibir los
// mensajes por correo, conecta un servicio como Formspree o un backend
// propio en este handler.
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', event => {
    event.preventDefault();

    const nombre = contactForm.nombre.value.trim();
    const email = contactForm.email.value.trim();
    const mensaje = contactForm.mensaje.value.trim();

    if (!nombre || !email || !mensaje) {
        formStatus.textContent = 'Por favor completa todos los campos.';
        formStatus.className = 'form-status error';
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formStatus.textContent = 'Introduce un correo electrónico válido.';
        formStatus.className = 'form-status error';
        return;
    }

    formStatus.textContent = `¡Gracias, ${nombre}! Hemos recibido tu mensaje y te contactaremos pronto.`;
    formStatus.className = 'form-status ok';
    contactForm.reset();
});
