import Header from "../Components/Header";
import ListaUsuarios from "../Components/ListaUsuarios";
import "../Styles/usuarios.css";
import EditarUsuarios from "../Components/EditarUsuarios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import Navegar from "../Components/navegar";
function Usuarios() {
  const [monstrar, SetMonstrar] = useState(false);
  const navigate = useNavigate();
  const nomeP = useRef();
  const [dados, setDados] = useState();
  const [usuarios, setUsuarios] = useState([]);
  const [idUsuario, setIdUsuario] = useState();
  const [Pesquisado, setPesquisado] = useState(null);
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
  async function PegarUsuarios() {
    try {
      const Token = localStorage.getItem("GameSnackToken");
      if (!Token) {
        return navigate("/login");
      }
      const response = await api.get(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/usuarios`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );

      setUsuarios(response.data.usuarios);
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  async function UsuariosPesquisados() {
    try {
      const Token = localStorage.getItem("GameSnackToken");
      if (!Token) {
        toast.warning("não tens acesso pra buscar usuarios", {
          position: "top-center",
        });
        return;
      }
      const response = await api.get(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/buscar/usuarios`,
        {
          params: {
            nome: nomeP.current.value,
          },
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );

      setPesquisado(response.data.usuarios);
    } catch (erro) {
      setPesquisado(null);
      nomeP.current.value = "";
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  useEffect(() => {
    Pegar();
    PegarUsuarios();
  }, []);

  return (
    <div className="usuarios">
      {monstrar && (
        <EditarUsuarios
          estado={SetMonstrar}
          idUsuario={idUsuario}
          PegarUsuarios={PegarUsuarios}
        />
      )}
      <Header onde={"usuarios"} perfil={dados} />
      <div className="Cont">
        <div className="AreaPes">
          <input
            type="search"
            ref={nomeP}
            placeholder="digite o nome do usuario"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                UsuariosPesquisados();
              }
            }}
          />
          <button onClick={UsuariosPesquisados}>
            <i class="bi bi-search"></i>
          </button>
        </div>
        <h2 id="h1">todos os usuarios cadastrados</h2>
        <Navegar />
        <p>
          quantidade total: <span>{usuarios.length}</span>
        </p>
        <ListaUsuarios
          estado={SetMonstrar}
          usuarios={usuarios}
          Pesquisado={Pesquisado}
          idUsuario={setIdUsuario}
        />
      </div>
    </div>
  );
}
export default Usuarios;
