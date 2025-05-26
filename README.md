---

## API de Usuários - Express.js com MySQL

Uma API RESTful simples para gerenciamento de usuários, desenvolvida com **Node.js**, **Express.js** e **MySQL**. Este projeto serve como um exemplo prático de como construir uma API básica para operações CRUD (Criar, Ler, Atualizar, Deletar) em um banco de dados relacional.

---

### Tecnologias Utilizadas

* **Node.js**: Ambiente de execução JavaScript.
* **Express.js**: Framework web para Node.js, utilizado para construir a API.
* **MySQL**: Sistema de gerenciamento de banco de dados relacional.
* **dotenv**: Para gerenciar variáveis de ambiente de forma segura.

---

### Funcionalidades

* **Listar Usuários**: Retorna todos os usuários cadastrados.
* **Buscar Usuário por ID**: Retorna um usuário específico pelo seu ID.
* **Criar Usuário**: Adiciona um novo usuário com nome e email.
* **Atualizar Usuário**: Modifica as informações de um usuário existente.
* **Deletar Usuário**: Remove um usuário do banco de dados.

---

### Como Rodar o Projeto

Siga os passos abaixo para configurar e rodar a API em sua máquina local:

#### 1. Pré-requisitos

Certifique-se de ter instalado em sua máquina:

* **Node.js** (versão 14 ou superior)
* **MySQL Server**

#### 2. Configuração do Banco de Dados

1.  Crie um banco de dados MySQL com o nome de sua preferência (ex: `api_usuarios`).
2.  Dentro do seu banco de dados, crie uma tabela `usuarios` com a seguinte estrutura:

    ```sql
    CREATE TABLE usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE
    );
    ```

#### 3. Clonar o Repositório

```bash
git clone [https://github.com/seu-usuario/nome-do-seu-repositorio.git](https://github.com/seu-usuario/nome-do-seu-repositorio.git)
cd nome-do-seu-repositorio
