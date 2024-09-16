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

function App() {
  return (
    <div id="root">
      <div className="content">
        <Header />
        <MostrarNotificacionesPorAviso />
      </div>
      <Footer />
    </div>
  );
}

export default App;
