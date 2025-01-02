// Script personalizado para Washing
document.addEventListener('DOMContentLoaded', function() {
    // Animación suave solo para enlaces internos (los que comienzan con #)
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animaciones al hacer scroll
    function revelarElementos() {
        const elementos = document.querySelectorAll('.card, .servicio-detalle, .info-contacto, .social-icons a');
        
        elementos.forEach(elemento => {
            const elementoTop = elemento.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementoTop < windowHeight - 50) {
                elemento.classList.add('visible');
            }
        });
    }

    // Activar navbar item según la sección visible
    function actualizarNavActivo() {
        const secciones = document.querySelectorAll('section[id]');
        
        secciones.forEach(seccion => {
            const seccionTop = seccion.offsetTop - 100;
            const seccionHeight = seccion.offsetHeight;
            const scroll = window.scrollY;

            if (scroll >= seccionTop && scroll < seccionTop + seccionHeight) {
                const navItem = document.querySelector(`a[href="#${seccion.id}"]`);
                if (navItem) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    navItem.classList.add('active');
                }
            }
        });
    }

    // Validación del formulario de contacto
    const contactForm = document.querySelector('#contacto form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = this.querySelector('input[type="text"]');
            const email = this.querySelector('input[type="email"]');
            const mensaje = this.querySelector('textarea');
            let isValid = true;

            // Validación de campos
            [nombre, email, mensaje].forEach(campo => {
                if (!campo.value.trim()) {
                    isValid = false;
                    marcarError(campo, 'Este campo es requerido');
                } else {
                    quitarError(campo);
                }
            });

            // Validación específica para email
            if (email.value && !validarEmail(email.value)) {
                isValid = false;
                marcarError(email, 'Por favor ingrese un email válido');
            }

            if (isValid) {
                // Aquí podrías agregar el código para enviar el formulario
                mostrarMensajeExito();
                this.reset();
            }
        });

        // Remover mensajes de error mientras el usuario escribe
        contactForm.querySelectorAll('input, textarea').forEach(campo => {
            campo.addEventListener('input', function() {
                quitarError(this);
            });
        });
    }

    // Funciones auxiliares
    function validarEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function marcarError(campo, mensaje) {
        campo.classList.add('is-invalid');
        const errorDiv = campo.parentElement.querySelector('.invalid-feedback') || 
                        document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = mensaje;
        if (!campo.parentElement.querySelector('.invalid-feedback')) {
            campo.parentElement.appendChild(errorDiv);
        }
    }

    function quitarError(campo) {
        campo.classList.remove('is-invalid');
        const errorDiv = campo.parentElement.querySelector('.invalid-feedback');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    function mostrarMensajeExito() {
        const alertaExito = document.createElement('div');
        alertaExito.className = 'alert alert-success mt-3 alert-dismissible fade show';
        alertaExito.innerHTML = `
            ¡Gracias por tu mensaje! Nos pondremos en contacto pronto.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        contactForm.insertAdjacentElement('afterend', alertaExito);

        // Remover la alerta después de 5 segundos
        setTimeout(() => {
            alertaExito.remove();
        }, 5000);
    }

    // Event Listeners
    window.addEventListener('scroll', function() {
        revelarElementos();
        actualizarNavActivo();
    });

    // Llamada inicial para revelar elementos visibles
    revelarElementos();
});