import React from "react";
import "./PgInicial.css";
import { Link } from "react-router-dom";

function PaginaInicial() {

  return (
    <div className="pagina-inici-container">
    <div className="containerDoH2">
    <h2 className="titulo-1-h2">
        Bem-vindo ao
    </h2>
    </div>
    
    <div className="containerDoH1">
    <h1 className="titulo-2-h1">
        CheckList / Digital
    </h1>
    </div>
    <div className="container01-links">
    <Link className="btn01" to="/cadastrar">Opções de cadastro</Link>
    <Link className="btn02" to="/login">Entrar</Link>
    </div>

{/* Parágrafo abaixo dos links */}
<div className="paragraf">
        <p className="para01">Mantenha seus checklists sempre atualizados e organizados.</p>
      </div>

      {/* Cards com informações relevantes */}
      <div className="cards-container">
        <div className="card">
        {/* <h3>✔️ Crie e gerencie seus checklists de forma rápida e intuitiva.</h3> */}
        <h3>📊 Crie e gerencie seus checklists de forma rápida e intuitiva.</h3>
          {/* <p>Crie e gerencie seus checklists de forma rápida e intuitiva.</p> */}
        </div>

        <div className="card">
          <h3>🔒 Seus dados protegidos e acessíveis a qualquer momento.</h3>
          {/* <p>Seus dados protegidos e acessíveis a qualquer momento.</p> */}
        </div>
      </div>
    </div>
  );
}

export default PaginaInicial;