import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo Flavicon.png";
import "../Styles/DashBoard.css";
import { useEffect } from "react";
function DashBoard() {
  const navigate = useNavigate();
  function Verificar() {
    const Token = localStorage.getItem("GameSnackToken");
    if (!Token) {
      return navigate("/login");
    }
  }
  useEffect(() => {
    Verificar();
  }, []);
  return (
    <div className="dash">
      <aside>
        <ul>
          <li>
            <img src={Logo} alt="" />
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "ativo" : "")}
              to={"/"}
            >
              <i class="bi bi-graph-up-arrow"></i> <span>DashBoard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "ativo" : "")}
              to={"/usuarios"}
            >
              <i class="bi bi-people-fill"></i> <span>Usuarios</span>
            </NavLink>
          </li>{" "}
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "ativo" : "")}
              to={"/produtos"}
            >
              <i class="bi bi-inboxes-fill"></i> <span>todos Produtos</span>
            </NavLink>
          </li>{" "}
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "ativo" : "")}
              to={"/adicionar"}
            >
              <i class="bi bi-plus-circle-fill"></i> <span>novos produtos</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "ativo" : "")}
              to={"/encomendas"}
            >
              <i class="bi bi-truck"></i> <span>encomendas</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "ativo" : "")}
              to={"/opnioes"}
            >
              <i class="bi bi-chat-quote-fill"></i>
              <span>opniões dos clientes</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "ativo" : "")}
              to={"/perfil"}
            >
              <i class="bi bi-person-circle"></i> <span>meu perfil</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "ativo" : "")}
              to={"/cadastro"}
            >
              <i className="bi bi-person-gear"></i> <span>novo admin</span>{" "}
            </NavLink>
          </li>
        </ul>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default DashBoard;
