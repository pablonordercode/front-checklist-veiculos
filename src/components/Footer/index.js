import React from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <h2 className="footer-title">Gerenciamento de Checklists</h2>
        <p className="footer-description">A solução ideal para o controle de veículos</p>

        <div className="social-icons">
          <a href="#" className="social-icon facebook">
            <FaFacebook size={24} />
          </a>
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
  );
}

export default Footer;
