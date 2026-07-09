import "../Styles/ListadEus.css";

function ListaUsuarios({ estado, usuarios, idUsuario, Pesquisado }) {
  const lista = Pesquisado !== null ? Pesquisado : usuarios;
  return (
    <ul className="Ul">
      {lista?.length > 0 ? (
        lista
          .slice()
          .reverse()
          .map((user) => (
            <li
              onClick={() => {
                estado(true);
                idUsuario(user._id);
              }}
              key={user?._id}
            >
              <img src={user?.foto} alt="" />
              <h1>{user?.nomeUsuario}</h1>
              <button onClick={() => estado(true)}>ver detalhes</button>
            </li>
          ))
      ) : (
        <div id="div">
          <h3>
            <i class="bi bi-person-fill-x"></i> sem usuarios encontrados
          </h3>
        </div>
      )}
    </ul>
  );
}

export default ListaUsuarios;
