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

// Efecto de scroll para el navbar - Moderno
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
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

// ===== FIRMA DIGITAL Y APROBACIÓN =====

// Almacenar datos de firma y comentarios
const presentations = {
    1: { comments: [], approved: false, signature: null },
    2: { comments: [], approved: false, signature: null }
};

// Inicializar canvas de firma
function initSignaturePads() {
    [1, 2].forEach(id => {
        const canvas = document.getElementById(`signaturePad-${id}`);
        if (canvas) {
            resizeCanvas(canvas);
            setupSignaturePad(canvas, id);
        }
    });
}

function resizeCanvas(canvas) {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = 200;
}

function setupSignaturePad(canvas, presentationId) {
    let isDrawing = false;
    const context = canvas.getContext('2d');
    context.strokeStyle = '#667eea';
    context.lineWidth = 2;

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        context.beginPath();
        context.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        context.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        context.stroke();
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    canvas.addEventListener('mouseout', () => {
        isDrawing = false;
    });
}

function clearSignature(presentationId) {
    const canvas = document.getElementById(`signaturePad-${presentationId}`);
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    presentations[presentationId].signature = null;
}

function addComment(presentationId) {
    const textarea = document.querySelector(`.comment-input[data-presentation="${presentationId}"]`);
    const commentText = textarea.value.trim();

    if (!commentText) {
        alert('Por favor escribe un comentario');
        return;
    }

    const comment = {
        text: commentText,
        author: 'Cliente',
        date: new Date().toLocaleString('es-ES')
    };

    presentations[presentationId].comments.push(comment);
    textarea.value = '';
    renderComments(presentationId);
}

function renderComments(presentationId) {
    const commentsList = document.getElementById(`comments-${presentationId}`);
    commentsList.innerHTML = '';

    presentations[presentationId].comments.forEach((comment, index) => {
        const commentEl = document.createElement('div');
        commentEl.className = 'comment';
        commentEl.innerHTML = `
            <div>
                <span class="comment-author">${comment.author}</span>
                <span class="comment-date">${comment.date}</span>
            </div>
            <div class="comment-text">${comment.text}</div>
        `;
        commentsList.appendChild(commentEl);
    });
}

function approvePresentation(presentationId) {
    const canvas = document.getElementById(`signaturePad-${presentationId}`);
    const context = canvas.getContext('2d');

    // Verificar si hay firma
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let hasSignature = false;

    for (let i = 3; i < data.length; i += 4) {
        if (data[i] > 128) {
            hasSignature = true;
            break;
        }
    }

    if (!hasSignature) {
        alert('Por favor dibuja tu firma antes de aprobar');
        return;
    }

    // Guardar firma
    presentations[presentationId].signature = canvas.toDataURL();
    presentations[presentationId].approved = true;

    // Mostrar estado de aprobación
    const statusEl = document.getElementById(`approval-status-${presentationId}`);
    statusEl.classList.add('approved');
    statusEl.innerHTML = `
        <strong>✓ Aprobado el ${new Date().toLocaleString('es-ES')}</strong><br>
        Firma guardada correctamente
    `;

    // Deshabilitar interacción
    const canvas_elem = document.getElementById(`signaturePad-${presentationId}`);
    canvas_elem.style.pointerEvents = 'none';
    canvas_elem.style.opacity = '0.6';

    alert('¡Presentación aprobada y firmada correctamente!');
    console.log('Datos de aprobación:', presentations[presentationId]);
}

// Inicializar cuando cargue el DOM
document.addEventListener('DOMContentLoaded', function() {
    initSignaturePads();
});
