import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./GestaoDeMotorista.css"; 

function GestaoDeMotorista() {
  const [motoristas, setMotoristas] = useState([]);
  const [nome, setNome] = useState("");
  const [editando, setEditando] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const inputRef = useRef(null);  // Criação do useRef
  const navigate = useNavigate();

  useEffect(() => {
    buscarMotoristas();
  }, []);

  const buscarMotoristas = async () => {
    try {
      const res = await axios.get("https://checklist-veiculos.onrender.com/motorista/buscarmotorista");
      setMotoristas(res.data);
    } catch (error) {
      setMessage({ type: "error", text: "Erro ao buscar motoristas!" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome) {
      setMessage({ type: "error", text: "Digite o nome do motorista!" });
      return;
    }

    try {
      if (editando) {
        await axios.put(`https://checklist-veiculos.onrender.com/motorista/editar/${editando}`, { nome });
        setMessage({ type: "success", text: "Motorista atualizado com sucesso!" });
      } else {
        await axios.post("https://checklist-veiculos.onrender.com/motorista/adicionarmotorista", { nome });
        setMessage({ type: "success", text: "Motorista cadastrado com sucesso!" });
      }

      setNome("");
      setEditando(null);
      buscarMotoristas();
    } catch (error) {
      setMessage({ type: "error", text: "Erro ao salvar motorista!" });
    }
  };

  const deletarMotorista = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este motorista?")) {
      try {
        await axios.delete(`https://checklist-veiculos.onrender.com/motorista/deletar/${id}`);
        setMessage({ type: "success", text: "Motorista removido com sucesso!" });
        buscarMotoristas();
      } catch (error) {
        setMessage({ type: "error", text: "Erro ao excluir motorista!" });
      }
    }
  };

  const editarMotorista = (motorista) => {
    setNome(motorista.nome);
    setEditando(motorista._id);
    inputRef.current.focus();  // Focando automaticamente no campo de input
  };

  return (
    <div className="container">
      <a href='/gestao' className='botao-a-home'>Voltar</a>
      <h2>Gerenciar Motoristas</h2>
  
      {message.text && <p className={`message ${message.type}`}>{message.text}</p>}
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}  // Adicionando o ref ao input
          type="text"
          placeholder="Nome do motorista"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <button type="submit">{editando ? "Atualizar" : "Adicionar Motorista"}</button>
      </form>

      <ul>
        {motoristas.map((motorista) => (
          <li key={motorista._id}>
            {motorista.nome}
            <button onClick={() => editarMotorista(motorista)}>Editar</button>
            <button className="bt-exclu" onClick={() => deletarMotorista(motorista._id)}>Excluir</button>
          </li>
        ))}
      </ul>

      <button onClick={() => navigate("/home")}>Voltar para Home</button>
    </div>
  );
}

export default GestaoDeMotorista;
