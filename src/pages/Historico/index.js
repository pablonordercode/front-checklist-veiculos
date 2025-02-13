import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { RiArrowGoBackLine } from "react-icons/ri";
import "./historico.css";
import { Link } from "react-router-dom";
import Footerhistorico from "../../components/Footer-historico";

function Historico() {
  const [historico, setHistorico] = useState([]);
  const [dataFiltro, setDataFiltro] = useState("");
  const [openChecklist, setOpenChecklist] = useState(null); // Estado para abrir/fechar checklist
  const [modalAberto, setModalAberto] = useState(false); // Estado para o modal
  const [senhaDigitada, setSenhaDigitada] = useState(""); // Estado para a senha digitada
  const [checklistSelecionado, setChecklistSelecionado] = useState(null); // Checklist a ser apagado
  const [mensagemStatus, setMensagemStatus] = useState(null); // Estado para as mensagens

  useEffect(() => {
    const buscarHistorico = async () => {
      try {
        const res = await axios.get(
          "https://checklist-veiculos.onrender.com/checklist/listarchecklist"
        );

        if (Array.isArray(res.data)) {
          const sortedHistorico = res.data
            .filter((item) => item.createdAt)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setHistorico(sortedHistorico);
        } else {
          console.error("Resposta do servidor não é um array:", res.data);
          setHistorico([]);
        }
      } catch (error) {
        console.error("Erro ao buscar histórico:", error);
        setHistorico([]);
      }
    };

    buscarHistorico();
  }, []);

  const abrirModal = (id) => {
    setChecklistSelecionado(id); // Define qual checklist será apagado
    setModalAberto(true); // Abre o modal
  };

  const fecharModal = () => {
    setModalAberto(false); // Fecha o modal
    setSenhaDigitada(""); // Limpa o campo de senha
    setChecklistSelecionado(null); // Reseta o checklist selecionado
  };

  const apagarChecklist = async () => {
    try {
      // Faz a solicitação para apagar o checklist
      const response = await axios.delete(
        `https://checklist-veiculos.onrender.com/checklist/apagarchecklist/${checklistSelecionado}`
      );
  
      // Verifica se a resposta foi bem-sucedida
      if (response.status === 200) {
        // Atualiza o histórico removendo o checklist apagado
        setHistorico((prevHistorico) =>
          prevHistorico.filter((item) => item._id !== checklistSelecionado)
        );
        setMensagemStatus({
          tipo: "sucesso",
          mensagem: "Checklist apagado com sucesso!",
        });
      } else {
        setMensagemStatus({
          tipo: "erro",
          mensagem: "Erro inesperado ao apagar o checklist. Tente novamente.",
        });
      }
    } catch (error) {
      console.error("Erro ao apagar checklist:", error);
      setMensagemStatus({
        tipo: "erro",
        mensagem: error.response?.data?.mensagem || "Erro ao apagar o checklist. Tente novamente.",
      });
    } finally {
      fecharModal(); // Garante que o modal será fechado em qualquer situação
    }
  };
  
  
  const historicoFiltrado = dataFiltro
    ? historico.filter((checklist) => {
        if (!checklist.createdAt) return false;
        const dataChecklist = new Date(checklist.createdAt).toISOString().split("T")[0];
        return dataChecklist === dataFiltro;
      })
    : historico;

  const toggleChecklist = (id) => {
    setOpenChecklist(openChecklist === id ? null : id); // Alterna entre abrir e fechar o checklist
  };

  return (
    <div className="historico-container">
      <div>
        <Link className="btn-voltarHome" to="/home"><RiArrowGoBackLine /></Link>
      </div>
      <h1>Histórico de Checklists</h1>

      <div className="filtro-data">
        <label htmlFor="dataFiltro"><strong>Filtrar por Data:</strong></label>
        <input
          type="date"
          id="dataFiltro"
          value={dataFiltro}
          onChange={(e) => setDataFiltro(e.target.value)}
        />
        {dataFiltro && (
          <button onClick={() => setDataFiltro("")} className="btn-limpar">
            Limpar Filtro
          </button>
        )}
      </div>

      {mensagemStatus && (
        <div className={`mensagem ${mensagemStatus.tipo}`}>
          {mensagemStatus.mensagem}
        </div>
      )}

      {historicoFiltrado.length === 0 ? (
        <p className="mensagem">Nenhum checklist encontrado para esta data.</p>
      ) : (
        historicoFiltrado.map((checklist) => (
          <div key={checklist._id} className="card">
            <div className="card-header" onClick={() => toggleChecklist(checklist._id)}>
              <p>Clicar para ver o checklist inteiro!</p>
              <h2 className="nome-veiculo">Veículo: {checklist.veiculo}</h2>
    
            </div>
            {openChecklist === checklist._id && (
              <div className="card-details">
                <div className="container-paragrafos">
                  <p><strong>Motorista:</strong> {checklist.motorista || "Não informado"}</p>
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
              </div>
            )}
          </div> 
        ))
      )}

      {/* Modal de Confirmação */}
      {modalAberto && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmação de Exclusão</h2>
            <p>Digite a senha para apagar este checklist:</p>
            <input
              type="password"
              value={senhaDigitada}
              onChange={(e) => setSenhaDigitada(e.target.value)}
              placeholder="Digite a senha"
            />
            <div className="modal-actions">
              <button className="btn-confirmar" onClick={apagarChecklist}>
                Confirmar
              </button>
              <button className="btn-cancelar" onClick={fecharModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footerhistorico />
    </div>
  );
}

export default Historico;
