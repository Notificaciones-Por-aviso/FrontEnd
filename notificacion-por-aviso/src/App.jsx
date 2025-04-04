import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./componentes/header/Header";
import MostrarNotificacionesPorAviso from "./componentes/MostrarNotificacionesPorAviso";
import Footer from "./componentes/footer/Footer";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PortedePlaca from "./componentes/PortedePlaca"; // Importamos el nuevo componente

function App() {
  return (
    <Router>
    <div id="root">
      <div className="content">
        <Header />

        <Routes>
        <Route path="/" element={<MostrarNotificacionesPorAviso />} />
        <Route path="/porte-placa" element={<PortedePlaca />} />
        
        {/*<MostrarNotificacionesPorAviso />*/}
      
      </Routes>
      
      </div>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
