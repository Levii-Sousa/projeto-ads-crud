const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

// Função de validação
function validarCliente({ nome, email, telefone }) {
    const erros = [];

    if (!nome || nome.trim().length === 0) {
        erros.push('Nome é obrigatório.');
    }

    if (!email || email.trim().length === 0) {
        erros.push('E-mail é obrigatório.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        erros.push('E-mail inválido.');
    }

    if (!telefone || telefone.trim().length === 0) {
        erros.push('Telefone é obrigatório.');
    } else {
        const apenasNumeros = telefone.replace(/\D/g, '');
        if (apenasNumeros.length !== 11) {
            erros.push('Telefone deve ter 11 dígitos (DDD + número).');
        }
    }

    return erros;
}

// CREATE
app.post('/clientes', async (req, res) => {
    const { nome, email, telefone } = req.body;

    const erros = validarCliente({ nome, email, telefone });
    if (erros.length > 0) {
        return res.status(400).json({ erros });
    }

    const telefoneLimpo = telefone.replace(/\D/g, '');

    try {
        const [result] = await pool.query(
            'INSERT INTO cliente (nome, email, telefone) VALUES (?, ?, ?)',
            [nome.trim(), email.trim(), telefoneLimpo]
        );
        res.status(201).json({ id: result.insertId, nome, email, telefone: telefoneLimpo });
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

    const erros = validarCliente({ nome, email, telefone });
    if (erros.length > 0) {
        return res.status(400).json({ erros });
    }

    const telefoneLimpo = telefone.replace(/\D/g, '');

    try {
        await pool.query(
            'UPDATE cliente SET nome = ?, email = ?, telefone = ? WHERE id = ?',
            [nome.trim(), email.trim(), telefoneLimpo, id]
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
        console.error("ERRO DETECTADO NO SERVIDOR:", err);
        res.status(500).json({ erro: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
