import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Para redirecionamento
import "./Login.css";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" }); // Estado para mensagens dinâmicas
  const [loading, setLoading] = useState(false); // Estado para gerenciar o carregamento
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" }); // Limpa mensagens anteriores
    setLoading(true); // Ativa o estado de carregamento

    try {
      const response = await axios.post("https://checklist-veiculos.onrender.com/usuario/login", {
        nome: name,
        password,
      });
      const { token, user, msg } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("adminData", JSON.stringify(user));
      localStorage.setItem("user", JSON.stringify(user));

      setMessage({ type: "success", text: msg || "Login realizado com sucesso!" });
      
      setTimeout(() => navigate("/home"), 1.500); // Redireciona após 2 segundos
    } catch (error) {
      if (error.response) {
        setMessage({ type: "error", text: error.response.data.msg || "Erro ao fazer login!" });
      } else {
        setMessage({ type: "error", text: "Erro ao conectar ao servidor!" });
      }
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <div className="container-principal">
      <div className="login-container">
        <div className="mini-container-p1">
          <p>Acesse sua conta para usufruir de todos os serviços disponíveis</p>
        </div>
        <h2>Entrar</h2>

        {/* Mensagem de status */}
        {message.text && <p className={`message ${message.type}`}>{message.text}</p>}

        {/* Mensagem de carregamento */}
        {loading && <p className="message loading">Carregando informações, aguarde...</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="btao-entrar" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <div className="btnn-voltar">
          <a href="/" className="botao-voltar">Voltar</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
