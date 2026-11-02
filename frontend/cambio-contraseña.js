    //Script para limpiar los campos al cambiar de pestaña o minimizar la ventana
    document.addEventListener("visibilitychange", function() {
        if (document.visibilityState === "hidden") {
            const sensitiveFields = [
                'nombre', 
                'edad', 
                'correo', 
                'telefono', 
                'contrasena',
                'correo-login'
            ];

            sensitiveFields.forEach(id => {
                const inputElement = document.getElementById(id);
                if (inputElement) {
                    inputElement.value = "";
                }
            });

            if (passwordInput) {
                passwordInput.setAttribute('type', 'password');
            }

            if (eyeIcon) {
                eyeIcon.innerHTML = `
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                `;
            }
        }
    });