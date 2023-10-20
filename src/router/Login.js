const express = require("express")
const mysql = require("../model/connectDb")
const router = express.Router()

router.post("/api/login", (req, res) => {
    const { username, password } = req.body ;

    const query = "SELECT * FROM usuarios WHERE username = ? AND password = ?";
    mysql.query(query, [username, password], (error, results) => {
        if (error) {
            console.error("Erro ao consultar o banco de dados: " + error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }
   
        res.status(200).json({ message: "Login bem-sucedido" });
    });
});


module.exports = router