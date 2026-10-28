    <script>
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
</script>