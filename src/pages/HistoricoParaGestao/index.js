import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import axios from 'axios';
import './ChecklistHistory.css';

const ChecklistHistory = () => {
  const [checklists, setChecklists] = useState([]);
  const [filteredChecklists, setFilteredChecklists] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [selectedDate, setSelectedDate] = useState(''); // Data selecionada para filtrar

  // Função para buscar os checklists no backend
  const fetchChecklists = async () => {
    try {
      const response = await axios.get('https://checklist-veiculos.onrender.com/checklist/listarchecklist');
      setChecklists(response.data);
      setFilteredChecklists(response.data); // Inicialmente, sem filtro
    } catch (error) {
      console.error('Erro ao buscar os checklists:', error);
    }
  };

  // Função para apagar um checklist
  const deleteChecklist = async (id) => {
    try {
      const response = await axios.delete(
        `https://checklist-veiculos.onrender.com/checklist/apagarchecklist/${id}`,
        {
          data: { senha: "sms2025an" }, // Adicione a senha aqui
        }
      );
  
      if (response.status === 200) {
        const updatedChecklists = checklists.filter((checklist) => checklist._id !== id);
        setChecklists(updatedChecklists);
        setFilteredChecklists(updatedChecklists);
      } else {
        console.error("Erro inesperado ao apagar o checklist:", response.data);
        alert("Erro ao apagar o checklist. Tente novamente!");
      }
    } catch (error) {
      console.error("Erro ao apagar o checklist:", error);
      alert("Falha ao apagar o checklist. Verifique sua conexão ou tente novamente mais tarde.");
    }
  };


  // Alternar o estado de expansão
  const toggleExpand = (id) => {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // Função para filtrar checklists pela data selecionada
  const handleDateFilter = (event) => {
    const date = event.target.value;
    setSelectedDate(date);

    if (date) {
      const filtered = checklists.filter((checklist) => {
        const checklistDate = new Date(checklist.createdAt).toISOString().split('T')[0];
        return checklistDate === date;
      });
      setFilteredChecklists(filtered);
    } else {
      setFilteredChecklists(checklists); // Mostra todos se a data for limpa
    }
  };

  useEffect(() => {
    fetchChecklists();
  }, []);

  return (
    <div className="checklist-history">
      
      <a href='/gestao' className='botao-a-home'>Voltar</a>
      <h2>Histórico de Checklist</h2>
      <div className="filter-container">
        <label htmlFor="dateFilter">Filtrar por data:</label>
        <input
          type="date"
          id="dateFilter"
          value={selectedDate}
          onChange={handleDateFilter}
        />
      </div>
      <div className="checklist-list">
        {filteredChecklists.length === 0 ? (
          <p>Nenhum checklist encontrado.</p>
        ) : (
          filteredChecklists.map((checklist) => (
            <div key={checklist._id} className="checklist-item">
              <div className="checklist-summary">
                <p><strong>Veículo:</strong> {checklist.veiculo}</p>
                <p><strong>Motorista:</strong> {checklist.motorista || "Não informado"}</p>
                <button
                  className="expand-button"
                  onClick={() => toggleExpand(checklist._id)}
                >
                  {expanded[checklist._id] ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
              {expanded[checklist._id] && (
                <div className="checklist-details">
                  <p><strong>Limpeza interna do Veículo:</strong> {checklist.limpesaDoVeiculo || "Não informado"}</p>
                  <p><strong>Óleo do Motor:</strong> {checklist.oleoMotor || "Não informado"}</p>
                  <p><strong>Água do Radiador:</strong> {checklist.aguaRadiador || "Não informado"}</p>
                  <p><strong>Transmissão:</strong> {checklist.transmissao || "Não informado"}</p>
                  <p><strong>Freios:</strong> {checklist.freios || "Não informado"}</p>
                  <p><strong>Pneus Dianteiros:</strong> {checklist.pneusDianteiro || "Não informado"}</p>
                  <p><strong>Pneus Traseiros:</strong> {checklist.pneusTraseiros || "Não informado"}</p>
                  <p><strong>Farol Direito:</strong> {checklist.farolDireito || "Não informado"}</p>
                  <p><strong>Farol Esquerdo:</strong> {checklist.farolEsquerdo || "Não informado"}</p>
                  <p><strong>Lanterna Direita:</strong> {checklist.lanternaDireita || "Não informado"}</p>
                  <p><strong>Lanterna Esquerda:</strong> {checklist.lanternaEsquerda || "Não informado"}</p>
                  <p><strong>Ar-Condicionado:</strong> {checklist.arCondicionado || "Não informado"}</p>
                  {checklist.observacao && <p><strong>Observação:</strong> {checklist.observacao}</p>}
                  {checklist.foto && (
                    <div className="imagem-container">
                      <p><strong>Imagem anexada:</strong></p>
                      <img src={`https://checklist-veiculos.onrender.com/uploads/${checklist.foto}`} alt="Imagem do checklist" className="imagem-checklist" />
                    </div>
                  )}
                  <p className="data-atualizada">
                    <strong>Data:</strong> {checklist.createdAt ? new Date(checklist.createdAt).toLocaleDateString() : "Não informado"} ⏳
                    <strong> Hora:</strong> {checklist.createdAt ? new Date(checklist.createdAt).toLocaleTimeString() : "Não informado"}
                  </p>
                </div>
              )}
              <div className="checklist-actions">
                <button
                  className="delete-button"
                  onClick={() => deleteChecklist(checklist._id)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChecklistHistory;
