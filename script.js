// Smooth scrolling para los enlaces del navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Botón de Comenzar
document.querySelector('.btn-primary').addEventListener('click', function () {
    const contactoSection = document.getElementById('contacto');
    contactoSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Manejo del formulario de contacto
document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtener valores del formulario
    const nombre = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const mensaje = this.querySelector('textarea').value;

    // Mostrar confirmación
    alert(`Gracias ${nombre}, tu mensaje ha sido enviado. Te contactaremos pronto en ${email}`);

    // Limpiar formulario
    this.reset();
});

// Efecto de scroll para el navbar
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Animación de aparición al scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.servicio-card').forEach(card => {
    observer.observe(card);
});
