import React from "react";
import Logo from "../../../src/images/logogovcoHeader.png";
import Styles from "./Header.module.css";

const Header = () => {
  return (
    <header
      className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom"
      style={{ backgroundColor: "#005dc7" }}
    >
      <div className="col-md-3 mb-2 mb-md-0 d-flex justify-content-center">
        <img
          src={Logo}
          alt="Logo"
          width="150"
          height="40"
          className="d-inline-block align-text-top"
        />
      </div>
      <div className="col-md-9 mb-3 mb-md-0 d-flex justify-content-center">
        <p className={Styles.p}>
          Instituto Municipal de Tránsito y Transporte de Fundación Magdalena -
          Intrasfun
        </p>
      </div>      
    </header>    
  );
};

export default Header;
