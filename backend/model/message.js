const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    conversationId: {
        type: String,
    },
    text: {
        type: String,
    },
    sender: {
        type: String,
    },
    images: [{
        type: String,
    }],
},
    { timestamps: true }
)

module.exports = mongoose.model('Message', messageSchema)