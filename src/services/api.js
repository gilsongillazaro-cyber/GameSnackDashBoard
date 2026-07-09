import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_Minha_Api,
});

export default api;
