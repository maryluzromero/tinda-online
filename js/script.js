//variables de HILO URBANO
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
// Variables de HILO URBANO

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
// Productos obtenidos desde la API de HILO URBANO

let productos = [];


const API_CAMISAS = "http://localhost:8080/api/camisas";

// Seleccionar el espacio del catálogo
const listaCamisas = document.querySelector("#listaCamisas");

// Consultar las camisas registradas en MySQL
async function cargarCamisas() {

    try {

        const respuesta = await fetch(API_CAMISAS);

        if (!respuesta.ok) {
            throw new Error("No se pudieron consultar las camisas");
        }

        const datos = await respuesta.json();

        productos = datos.map(function(camisa) {

            return {
                id: camisa.idCamisa,
                nombre: camisa.nombre,
                descripcion: camisa.categoria.descripcion,
                precio: Number(camisa.precio),
                stock: camisa.stock,
                talla: camisa.talla,
                color: camisa.color,
                imagen: "img/camisa" + camisa.idCamisa + ".jpg"
            };

        });

        mostrarProductos(productos);

    } catch (error) {

        console.error("Error al cargar las camisas:", error);

        listaCamisas.innerHTML =
            "<p>No fue posible cargar el catálogo.</p>";

    }

}

// Mostrar los productos en la página
function mostrarProductos(lista) {

    listaCamisas.innerHTML = "";

    lista.forEach(function(producto) {

        listaCamisas.innerHTML += `
            <article class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p>Talla: ${producto.talla}</p>
                <p>Color: ${producto.color}</p>
                <p>Disponibles: ${producto.stock}</p>
                <p class="precio">
                    $${producto.precio.toLocaleString("es-CO")}
                </p>

                <button class="agregar-carrito"
                    data-nombre="${producto.nombre}">
                    Agregar al carrito
                </button>
            </article>
        `;

    });

}

// Cargar las camisas desde Spring Boot
cargarCamisas();


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
