const mongoose = require('mongoose')

let WarehouseSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: true
    },
    Location: String,
    Description: String
})
module.exports = mongoose.model('warehouses', WarehouseSchema)