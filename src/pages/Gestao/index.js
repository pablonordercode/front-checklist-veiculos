import React, { useState } from "react";
import { FaHistory, FaUserCog, FaChartBar } from "react-icons/fa"; // Importando ícones
import "./Gestao.css";
import imgLogo from "../../public/logoHeader.png";
import {  FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaHome } from "react-icons/fa";


const Gestao = () => {
  const [flashMessage, setFlashMessage] = useState("");

  const handleButtonClick = (url, mensagem) => {
    setFlashMessage(mensagem);
    setTimeout(() => {
      setFlashMessage("");
      window.location.href = url; // Redirecionamento para a página desejada
    }, 1000);
  };

  return (
    <div className="gestao-container">
      <a className="voltar-homeee" href="/home"><FaHome /></a>
      {/* Header */}
      <header className="header">
        <a  className="header-link">
          <img src={imgLogo} alt="Voltar para Home" className="header-logo" />
          <h4>S.M.Saude:</h4>
          <h3>Ana Amelia</h3>
        </a>
      </header>

      {/* Flash Message */}
      {flashMessage && <div className="flash-message">{flashMessage}</div>}

      {/* Botões de navegação */}
      <div className="button-container">
        <button
          className="navigation-button"
          onClick={() =>
            handleButtonClick("/histgestao", "Redirecionando para o Histórico")
          }
        >
          <FaHistory style={{ marginRight: "10px" }} />
          Histórico
        </button>
        <button
          className="navigation-button"
          onClick={() =>
            handleButtonClick(
              "/gestaodemotorista",
              "Redirecionando para Gestão de Motorista"
            )
          }
        >
          <FaUserCog style={{ marginRight: "10px" }} />
          Gestão de Motorista
        </button>
        {/* <button
          className="navigation-button"
          onClick={() =>
            handleButtonClick("/graficodesempenho", "Redirecionando para Botão 3")}>
          <FaChartBar style={{ marginRight: "10px" }} />
          Desempenho
        </button> */}
      </div>
      <div className="fot-footer">
              <footer className="footer-cont">
                <div className="footer-conte">
                  <h2 className="footer-tit">Gerenciamento de Checklists</h2>
                  <p className="footer-descrip">A solução ideal para o controle de veículos</p>
          
                  <div className="social-icons">

                    <a href="#" className="social-icon instagram">
                      <FaInstagram size={24} />
                    </a>
                    <a href="#" className="social-icon whatsapp">
                      <FaWhatsapp size={24} />
                    </a>
                  </div>
          
                  <p className="footer-rights">
                    © {new Date().getFullYear()} Gerosoft - Todos os direitos reservados.
                  </p>
                </div>
              </footer>
      </div>
    </div>
  );
};

export default Gestao;
