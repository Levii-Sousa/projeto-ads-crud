const mysql = require('mysql2/promise');

const pool = mysql.createPool(
    process.env.MYSQL_URL || {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'db_projeto',
        port: 3306,
    }
);

pool.getConnection()
    .then(() => console.log('Banco de dados conectado com sucesso!'))
    .catch(err => console.error('Erro ao conectar no banco:', err.message));

module.exports = pool;