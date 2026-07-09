import { Link } from "react-router-dom";
import "../Styles/Total.css";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Totais() {
  const [Qusuarios, setQusuarios] = useState([]);
  const [Qprodutos, setQprodutpos] = useState([]);
  const [Qencomendas, setQencomendas] = useState([]);
  const [Qvendas, setQvendas] = useState([]);
  const navigate = useNavigate();
  async function PegarQuantidade() {
    try {
      const token = localStorage.getItem("GameSnackToken");
      if (!token) {
        navigate("/login");
      }
      const response = await api.get(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/usuarios`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const response2 = await api.get(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/produtos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const response3 = await api.get(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/encomendas/pegar`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const response4 = await api.get(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/vendas/pegar`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setQvendas(response4.data.vendas);
      setQencomendas(response3.data.encomendas);
      setQusuarios(response.data.usuarios);
      setQprodutpos(response2.data.produtos);
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  useEffect(() => {
    PegarQuantidade();
  }, []);
  return (
    <div className="Total">
      <ul>
        <li className="LL">
          <Link to={"/usuarios"}>
            <i class="bi bi-people-fill"></i>
            <h1>Quantidade total de usuarios</h1>
            <h2>{Qusuarios?.length}</h2>
          </Link>
        </li>
        <li className="LL">
          <Link to={"/produtos"}>
            <i class="bi bi-boxes"></i>
            <h1>Quantidade total de produtos</h1>
            <h2>{Qprodutos?.length}</h2>
          </Link>
        </li>
        <li className="LL">
          <Link to={"/encomendas"}>
            <i class="bi bi-box2-fill"></i>
            <h1>Quantidade total de encomendas</h1>
            <h2>{Qencomendas?.length}</h2>
          </Link>
        </li>
        <li className="LL">
          <Link to={"/"}>
            <i class="bi bi-cash-stack"></i>
            <h1>Quantidade total de vendas</h1>
            <h2>{Qvendas?.length}</h2>
          </Link>
        </li>
      </ul>
    </div>
  );
}
export default Totais;
