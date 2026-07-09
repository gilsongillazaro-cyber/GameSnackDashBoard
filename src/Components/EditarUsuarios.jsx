import "../Styles/EdiatarUsuario.css";
import api from "../services/api";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs from "dayjs";
function EditarUsuarios({ estado, idUsuario, PegarUsuarios }) {
  const [fotoG, setFoto] = useState();
  const navigate = useNavigate();
  const nome = useRef();
  const p = useRef();
  const pF = useRef();
  const loadF = useRef();
  const pN = useRef();
  const loadN = useRef();
  const [usuario, setUsuario] = useState();
  async function PegarDetalhes() {
    try {
      const Token = localStorage.getItem("GameSnackToken");
      if (!Token) {
        return navigate("/login");
      }
      const response = await api.get(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/usuarios/detalhes/${idUsuario}`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      setUsuario(response.data.usuario);
    } catch (erro) {
      toast.error(erro.response.data, {
        position: "top-center",
      });
    }
  }
  useEffect(() => {
    PegarDetalhes();
  }, []);

  async function eliminarUsuario() {
    try {
      const Token = localStorage.getItem("GameSnackToken");
      if (!Token) {
        return navigate("/login");
      }

      const response = await api.delete(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/usuarios/deletar/${idUsuario}`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );

      toast.success(response.data.mensagem, {
        position: "top-center",
      });
      PegarUsuarios();
      estado(false);
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  async function AtualizarFoto() {
    pF.current.style.display = "none";
    loadF.current.style.display = "block";
    try {
      const Token = localStorage.getItem("GameSnackToken");
      if (!Token) {
        return navigate("/login");
      }
      const formData = new FormData();
      formData.append("foto", fotoG);
      const response = await api.put(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/usuarios/atualizar/foto/${idUsuario}`,

        formData,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );

      toast.success(response.data.mensagem, {
        position: "top-center",
      });
      PegarUsuarios();
      pF.current.style.display = "block";
      loadF.current.style.display = "none";
      setFoto("");
      PegarDetalhes();
      p.current.innerHTML = `<i class="bi bi-image-fill"></i> trocar foto`;
      p.current.style.color = "black";
    } catch (erro) {
      pF.current.style.display = "block";
      loadF.current.style.display = "none";

      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  async function AtualizarNome() {
    pN.current.style.display = "none";
    loadN.current.style.display = "block";
    try {
      const Token = localStorage.getItem("GameSnackToken");
      if (!Token) {
        return navigate("/login");
      }
      const response = await api.put(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/usuarios/atualizar/nome/${idUsuario}`,
        {
          nome: nome.current.value,
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
      PegarUsuarios();
      pN.current.style.display = "block";
      loadN.current.style.display = "none";
      nome.current.value = "";
    } catch (erro) {
      pN.current.style.display = "block";
      loadN.current.style.display = "none";

      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  return (
    <div
      className="EditarUsuarios"
      onClick={(e) => {
        if (e.target.className === "EditarUsuarios") {
          estado(false);
        }
      }}
    >
      <div className="container">
        <div className="ToP">
          <img src={usuario?.foto} alt="" />
          <div>
            <p>
              identificador do usuario: <strong>{usuario?.nomeUsuario}</strong>
            </p>
            <p>
              nome do usuario: <strong>{usuario?.nome}</strong>
            </p>
            <p>
              email do usuario:{" "}
              <strong>
                {" "}
                <a href={`mailto:${usuario?.email}`}>{usuario?.email}</a>
              </strong>
            </p>
            <p>
              data de criação da conta:
              <strong>
                {" "}
                {usuario?.createdAt
                  ? dayjs(usuario.createdAt).format("DD/MM/YYYY HH:mm")
                  : "Carregando..."}
              </strong>
            </p>
            <p>
              ultima atualização em:{" "}
              <strong>
                {" "}
                {usuario?.updatedAt
                  ? dayjs(usuario.updatedAt).format("DD/MM/YYYY HH:mm")
                  : "Carregando..."}{" "}
              </strong>
            </p>
            <button onClick={eliminarUsuario}>eliminar usuario</button>
          </div>
        </div>
        <div className="edit">
          <div>
            <label htmlFor="FT">
              <p ref={p}>
                <i class="bi bi-image-fill"></i> trocar foto{" "}
              </p>
              <input
                type="file"
                id="FT"
                accept="image/*"
                onChange={(e) => {
                  setFoto(e.target.files[0]);
                  p.current.innerHTML = `<i class="bi bi-image"></i> foto selecionada`;
                  p.current.style.color = "blue";
                }}
              />
            </label>
            <button
              onClick={() => {
                AtualizarFoto();
              }}
            >
              <p ref={pF}>trocar</p>
              <h1 className="load" ref={loadF}>
                <i class="bi bi-arrow-repeat"></i>
              </h1>
            </button>
          </div>
          <div>
            <input type="text" placeholder="mudar o nome" ref={nome} />
            <button onClick={AtualizarNome}>
              <p ref={pN}>trocar</p>
              <h1 className="load" ref={loadN}>
                <i class="bi bi-arrow-repeat"></i>
              </h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditarUsuarios;
