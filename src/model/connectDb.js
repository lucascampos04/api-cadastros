const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senha123456',
    database: 'login',
})

module.exports = connection