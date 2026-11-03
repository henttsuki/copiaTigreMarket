
import { auth, db } from "../backend/firebase.js";

import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";

console.log("ARCHIVO REGISTRO.JS CARGADO CORRECTAMENTE");
document.addEventListener("DOMContentLoaded", function() {
    console.log("REGISTRO.JS SE ESTÁ EJECUTANDO");
    
    // Visibilidad de la contraseña
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

    // Validación de parámetros para la contraseña
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

    // Script para limpiar los campos al cambiar de pestaña o minimizar la ventana
    document.addEventListener("visibilitychange", function() {
        if (document.visibilityState === "hidden") {

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

            // Restablecer la contraseña a tipo password
            if (passwordInput) {
                passwordInput.setAttribute('type', 'password');
            }

            // Ocultar el icono del ojo
            if (eyeIcon) {
                eyeIcon.innerHTML = `
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                `;
            }

            // Restablecer los requisitos a rojo (inválido)
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

    // Restricción: solo números en teléfono
    const telefonoInput = document.getElementById('telefono');

    if (telefonoInput) {
        telefonoInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    // REGISTRO DE USUARIOS CON FIREBASE
    

    const formularioRegistro = document.getElementById('registro');

    if (formularioRegistro) {

        formularioRegistro.addEventListener('submit', async function(e) {
            console.log("SE PRESIONÓ EL BOTÓN DE REGISTRO");

            e.preventDefault();

            // Obtener los datos del formulario
            const nombre = document.getElementById('nombre').value.trim();

            const usuarioCorreo = document.getElementById('correo-login').value.trim();

            const correo = usuarioCorreo + "@tecnaucalpan.mx";

            const edad = Number(document.getElementById('edad').value);

            const telefono = document.getElementById('telefono').value.trim();

            const contrasena = passwordInput.value;

            // Validar los requisitos de la contraseña
            const contraseñaValida =
                contrasena.length >= 8 &&
                /[A-Z]/.test(contrasena) &&
                /[a-z]/.test(contrasena) &&
                /[0-9]/.test(contrasena) &&
                /[\W_]/.test(contrasena);

            if (!contraseñaValida) {
                alert("La contraseña no cumple con todos los requisitos.");
                return;
            }

            // Validar los campos obligatorios
            if (!nombre || !usuarioCorreo || !edad || !telefono || !contrasena) {
                alert("Por favor, completa todos los campos.");
                return;
            }

            // Validar las casillas de confirmación
            const checkPrivacidad = document.getElementById('privacidad');
            const checkDatos = document.getElementById('confirmar-datos');

            if (!checkPrivacidad.checked || !checkDatos.checked) {
                alert("Debes aceptar las políticas de privacidad y confirmar tus datos.");
                return;
            }

            try {

                // Crear la cuenta en Firebase Authentication
                const credencial = await createUserWithEmailAndPassword(
                    auth,
                    correo,
                    contrasena
                );

                // Obtener el usuario y su UID
                const usuario = credencial.user;

                // Guardar los datos en Cloud Firestore
                await setDoc(doc(db, "usuarios", usuario.uid), {

                    nombre: nombre,

                    correo: correo,

                    edad: edad,

                    telefono: telefono,

                    fechaRegistro: serverTimestamp(),

                    rol: "usuario"

                });

                // Mostrar confirmación
                alert("¡Registro exitoso! Ya puedes iniciar sesión en Tiger Market.");

                // Limpiar el formulario
                formularioRegistro.reset();

                // Redirigir al inicio de sesión
                window.location.href = "index.html";

            } catch (error) {
                console.error("Error al registrar usuario:", error);

                if (error.code === "auth/email-already-in-use") {
                    alert("Este correo electrónico ya está registrado.");

                } else if (error.code === "auth/invalid-email") {
                    alert("El correo electrónico no es válido.");

                } else if (error.code === "auth/weak-password") {
                    alert("La contraseña no cumple con los requisitos de Firebase.");

                } else if (error.code === "permission-denied") {
                    alert("Firebase rechazó el registro. Revisa las reglas de Firestore.");

                } else {
                    alert("Ocurrió un error durante el registro. Revisa la consola.");

                }
            }
        });
    }

});
