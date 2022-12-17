const mongoose = require('mongoose')

const Chat = mongoose.model('Chat', {
    username: String,
    message: String,
})

module.exports = Chat