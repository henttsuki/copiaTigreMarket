
const formulario = document.getElementById("formulario-venta");
const listaPublicaciones = document.getElementById("lista-publicaciones");

// Recuperar las publicaciones guardadas en este navegador
let publicaciones = JSON.parse(
    localStorage.getItem("misPublicaciones") || "[]"
);

function mostrarPublicaciones() {
    listaPublicaciones.innerHTML = "";

    if (publicaciones.length === 0) {
        listaPublicaciones.innerHTML =
            '<p class="vacio">Todavía no has publicado productos.</p>';
        return;
    }

    publicaciones.forEach(function(producto, indice) {
        const tarjeta = document.createElement("article");
        tarjeta.className = "producto-publicado";

        const imagen = document.createElement("img");
        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;

        const nombre = document.createElement("h3");
        nombre.textContent = producto.nombre;

        const descripcion = document.createElement("p");
        descripcion.textContent = producto.descripcion;

        const precio = document.createElement("p");
        precio.textContent = "Precio: $" +
            Number(producto.precio).toFixed(2) + " MXN";

        const categoria = document.createElement("p");
        categoria.textContent = "Categoría: " + producto.categoria;

        const estado = document.createElement("p");
        estado.textContent = "Estado: " + producto.estado;

        const botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.textContent = "Eliminar publicación";

        botonEliminar.addEventListener("click", function() {
            publicaciones.splice(indice, 1);

            localStorage.setItem(
                "misPublicaciones",
                JSON.stringify(publicaciones)
            );

            mostrarPublicaciones();
        });

        tarjeta.append(
            imagen,
            nombre,
            descripcion,
            precio,
            categoria,
            estado,
            botonEliminar
        );

        listaPublicaciones.appendChild(tarjeta);
    });
}

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const precio = Number(document.getElementById("precio").value);
    const categoria = document.getElementById("categoria").value;
    const estado = document.getElementById("estado").value;
    const archivo = document.getElementById("imagen").files[0];

    if (!nombre || !descripcion || !categoria || !estado ||
        !archivo || !Number.isFinite(precio) || precio <= 0) {
        alert("Completa todos los campos correctamente.");
        return;
    }

    if (!archivo.type.startsWith("image/")) {
        alert("Selecciona un archivo de imagen válido.");
        return;
    }

    // Limitar el tamaño para evitar llenar el almacenamiento
    if (archivo.size > 1024 * 1024) {
        alert("La imagen debe pesar máximo 1 MB.");
        return;
    }

    const lector = new FileReader();

    lector.onload = function() {
        publicaciones.push({
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            categoria: categoria,
            estado: estado,
            imagen: lector.result
        });

        try {
            localStorage.setItem(
                "misPublicaciones",
                JSON.stringify(publicaciones)
            );
        } catch (error) {
            publicaciones.pop();
            alert("No hay suficiente espacio para guardar el producto. Intenta con una imagen más pequeña.");
            return;
        }

        formulario.reset();
        mostrarPublicaciones();

        alert("¡Tu producto se publicó correctamente!");
    };

    lector.onerror = function() {
        alert("No se pudo leer la imagen. Inténtalo de nuevo.");
    };

    lector.readAsDataURL(archivo);
});

// Mostrar publicaciones guardadas al abrir la página
mostrarPublicaciones();
