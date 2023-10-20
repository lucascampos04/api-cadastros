const express = require('express')
const cors = require('cors')
const routerLogin = require('./router/Login')
const routerCreateAccount = require('./router/CreateAccount')
const app = express()

const rotas = [routerLogin, routerCreateAccount]

app.use(express.json())
app.use(cors())
app.use(rotas)

const PORT = 3030
app.listen(PORT, () => {
    console.log("Rodando na porta http://localhost:8080")
})