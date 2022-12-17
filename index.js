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

app.use(express.static(__dirname + '/public'));
app.use(express.json());

// rotas da API
const chatRoutes = require('./routes/chatRoutes')

app.use('/chat', chatRoutes)

// rota inicial / endpoint
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname +'/public/index.html'));

    
})

//Entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

// entregar uma porta
mongoose.connect(
    //mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.cxipbvz.mongodb.net/realtimechat?retryWrites=true&w=majority
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.cxipbvz.mongodb.net/realtimechat?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('Conectamos ao MongoDB!')
        app.listen(3000)
    })
    .catch((err) => console.log(err))
