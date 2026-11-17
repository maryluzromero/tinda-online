// Variables de HILO URBANO

const nombreTienda = "HILO URBANO";

let nombreCamisa = "Camisa clásica";
let precioCamisa = 45000;
let cantidadDisponible = 10;

console.log("Tienda:", nombreTienda);
console.log("Producto:", nombreCamisa);
console.log("Precio:", precioCamisa);
console.log("Cantidad disponible:", cantidadDisponible);

// Tipos de datos

let nombreProducto = "Camisa deportiva";
let precio = 50000;
let disponible = true;

// Operadores matemáticos

let cantidad = 2;
let total = precio * cantidad;

console.log("Nombre:", nombreProducto);
console.log("Precio:", precio);
console.log("¿Está disponible?", disponible);
console.log("Cantidad:", cantidad);
console.log("Total de la compra:", total);

// Condicionales if y else

let stockCamisa = 0;

if (stockCamisa > 0) {
    console.log("La camisa está disponible");
} else {
    console.log("La camisa está agotada");
}

// Funcion para calcular el total de una compra

function calcularTotal(precio, cantidad) {
    let total = precio * cantidad;
    return total;
}

let resultadoCompra = calcularTotal(45000, 3);

console.log("Total de la compra:", resultadoCompra);

// Arreglo de camisas de HILO URBANO

const camisas = [
    "Camisa casual",
    "Camisa urbana",
    "Camisa elegante",
];

console.log("Catálogo de HILO URBANO:");

camisas.forEach(function(camisa) {
    console.log(camisa);
});
// Productos de HILO URBANO

const productos = [
    {
        nombre: "Camisa casual",
        descripcion: "Ideal para todos los días.",
        precio: 45000,
        imagen: "img/camisa1.jpg"
    },
    {
        nombre: "Camisa elegante",
        descripcion: "Perfecta para ocasiones especiales.",
        precio: 60000,
        imagen: "img/camisa2.jpg"
    },
    {
        nombre: "Camisa urbana",
        descripcion: "Un estilo moderno y cómodo.",
        precio: 50000,
        imagen: "img/camisa3.jpg"
    }
];

// Seleccionar el espacio del catálogo
const listaCamisas = document.querySelector("#listaCamisas");


// Mostrar los productos en la página
productos.forEach(function(producto) {

    listaCamisas.innerHTML += `
        <article class="producto">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p class="precio">$${producto.precio.toLocaleString("es-CO")}</p>

            <button class="agregar-carrito" data-nombre="${producto.nombre}">
                Agregar al carrito
            </button>
        </article>
    `;

});

// Buscador de camisas


// Buscador de camisas

const buscador = document.querySelector("#buscador");

buscador.addEventListener("input", function() {

    const texto = buscador.value.toLowerCase();

    const camisasFiltradas = productos.filter(function(producto) {
        return producto.nombre.toLowerCase().includes(texto);
    });

    listaCamisas.innerHTML = "";

    camisasFiltradas.forEach(function(producto) {

        listaCamisas.innerHTML += `
            <article class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p class="precio">$${producto.precio.toLocaleString("es-CO")}</p>

                <button class="agregar-carrito" data-nombre="${producto.nombre}">
                    Agregar al carrito
                </button>
            </article>
        `;

    });

});

// Carrito de compras

let carrito = [];

function agregarAlCarrito(nombre) {

    const producto = productos.find(function(item) {
        return item.nombre === nombre;
    });

    carrito.push(producto);

    mostrarCarrito();
}

function mostrarCarrito() {

    const listaCarrito = document.querySelector("#listaCarrito");
    const cantidadCarrito = document.querySelector("#cantidadCarrito");
    const totalCarrito = document.querySelector("#totalCarrito");

    listaCarrito.innerHTML = "";

    let total = 0;

    carrito.forEach(function(producto) {

        listaCarrito.innerHTML += `
            <li>${producto.nombre} - $${producto.precio.toLocaleString("es-CO")}</li>
        `;

        total += producto.precio;
    });

    cantidadCarrito.textContent = carrito.length;
    totalCarrito.textContent = total.toLocaleString("es-CO");
}

// Detectar los clics en los botones del catálogo

listaCamisas.addEventListener("click", function(event) {

    if (event.target.classList.contains("agregar-carrito")) {

        const nombre = event.target.dataset.nombre;

        agregarAlCarrito(nombre);
    }

});

// Vaciar el carrito de compras

const botonVaciar = document.querySelector("#vaciarCarrito");

botonVaciar.addEventListener("click", function() {

    carrito = [];

    mostrarCarrito();

});
