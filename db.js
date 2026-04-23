const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',      // Usuário padrão do XAMPP
    password: '',      // Padrão do XAMPP é vazio
    database: 'db_projeto', // Nome do banco que você criar no phpMyAdmin
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool;