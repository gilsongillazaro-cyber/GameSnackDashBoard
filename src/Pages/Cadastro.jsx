import { useNavigate } from "react-router-dom";
import "../Styles/Cadastro.css";
import { useRef, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
function Cadastro() {
  const Token = localStorage.getItem("GameSnackToken");
  const navigate = useNavigate();
  if (!Token) {
    navigate("/login");
  }
  const senha = useRef();
  const btnMons = useRef();
  const btnOcul = useRef();
  const load = useRef();
  const tex = useRef();
  const nome = useRef();
  const email = useRef();
  const numero = useRef();
  const p = useRef();
  const [foto, setFoto] = useState("");
  const verificador = useRef();

  function monstrar() {
    btnMons.current.style.display = "none";
    btnOcul.current.style.display = "block";
    senha.current.type = "text";
  }
  function ocultar() {
    btnMons.current.style.display = "block";
    btnOcul.current.style.display = "none";
    senha.current.type = "password";
  }

  async function Cadastrar(e) {
    try {
      e.preventDefault();
      tex.current.style.display = "none";
      load.current.style.display = "block";
      const formData = new FormData();
      formData.append("nome", nome.current.value);
      formData.append("email", email.current.value);
      formData.append("numero", numero.current.value);
      formData.append("senha", senha.current.value);
      formData.append("verificador", verificador.current.value);
      formData.append("foto", foto);
      const response = await api.post(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/cadastro`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      localStorage.setItem("GameSnackToken", response.data.token);
      toast.success(response.data.mensagem, {
        position: "top-center",
      });
      tex.current.style.display = "block";
      load.current.style.display = "none";
      setFoto("");
      nome.current.value = "";
      email.current.value = "";
      numero.current.value = "";
      senha.current.value = "";
      verificador.current.value = "";
      p.current.style.color = "lightgrey";
      p.current.innerHTML = "sua foto pra perfil";
      navigate("/login");
    } catch (erro) {
      tex.current.style.display = "block";
      load.current.style.display = "none";
      if (
        erro.response.data.mensagem ===
        "erro ao acessar o servidor! verifique sua conexão com a internet"
      ) {
        toast.error(<h4>{erro.response.data.mensagem}</h4>, {
          position: "top-center",
        });
      } else {
        toast.warning(<h4>{erro.response.data.mensagem}</h4>, {
          position: "top-center",
        });
      }
      p.current.style.color = "lightgrey";
      p.current.innerHTML = "sua foto pra perfil";
    }
  }
  return (
    <div className="Cadastro">
      <form onSubmit={Cadastrar}>
        <h1>
          <i class="bi bi-person-fill-add"></i> cadastra-<span>te</span>
        </h1>
        <div>
          {" "}
          <input type="text" placeholder="Seu Nome" ref={nome} />
        </div>
        <div>
          {" "}
          <input type="tel" placeholder="Seu telefone" ref={numero} />
        </div>
        <div>
          {" "}
          <input type="email" placeholder="Seu Email" ref={email} />
        </div>
        <div>
          {" "}
          <label htmlFor="foto2">
            <p ref={p}>sua foto pra perfil</p>
            <input
              type="file"
              id="foto2"
              accept="image/*"
              onChange={(e) => {
                setFoto(e.target.files[0]);
                if (e.target.files[0]) {
                  p.current.innerHTML = `<i class="bi bi-image-fill"></i> foto selecionada`;
                  p.current.style.color = "blue";
                } else {
                  p.current.innerHTML = `<i class="bi bi-image-fill"></i> sua foto pra perfil`;
                  p.current.style.color = "lightgrey";
                }
              }}
            />
          </label>
        </div>
        <div>
          {" "}
          <input type="password" placeholder="Cria uma Senha" ref={senha} />
          <button id="monstrar" type="button" onClick={monstrar} ref={btnMons}>
            <i class="bi bi-eye-fill"></i>
          </button>
          <button id="ocultar" type="button" onClick={ocultar} ref={btnOcul}>
            <i class="bi bi-eye-slash-fill"></i>
          </button>
        </div>
        <div>
          {" "}
          <input
            type="text"
            placeholder="Digite a senha novamente"
            ref={verificador}
          />
        </div>
        <button>
          <p ref={tex}>Cadastra-se</p>{" "}
          <h2 className="load" ref={load}>
            <i class="bi bi-arrow-repeat"></i>
          </h2>
        </button>
      </form>
    </div>
  );
}
export default Cadastro;
