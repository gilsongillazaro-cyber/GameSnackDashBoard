import { NavLink } from "react-router-dom";
import "../Styles/Header.css";
function Header({ onde, perfil }) {
  return (
    <header>
      <h1>
        tela de <span>{onde}</span>
      </h1>
      <NavLink to={"/perfil"}>
        <img src={perfil?.foto} alt="" />
      </NavLink>
    </header>
  );
}

export default Header;
