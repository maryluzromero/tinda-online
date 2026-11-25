
function Carrito({ productos, onEliminar, onVaciar }) {
  const total = productos.reduce(
    (suma, producto) => suma + producto.precio,
    0
  );

  return (
    <section className="carrito">
     <h2>Mi carrito de compras ({productos.length})</h2>

      {productos.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          {productos.map((producto, index) => (
            <div className="producto-carrito" key={index}>
              <p>
                {producto.nombre} - $
                {producto.precio.toLocaleString("es-CO")}
              </p>

              <button onClick={() => onEliminar(index)}>
                Borrar
              </button>
            </div>
          ))}

          <h3>
            Total: ${total.toLocaleString("es-CO")}
          </h3>

          <button onClick={onVaciar}>
            Vaciar carrito
          </button>
        </>
      )}
    </section>
  );
}

export default Carrito;

