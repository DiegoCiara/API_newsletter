const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // Importe o módulo cors

const app = express();
const port = process.env.PORT || 3333;

// Configurar o Pool do PostgreSQL
const pool = new Pool({
  user: 'docker',
  host: 'localhost',
  database: 'newsletter',
  password: 'docker',
  port: 5432,
});

app.use(express.json());
app.use(cors()); 

pool.query(`
  CREATE TABLE IF NOT EXISTS dados (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
  )
`).then(() => {
  console.log('Tabela "dados" criada ou já existente');
}).catch((error) => {
  console.error('Erro ao criar a tabela:', error);
});


app.post('/api/cadastro', async (req, res) => {
  const { nome, email } = req.body;
  try {
    await pool.query('INSERT INTO dados (nome, email) VALUES ($1, $2)', [nome, email]);
    res.status(201).json({ message: 'Dados salvos com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.put('/api/contatos/:id', async (req, res) => {
  const contactId = req.params.id;
  const { nome, email } = req.body;
  try {
    await pool.query(
      'UPDATE dados SET nome = $1, email = $2 WHERE id = $3',
      [nome, email, contactId]
    );
    res.status(200).json({ message: 'Contato atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar contato:', error);
    res.status(500).json({ message: 'Erro ao atualizar contato' });
  }
});

app.get('/api/contatos', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM dados');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao buscar contatos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.delete('/api/contatos/:id', async (req, res) => {
  const contactId = req.params.id;
  try {
    await pool.query('DELETE FROM dados WHERE id = $1', [contactId]);
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir contato:', error);
    res.status(500).json({ message: 'Erro ao excluir contato' });
  }
});

app.get('/', (req, res) => {
  res.send('API is running');
});
app.get('/api/cadastro', (req, res) => {
  res.send('Cadastro is running');
});
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
