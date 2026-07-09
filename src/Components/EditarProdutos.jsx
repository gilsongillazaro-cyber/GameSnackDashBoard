import "../Styles/EditarProdutos.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "react-toastify";
import api from "../services/api";
import { useRef, useState } from "react";
dayjs.extend(relativeTime);

function EditarProduto({ estado, setUser, user, funcao }) {
  const nome = useRef();
  const descricao = useRef();
  const [foto, setFoto] = useState();
  const texto = useRef();
  const preco = useRef();
  const pN = useRef();
  const loadN = useRef();
  const pD = useRef();
  const loadD = useRef();
  const pP = useRef();
  const loadP = useRef();
  const pF = useRef();
  const loadF = useRef();
  async function EliminarProduto() {
    try {
      const token = localStorage.getItem("GameSnackToken");
      const response = await api.delete(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/produtos/deletar/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(response.data.mensagem, {
        position: "top-center",
      });

      funcao();
      estado(false);
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }

  async function EditarNome() {
    pN.current.style.display = "none";
    loadN.current.style.display = "block";
    try {
      const token = localStorage.getItem("GameSnackToken");
      const response = await api.put(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/produtos/atualizar/nome/${user._id}`,
        {
          nome: nome.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(response.data.mensagem);
      funcao();
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
  async function EditarDescricao() {
    pD.current.style.display = "none";
    loadD.current.style.display = "block";
    try {
      const token = localStorage.getItem("GameSnackToken");
      const response = await api.put(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/produtos/atualizar/descricao/${user._id}`,
        {
          descricao: descricao.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(response.data.mensagem);
      funcao();
      pD.current.style.display = "block";
      loadD.current.style.display = "none";
      descricao.current.value = "";
    } catch (erro) {
      pD.current.style.display = "block";
      loadD.current.style.display = "none";

      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  async function EditarPreco() {
    pP.current.style.display = "none";
    loadP.current.style.display = "block";
    try {
      const token = localStorage.getItem("GameSnackToken");
      const response = await api.put(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/produtos/atualizar/preco/${user._id}`,
        {
          preco: preco.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(response.data.mensagem, {
        position: "top-center",
      });
      funcao();
      pP.current.style.display = "block";
      loadP.current.style.display = "none";
      preco.current.value = "";
    } catch (erro) {
      pP.current.style.display = "block";
      loadP.current.style.display = "none";

      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  async function EditarFoto() {
    pF.current.style.display = "none";
    loadF.current.style.display = "block";
    try {
      const token = localStorage.getItem("GameSnackToken");
      const formData = new FormData();
      formData.append("foto", foto);
      const response = await api.put(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/produtos/atualizar/foto/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUser(response.data.atualizado);
      toast.success(response.data.mensagem, {
        position: "top-center",
      });
      texto.current.innerHTML = `<i class="bi bi-image"></i> trocar foto do produto`;
      texto.current.style.color = "black";
      setFoto("");
      funcao();
      pF.current.style.display = "block";
      loadF.current.style.display = "none";
    } catch (erro) {
      pF.current.style.display = "block";
      loadF.current.style.display = "none";

      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  return (
    <div
      className="EditarProduto"
      onClick={(e) => {
        if (e.target.className === "EditarProduto") {
          estado(false);
        }
      }}
    >
      <div className="coneiner">
        <div className="Sima">
          <img src={user?.foto} alt="" />
          <div className="detalhes">
            <div className="quantidades">
              <div>
                <p>
                  <span> estrelas</span> <i class="bi bi-star-fill"></i>
                </p>
                <h3>{user?.estrelas}</h3>
              </div>
              <div>
                <p>
                  <span>comentarios</span> <i class="bi bi-chat-fill"></i>
                </p>
                <h3>{user?.comentarios?.length}</h3>
              </div>
              <div>
                <p>
                  <span> adiconado aos favoritos</span>
                  <i class="bi bi-bookmark-plus-fill"></i>
                </p>
                <h3>{user?.adiconadoFavorito}</h3>
              </div>
            </div>
            <div className="inffo">
              <p>
                <i class="bi bi-currency-dollar"></i> preço:{" "}
                <strong>
                  {user?.preco.toLocaleString("pt-ao", {
                    style: "currency",
                    currency: "AOA",
                  })}
                </strong>
              </p>
              <p>
                <i class="bi bi-box-seam-fill"></i>
                nome do produto:
                <strong> {user?.nome}</strong>
              </p>
              <p>
                <i class="bi bi-file-text-fill"></i>
                descrição do produto:
                <strong>{user?.descricao}</strong>
              </p>
              <p>
                <i class="bi bi-calendar2-check-fill"></i> criada em:{" "}
                <strong>
                  {" "}
                  {`${dayjs(user?.createdAt).format("DD/MM/YYYY HH:mm")} já ${dayjs(user?.createdAt).fromNow()}`}
                </strong>
              </p>
              <p>
                <i class="bi bi-calendar2-week-fill"></i> atualiza em:{" "}
                <strong>
                  {" "}
                  {`${dayjs(user?.updatedAt).format("DD/MM/YYYY HH:mm")} já ${dayjs(user?.updatedAt).fromNow()}`}
                </strong>
              </p>
              <p>
                <i class="bi bi-grid"></i> categoria geral:{" "}
                <strong>{user?.categoriaGeral}</strong>
              </p>
              <p>
                <i class="bi bi-tag"></i> categoria especifica:{" "}
                <strong>
                  {user?.categoriaEspecifica
                    ? user?.categoriaEspecifica
                    : "não definida"}
                </strong>
              </p>
            </div>
          </div>
        </div>

        <div className="Baiixo">
          <div>
            <input
              type="text"
              placeholder="Trocar Nome do produto"
              ref={nome}
            />
            <button onClick={EditarNome}>
              <p ref={pN}>atualizar</p>
              <h1 className="load" ref={loadN}>
                <i class="bi bi-arrow-repeat"></i>
              </h1>
            </button>
          </div>
          <div>
            <input
              type="text"
              placeholder="Trocar descrição do produto"
              ref={descricao}
            />
            <button onClick={EditarDescricao}>
              <p ref={pD}>atualizar</p>
              <h1 className="load" ref={loadD}>
                <i class="bi bi-arrow-repeat"></i>
              </h1>
            </button>
          </div>
          <div>
            <input
              type="number"
              placeholder="Trocar preço do produto"
              ref={preco}
            />
            <button onClick={EditarPreco}>
              <p ref={pP}>atualizar</p>
              <h1 className="load" ref={loadP}>
                <i class="bi bi-arrow-repeat"></i>
              </h1>
            </button>
          </div>{" "}
          <div>
            <label htmlFor="as">
              <p ref={texto}>
                <i class="bi bi-image"></i> trocar foto do produto
              </p>
              <input
                type="file"
                accept="image/*"
                id="as"
                onChange={(e) => {
                  setFoto(e.target.files[0]);
                  texto.current.innerHTML = `<i class="bi bi-image-fill"></i> foto selecionada`;
                  texto.current.style.color = "blue";
                }}
              />
            </label>
            <button onClick={EditarFoto}>
              <p ref={pF}>atualizar</p>
              <h1 className="load" ref={loadF}>
                <i class="bi bi-arrow-repeat"></i>
              </h1>
            </button>
          </div>
          <button id="eli" onClick={EliminarProduto}>
            eliminar produto
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditarProduto;
