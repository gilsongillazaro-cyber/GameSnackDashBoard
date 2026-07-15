import Header from "../Components/Header";
import "../Styles/Opniões.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useState, useEffect, useRef } from "react";
import Navegar from "../Components/navegar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
function Opniões() {
  const navigate = useNavigate();
  const [dados, setDados] = useState();
  const [opnioes, setOpinioes] = useState([]);
  const [mensagens, setMensagens] = useState({});
  async function Get() {
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
  async function GetFeedbacks() {
    const Token = localStorage.getItem("GameSnackToken");
    if (!Token) {
      return navigate("/login");
    }
    try {
      const response = await api.get(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/pegar/feedbacks`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      setOpinioes(response.data.feedbacks);
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  async function DeleteFeedBack(IdFeedback) {
    const Token = localStorage.getItem("GameSnackToken");
    if (!Token) {
      return navigate("/login");
    }
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/remover/feedbacks/${IdFeedback}`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      toast.success(response.data.mensagem, {
        position: "top-center",
      });
      GetFeedbacks();
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  async function UpdateFeeBack(e, IdFeedback) {
    e.preventDefault();
    const Token = localStorage.getItem("GameSnackToken");
    if (!Token) {
      return navigate("/login");
    }
    try {
      const response = await api.put(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/atualizar/feedbacks/${IdFeedback}`,
        {
          novoFeed: mensagens[IdFeedback],
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      toast.success(response.data.mensagem, {
        position: "top-center",
      });
      GetFeedbacks();
      setMensagens("");
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }

  useEffect(() => {
    Get();
    GetFeedbacks();
  }, []);
  return (
    <div className="opnioes">
      <Header onde={"opniões dos clientes"} perfil={dados} />
      <h2>
        quantidade total de opniões <span>{opnioes.length}</span>
      </h2>
      <Navegar />
      <ul>
        {opnioes.length > 0 ? (
          opnioes
            .slice()
            .reverse()
            .map((op) => (
              <li key={op._id}>
                <div className="primeiro">
                  <img src={op.foto} alt="" />
                  <div>
                    <h3>{op.nome}</h3>
                    <p>{dayjs(op.updatedAt).fromNow()}</p>
                  </div>
                </div>
                <div className="mensagem">
                  <p>
                    {op.feedback}
                    <strong>
                      {Array.from({ length: op.estrelas }, (index) => (
                        <i key={index} class="bi bi-star-fill"></i>
                      ))}
                    </strong>
                  </p>

                  <button onClick={() => DeleteFeedBack(op._id)}>
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </div>
                <div className="editar">
                  <p>
                    <i class="bi bi-pen-fill"></i> edite está opnião
                  </p>
                  <form onSubmit={(e) => UpdateFeeBack(e, op._id)}>
                    <input
                      type="text"
                      placeholder="atualize está opnião"
                      value={mensagens[op._id] || ""}
                      onChange={(e) =>
                        setMensagens({
                          ...mensagens,
                          [op._id]: e.target.value,
                        })
                      }
                    />
                    <button>
                      <p>atualizar</p>{" "}
                      <h1 className="load">
                        <i class="bi bi-arrow-repeat"></i>
                      </h1>
                    </button>
                  </form>
                </div>
              </li>
            ))
        ) : (
          <h3 className="h3">sem opniões dos clientes</h3>
        )}
      </ul>
    </div>
  );
}

export default Opniões;
