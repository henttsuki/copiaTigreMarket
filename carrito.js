

let carrito = JSON.parse(localStorage.getItem("miCarrito")) || [];

// Elementos del carrito
const listaCarrito = document.getElementById("lista-carrito");
const subtotalElemento = document.getElementById("subtotal");
const totalElemento = document.getElementById("total");
const botonConfirmar = document.getElementById("confirmar-pedido");
const mensaje = document.getElementById("mensaje");

// Formato de precios
function formatoPrecio(precio) {
    return precio.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN"
    });
}

// Guardar los productos
function guardarCarrito() {
    localStorage.setItem("miCarrito", JSON.stringify(carrito));
}

// AGREGAR PRODUCTOS DESDE INICIO
const catalogo = document.getElementById("catalogo");

if (catalogo) {
    catalogo.addEventListener("click", function(evento) {
        const boton = evento.target.closest(".agregar");

        if (!boton) return;

        const id = boton.dataset.id;
        const nombre = boton.dataset.nombre;
        const precio = Number(boton.dataset.precio);

        const existente = carrito.find(function(producto) {
            return producto.id === id;
        });

        if (existente) {
            existente.cantidad++;
        } else {
            carrito.push({
                id: id,
                nombre: nombre,
                precio: precio,
                cantidad: 1
            });
        }

        guardarCarrito();

        alert(nombre + " se agregó al carrito.");
    });
}

// MOSTRAR LOS PRODUCTOS DEL CARRITO
function mostrarCarrito() {
    if (!listaCarrito) return;

    listaCarrito.innerHTML = "";

    let total = 0;

    if (carrito.length === 0) {
        listaCarrito.innerHTML =
            "<p>Tu carrito está vacío. Agrega productos para comenzar.</p>";
    }

    carrito.forEach(function(producto) {
        const importe = producto.precio * producto.cantidad;
        total += importe;

        const articulo = document.createElement("article");
        articulo.className = "producto-carrito";

        const informacion = document.createElement("div");

        const nombre = document.createElement("h3");
        nombre.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.textContent =
            "Precio: " + formatoPrecio(producto.precio);

        const subtotal = document.createElement("p");
        subtotal.textContent =
            "Subtotal: " + formatoPrecio(importe);

        informacion.append(nombre, precio, subtotal);

        const controles = document.createElement("div");
        controles.className = "controles-cantidad";

        const restar = document.createElement("button");
        restar.textContent = "−";
        restar.addEventListener("click", function() {
            cambiarCantidad(producto.id, -1);
        });

        const cantidad = document.createElement("span");
        cantidad.textContent = producto.cantidad;

        const sumar = document.createElement("button");
        sumar.textContent = "+";
        sumar.addEventListener("click", function() {
            cambiarCantidad(producto.id, 1);
        });

        const quitar = document.createElement("button");
        quitar.textContent = "Quitar";
        quitar.className = "boton-quitar";

        quitar.addEventListener("click", function() {
            quitarProducto(producto.id);
        });

        controles.append(restar, cantidad, sumar, quitar);
        articulo.append(informacion, controles);
        listaCarrito.appendChild(articulo);
    });

    subtotalElemento.textContent = formatoPrecio(total);
    totalElemento.textContent = formatoPrecio(total);
}

// AUMENTAR O DISMINUIR CANTIDAD
function cambiarCantidad(id, cambio) {
    const producto = carrito.find(function(item) {
        return item.id === id;
    });

    if (!producto) return;

    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {
        quitarProducto(id);
        return;
    }

    guardarCarrito();
    mostrarCarrito();
}

// ELIMINAR PRODUCTOS
function quitarProducto(id) {
    carrito = carrito.filter(function(producto) {
        return producto.id !== id;
    });

    guardarCarrito();
    mostrarCarrito();

    if (mensaje) {
        mensaje.textContent = "Producto eliminado del carrito.";
    }
}

// CONFIRMAR PEDIDO
if (botonConfirmar) {
    botonConfirmar.addEventListener("click", function() {
        if (carrito.length === 0) {
            mensaje.textContent = "Tu carrito está vacío.";
            return;
        }

        mensaje.textContent =
            "Tu carrito está listo para confirmar el pedido.";
    });
}

// ACTUALIZAR LA PÁGINA DEL CARRITO
mostrarCarrito();
