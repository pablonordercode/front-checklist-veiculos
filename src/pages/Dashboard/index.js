import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Dashboard.css";
import { Link } from "react-router-dom";

function Dashboard() {
  const [revelado, setRevelado] = useState(false);

  const frases = [
    "Acredite no seu potencial e conquiste o impossível! 🚀",
    "Cada checklist concluído é um passo para o sucesso! ✅",
    "O segredo do progresso está na consistência! 💪",
    "Hoje é um novo dia para evoluir e fazer a diferença! 🌟",
    "Suas ações diárias moldam seu futuro. Continue firme! 🔥",
    "O sucesso começa com uma atitude positiva! ✨",
"Cada pequeno progresso te leva mais perto da vitória! 🏆",
"Acredite no seu esforço, a recompensa está a caminho! 🎯",
"Nada é impossível para quem persiste! 🚀",
"Confie no processo e siga em frente! 💪",
"Você é mais forte do que imagina! 🔥",
"A disciplina é a chave para grandes conquistas! 🔑",
"Não tenha medo de falhar, tenha medo de não tentar! 💡",
"Seu esforço de hoje é o seu sucesso de amanhã! 📈",
"A jornada pode ser difícil, mas a vista lá de cima é incrível! ⛰️",
"Erga a cabeça, ajuste a postura e siga brilhando! 🌟",
"Acredite na sua capacidade e tudo se tornará possível! 🎯",
"Pequenas ações diárias constroem grandes resultados! 🏗️",
"O primeiro passo para vencer é começar! 🚶‍♂️",
"Toda grande jornada começa com um simples passo! 👣",
"Não deixe que os obstáculos apaguem seu brilho! 💫",
"Você já superou tanta coisa… continue firme! 🏋️‍♂️",
"A persistência faz o impossível se tornar realidade! ✨",
"Siga em frente, seu futuro é brilhante! 🌞",
"Trabalhe duro em silêncio e deixe o sucesso fazer barulho! 🔊",
"Não é sobre velocidade, é sobre consistência! 🚶‍♀️➡️🏃‍♂️",
"Seu potencial é ilimitado! 🌌",
"A energia que você coloca hoje define seu amanhã! ⚡",
"Faça o que é necessário até conseguir fazer o que é impossível! 🔥",
"Cada dia é uma nova chance de ser ainda melhor! 🌅",
"Você não precisa ser perfeito, apenas melhor do que ontem! ⏳"
  ];

  const mensagem = frases[Math.floor(Math.random() * frases.length)];

  return (
    <div className="mensagem-container">
      {!revelado ? (
        <motion.button
          className="botao-revelar"
          onClick={() => setRevelado(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Clique para revelar a mensagem do dia! 🎁
        </motion.button>
      ) : (
        <motion.div
          className="mensagem-box"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <p>{mensagem}</p>
          <motion.button
            className="botao-fechar"
            onClick={() => setRevelado(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Fechar ✖
          </motion.button>
        </motion.div>
      )}
      
      <div className="divVoltar">
      <Link className="btaoVoltar" to="/home">Home</Link>
      </div>
      
    </div>
  );
}

export default Dashboard;
