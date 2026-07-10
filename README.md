# 🎮 GameSnacks Dashboard

<p align="center">
  <img src="src/assets/Logo Flavicon.png" alt="GameSnacks Logo" width="150"/>
</p>

<p align="center">
  Painel administrativo moderno desenvolvido para o gerenciamento completo da plataforma <strong>GameSnacks</strong>, oferecendo uma visão geral do desempenho do sistema através de gráficos, tabelas e indicadores em tempo real.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Concluído-success?style=for-the-badge">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react">
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js">
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb">
</p>

---

# 📖 Sobre o Projeto

O **GameSnacks Dashboard** é um painel administrativo criado para centralizar o gerenciamento da plataforma GameSnacks.

A aplicação permite acompanhar indicadores importantes do sistema, visualizar estatísticas por meio de gráficos interativos, consultar dados em tabelas organizadas e administrar usuários, produtos e informações do administrador logado.

---

# ✨ Funcionalidades

## 📊 Dashboard

* Gráficos interativos de vendas utilizando **Recharts**.
* Indicadores em tempo real.
* Total de usuários.
* Total de produtos.
* Total de vendas.
* Total de encomendas.
* Cards informativos.
* Tabelas com os registros mais recentes.

## 👥 Gerenciamento de Usuários

* Listagem de usuários.
* Pesquisa de usuários.
* Visualização de informações.
* Edição de usuários.
* Exclusão de usuários.

## 📦 Gerenciamento de Produtos

* Cadastro de novos produtos.
* Listagem de produtos.
* Pesquisa de produtos.
* Atualização de informações.
* Exclusão de produtos.
* Upload de imagens dos produtos.

## 👤 Perfil do Administrador

* Visualizar dados do administrador autenticado.
* Editar informações pessoais.
* Alterar foto de perfil.
* Atualizar senha.

---

# 📈 Recursos

* Dashboard moderno e responsivo.
* Gráficos interativos com **Recharts**.
* Tabelas dinâmicas para organização dos dados.
* Sistema de autenticação.
* Upload de imagens.
* Interface intuitiva.
* Atualização em tempo real.
* Layout responsivo para diferentes dispositivos.

---

# 🛠 Tecnologias Utilizadas

## Front-end

* React.js
* JavaScript (ES6+)
* Axios
* React Router DOM
* Recharts

## Back-end

* Node.js
* Express.js
* JWT (JSON Web Token)
* Bcrypt
* Cloudinary

## Banco de Dados

* MongoDB
* Mongoose

---

# 🔐 Segurança

* Autenticação utilizando JWT.
* Criptografia de senhas com Bcrypt.
* Rotas protegidas.
* Upload seguro de imagens com Cloudinary.
* Controle de acesso para administradores.

---

# 📂 Estrutura do Projeto

```text
GameSnacks-Dashboard/
│
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   │   ├── Dashboard/
│   │   │   ├── Users/
│   │   │   ├── Products/
│   │   │   └── Profile/
│   │   ├── services/
│   │   └── App.jsx
│   └── public/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   └── server.js
│
├── package.json
└── README.md
```

---

# 📸 Telas do Sistema

* 📊 Dashboard
* 👥 Usuários
* 📦 Produtos
* 👤 Perfil do Administrador

> Adicione as capturas de tela na pasta **/screenshots** e atualize os caminhos conforme necessário.

```text
screenshots/
├── dashboard.png
├── usuarios.png
├── produtos.png
└── perfil.png
```

---

# 🚀 Como Executar o Projeto

### Clone o repositório


git clone https://github.com/gilsongillazaro-cyber/GameSnackDashBoard


### Instale as dependências


npm install


### Execute o Front-end


npm run dev


---

# 👨‍💻 Desenvolvedor

Desenvolvido para oferecer uma solução moderna e eficiente para o gerenciamento da plataforma **GameSnacks**, utilizando tecnologias atuais do ecossistema JavaScript.

---

# 📄 Licença

Este projeto é de uso privado e destinado ao gerenciamento interno da plataforma **GameSnacks**.
