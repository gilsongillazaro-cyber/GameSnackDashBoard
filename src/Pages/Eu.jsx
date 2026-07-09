import "../Styles/Eu.css";
import { useState, useEffect } from "react";
import EditarDados from "../Components/EditarDados";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import "dayjs/locale/pt.js";
dayjs.locale("pt");
import api from "../services/api.js";
function Eu() {
  const [AreaEditar, SetAreaEdiatar] = useState(false);
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
  useEffect(() => {
    console.log(dados);
  }, []);
  return (
    <div className="Eu">
      {AreaEditar && <EditarDados fecha={SetAreaEdiatar} atualizar={Pegar} />}
      <div className="topo">
        <img src={dados?.foto} alt="" />
        <div>
          <div className="sobre">
            <h1>{dados?.nome}</h1>
            <p>
              <a href={`mailto:${dados?.email}`} target="_blank">
                <i class="bi bi-envelope-at"></i> {dados?.email}
              </a>
            </p>
            <p>
              <a href={`tel:244${dados?.numero}`} target="_blank">
                <i class="bi bi-phone"></i>
                {dados?.numero}
              </a>
            </p>
          </div>
          <button onClick={() => SetAreaEdiatar(true)}>
            <i class="bi bi-pencil-square"></i> ediatar dados
          </button>
        </div>
      </div>
      <div className="Baixo">
        <h1>todos usuarios deletados por si!</h1>
        <h3>
          total: <span>{dados?.Deletados?.length}</span>
        </h3>
        <ul>
          {dados?.Deletados?.length > 0 ? (
            dados?.Deletados?.sort(
              (a, b) => new Date(b.data) - new Date(a.data),
            ).map((deletados) => (
              <li key={deletados._id}>
                <div className="cima">
                  <h5>{deletados?.nome}</h5>
                  <h5>
                    data de eliminacao:
                    {dayjs(deletados?.data).format("DD/MM/YYYY HH:mm")}
                  </h5>
                  <h5> {dayjs(deletados?.data).fromNow()}</h5>
                </div>
              </li>
            ))
          ) : (
            <h3 className="h3">
              <i class="bi bi-person-x-fill"></i> sem usuarios deletados por si
            </h3>
          )}
        </ul>
      </div>

      <button
        id="terminar"
        onClick={() => {
          const parar = toast.loading("terminando sua sessão...", {
            position: "top-center",
          });
          setInterval(() => {
            localStorage.removeItem("GameSnackToken");
            if (!localStorage.getItem("GameSnackToken")) {
              toast.dismiss(parar);
              navigate("/login");
            }
          }, 2000);
        }}
      >
        terminar sessão
      </button>
    </div>
  );
}
export default Eu;
