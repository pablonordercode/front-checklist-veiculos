import React from "react";
import "./Cabecalho.css"; // Importa o CSS
import imageLogo from "../../public/logoCocal.png"; // Logo utilizada no cabeçalho

function Cabecalho() {
  return (
    <div className="cabecalho-cbc">
      <img src={imageLogo} alt="Logo" className="cabecalho-logoe-cbc" />
    </div>
  );
}

export default Cabecalho;
