import Header from "../Components/Header";
import "../Styles/Produtos.css";
import EditarProduto from "../Components/EditarProdutos";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
function Produtos() {
  const [monstra, setMonstra] = useState(false);
  const navigate = useNavigate();
  const [dados, setDados] = useState();
  const [produtos, setProdutos] = useState([]);
  const [user, setUser] = useState();
  const [Pesquisados, SetPesquisados] = useState(null);
  const nomeP = useRef();
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
    PegarProdutos();
  }, []);
  async function PesquisarProdutos() {
    try {
      const Token = localStorage.getItem("GameSnackToken");
      if (!Token) {
        toast.warning("não tens acesso pra buscar produtos", {
          position: "top-center",
        });
        return;
      }
      const response = await api.get(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/buscar/produtos`,
        {
          params: {
            nome: nomeP.current.value,
          },
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      SetPesquisados(response.data.produtos);
    } catch (erro) {
      nomeP.current.value = "";
      SetPesquisados(null);
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  async function PegarProdutos() {
    try {
      const Token = localStorage.getItem("GameSnackToken");
      if (!Token) {
        return navigate("/login");
      }
      const response = await api.get(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/produtos`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );

      setProdutos(response.data.produtos);
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }

  const lista = Pesquisados !== null ? Pesquisados : produtos;
  return (
    <div className="Produtos">
      {monstra && (
        <EditarProduto
          estado={setMonstra}
          user={user}
          setUser={setUser}
          funcao={PegarProdutos}
        />
      )}
      <Header onde={"produtos"} perfil={dados} />
      <div className="centra">
        <input
          type="seaerch"
          ref={nomeP}
          placeholder="digite o nome do produto"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              PesquisarProdutos();
            }
          }}
        />
        <button onClick={PesquisarProdutos}>
          <i class="bi bi-search"></i>
        </button>
      </div>
      <h2 id="h1d">todos os produtos no stoke</h2>
      <p>
        quantidade total: <span>{produtos.length}</span>
      </p>
      <p>
        jogos:{" "}
        <span>
          {produtos.filter((u) => u.categoriaGeral === "jogos").length}
        </span>
      </p>
      <p>
        snacks:{" "}
        <span>
          {produtos.filter((u) => u.categoriaGeral === "snacks").length}
        </span>
      </p>
      <ul>
        {produtos.length > 0 ? (
          lista
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((produto) => (
              <li
                onClick={() => {
                  setMonstra(true);
                  setUser(produto);
                }}
                key={produto?._id}
              >
                <img src={produto?.foto} alt="" />
                <h1>{produto?.nome}</h1>
                <button onClick={() => setMonstra(true)}>ver detalhes</button>
              </li>
            ))
        ) : (
          <div id="div">
            <h3>
              <i class="bi bi-person-fill-x"></i> sem produtos no stoke
            </h3>
          </div>
        )}
      </ul>
    </div>
  );
}
export default Produtos;
