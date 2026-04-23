const express = require('express');
const pool = require('./db'); // 
const app = express();

app.use(express.json());

// CREATE (Adicionar cliente)
app.post('/clientes', async (req, res) => {
    const { nome, email, telefone } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO cliente (nome, email, telefone) VALUES (?, ?, ?)',
            [nome, email, telefone]
        );
        res.status(201).json({ id: result.insertId, nome, email, telefone });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// READ (Listar clientes)
app.get('/clientes', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM cliente');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// UPDATE (Atualizar cliente)
app.put('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone } = req.body;
    try {
        await pool.query(
            'UPDATE cliente SET nome = ?, email = ?, telefone = ? WHERE id = ?',
            [nome, email, telefone, id]
        );
        res.json({ mensagem: 'Cliente atualizado com sucesso' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// DELETE (Remover cliente)
app.delete('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM cliente WHERE id = ?', [id]);
        res.json({ mensagem: 'Cliente excluído com sucesso' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));