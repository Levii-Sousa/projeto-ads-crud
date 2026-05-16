const express = require('express');
const cors = require('cors'); // 1. Importa o CORS
const pool = require('./db'); 
const app = express();

// 2. Configurações e Middlewares (Ordem importa!)
app.use(cors());          // Ativa o CORS para permitir requisições de outros lugares
app.use(express.json());  // Permite que o servidor entenda JSON


// CREATE
app.post('/clientes', async (req, res) => {
    const { nome, email, telefone } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO cliente (nome, email, telefone) VALUES (?, ?, ?)',
            [nome, email, telefone]
        );
        res.status(201).json({ id: result.insertId, nome, email, telefone });
    } catch (err) {
        console.error("ERRO DETECTADO NO SERVIDOR:", err);
        res.status(500).json({ erro: err.message });
    }
});

// READ
app.get('/clientes', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM cliente');
        res.json(rows);
    } catch (err) {
        console.error("ERRO DETECTADO NO SERVIDOR:", err);
        res.status(500).json({ erro: err.message });
    }
});

// UPDATE
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
        console.error("ERRO DETECTADO NO SERVIDOR:", err);
        res.status(500).json({ erro: err.message });
    }
});

// DELETE
app.delete('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM cliente WHERE id = ?', [id]);
        res.json({ mensagem: 'Cliente excluído com sucesso' });
    } catch (err) {
        console.error("ERRO DETECTADO NO SERVIDOR:", err); // Isso aparece no seu terminal do VS Code
        res.status(500).json({ erro: err.message });
    }
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
