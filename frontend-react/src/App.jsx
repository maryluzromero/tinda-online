
import Encabezado from "./components/Encabezado";
import Catalogo from "./components/Catalogo";
import "./App.css";

function App() {
  return (
    <>
      <Encabezado />

      <main id="inicio">
        <Catalogo />
      </main>

      <footer id="contacto">
        <p>HILO URBANO - Tu estilo, tu identidad</p>
        <p>© 2026 Todos los derechos reservados</p>
      </footer>
    </>
  );
}

export default App;
