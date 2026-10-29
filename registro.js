document.addEventListener("DOMContentLoaded", function() {
    
    //Visibilad de la contraseña
    const togglePasswordBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('contrasena');
    const eyeIcon = document.getElementById('eye-icon');

    if (togglePasswordBtn && passwordInput && eyeIcon) {
        togglePasswordBtn.addEventListener('click', function() {
            const currentType = passwordInput.getAttribute('type');
            const newType = currentType === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', newType);
            
            if (newType === 'text') {
                eyeIcon.innerHTML = `
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                `;
            } else {
                eyeIcon.innerHTML = `
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                `;
            }
        });
    }

    //Validacion de parametros para la contrasena
    const reqlongitud = document.getElementById('req-longitud');
    const reqmayuscula = document.getElementById('req-mayuscula');
    const reqminuscula = document.getElementById('req-minuscula');
    const reqnumero = document.getElementById('req-numero');
    const reqespecial = document.getElementById('req-especial');

    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = passwordInput.value;

            // Validación de Longitud (Mínimo 8 caracteres)
            if (reqlongitud) {
                if (password.length >= 8) {
                    reqlongitud.classList.remove('invalido');
                    reqlongitud.classList.add('valido');
                } else {
                    reqlongitud.classList.remove('valido');
                    reqlongitud.classList.add('invalido');
                }
            }

            // Validación de Letra Mayúscula
            if (reqmayuscula) {
                if (/[A-Z]/.test(password)) {
                    reqmayuscula.classList.remove('invalido');
                    reqmayuscula.classList.add('valido');
                } else {
                    reqmayuscula.classList.remove('valido');
                    reqmayuscula.classList.add('invalido');
                }
            }

            // Validación de Letra Minúscula
            if (reqminuscula) {
                if (/[a-z]/.test(password)) {
                    reqminuscula.classList.remove('invalido');
                    reqminuscula.classList.add('valido');
                } else {
                    reqminuscula.classList.remove('valido');
                    reqminuscula.classList.add('invalido');
                }
            }

            // Validación de Número
            if (reqnumero) {
                if (/[0-9]/.test(password)) {
                    reqnumero.classList.remove('invalido');
                    reqnumero.classList.add('valido');
                } else {
                    reqnumero.classList.remove('valido');
                    reqnumero.classList.add('invalido');
                }
            }

            // Validación de Carácter Especial
            if (reqespecial) {
                if (/[\W_]/.test(password)) {
                    reqespecial.classList.remove('invalido');
                    reqespecial.classList.add('valido');
                } else {
                    reqespecial.classList.remove('valido');
                    reqespecial.classList.add('invalido');
                }
            }
        });
    }

    //Script para limpiar los campos al cambiar de pestaña o minimizar la ventana
    document.addEventListener("visibilitychange", function() {
        if (document.visibilityState === "hidden") {
            // IDs exactos de los inputs sensibles
            const sensitiveFields = [
                'nombre', 
                'edad', 
                'correo-login', 
                'telefono', 
                'contrasena'
            ];

            sensitiveFields.forEach(id => {
                const inputElement = document.getElementById(id);
                if (inputElement) {
                    inputElement.value = "";
                }
            });

            // Restablecer checkboxes de confirmación
            const checkPrivacidad = document.getElementById('privacidad');
            const checkDatos = document.getElementById('confirmar-datos');
            if (checkPrivacidad) checkPrivacidad.checked = false;
            if (checkDatos) checkDatos.checked = false;

            // Restablecer la contraseña a tipo password y ocultar el icono del ojo
            if (passwordInput) {
                passwordInput.setAttribute('type', 'password');
            }

            if (eyeIcon) {
                eyeIcon.innerHTML = `
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                `;
            }

            // RESTABLECER LOS REQUISITOS A ROJO (INJVALIDO)
            const requisitosItems = [
                document.getElementById('req-longitud'),
                document.getElementById('req-mayuscula'),
                document.getElementById('req-minuscula'),
                document.getElementById('req-numero'),
                document.getElementById('req-especial')
            ];

            requisitosItems.forEach(item => {
                if (item) {
                    item.classList.remove('valido');
                    item.classList.add('invalido');
                }
            });
        }
    });
    // RESTRICCIÓN: SOLO NÚMEROS EN TELÉFONO
    const telefonoInput = document.getElementById('telefono');

    if (telefonoInput) {
        telefonoInput.addEventListener('input', function() {
            // Reemplaza cualquier caracter que NO sea un número del 0 al 9 por una cadena vacía
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
});