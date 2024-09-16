const urlBase = "http://localhost:8080";

export const fetchObtenerComparendos = async (identificacion) => {
    const url = `${urlBase}/notificacionesPorAviso/${identificacion}`;          

    try {
        const response = await fetch(url, {
            method: "GET",    
            headers: {
              "Content-Type": "application/json"          
            }
        });

        if (response.status === 500) {
            throw new Error("Error 500: Internal Server Error");
        } else if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.mensaje || 'Error desconocido');
        }

        return await response.json();
    } catch (error) {
        if (error instanceof TypeError) {
            // Esto captura errores de red como el servidor caído o URL inaccesible
            throw new Error("No se pudo conectar con el servidor. Inténtelo más tarde.");
        }
        throw error;
    }
};

// Función para descargar el PDF basado en el número de comparendo
export const fetchDescargarPDF = async (numeroComparendo) => {
    const url = `${urlBase}/notificacionesPorAviso/descargarPDF/${numeroComparendo}`;          

    try {
        const response = await fetch(url, {
            method: "GET",    
            headers: {
              "Content-Type": "application/pdf", // Indicar que el contenido esperado es un PDF          
            }
        });

        if (!response.ok) {
            throw new Error("No se pudo descargar el documento PDF");
        }

        // Crear un objeto blob con el contenido PDF
        const blob = await response.blob();
        const urlBlob = window.URL.createObjectURL(blob);

        // Abrir el PDF en una nueva pestaña del navegador
        window.open(urlBlob, '_blank');

    } catch (error) {
        throw new Error(error.message || 'Error desconocido al descargar el PDF');
    }
};