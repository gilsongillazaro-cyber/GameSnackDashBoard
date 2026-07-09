import { Routes, Route } from "react-router-dom";
import DashBoard from "./Pages/DashBoard";
import Cadastro from "./Pages/Cadastro";
import Login from "./Pages/Login";
import Usuarios from "./Pages/usuarios";
import Produtos from "./Pages/Produtos";
import Inicio from "./Pages/Inicio";
import Adicionar from "./Pages/Adiconar";
import Encomendas from "./Pages/Encomendas";
import Eu from "./Pages/Eu";
function App() {
  return (
    <Routes>
      <Route path="/" element={<DashBoard />}>
        <Route index element={<Inicio />}></Route>
        <Route path="/usuarios" element={<Usuarios />}></Route>
        <Route path="/produtos" element={<Produtos />}></Route>
        <Route path="/adicionar" element={<Adicionar />}></Route>
        <Route path="/encomendas" element={<Encomendas />}></Route>
        <Route path="/perfil" element={<Eu />}></Route>
        <Route path="/cadastro" element={<Cadastro />}></Route>
      </Route>

      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
}
export default App;
