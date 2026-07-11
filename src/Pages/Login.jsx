import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import api from "../services/api";
import { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
function Login() {
  const Email = useRef();
  const [abilitado, setabilitado] = useState(false);
  const navigate = useNavigate();
  const Senha = useRef();
  const text = useRef();
  const load = useRef();
  const btnMons = useRef();
  const btnOcul = useRef();
  function monstrar() {
    btnMons.current.style.display = "none";
    btnOcul.current.style.display = "block";
    Senha.current.type = "text";
  }
  function ocultar() {
    btnMons.current.style.display = "block";
    btnOcul.current.style.display = "none";
    Senha.current.type = "password";
  }

  async function Logar(e) {
    setabilitado(true);
    try {
      e.preventDefault();
      text.current.style.display = "none";
      load.current.style.display = "block";
      const response = await api.post(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/login`,
        {
          email: Email.current.value,
          senha: Senha.current.value,
        },
      );
      if (response) {
        text.current.style.display = "block";
        load.current.style.display = "none";
        localStorage.setItem("GameSnackToken", response.data.token);
        toast.success(response.data.mensagem, {
          position: "top-center",
        });
        setabilitado(false);
        navigate("/");
      }
    } catch (erro) {
      setabilitado(false);
      if (
        erro.response.data.mensagem ===
          "erro ao se conectar com o servidor! verique sua conexão a internet" ||
        erro.response.data.mensagem === "senha incorreta"
      ) {
        toast.error(erro.response.data.mensagem, {
          position: "top-center",
        });
        text.current.style.display = "block";
        load.current.style.display = "none";
      } else {
        toast.warning(erro.response.data.mensagem, {
          position: "top-center",
        });
        text.current.style.display = "block";
        load.current.style.display = "none";
      }
    }
  }
  useEffect(() => {
    Email.current.focus();
  }, []);
  return (
    <div className="Login">
      <form onSubmit={Logar}>
        <h1>
          <i className="bi bi-door-open-fill"></i> loga-<span>te</span>
        </h1>
        <div>
          {" "}
          <input type="email" placeholder="Seu Email" ref={Email} />
        </div>
        <div>
          {" "}
          <input type="password" placeholder="Cria uma Senha" ref={Senha} />
          <button id="monstrar" type="button" onClick={monstrar} ref={btnMons}>
            <i class="bi bi-eye-fill"></i>
          </button>
          <button id="ocultar" type="button" onClick={ocultar} ref={btnOcul}>
            <i class="bi bi-eye-slash-fill"></i>
          </button>
        </div>
        <button disabled={abilitado}>
          <p ref={text}>logar</p>
          <h2 className="load" ref={load}>
            <i class="bi bi-arrow-repeat"></i>
          </h2>
        </button>
      </form>
    </div>
  );
}
export default Login;
