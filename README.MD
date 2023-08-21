# Configuração do Banco de Dados PostgreSQL com Docker
Certifique-se de que o Docker esteja em execução e execute os seguintes comandos no terminal:
### Baixar e iniciar um container PostgreSQL
docker run --name postgres-container -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
Isso criará um container PostgreSQL com uma senha definida.

# Instale as dependências necessárias:
npm install express pg