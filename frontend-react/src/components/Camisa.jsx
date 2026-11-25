
function Camisa({ nombre, precio, imagen, descripcion, onAgregar }) {
  return (
    <article className="camisa">
      <img src={imagen} alt={nombre} />
      <h3>{nombre}</h3>
      <p>{descripcion}</p>
      <strong>${precio.toLocaleString("es-CO")}</strong>

      <button onClick={() => onAgregar({ nombre, precio })}>
        Agregar al carrito
      </button>
    </article>
  );
}

export default Camisa;
