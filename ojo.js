<script>
    document.addEventListener("DOMContentLoaded", function() ){
        const togglePasswordBtn = document.getElementById('toggle-password');
        const passwordInput = document.getElementById('contrasena');
        const eyeIcon = document.getElementById('eye-icon');

        // Verificación de seguridad para evitar errores en consola
        if (!togglePasswordBtn || !passwordInput || !eyeIcon) {
            console.error("Error: No se encontró alguno de los elementos del botón de contraseña en el DOM.");
            return;
        }

        togglePasswordBtn.addEventListener('click', function() {
            // Alternar el tipo de input entre password y text
            const currentType = passwordInput.getAttribute('type');
            const newType = currentType === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', newType);
            
            // Cambiar el dibujo del icono SVG según el estado
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
});
</script>