const { Socket } = require('dgram');
const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//const mongoose = require('mongose');


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html');
});

// Array que armazena os dados pois não tem um BD
let messages = [];

//Faço todos que estão conectados receberem as mensagens
io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`)
    console.log('asoijdasjoidjioasdoijasjiodasijodaoijsdoijasd');
    socket.emit('previousMessages', messages);

    socket.on('sendMessage', data => {
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data);
    });
});

server.listen(3000);