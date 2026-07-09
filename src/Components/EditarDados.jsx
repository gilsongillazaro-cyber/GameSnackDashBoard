import "../Styles/EditarDados.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
function EditarDados({ fecha, atualizar }) {
  const navigate = useNavigate();
  const nome = useRef();
  const numero = useRef();
  const email = useRef();
  const senhaNova = useRef();
  const senhaAntiga = useRef();
  const Texto = useRef();
  const Load = useRef();
  const Texto2 = useRef();
  const Load2 = useRef();
  const [foto, setFoto] = useState();
  const textoFoto = useRef();
  const Texto3 = useRef();
  const Load3 = useRef();
  const Texto4 = useRef();
  const Load4 = useRef();
  const Texto5 = useRef();
  const Load5 = useRef();

  async function AtualizarNome() {
    try {
      Texto.current.style.display = "none";
      Load.current.style.display = "block";
      const Token = localStorage.getItem("GameSnackToken");
      if (!Token) {
        return navigate("/login");
      }
      const response = await api.put(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/perfil/atualizar/nome`,
        {
          nome: nome.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      if (response) {
        toast.success(response.data.mensagem, {
          position: "top-center",
        });
        atualizar();
        Texto.current.style.display = "block";
        Load.current.style.display = "none";
      }
      nome.current.value = "";
    } catch (erro) {
      Texto.current.style.display = "block";
      Load.current.style.display = "none";

      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  async function AtualizarNumero() {
    try {
      Texto2.current.style.display = "none";
      Load2.current.style.display = "block";
      const Token = localStorage.getItem("GameSnackToken");
      if (!Token) {
        return navigate("/login");
      }
      const response = await api.put(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/perfil/atualizar/numero`,
        {
          numero: numero.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      if (response) {
        toast.success(response.data.mensagem, {
          position: "top-center",
        });
        atualizar();
        Texto2.current.style.display = "block";
        Load2.current.style.display = "none";
      }
      numero.current.value = "";
    } catch (erro) {
      Texto2.current.style.display = "block";
      Load2.current.style.display = "none";

      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  async function atualizarFotto() {
    try {
      Texto3.current.style.display = "none";
      Load3.current.style.display = "block";
      const Token = localStorage.getItem("GameSnackToken");
      if (!Token) {
        return navigate("/login");
      }
      const formData = new FormData();
      formData.append("foto", foto);
      const response = await api.put(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/perfil/atualizar/foto`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      if (response) {
        toast.success(response.data.mensagem, {
          position: "top-center",
        });
        atualizar();
        Texto3.current.style.display = "block";
        Load3.current.style.display = "none";
        textoFoto.current.innerHTML = `<i class="bi bi-image"></i> adicione nova foto`;
        textoFoto.current.style.color = "black";
        setFoto("");
      }
    } catch (erro) {
      Texto3.current.style.display = "block";
      Load3.current.style.display = "none";

      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  async function AtualizarEmail() {
    try {
      Texto4.current.style.display = "none";
      Load4.current.style.display = "block";
      const Token = localStorage.getItem("GameSnackToken");
      if (!Token) {
        return navigate("/login");
      }

      const response = await api.put(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/perfil/atualizar/email`,
        {
          email: email.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      if (response) {
        toast.success(response.data.mensagem, {
          position: "top-center",
        });
        atualizar();
        Texto4.current.style.display = "block";
        Load4.current.style.display = "none";
        email.current.value = "";
      }
    } catch (erro) {
      Texto4.current.style.display = "block";
      Load4.current.style.display = "none";

      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  async function AtualizarSenha() {
    try {
      Texto5.current.style.display = "none";
      Load5.current.style.display = "block";
      const Token = localStorage.getItem("GameSnackToken");
      if (!Token) {
        return navigate("/login");
      }

      const response = await api.put(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/perfil/atualizar/senha`,
        {
          senhaAntiga: senhaAntiga.current.value,
          senhaNova: senhaNova.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      if (response) {
        toast.success(response.data.mensagem, {
          position: "top-center",
        });
        atualizar();
        Texto5.current.style.display = "block";
        Load5.current.style.display = "none";
        senhaAntiga.current.value = "";
        senhaNova.current.value = "";
      }
    } catch (erro) {
      Texto5.current.style.display = "block";
      Load5.current.style.display = "none";

      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  return (
    <div
      className="EditarDados"
      onClick={(e) => {
        if (e.target.className === "EditarDados") {
          fecha(false);
        }
      }}
    >
      <div className="conteiner">
        <h1>edite os seus dados aqui!</h1>
        <div>
          <input type="text" placeholder=" Adicione novo Nome" ref={nome} />
          <button onClick={AtualizarNome}>
            <p ref={Texto}>atualizar</p>
            <h2 className="load" ref={Load}>
              <i class="bi bi-arrow-repeat"></i>
            </h2>
          </button>
        </div>
        <div>
          <input
            type="tel"
            ref={numero}
            placeholder=" Adicione novo numero de telefone"
          />
          <button onClick={AtualizarNumero}>
            <p ref={Texto2}>atualizar</p>
            <h2 className="load" ref={Load2}>
              <i class="bi bi-arrow-repeat"></i>
            </h2>
          </button>
        </div>
        <div>
          <label htmlFor="ffff">
            <p ref={textoFoto}>
              <i class="bi bi-image"></i> adicione nova foto
            </p>
            <input
              type="file"
              id="ffff"
              accept="image/*"
              onChange={(e) => {
                setFoto(e.target.files[0]);
                textoFoto.current.innerHTML = `<i class="bi bi-image-fill"></i> nova foto selecionada`;
                textoFoto.current.style.color = "blue";
              }}
            />
          </label>
          <button onClick={atualizarFotto}>
            <p ref={Texto3}>atualizar</p>
            <h2 className="load" ref={Load3}>
              <i class="bi bi-arrow-repeat"></i>
            </h2>
          </button>
        </div>
        <div>
          <input
            type="email"
            ref={email}
            placeholder=" Adicione novo endereço de email"
          />
          <button onClick={AtualizarEmail}>
            <p ref={Texto4}>atualizar</p>
            <h2 className="load" ref={Load4}>
              <i class="bi bi-arrow-repeat"></i>
            </h2>
          </button>
        </div>

        <div>
          <input
            type="text"
            placeholder=" Adicione novo senha"
            ref={senhaNova}
          />
          <input
            type="password"
            ref={senhaAntiga}
            placeholder="Adicione a senha antiga pra verificação!"
          />
          <button onClick={AtualizarSenha}>
            {" "}
            <p ref={Texto5}>atualizar</p>
            <h2 className="load" ref={Load5}>
              <i class="bi bi-arrow-repeat"></i>
            </h2>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditarDados;
