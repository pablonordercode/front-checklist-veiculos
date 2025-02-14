import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CheckList.css";
import { Link, useNavigate } from "react-router-dom"; 
import { RiArrowGoBackLine } from "react-icons/ri";

function CheckList() {
  const [motoristas, setMotoristas] = useState([]);
  const [imagem, setImagem] = useState(null);
  const [checklist, setChecklist] = useState({
    veiculo: "",
    limpesaDoVeiculo: "",
    oleoMotor: "",
    aguaRadiador: "",
    transmissao: "",
    freios: "",
    pneusDianteiro: "",
    pneusTraseiros: "",
    farolDireito: "",
    farolEsquerdo: "",
    lanternaDireita: "",
    lanternaEsquerda: "",
    arCondicionado: "",
    observacao: "", // Agora um campo de texto
    motorista: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://checklist-veiculos.onrender.com/motorista/buscarmotorista")
      .then((res) => setMotoristas(res.data))
      .catch((error) => console.error("Erro ao buscar motoristas:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChecklist((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImagemChange = (e) => {
    setImagem(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(checklist).forEach((key) => {
      formData.append(key, checklist[key]);
    });

    if (imagem) {
      formData.append("foto", imagem);
    }

    try {
      await axios.post("https://checklist-veiculos.onrender.com/checklist/addchecklist", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Checklist salvo com sucesso!");
      setChecklist({
        veiculo: "",
        limpesaDoVeiculo: "",
        oleoMotor: "",
        aguaRadiador: "",
        transmissao: "",
        freios: "",
        pneusDianteiro: "",
        pneusTraseiros: "",
        farolDireito: "",
        farolEsquerdo: "",
        lanternaDireita: "",
        lanternaEsquerda: "",
        arCondicionado: "",
        observacao: "",
        motorista: "",
      });
      setImagem(null);
      navigate("/home");

    } catch (error) {
      const msg = error.response?.data?.msg || "Erro ao salvar checklist.";
      console.error("Erro ao salvar checklist:", msg);
      alert(msg);
    }
  };

  return (
    <div className="home-container">
      <div>
        <Link className="btn-voltar--his" to="/home"><RiArrowGoBackLine /></Link>
      </div>
      <h2>Check-list de Veículo</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Veículo:
          <select name="veiculo" value={checklist.veiculo} onChange={handleChange} required>
            <option value="">Selecione um veículo</option>
            <option value="S-10">S-10</option>
            <option value="Estrada">Estrada</option>
            <option value="Fiorino">Fiorino</option>
            <option value="Gol preto">Gol preto</option>
            <option value="L-200">L-200</option>
          </select>
        </label>

        <label>
          Motorista:
          <select name="motorista" value={checklist.motorista} onChange={handleChange} required>
            <option value="">Selecione o motorista</option>
            {motoristas.map((motorista, index) => (
              <option key={index} value={motorista.nome}>
                {motorista.nome}
              </option>
            ))}
          </select>
        </label>

        {[
          "oleoMotor",
          "limpesaDoVeiculo",
          "aguaRadiador",
          "transmissao",
          "freios",
          "pneusDianteiro",
          "pneusTraseiros",
          "farolDireito",
          "farolEsquerdo",
          "lanternaDireita",
          "lanternaEsquerda",
          "arCondicionado",
        ].map((item) => (
          <label key={item}>
            {item.replace(/([A-Z])/g, " $1")}:
            <select name={item} value={checklist[item]} onChange={handleChange} required>
              <option value="">Selecione</option>
              <option value="OK">Ok</option>
              <option value="Observação">Observação</option>
            </select>
          </label>
        ))}

        {/* Campo de Observação corrigido */} 
        <label>
          Observação:
          <textarea name="observacao" value={checklist.observacao} onChange={handleChange} />
        </label>

        // <label>
        //   Adicionar Imagem:
        //   <input type="file" accept="image/*" onChange={handleImagemChange} />
        // </label>

        <button type="submit" className="start-checklist">Salvar Check-list</button>
      </form>
    </div>
  );
}

export default CheckList;

