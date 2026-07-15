import "../Styles/Inicio.css";
import Header from "../Components/Header";
import Grafico from "../Components/Grafico";
import Totais from "../Components/totais";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import Navegar from "../Components/navegar";
function Inicio() {
  const navigate = useNavigate();
  const [dados, setDados] = useState();
  async function Pegar() {
    const Token = localStorage.getItem("GameSnackToken");
    if (!Token) {
      return navigate("/login");
    }
    try {
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
        erro.response.data.mensagem ===
        "erro ao carregar os seus dados verifique sua ligação a internet"
      ) {
        toast.error(erro.response.data.mensagem, {
          position: "top-center",
        });
      } else {
        toast.warning("não tens acesso! faça login", {
          position: "top-center",
        });
        navigate("/login");
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
      <Navegar />
      <Totais />
    </div>
  );
}
export default Inicio;
