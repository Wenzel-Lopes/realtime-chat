// config inicial
const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const path = require('path');

// forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json());

// rotas da API
const chatRoutes = require('./routes/chatRoutes')

app.use('/chat', chatRoutes)

// rota inicial / endpoint
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname +'/public/index.html'));
})

