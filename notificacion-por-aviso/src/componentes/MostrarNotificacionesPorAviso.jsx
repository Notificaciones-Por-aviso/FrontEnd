import React, { useState } from "react";
import LogoIntrasfun from "../images/Intrasfun.png";
import IconoPdf from "../images/iconoPdf.png";
import "./MostrarNotificacionesPorAviso.css";
import { fetchObtenerComparendos, fetchDescargarPDF } from "../servicio/Api"; // Si está usando una API
import { FaRegFilePdf } from "react-icons/fa6";

const MostrarNotificacionesPorAviso = () => {
  const [mostrarTabla, setMostrarTabla] = useState(false); // Controla la visibilidad de la tabla
  const [identificacion, setIdentificacion] = useState(""); // Para manejar el input del usuario
  const [datos, setDatos] = useState([]); // Datos recibidos
  const [error, setError] = useState(null); // Para manejar errores
  const [cargando, setCargando] = useState(false); // Para manejar el estado de carga                      
  
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

  // Ejemplo de datos
  // const datosEjemplo = [
  //   {
  //     id: 1,
  //     identificacion: "U1308476",
  //     comparendo: "47288000000026927200",
  //     fechaComparendo: "2020-01-28",
  //     estado: "PAGADO",
  //     placa: "FZL385",
  //     resolusionAviso: "RES-FM-4503-20-FEBRERO",
  //   },
  //   {
  //     id: 2,
  //     identificacion: "U1308476",
  //     comparendo: "47288000000026927199",
  //     fechaComparendo: "2020-01-28",
  //     estado: "COACTIVO",
  //     placa: "FZL385",
  //     resolusionAviso: "RES-FM-4504-20-FEBRERO",
  //   },
  //   {
  //     id: 3,
  //     identificacion: "U1308476",
  //     comparendo: "47288000000026927199",
  //     fechaComparendo: "2020-01-28",
  //     estado: "COACTIVO",
  //     placa: "FZL385",
  //     resolusionAviso: "RES-FM-4504-20-FEBRERO",
  //   },
  //   {
  //     id: 4,
  //     identificacion: "U1308476",
  //     comparendo: "47288000000026927199",
  //     fechaComparendo: "2020-01-28",
  //     estado: "COACTIVO",
  //     placa: "FZL385",
  //     resolusionAviso: "RES-FM-4504-20-FEBRERO",
  //   },
  //   {
  //     id: 5,
  //     identificacion: "U1308476",
  //     comparendo: "47288000000026927199",
  //     fechaComparendo: "2020-01-28",
  //     estado: "COACTIVO",
  //     placa: "FZL385",
  //     resolusionAviso: "RES-FM-4504-20-FEBRERO",
  //   },
  // ];

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
                aria-label="Recipient's username with two button addons" ///////ESTO SE PUEDE ELIMINAR
                maxLength="15"
              />
              <button
                className="btn btn-outline-primary"
                type="button"
                onClick={obtenerNotificacion}
                disabled={cargando} //+++++++++++++++++++++++++++ NUEVO +++++++++++++++++++
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
                      {/* <button
                        onClick={() => fetchDescargarPDF(info.numeroComparendo)} // Llama a la función fetchDescargarPDF con el número de comparendo
                        className="btn btn-link"
                      >
                        <img src={IconoPdf} alt="PDF" width="24" height="24" />
                      </button> */}
                      <a
                        href={`http://localhost:8080/notificacionesPorAviso/descargarPDF/${info.numeroComparendo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaRegFilePdf size={24} color="#1e3050" /> {/* Ajusta el tamaño y el color del ícono */}
                        {/* <img
                          src={IconoPdf}
                          alt="PDF"
                          width="24" // Ajusta el tamaño de la imagen según sea necesario
                          height="24"
                        /> */}
                      </a>
                      {/* <i
                        className="fa-regular fa-file-pdf"
                        style={{ color: "#1e3050", fontSize: "24px" }}
                      ></i> */}
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
