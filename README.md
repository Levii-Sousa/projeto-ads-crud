📋 Sistema de Gestão de Clientes — CRUD Full Stack
Aplicação web completa para cadastro, consulta, atualização e exclusão de clientes, desenvolvida com Node.js, Express, MySQL e HTML/CSS/JS puro no front-end.
🔗 [Acesse o projeto online] (https://levii-sousa.github.io/projeto-ads-crud) — nenhuma instalação necessária!
---
🚀 Tecnologias utilizadas
Camada	Tecnologia
Back-end	Node.js + Express
Banco de dados	MySQL
Front-end	HTML, CSS e JavaScript
Conexão BD	mysql2
CORS	cors
Deploy back-end	Railway
Deploy front-end	Netlify
---
✨ Funcionalidades
✅ Cadastrar novo cliente
✅ Listar todos os clientes
✅ Editar dados de um cliente
✅ Excluir cliente
✅ Validação de campos obrigatórios (nome, e-mail e telefone)
✅ Validação de formato de e-mail
✅ Telefone com máscara e validação de 11 dígitos
✅ Filtro em tempo real por nome ou e-mail
✅ Indicador de status da API (online/offline)
✅ Interface responsiva com suporte a modo escuro
---
📁 Estrutura do projeto
```
projeto-ads-crud/
├── db.js            # Configuração da conexão com o MySQL
├── server.js        # API REST com Express e validações
├── schema.sql       # Script de criação do banco de dados
├── index.html       # Front-end da aplicação
├── package.json
└── .gitignore
```
---
🌐 URLs de produção
Serviço	URL
Front-end	https://stunning-tartufo-8312dd.netlify.ap
API	https://projeto-ads-crud-production.up.railway.app
---
🔌 Endpoints da API
Base URL: `https://projeto-ads-crud-production.up.railway.app`
Método	Rota	Descrição
`GET`	`/clientes`	Lista todos os clientes
`POST`	`/clientes`	Cadastra um novo cliente
`PUT`	`/clientes/:id`	Atualiza um cliente pelo ID
`DELETE`	`/clientes/:id`	Remove um cliente pelo ID
Exemplo de payload (POST/PUT)
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "85999999999"
}
```
Exemplo de erro de validação (status 400)
```json
{
  "erros": [
    "E-mail inválido.",
    "Telefone deve ter 11 dígitos (DDD + número)."
  ]
}
```
---
🗄️ Schema do banco de dados
```sql
CREATE TABLE cliente (
    id       INT AUTO_INCREMENT PRIMARY KEY,
    nome     VARCHAR(100) NOT NULL,
    email    VARCHAR(100) NOT NULL,
    telefone CHAR(11)     NOT NULL
);
``` 
---
🖥️ Rodando localmente (para desenvolvimento)
> Esta seção é para quem quiser modificar ou contribuir com o projeto.
> Para apenas **usar** a aplicação, acesse o [link online](https://levii-sousa.github.io/projeto-ads-crud).
Pré-requisitos
Node.js instalado
XAMPP instalado (para o MySQL)
Passo a passo
1. Clone o repositório
```bash
git clone https://github.com/Levii-Sousa/projeto-ads-crud.git
cd projeto-ads-crud
```
2. Instale as dependências
```bash
npm install
```
3. Configure o banco de dados
Inicie o XAMPP e ative o módulo MySQL
Acesse o phpMyAdmin: `http://localhost/phpmyadmin`
Crie um banco chamado `db_projeto`
Execute o script `schema.sql` para criar a tabela
4. Inicie o servidor
```bash
node server.js
```
5. Abra o front-end
Abra o arquivo `index.html` no navegador com Live Server.
---
👨‍💻 Autor
Feito por Levi Sousa  
![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)(https://www.linkedin.com/in/levi-sousa-777br/?skipRedirect=true)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)(https://github.com/Levii-Sousa)
