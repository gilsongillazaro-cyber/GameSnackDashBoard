import Header from "../Components/Header";
import "../Styles/Encomendas.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
function Encomendas() {
  const [Mais, setMais] = useState(null);

  const tot = useRef();
  const estado = useRef();
  const texto = useRef();
  const Load = useRef();
  const navigate = useNavigate();
  const [dados, setDados] = useState();
  const [encomendas, setEncomendas] = useState([]);
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
  async function PegarEncomendas() {
    const token = localStorage.getItem("GameSnackToken");
    if (!token) {
      toast.warning("acesso negado", {
        position: "top-center",
      });
      navigate("/login");
    }
    try {
      const response = await api.get(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/encomendas/pegar`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setEncomendas(response.data.encomendas);
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  async function AtualizarEstado(id) {
    texto.current.style.display = "none";
    Load.current.style.display = "block";
    const token = localStorage.getItem("GameSnackToken");
    if (!token) {
      toast.warning("acesso negado", {
        position: "top-center",
      });
      navigate("/login");
    }
    try {
      const response = await api.put(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/encomendas/atualizar/estado/${id}`,
        {
          estado: estado.current.value,
          total: tot.current.textContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response) {
        toast.success(response.data.mensagem, {
          position: "top-center",
        });
        texto.current.style.display = "block";
        Load.current.style.display = "none";
        PegarEncomendas();
      }
    } catch (erro) {
      texto.current.style.display = "block";
      Load.current.style.display = "none";

      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  useEffect(() => {
    Pegar();
    PegarEncomendas();
  }, []);
  return (
    <div className="Encomendas">
      <Header onde={"gestão de encomendas"} perfil={dados} />
      <h1>
        todas as encomendas <span>efetuadas</span>
      </h1>
      <ul>
        {encomendas.length > 0 ? (
          encomendas
            .slice()
            .reverse()
            .map((encomenda, index) => (
              <li key={encomenda._id}>
                <button onClick={() => setMais(Mais === index ? null : index)}>
                  <div className="quem">
                    <img src={encomenda?.foto} alt="" />
                    <h4>{encomenda?.nome}</h4>
                  </div>
                  <div className="data">
                    <h4>
                      data de encomenda:
                      {dayjs(encomenda?.createdAt).format("DD/MM/YYYY HH:mm")}
                    </h4>
                    <p>{dayjs(encomenda?.createdAt).fromNow()}</p>
                  </div>
                  <div className="estado">
                    <h4>estado</h4>
                    <p
                      style={{
                        color: encomenda?.estado === "pago" ? "green" : "red",
                      }}
                    >
                      {encomenda?.estado}
                    </p>
                  </div>
                  <div className={`girar ${Mais === index ? "rodar" : ""}`}>
                    <i class="bi bi-chevron-down"></i>
                  </div>
                </button>
                {Mais === index && (
                  <div>
                    <ul>
                      {encomenda?.encomendas.map((encomend) => (
                        <li key={encomend._id} className="Ji">
                          <p>
                            nome: <span>{encomend.nome}</span>
                          </p>
                          <p>
                            preco: <span>{encomend.preco}</span>
                          </p>
                          <p>
                            quantidade: <span>{encomend.quantidade}</span>
                          </p>
                        </li>
                      ))}
                    </ul>
                    <h2>
                      total:
                      <span>
                        {" "}
                        {encomenda?.total.toLocaleString("pt-AO", {
                          style: "currency",
                          currency: "AOA",
                        })}
                      </span>
                      <span ref={tot} style={{ display: "none" }}>
                        {encomenda?.total}
                      </span>
                    </h2>
                    {encomenda?.estado !== "pago" ? (
                      <div className="baaa">
                        <select ref={estado}>
                          <option value="">
                            {" "}
                            selecione o estado da encomenda
                          </option>
                          <option>não pago</option>
                          <option>pago</option>
                          <option>cancelado</option>
                        </select>
                        <button
                          id="bu"
                          onClick={() => AtualizarEstado(encomenda?._id)}
                        >
                          <p ref={texto}>atualizar</p>
                          <h2 className="load" ref={Load}>
                            <i class="bi bi-arrow-repeat"></i>
                          </h2>
                        </button>
                      </div>
                    ) : (
                      <p className="PAgo">
                        <i class="bi bi-emoji-sunglasses-fill"></i> encomenda
                        paga <i class="bi bi-calendar2-check-fill"></i>
                      </p>
                    )}
                  </div>
                )}
              </li>
            ))
        ) : (
          <h3 className="h3">
            <i class="bi bi-cart-x-fill"></i> sem encomendas
          </h3>
        )}
      </ul>
    </div>
  );
}
export default Encomendas;
