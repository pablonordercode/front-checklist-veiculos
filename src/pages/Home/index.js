
import React, { useState, useEffect } from "react";
import { FaInstagram, FaWhatsapp, FaHistory, FaInfoCircle, FaCarSide } from "react-icons/fa";
import { SiAwssecretsmanager } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Header from "../../components/Header";

function Home() {
  const navigate = useNavigate();
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showModal, setShowModal] = useState(false);
  const [senha, setSenha] = useState("");

  const verificarSenha = () => { 
    setShowModal(true);
  };

  const handleConfirmSenha = () => {
    const senhaCorreta = "sms2025an";
    if (senha === senhaCorreta) {
      setMessage({ type: "success", text: "Acesso concedido! Redirecionando..." });
      setTimeout(() => navigate("/gestao"), 1500);
    } else {
      setMessage({ type: "error", text: "Senha incorreta! Acesso negado." });
    }
    setShowModal(false);
    setSenha("");
  };

  // Função para fazer a chamada ao backend
  const fetchBackendData = async () => {
    try {
      const response = await fetch('https://checklist-veiculos.onrender.com/checklist/listarchecklist');
      const data = await response.json();
      console.log('Dados do backend:', data);
      // Aqui você pode atualizar o estado ou fazer outras operações com os dados recebidos
    } catch (error) {
      console.error('Erro ao buscar dados do backend:', error);
    }
  };

  // Configura o intervalo para chamar a função fetchBackendData a cada minuto
  useEffect(() => {
    const intervalId = setInterval(fetchBackendData, 180000); // 180000 ms = 3 minuto

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container-home">
      <Header />

      {message.text && <p className={`message ${message.type}`}>{message.text}</p>}

      <nav className="menu-home">
        <a href="/checklist">
          <FaCarSide className="icon-home" />
          Criar Check-List
        </a>

        <a href="/historico">
          <FaHistory className="icon-home" />
          Histórico
        </a>
 
        <button className="btn-gestao" onClick={() => verificarSenha()}>
          <SiAwssecretsmanager className="icon-home" />
          Gestão
        </button>

        {/* <a href="/dashboard">
          <GrDocumentPerformance className="icon-home" />
          Frase do dia
        </a> */}

        <a href="/importante">
          <FaInfoCircle className="icon-home" />
          Importância do Check-List
        </a>
      </nav>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Digite a senha para acessar</h3>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
            />
            <button onClick={handleConfirmSenha}>Confirmar</button>
            <button onClick={() => setShowModal(false)}>Cancelar</button>
          </div>
        </div>
      )}

      <footer className="footer-container">
        <div className="footer-content">
          <h2 className="footer-title">Gerenciamento de Checklists</h2>
          <p className="footer-description">A solução ideal para o controle de veículos</p>

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
  );
}

export default Home;
