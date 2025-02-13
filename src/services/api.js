import axios from "axios"

const api = axios.create({
    baseURL: "https://checklist-veiculos.onrender.com",
  });
  
  export default api;