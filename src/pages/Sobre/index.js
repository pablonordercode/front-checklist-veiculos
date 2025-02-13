import React from "react";
import { Link } from "react-router-dom"; // Importando o hook useHistory para navegação
import "./Sobre.css"; // Importa o CSS para a estilização

function Sobre() {


  return (
    <div className="sobre-container">
      <h1>Sobre o Checklist Veicular</h1>
      
      <p className="descricao">
        Antes de pegar o carro e sair para trabalhar, é essencial garantir que o veículo esteja em perfeito
        estado de funcionamento. O checklist veicular é uma ferramenta crucial para a manutenção preventiva e a
        segurança no trânsito. Ao realizar esse procedimento, você assegura que todos os itens do carro, desde
        os pneus até o sistema de freios e luzes, estejam operando corretamente, minimizando o risco de falhas ou
        acidentes durante o uso.
      </p>

      <p className="descricao">
        Em nossa empresa, temos um compromisso com a segurança e o bem-estar de todos. Os carros que utilizamos
        são propriedade da empresa, e por isso, devemos tratá-los com o maior cuidado e respeito. Ao realizar o
        checklist veicular, você ajuda a manter os veículos em bom estado e garante que todas as normas de
        segurança sejam seguidas. Isso não só evita custos com reparos inesperados, mas também contribui para a
        redução de acidentes e imprevistos, garantindo que todos possam realizar suas atividades com tranquilidade.
      </p>

      <p className="descricao">
        Lembre-se, o cuidado com o veículo é responsabilidade de todos. Faça o checklist de forma completa e
        minuciosa antes de pegar o carro para trabalhar. A segurança vem em primeiro lugar!
      </p>

      {/* Botão de voltar para a home */}
      <Link className="btn-voltar" to="/home">Voltar para Home</Link>
      
    </div>
  );
}

export default Sobre;
