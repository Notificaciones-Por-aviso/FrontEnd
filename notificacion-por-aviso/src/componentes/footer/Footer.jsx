import React from "react";
import LogoFooter from "../../images/logoco-colombiaFooter.png";

const Footer = () => {
  return (
    <footer className={`footer py-3 border-top`}>
      <div className="container d-flex justify-content-between">
        <p className="mb-0 text-white">
          © 2024 Copyright: Ing. Iván Hernández.
        </p>

        <img
          src={LogoFooter}
          alt="LogoFooter"
          width="50"
          height="50"
          className="d-inline-block align-text-top"
        />
      </div>
    </footer>    
  );
};

export default Footer;
