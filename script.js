document.addEventListener('DOMContentLoaded', function () {

    // 1. Scroll suave para los enlaces del menú
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Previene el comportamiento por defecto del ancla
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Validación del formulario de contacto
    const form = document.getElementById('contactForm');
    const emailInput = document.getElementById('email');
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Previene el envío por defecto
        event.stopPropagation();

        // Validar el formato del email con una expresión regular simple
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            // Agrega feedback visual si el email es inválido
            emailInput.classList.add('is-invalid');
            return; // Detiene la ejecución si el email no es válido
        } else {
            emailInput.classList.remove('is-invalid');
        }

        // Si el formulario es válido según la validación de Bootstrap
        if (form.checkValidity()) {
            const name = document.getElementById('name').value;
            const email = emailInput.value;
            const message = document.getElementById('message').value;

            // Crear el enlace mailto
            const subject = encodeURIComponent("Consulta desde la web del Hospital");
            const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`);
            const mailtoLink = `mailto:contacto@hospitalsalud.com?subject=${subject}&body=${body}`;

            // Simular el envío: abrir el cliente de correo y mostrar el modal
            // Usamos un pequeño delay para dar tiempo a que se inicie el cliente de correo
            setTimeout(() => {
                confirmationModal.show();
            }, 500);
            
            window.location.href = mailtoLink;

            // Limpiar el formulario después de un tiempo
            setTimeout(() => {
                form.reset();
                form.classList.remove('was-validated');
            }, 1000);

        } else {
            // Si hay otros campos inválidos, muestra la validación de Bootstrap
            form.classList.add('was-validated');
        }
    });
    
    // Limpiar la validación de email cuando el usuario corrige
    emailInput.addEventListener('input', function() {
        if (emailInput.classList.contains('is-invalid')) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(emailInput.value)) {
                emailInput.classList.remove('is-invalid');
            }
        }
    });

});