
import { useState, useEffect } from "react";
import Camisa from "./Camisa";
import Carrito from "./Carrito";

import camisa1 from "../assets/img/camisa1.jpg";
import camisa2 from "../assets/img/camisa2.jpg";
import camisa3 from "../assets/img/camisa3.jpg";

function Catalogo() {
  const [camisas, setCamisas] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/camisas")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se pudieron consultar las camisas");
        }
        return respuesta.json();
      })
      .then((datos) => {
        setCamisas(datos);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  const imagenes = {
    1: camisa1,
    2: camisa2,
    3: camisa3
  };

  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => [...carritoActual, producto]);
  };
  const eliminarDelCarrito = (indice) => {
  setCarrito((carritoActual) =>
    carritoActual.filter((producto, index) => index !== indice)
  );
};

const vaciarCarrito = () => {
  setCarrito([]);
};

  if (cargando) {
    return <p>Cargando catálogo...</p>;
  }

  if (error) {
    return <p>Error al cargar: {error}</p>;
  }

  return (
    <section id="catalogo">
      <h2>Nuestro catálogo</h2>

      <Carrito
  productos={carrito}
  onEliminar={eliminarDelCarrito}
  onVaciar={vaciarCarrito}
/>

      <div className="lista-camisas">
        {camisas.map((camisa) => (
          <Camisa
            key={camisa.idCamisa}
            nombre={camisa.nombre}
            precio={Number(camisa.precio)}
            imagen={imagenes[camisa.idCamisa]}
            descripcion={`Talla: ${camisa.talla} | Color: ${camisa.color} | Stock: ${camisa.stock}`}
            onAgregar={agregarAlCarrito}
          />
        ))}
      </div>
    </section>
  );
}

export default Catalogo;
