import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Tooltip,
  CartesianGrid,
} from "recharts";
import api from "../services/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Grafico.css";
import { toast } from "react-toastify";
function Grafico() {
  const [Vendas, SetVendas] = useState([]);
  const navigate = useNavigate();
  async function PegarVendas() {
    try {
      const token = localStorage.getItem("GameSnackToken");
      if (!token) {
        navigate("/login");
      }
      const response = await api.get(
        `${import.meta.env.VITE_MinhaApi_Rota_Admin}/vendas/pegar`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      SetVendas(response.data.vendas);
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  useEffect(() => {
    PegarVendas();
  }, []);

  const VendasPorMEs = Vendas.reduce((acc, item) => {
    const mes = item.mes;
    if (!acc[mes]) {
      acc[mes] = 0;
    }
    acc[mes] += item.venda;
    return acc;
  }, {});
  const DadosGrafico = Object.keys(VendasPorMEs).map((mes) => ({
    mes,
    venda: VendasPorMEs[mes],
  }));
  return (
    <div className="grafico">
      {Vendas?.length > 0 ? (
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <BarChart data={DadosGrafico}>
            <defs>
              <linearGradient id="gradient" x1={"0"} y1={"0"} x2={"0"} y2={"1"}>
                <stop offset={"0%"} stopColor="#ff7b00" />
                <stop offset={"100%"} stopColor="#ff0000" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray={"3 3"} />
            <XAxis dataKey={"mes"} />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="venda"
              fill="url(#gradient)"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <h3 className="h3">
          <i class="bi bi-graph-down-arrow"></i> Não há dados das vendas pra
          aparecer no grafico
        </h3>
      )}
    </div>
  );
}

export default Grafico;
