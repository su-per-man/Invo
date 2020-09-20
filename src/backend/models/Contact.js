const mongoose = require('mongoose')

let ContactSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    Company: String,
    Location: String,
    Phone: String,
}, { timestamps: true })
module.exports = mongoose.model('contacts', ContactSchema)