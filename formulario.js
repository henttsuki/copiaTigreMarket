    document.addEventListener("DOMContentLoaded", function() {
        
            const formularioLogin = document.getElementById("login");
        
            if (formularioLogin) {
                formularioLogin.addEventListener("submit", function(evento) {
                    evento.preventDefault();
        
                    window.location.href = "./index.html";
                });
            }
        
        });
    const formularioLogin = document.getElementById('login');

    formularioLogin.addEventListener('submit', function(event) {
        event.preventDefault();

        const inputusuario = document.getElementById('correo-login').value.trim();

        const dominioInstitucional = "@tecnaucalpan.mx";

        if (inputusuario === "") {
            alert("Por favor, ingresa tu usuario.");
            return;
        }

        const correoCompleto = inputusuario + dominioInstitucional;
        console.log("Correo listo para enviar al servidor:", correoCompleto);
        alert("¡Acceso correcto! Correo completo: " + correoCompleto);
        const inputUsuario = document.getElementById('correo-login');

    inputUsuario.addEventListener('input', function(event) {
        let valorLimpio = this.value.toLowerCase().replace(/[^a-z0-9_]/g, '');
    
        this.value = valorLimpio;
});
    });
    //Utilzamos el evento visibilitychange para detectar cuando el usuario cambia de pestaña o minimiza la ventana
    document.addEventListener("visibilitychange", function() {
    // Se ejecuta cuando el usuario cambia de pestaña o de aplicación
    if (document.visibilityState === "hidden") {
        const passwordInput = document.getElementById('contrasena');
        const eyeIcon = document.getElementById('eye-icon');

        if (passwordInput) {
            // 1. Limpiamos por completo el valor del input de la contraseña
            passwordInput.value = "";
            
            // 2. Por seguridad, forzamos que el input vuelva a ser de tipo 'password'
            passwordInput.setAttribute('type', 'password');
        }

        // 3. Opcional: Restablecemos el icono del SVG al estado de "ojo cerrado/normal"
        if (eyeIcon) {
            eyeIcon.innerHTML = `
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            `;
        }
    }
});