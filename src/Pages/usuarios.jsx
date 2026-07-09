import Header from "../Components/Header";
import ListaUsuarios from "../Components/ListaUsuarios";
import "../Styles/usuarios.css";
import EditarUsuarios from "../Components/EditarUsuarios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
function Usuarios() {
  const [monstrar, SetMonstrar] = useState(false);
  const navigate = useNavigate();
  const nomeP = useRef();
  const [dados, setDados] = useState();
  const [usuarios, setUsuarios] = useState([]);
  const [idUsuario, setIdUsuario] = useState();
  const [Pesquisado, setPesquisado] = useState(null);
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
        <div>
          <input
            type="search"
            ref={nomeP}
            placeholder="digite o nome do usuario"
          />
          <button onClick={UsuariosPesquisados}>
            <i class="bi bi-search"></i>
          </button>
        </div>
        <h1 id="h1">todos os usuarios cadastrados</h1>
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
