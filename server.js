const { Socket } = require('dgram');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const chatModel = require("./models/Chat");
const bodyParser = require("body-parser");



const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.post('/', (req, res) => {
    console.log("===============REQUEST BODY===============");
    console.log(req.body);

    const messageRequest = new chatModel(req.body);
    
    if (!messageRequest.username) {
        res.status(422).json({ error: 'O username é obrigatório!'})
    }

    if (!messageRequest.message) {
        res.status(422).json({ error: 'A mensagem é obrigatória!'})
    }

    try {

        messageRequest.save((err) =>{
            if(err)
              sendStatus(500);
            io.emit('message', req.body);
            res.sendStatus(200);
          });
        //res.status(201).json({ message: 'Nome inserido com sucesso!'})
        
    }   catch(error) {
        res.status(500).json({ error: error})
    }
})

// Array que armazena os dados pois não tem um BD
let messages = [];

//Faço todos que estão conectados receberem as mensagens
io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`)
    // socket.emit('previousMessages', messages);

    // socket.on('sendMessage', data => {
    //     messages.push(data);
    //     socket.broadcast.emit('receivedMessage', data);
    // });
});

//Entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

// entregar uma porta
mongoose.connect(
    //mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.cxipbvz.mongodb.net/realtimechat?retryWrites=true&w=majority
    `mongodb+srv://wenzel:1205@cluster0.cxipbvz.mongodb.net/realtimechat?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('Conectamos ao MongoDB!')
        app.listen(3001)
    })
    .catch((err) => console.log(err))


server.listen(3000);