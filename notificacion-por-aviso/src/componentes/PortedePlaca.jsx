import { useState } from "react";
import { Link } from "react-router-dom";
import LogoIntrasfun from "../images/Intrasfun.png";
import { fetchObtenerPorteDePlaca } from "../servicio/Api"; // Si está usando una API
import { FaRegFilePdf } from "react-icons/fa6";

const PortedePlaca = () => {
  const [activeTab, setActiveTab] = useState("placa"); // Para manejar las opciones del navbar
  const [placa, setPlaca] = useState(""); // Para manejar el input del usuario
  const [error, setError] = useState(null); // Para manejar errores
  const [mostrarTabla, setMostrarTabla] = useState(false); // Controla la visibilidad de la tabla
  const [cargando, setCargando] = useState(false); // Para manejar el estado de carga
  const [datos, setDatos] = useState([]); // Datos recibidos

  const urlBase = "https://notificacionesporaviso-183e0b769caa.herokuapp.com";
  //const urlBase = "http://localhost:8080";    

  const obtenerNotificacion = async () => {
    if (!placa.trim()) {
      setError("Por favor ingrese una placa válida.");
      setMostrarTabla(false); // Ocultar tabla en caso de error
      return;
    }
    if (placa.trim().length > 6) {
      setError("La placa no puede tener más de 6 caracteres.");
      setMostrarTabla(false); // Ocultar tabla en caso de error
      return;
    }
    setCargando(true); // Empieza el estado de carga
    try {
      const result = await fetchObtenerPorteDePlaca(placa.trim()); // Llamada a la API real
      setDatos([result]); // Guardar los datos recibidos
      setMostrarTabla(true); // Mostrar tabla si hay datos
      setError(null); // Limpiar error si la llamada es exitosa
    } catch (err) {
      // En lugar de un error genérico, capturamos el mensaje de error enviado por el backend
      setError(err.message); // Mostrar el mensaje de error del backend
      setMostrarTabla(false); // Ocultar la tabla en caso de error
    }
    setCargando(false); // Finaliza el estado de carga
  };

  // Función para limpiar el formulario y resetear el estado
  const limpiarFormulario = () => {
    setPlaca("");
    setDatos([]); // Limpiamos los resultados
    setMostrarTabla(false); // Ocultar tabla
    setError(null); // Limpiar mensaje de error
  };

  //Para que se vea el valro del salto más profesional en la tabla para el usuario
  const formatearSaldo = (valor) => {
    if (!valor) return "$0";
  
    const numero = parseFloat(valor.toString().replace(/[^\d]/g, "")); // quitar puntos o símbolos
    return `$${numero.toLocaleString("es-CO")}`;
  };
  

  return (
    <div>
      <div className="container text-center">
        <nav
          className="navbar navbar-expand-lg navbar-dark"
          style={{ backgroundColor: "#ffffff" }} //#e3f2fd
        >
          <div className="container d-flex justify-content-center">
            <div className="navbar-nav d-flex flex-row gap-3">
              <Link
                to="/"
                className={`nav-link px-3 fs-5 border-end ${
                  activeTab === "notificaciones"
                    ? "active fw-bold text-decoration-underline"
                    : ""
                }`}
                style={{ color: "#2f3732", borderColor: "#2f3732" }}
                onClick={() => setActiveTab("notificaciones")}
              >
                Notificaciones por aviso
              </Link>
              <Link
                to="/porte-placa"
                className={`nav-link px-3 fs-5 ${
                  activeTab === "placa"
                    ? "active fw-bold text-decoration-underline"
                    : ""
                }`}
                style={{ color: "#2f3732" }}
                onClick={() => setActiveTab("placa")}
              >
                Porte de placa
              </Link>
            </div>
          </div>
        </nav>
        <div className="container">
          <img
            src={LogoIntrasfun}
            alt="LogoIntrasfun"
            width="250"
            height="70"
          />
        </div>
        <h1
          className="my-5"
          style={{
            display: "inline-block",
            fontWeight: "bold",
            fontFamily: "Roboto, sans-serif",
          }}
        >
          Notificaciones porte de placa 
        </h1>

        {/* Formulario para búsqueda */}
        <div className="d-flex justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="input-group mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese Placa"
                value={placa}
                onChange={(e) => setPlaca(e.target.value)}
                aria-label="Recipient's username with two button addons"
                maxLength="6"
              />
              <button
                className="btn btn-outline-primary"
                type="button"
                onClick={obtenerNotificacion}
                disabled={cargando}
              >
                {cargando ? "Cargando..." : "Buscar"}
              </button>
              <button
                className="btn btn-outline-primary"
                type="button"
                onClick={limpiarFormulario}
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>

        {/* Mostrar mensaje de error si hay un problema */}
        {error && <p className="text-danger">{error}</p>}

        {/* Mostrar la tabla solo si se presiona buscar y hay resultados */}
        {mostrarTabla && (
          <div className="table-responsive">
            <table className="table">
              <thead className="table-primary">
                <tr>
                  <th>ID</th>                  
                  <th>Identificación</th>
                  <th>Placa</th>
                  <th>Nombre/razón social</th>
                  <th>Resolusión</th>
                  <th>Total Saldo</th>                  
                  <th>Descargar PDF</th>
                </tr>
              </thead>
              <tbody>
                {datos.map((info, index) => (
                  <tr key={index}>                   
                    <td>{info.id}</td>
                    <td>{info.identificacionUsuario}</td>
                    <td>{info.placa}</td>
                    <td>{info.nombreORazonSocial}</td>
                    <td>{info.resolusion}</td>                    
                    <td>{formatearSaldo(info.saldoTotal)}</td>

                    
                    <td>
                      <a
                        href={`${urlBase}/porteDePlaca/descargarPDF/${info.placa}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaRegFilePdf size={24} color="#1e3050" />{" "}
                        {/* Ajusta el tamaño y el color del ícono */}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Mostrar mensaje si no se encuentran notificaciones */}
        {!cargando && datos.length === 0 && !error && mostrarTabla && (
          <p>No se encontraron notificaciones</p>
        )}
      </div>
    </div>
  );
};

export default PortedePlaca;
