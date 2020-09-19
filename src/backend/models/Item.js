const mongoose = require('mongoose')

let ItemSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: true
    },
    Description: String
})
module.exports = mongoose.model('items', ItemSchema)