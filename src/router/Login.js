const express = require("express");
const mysql = require("../model/connectDb");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Define a secret key for JWT
const secretKey = "your-secret-key"; 

router.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT * FROM usuarios WHERE username = ?";
    mysql.query(query, [username], (error, results) => {
        if (error) {
            console.error("Erro ao consultar o banco de dados: " + error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        const user = results[0];

        // Comparar a senha fornecida com a senha armazenada usando bcrypt
        bcrypt.compare(password, user.password, (bcryptErr, isMatch) => {
            if (bcryptErr || !isMatch) {
                return res.status(401).json({ error: "Credenciais inválidas" });
            }

            // Se as credenciais estiverem corretas, gera um token JWT
            const token = jwt.sign({ username: user.username }, secretKey, {
                expiresIn: "1h", // Defina a expiração do token como desejar
            });

            res.status(200).json({ message: "Login bem-sucedido", token });
        });
    });
});


module.exports = router;
