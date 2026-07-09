import "../Styles/Inicio.css";
import Header from "../Components/Header";
import Grafico from "../Components/Grafico";
import Totais from "../Components/totais";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
function Inicio() {
  const navigate = useNavigate();
  const [dados, setDados] = useState();
  async function Pegar() {
    try {
      const Token = localStorage.getItem("GameSnackToken");
      if (!Token) {
        return navigate("/login");
      }
      const response = await api.get(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/perfil`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      setDados(response.data.perfil);
    } catch (erro) {
      if (
        erro.response.data.mensagem === "acesso negaddo" ||
        erro.response.data.mensagem === "token invalido"
      ) {
        toast.error(erro.response.data.mensagem, {
          position: "top-center",
        });
        return navigate("/login");
      } else {
        toast.warning(erro.response.data.mensagem, {
          position: "top-center",
        });
      }
    }
  }
  useEffect(() => {
    Pegar();
  }, []);

  return (
    <div className="Inicio">
      <Header onde={"administração"} perfil={dados} />
      <Grafico />
      <Totais />
    </div>
  );
}
export default Inicio;
