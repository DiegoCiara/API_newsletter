# API_newsletter
Esse projeto é o back-end da newsletter presente no repositório <a href="https://github.com/DiegoCiara/newsletter">NewsLetter</a>
### Baixar e iniciar um container PostgreSQL
docker run --name postgres-container -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
Isso criará um container PostgreSQL com uma senha definida.

# Instale as dependências necessárias:
npm install express pg
