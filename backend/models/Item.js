const mongoose = require('mongoose')

let ItemSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: true
    },
    Description: String
}, { timestamps: true })
module.exports = mongoose.model('items', ItemSchema)