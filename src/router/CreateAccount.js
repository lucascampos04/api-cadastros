const express = require("express");
const mysql = require("../model/connectDb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 

const router = express.Router();

router.post("/api/createAccount", (req, res) => {
    const { username, email, phone_number, password } = req.body;

    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            console.error("Erro ao gerar o hash da senha:", err);
            return res.status(500).json({ message: "Erro ao criar a conta" });
        }

        const query = "INSERT INTO users (username, email, phone_number, password) VALUES (?, ?, ?, ?)";
        const values = [username, email, phone_number, hashedPassword]; 

        mysql.query(query, values, (error, results) => {
            if (error) {
                console.error("Erro ao inserir usuário:", error);
                return res.status(500).json({ message: "Erro ao criar a conta" });
            } else {
                console.log("Usuário inserido com sucesso. ID:", results.insertId);

                // Gere um token após o cadastro bem-sucedido
                const token = jwt.sign({ username }, "seuSegredoAqui", { expiresIn: "1h" });

                // Retorne o token no corpo da resposta
                res.status(201).json({ message: "Conta criada com sucesso", token });
            }
        });
    });
});

module.exports = router;
