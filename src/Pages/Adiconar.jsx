import Header from "../Components/Header";
import "../Styles/Adicionar.css";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
function Adicionar() {
  const p = useRef();
  const navigate = useNavigate();
  const [dados, setDados] = useState();
  const [Fo, setFo] = useState();
  const nomeProduto = useRef();
  const precoProduto = useRef();
  const CategoriaGeral = useRef();
  const CategoriaEspecifica = useRef();
  useEffect(() => {
    console.log(Fo);
  }, [Fo]);
  const area = useRef();
  const texto = useRef();
  const load = useRef();
  function aumentar() {
    area.current.style.height = "auto";
    area.current.style.height = area.current.scrollHeight + "px";
  }

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
  async function AdicionarProduto(e) {
    texto.current.style.display = "none";
    load.current.style.display = "block";
    e.preventDefault();
    const token = localStorage.getItem("GameSnackToken");
    if (!token) {
      return navigate("/login");
    }
    try {
      const formData = new FormData();
      formData.append("foto", Fo);
      formData.append("nome", nomeProduto.current.value);
      formData.append("preco", precoProduto.current.value);
      formData.append("descricao", area.current.value);
      formData.append("categoriaGeral", CategoriaGeral.current.value);
      formData.append("categoriaEspecifica", CategoriaEspecifica.current.value);
      const response = await api.post(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/produtos/adicionar`,
        formData,
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
        load.current.style.display = "none";
        setFo("");
        nomeProduto.current.value = "";
        precoProduto.current.value = "";
        area.current.value = "";
        CategoriaGeral.current.value = "";
        CategoriaEspecifica.current.value = "";
        p.current.innerHTML = `<i class="bi bi-image"></i> foto do produto`;
        p.current.style.color = "black";
      }
    } catch (erro) {
      texto.current.style.display = "block";
      load.current.style.display = "none";

      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  useEffect(() => {
    Pegar();
  }, []);

  return (
    <div className="Adicionar">
      <Header onde={"adição de produtos"} perfil={dados} />
      <form action="">
        <input type="text" placeholder="nome do produto" ref={nomeProduto} />
        <input
          type="number"
          placeholder="preço do produto"
          ref={precoProduto}
        />
        <label htmlFor="foto">
          <p ref={p}>
            <i class="bi bi-image"></i> foto do produto
          </p>
          <input
            type="file"
            id="foto"
            accept="image/*"
            onChange={(e) => {
              setFo(e.target.files[0]);
              p.current.innerHTML = `<i class="bi bi-image-fill"></i> foto selecionada`;
              p.current.style.color = "blue";
            }}
          />
        </label>
        <select ref={CategoriaGeral}>
          <option value="">selelcione categoria geral do produto</option>
          <option>snacks</option>
          <option>jogos</option>
        </select>
        <select ref={CategoriaEspecifica}>
          <option value="">
            selelcione categoria especifica do produto se for snacks
          </option>
          <option>gelado gourmet</option>
          <option>bolo no pote</option>
          <option>pipoca goumet</option>
        </select>
        <textarea
          placeholder="descrição do produto"
          ref={area}
          onInput={aumentar}
        ></textarea>
        <button onClick={AdicionarProduto}>
          <p ref={texto}>adicionar produto</p>{" "}
          <h1 className="load" ref={load}>
            <i class="bi bi-arrow-repeat"></i>
          </h1>
        </button>
      </form>
    </div>
  );
}
export default Adicionar;
