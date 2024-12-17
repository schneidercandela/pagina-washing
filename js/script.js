// Script personalizado para Washing

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para enlaces internos
    const navLinks = document.querySelectorAll('a.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });
    });

    // Validación de formulario simple
    const contactForm = document.querySelector('#contacto form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const mensaje = this.querySelector('textarea').value;
            
            if (nombre && email && mensaje) {
                alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
                this.reset();
            } else {
                alert('Por favor, completa todos los campos.');
            }
        });
    }
});