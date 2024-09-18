import React, { useState } from "react";
import LogoIntrasfun from "../images/Intrasfun.png";
import "./MostrarNotificacionesPorAviso.css";
import { fetchObtenerComparendos, fetchDescargarPDF } from "../servicio/Api"; // Si está usando una API
import { FaRegFilePdf } from "react-icons/fa6";

const MostrarNotificacionesPorAviso = () => {
  const [mostrarTabla, setMostrarTabla] = useState(false); // Controla la visibilidad de la tabla
  const [identificacion, setIdentificacion] = useState(""); // Para manejar el input del usuario
  const [datos, setDatos] = useState([]); // Datos recibidos
  const [error, setError] = useState(null); // Para manejar errores
  const [cargando, setCargando] = useState(false); // Para manejar el estado de carga     
  
  const urlBase = "https://notificacionesporaviso-183e0b769caa.herokuapp.com";
  
  const obtenerNotificacion = async () => {
    if (!identificacion.trim()) {
      setError("Por favor ingrese una identificación válida.");
      setMostrarTabla(false); // Ocultar tabla en caso de error
      return;
    }
    if (identificacion.trim().length > 15) {
      setError("La identificación no puede tener más de 15 caracteres.");
      setMostrarTabla(false); // Ocultar tabla en caso de error
      return;
    }
    setCargando(true); // Empieza el estado de carga
    try {
      const result = await fetchObtenerComparendos(identificacion.trim()); // Llamada a la API real
      setDatos(result); // Guardar los datos recibidos
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
    setIdentificacion("");
    setDatos([]); // Limpiamos los resultados
    setMostrarTabla(false); // Ocultar tabla
    setError(null); // Limpiar mensaje de error
  };  

  return (
    <div>
      <div className="container text-center">
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
          Notificaciones por Aviso
        </h1>

        {/* Formulario para búsqueda */}
        <div className="d-flex justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="input-group mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese Identificación"
                value={identificacion}
                onChange={(e) => setIdentificacion(e.target.value)}
                aria-label="Recipient's username with two button addons" 
                maxLength="15"
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
                  <th>Comparendo</th>
                  <th>Fecha Comparendo</th>
                  <th>Estado</th>
                  <th>Placa</th>
                  <th>Resolusión Aviso</th>
                  <th>Descargar PDF</th>
                </tr>
              </thead>
              <tbody>
                {datos.map((info, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{info.idUsuario}</td>
                    <td>{info.numeroComparendo}</td>
                    <td>{info.fechaComparendo}</td>
                    <td>{info.estadoCartera}</td>
                    <td>{info.placa}</td>
                    <td>{info.resolusionAviso}</td>
                    <td>                      
                      <a                        
                        href={`${urlBase}/notificacionesPorAviso/descargarPDF/${info.numeroComparendo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaRegFilePdf size={24} color="#1e3050" /> {/* Ajusta el tamaño y el color del ícono */}                        
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

export default MostrarNotificacionesPorAviso;
