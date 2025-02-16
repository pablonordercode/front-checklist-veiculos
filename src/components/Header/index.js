import React, { useEffect, useState } from "react";
import "./Header.css"; // Arquivo CSS para estilização

function Header() {
  const [vigia, setVigia] = useState("Carregando...");
  const [motoristas, setMotoristas] = useState([]);

  // Dados fixos sobre o plantão para a sequência de vigia e motoristas
  const plantaoData = [
    { vigia: "Justino", motoristas: ["Marcinho", "Janiel"] },
    { vigia: "Novim", motoristas: ["Paulinho", "Pablo"] },
    { vigia: "João", motoristas: ["Alberto", "Janiel"] },
    { vigia: "Edilson", motoristas: ["Gonsalinho", "Pablo"] },
    
  ];

  // Função para determinar o plantão do dia considerando as 6h da manhã
  const getPlantaoDoDia = () => {
    const agora = new Date();
    const hora = agora.getHours();
    
    // Verifica se é antes das 6h da manhã, se sim, usa o dia anterior
    const diaDaSemana = agora.getDay();
    const index = (hora < 6 ? diaDaSemana - 1 : diaDaSemana + 0) % plantaoData.length;
    
    // Se o índice for negativo (exemplo: domingo antes das 6h), volta para o último da lista
    const plantaoIndex = index < 0 ? plantaoData.length - 1 : index;

    return plantaoData[plantaoIndex];
  };

  useEffect(() => {
    const plantaoDoDia = getPlantaoDoDia();
    setVigia(plantaoDoDia.vigia); // Define o vigia do dia
    setMotoristas(plantaoDoDia.motoristas); // Define os motoristas do dia
  }, []);

  return (
    <div className="header-top">
      <h1 className="heaer-h1">Plantão</h1>
      <p className="header-p"><strong>Vigia:</strong> {vigia}</p>
      <p className="header-p"><strong>Motoristas:</strong> {motoristas.length > 0 ? motoristas.join(", ") : "Não informado"}</p>
    </div>
  );
}

export default Header;
