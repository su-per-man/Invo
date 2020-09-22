const mongoose = require('mongoose')

let ContactSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
    },
    LastName: String,
    Company: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    Phone: String,
}, { timestamps: true })

ContactSchema.index({
    FirstName: 1,
    Company: 1,
    Location: 1
}, { unique: true })
module.exports = mongoose.model('contacts', ContactSchema)