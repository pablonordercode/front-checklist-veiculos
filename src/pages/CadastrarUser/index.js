import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Para redirecionamento
import "./Cadastro.css"; // Criar um arquivo CSS para o cadastro

function Cadastro() {
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirmação de senha
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Para redirecionamento após o cadastro

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    try {
      const response = await axios.post("https://checklist-veiculos.onrender.com/usuario/adduser", {
        nome,
        password,
      }); 

      setSuccess(response.data.msg);
      setTimeout(() => navigate("/"), 2000); // Redireciona após sucesso
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg);
      } else {
        setError("Erro ao conectar ao servidor!");
      }
    }
  };

  return (
    <div className="container-01">
          <div className="contain-principal-cadastro">
      <div className="div-do-h2"><h2 className="cadastrar-usuario">Cadastrar Usuário</h2></div>
      {error && <p className="error-message-cad">{error}</p>}
      {success && <p className="success-message-cad">{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button className="botao-cadastrar-user" type="submit">Cadastrar</button>
      </form>
      <a href="/" className="botao-voltar-home">
        Voltar
      </a>
    </div>
    </div>
  );
}

export default Cadastro;
