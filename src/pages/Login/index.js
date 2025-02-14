import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Para redirecionamento
import "./Login.css";


function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" }); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" }); // Limpa mensagens anteriores

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
      
      setTimeout(() => navigate("/home"), 2000); // Redireciona após 2 segundos
    } catch (error) {
      if (error.response) {
        setMessage({ type: "error", text: error.response.data.msg || "Erro ao fazer login!" });
      } else {
        setMessage({ type: "error", text: "Erro ao conectar ao servidor!" });
      }
    }
  };

  return (
    <div className="container-principal">
      <div className="login-container">
        <h2>Entrar</h2>

        // {message.text && (
        //   <p className={`message ${message.type}`}>{message.text}</p>
        // )} 
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
          <button className="btao-entrar" type="submit">Entrar</button>
        </form>
        <div className="btnn-voltar">
          <a href="/" className="botao-voltar">Voltar</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
