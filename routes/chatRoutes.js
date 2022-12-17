const router = require('express').Router()
const Chat = require('../models/Chat')

// Create - Criando os dados
router.post('/', async (req, res) => {
    const { username, message} = req.body

    if (!username) {
        res.status(422).json({ error: 'O username é obrigatório!'})
    }

    if (!message) {
        res.status(422).json({ error: 'A mensagem é obrigatória!'})
    }

    const chat = {
        username,
        message,
    }

    try {
        //criando dados
        await Chat.create(chat)

        res.status(201).json({ message: 'Nome inserido com sucesso!'})
    }   catch(error) {
        res.status(500).json({ error: error})
    }
})

// Read - Leitura de dados
router.get('/', async (req, res) => {
    try {
        const userdata = await Chat.find()

        res.status(200).json(userdata)
    } catch(error) {
        res.status(500).json({ error: error})    
    }
})

module.exports = router